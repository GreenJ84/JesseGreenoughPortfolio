'use client';
import { useState } from 'react';
import type { EducationDTO } from '@/app/_lib/_types';
import { educationDraft, educationDraftInput, educationDTO, monthDate } from '@/app/_lib/educationDates';
import { educationInput } from '@/app/_security/validation';
import { saveEducation, deleteEducation } from '@/app/_actions/educationService';
import { FormActionButtons, useFormMutation } from '../_components/FormModal';
import MediaPicker from '../_components/MediaPicker';
import ResourceJsonImport from '../_components/ResourceJsonImport';
import css from '../_components/DataPage.module.css';

export default function EducationEditor({ initial, onClose, onSaved }: { initial?: EducationDTO; onClose: () => void; onSaved: () => Promise<void> }) {
  const [form, setForm] = useState(() => educationDraft(initial));
  const [mediaBusy, setMediaBusy] = useState(false);
  const [jsonMode, setJsonMode] = useState(false);
  const mutation = useFormMutation();
  const save = async () => { if (!mediaBusy && !jsonMode) await mutation.run('save', () => saveEducation(educationDraftInput(form)), onSaved); };
  const remove = async (id: string) => { await mutation.run('delete', () => deleteEducation(id), onSaved); };
  return <form className={css.dataForm} action={save}>
    <ResourceJsonImport value={form} serialize={draft => {
      const { start_month, end_month, ...fields } = draft;
      return { ...fields, start_date: start_month ? monthDate(start_month) : '', ...(end_month ? { end_date: monthDate(end_month, true) } : {}) };
    }} validate={educationInput} onApply={value => setForm(educationDraft(educationDTO({ ...value, id: value.id ?? '' })))} onModeChange={setJsonMode} />
    <fieldset hidden={jsonMode} disabled={mutation.pending} className={css.formFields}>
    <label className={css.formLabel}>College*<input className={css.formInput} name="college" value={form.college} onChange={event => setForm({ ...form, college: event.target.value })} required /></label>
    <label className={css.formLabel}>Degree*<input className={css.formInput} name="title" value={form.title} onChange={event => setForm({ ...form, title: event.target.value })} required /></label>
    <label className={css.formLabel}>Start month*<input className={css.formInput} type="month" name="start_month" value={form.start_month} onChange={event => setForm({ ...form, start_month: event.target.value })} required /></label>
    <label className={css.formLabel}>End month (leave empty for Present)<input className={css.formInput} type="month" name="end_month" min={form.start_month || undefined} value={form.end_month} onChange={event => setForm({ ...form, end_month: event.target.value })} /></label>
    <MediaPicker label="School icon" value={form.image} onChange={image => setForm(previous => ({ ...previous, image }))} onBusyChange={setMediaBusy} />
    <label className={css.formLabel}>Website<input className={css.formInput} type="url" name="url" value={form.url} onChange={event => setForm({ ...form, url: event.target.value })} /></label>
    <fieldset className={css.formFieldset}><legend className={css.formLegend}>Description</legend>
      {form.details.map((detail, index) => <div key={index} className={css.arrayFieldRow}>
        <input className={css.formInput} aria-label={`Description ${index + 1}`} value={detail} onChange={event => setForm({ ...form, details: form.details.map((value, position) => position === index ? event.target.value : value) })} />
        <button type="button" className={css.removeBtn} onClick={() => setForm({ ...form, details: form.details.filter((_, position) => position !== index) })}>Remove</button>
      </div>)}
      <button type="button" className={css.addBtn} onClick={() => setForm({ ...form, details: [...form.details, ''] })}>Add Description</button>
    </fieldset>
    <FormActionButtons id={form.id} onClose={onClose} onDelete={remove} blocked={mediaBusy} />
    </fieldset>
  </form>;
}
