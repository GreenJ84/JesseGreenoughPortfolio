const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const base = new URL(process.env.SMOKE_BASE_URL || 'http://127.0.0.1:3000');
if (!['localhost', '127.0.0.1', '[::1]'].includes(base.hostname)) throw new Error('Browser checks require a local server');
const output = path.resolve(process.env.VISUAL_OUTPUT || 'test-results/visual');
const sizes = [390, 768, 1365];
const routes = ['/', '/about', '/skills', '/projects', '/education', '/work', '/resumes'];

async function assertCarouselLinksVisible(carousel, width, state) {
  const bounds = await carousel.locator('article[aria-current="true"]').evaluate(card => {
    const cardRect = card.getBoundingClientRect();
    const contentRect = card.querySelector('[class*="previewContent"]').getBoundingClientRect();
    return [...card.querySelectorAll('a')].map(link => {
      const rect = link.getBoundingClientRect();
      return { label: link.textContent.trim(), visible: rect.height > 0 && rect.top >= contentRect.top && rect.bottom <= Math.min(contentRect.bottom, cardRect.bottom) - 1 };
    });
  });
  assert.ok(bounds.length > 0, `${width}px ${state} carousel needs project links`);
  for (const link of bounds) assert.ok(link.visible, `${width}px ${state} carousel clips ${link.label}`);
}

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}) });
  try {
    for (const width of sizes) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce', colorScheme: 'dark' });
      try {
        for (const route of routes) {
          const page = await context.newPage();
          const errors = [];
          page.on('pageerror', error => errors.push(error.message));
          await page.addInitScript(() => {
            window.__cspViolations = [];
            document.addEventListener('securitypolicyviolation', event => window.__cspViolations.push(`${event.effectiveDirective}: ${event.blockedURI} ${event.target?.outerHTML?.slice(0, 180) || ''}`));
          });
          const response = await page.goto(new URL(route, base).href, { waitUntil: 'domcontentloaded' });
          assert.equal(response.status(), 200, `${width}px ${route}`);
          await page.getByRole('heading', { level: 1 }).waitFor({ timeout: 10000 });
          await page.waitForFunction(() => Boolean(document.body.dataset.theme), undefined, { timeout: 10000 });
          assert.equal(await page.getByRole('heading', { level: 1 }).count(), 1, `${width}px ${route} needs one H1`);
          assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2), `${width}px ${route} overflows horizontally`);
          const unnamed = await page.locator('button').evaluateAll(buttons => buttons.filter(button => button.getClientRects().length && !button.getAttribute('aria-label')?.trim() && !button.textContent?.trim() && !button.getAttribute('title')?.trim()).length);
          assert.equal(unnamed, 0, `${width}px ${route} has unnamed visible buttons`);
          assert.deepEqual(errors, [], `${width}px ${route} page errors`);
          assert.deepEqual(await page.evaluate(() => window.__cspViolations), [], `${width}px ${route} CSP violations`);
          if (route === '/') {
            await page.getByRole('heading', { name: 'Projects worth exploring.' }).waitFor();
            await page.getByRole('heading', { name: 'The tools behind the work.' }).waitFor();
            const carousel = page.locator('[aria-roledescription="carousel"][aria-label="Featured projects"]');
            await carousel.waitFor();
            const current = carousel.locator('article[aria-current="true"] h3');
            const first = await current.innerText();
            await page.locator('[aria-label="Choose featured project"] button').nth(1).click();
            await page.waitForFunction(previous => document.querySelector('[aria-roledescription="carousel"] article[aria-current="true"] h3')?.textContent?.trim() !== previous, first);
            assert.notEqual(await current.innerText(), first, `${width}px carousel must advance`);
            await assertCarouselLinksVisible(carousel, width, 'collapsed');
            await carousel.getByRole('button', { name: 'Show more' }).click();
            await carousel.getByRole('button', { name: 'Show less' }).waitFor();
            assert.equal(await carousel.getByRole('button', { name: 'Show less' }).getAttribute('aria-expanded'), 'true');
            await assertCarouselLinksVisible(carousel, width, 'expanded');
            await carousel.getByRole('button', { name: 'Show less' }).click();
            await assertCarouselLinksVisible(carousel, width, 'collapsed again');
            const image = carousel.locator('article[aria-current="true"] img');
            await image.waitFor();
            assert.ok(await image.evaluate(node => node.complete && node.naturalWidth > 0), `${width}px carousel image must load`);
            assert.equal(await page.locator('#tsparticles canvas').count(), 0, 'Reduced motion must disable ambient canvas');
            const theme = page.locator('label[aria-label="Toggle Day and Night themes"]');
            const before = await page.locator('body').getAttribute('data-theme');
            await theme.click();
            assert.notEqual(await page.locator('body').getAttribute('data-theme'), before, 'Theme toggle must change mode');
            await theme.click();
            await page.evaluate(() => window.scrollTo(0, 0));
            await page.screenshot({ path: path.join(output, `${width}-home.png`), fullPage: true });
            if (width === 390) {
              await page.getByRole('button', { name: 'Open menu' }).click();
              assert.equal(await page.getByRole('button', { name: 'Close menu' }).getAttribute('aria-expanded'), 'true');
              await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Projects' }).click();
              await page.waitForURL('**/projects');
              assert.ok(page.url().endsWith('/projects'), 'Mobile navigation must work');
            }
          }
          if (route === '/projects') {
            await page.getByRole('button', { name: 'Search and filter' }).click();
            const search = page.getByRole('searchbox', { name: /Search category or technology/i });
            await page.waitForFunction(() => document.activeElement?.matches('input[type="search"]'), undefined, { timeout: 5000 });
            assert.equal(await search.evaluate(node => document.activeElement === node), true, 'Filter search receives focus');
            await search.fill('Rust');
            await page.getByRole('button', { name: 'Rust', exact: true }).click();
            await page.getByRole('button', { name: 'Remove Technology Rust' }).waitFor();
            await page.locator('#projectsList li').first().waitFor();
            assert.ok(await page.locator('#projectsList li').count() > 0, 'Rust filter returns projects');
            await page.getByRole('button', { name: 'Close filters' }).last().click();
          }
          if (route !== '/') {
            await page.evaluate(() => window.scrollTo(0, 0));
            await page.screenshot({ path: path.join(output, `${width}-${route.slice(1)}.png`), fullPage: true });
          }
          await page.close();
        }
        console.log(`${width}px public routes, carousel, filters, navigation, theme, CSP, and images passed`);
      } finally { await context.close(); }
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
