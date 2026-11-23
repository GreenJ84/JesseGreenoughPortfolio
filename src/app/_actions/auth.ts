'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { createHash, timingSafeEqual } from 'node:crypto';
import { authConfig } from '../_security/token';
import { issueAdminSession } from '../_security/issueSession';
import { ownerPasskeys } from '../_security/passkeys';
import { currentAdmin, revokeSession } from '../_security/session';
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
    const identity = clientIdentity(await headers());
    if (identity) await rateLimit('login-client', identity, 5, 900);
    const username = formData.get('username');
    const password = formData.get('password');
    if (typeof username !== 'string' || typeof password !== 'string' || username.length > 200 || password.length > 1024) return { success: false, message: 'Invalid credentials' };
    const userMatches = equal(username, config.username);
    const passwordMatches = equal(password, config.password);
    if (!userMatches || !passwordMatches) return { success: false, message: 'Invalid credentials' };
    if ((await ownerPasskeys()).length > 0) return { success: false, message: 'Use your passkey to sign in' };
    await issueAdminSession();
  } catch (error) {
    return { success: false, message: error instanceof RateLimitError ? error.message : 'Login unavailable. Please try again later.' };
  }
  redirect('/admin/dashboard');
}

export async function logoutAction() {
  const token = (await cookies()).get('admin-token')?.value;
  if (token) {
    // A storage failure must not claim that a still-valid session was revoked.
    try { await revokeSession(token); } catch {
      return { success: false, message: 'Logout unavailable. Please try again.' };
    }
  }
  (await cookies()).set('admin-token', '', { ...cookieOptions, maxAge: 0 });
  redirect('/admin/login');
}

export async function verifyAuth() {
  const admin = await currentAdmin();
  return admin ? { isValid: true, user: { username: admin.username, role: admin.role, iat: admin.iat } } : { isValid: false };
}
