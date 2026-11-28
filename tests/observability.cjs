const assert = require('node:assert/strict');
const { test } = require('node:test');
const { loadSource, sourcePath } = require('./security-harness.cjs');

test('operational alerts aggregate by hour without sending when no alert address is configured', async () => {
  const records = new Map();
  const collection = {
    findOneAndUpdate: async (filter, update) => {
      const previous = records.get(filter._id);
      const next = { ...(previous || update.$setOnInsert), ...update.$set, count: (previous?.count || 0) + update.$inc.count };
      records.set(filter._id, next);
      return next;
    },
  };
  const alerts = loadSource({ [sourcePath('src/app/_utils/Database.ts')]: { DB: { collection: () => collection } } })('src/app/_observability/alerts.ts');
  await alerts.recordAlert('login-failures', 2);
  await alerts.recordAlert('login-failures', 2);
  assert.equal(records.size, 1);
  assert.equal([...records.values()][0].count, 2);
});

test('visitor metrics store only route and UTC date aggregates', async () => {
  const calls = [];
  const collection = { updateOne: async (...args) => { calls.push(args); } };
  const metrics = loadSource({ [sourcePath('src/app/_utils/Database.ts')]: { DB: { collection: () => collection } } })('src/app/_observability/metrics.ts');
  await metrics.recordVisit('/skills');
  assert.match(calls[0][0]._id, /^\d{4}-\d{2}-\d{2}:\/skills$/);
  assert.deepEqual(Object.keys(calls[0][1]).sort(), ['$inc', '$setOnInsert']);
  assert.equal(calls[0][1].$inc.views, 1);
  assert.equal(JSON.stringify(calls).includes('ip'), false);
});
