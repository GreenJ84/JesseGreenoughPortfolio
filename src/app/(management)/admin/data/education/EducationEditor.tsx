'use client';
import { useState, useTransition } from 'react';
import type { EducationDTO } from '@/app/_lib/_types';
import { educationDraft, educationDraftInput } from '@/app/_lib/educationDates';
import { saveEducation, deleteEducation } from '@/app/_actions/educationService';
import { FormActionButtons } from '../_components/FormModal';
import css from '../_components/DataPage.module.css';

export default function EducationEditor({ initial, onClose }: { initial?: EducationDTO; onClose: () => void }) {
  const [form, setForm] = useState(() => educationDraft(initial));
  const [, startTransition] = useTransition();
  const save = async () => { startTransition(async () => { await saveEducation(educationDraftInput(form)); window.location.reload(); onClose(); }); };
  const remove = async (id: string) => { startTransition(async () => { await deleteEducation(id); window.location.reload(); onClose(); }); };
  return <form className={css.dataForm} action={save}>
    <label className={css.formLabel}>College*<input name="college" value={form.college} onChange={event => setForm({ ...form, college: event.target.value })} required /></label>
    <label className={css.formLabel}>Degree*<input name="title" value={form.title} onChange={event => setForm({ ...form, title: event.target.value })} required /></label>
    <label className={css.formLabel}>Start month*<input type="month" name="start_month" value={form.start_month} onChange={event => setForm({ ...form, start_month: event.target.value })} required /></label>
    <label className={css.formLabel}>End month (leave empty for Present)<input type="month" name="end_month" min={form.start_month || undefined} value={form.end_month} onChange={event => setForm({ ...form, end_month: event.target.value })} /></label>
    <label className={css.formLabel}>Icon URL<input name="image" value={form.image} onChange={event => setForm({ ...form, image: event.target.value })} /></label>
    <label className={css.formLabel}>Website<input name="url" value={form.url} onChange={event => setForm({ ...form, url: event.target.value })} /></label>
    <fieldset className={css.formFieldset}><legend>Description</legend>
      {form.details.map((detail, index) => <div key={index} className={css.arrayFieldRow}>
        <input aria-label={`Description ${index + 1}`} value={detail} onChange={event => setForm({ ...form, details: form.details.map((value, position) => position === index ? event.target.value : value) })} />
        <button type="button" onClick={() => setForm({ ...form, details: form.details.filter((_, position) => position !== index) })}>Remove</button>
      </div>)}
      <button type="button" onClick={() => setForm({ ...form, details: [...form.details, ''] })}>Add Description</button>
    </fieldset>
    <FormActionButtons id={form.id} onClose={onClose} onDelete={remove} />
  </form>;
}
