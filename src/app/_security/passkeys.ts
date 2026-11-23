import 'server-only';
import { DB } from '../_utils/Database';
import { authConfig } from './token';
import type { AuthenticatorTransport } from '@simplewebauthn/server';

export interface PasskeyRecord {
  _id: string;
  username: string;
  publicKey: string;
  counter: number;
  transports?: AuthenticatorTransport[];
  createdAt: Date;
}
export interface PasskeyChallenge {
  _id: string;
  username: string;
  mode: 'login' | 'register';
  challenge: string;
  sessionId?: string;
  expiresAt: Date;
}
export const passkeys = DB.collection<PasskeyRecord>('adminPasskeys');
export const challenges = DB.collection<PasskeyChallenge>('adminPasskeyChallenges');
let challengeIndex: Promise<string> | undefined;
export async function ensureChallengeIndex() {
  challengeIndex ??= challenges.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }).catch(error => { challengeIndex = undefined; throw error; });
  await challengeIndex;
}
export async function ownerPasskeys() {
  return passkeys.find({ username: authConfig().username }).toArray();
}
export function passkeyConfig() {
  const origin = process.env.ADMIN_PASSKEY_ORIGIN || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000');
  const rpID = process.env.ADMIN_PASSKEY_RP_ID || (process.env.NODE_ENV === 'production' ? '' : 'localhost');
  const parsed = new URL(origin);
  if (parsed.origin !== origin || parsed.hostname !== rpID || (parsed.protocol !== 'https:' && (process.env.NODE_ENV === 'production' || parsed.hostname !== 'localhost'))) throw new Error('Configure ADMIN_PASSKEY_ORIGIN and ADMIN_PASSKEY_RP_ID for the owner domain');
  return { origin, rpID };
}
