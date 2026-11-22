const assert = require('node:assert/strict');
const { test } = require('node:test');
const { ObjectId } = require('mongodb');
const { loadSource, sourcePath } = require('./security-harness.cjs');

function cachedDomain(entity, initial) {
  let docs = initial;
  const cache = new Map();
  const invalidated = [];
  let authorizations = 0;
  const collection = {
    find() {
      let offset = 0, limit = Infinity;
      const cursor = {
        sort: () => cursor, skip: value => { offset = value; return cursor; },
        limit: value => { limit = value; return cursor; }, project: () => cursor,
        toArray: async () => docs.slice(offset, offset + limit).map(doc => ({ ...doc })),
      };
      return cursor;
    },
    countDocuments: async () => docs.length,
    insertOne: async data => { docs.push({ ...data, _id: new ObjectId() }); },
    updateOne: async (query, update) => {
      const item = docs.find(doc => doc._id.equals(query._id));
      if (!item) return { matchedCount: 0 };
      Object.assign(item, update.$set);
      for (const field of Object.keys(update.$unset ?? {})) delete item[field];
      return { matchedCount: 1 };
    },
    deleteOne: async query => { const before = docs.length; docs = docs.filter(doc => !doc._id.equals(query._id)); return { deletedCount: before - docs.length }; },
  };
  const actions = loadSource({
    [sourcePath('src/app/_security/session.ts')]: { requireAdmin: async () => { authorizations++; } },
    [sourcePath('src/app/_utils/Database.ts')]: { DB: { collection: () => collection }, DB_INFO: { collections: {} } },
    'next/cache': {
      unstable_cache: (fn, key, { tags }) => async (...args) => {
        const id = JSON.stringify([key, args]);
        if (!cache.has(id)) cache.set(id, { tags, result: await fn(...args) });
        return cache.get(id).result;
      },
      updateTag: tag => { invalidated.push(tag); for (const [id, value] of cache) if (value.tags.includes(tag)) cache.delete(id); },
      revalidatePath() {},
    },
  })(`src/app/_actions/${entity}Service.ts`);
  return { actions, invalidated, authorizations: () => authorizations };
}

test('education writes immediately refresh warmed public lists, admin lists and totals', async () => {
  const id = new ObjectId();
  const input = { title: 'Degree', college: 'College', brief: '', description: '', image: '', url: '', start_date: new Date('2024-01-01'), details: [] };
  const { actions, invalidated, authorizations } = cachedDomain('education', [{ ...input, _id: id }]);
  await actions.getEducation(); await actions.getAllEducation(); await actions.getEducationCount();
  const before = authorizations();
  await actions.getAllEducation();
  assert.equal(authorizations(), before + 1, 'cached admin reads must still authorize');
  await actions.saveEducation({ ...input, id: id.toString(), title: 'Updated' });
  assert.equal((await actions.getEducation())[0].title, 'Updated');
  assert.equal((await actions.getAllEducation())[0].title, 'Updated');
  await actions.saveEducation({ ...input, title: 'Added' });
  assert.equal(await actions.getEducationCount(), 2);
  const added = (await actions.getAllEducation()).find(item => item.title === 'Added');
  await actions.deleteEducation(added.id);
  assert.equal(await actions.getEducationCount(), 1);
  assert.equal((await actions.getAllEducation()).length, 1);
  for (const tag of ['educationData', 'allEducationData', 'totalEducation']) assert.ok(invalidated.includes(tag));
});

test('project mutations refresh cached category and technology counts', async () => {
  const id = new ObjectId();
  const input = { name: 'Project', priority: 1, date: '2026', brief: 'Summary', description: 'Details', image_path: '/assets/image.png', deployed_url: '', github_url: 'https://github.com/example/project', categories: ['old'], key_techs: ['old-tech'] };
  const { actions } = cachedDomain('project', [{ ...input, _id: id }]);
  assert.equal((await actions.getProjectFilters())[0][0][0], 'old');
  await actions.saveProject({ ...input, id: id.toString(), categories: ['new'], key_techs: ['new-tech'] });
  const [categories, technologies] = await actions.getProjectFilters();
  assert.equal(categories[0][0], 'new');
  assert.equal(technologies[0][0], 'new-tech');
  await actions.deleteProject(id.toString());
  const [emptyCategories, emptyTechnologies] = await actions.getProjectFilters();
  assert.equal(emptyCategories.length, 0); assert.equal(emptyTechnologies.length, 0);
});
