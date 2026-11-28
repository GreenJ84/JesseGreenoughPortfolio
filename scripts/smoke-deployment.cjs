const assert = require('node:assert/strict');
const base = new URL(process.env.SMOKE_BASE_URL || 'http://127.0.0.1:3000');
if (!['localhost', '127.0.0.1', '[::1]'].includes(base.hostname)) throw Error('Smoke test requires a local deployment');
(async () => {
  const cases = [
    ['/', 200, 'Jesse Greenough'],
    ['/skills', 200, 'Skills'],
    ['/admin/login', 200, 'Admin Login'],
    ['/admin/data', 307, null],
    ['/api/projects?offset=-1', 400, null],
  ];
  for (const [path, status, text] of cases) {
    const response = await fetch(new URL(path, base), { redirect: 'manual' });
    assert.equal(response.status, status, path);
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff', path);
    if (!path.startsWith('/api/')) {
      const policy = response.headers.get('content-security-policy') || '';
      assert.match(policy, /nonce-[A-Za-z0-9+/=]+/);
      assert.ok(!policy.includes('unsafe-inline'), path);
    }
    if (text) assert.ok((await response.text()).includes(text), path);
    console.log(`${path}: ${status}`);
  }
  const response = await fetch(new URL('/admin/data', base), { redirect: 'manual' });
  assert.equal(new URL(response.headers.get('location'), base).pathname, '/admin/login');
})().catch(error => { console.error(error); process.exitCode = 1; });
