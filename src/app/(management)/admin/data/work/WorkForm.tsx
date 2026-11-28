'use client';

import React, { useState } from 'react';

import type { Work } from '@/app/_lib/_types';
import { saveWork, deleteWork } from '@/app/_actions/workService';

import { FormActionButtons, useFormMutation } from '../_components/FormModal';
import MediaPicker from '../_components/MediaPicker';
import ResourceJsonImport from '../_components/ResourceJsonImport';
import { workInput } from '@/app/_security/validation';

import css from '../_components/DataPage.module.css';

interface WorkFormProps {
  initial?: Work;
  category: 'primary' | 'secondary';
  onClose: () => void;
  onSaved: () => Promise<void>;
}

export default function WorkForm({
  initial,
  category,
  onClose,
  onSaved,
}: WorkFormProps) {
  const [form, setForm] = useState<Work>(
    initial ?? {
      title: '',
      brief: '',
      image_url: '',
      location: '',
      start_date: '',
      primary: category === 'primary',
      details: [],
    }
  );
  const [mediaBusy, setMediaBusy] = useState(false);
  const [jsonMode, setJsonMode] = useState(false);

  // Array field handlers for details
  const handleArrayChange = (idx: number, value: string) => {
    setForm((prev: Work) => ({
      ...prev,
      details: prev.details.map((item: string, i: number) => (i === idx ? value : item)),
    }));
  };

  const addArrayItem = () => {
    setForm((prev: Work) => ({
      ...prev,
      details: [...prev.details, ''],
    }));
  };

  const removeArrayItem = (idx: number) => {
    setForm((prev: Work) => ({
      ...prev,
      details: prev.details.filter((_: string, i: number) => i !== idx),
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev: Work) => ({
      ...prev,
      [name]: value,
    }));
  };

  const mutation = useFormMutation();
  const handleSubmit = async () => { if (!mediaBusy && !jsonMode) await mutation.run('save', () => saveWork(category, form), onSaved); };
  const handleDelete = async (id?: string) => { if (id) await mutation.run('delete', () => deleteWork(category, id), onSaved); };

  return (
    <form className={css.dataForm} action={handleSubmit}>
      <ResourceJsonImport value={form} validate={workInput} onApply={setForm} onModeChange={setJsonMode} />
      <fieldset hidden={jsonMode} disabled={mutation.pending} className={css.formFields}>
      {form.id && <input type="hidden" name="id" value={form.id} />}
      <label className={css.formLabel}>
        Company*
        <input className={css.formInput} name="brief" value={form.brief} onChange={handleChange} required />
      </label>
      <label className={css.formLabel}>
        Position*
        <input className={css.formInput} name="title" value={form.title} onChange={handleChange} required />
      </label>
      <MediaPicker label="Company logo" value={form.image_url} onChange={image_url => setForm(previous => ({ ...previous, image_url }))} onBusyChange={setMediaBusy} />
      <label className={css.formLabel}>
        Location*
        <input className={css.formInput} name="location" value={form.location} onChange={handleChange} required />
      </label>
      <label className={css.formLabel}>Start month*<input className={css.formInput} type="month" value={form.start_date} onChange={event => setForm(previous => ({ ...previous, start_date: event.target.value }))} required /></label>
      <label className={css.formLabel}>End month (empty for present)<input className={css.formInput} type="month" min={form.start_date || undefined} value={form.end_date ?? ''} onChange={event => setForm(previous => ({ ...previous, end_date: event.target.value || undefined }))} /></label>

      <fieldset className={css.formFieldset}>
        <legend className={css.formLegend}>Details</legend>
        {form.details.map((detail: string, idx: number) => (
          <div key={idx} className={css.arrayFieldRow}>
            <input
              className={css.formInput}
              value={detail}
              name="details[]"
              onChange={(e) => handleArrayChange(idx, e.target.value)}
              placeholder="Detail or achievement"
            />
            <button type="button" className={css.removeBtn} onClick={() => removeArrayItem(idx)} aria-label="Remove detail">✕</button>
          </div>
        ))}
        <button type="button" className={css.addBtn} onClick={addArrayItem}>Add Detail</button>
      </fieldset>

      <FormActionButtons
        id={form.id}
        onClose={onClose}
        onDelete={handleDelete}
        blocked={mediaBusy}
      />
      </fieldset>
    </form>
  );
}
