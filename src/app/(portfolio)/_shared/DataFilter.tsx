'use client';
import { useMemo, useState } from 'react';

const css = require('./Shared.module.css');
interface DataFilterProps {
  titles: [string, string?];
  options: [string[], string[]?];
  values: [string, string?];
  firstHandler: (value: string) => void;
  secondHandler?: (value: string) => void;
  topLabel?: string;
}
export default function DataFilter({ titles, options, values, firstHandler, secondHandler, topLabel = 'Selected' }: DataFilterProps) {
  const paired = Boolean(titles[1] && options[1] && secondHandler);
  const [query, setQuery] = useState('');
  const matches = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    if (!needle) return [];
    return options.flatMap((group, index) => (group ?? []).filter(value => value.toLocaleLowerCase().includes(needle)).map(value => ({ value, index }))).slice(0, 8);
  }, [options, query]);
  return <nav id="dataFilter" className={css.itemFilter}>
    <div className={css.filterSearch}>
      <label htmlFor="filterSearch">Search {paired ? `${titles[0]?.toLowerCase()} or ${titles[1]?.toLowerCase()}` : titles[0]?.toLowerCase()}</label>
      <input id="filterSearch" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Type a technology or category" autoComplete="off" />
      {query.trim() && <div className={css.filterResults} aria-live="polite">
        {matches.length ? matches.map(({ value, index }) => <button type="button" key={`${index}-${value}`} onClick={() => {
          (index === 0 ? firstHandler : secondHandler)?.(value);
          setQuery('');
        }}><span>{value}</span><small>{titles[index]}</small></button>) : <p>No matching filters.</p>}
      </div>}
    </div>
    {titles.map((title, index) => title && (index === 0 || paired) && <div key={title}>
      <h2><label htmlFor={index === 0 ? 'firstSelector' : 'secondSelector'}>Filter by <span className="detail">{title}</span></label></h2>
      <select id={index === 0 ? 'firstSelector' : 'secondSelector'} name={index === 0 ? 'firstSelector' : 'secondSelector'} value={values[index] ?? ''} onChange={event => (index === 0 ? firstHandler : secondHandler)?.(event.currentTarget.value)}>
        <option value="" disabled>...</option>
        {paired && <option value="top">{topLabel}</option>}
        <option value="all">All</option>
        {(options[index] ?? []).map(option => <option key={option} value={option}>{index === 0 ? option.toUpperCase() : option}</option>)}
      </select>
    </div>)}
  </nav>;
}
