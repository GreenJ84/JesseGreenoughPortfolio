import 'server-only';
import { isDeepStrictEqual } from 'node:util';
import { ObjectId, type Document } from 'mongodb';
import { DB, DB_INFO } from './Database';
import { transformLegacyRecord } from './migrationTransform';

const legacy = [
  ['projects', DB_INFO.collections.PROJ],
  ['certifications', DB_INFO.collections.CERT],
  ['degrees', DB_INFO.collections.EDU],
  ['workExperience', DB_INFO.collections.WORK],
  ['secondaryExperience', DB_INFO.collections.WORK],
  ['resumes', DB_INFO.collections.RES],
  ['skills', DB_INFO.collections.SKILL],
] as const;

function developmentTarget() {
  if (process.env.NODE_ENV === 'production') return false;
  const name = process.env.PORTFOLIO_DB_NAME ?? '';
  if (!/^PersonalPortfolioDev_[0-9]{8}_[a-f0-9]{8}$/.test(name) || DB.databaseName !== name) return false;
  const uri = process.env.DB_CONN_STRING?.trim() || 'mongodb://localhost:27017';
  if (!uri.startsWith('mongodb://')) throw new Error('Development migration requires a local MongoDB connection');
  const authority = uri.slice('mongodb://'.length).split('/')[0];
  if (authority.includes('@') || authority.includes(',')) throw new Error('Development migration refuses credentials or multiple hosts');
  const host = authority.split(':')[0];
  if (!['localhost', '127.0.0.1', '[::1]'].includes(host)) throw new Error('Development migration requires a loopback MongoDB host');
  return true;
}

export async function migrateDevelopmentResources(): Promise<void> {
  if (!developmentTarget()) return;
  const available = new Set((await DB.listCollections({}, { nameOnly: true }).toArray()).map(item => item.name));
  const pending = legacy.filter(([source]) => available.has(source));
  if (!pending.length) return;

  // Copy and verify every source before dropping any legacy collection. A failed
  // or interrupted run leaves the old data intact and can safely be retried.
  for (const [sourceName, targetName] of pending) {
    const source = DB.collection<Document>(sourceName);
    const target = DB.collection<Document>(targetName);
    for await (const oldRow of source.find()) {
      const converted = transformLegacyRecord(sourceName, oldRow);
      const id = converted._id as ObjectId;
      const existing = await target.findOne({ _id: id });
      if (existing) {
        if (!isDeepStrictEqual(existing, converted)) throw new Error(`Migration conflict in ${targetName} for ${id}`);
      } else await target.insertOne(converted as Document);
    }
  }
  for (const [sourceName, targetName] of pending) {
    const source = DB.collection<Document>(sourceName);
    const target = DB.collection<Document>(targetName);
    for await (const oldRow of source.find()) {
      const converted = transformLegacyRecord(sourceName, oldRow);
      const existing = await target.findOne({ _id: converted._id as ObjectId });
      if (!existing || !isDeepStrictEqual(existing, converted)) throw new Error(`Migration verification failed for ${sourceName}`);
    }
  }
  if (pending.some(([source]) => source === 'skills')) {
    await DB.collection<{ _id: string; initialized: boolean }>('portfolioMetadata').updateOne({ _id: 'skills' }, { $set: { initialized: true } }, { upsert: true });
  }
  for (const [sourceName] of pending) await DB.collection(sourceName).drop();
  console.info(`Migrated ${pending.map(([name]) => name).join(', ')} in local development copy ${DB.databaseName}`);
}
