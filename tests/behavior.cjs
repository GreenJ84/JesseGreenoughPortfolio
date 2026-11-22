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

const { PaginatedList, fetchListPage } = loadSource()('src/app/_lib/paginatedList.ts');
function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}
const item = id => ({ id, name: id });

test('a slow obsolete filter cannot overwrite the latest selection, even if abort is ignored', async () => {
  const requests = [];
  const list = new PaginatedList({ type: 'top' }, [item('initial')], 1, 1, (query, offset, signal) => {
    const request = deferred(); requests.push({ ...request, query, offset, signal }); return request.promise;
  });
  const old = list.select({ type: 'category', filter: 'old' }, 2);
  const latest = list.select({ type: 'tech', filter: 'C++ & C#' }, 2);
  assert.equal(requests[0].signal.aborted, true);
  requests[1].resolve([item('latest')]); await latest;
  requests[0].resolve([item('obsolete')]); await old;
  assert.equal(list.getSnapshot().query.filter, 'C++ & C#');
  assert.equal(list.getSnapshot().items[0].id, 'latest');
  list.dispose();
});

test('pagination locks duplicate clicks and advances offsets by received rows while deduplicating IDs', async () => {
  const requests = [];
  const list = new PaginatedList({ type: 'all' }, [item('a'), item('b')], 6, 2, (_query, offset) => {
    const request = deferred(); requests.push({ ...request, offset }); return request.promise;
  });
  const page = list.loadMore();
  assert.equal(await list.loadMore(), 0);
  assert.equal(requests.length, 1);
  requests[0].resolve([item('b'), item('c')]); assert.equal(await page, 1);
  const next = list.loadMore();
  assert.equal(requests[1].offset, 4, 'overlap must not repeat offset 3');
  requests[1].resolve([item('d')]); await next;
  assert.equal(list.getSnapshot().items.map(value => value.id).join(','), 'a,b,c,d');
  assert.equal(list.getSnapshot().hasMore, false, 'short final page stops stale totals');
});

test('failed pagination retains visible rows and permits retry at the same offset', async () => {
  let calls = 0;
  const offsets = [];
  const list = new PaginatedList({ type: 'all' }, [item('a')], 2, 1, async (_query, offset) => {
    offsets.push(offset); if (++calls === 1) throw new Error('Network failure'); return [item('b')];
  });
  assert.equal(await list.loadMore(), 0);
  assert.equal(list.getSnapshot().items[0].id, 'a');
  assert.ok(list.getSnapshot().error);
  assert.equal(list.getSnapshot().pending, false);
  assert.equal(await list.loadMore(), 1);
  assert.equal(offsets.join(','), '1,1');
  assert.equal(list.getSnapshot().error, null);
});

test('filter switches cancel in-flight pagination and empty pages never advance resume navigation', async () => {
  const request = deferred();
  const list = new PaginatedList({ type: 'all' }, [item('a')], 10, 1, () => request.promise);
  const oldPage = list.loadMore();
  await list.select({ type: 'category', filter: 'empty' }, 0, []);
  request.resolve([item('old')]);
  assert.equal(await oldPage, 0);
  assert.equal(list.getSnapshot().items.length, 0);
  assert.equal(list.getSnapshot().hasMore, false);
  const empty = new PaginatedList({ type: 'all' }, [item('a')], 5, 1, async () => []);
  assert.equal(await empty.loadMore(), 0);
  assert.equal(empty.getSnapshot().hasMore, false);
});

test('list requests encode special-character filters, reject HTTP errors and validate row identities', async () => {
  const signal = new AbortController().signal;
  let address;
  const rows = await fetchListPage('/api/projects', { type: 'tech', filter: 'C++ & C#' }, 10, signal, async url => { address = new URL(url, 'https://portfolio.test'); return Response.json([item('a')]); });
  assert.equal(address.searchParams.get('filter'), 'C++ & C#');
  assert.equal(address.searchParams.get('offset'), '10');
  assert.equal(rows.length, 1);
  await assert.rejects(fetchListPage('/api/projects', { type: 'all' }, 0, signal, async () => new Response('', { status: 500 })));
  await assert.rejects(fetchListPage('/api/projects', { type: 'all' }, 0, signal, async () => Response.json([{ name: 'missing id' }])));
});
