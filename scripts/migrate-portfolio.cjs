// Resource migration process:
//   npm run data:preview  -> validate the source and detect target conflicts; no writes
//   npm run data:copy     -> insert missing canonical records and verify exact parity
//   npm run data:verify   -> verify parity again without writing
// PORTFOLIO_SOURCE_URI always reads legacy production data. DB_CONN_STRING alone
// chooses the destination (named local development DB or production DB). None
// of these modes removes legacy collections; cleanup follows release review.
const assert = require('node:assert/strict');
const { createHash } = require('node:crypto');
const { readFileSync, mkdirSync, writeFileSync } = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const { BSON, MongoClient } = require('mongodb');

const legacy = {
  projects: 'project', certifications: 'certification', degrees: 'education',
  workExperience: 'work', secondaryExperience: 'work', resumes: 'resume', skills: 'skill',
};
const targetNames = [...new Set(Object.values(legacy))];

function transform() {
  // Load the same TypeScript mapping used by the application and tests so the
  // command cannot silently diverge from the resource schema.
  const file = readFileSync(path.join(__dirname, '../src/app/_utils/migrationTransform.ts'), 'utf8');
  const compiled = ts.transpileModule(file, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const module = { exports: {} };
  new Function('module', 'exports', compiled)(module, module.exports);
  return module.exports.transformLegacyRecord;
}

function databaseName(uri, label) {
  // Never log connection strings: both URIs may contain database credentials.
  if (!uri || !/^mongodb(?:\+srv)?:\/\//.test(uri)) throw new Error(`${label} must be a MongoDB URI`);
  const parsed = new URL(uri);
  const name = decodeURIComponent(parsed.pathname.slice(1)) || 'PersonalPortfolio';
  if (!/^PersonalPortfolio(?:Dev_[0-9]{8}_[a-f0-9]{8})?$/.test(name)) throw new Error(`${label} database name is not allowed`);
  return name;
}

function canonical(value) {
  return JSON.stringify(BSON.EJSON.serialize(value), (_, item) => item && typeof item === 'object' && !Array.isArray(item)
    ? Object.fromEntries(Object.entries(item).sort(([a], [b]) => a.localeCompare(b))) : item);
}
function digest(rows) {
  // Sorting BSON-aware representations makes the source fingerprint independent
  // of MongoDB cursor order while preserving dates, IDs, and field values.
  return createHash('sha256').update(rows.map(canonical).sort().join('\n')).digest('hex');
}
function validate(name, row) {
  assert.ok(row._id && typeof row.title === 'string' && row.title.trim(), `${name}: missing identifier/title`);
  if (name === 'project' || name === 'certification' || name === 'resume') assert.ok(typeof row.image_url === 'string' && row.image_url.trim(), `${name}: missing image`);
  if (name === 'education') assert.ok(row.start_date instanceof Date && Number.isFinite(row.start_date.getTime()), 'education: invalid start date');
  if (name === 'work') assert.match(row.start_date, /^\d{4}-(0[1-9]|1[0-2])$/, 'work: invalid start month');
  if (name === 'resume') assert.ok(row.download, 'resume: missing download');
  if (name === 'skill') assert.ok(row.image_url && typeof row.visible === 'boolean' && Number.isInteger(row.rating) && row.rating >= 1 && row.rating <= 5, 'skill: invalid icon, visibility, or rating');
}

async function snapshot(db, convert) {
  // Preflight every legacy collection before any target write. Keep year-only
  // work periods visible in the report because their months are inferred.
  const present = new Set((await db.listCollections({}, { nameOnly: true }).toArray()).map(item => item.name));
  const source = {}, expected = Object.fromEntries(targetNames.map(name => [name, new Map()]));
  const inferredPeriods = [];
  for (const [oldName, newName] of Object.entries(legacy)) {
    if (!present.has(oldName)) throw new Error(`Missing legacy collection: ${oldName}`);
    const rows = await db.collection(oldName).find({}).toArray();
    if (!rows.length) throw new Error(`Empty legacy collection: ${oldName}`);
    source[oldName] = { count: rows.length, sha256: digest(rows) };
    for (const row of rows) {
      const mapped = convert(oldName, row);
      validate(newName, mapped);
      const id = String(mapped._id);
      if (expected[newName].has(id)) throw new Error(`Duplicate ${newName} identifier: ${id}`);
      expected[newName].set(id, mapped);
      if ((oldName === 'workExperience' || oldName === 'secondaryExperience') && /^\d{4}$/.test(String(row.date || ''))) {
        inferredPeriods.push({ collection: oldName, id, original: row.date, mappedStart: mapped.start_date, mappedEnd: mapped.end_date });
      }
    }
  }
  return { source, expected, inferredPeriods };
}

async function checkTargets(db, expected, requireComplete) {
  // A partial matching copy can resume; an extra or changed target document is
  // a conflict and stops the command before further writes.
  const missing = {};
  for (const name of targetNames) {
    const rows = await db.collection(name).find({}).toArray();
    const found = new Set();
    for (const row of rows) {
      const id = String(row._id);
      const mapped = expected[name].get(id);
      if (!mapped || canonical(row) !== canonical(mapped)) throw new Error(`Migration conflict in ${name} for ${id}`);
      found.add(id);
    }
    missing[name] = [...expected[name].keys()].filter(id => !found.has(id));
    if (requireComplete && missing[name].length) throw new Error(`Migration incomplete in ${name}: ${missing[name].length} records missing`);
  }
  return missing;
}

async function run(mode, env = process.env) {
  if (!['plan', 'apply', 'verify'].includes(mode)) throw new Error('Use --plan, --apply, or --verify');
  const sourceUri = env.PORTFOLIO_SOURCE_URI;
  const targetUri = env.DB_CONN_STRING;
  const sourceName = databaseName(sourceUri, 'PORTFOLIO_SOURCE_URI');
  if (sourceName !== 'PersonalPortfolio') throw new Error('Source must be PersonalPortfolio');
  const targetName = databaseName(targetUri, 'DB_CONN_STRING');
  if (targetName.startsWith('PersonalPortfolioDev_') && !/^mongodb:\/\/(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?\//.test(targetUri)) {
    throw new Error('Development destination must use loopback MongoDB');
  }
  const source = new MongoClient(sourceUri, { readPreference: 'primary', serverSelectionTimeoutMS: 10000 });
  const target = new MongoClient(targetUri, { serverSelectionTimeoutMS: 10000 });
  try {
    await Promise.all([source.connect(), target.connect()]);
    const sourceDb = source.db(sourceName);
    const targetDb = target.db(targetName);
    const before = await snapshot(sourceDb, transform());
    const missing = await checkTargets(targetDb, before.expected, mode === 'verify');
    if (mode === 'apply') {
      // Only the destination receives writes. A rerun skips identical records.
      for (const name of targetNames) for (const id of missing[name]) {
        await targetDb.collection(name).insertOne(before.expected[name].get(id));
      }
      await checkTargets(targetDb, before.expected, true);
    }
    if (mode !== 'plan') {
      // Detect source edits during copy/verify; such a run needs reconciliation
      // before its report can be accepted.
      const after = await snapshot(sourceDb, transform());
      for (const name of Object.keys(before.source)) {
        if (before.source[name].sha256 !== after.source[name].sha256) throw new Error(`Source changed during ${mode}: ${name}`);
      }
    }
    const report = {
      mode, verified: mode !== 'plan', sourceDatabase: sourceName, targetDatabase: targetName,
      source: before.source,
      target: Object.fromEntries(targetNames.map(name => [name, { expected: before.expected[name].size, missingBefore: missing[name].length }])),
      inferredPeriods: before.inferredPeriods,
      legacyCollectionsRetained: true,
    };
    if (env.PORTFOLIO_MIGRATION_REPORT) {
      // This manifest contains counts and hashes, never connection strings or
      // entire resource documents. Treat it as operational review material.
      const output = path.resolve(env.PORTFOLIO_MIGRATION_REPORT);
      mkdirSync(path.dirname(output), { recursive: true });
      writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
    }
    return report;
  } finally { await Promise.allSettled([source.close(), target.close()]); }
}

if (require.main === module) {
  // npm does not load .env for CLI scripts. Read the project file before
  // selecting URIs; dotenv leaves explicit shell/CI variables unchanged.
  require('dotenv').config({ path: path.join(__dirname, '../.env') });
  const selected = process.argv.slice(2).filter(arg => ['--plan', '--apply', '--verify'].includes(arg));
  if (selected.length !== 1 || process.argv.length !== 3) { console.error('Use one mode: --plan, --apply, or --verify'); process.exitCode = 1; }
  else run(selected[0].slice(2)).then(report => console.log(JSON.stringify(report, null, 2))).catch(error => { console.error(error.message); process.exitCode = 1; });
}
module.exports = { run, databaseName };
