// Edge-compatible token checks. Database-backed revocation is enforced at the action/page boundary.
import { jwtVerify } from 'jose';

export const SESSION_SECONDS = 60 * 60;
export const SESSION_ISSUER = 'portfolio-admin';
export const SESSION_AUDIENCE = 'portfolio-management';

export function authConfig() {
  const secret = process.env.JWT_SECRET;
  const username = process.env.ADMIN_USERNAME?.trim();
  const password = process.env.ADMIN_PASSWORD;
  if (!secret || new TextEncoder().encode(secret).length < 32 || !username || username.length > 200 || !password || password.length < 16 || password.length > 1024) {
    throw new Error('Configure JWT_SECRET (at least 32 bytes), ADMIN_USERNAME, and ADMIN_PASSWORD (16–1024 characters)');
  }
  return { key: new TextEncoder().encode(secret), username, password };
}

export async function verifySessionToken(token: string) {
  const config = authConfig();
  const { payload } = await jwtVerify(token, config.key, {
    algorithms: ['HS256'], issuer: SESSION_ISSUER, audience: SESSION_AUDIENCE,
    requiredClaims: ['sub', 'iat', 'exp', 'jti'], maxTokenAge: SESSION_SECONDS,
  });
  if (payload.sub !== config.username || payload.username !== config.username || payload.role !== 'admin' || typeof payload.jti !== 'string' || !/^[a-f\d-]{36}$/i.test(payload.jti)) throw new Error('Invalid admin session');
  return { username: config.username, role: 'admin' as const, sessionId: payload.jti, iat: payload.iat, expiresAt: new Date(payload.exp! * 1000) };
}
