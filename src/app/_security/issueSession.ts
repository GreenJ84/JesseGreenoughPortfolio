import 'server-only';
import { randomUUID } from 'node:crypto';
import { cookies } from 'next/headers';
import { SignJWT } from 'jose';
import { authConfig, SESSION_AUDIENCE, SESSION_ISSUER, SESSION_SECONDS } from './token';
import { createSession } from './session';
export async function issueAdminSession() {
  const config = authConfig();
  const id = randomUUID();
  const now = Math.floor(Date.now() / 1000);
  const expires = now + SESSION_SECONDS;
  const token = await new SignJWT({ username: config.username, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' }).setSubject(config.username)
    .setIssuer(SESSION_ISSUER).setAudience(SESSION_AUDIENCE).setJti(id)
    .setIssuedAt(now).setExpirationTime(expires).sign(config.key);
  await createSession(id, config.username, new Date(expires * 1000));
  (await cookies()).set('admin-token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', maxAge: SESSION_SECONDS });
}
