const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const { readFileSync } = require('node:fs');

// Digest pins are reproducible but do not receive upstream security rebuilds.
// Compare both base stages with the registry before building a release image.
const dockerfile = readFileSync('Dockerfile', 'utf8');
const references = [...dockerfile.matchAll(/^FROM\s+(\S+?)@(sha256:[a-f0-9]{64})\s+AS\s+\w+$/gm)];
assert.equal(references.length, 2, 'Expected pinned build and runtime images');
for (const [, tag, pinned] of references) {
  const details = execFileSync('docker', ['buildx', 'imagetools', 'inspect', tag], { encoding: 'utf8', timeout: 30000 });
  const current = /^Digest:\s*(sha256:[a-f0-9]{64})$/m.exec(details)?.[1];
  assert.ok(current, `Could not resolve registry digest for ${tag}`);
  assert.equal(pinned, current, `${tag} has a newer digest; review and rescan the updated image`);
  console.log(`${tag}: digest current`);
}
