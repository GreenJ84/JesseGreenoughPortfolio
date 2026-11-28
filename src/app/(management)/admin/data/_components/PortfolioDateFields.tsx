'use client';

import { useState } from 'react';
import { nativeDateValue, parseWorkPeriod, workPeriod } from '@/app/_lib/portfolioDates';
import css from './DataPage.module.css';

export function PortfolioDateField({ value, onChange, label = 'Date' }: { value: string; onChange: (date: string) => void; label?: string }) {
  const nativeValue = nativeDateValue(value);
  const legacy = value && !nativeValue;
  return <label className={css.formLabel}>
    {label}*
    <input className={css.formInput} type="date" value={nativeValue} onChange={event => onChange(event.target.value)} required={!legacy} />
    {legacy && <small className={css.legacyDate}>Saved value: {value}. Choose a date to replace it.</small>}
  </label>;
}

export function WorkPeriodField({ value, onChange }: { value: string; onChange: (date: string) => void }) {
  const initial = parseWorkPeriod(value);
  const [start, setStart] = useState(initial?.start ?? '');
  const [end, setEnd] = useState(initial?.end ?? '');
  const legacy = value && !initial;
  const change = (nextStart: string, nextEnd: string) => {
    if (nextEnd && nextStart && nextEnd < nextStart) nextEnd = '';
    setStart(nextStart);
    setEnd(nextEnd);
    if (nextStart) onChange(workPeriod(nextStart, nextEnd));
  };
  return <fieldset className={css.formFieldset}>
    <legend className={css.formLegend}>Work dates*</legend>
    <div className={css.datePair}>
      <label className={css.formLabel}>Start month*
        <input className={css.formInput} type="month" value={start} onChange={event => change(event.target.value, end)} required={!legacy} />
      </label>
      <label className={css.formLabel}>End month <span className={css.fieldHint}>(empty means Present)</span>
        <input className={css.formInput} type="month" min={start || undefined} value={end} onChange={event => change(start, event.target.value)} />
      </label>
    </div>
    {legacy && <small className={css.legacyDate}>Saved value: {value}. Choose a start month to replace it.</small>}
  </fieldset>;
}
