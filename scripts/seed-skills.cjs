const path = require('node:path');
const fs = require('node:fs');
const Module = require('node:module');
const ts = require('typescript');
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const apply = process.argv.includes('--apply');
const production = process.argv.includes('--production');
const name = production ? 'PersonalPortfolio' : process.env.PORTFOLIO_DB_NAME;
const uri = production ? process.env.PORTFOLIO_PRODUCTION_URI : (process.env.PORTFOLIO_LOCAL_URI || 'mongodb://127.0.0.1:27017');

function requireLocal(uri) {
  if (!uri?.startsWith('mongodb://')) throw new Error('Development target must be a local MongoDB URI');
  const authority = uri.slice('mongodb://'.length).split('/')[0];
  if (authority.includes('@') || authority.includes(',')) throw new Error('Development target must be one loopback host without credentials');
  if (!['localhost', '127.0.0.1', '[::1]'].includes(authority.split(':')[0])) throw new Error('Development target must use loopback');
}

function legacySkills() {
  const filename = path.resolve('src/app/(portfolio)/skills/_components/skillData.ts');
  const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const source = new Module(filename, module);
  source.filename = filename;
  source.paths = Module._nodeModulePaths(path.dirname(filename));
  source._compile(compiled, filename);
  return Object.entries(source.exports.skillData).flatMap(([category, items]) => items.map((skill, sortOrder) => ({
    category, name: skill.name, normalizedName: skill.name.trim().toLocaleLowerCase('en-US'),
    rating: skill.rating, iconKey: skill.name, sortOrder, visible: true,
  })));
}

async function main() {
  if (production) {
    if (!uri || (apply && !process.argv.includes('--confirm-production-skills'))) throw new Error('Production import requires PORTFOLIO_PRODUCTION_URI; writes also require --confirm-production-skills');
  } else {
    requireLocal(uri);
    if (!/^PersonalPortfolioDev_[0-9]{8}_[a-f0-9]{8}$/.test(name || '')) throw new Error('Set PORTFOLIO_DB_NAME to an isolated PersonalPortfolioDev_... database');
  }
  const records = legacySkills();
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db(name);
    const skills = database.collection('skills');
    const state = database.collection('portfolioMetadata');
    const initialized = Boolean(await state.findOne({ _id: 'skills' }));
    const existing = await skills.countDocuments();
    console.log(JSON.stringify({ mode: apply ? 'import' : 'preview', database: name, legacyRecords: records.length, existingRecords: existing, initialized }, null, 2));
    if (!apply || initialized) return;
    await skills.createIndex({ category: 1, normalizedName: 1 }, { unique: true, name: 'skill_category_name_unique' });
    await skills.bulkWrite(records.map(record => ({ updateOne: { filter: { category: record.category, normalizedName: record.normalizedName }, update: { $setOnInsert: record }, upsert: true } })), { ordered: true });
    await state.updateOne({ _id: 'skills' }, { $set: { initialized: true } }, { upsert: true });
    console.log('Imported skills. Public pages can now read the collection.');
  } finally {
    await client.close();
  }
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
