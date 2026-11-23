import { NextRequest, NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';
import { randomUUID } from 'node:crypto';
import { generateAuthenticationOptions, generateRegistrationOptions, verifyAuthenticationResponse, verifyRegistrationResponse } from '@simplewebauthn/server';
import type { AuthenticationResponseJSON, RegistrationResponseJSON } from '@simplewebauthn/server';
import { authConfig } from '@/app/_security/token';
import { currentAdmin } from '@/app/_security/session';
import { issueAdminSession } from '@/app/_security/issueSession';
import { passkeys, challenges, ensureChallengeIndex, ownerPasskeys, passkeyConfig, type PasskeyRecord } from '@/app/_security/passkeys';
import { rateLimit, clientIdentity } from '@/app/_security/rateLimit';

const cookieName = 'admin-passkey-challenge';
const cookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' as const, path: '/api/admin/passkeys', maxAge: 300 };
const fail = (status = 400) => NextResponse.json({ error: 'Passkey request could not be completed' }, { status });
function sameOrigin(request: NextRequest, expected: string) { return request.headers.get('origin') === expected; }
async function storeChallenge(mode: 'login' | 'register', challenge: string, sessionId?: string) {
  await ensureChallengeIndex();
  const id = randomUUID();
  await challenges.insertOne({ _id: id, username: authConfig().username, mode, challenge, sessionId, expiresAt: new Date(Date.now() + 300000) });
  (await cookies()).set(cookieName, id, cookieOptions);
}
async function consumeChallenge(mode: 'login' | 'register') {
  const id = (await cookies()).get(cookieName)?.value;
  (await cookies()).set(cookieName, '', { ...cookieOptions, maxAge: 0 });
  if (!id) return null;
  const value = await challenges.findOneAndDelete({ _id: id, username: authConfig().username, mode, expiresAt: { $gt: new Date() } });
  return value;
}
export async function POST(request: NextRequest) {
  try {
    const { origin, rpID } = passkeyConfig();
    if (!sameOrigin(request, origin)) return fail(403);
    const raw = await request.text();
    if (raw.length > 32000) return fail(413);
    const body: unknown = JSON.parse(raw);
    if (!body || typeof body !== 'object' || !('action' in body)) return fail();
    const action = body.action;
    if (action === 'login-options') {
      await rateLimit('passkey-login-global', 'owner', 30, 900);
      const identity = clientIdentity(await headers());
      if (identity) await rateLimit('passkey-login-client', identity, 8, 900);
      const credentials = await ownerPasskeys();
      if (!credentials.length) return fail(409);
      const options = await generateAuthenticationOptions({ rpID, allowCredentials: credentials.map(credential => ({ id: credential._id, transports: credential.transports })), userVerification: 'required' });
      await storeChallenge('login', options.challenge);
      return NextResponse.json(options);
    }
    if (action === 'login-verify') {
      const challenge = await consumeChallenge('login');
      if (!challenge || !('response' in body) || !body.response || typeof body.response !== 'object') return fail();
      const response = body.response as AuthenticationResponseJSON;
      if (typeof response.id !== 'string' || !/^[A-Za-z0-9_-]{16,1024}$/.test(response.id)) return fail();
      const credential = await passkeys.findOne({ _id: response.id, username: authConfig().username });
      if (!credential) return fail();
      const verification = await verifyAuthenticationResponse({ response, expectedChallenge: challenge.challenge, expectedOrigin: origin, expectedRPID: rpID, requireUserVerification: true, credential: { id: credential._id, publicKey: new Uint8Array(Buffer.from(credential.publicKey, 'base64url')), counter: credential.counter, transports: credential.transports } });
      if (!verification.verified) return fail();
      await passkeys.updateOne({ _id: credential._id, username: credential.username }, { $set: { counter: verification.authenticationInfo.newCounter } });
      await issueAdminSession();
      return NextResponse.json({ success: true });
    }
    const admin = await currentAdmin();
    if (!admin || admin.username !== authConfig().username) return fail(401);
    if (action === 'register-options') {
      await rateLimit('passkey-register', admin.sessionId, 5, 3600);
      const credentials = await ownerPasskeys();
      const options = await generateRegistrationOptions({ rpName: 'Portfolio Admin', rpID, userName: admin.username, userDisplayName: admin.username, attestationType: 'none', authenticatorSelection: { residentKey: 'required', userVerification: 'required' }, excludeCredentials: credentials.map(credential => ({ id: credential._id, transports: credential.transports })) });
      await storeChallenge('register', options.challenge, admin.sessionId);
      return NextResponse.json(options);
    }
    if (action === 'register-verify') {
      const challenge = await consumeChallenge('register');
      if (!challenge || challenge.sessionId !== admin.sessionId || !('response' in body) || !body.response || typeof body.response !== 'object') return fail();
      const verification = await verifyRegistrationResponse({ response: body.response as RegistrationResponseJSON, expectedChallenge: challenge.challenge, expectedOrigin: origin, expectedRPID: rpID, requireUserVerification: true });
      if (!verification.verified || !verification.registrationInfo) return fail();
      const credential = verification.registrationInfo.credential;
      await passkeys.insertOne({ _id: credential.id, username: admin.username, publicKey: Buffer.from(credential.publicKey).toString('base64url'), counter: credential.counter, transports: credential.transports as PasskeyRecord['transports'], createdAt: new Date() });
      return NextResponse.json({ success: true });
    }
    return fail();
  } catch { return fail(); }
}
