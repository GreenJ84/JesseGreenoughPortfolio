const assert = require('node:assert/strict');
const { test } = require('node:test');
const { loadSource } = require('./security-harness.cjs');

const { parseResourceJson } = loadSource()('src/app/(management)/admin/data/_components/resourceJson.ts');
const { projectInput, educationInput, skillInput } = loadSource()('src/app/_security/validation.ts');

test('pasted resource JSON validates and cannot redirect an edit to another record', () => {
  const input = { id: 'aaaaaaaaaaaaaaaaaaaaaaaa', title: 'Rust API', priority: 1, date: '2026-01-01', brief: 'Secure API', description: 'Built in Rust', image_url: '/rust.png', deployed_url: '', github_url: 'https://github.com/example/api', categories: ['Backend'], key_techs: ['Rust'] };
  const result = parseResourceJson(JSON.stringify(input), 'bbbbbbbbbbbbbbbbbbbbbbbb', projectInput);
  assert.equal(result.id, 'bbbbbbbbbbbbbbbbbbbbbbbb');
  assert.equal(result.title, 'Rust API');
  assert.equal(result.key_techs.join(','), 'Rust');
});

test('rejects invalid shapes and fields before populating a resource', () => {
  assert.throws(() => parseResourceJson('[]', undefined, projectInput), /one JSON object/);
  assert.throws(() => parseResourceJson('{', undefined, projectInput), error => error.name === 'SyntaxError');
  assert.throws(() => parseResourceJson(JSON.stringify({ title: 'Incomplete' }), undefined, projectInput), /Invalid priority/);
  const skill = { category: 'languages', title: 'Rust', name: 'Rust', brief: '', image_url: 'Rust', rating: 5, sortOrder: 0, visible: true };
  assert.throws(() => parseResourceJson(JSON.stringify({ ...skill, surprise: true }), undefined, skillInput), /Unsupported field: surprise/);
});

test('education JSON accepts date strings and preserves the server date shape', () => {
  const input = { title: 'MS Cybersecurity', brief: 'WGU', description: '', image_url: '', url: '', start_date: '2025-01-01', end_date: '2025-10-31', details: [] };
  const result = parseResourceJson(JSON.stringify(input), undefined, educationInput);
  assert.ok(result.start_date instanceof Date);
  assert.equal(result.end_date.toISOString().slice(0, 10), '2025-10-31');
});
