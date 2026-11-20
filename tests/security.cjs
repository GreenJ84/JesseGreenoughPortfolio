const assert = require('node:assert/strict');
const { test } = require('node:test');
const { loadSource, sourcePath } = require('./security-harness.cjs');
const crypto = require('node:crypto');
const validation = loadSource()('src/app/_security/validation.ts');
const query = loadSource()('src/app/_security/query.ts');
const config = { JWT_SECRET: 'a'.repeat(64), ADMIN_USERNAME: 'owner', ADMIN_PASSWORD: 'a-long-test-password', NODE_ENV: 'test' };
const validProject = { name: 'Portfolio', priority: 1, date: '2025', brief: 'Summary', description: 'Description', image_path: '/assets/image.png', deployed_url: '', github_url: 'https://github.com/example/project', categories: ['web'], key_techs: ['TypeScript'] };
const validEducation = { college: 'College', title: 'Degree', brief: '', description: '', image: '', url: '', start_date: '2024-01-01', details: [] };
const validCertification = { title: 'Certificate', issuer: 'Issuer', priority: 1, date: '2025', description: 'Description', image: '', url: '', techs: [] };
const validWork = { company: 'Company', position: 'Engineer', location: 'Remote', date: '2025', logo: '', details: [] };

test('mutation schemas allowlist properties and reject malicious values', () => {
  const data = validation.projectInput({ ...validProject, _id: 'injected', role: 'admin', $set: { name: 'bad' } });
  assert.equal(data.name, 'Portfolio');
  assert.equal(data._id, undefined);
  assert.equal(data.role, undefined);
  for (const patch of [{ name: {} }, { priority: Infinity }, { priority: -1 }, { key_techs: Array(51).fill('x') }, { description: 'x'.repeat(20001) }, { github_url: 'javascript:alert(1)' }, { image_path: '//evil.test/image' }, { image_path: '/\\evil.test/image' }, { id: 'abcdefghijkl' }]) {
    assert.throws(() => validation.projectInput({ ...validProject, ...patch }));
  }
  assert.throws(() => validation.workCategory('__proto__'));
  assert.throws(() => validation.educationInput({ ...validEducation, start_date: '2024-02-31' }));
  assert.throws(() => validation.educationInput({ ...validEducation, end_date: '2023-01-01' }));
  assert.equal(validation.educationInput(validEducation).start_date.toISOString(), '2024-01-01T00:00:00.000Z');
});

test('query parsing rejects invalid offsets, duplicate parameters, types and missing filters', () => {
  for (const value of ['-1', '1.5', '1e3', 'Infinity', 'NaN', '', '10001', '0x10', '1abc']) assert.throws(() => query.queryInput(new URLSearchParams(`offset=${value}`), ['all'], 'all'));
  for (const value of ['offset=0&offset=1', 'type=bad', 'type=category', 'type=category&filter=' + 'a'.repeat(201)]) assert.throws(() => query.queryInput(new URLSearchParams(value), ['all', 'category'], 'all'));
  assert.equal(query.queryInput(new URLSearchParams('offset=10000'), ['all'], 'all').offset, 10000);
});

