const monthPattern = /^\d{4}-(0[1-9]|1[0-2])$/;
const datePattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

export function nativeDateValue(value: string): string {
  if (!datePattern.test(value)) return '';
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value ? value : '';
}

export function parseWorkPeriod(value: string): { start: string; end: string } | null {
  const match = /^(\d{4}-\d{2})\.\.(\d{4}-\d{2}|present)$/.exec(value);
  if (!match || !monthPattern.test(match[1]) || (match[2] !== 'present' && (!monthPattern.test(match[2]) || match[2] < match[1]))) return null;
  return { start: match[1], end: match[2] === 'present' ? '' : match[2] };
}

export function workPeriod(start: string, end: string): string {
  if (!monthPattern.test(start) || (end && (!monthPattern.test(end) || end < start))) throw new Error('Choose valid work dates');
  return `${start}..${end || 'present'}`;
}

export function formatWorkPeriod(value: string): string {
  const period = parseWorkPeriod(value);
  if (!period) return value;
  const format = (month: string) => new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${month}-01T00:00:00.000Z`));
  return `${format(period.start)} – ${period.end ? format(period.end) : 'Present'}`;
}
