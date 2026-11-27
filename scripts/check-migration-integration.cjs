const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { randomBytes } = require('node:crypto');
const fs = require('node:fs');
const { performance } = require('node:perf_hooks');
const { MongoClient, ObjectId, BSON } = require('mongodb');
const { loadSource } = require('../tests/security-harness.cjs');
const { transformLegacyRecord } = loadSource()('src/app/_utils/migrationTransform.ts');
const { skillCategories, skillIconKeys } = loadSource()('src/app/_lib/skillCatalog.ts');

if (process.env.GITHUB_ACTIONS !== 'true' || process.env.PORTFOLIO_MIGRATION_CI !== '1') throw new Error('Migration integration requires CI');
const localUri = process.env.DB_CONN_STRING || '';
const port = process.env.PORTFOLIO_CI_MONGO_PORT || '27017';
if (!/^\d{4,5}$/.test(port) || !new RegExp(`^mongodb://(?:127\\.0\\.0\\.1|localhost):${port}(?:/|\\?|$)`).test(localUri)) throw new Error('Migration target must be loopback MongoDB');
const productionCopy = process.argv.includes('--production-copy');
if (productionCopy && !process.env.PORTFOLIO_SOURCE_URI) throw new Error('Protected production copy requires PORTFOLIO_SOURCE_URI');
const names = { projects: 'project', certifications: 'certification', degrees: 'education', workExperience: 'work', secondaryExperience: 'work', resumes: 'resume', skills: 'skill' };
const sources = Object.keys(names);
const local = new MongoClient(localUri, { serverSelectionTimeoutMS: 5000 });
const dbName = () => `PersonalPortfolioDev_${new Date().toISOString().slice(0, 10).replaceAll('-', '')}_${randomBytes(4).toString('hex')}`;
const stable = value => JSON.stringify(BSON.EJSON.serialize(value), (_, item) => item && typeof item === 'object' && !Array.isArray(item) ? Object.fromEntries(Object.entries(item).sort(([a], [b]) => a.localeCompare(b))) : item);
const rowId = n => new ObjectId(`0000000000000000000000${n}`);
const project = { _id: rowId('01'), name: 'Fixture Rust API', brief: 'Backend service', description: 'Secure API', image_path: '/projectImages/myPortfolio.png', priority: 1, date: '2026', categories: ['Backend'], key_techs: ['Rust'], deployed_url: 'https://example.com', github_url: 'https://github.com/GreenJ84' };
async function fixture(db) {
  await db.collection('projects').insertOne(project);
  await db.collection('certifications').insertOne({ _id: rowId('02'), title: 'Fixture SecurityX', issuer: 'CompTIA', image: '/assets/load_icon.svg', description: 'Security', priority: 1, date: '2026', url: 'https://example.com', techs: ['Security'] });
  await db.collection('degrees').insertOne({ _id: rowId('03'), degree: 'Cybersecurity', college: 'WGU', date: 'Jan 2025 - Oct 2025', image: '/assets/load_icon.svg', details: ['Security'] });
  await db.collection('workExperience').insertOne({ _id: rowId('04'), position: 'Engineer', company: 'Example', date: 'May 2018- Jun 2019', details: ['Backend'] });
  await db.collection('secondaryExperience').insertOne({ _id: rowId('05'), position: 'Volunteer', company: 'Example', date: '2016', details: ['Service'] });
  await db.collection('resumes').insertOne({ _id: rowId('06'), job_title: 'Backend Resume', view: '/assets/resumes/JesseGreenough.React.Resume_03.png', image: '/assets/resumes/JesseGreenough.React.Resume_03.png', download: '/assets/resumes/JesseGreenough.React.Resume_03.pdf', categories: ['Backend'] });
  await db.collection('skills').insertOne({ _id: rowId('07'), name: 'Rust', iconKey: 'Rust', category: 'languages', rating: 4, sortOrder: 0, visible: true });
}
async function copyProduction(db) {
  const source = new MongoClient(process.env.PORTFOLIO_SOURCE_URI, { readPreference: 'secondaryPreferred', serverSelectionTimeoutMS: 10000 });
  try {
    await source.connect();
    const from = source.db('PersonalPortfolio');
    for (const name of sources) {
      const docs = await from.collection(name).find({}).toArray();
      if (!docs.length) throw new Error(`Production legacy collection ${name} is empty or missing`);
      await db.collection(name).insertMany(docs);
      console.log(`Copied ${docs.length} ${name} records into disposable MongoDB`);
    }
  } finally { await source.close(); }
}
async function inspect(db) {
  const expected = new Map();
  const counts = {};
  const inferred = [];
  for (const source of sources) {
    const docs = await db.collection(source).find({}).toArray();
    counts[source] = docs.length;
    for (const row of docs) {
      if ((source === 'workExperience' || source === 'secondaryExperience') && /^\d{4}(?:\s*-\s*\d{4})?$/.test(String(row.date || ''))) inferred.push({ source, id: String(row._id), period: row.date });
      const target = names[source];
      if (!expected.has(target)) expected.set(target, new Map());
      const transformed = transformLegacyRecord(source, row);
      const id = String(row._id);
      if (expected.get(target).has(id)) throw new Error(`Duplicate target identifier in ${target}: ${id}`);
      expected.get(target).set(id, transformed);
    }
  }
  return { expected, counts, inferred };
}
function validLink(value, optional = false) {
  if (!value && optional) return true;
  if (typeof value !== 'string' || !value) return false;
  if (/^\/(?!\/)/.test(value)) {
    const file = `public${decodeURIComponent(value)}`;
    return fs.existsSync(file);
  }
  try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password; }
  catch { return false; }
}
async function verify(db, snapshot) {
  const present = new Set((await db.listCollections({}, { nameOnly: true }).toArray()).map(item => item.name));
  for (const old of sources) assert.equal(present.has(old), false, `${old} must be removed after verified migration`);
  const report = { sourceCounts: snapshot.counts, targetCounts: {}, inferredPeriods: snapshot.inferred, invalid: [] };
  for (const [name, expected] of snapshot.expected) {
    const actual = await db.collection(name).find({}).toArray();
    report.targetCounts[name] = actual.length;
    assert.equal(actual.length, expected.size, `${name} count mismatch`);
    for (const row of actual) {
      const original = expected.get(String(row._id));
      assert.ok(original, `${name} has unexpected _id`);
      assert.equal(stable(row), stable(original), `${name} mapped fields differ for ${row._id}`);
      if (!row.title || !row.brief || !validLink(row.image_url, name !== 'project' && name !== 'resume' && name !== 'skill')) {
        // Skill image_url is a registry key, checked below.
        if (name !== 'skill') report.invalid.push({ collection: name, id: String(row._id), field: 'title/brief/image_url' });
      }
      if (name === 'project' && (!validLink(row.deployed_url, true) || !validLink(row.github_url, true))) report.invalid.push({ collection: name, id: String(row._id), field: 'project links' });
      if (name === 'certification' && !validLink(row.url, true)) report.invalid.push({ collection: name, id: String(row._id), field: 'credential link' });
      if (name === 'education' && (!validLink(row.url, true) || !(row.start_date instanceof Date) || (row.end_date && row.end_date < row.start_date))) report.invalid.push({ collection: name, id: String(row._id), field: 'credential link/dates' });
      if (name === 'work' && (!/^\d{4}-(0[1-9]|1[0-2])$/.test(row.start_date) || (row.end_date && row.end_date < row.start_date))) report.invalid.push({ collection: name, id: String(row._id), field: 'work dates' });
      if (name === 'resume' && (!validLink(row.download) || !validLink(row.brief))) report.invalid.push({ collection: name, id: String(row._id), field: 'resume links' });
      if (name === 'skill' && (!skillCategories.includes(row.category) || !skillIconKeys.includes(row.image_url) || typeof row.visible !== 'boolean' || !row.title)) report.invalid.push({ collection: name, id: String(row._id), field: 'skill category/icon/visibility' });
    }
  }
  assert.deepEqual(report.invalid, [], `Data audit failed: ${JSON.stringify(report.invalid)}`);
  return report;
}
async function queryTimings(db) {
  const queries = [
    ['project-top', 'project', {}, { priority: 1, date: -1, title: 1 }],
    ['certification-top', 'certification', {}, { priority: 1, date: -1, title: 1 }],
    ['work-primary', 'work', { primary: true }, { _id: -1 }],
    ['skill-visible', 'skill', { visible: true }, { category: 1, sortOrder: 1 }],
  ];
  const timings = [];
  for (const [name, collection, filter, sort] of queries) {
    const values = [];
    for (let i = 0; i < 20; i++) {
      const began = performance.now();
      await db.collection(collection).find(filter).sort(sort).limit(10).toArray();
      values.push(performance.now() - began);
    }
    values.sort((a, b) => a - b);
    const explain = await db.collection(collection).find(filter).sort(sort).limit(10).explain('executionStats');
    timings.push({ name, p95Ms: Number(values[Math.ceil(values.length * 0.95) - 1].toFixed(2)), examined: explain.executionStats?.totalDocsExamined });
  }
  return timings;
}
async function start(db, pattern, appPort = 3210) {
  const uri = `mongodb://127.0.0.1:${port}/${db.databaseName}`;
  const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'dev', '--webpack', '-p', String(appPort)], {
    env: { ...process.env, DB_CONN_STRING: uri, PORTFOLIO_DB_NAME: db.databaseName, NODE_ENV: 'development' }, stdio: ['ignore', 'pipe', 'pipe'],
  });
  let output = '';
  let finished = false;
  const onData = data => { output += data.toString(); if (output.length > 100000) output = output.slice(-100000); };
  child.stdout.on('data', onData); child.stderr.on('data', onData);
  try {
    const deadline = Date.now() + 60000;
    while (Date.now() < deadline) {
      if (pattern.test(output)) { finished = true; break; }
      if (child.exitCode !== null) break;
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    if (!finished) throw new Error(`Application startup did not report ${pattern}: ${output.slice(-1500)}`);
    if (pattern.source === 'Ready in' || pattern.source.includes('Migrated')) {
      const response = await fetch(`http://127.0.0.1:${appPort}/api/health`);
      assert.equal(response.status, 200, 'Started app health');
    }
    return output;
  } finally {
    child.kill('SIGTERM');
    await new Promise(resolve => { if (child.exitCode !== null) resolve(); else { child.once('exit', resolve); setTimeout(resolve, 5000); } });
  }
}
async function negativeCases() {
  for (const [kind, setup, expected] of [
    ['bad-date', async db => db.collection('workExperience').insertOne({ _id: rowId('10'), position: 'Engineer', company: 'Example', date: 'unknown' }), /Unrecognized legacy work period/],
    ['conflict', async db => { await db.collection('projects').insertOne(project); await db.collection('project').insertOne({ _id: project._id, title: 'Conflicting target' }); }, /Migration conflict/],
  ]) {
    const db = local.db(dbName());
    try {
      await setup(db);
      await start(db, expected);
      assert.ok(await db.collection(kind === 'bad-date' ? 'workExperience' : 'projects').countDocuments(), `${kind} source must survive`);
      console.log(`${kind} preserved source collection`);
    } finally { await db.dropDatabase(); }
  }
}
(async () => {
  await local.connect();
  const db = local.db(dbName());
  try {
    if (productionCopy) await copyProduction(db); else await fixture(db);
    const snapshot = await inspect(db);
    await start(db, /Migrated projects, certifications, degrees, workExperience, secondaryExperience, resumes, skills/);
    const report = await verify(db, snapshot);
    report.queryTimings = await queryTimings(db);
    const firstCounts = { ...report.targetCounts };
    const firstRecords = new Map();
    for (const name of Object.keys(firstCounts)) firstRecords.set(name, (await db.collection(name).find({}).toArray()).map(stable).sort());
    await start(db, /Ready in/);
    for (const [name, count] of Object.entries(firstCounts)) assert.equal(await db.collection(name).countDocuments(), count, `${name} idempotence`);
    for (const [name, records] of firstRecords) assert.deepEqual((await db.collection(name).find({}).toArray()).map(stable).sort(), records, `${name} changed on second startup`);
    fs.mkdirSync('test-results', { recursive: true });
    fs.writeFileSync('test-results/migration-report.json', JSON.stringify(report, null, 2) + '\n');
    console.log(JSON.stringify(report, null, 2));
    if (productionCopy && report.inferredPeriods.length && !process.argv.includes('--accept-inferred-months')) throw new Error('Review inferred work months in the report before accepting this production-data rehearsal');
  } finally {
    try { await db.dropDatabase(); await negativeCases(); }
    finally { await local.close(); }
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
