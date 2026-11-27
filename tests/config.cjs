const assert = require('node:assert/strict');
const { test } = require('node:test');
const { hasRemoteMatch } = require('next/dist/shared/lib/match-remote-pattern');
const { hasLocalMatch } = require('next/dist/shared/lib/match-local-pattern');
const { NextRequest } = require('next/server');
const { loadSource, sourcePath } = require('./security-harness.cjs');

async function pagePolicy(mode) {
  const { proxy } = loadSource({}, { NODE_ENV: mode })('src/proxy.ts');
  return (await proxy(new NextRequest('https://example.test/about'))).headers.get('content-security-policy');
}

function config(mode) {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = mode;
  delete require.cache[require.resolve('../next.config.js')];
  const value = require('../next.config.js');
  if (original === undefined) delete process.env.NODE_ENV;
  else process.env.NODE_ENV = original;
  return value;
}

test('production headers protect pages and APIs without wildcard credentialed CORS', async () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = 'production';
  const value = config('production');
  const rules = await value.headers();
  if (original === undefined) delete process.env.NODE_ENV;
  else process.env.NODE_ENV = original;
  assert.equal(rules[0].source, '/:path*');
  const headers = new Headers(rules[0].headers.map(header => [header.key, header.value]));
  assert.equal(headers.get('x-content-type-options'), 'nosniff');
  assert.equal(headers.get('x-frame-options'), 'DENY');
  assert.equal(headers.get('referrer-policy'), 'strict-origin-when-cross-origin');
  assert.equal(headers.get('strict-transport-security'), 'max-age=31536000');
  assert.equal(headers.get('access-control-allow-origin'), null);
  assert.equal(headers.get('access-control-allow-credentials'), null);
  const policy = await pagePolicy('production');
  assert.ok(policy.includes("frame-ancestors 'none'"));
  assert.ok(policy.includes("object-src 'none'"));
  assert.ok(policy.includes("form-action 'self'"));
  assert.ok(!policy.includes('unsafe-eval'));
  assert.ok(!policy.includes('unsafe-inline'));
  assert.match(policy, /style-src-attr 'unsafe-hashes' 'sha256-zlqnbDt84zf1iSefLU\/ImC54isoprH\/MRiVZGskwexk='/);
  assert.ok(policy.includes('nonce-'));
  assert.ok(policy.includes('https://github-contributions-api.jogruber.de'));
  assert.equal(value.productionBrowserSourceMaps, false);
  assert.equal(value.poweredByHeader, false);
});

test('development CSP permits debugging and websocket reloads without production changes', async () => {
  const policy = await pagePolicy('development');
  assert.ok(policy.includes("'unsafe-eval'"));
  assert.ok(policy.includes(' ws: wss:'));
});

test('nonce proxy retains the admin navigation guard', async () => {
  const { proxy } = loadSource({ [sourcePath('src/app/_security/token.ts')]: { verifySessionToken: async token => { if (token !== 'valid') throw new Error('invalid'); } } }, { NODE_ENV: 'production' })('src/proxy.ts');
  const signedOut = await proxy(new NextRequest('https://example.test/admin/data'));
  assert.equal(signedOut.status, 307);
  assert.equal(signedOut.headers.get('location'), 'https://example.test/admin/login');
  const signedIn = await proxy(new NextRequest('https://example.test/admin/data', { headers: { cookie: 'admin-token=valid' } }));
  assert.equal(signedIn.status, 200);
  assert.ok(signedIn.headers.get('content-security-policy').includes('nonce-'));
});

test('image optimizer restricts protocol, ports, Cloudinary tenant, local paths and queries', () => {
  const { images } = config('production');
  const remote = url => hasRemoteMatch([], images.remotePatterns, new URL(url));
  assert.ok(remote('https://res.cloudinary.com/portfolio-g84/image/upload/test.jpg'));
  assert.ok(remote('https://raw.githubusercontent.com/GreenJ84/project/main/image.png'));
  for (const url of ['http://res.cloudinary.com/portfolio-g84/test.jpg', 'https://res.cloudinary.com/other-tenant/test.jpg', 'https://res.cloudinary.com/portfolio-g84/test.jpg?transform=other', 'https://res.cloudinary.com:444/portfolio-g84/test.jpg', 'https://untrusted.test/image.jpg', 'https://127.0.0.1/image.jpg', 'https://greenj-readme-stats.onrender.com/github/stats/GreenJ84']) assert.equal(remote(url), false, url);
  for (const path of ['/assets/resumes/test.png', '/projectImages/test.png', '/_next/static/media/test.png']) assert.ok(hasLocalMatch(images.localPatterns, path));
  for (const path of ['/admin/login', '/api/projects', '/assets/test.png?arbitrary=value']) assert.equal(hasLocalMatch(images.localPatterns, path), false, path);
  assert.equal(images.dangerouslyAllowSVG, false);
  assert.equal(images.dangerouslyAllowLocalIP, false);
  assert.equal(images.contentDispositionType, 'attachment');
  assert.ok(images.contentSecurityPolicy.includes('sandbox'));
});
