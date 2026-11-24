type Row = Record<string, unknown>;

function string(value: unknown, fallback = ''): string { return typeof value === 'string' ? value : fallback; }
function list(value: unknown): string[] { return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []; }
function date(value: unknown, end = false): Date {
  if (value instanceof Date && Number.isFinite(value.getTime())) return value;
  const raw = string(value).trim();
  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const named = /^([a-z]+)\.?\s+(\d{4})$/i.exec(raw);
  const month = named ? months.indexOf(named[1].slice(0, 3).toLowerCase()) + 1 : 0;
  const year = /^\d{4}$/.test(raw) ? raw : named?.[2];
  const selectedMonth = month || (end ? 12 : 1);
  const lastDay = end ? new Date(Date.UTC(Number(year ?? raw.slice(0, 4)), selectedMonth, 0)).getUTCDate() : 1;
  const normalized = year ? `${year}-${String(selectedMonth).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}` : /^\d{4}-\d{2}$/.test(raw) ? `${raw}-${end ? String(new Date(Date.UTC(Number(raw.slice(0, 4)), Number(raw.slice(5, 7)), 0)).getUTCDate()) : '01'}` : raw;
  const parsed = new Date(normalized);
  if (!Number.isFinite(parsed.getTime())) throw new Error(`Unrecognized legacy date: ${raw}`);
  return parsed;
}
function month(value: unknown, end = false): string {
  if (value instanceof Date) return value.toISOString().slice(0, 7);
  const raw = string(value).trim();
  if (/^\d{4}-(0[1-9]|1[0-2])$/.test(raw)) return raw;
  return date(raw, end).toISOString().slice(0, 7);
}
function range(value: unknown): { start: string; end?: string } {
  const raw = string(value).trim();
  // Legacy work dates include year-only roles and hyphenated ranges without
  // spaces. Match complete date tokens so the hyphen in YYYY-MM stays intact.
  const token = '(?:\\d{4}(?:-(?:0[1-9]|1[0-2]))?|[a-z]+\\.?\\s+\\d{4})';
  const match = new RegExp(`^(${token})\\s*(?:\\.\\.|-)\\s*(present|current|${token})$`, 'i').exec(raw);
  if (/^\d{4}$/.test(raw)) return { start: `${raw}-01`, end: `${raw}-12` };
  if (!match) throw new Error(`Unrecognized legacy work period: ${raw}`);
  const start = month(match[1]);
  const end = /^(present|current)$/i.test(match[2]) ? undefined : month(match[2], true);
  if (end && end < start) throw new Error(`Work end precedes start: ${raw}`);
  return { start, ...(end ? { end } : {}) };
}

export function transformLegacyRecord(collection: string, row: Row): Row {
  const { _id } = row;
  if (!_id) throw new Error(`Missing _id in ${collection}`);
  switch (collection) {
    case 'projects': return { _id, title: string(row.title ?? row.name), brief: string(row.brief), image_url: string(row.image_url ?? row.image_path), description: string(row.description), priority: row.priority ?? 0, date: string(row.date), deployed_url: string(row.deployed_url), github_url: string(row.github_url), categories: list(row.categories), key_techs: list(row.key_techs) };
    case 'certifications': return { _id, title: string(row.title), brief: string(row.brief ?? row.issuer), image_url: string(row.image_url ?? row.image), description: string(row.description), priority: row.priority ?? 0, date: string(row.date), url: string(row.url), techs: list(row.techs) };
    case 'degrees': {
      const details = list(row.details ?? row.description);
      const dates = string(row.date).split(/\s+-\s+/, 2);
      const start_date = date(row.start_date ?? row.startDate ?? dates[0]);
      const endValue = row.end_date ?? row.endDate ?? dates[1];
      const end_date = endValue && !/^(present|current)$/i.test(string(endValue)) ? date(endValue, true) : undefined;
      if (end_date && end_date < start_date) throw new Error('Education end precedes start');
      return { _id, title: string(row.title ?? row.degree), brief: string(row.college ?? row.brief), image_url: string(row.image_url ?? row.image ?? row.icon), description: typeof row.description === 'string' ? row.description : details.join('\n'), url: string(row.url ?? row.website), start_date, ...(end_date ? { end_date } : {}), details };
    }
    case 'workExperience':
    case 'secondaryExperience': {
      const period = row.start_date ? { start: month(row.start_date), ...(row.end_date ? { end: month(row.end_date, true) } : {}) } : range(row.date);
      return { _id, title: string(row.title ?? row.position), brief: string(row.brief ?? row.company), image_url: string(row.image_url ?? row.logo), primary: collection === 'workExperience', location: string(row.location), start_date: period.start, ...(period.end ? { end_date: period.end } : {}), details: list(row.details) };
    }
    case 'resumes': return { _id, title: string(row.title ?? row.job_title, list(row.categories)[0] ?? 'Resume'), brief: string(row.view ?? row.brief), image_url: string(row.image_url ?? row.image), download: string(row.download), categories: list(row.categories) };
    case 'skills': {
      const title = string(row.title ?? row.name);
      return { _id, title, name: title, brief: string(row.brief), image_url: string(row.image_url ?? row.iconKey), category: string(row.category), rating: row.rating, sortOrder: row.sortOrder, visible: row.visible, normalizedName: string(row.normalizedName, title.toLocaleLowerCase('en-US')) };
    }
    default: throw new Error(`No migration for ${collection}`);
  }
}
