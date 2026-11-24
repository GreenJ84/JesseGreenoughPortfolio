export function parseResourceJson<T extends { id?: string }>(source: string, currentId: string | undefined, validate: (input: unknown) => T): T {
  if (source.length > 100_000) throw new Error('JSON is too large (100 KB maximum).');
  const parsed: unknown = JSON.parse(source);
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Enter one JSON object.');
  const fields = { ...parsed as Record<string, unknown> };
  // The current editor controls identity, even when a pasted object contains an ID.
  delete fields.id;
  const result = validate({ ...fields, ...(currentId ? { id: currentId } : {}) });
  const unsupported = Object.keys(fields).filter(key => !(key in result));
  if (unsupported.length) throw new Error(`Unsupported field${unsupported.length === 1 ? '' : 's'}: ${unsupported.join(', ')}`);
  return result;
}
