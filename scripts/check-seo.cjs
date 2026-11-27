const assert = require('node:assert/strict');

// Check the built site's response, not only the metadata source. CI uses a
// disposable local database and never sends this check to production.
const base = new URL(process.env.SMOKE_BASE_URL || 'http://127.0.0.1:3000');
if (!['localhost', '127.0.0.1', '[::1]'].includes(base.hostname)) throw Error('SEO check requires a local deployment');
const canonicalOrigin = process.env.SEO_CANONICAL_ORIGIN || 'https://jesse-greenough-portfolio.vercel.app';
const pages = ['/', '/about', '/skills', '/projects', '/education', '/work', '/resumes'];

(async () => {
  for (const path of pages) {
    const response = await fetch(new URL(path, base));
    assert.equal(response.status, 200, path);
    const html = await response.text();
    const canonical = /<link rel="canonical" href="([^"]+)"/.exec(html)?.[1];
    const openGraph = /<meta property="og:url" content="([^"]+)"/.exec(html)?.[1];
    const title = /<title>([^<]+)<\/title>/.exec(html)?.[1];
    assert.ok(canonical, `${path}: missing canonical URL`);
    assert.equal(new URL(canonical).origin, canonicalOrigin, `${path}: wrong canonical host`);
    assert.equal(new URL(canonical).pathname, path, `${path}: wrong canonical path`);
    assert.equal(openGraph, canonical, `${path}: social URL differs from canonical`);
    assert.ok(title && title.includes('Jesse Greenough'), `${path}: missing descriptive title`);
    assert.match(html, /<meta name="description" content="[^"]+"/, `${path}: missing description`);
    assert.ok(!html.includes('noimageindex'), `${path}: image indexing disabled`);
    if (['/', '/about', '/skills', '/projects'].includes(path)) assert.match(title, /Rust/, `${path}: Rust focus missing from title`);
    if (path === '/about') {
      assert.match(html, /<script type="application\/ld\+json">/, 'About: missing profile data block');
      assert.ok(html.includes('"@type":"ProfilePage"'), 'About: missing profile structured data');
    }
    console.log(`${path}: metadata and canonical URL verified`);
  }
  const robots = await (await fetch(new URL('/robots.txt', base))).text();
  assert.match(robots, /Disallow: \/admin/);
  assert.match(robots, /Disallow: \/api\//);
  assert.ok(robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`), 'Missing canonical sitemap URL');
  const sitemap = await (await fetch(new URL('/sitemap.xml', base))).text();
  assert.equal((sitemap.match(/<loc>/g) || []).length, pages.length, 'Wrong sitemap page count');
  for (const path of pages) assert.ok(sitemap.includes(`${canonicalOrigin}${path}`), `Sitemap missing ${path}`);
  assert.ok(!sitemap.includes('/admin'), 'Admin route leaked into sitemap');
  const admin = await (await fetch(new URL('/admin/login', base))).text();
  assert.match(admin, /<meta name="robots" content="noindex, nofollow"/, 'Admin login must be noindex');
  console.log('robots.txt, sitemap.xml, and admin noindex verified');
})().catch(error => { console.error(error); process.exitCode = 1; });
