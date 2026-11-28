const assert = require('node:assert/strict');
const { test } = require('node:test');
const { loadSource, sourcePath } = require('./security-harness.cjs');

const catalog = loadSource()('src/app/_lib/skillCatalog.ts');
const validation = loadSource()('src/app/_security/validation.ts');
const rust = { title: 'Rust', name: 'Rust', brief: '', image_url: 'Rust', category: 'languages', rating: 4, sortOrder: 0, visible: true };

test('skill presentation metadata provides categories and renderable icon keys without a seed', () => {
  assert.ok(catalog.skillCategories.includes('languages'));
  assert.ok(catalog.skillIconKeys.includes('Rust'));
  assert.equal(catalog.skillIconRegistry.Rust !== undefined, true);
  assert.equal('seedSkills' in catalog, false);
});

test('skill input enforces category, icon, rating, visibility and order', () => {
  assert.equal(validation.skillInput(rust).name, rust.name);
  for (const changes of [{ rating: 0 }, { rating: 2.5 }, { rating: 6 }, { category: 'admin' }, { image_url: '__proto__' }, { visible: 'true' }, { sortOrder: -1 }, { title: '' }]) {
    assert.throws(() => validation.skillInput({ ...rust, ...changes }));
  }
  const allowed = validation.skillInput({ ...rust, role: 'admin', _id: 'bad' });
  assert.equal(allowed.role, undefined);
  assert.equal(allowed._id, undefined);
});

function skillService(collection, requireAdmin = async () => ({ username: 'owner' }), events = []) {
  return loadSource({
    [sourcePath('src/app/_utils/Database.ts')]: { DB: { collection: name => {
      assert.equal(name, 'skill');
      return collection;
    } }, DB_INFO: { name: 'test', collections: { SKILL: 'skill' } } },
    'next/cache': { unstable_cache: fn => fn, updateTag() {}, revalidatePath() {} },
    [sourcePath('src/app/_security/session.ts')]: { requireAdmin },
    [sourcePath('src/app/_observability/metrics.ts')]: { recordAdminEvent: async (...args) => events.push(args) },
  })('src/app/_actions/skillService.ts');
}

test('public skill reads use persisted visible records and preserve an empty collection', async () => {
  let rows = [];
  const service = skillService({ find: query => ({ sort: () => ({ toArray: async () => rows.filter(row => !query.visible || row.visible) }) }) });
  assert.equal((await service.getPublicSkills()).length, 0);
  rows = [
    { ...rust, _id: { toString: () => 'a'.repeat(24) }, normalizedName: 'rust' },
    { ...rust, title: 'Hidden', visible: false, _id: { toString: () => 'b'.repeat(24) }, normalizedName: 'hidden' },
  ];
  assert.equal((await service.getPublicSkills()).length, 1);
  assert.equal((await service.getAdminSkills()).length, 2);
});

test('skill admin operations reject anonymous callers before collection access', async () => {
  let accesses = 0;
  const service = skillService(new Proxy({}, { get() { accesses++; return () => {}; } }), async () => { throw new Error('Unauthorized'); });
  await assert.rejects(service.getAdminSkills(), /Unauthorized/);
  await assert.rejects(service.saveSkill(rust), /Unauthorized/);
  await assert.rejects(service.deleteSkill('a'.repeat(24)), /Unauthorized/);
  assert.equal(accesses, 0);
});

test('owner skill writes invalidate public reads and deleting the last skill stays empty', async () => {
  let rows = [];
  const events = [];
  const service = skillService({
    createIndex: async () => {},
    insertOne: async data => { rows.push({ ...data, _id: { toString: () => 'a'.repeat(24) } }); },
    deleteOne: async () => { rows = []; return { deletedCount: 1 }; },
    find: query => ({ sort: () => ({ toArray: async () => rows.filter(row => !query.visible || row.visible) }) }),
  }, undefined, events);
  await service.saveSkill(rust);
  assert.equal((await service.getPublicSkills()).length, 1);
  assert.equal(rows[0].normalizedName, 'rust');
  await service.deleteSkill('a'.repeat(24));
  assert.equal((await service.getPublicSkills()).length, 0);
  assert.equal(events.length, 2);
});
