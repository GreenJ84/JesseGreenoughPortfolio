const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const base = new URL(process.env.SMOKE_BASE_URL || 'http://127.0.0.1:3000');
if (!['localhost', '127.0.0.1', '[::1]'].includes(base.hostname)) throw Error('Accessibility check requires a local deployment');
(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}) });
  try {
    const page = await browser.newPage();
    await page.goto(new URL('/skills', base).href, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => Boolean(document.body.dataset.theme));
    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    assert.ok(!/maximum-scale|user-scalable=no/i.test(viewport || ''), 'Browser zoom must remain available');
    const opener = page.getByRole('button', { name: 'Contact', exact: true });
    await opener.click();
    const dialog = page.getByRole('dialog', { name: 'Let’s talk' });
    await dialog.waitFor();
    assert.equal(await page.evaluate(() => document.activeElement?.id), 'senderName');
    await page.keyboard.press('Shift+Tab');
    assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('aria-label')), 'Close contact form');
    await page.keyboard.press('Shift+Tab');
    assert.equal(await page.evaluate(() => document.activeElement?.textContent?.trim()), 'Send message');
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('aria-label')), 'Close contact form');
    await page.keyboard.press('Escape');
    await dialog.waitFor({ state: 'detached' });
    assert.equal(await opener.evaluate(node => document.activeElement === node), true, 'Focus returns to opener');
    console.log('Contact keyboard flow and browser zoom passed');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