for (const [entity, input] of [['Project', validProject], ['Certification', validCertification], ['Education', validEducation], ['Work', validWork]]) {
  test(`${entity} actions reject anonymous callers before any query, write or invalidation`, async () => {
    let writes = 0;
    const collection = { updateOne() { writes++; }, insertOne() { writes++; }, deleteOne() { writes++; }, find() { writes++; } };
    const load = loadSource({
      [sourcePath('src/app/_security/session.ts')]: { requireAdmin: async () => { throw new Error('Unauthorized'); } },
      [sourcePath('src/app/_utils/Database.ts')]: { DB: { collection: () => collection }, DB_INFO: { collections: {} } },
      'next/cache': { unstable_cache: fn => fn, revalidateTag() { writes++; }, revalidatePath() { writes++; } },
    });
    const actions = load(`src/app/_actions/${entity.toLowerCase()}Service.ts`);
    const args = entity === 'Work' ? ['primary', input] : [input];
    await assert.rejects(actions[`save${entity}`](...args), /Unauthorized/);
    await assert.rejects(actions[`delete${entity}`](...(entity === 'Work' ? ['primary', 'a'.repeat(24)] : ['a'.repeat(24)])), /Unauthorized/);
    const getter = actions[`getFullAll${entity === 'Work' ? 'WorkByCategory' : entity + 's'}`] ?? actions.getAllEducation;
    await assert.rejects(getter('primary'), /Unauthorized/);
    assert.equal(writes, 0);
  });
  test(`${entity} actions validate authenticated writes and report missing records`, async () => {
    const writes = [];
    const collection = {
      updateOne: async (...args) => { writes.push(args); return { matchedCount: 0 }; },
      insertOne: async data => { writes.push(data); return {}; },
      deleteOne: async () => ({ deletedCount: 0 }),
    };
    const actions = loadSource({
      [sourcePath('src/app/_security/session.ts')]: { requireAdmin: async () => ({ role: 'admin' }) },
      [sourcePath('src/app/_utils/Database.ts')]: { DB: { collection: () => collection }, DB_INFO: { collections: {} } },
      'next/cache': { unstable_cache: fn => fn, revalidateTag() {}, revalidatePath() {} },
    })(`src/app/_actions/${entity.toLowerCase()}Service.ts`);
    const save = value => actions[`save${entity}`](...(entity === 'Work' ? ['primary', value] : [value]));
    await assert.rejects(save({}));
    assert.equal(writes.length, 0);
    await save({ ...input, role: 'admin' });
    assert.equal(writes[0].role, undefined);
    await assert.rejects(save({ ...input, id: 'a'.repeat(24) }), /Record not found/);
    await assert.rejects(actions[`delete${entity}`](...(entity === 'Work' ? ['primary', 'a'.repeat(24)] : ['a'.repeat(24)])));
  });
}

test('JWT verification checks signature, identity, role, algorithm, audience, issuer, age and required claims', async () => {
  const jose = await import('jose');
  const { verifySessionToken } = loadSource({ jose }, config)('src/app/_security/token.ts');
  async function token(overrides = {}, options = {}) {
    const now = Math.floor(Date.now() / 1000);
    return new jose.SignJWT({ sub: 'owner', username: 'owner', role: 'admin', jti: crypto.randomUUID(), iat: now, exp: now + 3600, iss: 'portfolio-admin', aud: 'portfolio-management', ...overrides })
      .setProtectedHeader({ alg: options.alg ?? 'HS256' }).sign(new TextEncoder().encode(options.secret ?? config.JWT_SECRET));
  }
  assert.equal((await verifySessionToken(await token())).role, 'admin');
  for (const claims of [{ role: 'user' }, { sub: 'other' }, { username: 'other' }, { aud: 'other' }, { iss: 'other' }, { exp: 1 }, { iat: 1 }, { jti: undefined }]) await assert.rejects(verifySessionToken(await token(claims)));
  await assert.rejects(verifySessionToken(await token({}, { alg: 'HS384' })));
  await assert.rejects(verifySessionToken(await token({}, { secret: 'b'.repeat(64) })));
  assert.throws(() => loadSource({ jose }, { ...config, JWT_SECRET: '' })('src/app/_security/token.ts').authConfig());
});

test('login creates a revocable session; replay after logout and non-admin tokens are denied', async () => {
  const jose = await import('jose');
  const stored = new Map();
  let cookie;
  let throttle = false;
  const load = loadSource({
    jose,
    'next/headers': { cookies: () => ({ get: () => cookie ? { value: cookie } : undefined, set: (_name, value) => { cookie = value; } }), headers: () => new Headers() },
    'next/navigation': { redirect: to => { throw new Error(`REDIRECT:${to}`); } },
    [sourcePath('src/app/_security/rateLimit.ts')]: { rateLimit: async () => { if (throttle) throw new Error('Storage unavailable'); }, clientIdentity: () => undefined, RateLimitError: class extends Error {} },
    [sourcePath('src/app/_utils/Database.ts')]: { DB: { collection: () => ({
      createIndex: async () => 'ttl', insertOne: async data => { stored.set(data._id, data); },
      findOne: async filter => { const value = stored.get(filter._id); return value && value.username === filter.username && value.expiresAt > new Date() ? value : null; },
      deleteOne: async filter => { stored.delete(filter._id); },
    }) } },
  }, config);
  const auth = load('src/app/_actions/auth.ts');
  const session = load('src/app/_security/session.ts');
  const form = new FormData(); form.set('username', config.ADMIN_USERNAME); form.set('password', config.ADMIN_PASSWORD);
  const wrong = new FormData(); wrong.set('username', 'owner'); wrong.set('password', 'wrong');
  assert.equal((await auth.loginAction(wrong)).success, false);
  assert.equal(stored.size, 0);
  await assert.rejects(auth.loginAction(form), /REDIRECT:\/admin\/dashboard/);
  const replay = cookie;
  assert.equal((await session.requireAdmin()).username, 'owner');
  await assert.rejects(auth.logoutAction(), /REDIRECT:\/admin\/login/);
  cookie = replay;
  await assert.rejects(session.requireAdmin(), /Unauthorized/);
  throttle = true;
  assert.equal((await auth.loginAction(form)).success, false);
  assert.equal(stored.size, 0);
});

