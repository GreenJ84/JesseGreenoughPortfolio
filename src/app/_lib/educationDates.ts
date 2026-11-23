import type { EducationDTO, EducationType } from './_types';

export function dateOnly(value: Date | string): string {
  const date = value instanceof Date ? value : new Date(value);
  if (!Number.isFinite(date.getTime())) throw new Error('Invalid education date');
  return date.toISOString().slice(0, 10);
}
export function formatEducationMonth(value: Date | string): string {
  return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(dateOnly(value) + 'T00:00:00.000Z'));
}
export function monthDate(value: string, end = false): string {
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(value)) throw new Error('Choose a valid month and year');
  const date = new Date(value + '-01T00:00:00.000Z');
  if (end) { date.setUTCMonth(date.getUTCMonth() + 1); date.setUTCDate(0); }
  return dateOnly(date);
}
export function educationDTO(value: EducationType & { id: string }): EducationDTO {
  const { start_date, end_date, ...fields } = value;
  return { ...fields, start_date: dateOnly(start_date), ...(end_date ? { end_date: dateOnly(end_date) } : {}) };
}
export type LegacyEducationType = {
  college: string;
  degree: string;
  date: string;
  description: string[];
  icon: string;
  website: string;
};
function legacyMonth(value: string): string {
  const match = /^([a-z]+)\s+(\d{4})$/i.exec(value.trim());
  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const month = match ? months.indexOf(match[1].slice(0, 3).toLowerCase()) : -1;
  if (month < 0) throw new Error('Invalid education date');
  return `${match![2]}-${String(month + 1).padStart(2, '0')}-01`;
}
export function educationRecordDTO(value: (EducationType | LegacyEducationType) & { id: string }): EducationDTO {
  if ('start_date' in value && value.start_date) return educationDTO(value);
  const legacy = value as LegacyEducationType & { id: string };
  const [start, end] = legacy.date.split(/\s+-\s+/, 2);
  const details = Array.isArray(legacy.description) ? legacy.description : [];
  return {
    id: legacy.id,
    college: legacy.college,
    title: legacy.degree,
    brief: details[0] ?? '',
    description: details.join('\n'),
    image: legacy.icon,
    url: legacy.website,
    details,
    start_date: legacyMonth(start),
    ...(end ? { end_date: legacyMonth(end) } : {}),
  };
}
export type EducationDraft = Omit<EducationDTO, 'id' | 'start_date' | 'end_date'> & { id?: string; start_month: string; end_month: string };
export function educationDraft(initial?: EducationDTO): EducationDraft {
  return {
    id: initial?.id, college: initial?.college ?? '', title: initial?.title ?? '', brief: initial?.brief ?? '', description: initial?.description ?? '', image: initial?.image ?? '', url: initial?.url ?? '', details: initial?.details ?? [],
    start_month: initial ? dateOnly(initial.start_date).slice(0, 7) : '',
    end_month: initial?.end_date ? dateOnly(initial.end_date).slice(0, 7) : '',
  };
}
export function educationDraftInput(draft: EducationDraft) {
  const { start_month, end_month, ...fields } = draft;
  return { ...fields, start_date: monthDate(start_month), ...(end_month ? { end_date: monthDate(end_month, true) } : {}) };
}
