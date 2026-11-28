'use client';

import { useId, useRef, useState } from 'react';
import { unusedTags } from '@/app/_lib/tagOptions';
import css from './DataPage.module.css';

export default function TagPicker({ label, values, options, onChange }: { label: string; values: string[]; options: string[]; onChange: (values: string[]) => void }) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const suggestions = unusedTags(options, values, query).slice(0, 12);
  const canAdd = Boolean(query.trim()) && !values.some(value => value.toLocaleLowerCase() === query.trim().toLocaleLowerCase()) && values.length < 50;

  function add(value: string) {
    const trimmed = value.trim();
    if (!trimmed || trimmed.length > 200 || values.length >= 50 || values.some(item => item.toLocaleLowerCase() === trimmed.toLocaleLowerCase())) return;
    const canonical = options.find(option => option.toLocaleLowerCase() === trimmed.toLocaleLowerCase()) ?? trimmed;
    onChange([...values, canonical]);
    setQuery('');
    setOpen(false);
    input.current?.focus();
  }

  return <fieldset className={css.formFieldset}>
    <legend className={css.formLegend}>{label}</legend>
    {values.length > 0 && <ul className={css.selectedTags}>{values.map((value, index) => <li key={`${value}-${index}`}>{value}<button type="button" aria-label={`Remove ${value}`} onClick={() => onChange(values.filter((_, position) => position !== index))}>×</button></li>)}</ul>}
    <div className={css.tagPicker} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
      <label className={css.formLabel} htmlFor={id}>Add {label.toLocaleLowerCase()}
        <input ref={input} id={id} className={css.formInput} role="combobox" aria-autocomplete="list" aria-expanded={open && suggestions.length > 0} aria-controls={`${id}-options`} value={query} onFocus={() => setOpen(true)} onChange={event => { setQuery(event.target.value); setOpen(true); }} onKeyDown={event => {
          if (event.key === 'Enter') { event.preventDefault(); add(query); }
          if (event.key === 'ArrowDown' && suggestions.length) { event.preventDefault(); document.getElementById(`${id}-option-0`)?.focus(); }
        }} placeholder="Search existing or type a new value" maxLength={200} />
      </label>
      {open && suggestions.length > 0 && <ul id={`${id}-options`} className={css.tagSuggestions}>
        {suggestions.map((option, index) => <li key={option}><button id={`${id}-option-${index}`} type="button" onClick={() => add(option)}>{option}</button></li>)}
      </ul>}
      <button type="button" className={css.addBtn} disabled={!canAdd} onClick={() => add(query)}>Add value</button>
    </div>
  </fieldset>;
}