test('shared limiter enforces the limit across callers and fails closed on storage errors', async () => {
  const buckets = new Map();
  let broken = false;
  const limiter = loadSource({
    [sourcePath('src/app/_utils/Database.ts')]: { DB: { collection: () => ({
      createIndex: async () => 'ttl',
      findOneAndUpdate: async (filter, update) => {
        if (broken) throw new Error('Storage unavailable');
        const count = (buckets.get(filter._id) ?? 0) + 1;
        buckets.set(filter._id, count);
        return { value: { count, expiresAt: update.$setOnInsert?.expiresAt } };
      },
    }) } },
  })('src/app/_security/rateLimit.ts');
  const results = await Promise.allSettled(Array.from({ length: 10 }, () => limiter.rateLimit('test', 'private@example.com', 3, 900)));
  assert.equal(results.filter(result => result.status === 'fulfilled').length, 3);
  assert.ok([...buckets.keys()].every(key => !key.includes('private@example.com')));
  await assert.rejects(limiter.rateLimit('test', 'private@example.com', 3, 900), error => error instanceof limiter.RateLimitError && error.retryAfter > 0);
  assert.equal(limiter.clientIdentity(new Headers({ 'x-forwarded-for': '1.2.3.4' })), undefined);
  broken = true;
  await assert.rejects(limiter.rateLimit('test', 'other', 3, 900), /Storage unavailable/);
});

function contactHarness({ sendError = false, rateError = false, rejected = false, brokenStorage = false } = {}) {
  const sent = [];
  class RateLimitError extends Error { retryAfter = 60; }
  const route = loadSource({
    'next/server': { NextResponse: Response },
    nodemailer: { createTransport: () => ({ sendMail: async mail => { sent.push(mail); if (sendError) throw new Error('secret SMTP provider failure'); return { accepted: rejected ? [] : ['owner@example.com'], rejected: rejected ? ['owner@example.com'] : [] }; }, close() {} }) },
    [sourcePath('src/app/_security/rateLimit.ts')]: { clientIdentity: () => undefined, rateLimit: async () => { if (rateError) throw new RateLimitError('Slow down'); if (brokenStorage) throw new Error('Mongo failure'); }, RateLimitError },
  }, { USER_EMAIL: 'sender@example.com', CONTACT_EMAIL: 'owner@example.com', USER_PASS: 'mail-secret' })('src/app/api/sendEmail/route.ts');
  return { sent, post(body, headers = {}, raw) {
    const req = new Request('https://portfolio.test/api/sendEmail', { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: raw ?? JSON.stringify(body) });
    req.nextUrl = new URL(req.url);
    return route.POST(req);
  } };
}
const contact = { name: 'Visitor', sender: 'visitor@example.com', subject: 'Hello', message: '<img src=x onerror=alert(1)>' };

test('contact sends plain text with replyTo and never returns success for delivery or storage failure', async () => {
  const harness = contactHarness();
  assert.equal((await harness.post(contact)).status, 201);
  assert.equal(harness.sent[0].replyTo, contact.sender);
  assert.equal(harness.sent[0].html, undefined);
  assert.equal(harness.sent[0].disableFileAccess, true);
  for (const options of [{ sendError: true }, { rejected: true }, { brokenStorage: true }]) {
    const response = await contactHarness(options).post(contact);
    assert.equal(response.status, 503);
    const body = await response.json();
    assert.equal(body.success, false);
    assert.ok(!body.message.includes('secret'));
  }
});

