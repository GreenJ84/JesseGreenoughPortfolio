'use client';
import { useId, useRef, useState, type ReactNode } from 'react';
import { BsCheckCircleFill, BsSearch, BsX } from 'react-icons/bs';
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
  const searchId = useId();
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const close = () => { setOpen(false); setQuery(''); toggleRef.current?.focus(); };
  const toggle = () => { if (open) close(); else { setOpen(true); setQuery(''); requestAnimationFrame(() => searchRef.current?.focus()); } };
  const needle = query.trim().toLocaleLowerCase();
  const Heading = headingLevel;
  const groups = titles.map((title, index) => ({ title, index, items: (options[index] ?? []).filter(value => !needle || value.toLocaleLowerCase().includes(needle)) })).filter(group => group.title);
  return <div className={css.filterShell}>
    <div className={css.filterTitleRow}>
      <Heading>{heading}</Heading>
      <button ref={toggleRef} className={css.filterToggle} type="button" aria-label={open ? 'Close filters' : 'Search and filter'} aria-expanded={open} aria-controls={panelId} onClick={toggle}><BsSearch aria-hidden="true" /></button>
    </div>
    {open && <section id={panelId} className={css.itemFilter} aria-label="Search filters">
      <button className={css.filterClose} type="button" aria-label="Close filters" onClick={close}><BsX aria-hidden="true" /></button>
      <div className={css.filterModes}>
        <button type="button" aria-pressed={mode === 'top'} onClick={() => { onMode('top'); setQuery(''); }}>{topLabel}</button>
        <button type="button" aria-pressed={mode === 'all'} onClick={() => { onMode('all'); setQuery(''); }}>All</button>
      </div>
      {values.some(Boolean) && <div className={css.filterChips} aria-label="Selected filters">{values.map((value, index) => value && <button key={titles[index]} type="button" onClick={() => onSelect(index, '')} aria-label={`Remove ${titles[index]} ${value}`}>{titles[index]} <span>|</span> {value} <BsX aria-hidden="true" /></button>)}</div>}
      <div className={css.filterSearch}>
        <label htmlFor={searchId}>Search {titles.filter(Boolean).join(' or ').toLowerCase()}</label>
        <input ref={searchRef} id={searchId} type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search filter options" autoComplete="off" />
      </div>
      {needle && <div className={css.filterGroups} aria-live="polite">{groups.map(({ title, index, items }) => <section key={title} className={css.filterGroup}>
        <button type="button" className={css.filterGroupToggle} aria-expanded={expanded[index]} onClick={() => setExpanded(previous => previous.map((value, i) => i === index ? !value : value))}>{title}<span>{items.length} {expanded[index] ? '⌃' : '⌄'}</span></button>
        {expanded[index] && <div className={css.filterOptions}>{items.length ? items.map(value => <button key={value} type="button" disabled={values[index] === value} aria-label={values[index] === value ? `${value}, selected` : value} onClick={() => { onSelect(index, value); setQuery(''); requestAnimationFrame(() => searchRef.current?.focus()); }}>{value}{values[index] === value && <BsCheckCircleFill className={css.selectedCheck} aria-hidden="true" />}</button>) : <p>No matching options.</p>}</div>}
      </section>)}</div>}
    </section>}
  </div>;
}
