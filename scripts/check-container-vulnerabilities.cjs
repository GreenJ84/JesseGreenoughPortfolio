const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');

// A full scan remains in the CI artifact. These two Debian OpenSSL findings
// currently have no fixed package in the official distroless image; recheck
// them on every run and fail as soon as a fix is available.
const reviewedUnfixed = new Set(['CVE-2026-107494:libssl3t64', 'CVE-2026-124709:libssl3t64']);
const report = JSON.parse(readFileSync(process.env.CONTAINER_SCAN_REPORT || 'test-results/container-vulnerabilities.json', 'utf8'));
assert.ok(Array.isArray(report.Results) && report.Results.length, 'Container scan has no results');
const findings = report.Results.flatMap(result => result.Vulnerabilities || []);
const severe = findings.filter(item => item.Severity === 'HIGH' || item.Severity === 'CRITICAL');
const unreviewed = severe.filter(item => item.FixedVersion || !reviewedUnfixed.has(`${item.VulnerabilityID}:${item.PkgName}`));
console.log(`Container scan: ${findings.length} findings, ${severe.length} high/critical, ${unreviewed.length} unreviewed or fixable high/critical`);
for (const item of unreviewed) console.error(`${item.VulnerabilityID} ${item.PkgName} ${item.Severity} ${item.FixedVersion ? `(fixed in ${item.FixedVersion})` : '(no fix)'}`);
assert.equal(unreviewed.length, 0, 'Review or remediate container vulnerabilities before release');
