const assert = require('node:assert/strict');
const fs = require('node:fs');
const { performance } = require('node:perf_hooks');
const { MongoClient } = require('mongodb');
const uri = process.env.DB_CONN_STRING || '';
if (!/^mongodb:\/\/(?:127\.0\.0\.1|localhost):\d{4,5}(?:\/|\?|$)/.test(uri)) throw new Error('DB timing requires local MongoDB');
const percentile = (values, fraction) => [...values].sort((a, b) => a - b)[Math.ceil(values.length * fraction) - 1];
(async () => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(process.env.PORTFOLIO_DB_NAME || 'PersonalPortfolio');
    const cases = [
      ['project-top', 'project', { priority: { $gte: 0 } }, { priority: 1, date: -1, title: 1, _id: -1 }],
      ['project-filter', 'project', { key_techs: 'Rust' }, { priority: 1, date: -1, title: 1, _id: -1 }],
      ['certification-top', 'certification', {}, { priority: 1, date: -1, title: 1, _id: -1 }],
      ['work-primary', 'work', { primary: true }, { _id: -1 }],
      ['skill-visible', 'skill', { visible: true }, { category: 1, sortOrder: 1, title: 1 }],
    ];
    const report = [];
    for (const [name, collection, filter, sort] of cases) {
      const docs = await db.collection(collection).countDocuments();
      assert.ok(docs > 0, `${collection} fixture is empty`);
      const values = [];
      for (let i = 0; i < 20; i++) {
        const start = performance.now();
        await db.collection(collection).find(filter).sort(sort).limit(10).toArray();
        values.push(performance.now() - start);
      }
      const explain = await db.collection(collection).find(filter).sort(sort).limit(10).explain('executionStats');
      report.push({ name, collection, documents: docs, medianMs: Number(percentile(values, 0.5).toFixed(2)), p95Ms: Number(percentile(values, 0.95).toFixed(2)), examined: explain.executionStats?.totalDocsExamined, returned: explain.executionStats?.nReturned });
    }
    fs.mkdirSync('test-results', { recursive: true });
    fs.writeFileSync('test-results/database-queries.json', JSON.stringify(report, null, 2) + '\n');
    console.log(JSON.stringify(report, null, 2));
  } finally { await client.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
