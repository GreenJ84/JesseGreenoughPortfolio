const assert = require('node:assert/strict');
const { test } = require('node:test');
const { loadSource, sourcePath } = require('./security-harness.cjs');
const tags = loadSource()('src/app/_lib/tagOptions.ts');

test('tag suggestions deduplicate case-insensitively and exclude values already selected', () => {
  const options = tags.uniqueTags(['Rust', 'rust', ' TypeScript ', '', null, 'Node.js']);
  assert.deepEqual(options, ['Node.js', 'Rust', 'TypeScript']);
  assert.deepEqual(tags.unusedTags(options, ['RUST'], 'no'), ['Node.js']);
});

test('admin tag options require the owner before querying collections', async () => {
  let queries = 0;
  const load = loadSource({
    [sourcePath('src/app/_security/session.ts')]: { requireAdmin: async () => { throw new Error('Unauthorized'); } },
    [sourcePath('src/app/_utils/Database.ts')]: { DB: { collection: () => { queries++; return {}; } }, DB_INFO: { collections: { PROJ: 'projects', CERT: 'certs' } } },
  });
  const actions = load('src/app/_actions/adminTagOptions.ts');
  await assert.rejects(actions.getProjectTagOptions(), /Unauthorized/);
  await assert.rejects(actions.getCertificationTagOptions(), /Unauthorized/);
  assert.equal(queries, 0);
});

test('admin tag options are sorted and shared across existing records', async () => {
  const load = loadSource({
    [sourcePath('src/app/_security/session.ts')]: { requireAdmin: async () => ({ username: 'owner' }) },
    [sourcePath('src/app/_utils/Database.ts')]: { DB: { collection: name => ({ distinct: async field => ({
      categories: ['Web', 'web', 'Security'],
      key_techs: ['Rust', 'TypeScript'],
      techs: ['Rust', 'Python'],
    })[field] }) }, DB_INFO: { collections: { PROJ: 'projects', CERT: 'certs' } } },
  });
  const actions = load('src/app/_actions/adminTagOptions.ts');
  assert.deepEqual(JSON.parse(JSON.stringify(await actions.getProjectTagOptions())), { categories: ['Security', 'Web'], technologies: ['Rust', 'TypeScript'] });
  assert.deepEqual(JSON.parse(JSON.stringify(await actions.getCertificationTagOptions())), ['Python', 'Rust']);
});
