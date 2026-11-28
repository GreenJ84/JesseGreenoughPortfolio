'use client';

import { useEffect, useMemo, useSyncExternalStore } from 'react';
import { fetchListPage, PaginatedList, type ListItem } from '@/app/_lib/paginatedList';

export function usePaginatedList<T extends ListItem>(endpoint: string, rows: T[], total: number, pageSize: number, initialType = 'all') {
  const list = useMemo(() => new PaginatedList<T>(
    { type: initialType }, rows, total, pageSize,
    (query, offset, signal) => fetchListPage<T>(endpoint, query, offset, signal),
  ), [endpoint, rows, total, pageSize, initialType]);
  useEffect(() => () => list.dispose(), [list]);
  const snapshot = useSyncExternalStore(list.subscribe, list.getSnapshot, list.getServerSnapshot);
  return { ...snapshot, select: list.select, loadMore: list.loadMore, getSnapshot: list.getSnapshot };
}
