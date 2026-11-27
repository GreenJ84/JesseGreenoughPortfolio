const assert = require('node:assert/strict');
const { test } = require('node:test');
const { ObjectId } = require('mongodb');
const { loadSource } = require('./security-harness.cjs');
const { databaseName, historicalSkills } = require('../migration/migrate-portfolio.cjs');

const { transformLegacyRecord } = loadSource()('migration/transform.ts');
const { skillIconKeys } = loadSource()('src/app/_lib/skillCatalog.ts');

test('legacy resources map to the settled field names without losing identifiers', () => {
  const id = new ObjectId();
  const cases = [
    ['projects', { name: 'API', image_path: '/api.png', brief: 'Rust API', categories: ['Backend'] }, 'title', 'API'],
    ['certifications', { title: 'SecurityX', issuer: 'CompTIA', image: '/cert.png' }, 'brief', 'CompTIA'],
    ['degrees', { degree: 'Cybersecurity', college: 'WGU', date: 'Jan 2025 - Oct 2025' }, 'brief', 'WGU'],
    ['workExperience', { position: 'Engineer', company: 'Example', date: '2024-01..present' }, 'primary', true],
    ['secondaryExperience', { position: 'Volunteer', company: 'Example', date: '2023 - 2024' }, 'primary', false],
    ['resumes', { view: '/resume.pdf', image_url: '/resume.png', categories: ['Backend'] }, 'brief', '/resume.pdf'],
  ];
  for (const [collection, row, key, expected] of cases) {
    const result = transformLegacyRecord(collection, { _id: id, ...row });
    assert.equal(result._id, id);
    assert.equal(result[key], expected);
  }
  assert.throws(() => transformLegacyRecord('workExperience', { _id: id, date: 'unknown' }), /Unrecognized/);
});

test('historical skills seed preserves all categories and stable identifiers', () => {
  const first = historicalSkills();
  const second = historicalSkills();
  assert.equal(first.length, 58);
  assert.deepEqual(first.map(row => String(row._id)), second.map(row => String(row._id)));
  assert.deepEqual([...new Set(first.map(row => row.category))], [
    'languages', 'frameworks', 'databases', 'planning_Tools',
    'development_Tools', 'runtime_Tools', 'devops_Tools', 'extras',
  ]);
  assert.deepEqual(first.slice(0, 2).map(row => [row.title, row.rating, row.sortOrder]), [
    ['Rust', 3, 0], ['HTML5', 5, 1],
  ]);
  assert.ok(first.every(row => skillIconKeys.includes(row.image_url)), 'Every historical icon must render');
  assert.throws(() => transformLegacyRecord('skills', { _id: new ObjectId() }), /No migration for skills/);
});

test('legacy work periods accept compact ranges and single-year roles', () => {
  const id = new ObjectId();
  for (const [date, start_date, end_date] of [
    ['2015-2016', '2015-01', '2016-12'],
    ['May 2018- Jun 2019', '2018-05', '2019-06'],
    ['2016', '2016-01', '2016-12'],
    ['2024-01..present', '2024-01', undefined],
  ]) {
    const result = transformLegacyRecord('workExperience', { _id: id, date });
    assert.equal(result.start_date, start_date, date);
    assert.equal(result.end_date, end_date, date);
  }
});

test('migration derives the destination from DB_CONN_STRING and rejects other database names', () => {
  assert.equal(databaseName('mongodb://localhost:27017/PersonalPortfolioDev_20261124_1234abcd', 'target'), 'PersonalPortfolioDev_20261124_1234abcd');
  assert.equal(databaseName('mongodb+srv://example.test/PersonalPortfolio', 'target'), 'PersonalPortfolio');
  assert.throws(() => databaseName('mongodb://localhost:27017/admin', 'target'), /not allowed/);
});
