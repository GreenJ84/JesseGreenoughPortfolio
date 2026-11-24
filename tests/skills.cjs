const assert = require('node:assert/strict');
const { test } = require('node:test');
const { loadSource, sourcePath } = require('./security-harness.cjs');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const catalog = loadSource()('src/app/_lib/skillCatalog.ts');
const validation = loadSource()('src/app/_security/validation.ts');

test('legacy skill seed preserves categories, order, ratings and renderable icon keys', () => {
  assert.equal(catalog.seedSkills.length, 58);
  for (const [index, category] of catalog.skillCategories.entries()) {
    const group = catalog.seedSkills.filter(skill => skill.category === category);
    assert.ok(group.length > 0, `group ${index}`);
    assert.deepEqual(Array.from(group, skill => skill.sortOrder), Array.from(group, (_, index) => index));
  }
  for (const skill of catalog.seedSkills) {
    assert.ok(skill.rating >= 1 && skill.rating <= 5);
    assert.ok(catalog.skillIconKeys.includes(skill.iconKey));
    assert.equal(skill.visible, true);
  }
});

test('skill input enforces category, icon, rating, visibility and order', () => {
  const base = catalog.seedSkills[0];
  assert.equal(validation.skillInput(base).name, base.name);
  for (const changes of [{ rating: 0 }, { rating: 2.5 }, { rating: 6 }, { category: 'admin' }, { iconKey: '__proto__' }, { visible: 'true' }, { sortOrder: -1 }, { name: '' }]) {
    assert.throws(() => validation.skillInput({ ...base, ...changes }));
  }
  const allowed = validation.skillInput({ ...base, role: 'admin', _id: 'bad' });
  assert.equal(allowed.role, undefined);
  assert.equal(allowed._id, undefined);
});

test('skill reads use the seed before initialization and honor visibility after it', async () => {
  let initialized = false;
  let fail = false;
  const rows = [{ _id: { toString: () => 'a'.repeat(24) }, category: 'languages', name: 'Rust', normalizedName: 'rust', rating: 4, iconKey: 'Rust', sortOrder: 0, visible: true },
    { _id: { toString: () => 'b'.repeat(24) }, category: 'languages', name: 'Secret', normalizedName: 'secret', rating: 4, iconKey: 'Rust', sortOrder: 1, visible: false }];
  const collections = {
    skills: { find: query => ({ sort: () => ({ toArray: async () => rows.filter(row => !query.visible || row.visible) }) }) },
    portfolioMetadata: { findOne: async () => { if (fail) throw new Error('database unavailable'); return initialized ? { initialized: true } : null; } },
  };
  const service = loadSource({
    [sourcePath('src/app/_utils/Database.ts')]: { DB: { collection: name => collections[name] }, DB_INFO: { name: 'test', collections: { SKILL: 'skills' } } },
    'next/cache': { unstable_cache: fn => fn, updateTag() {}, revalidatePath() {} },
    [sourcePath('src/app/_security/session.ts')]: { requireAdmin: async () => ({ username: 'owner' }) },
    [sourcePath('src/app/_observability/metrics.ts')]: { recordAdminEvent: async () => {} },
  })('src/app/_actions/skillService.ts');
  assert.equal((await service.getPublicSkills()).length, catalog.seedSkills.length);
  initialized = true;
  const publicRows = await service.getPublicSkills();
  assert.equal(publicRows.length, 1);
  assert.equal(publicRows[0].name, 'Rust');
  assert.equal((await service.getAdminSkills()).length, 2);
  fail = true;
  assert.equal((await service.getPublicSkills()).length, 0);
});

test('skill admin operations reject anonymous callers before collection access', async () => {
  let accesses = 0;
  const service = loadSource({
    [sourcePath('src/app/_utils/Database.ts')]: { DB: { collection: () => { accesses++; return {}; } }, DB_INFO: { name: 'test', collections: { SKILL: 'skills' } } },
    'next/cache': { unstable_cache: fn => fn, updateTag() {}, revalidatePath() {} },
    [sourcePath('src/app/_security/session.ts')]: { requireAdmin: async () => { throw new Error('Unauthorized'); } },
    [sourcePath('src/app/_observability/metrics.ts')]: { recordAdminEvent: async () => {} },
  })('src/app/_actions/skillService.ts');
  await assert.rejects(service.getAdminSkills(), /Unauthorized/);
  await assert.rejects(service.getSkillInitializationStatus(), /Unauthorized/);
  await assert.rejects(service.importLegacySkills(), /Unauthorized/);
  await assert.rejects(service.saveSkill(catalog.seedSkills[0]), /Unauthorized/);
  await assert.rejects(service.deleteSkill('a'.repeat(24)), /Unauthorized/);
  assert.equal(accesses, 2); // collection handles are created at module load, not queried
});

test('owner skill writes invalidate public reads and deleting the last skill stays empty', async () => {
  const tags = [], paths = [], events = [];
  let initialized = false;
  let rows = [];
  const collections = {
    skills: {
      createIndex: async () => {},
      insertOne: async data => { rows.push({ ...data, _id: { toString: () => 'a'.repeat(24) } }); },
      deleteOne: async () => { rows = []; return { deletedCount: 1 }; },
      find: query => ({ sort: () => ({ toArray: async () => rows.filter(row => !query.visible || row.visible) }) }),
    },
    portfolioMetadata: {
      findOne: async () => initialized ? { initialized: true } : null,
      updateOne: async () => { initialized = true; },
    },
  };
  const service = loadSource({
    [sourcePath('src/app/_utils/Database.ts')]: { DB: { collection: name => collections[name] }, DB_INFO: { name: 'test', collections: { SKILL: 'skills' } } },
    'next/cache': { unstable_cache: fn => fn, updateTag: tag => tags.push(tag), revalidatePath: path => paths.push(path) },
    [sourcePath('src/app/_security/session.ts')]: { requireAdmin: async () => ({ username: 'owner' }) },
    [sourcePath('src/app/_observability/metrics.ts')]: { recordAdminEvent: async (...args) => events.push(args) },
  })('src/app/_actions/skillService.ts');
  await service.saveSkill(catalog.seedSkills[0]);
  assert.equal((await service.getPublicSkills()).length, 1);
  assert.equal(rows[0].normalizedName, 'rust');
  await service.deleteSkill('a'.repeat(24));
  assert.equal((await service.getPublicSkills()).length, 0);
  assert.equal(tags.length, 2);
  assert.ok(paths.includes('/skills'));
  assert.equal(events.length, 2);
});

test('skills seed refuses remote and mismatched development targets before connecting', () => {
  const script = path.resolve(__dirname, '../scripts/seed-skills.cjs');
  const name = 'PersonalPortfolioDev_20261123_12345678';
  for (const [uri, expected] of [
    ['mongodb://example.com:27017/' + name, /loopback/],
    ['mongodb://127.0.0.1:27017/PersonalPortfolio', /does not match/],
  ]) {
    const result = spawnSync(process.execPath, [script, '--apply'], { cwd: path.dirname(__dirname), env: { ...process.env, DB_CONN_STRING: uri, PORTFOLIO_DB_NAME: name }, encoding: 'utf8' });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, expected);
  }
});
