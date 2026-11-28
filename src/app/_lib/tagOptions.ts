export function uniqueTags(values: unknown): string[] {
  if (!Array.isArray(values)) return [];
  const seen = new Set<string>();
  return values
    .filter((value): value is string => typeof value === 'string')
    .map(value => value.trim())
    .filter(value => {
      const key = value.toLocaleLowerCase();
      if (!value || value.length > 200 || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => a.localeCompare(b));
}

export function unusedTags(options: string[], selected: string[], query = ''): string[] {
  const used = new Set(selected.map(value => value.toLocaleLowerCase()));
  const needle = query.trim().toLocaleLowerCase();
  return options.filter(value => !used.has(value.toLocaleLowerCase()) && value.toLocaleLowerCase().includes(needle));
}
