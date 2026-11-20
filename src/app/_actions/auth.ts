'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { createHash, randomUUID, timingSafeEqual } from 'node:crypto';
import { SignJWT } from 'jose';
import { authConfig, SESSION_AUDIENCE, SESSION_ISSUER, SESSION_SECONDS } from '../_security/token';
import { createSession, currentAdmin, revokeSession } from '../_security/session';
import { clientIdentity, rateLimit, RateLimitError } from '../_security/rateLimit';

// Fail at module startup instead of silently issuing tokens with missing configuration.
authConfig();
const cookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' as const, path: '/' };
function equal(value: string, expected: string) {
  return timingSafeEqual(createHash('sha256').update(value).digest(), createHash('sha256').update(expected).digest());
}

export async function loginAction(formData: FormData) {
  try {
    const config = authConfig();
    await rateLimit('login-global', 'admin', 30, 900);
    const identity = clientIdentity(headers());
    if (identity) await rateLimit('login-client', identity, 5, 900);
    const username = formData.get('username');
    const password = formData.get('password');
    if (typeof username !== 'string' || typeof password !== 'string' || username.length > 200 || password.length > 1024) return { success: false, message: 'Invalid credentials' };
    const userMatches = equal(username, config.username);
    const passwordMatches = equal(password, config.password);
    if (!userMatches || !passwordMatches) return { success: false, message: 'Invalid credentials' };
    const id = randomUUID();
    const issuedAt = Math.floor(Date.now() / 1000);
    const expiresAt = issuedAt + SESSION_SECONDS;
    const token = await new SignJWT({ username: config.username, role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' }).setSubject(config.username)
      .setIssuer(SESSION_ISSUER).setAudience(SESSION_AUDIENCE).setJti(id)
      .setIssuedAt(issuedAt).setExpirationTime(expiresAt).sign(config.key);
    await createSession(id, config.username, new Date(expiresAt * 1000));
    cookies().set('admin-token', token, { ...cookieOptions, maxAge: SESSION_SECONDS });
  } catch (error) {
    return { success: false, message: error instanceof RateLimitError ? error.message : 'Login unavailable. Please try again later.' };
  }
  redirect('/admin/dashboard');
}

export async function logoutAction() {
  const token = cookies().get('admin-token')?.value;
  if (token) {
    // A storage failure must not claim that a still-valid session was revoked.
    try { await revokeSession(token); } catch {
      return { success: false, message: 'Logout unavailable. Please try again.' };
    }
  }
  cookies().set('admin-token', '', { ...cookieOptions, maxAge: 0 });
  redirect('/admin/login');
}

export async function verifyAuth() {
  const admin = await currentAdmin();
  return admin ? { isValid: true, user: { username: admin.username, role: admin.role, iat: admin.iat } } : { isValid: false };
}
