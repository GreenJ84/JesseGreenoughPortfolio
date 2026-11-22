const fs = require('node:fs');
const path = require('node:path');
const input = process.env.PERF_BUNDLE_INPUT || '.next/analyze/client.json';
const report = JSON.parse(fs.readFileSync(input, 'utf8')).filter(asset => asset.label.endsWith('.js'));
const summary = {
  scope: 'All generated client JavaScript assets across routes, not the bytes loaded by a single navigation. Gzip totals sum independently compressed assets.',
  assets: report.length,
  parsedBytes: report.reduce((sum, asset) => sum + asset.parsedSize, 0),
  gzipBytes: report.reduce((sum, asset) => sum + asset.gzipSize, 0),
  largest: [...report].sort((a, b) => b.parsedSize - a.parsedSize).slice(0, 10).map(asset => ({ file: asset.label, parsedBytes: asset.parsedSize, gzipBytes: asset.gzipSize, groups: asset.groups?.map(group => group.label) ?? [] })),
};
const output = path.resolve(process.env.PERF_BUNDLE_OUTPUT || '/tmp/portfolio-bundles.json');
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify(summary, null, 2) + '\n');
console.log(JSON.stringify(summary, null, 2));
