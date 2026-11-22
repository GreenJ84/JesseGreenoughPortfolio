export interface ListQuery { type: string; filter?: string }
export interface ListItem { id?: string }
export interface ListSnapshot<T> {
  query: ListQuery;
  items: T[];
  pending: boolean;
  error: string | null;
  hasMore: boolean;
}
export type PageLoader<T> = (query: ListQuery, offset: number, signal: AbortSignal) => Promise<T[]>;
export const queryKey = (query: ListQuery) => JSON.stringify([query.type, query.filter ?? '']);

export async function fetchListPage<T>(endpoint: string, query: ListQuery, offset: number, signal: AbortSignal, transport: typeof fetch = fetch): Promise<T[]> {
  const params = new URLSearchParams({ type: query.type, offset: String(offset) });
  if (query.filter !== undefined) params.set('filter', query.filter);
  const response = await transport(`${endpoint}?${params}`, { signal });
  if (!response.ok) throw new Error('The list could not be loaded. Please try again.');
  const rows: unknown = await response.json();
  if (!Array.isArray(rows) || rows.some(row => !row || typeof row.id !== 'string' || !row.id)) throw new Error('The list response was invalid. Please try again.');
  return rows as T[];
}

function merge<T extends ListItem>(existing: T[], incoming: T[]): T[] {
  const seen = new Set(existing.map(item => item.id));
  return [...existing, ...incoming.filter(item => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  })];
}

// One request owner for filtering and pagination. Generation checks remain necessary
// even after abort: cached/custom transports may still resolve an obsolete request.
export class PaginatedList<T extends ListItem> {
  private snapshot: ListSnapshot<T>;
  private readonly initial: ListSnapshot<T>;
  private readonly listeners = new Set<() => void>();
  private request?: AbortController;
  private generation = 0;
  private offset: number;
  private total: number;
  private exhausted: boolean;

  constructor(query: ListQuery, rows: T[], total: number, private readonly pageSize: number, private readonly loader: PageLoader<T>) {
    this.offset = rows.length;
    this.total = total;
    this.exhausted = rows.length < pageSize;
    this.snapshot = { query: { ...query }, items: merge([], rows), pending: false, error: null, hasMore: this.more() };
    this.initial = this.snapshot;
  }
  private more() { return !this.exhausted && this.offset < this.total && this.offset <= 10000; }
  private publish(changes: Partial<ListSnapshot<T>>) {
    this.snapshot = { ...this.snapshot, ...changes, hasMore: this.more() };
    this.listeners.forEach(listener => listener());
  }
  getSnapshot = () => this.snapshot;
  getServerSnapshot = () => this.initial;
  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => { this.listeners.delete(listener); };
  };
  dispose = () => { this.generation++; this.request?.abort(); };

  select = async (query: ListQuery, total: number, seed?: T[]) => {
    if (queryKey(query) === queryKey(this.snapshot.query) && !this.snapshot.error) return 0;
    this.dispose();
    this.total = total;
    this.offset = seed?.length ?? 0;
    this.exhausted = seed !== undefined && seed.length < this.pageSize;
    this.publish({ query: { ...query }, items: merge([], seed ?? []), pending: false, error: null });
    return seed !== undefined || total === 0 ? 0 : this.loadMore();
  };

  loadMore = async (): Promise<number> => {
    if (this.snapshot.pending || !this.more()) return 0;
    const generation = this.generation;
    const offset = this.offset;
    const query = this.snapshot.query;
    const request = new AbortController();
    this.request = request;
    this.publish({ pending: true, error: null });
    try {
      const rows = await this.loader(query, offset, request.signal);
      if (generation !== this.generation || request.signal.aborted) return 0;
      const items = merge(this.snapshot.items, rows);
      const added = items.length - this.snapshot.items.length;
      // Advance by rows received, not unique rows displayed, to avoid repeating a
      // page when concurrently edited data causes overlaps between offsets.
      this.offset += rows.length;
      this.exhausted = rows.length < this.pageSize;
      this.publish({ items, pending: false });
      return added;
    } catch {
      if (generation === this.generation && !request.signal.aborted) this.publish({ pending: false, error: 'The list could not be loaded. Please try again.' });
      return 0;
    }
  };
}
