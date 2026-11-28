const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const base = new URL(process.env.PERF_BASE_URL || 'http://127.0.0.1:3150');
if (!['localhost', '127.0.0.1', '[::1]'].includes(base.hostname)) throw Error('Use a local fixture server');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    for (const mode of ['normal', 'reduced', 'saveData']) {
      const context = await browser.newContext({ reducedMotion: mode === 'reduced' ? 'reduce' : 'no-preference' });
      try {
        if (mode === 'saveData') await context.addInitScript(() => {
          Object.defineProperty(navigator, 'connection', { value: { saveData: true } });
        });
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.goto(new URL('/skills', base).href);
        await page.waitForTimeout(5000);
        assert.equal(await page.locator('#tsparticles canvas').count(), mode === 'normal' ? 1 : 0, mode);
        if (mode === 'normal') {
          await page.emulateMedia({ reducedMotion: 'reduce' });
          await page.waitForTimeout(500);
          assert.equal(await page.locator('#tsparticles canvas').count(), 0, 'Preference change must remove animation');
          assert.equal(await page.locator('form').count(), 0, 'Contact form must be deferred');
          await page.getByRole('button', { name: 'Contact', exact: true }).click();
          await page.locator('form').waitFor({ state: 'visible' });
          await page.locator('textarea[name="message"]').fill('Draft survives a failed request');
          await page.locator('input[name="senderName"]').fill('Fixture');
          await page.locator('input[name="senderEmail"]').fill('fixture@example.com');
          await page.locator('input[name="subject"]').fill('Performance fixture');
          await page.route('**/api/sendEmail', route => route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ error: 'Temporarily unavailable' }) }));
          await page.getByRole('button', { name: 'Submit', exact: true }).click();
          await page.getByRole('status').filter({ hasText: 'Your message could not be sent' }).waitFor();
          assert.equal(await page.locator('textarea[name="message"]').inputValue(), 'Draft survives a failed request');
        }
        assert.deepEqual(errors, [], mode);
        console.log(`${mode}: animation and deferred UI checks passed`);
      } finally { await context.close(); }
    }
    const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
    try {
      const page = await context.newPage();
      const errors = [];
      let activityRequests = 0;
      page.on('pageerror', error => errors.push(error.message));
      await page.route('**/*', route => {
        const url = new URL(route.request().url());
        if (url.hostname === 'github-contributions-api.jogruber.de') {
          activityRequests++;
          return route.fulfill({ json: { total: { lastYear: 365 }, contributions: Array.from({ length: 365 }, (_, i) => ({ date: new Date(Date.UTC(2025, 10, 22 + i)).toISOString().slice(0, 10), count: 1, level: 1 })) } });
        }
        if (url.hostname === 'greenj-readme-stats.onrender.com') {
          activityRequests++;
          return route.fulfill({ contentType: 'image/svg+xml', body: '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="200"/>' });
        }
        return url.origin === base.origin ? route.continue() : route.abort();
      });
      await page.goto(new URL('/', base).href);
      await page.waitForTimeout(1000);
      assert.equal(activityRequests, 0, 'Activity resources must wait for viewport proximity');
      assert.equal(await page.locator('#githubCard').count(), 0);
      await page.getByRole('region', { name: 'Coding activity', exact: true }).scrollIntoViewIfNeeded();
      await page.locator('#githubCard').waitFor();
      await page.waitForTimeout(1500);
      assert.ok(activityRequests > 0, 'Activity must load when approached');
      assert.deepEqual(errors, [], 'Home must hydrate without calendar mismatch');
      console.log('home: deferred activity and hydration checks passed');
    } finally { await context.close(); }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
