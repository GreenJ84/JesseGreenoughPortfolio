'use client';
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import type { BasePortfolioItem } from '@/app/_lib/_types';
import { AsyncResource } from '@/app/_lib/asyncResource';

export default function useDataManager<T extends BasePortfolioItem>(loader: () => Promise<T[]>) {
  const resource = useMemo(() => new AsyncResource(loader, [] as T[]), [loader]);
  const { data: items, pending: loading, error } = useSyncExternalStore(resource.subscribe, resource.getSnapshot, resource.getServerSnapshot);
  const [editor, setEditor] = useState<{ owner: typeof resource; selected?: T; open: boolean }>(() => ({ owner: resource, open: false }));
  const selected = editor.owner === resource ? editor.selected : undefined;
  const showModal = editor.owner === resource && editor.open;
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    void resource.reload();
    return () => { mounted.current = false; resource.dispose(); };
  }, [resource]);
  const closeModal = useCallback(() => {
    setEditor(current => current.owner === resource ? { owner: resource, open: false } : current);
  }, [resource]);
  const afterMutation = async () => {
    // Reload errors are surfaced outside the modal; the confirmed write is not repeated.
    await resource.reload();
    if (mounted.current) closeModal();
  };
  const openModal = (item?: T) => {
    if (resource.getSnapshot().pending) return;
    setEditor({ owner: resource, selected: item, open: true });
  };
  return { items, selected, showModal, openModal, closeModal, loading, error, refresh: resource.reload, afterMutation };
}
