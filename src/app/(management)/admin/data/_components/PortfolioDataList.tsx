'use client';

import { useMemo, useState } from 'react';
import type { BaseItem } from '@/app/_lib/_types';
import css from './DataPage.module.css';

interface PortfolioDataListProps<T extends BaseItem> {
  items: T[];
  openModal: (item: T) => void;
  itemDisplay: (item: T) => React.JSX.Element;
  itemLabel: (item: T) => string;
  searchText: (item: T) => string;
  onDelete: (item: T) => Promise<void>;
  groupBy?: (item: T) => string;
  groupLabel?: (group: string) => string;
  defaultOpenGroup?: string;
  groupItemLabel?: [singular: string, plural: string];
}

export default function PortfolioDataList<T extends BaseItem>({ items, openModal, itemDisplay, itemLabel, searchText, onDelete, groupBy, groupLabel, defaultOpenGroup, groupItemLabel = ['record', 'records'] }: PortfolioDataListProps<T>) {
  const [query, setQuery] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const visibleItems = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return needle ? items.filter(item => searchText(item).toLocaleLowerCase().includes(needle)) : items;
  }, [items, query, searchText]);
  const grouped = groupBy ? Array.from(visibleItems.reduce((groups, item) => {
    const group = groupBy(item);
    groups.set(group, [...(groups.get(group) ?? []), item]);
    return groups;
  }, new Map<string, T[]>())) : null;

  async function remove(item: T) {
    if (!item.id || deleting || !window.confirm(`Delete “${itemLabel(item)}”? This cannot be undone.`)) return;
    setDeleting(item.id);
    setDeleteError(null);
    try { await onDelete(item); }
    catch (error) { setDeleteError(error instanceof Error ? error.message : 'Could not delete this record. Please try again.'); }
    finally { setDeleting(null); }
  }

  const rows = (members: T[]) => <ul className={css.dataList}>
    {members.map(item => <li key={item.id} className={css.dataRow}>
      <button type="button" className={css.dataCard} onClick={() => openModal(item)} disabled={Boolean(deleting)} aria-label={`Edit ${itemLabel(item)}`}>
        <span className={css.recordSummary}>{itemDisplay(item)}</span>
        <span className={css.editCue}>Edit <span aria-hidden="true">→</span></span>
      </button>
      <button type="button" className={css.rowDelete} disabled={Boolean(deleting)} onClick={() => { void remove(item); }} aria-label={`Delete ${itemLabel(item)}`}>{deleting === item.id ? 'Deleting…' : 'Delete'}</button>
    </li>)}
  </ul>;

  return <section className={css.listSection} aria-label="Resource listings">
    <div className={css.listTools}>
      <label className={css.searchLabel} htmlFor="resource-search">Search records
        <input id="resource-search" className={css.searchInput} type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search by name or detail" />
      </label>
      <p className={css.resultCount} aria-live="polite">Showing {visibleItems.length} of {items.length}</p>
    </div>
    {deleteError && <p className={css.listError} role="alert">{deleteError}</p>}
    {visibleItems.length ? grouped ? <div className={css.groupedList}>{grouped.map(([group, members]) => <details key={group} className={css.listGroup} open={query.trim() ? true : group === defaultOpenGroup ? true : undefined}>
      <summary><span>{groupLabel?.(group) ?? group}</span><span>{members.length} {groupItemLabel[members.length === 1 ? 0 : 1]}</span></summary>
      {rows(members)}
    </details>)}</div> : rows(visibleItems) : <p className={css.emptyState}>{items.length ? 'No records match that search.' : 'No records yet. Create the first one with the New button above.'}</p>}
  </section>;
}
