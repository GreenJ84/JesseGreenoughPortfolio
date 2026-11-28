'use client';

import { useId, useRef, useState } from 'react';
import { parseResourceJson } from './resourceJson';
import { useFormMutation } from './FormModal';
import css from './DataPage.module.css';

type Resource = { id?: string };

export default function ResourceJsonImport<T extends Resource, V extends Resource>({
  value,
  serialize = value => value,
  validate,
  onApply,
  onModeChange,
}: {
  value: T;
  serialize?: (value: T) => unknown;
  validate: (input: unknown) => V;
  onApply: (value: V) => void;
  onModeChange: (active: boolean) => void;
}) {
  const [active, setActive] = useState(false);
  const [source, setSource] = useState('');
  const [error, setError] = useState('');
  const modeButton = useRef<HTMLButtonElement>(null);
  const { pending } = useFormMutation();
  const fieldId = useId();

  const changeMode = () => {
    if (!active) setSource(JSON.stringify(serialize(value), (key, item) => key === 'id' ? undefined : item, 2));
    setError('');
    setActive(!active);
    onModeChange(!active);
  };

  const apply = () => {
    try {
      const result = parseResourceJson(source, value.id, validate);
      onApply(result);
      setError('');
      setActive(false);
      onModeChange(false);
      modeButton.current?.focus();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Invalid resource JSON.');
    }
  };

  return <div className={css.jsonImport}>
    <button ref={modeButton} type="button" className={css.jsonModeButton} onClick={changeMode} aria-pressed={active} disabled={pending}>
      {active ? 'Return to fields' : 'Edit as JSON'}
    </button>
    {active && <div className={css.jsonEditor}>
      <label className={css.formLabel} htmlFor={fieldId}>Resource JSON</label>
      <p className={css.fieldHint}>Paste one resource object. The record ID is kept from the current form.</p>
      <textarea id={fieldId} className={css.formTextarea} value={source} onChange={event => { setSource(event.target.value); setError(''); }} rows={16} spellCheck={false} autoFocus disabled={pending} />
      {error && <p className={css.formError} role="alert">{error}</p>}
      <button type="button" className={css.submitBtn} onClick={apply} disabled={pending}>Validate and populate form</button>
    </div>}
  </div>;
}
