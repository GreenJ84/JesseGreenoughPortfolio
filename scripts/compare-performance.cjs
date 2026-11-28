const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const current = JSON.parse(fs.readFileSync(process.env.PERF_OUTPUT || 'test-results/performance.json', 'utf8'));
const baseline = JSON.parse(fs.readFileSync('docs/performance/after.json', 'utf8'));
const output = [];
for (const sample of current.summary) {
  const previous = baseline.summary.find(row => row.profile === sample.profile && row.route === sample.route);
  const comparison = { profile: sample.profile, route: sample.route, lcpMs: sample.lcpMs, cls: sample.cls, labInpProxyMs: sample.interactionMaxMs, routeJsBytes: sample.jsTransferredBytes };
  if (previous) {
    comparison.baseline = { lcpMs: previous.lcpMs, routeJsBytes: previous.jsTransferredBytes, labInpProxyMs: previous.interactionMaxMs };
    comparison.delta = { lcpMs: sample.lcpMs - previous.lcpMs, routeJsBytes: sample.jsTransferredBytes - previous.jsTransferredBytes };
    assert.ok(sample.jsTransferredBytes <= previous.jsTransferredBytes * 2, `${sample.profile} ${sample.route} route JS doubled`);
    assert.ok(sample.lcpMs <= Math.max(2500, previous.lcpMs * 4), `${sample.profile} ${sample.route} LCP exceeded generous CI guard`);
  }
  assert.ok(sample.cls <= 0.25, `${sample.profile} ${sample.route} CLS exceeded 0.25`);
  assert.ok(sample.interactionMaxMs <= 500, `${sample.profile} ${sample.route} interaction proxy exceeded 500ms`);
  output.push(comparison);
}
fs.mkdirSync('test-results', { recursive: true });
fs.writeFileSync(path.resolve('test-results/performance-comparison.json'), JSON.stringify(output, null, 2) + '\n');
console.log(JSON.stringify(output, null, 2));
console.log('Lab interaction proxy is not field INP; review Speed Insights INP after deployment.');
