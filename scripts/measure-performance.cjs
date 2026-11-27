const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { chromium } = require('playwright');
const sharp = require('sharp');

const base = process.env.PERF_BASE_URL || 'http://127.0.0.1:3150';
if (!['127.0.0.1', 'localhost', '[::1]'].includes(new URL(base).hostname)) throw new Error('Use an isolated local production server, not a live portfolio.');
const runs = Number(process.env.PERF_RUNS || 3);
if (!Number.isSafeInteger(runs) || runs < 1 || runs > 10) throw new Error('PERF_RUNS must be between 1 and 10');
const routes = (process.env.PERF_ROUTES || '/,/skills').split(',');
if (routes.some(route => !route.startsWith('/') || route.startsWith('//'))) throw new Error('Routes must be local paths');
const profiles = {
  mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, cpu: 4, latency: 150, throughput: 1600000 / 8 },
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, isMobile: false, hasTouch: false, cpu: 1, latency: 0, throughput: -1 },
};
const selected = (process.env.PERF_PROFILES || 'mobile,desktop').split(',');
if (selected.some(profile => !profiles[profile])) throw new Error('Unknown performance profile');
const median = values => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
const metric = (metrics, name) => metrics.metrics.find(entry => entry.name === name)?.value ?? 0;

(async () => {
  const portrait = await sharp(Buffer.from('<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="400" fill="#184747"/><circle cx="200" cy="150" r="70" fill="#a4ffb6"/><path d="M60 400v-60a140 140 0 0 1 280 0v60" fill="#65fffa"/></svg>')).jpeg({ quality: 75 }).toBuffer();
  const stats = '<svg width="600" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="200" fill="#184747"/></svg>';
  const calendar = { total: { lastYear: 365, '2026': 365 }, contributions: Array.from({ length: 365 }, (_, index) => ({ date: new Date(Date.UTC(2025, 10, 22 + index)).toISOString().slice(0, 10), count: 1, level: 1 })) };
  const browser = await chromium.launch({ headless: true, ...(process.env.PERF_CHROME_PATH ? { executablePath: process.env.PERF_CHROME_PATH } : {}) });
  const samples = [];
  try {
    for (const profile of selected) for (const route of routes) for (let run = 1; run <= runs; run++) {
      const settings = profiles[profile];
      const context = await browser.newContext({ viewport: settings.viewport, deviceScaleFactor: settings.deviceScaleFactor, isMobile: settings.isMobile, hasTouch: settings.hasTouch, colorScheme: 'dark', reducedMotion: 'no-preference' });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      if (process.env.PERF_DEBUG === 'true') page.on('console', message => { if (message.type() === 'error') console.error(message.text()); });
      await page.route('**/*', request => {
        const url = new URL(request.request().url());
        if (url.hostname === 'github-contributions-api.jogruber.de') return request.fulfill({ json: calendar });
        if (url.hostname === 'greenj-readme-stats.onrender.com') return request.fulfill({ contentType: 'image/svg+xml', body: stats });
        if (request.request().resourceType() === 'image' && !url.pathname.endsWith('.svg')) return request.fulfill({ contentType: 'image/jpeg', body: portrait });
        if (url.origin !== new URL(base).origin) return request.abort();
        return request.continue();
      });
      await page.addInitScript(() => {
        window.__performanceLab = { lcp: 0, cls: 0, blocking: 0, interaction: 0 };
        new PerformanceObserver(list => { for (const entry of list.getEntries()) window.__performanceLab.lcp = entry.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
        new PerformanceObserver(list => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__performanceLab.cls += entry.value; }).observe({ type: 'layout-shift', buffered: true });
        new PerformanceObserver(list => { for (const entry of list.getEntries()) window.__performanceLab.blocking += Math.max(0, entry.duration - 50); }).observe({ type: 'longtask', buffered: true });
        new PerformanceObserver(list => { for (const entry of list.getEntries()) if (entry.interactionId) window.__performanceLab.interaction = Math.max(window.__performanceLab.interaction, entry.duration); }).observe({ type: 'event', buffered: true, durationThreshold: 16 });
      });
      const cdp = await context.newCDPSession(page);
      await cdp.send('Network.enable');
      await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
      await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: settings.latency, downloadThroughput: settings.throughput, uploadThroughput: settings.throughput });
      await cdp.send('Emulation.setCPUThrottlingRate', { rate: settings.cpu });
      await cdp.send('Performance.enable');
      const scripts = new Set();
      let bytes = 0, requests = 0;
      cdp.on('Network.responseReceived', event => { if (event.type === 'Script' && event.response.url.startsWith(base)) scripts.add(event.requestId); });
      cdp.on('Network.loadingFinished', event => { if (scripts.has(event.requestId)) { bytes += event.encodedDataLength; requests++; } });
      await page.goto(base + route, { waitUntil: 'load', timeout: 90000 });
      await page.waitForTimeout(2500);
      const idleStart = await cdp.send('Performance.getMetrics');
      await page.waitForTimeout(3000);
      const idleEnd = await cdp.send('Performance.getMetrics');
      const initialBytes = bytes, initialRequests = requests;
      const initial = await page.evaluate(() => ({ ...window.__performanceLab }));
      const menu = page.getByRole('button', { name: 'Open menu' });
      if (await menu.isVisible()) await menu.click();
      await page.locator('label[aria-label="Toggle Day and Night themes"]').click();
      if (await page.getByRole('button', { name: 'Close menu' }).isVisible()) await page.getByRole('button', { name: 'Close menu' }).click();
      await page.waitForTimeout(200);
      const interaction = await page.evaluate(() => window.__performanceLab.interaction);
      const activity = page.locator('[aria-label="Coding activity"], #githubCard').first();
      if (await activity.count()) await activity.scrollIntoViewIfNeeded();
      else await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(2500);
      const sample = {
        profile, route, run, jsTransferredBytes: initialBytes, jsRequests: initialRequests,
        lcpMs: Math.round(initial.lcp), cls: Number(initial.cls.toFixed(4)), longTaskBlockingMs: Math.round(initial.blocking),
        mainThreadTaskMs: Math.round(metric(idleStart, 'TaskDuration') * 1000),
        idleTaskMs: Math.round((metric(idleEnd, 'TaskDuration') - metric(idleStart, 'TaskDuration')) * 1000), idleWindowMs: 3000,
        interactionMaxMs: Math.round(interaction), afterScrollExtraJsBytes: bytes - initialBytes,
        canvasCount: await page.locator('canvas').count(), pageErrors: errors,
      };
      samples.push(sample);
      console.log(JSON.stringify(sample));
      await context.close();
    }
    const summary = selected.flatMap(profile => routes.map(route => {
      const group = samples.filter(sample => sample.profile === profile && sample.route === route);
      return { profile, route, ...Object.fromEntries(['jsTransferredBytes', 'jsRequests', 'lcpMs', 'cls', 'longTaskBlockingMs', 'mainThreadTaskMs', 'idleTaskMs', 'interactionMaxMs', 'afterScrollExtraJsBytes'].map(key => [key, median(group.map(sample => sample[key]))])) };
    }));
    const report = {
      measuredAt: new Date().toISOString(), commit: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(), browser: browser.version(), runs, base,
      methodology: 'Cold contexts, disabled browser cache, fixed viewports; mobile CPU 4x and 1.6 Mbps/150 ms, desktop unthrottled. Images and third-party calendar/stats use fixed fixtures. Initial capture is load + 5.5 seconds; CLS excludes shifts after recent input. Idle task cost is a 3-second window. Interaction maximum is a lab Event Timing proxy, not field INP; collect field INP after deployment. Below-fold JS is measured after scrolling.',
      profiles: Object.fromEntries(selected.map(name => [name, profiles[name]])), samples, summary,
    };
    const output = path.resolve(process.env.PERF_OUTPUT || '/tmp/portfolio-performance.json');
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
    console.log('Saved performance report:', output);
    if (samples.some(sample => sample.pageErrors.length)) process.exitCode = 1;
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
