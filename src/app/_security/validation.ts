import type { CertificationType, EducationType, ProjectType, WorkType, SkillType } from '../_lib/_types';
import { skillCategories, skillIconKeys } from '../_lib/skillCatalog';

export class ValidationError extends Error {
  constructor(message = 'Invalid input') { super(message); this.name = 'ValidationError'; }
}

type Input = Record<string, unknown>;
function record(value: unknown): Input {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new ValidationError();
  return value as Input;
}
export function text(value: unknown, field: string, max = 200, optional = false): string {
  if (optional && (value === undefined || value === '')) return '';
  if (typeof value !== 'string') throw new ValidationError(`Invalid ${field}`);
  const result = value.trim();
  if ((!optional && !result) || result.length > max || /\u0000/.test(result)) throw new ValidationError(`Invalid ${field}`);
  return result;
}
export function objectId(value: unknown): string {
  if (typeof value !== 'string' || !/^[a-f\d]{24}$/i.test(value)) throw new ValidationError('Invalid record id');
  return value;
}
function identity(input: Input): { id?: string } {
  return input.id === undefined || input.id === '' ? {} : { id: objectId(input.id) };
}
function url(value: unknown, field: string, optional = false, local = false): string {
  const result = text(value, field, 2048, optional);
  if (!result) return result;
  if (/[\s\\\u0000-\u001f]/.test(result)) throw new ValidationError(`Invalid ${field}`);
  if (local && /^\/(?!\/)/.test(result)) return result;
  try {
    const parsed = new URL(result);
    if (!['https:', 'http:'].includes(parsed.protocol) || parsed.username || parsed.password) throw new Error();
  } catch { throw new ValidationError(`Invalid ${field}`); }
  return result;
}
function strings(value: unknown, field: string, maxLength = 200): string[] {
  if (!Array.isArray(value) || value.length > 50) throw new ValidationError(`Invalid ${field}`);
  return value.map(item => text(item, field, maxLength));
}
function priority(value: unknown): number {
  if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < 0 || value > 100000) throw new ValidationError('Invalid priority');
  return value;
}
function date(value: unknown, field: string): Date {
  if (!(value instanceof Date) && (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}(T.*)?$/.test(value))) throw new ValidationError(`Invalid ${field}`);
  if (typeof value === 'string') {
    const calendar = new Date(`${value.slice(0, 10)}T00:00:00.000Z`);
    if (!Number.isFinite(calendar.getTime()) || calendar.toISOString().slice(0, 10) !== value.slice(0, 10)) throw new ValidationError(`Invalid ${field}`);
  }
  const parsed = new Date(value instanceof Date ? value.getTime() : value);
  if (!Number.isFinite(parsed.getTime())) throw new ValidationError(`Invalid ${field}`);
  return parsed;
}
export function projectInput(value: unknown): ProjectType {
  const v = record(value);
  return { ...identity(v), name: text(v.name, 'name'), priority: priority(v.priority), date: text(v.date, 'date', 100), brief: text(v.brief, 'brief', 1000), description: text(v.description, 'description', 20000), image_path: url(v.image_path, 'image', false, true), deployed_url: url(v.deployed_url, 'deployed URL', true), github_url: url(v.github_url, 'GitHub URL'), categories: strings(v.categories, 'categories'), key_techs: strings(v.key_techs, 'technologies') };
}
export function certificationInput(value: unknown): CertificationType {
  const v = record(value);
  return { ...identity(v), title: text(v.title, 'title'), issuer: text(v.issuer, 'issuer'), priority: priority(v.priority), date: text(v.date, 'date', 100), description: text(v.description, 'description', 20000), image: url(v.image, 'image', true, true), url: url(v.url, 'URL', true), techs: strings(v.techs, 'technologies') };
}
export function educationInput(value: unknown): EducationType {
  const v = record(value);
  const start = date(v.start_date, 'start date');
  const end = v.end_date === undefined || v.end_date === null || v.end_date === '' ? undefined : date(v.end_date, 'end date');
  if (end && end < start) throw new ValidationError('End date must follow start date');
  return { ...identity(v), college: text(v.college, 'college'), title: text(v.title, 'title'), brief: text(v.brief, 'brief', 1000, true), description: text(v.description, 'description', 20000, true), image: url(v.image, 'image', true, true), url: url(v.url, 'URL', true), start_date: start, ...(end ? { end_date: end } : {}), details: strings(v.details, 'details', 2000) };
}
export function workInput(value: unknown): WorkType {
  const v = record(value);
  return { ...identity(v), company: text(v.company, 'company'), position: text(v.position, 'position'), logo: url(v.logo, 'logo', true, true), location: text(v.location, 'location'), date: text(v.date, 'date', 100), details: strings(v.details, 'details', 2000) };
}
export function skillInput(value: unknown): SkillType {
  const v = record(value);
  const category = text(v.category, 'category', 50);
  const iconKey = text(v.iconKey, 'icon', 100);
  if (!skillCategories.includes(category as (typeof skillCategories)[number])) throw new ValidationError('Invalid skill category');
  if (!skillIconKeys.includes(iconKey)) throw new ValidationError('Invalid skill icon');
  if (typeof v.rating !== 'number' || !Number.isInteger(v.rating) || v.rating < 1 || v.rating > 5) throw new ValidationError('Rating must be an integer from 1 to 5');
  if (typeof v.sortOrder !== 'number' || !Number.isSafeInteger(v.sortOrder) || v.sortOrder < 0 || v.sortOrder > 10000) throw new ValidationError('Invalid skill order');
  if (typeof v.visible !== 'boolean') throw new ValidationError('Invalid skill visibility');
  return { ...identity(v), category, name: text(v.name, 'name', 100), rating: v.rating, iconKey, sortOrder: v.sortOrder, visible: v.visible };
}
export function workCategory(value: unknown): 'primary' | 'secondary' {
  if (value !== 'primary' && value !== 'secondary') throw new ValidationError('Invalid work category');
  return value;
}
export function offsetInput(value: unknown = 0): number {
  if (typeof value === 'string' && /^\d{1,5}$/.test(value)) value = Number(value);
  if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < 0 || value > 10000) throw new ValidationError('Offset must be an integer between 0 and 10000');
  return value;
}
export function filterInput(value: unknown): string { return text(value, 'filter', 200); }
export function emailAddress(value: unknown): string {
  const address = text(value, 'email', 254);
  if (!/^[a-z\d.!#$%&'*+\/=?^_`{|}~-]+@[a-z\d](?:[a-z\d-]*[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]*[a-z\d])?)+$/i.test(address)) throw new ValidationError('Invalid email');
  return address;
}
export function contactInput(value: unknown) {
  const v = record(value);
  const name = text(v.name, 'name', 100);
  const subject = text(v.subject, 'subject', 200, true);
  if (/[\r\n]/.test(name + subject)) throw new ValidationError('Invalid mail header');
  return { name, sender: emailAddress(v.sender), subject, message: text(v.message, 'message', 5000), website: text(v.website, 'website', 200, true) };
}
