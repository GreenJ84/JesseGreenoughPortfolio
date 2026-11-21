import 'server-only';
import { createHash } from 'node:crypto';
import { isIP } from 'node:net';
import { DB } from '../_utils/Database';

interface Bucket { _id: string; count: number; expiresAt: Date }
const buckets = DB.collection<Bucket>('securityRateLimits');
let index: Promise<string> | undefined;

export class RateLimitError extends Error {
  constructor(public readonly retryAfter: number) { super('Too many requests. Please try again later.'); }
}

export async function rateLimit(scope: string, identity: string, limit: number, seconds: number) {
  // _id gives atomic cross-instance counters; TTL is cleanup, never the enforcement boundary.
  if (!index) index = buckets.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }).catch(error => { index = undefined; throw error; });
  await index;
  const now = Date.now();
  const window = Math.floor(now / (seconds * 1000));
  const expiresAt = new Date((window + 1) * seconds * 1000);
  const digest = createHash('sha256').update(identity).digest('hex');
  const id = `${scope}:${digest}:${window}`;
  let result;
  try {
    result = await buckets.findOneAndUpdate({ _id: id }, { $inc: { count: 1 }, $setOnInsert: { expiresAt } }, { upsert: true, returnDocument: 'after', includeResultMetadata: true });
  } catch (error) {
    // Concurrent first requests can race on the unique _id during upsert.
    if ((error as { code?: number }).code !== 11000) throw error;
    result = await buckets.findOneAndUpdate({ _id: id }, { $inc: { count: 1 } }, { returnDocument: 'after', includeResultMetadata: true });
  }
  if (!result.value || result.value.count > limit) throw new RateLimitError(Math.max(1, Math.ceil((expiresAt.getTime() - now) / 1000)));
}

export function clientIdentity(headers: Pick<Headers, 'get'>): string | undefined {
  // Never trust a caller-supplied forwarded header unless deployment explicitly opts in.
  const header = process.env.TRUSTED_CLIENT_IP_HEADER;
  if (!header) return undefined;
  const value = headers.get(header)?.trim();
  return value && isIP(value) ? value : undefined;
}
