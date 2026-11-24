const assert = require('node:assert/strict');
const { test } = require('node:test');
const { ObjectId } = require('mongodb');
const { loadSource, sourcePath } = require('./security-harness.cjs');

const { transformLegacyRecord } = loadSource()('src/app/_utils/migrationTransform.ts');

test('legacy resources map to the settled field names without losing identifiers', () => {
  const id = new ObjectId();
  const cases = [
    ['projects', { name: 'API', image_path: '/api.png', brief: 'Rust API', categories: ['Backend'] }, 'title', 'API'],
    ['certifications', { title: 'SecurityX', issuer: 'CompTIA', image: '/cert.png' }, 'brief', 'CompTIA'],
    ['degrees', { degree: 'Cybersecurity', college: 'WGU', date: 'Jan 2025 - Oct 2025' }, 'brief', 'WGU'],
    ['workExperience', { position: 'Engineer', company: 'Example', date: '2024-01..present' }, 'primary', true],
    ['secondaryExperience', { position: 'Volunteer', company: 'Example', date: '2023 - 2024' }, 'primary', false],
    ['resumes', { view: '/resume.pdf', image_url: '/resume.png', categories: ['Backend'] }, 'brief', '/resume.pdf'],
    ['skills', { name: 'Rust', iconKey: 'Rust', rating: 4 }, 'image_url', 'Rust'],
  ];
  for (const [collection, row, key, expected] of cases) {
    const result = transformLegacyRecord(collection, { _id: id, ...row });
    assert.equal(result._id, id);
    assert.equal(result[key], expected);
  }
  assert.throws(() => transformLegacyRecord('workExperience', { _id: id, date: 'unknown' }), /Unrecognized/);
});

function migrationRuntime(env, initial) {
  const data = new Map(Object.entries(initial).map(([name, rows]) => [name, new Map(rows.map(row => [String(row._id), row]))]));
  const DB = {
    databaseName: env.PORTFOLIO_DB_NAME,
    listCollections: () => ({ toArray: async () => [...data.keys()].map(name => ({ name })) }),
    collection(name) {
      if (!data.has(name)) data.set(name, new Map());
      const rows = data.get(name);
      return {
        find: () => ({ async *[Symbol.asyncIterator]() { for (const row of rows.values()) yield row; } }),
        findOne: async ({ _id }) => rows.get(String(_id)) ?? null,
        insertOne: async row => { rows.set(String(row._id), row); },
        drop: async () => { data.delete(name); },
      };
    },
  };
  const load = loadSource({ [sourcePath('src/app/_utils/Database.ts')]: { DB, DB_INFO: { collections: { PROJ: 'project', CERT: 'certification', EDU: 'education', WORK: 'work', RES: 'resume', SKILL: 'skill' } } } }, env);
  return { data, migrate: load('src/app/_utils/migrateDevelopment.ts').migrateDevelopmentResources };
}

test('startup migration copies and verifies local data before dropping legacy collections', async () => {
  const env = { NODE_ENV: 'development', PORTFOLIO_DB_NAME: 'PersonalPortfolioDev_20261124_1234abcd', DB_CONN_STRING: 'mongodb://127.0.0.1:27017' };
  const old = { _id: new ObjectId(), name: 'API', brief: 'Rust API', image_path: '/api.png' };
  const runtime = migrationRuntime(env, { projects: [old] });
  await runtime.migrate();
  assert.equal(runtime.data.has('projects'), false);
  assert.equal(runtime.data.get('project').get(String(old._id)).title, 'API');
  await runtime.migrate();
});

test('migration never runs against production or remote development targets', async () => {
  const name = 'PersonalPortfolioDev_20261124_1234abcd';
  const old = { _id: new ObjectId(), name: 'API' };
  const production = migrationRuntime({ NODE_ENV: 'production', PORTFOLIO_DB_NAME: name, DB_CONN_STRING: 'mongodb://localhost:27017' }, { projects: [old] });
  await production.migrate();
  assert.equal(production.data.has('projects'), true);
  const remote = migrationRuntime({ NODE_ENV: 'development', PORTFOLIO_DB_NAME: name, DB_CONN_STRING: 'mongodb://remote.example:27017' }, { projects: [old] });
  await assert.rejects(remote.migrate(), /loopback/);
  assert.equal(remote.data.has('projects'), true);
});

test('conflicting target documents leave every legacy collection in place', async () => {
  const id = new ObjectId();
  const env = { NODE_ENV: 'development', PORTFOLIO_DB_NAME: 'PersonalPortfolioDev_20261124_1234abcd', DB_CONN_STRING: 'mongodb://localhost:27017' };
  const runtime = migrationRuntime(env, {
    projects: [{ _id: id, name: 'Original', brief: 'Summary' }],
    project: [{ _id: id, title: 'Changed in target' }],
    certifications: [{ _id: new ObjectId(), title: 'Certificate', issuer: 'Issuer' }],
  });
  await assert.rejects(runtime.migrate(), /Migration conflict/);
  assert.equal(runtime.data.has('projects'), true);
  assert.equal(runtime.data.has('certifications'), true);
});
