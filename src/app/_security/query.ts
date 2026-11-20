import { offsetInput, filterInput, ValidationError } from './validation';

export function queryInput(params: URLSearchParams, allowed: readonly string[], fallback: string) {
  for (const name of ['type', 'offset', 'filter']) {
    if (params.getAll(name).length > 1) throw new ValidationError(`Duplicate ${name}`);
  }
  const type = params.get('type') ?? fallback;
  if (!allowed.includes(type)) throw new ValidationError('Invalid type parameter');
  const offset = offsetInput(params.get('offset') ?? 0);
  const filter = ['category', 'tech', 'issuer'].includes(type) ? filterInput(params.get('filter')) : undefined;
  return { type, offset, filter };
}
