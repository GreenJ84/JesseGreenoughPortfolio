'use client';
import { useState, type ReactNode } from 'react';
import { BsSearch, BsX } from 'react-icons/bs';
import css from './Shared.module.css';

interface DataFilterProps {
  heading: ReactNode;
  headingLevel?: 'h1' | 'h3';
  titles: [string, string?];
  options: [string[], string[]?];
  values: [string?, string?];
  onSelect: (index: number, value: string) => void;
  onMode: (mode: 'top' | 'all') => void;
  mode: 'top' | 'all' | 'filtered';
  topLabel?: string;
}

export default function DataFilter({ heading, headingLevel = 'h1', titles, options, values, onSelect, onMode, mode, topLabel = 'Selected' }: DataFilterProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState([true, true]);
  const needle = query.trim().toLocaleLowerCase();
  const Heading = headingLevel;
  const groups = titles.map((title, index) => ({ title, index, items: (options[index] ?? []).filter(value => !needle || value.toLocaleLowerCase().includes(needle)) })).filter(group => group.title);
  return <div className={css.filterShell}>
    <div className={css.filterTitleRow}>
      <Heading>{heading}</Heading>
      <button className={css.filterToggle} type="button" aria-label={open ? 'Close filters' : 'Search and filter'} aria-expanded={open} onClick={() => { setOpen(value => !value); setQuery(''); }}><BsSearch aria-hidden="true" /></button>
    </div>
    {open && <nav className={css.itemFilter} aria-label="Search filters">
      <button className={css.filterClose} type="button" aria-label="Close filters" onClick={() => { setOpen(false); setQuery(''); }}><BsX aria-hidden="true" /></button>
      <div className={css.filterModes}>
        <button type="button" aria-pressed={mode === 'top'} onClick={() => { onMode('top'); setQuery(''); }}>{topLabel}</button>
        <button type="button" aria-pressed={mode === 'all'} onClick={() => { onMode('all'); setQuery(''); }}>All</button>
      </div>
      {values.some(Boolean) && <div className={css.filterChips} aria-label="Selected filters">{values.map((value, index) => value && <button key={titles[index]} type="button" onClick={() => onSelect(index, '')} aria-label={`Remove ${titles[index]} ${value}`}>{titles[index]} <span>|</span> {value} <BsX aria-hidden="true" /></button>)}</div>}
      <div className={css.filterSearch}>
        <label htmlFor="filterSearch">Search {titles.filter(Boolean).join(' or ').toLowerCase()}</label>
        <input id="filterSearch" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search filter options" autoComplete="off" />
      </div>
      {needle && <div className={css.filterGroups} aria-live="polite">{groups.map(({ title, index, items }) => <section key={title} className={css.filterGroup}>
        <button type="button" className={css.filterGroupToggle} aria-expanded={expanded[index]} onClick={() => setExpanded(previous => previous.map((value, i) => i === index ? !value : value))}>{title}<span>{items.length} {expanded[index] ? '⌃' : '⌄'}</span></button>
        {expanded[index] && <div className={css.filterOptions}>{items.length ? items.map(value => <button key={value} type="button" disabled={values[index] === value} onClick={() => { onSelect(index, value); setQuery(''); }}>{value}{values[index] === value && <span>Selected</span>}</button>) : <p>No matching options.</p>}</div>}
      </section>)}</div>}
    </nav>}
  </div>;
}
