const assert = require('node:assert/strict');
const { test } = require('node:test');
const { loadSource } = require('./security-harness.cjs');
const dates = loadSource()('src/app/_lib/portfolioDates.ts');

test('native dates accept real calendar days and leave legacy labels untouched', () => {
  assert.equal(dates.nativeDateValue('2024-02-29'), '2024-02-29');
  assert.equal(dates.nativeDateValue('2025-02-29'), '');
  assert.equal(dates.nativeDateValue('2025'), '');
});

test('work periods use native month values without changing legacy ranges', () => {
  assert.equal(dates.workPeriod('2025-10', ''), '2025-10..present');
  assert.equal(dates.formatWorkPeriod('2025-10..present'), 'Oct 2025 – Present');
  assert.equal(dates.formatWorkPeriod('2020 - 2024'), '2020 - 2024');
  assert.equal(dates.parseWorkPeriod('2025-10..2025-09'), null);
  assert.throws(() => dates.workPeriod('2025-10', '2025-09'));
});
