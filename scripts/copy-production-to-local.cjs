const { MongoClient } = require('mongodb');
const { randomBytes } = require('node:crypto');

const sourceUri = process.env.PORTFOLIO_SOURCE_URI;
const targetUri = process.env.PORTFOLIO_LOCAL_URI || 'mongodb://127.0.0.1:27017';
const sourceDbName = process.env.PORTFOLIO_SOURCE_DB || 'PersonalPortfolio';
const apply = process.argv.includes('--apply');
const collections = ['project', 'certification', 'education', 'work', 'secondaryExperience', 'resume', 'skills', 'portfolioMetadata'];

function localTarget(uri) {
  if (!uri.startsWith('mongodb://')) throw new Error('Local target must use mongodb://');
  const authority = uri.slice('mongodb://'.length).split('/')[0];
  if (authority.includes('@') || authority.includes(',')) throw new Error('Local target cannot use credentials or multiple hosts');
  const host = authority.split(':')[0];
  if (!['localhost', '127.0.0.1', '[::1]'].includes(host)) throw new Error('Local target must be loopback');
}

async function main() {
  if (!sourceUri) throw new Error('Set PORTFOLIO_SOURCE_URI to a read-only production credential');
  if (sourceDbName !== 'PersonalPortfolio') throw new Error('Unexpected source database name');
  localTarget(targetUri);
  if (sourceUri === targetUri) throw new Error('Source and target must differ');
  const source = new MongoClient(sourceUri, { readPreference: 'secondaryPreferred' });
  let target;
  let destination;
  try {
    await source.connect();
    const sourceDb = source.db(sourceDbName);
    const available = new Set((await sourceDb.listCollections({}, { nameOnly: true }).toArray()).map(c => c.name));
    const plan = [];
    for (const name of collections) {
      if (!available.has(name)) continue;
      plan.push({ name, count: await sourceDb.collection(name).countDocuments() });
    }
    console.log(JSON.stringify({ mode: apply ? 'copy' : 'preview', sourceDatabase: sourceDbName, collections: plan }, null, 2));
    if (!apply) return;
    target = new MongoClient(targetUri);
    await target.connect();
    const name = `PersonalPortfolioDev_${new Date().toISOString().slice(0, 10).replaceAll('-', '')}_${randomBytes(4).toString('hex')}`;
    destination = target.db(name);
    for (const { name: collectionName, count } of plan) {
      const cursor = sourceDb.collection(collectionName).find({}, { batchSize: 500 });
      let batch = [], copied = 0;
      for await (const document of cursor) {
        batch.push(document);
        if (batch.length === 500) { await destination.collection(collectionName).insertMany(batch, { ordered: true }); copied += batch.length; batch = []; }
      }
      if (batch.length) { await destination.collection(collectionName).insertMany(batch, { ordered: true }); copied += batch.length; }
      if (copied !== count) throw new Error(`Source changed while copying ${collectionName}; retry with a stable snapshot`);
    }
    console.log(`Local development copy ready. Run with PORTFOLIO_DB_NAME=${name}`);
    destination = undefined;
  } catch (error) {
    if (destination) await destination.dropDatabase().catch(() => {});
    throw error;
  } finally {
    await Promise.allSettled([source.close(), target?.close()]);
  }
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
