'use client';
import { createContext, useContext, useEffect, useId, useMemo, useRef, useSyncExternalStore } from 'react';
import type { ReactNode } from 'react';
import { FormMutation } from '@/app/_lib/formMutation';
import css from './DataPage.module.css';

const MutationContext = createContext<FormMutation | null>(null);
export function useFormMutation() {
  const controller = useContext(MutationContext);
  if (!controller) throw new Error('Editor must be inside a form modal');
  const snapshot = useSyncExternalStore(controller.subscribe, controller.getSnapshot, controller.getServerSnapshot);
  return { ...snapshot, run: controller.run };
}
export default function FormModal({ title, onClose, children }: { title: string; onClose: () => void; children?: ReactNode }) {
  const controller = useMemo(() => new FormMutation(), []);
  const { pending } = useSyncExternalStore(controller.subscribe, controller.getSnapshot, controller.getServerSnapshot);
  const content = useRef<HTMLDivElement>(null);
  const heading = useId();
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    (content.current?.querySelector<HTMLElement>('input:not([type=hidden]),select,textarea') ?? content.current)?.focus();
    return () => previous?.focus();
  }, []);
  return <MutationContext.Provider value={controller}>
    <div className={css.modalBackdrop} onClick={() => { if (!pending) onClose(); }} />
    <div ref={content} role="dialog" aria-modal="true" aria-labelledby={heading} aria-busy={pending} tabIndex={-1} className={css.formContainer} onKeyDown={event => {
      if (event.key === 'Escape') { event.preventDefault(); if (!pending) onClose(); }
      if (event.key !== 'Tab') return;
      const controls = Array.from(content.current?.querySelectorAll<HTMLElement>('button:not(:disabled),input:not(:disabled):not([type=hidden]),select:not(:disabled),textarea:not(:disabled)') ?? []);
      const first = controls[0], last = controls[controls.length - 1];
      if (!first) { event.preventDefault(); content.current?.focus(); }
      else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }}>
      <h2 id={heading} className={css.formTitle}>{title}</h2>
      <button type="button" className={css.closeBtn} onClick={onClose} disabled={pending} aria-label="Close form">✕</button>
      {children}
    </div>
  </MutationContext.Provider>;
}

export function FormActionButtons({ id, onClose, onDelete }: { id?: string; onClose: () => void; onDelete?: (id: string) => void }) {
  const { pending, completed, error } = useFormMutation();
  return <>
    {error && <p role="alert">{error}</p>}
    <div className={css.modalActions}>
      <button type="submit" className={css.submitBtn} disabled={pending || completed}>{pending ? 'Working…' : id ? 'Save' : 'Create'}</button>
      {id && <button type="button" className={css.deleteBtn} disabled={pending || completed} onClick={() => { if (window.confirm('Delete this item? This cannot be undone.')) onDelete?.(id); }}>Delete</button>}
      <button type="button" className={css.cancelBtn} onClick={onClose} disabled={pending}>{completed ? 'Close' : 'Cancel'}</button>
    </div>
  </>;
}
