import 'server-only';
import { cookies } from 'next/headers';
import { DB } from '../_utils/Database';
import { verifySessionToken } from './token';

interface Session { _id: string; username: string; expiresAt: Date }
const sessions = DB.collection<Session>('adminSessions');
let index: Promise<string> | undefined;

export async function createSession(id: string, username: string, expiresAt: Date) {
  if (!index) index = sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }).catch(error => { index = undefined; throw error; });
  await index;
  await sessions.insertOne({ _id: id, username, expiresAt });
}
export async function revokeSession(token: string) {
  let session;
  try { session = await verifySessionToken(token); } catch { return; }
  await sessions.deleteOne({ _id: session.sessionId, username: session.username });
}
export async function currentAdmin() {
  const token = (await cookies()).get('admin-token')?.value;
  if (!token) return null;
  let claims;
  try { claims = await verifySessionToken(token); } catch { return null; }
  const session = await sessions.findOne({ _id: claims.sessionId, username: claims.username, expiresAt: { $gt: new Date() } });
  return session ? claims : null;
}
export async function requireAdmin() {
  const admin = await currentAdmin();
  if (!admin) throw new Error('Unauthorized');
  return admin;
}