test('contact blocks malformed payloads, oversized chunked bodies, cross-origin requests and spam', async () => {
  const harness = contactHarness();
  for (const body of [null, {}, { ...contact, message: {} }, { ...contact, subject: 'Subject\r\nBcc: attacker@example.com' }, { ...contact, sender: 'a,b@example.com' }, { ...contact, message: 'x'.repeat(5001) }]) assert.equal((await harness.post(body)).status, 400);
  assert.equal((await harness.post(contact, {}, '{bad')).status, 400);
  assert.equal((await harness.post(contact, {}, ' '.repeat(16001))).status, 413);
  assert.equal((await harness.post(contact, { 'content-type': 'text/plain' })).status, 415);
  assert.equal((await harness.post(contact, { origin: 'https://other.test' })).status, 403);
  assert.equal((await harness.post(contact, { 'sec-fetch-site': 'cross-site' })).status, 403);
  assert.equal((await harness.post({ ...contact, website: 'spam.test' })).status, 201);
  assert.equal(harness.sent.length, 0);
  const limited = await contactHarness({ rateError: true }).post(contact);
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get('retry-after'), '60');
});

for (const route of ['projects', 'certifications', 'education', 'work', 'resumes']) {
  test(`${route} API rejects malformed queries without calling data services`, async () => {
    const unexpected = new Proxy({}, { get: () => async () => { assert.fail('Invalid request reached the database'); } });
    const load = loadSource({
      'next/server': { NextResponse: Response },
      [sourcePath('src/app/_actions/projectService.ts')]: unexpected,
      [sourcePath('src/app/_actions/certificationService.ts')]: unexpected,
      [sourcePath('src/app/_actions/educationService.ts')]: unexpected,
      [sourcePath('src/app/_actions/workService.ts')]: unexpected,
      [sourcePath('src/app/(portfolio)/resumes/resumeService.ts')]: unexpected,
    });
    const api = load(`src/app/api/${route}/route.ts`);
    for (const params of ['offset=-1', 'offset=NaN', 'type=invalid']) assert.equal((await api.GET({ nextUrl: new URL(`https://portfolio.test/api/${route}?${params}`) })).status, 400);
  });
}

test('rate limiter retries a concurrent initial upsert collision without bypassing the cap', async () => {
  let calls = 0;
  const { rateLimit, RateLimitError } = loadSource({
    [sourcePath('src/app/_utils/Database.ts')]: { DB: { collection: () => ({
      createIndex: async () => 'ttl',
      findOneAndUpdate: async (_filter, _update, options) => {
        calls++;
        if (options.upsert) throw Object.assign(new Error('Duplicate id'), { code: 11000 });
        return { value: { count: 4 } };
      },
    }) } },
  })('src/app/_security/rateLimit.ts');
  await assert.rejects(rateLimit('login', 'admin', 3, 900), error => error instanceof RateLimitError);
  assert.equal(calls, 2);
});

test('client IP is used only when an explicitly trusted header contains a single address', () => {
  const { clientIdentity } = loadSource({
    [sourcePath('src/app/_utils/Database.ts')]: { DB: { collection: () => ({}) } },
  }, { TRUSTED_CLIENT_IP_HEADER: 'x-trusted-client-ip' })('src/app/_security/rateLimit.ts');
  assert.equal(clientIdentity(new Headers({ 'x-trusted-client-ip': '192.0.2.1' })), '192.0.2.1');
  assert.equal(clientIdentity(new Headers({ 'x-trusted-client-ip': '192.0.2.1, 192.0.2.2' })), undefined);
  assert.equal(clientIdentity(new Headers({ 'x-forwarded-for': '192.0.2.1' })), undefined);
});

test('expired and missing stored sessions fail authorization even with verified claims', async () => {
  let filter;
  const { requireAdmin } = loadSource({
    'next/headers': { cookies: () => ({ get: () => ({ value: 'signed-token' }) }) },
    [sourcePath('src/app/_security/token.ts')]: { verifySessionToken: async () => ({ username: 'owner', role: 'admin', sessionId: 'id' }) },
    [sourcePath('src/app/_utils/Database.ts')]: { DB: { collection: () => ({ findOne: async query => { filter = query; return null; } }) } },
  })('src/app/_security/session.ts');
  await assert.rejects(requireAdmin(), /Unauthorized/);
  assert.equal(filter.username, 'owner');
  assert.ok(filter.expiresAt.$gt instanceof Date);
});
