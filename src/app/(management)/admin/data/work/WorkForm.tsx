'use client';

import React, { useState } from 'react';

import type { WorkType } from '@/app/_lib/_types';
import { saveWork, deleteWork } from '@/app/_actions/workService';

import { FormActionButtons, useFormMutation } from '../_components/FormModal';
import { WorkPeriodField } from '../_components/PortfolioDateFields';
import MediaPicker from '../_components/MediaPicker';

import css from '../_components/DataPage.module.css';

interface WorkFormProps {
  initial?: WorkType;
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
  const [form, setForm] = useState<WorkType>(
    initial ?? {
      company: '',
      position: '',
      logo: '',
      location: '',
      date: '',
      details: [],
    }
  );
  const [mediaBusy, setMediaBusy] = useState(false);

  // Array field handlers for details
  const handleArrayChange = (idx: number, value: string) => {
    setForm((prev: WorkType) => ({
      ...prev,
      details: prev.details.map((item: string, i: number) => (i === idx ? value : item)),
    }));
  };

  const addArrayItem = () => {
    setForm((prev: WorkType) => ({
      ...prev,
      details: [...prev.details, ''],
    }));
  };

  const removeArrayItem = (idx: number) => {
    setForm((prev: WorkType) => ({
      ...prev,
      details: prev.details.filter((_: string, i: number) => i !== idx),
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev: WorkType) => ({
      ...prev,
      [name]: value,
    }));
  };

  const mutation = useFormMutation();
  const handleSubmit = async () => { if (!mediaBusy) await mutation.run('save', () => saveWork(category, form), onSaved); };
  const handleDelete = async (id?: string) => { if (id) await mutation.run('delete', () => deleteWork(category, id), onSaved); };

  return (
    <form className={css.dataForm} action={handleSubmit}>
      <fieldset disabled={mutation.pending} className={css.formFields}>
      {form.id && <input type="hidden" name="id" value={form.id} />}
      <label className={css.formLabel}>
        Company*
        <input className={css.formInput} name="company" value={form.company} onChange={handleChange} required />
      </label>
      <label className={css.formLabel}>
        Position*
        <input className={css.formInput} name="position" value={form.position} onChange={handleChange} required />
      </label>
      <MediaPicker label="Company logo" value={form.logo} onChange={logo => setForm(previous => ({ ...previous, logo }))} onBusyChange={setMediaBusy} />
      <label className={css.formLabel}>
        Location*
        <input className={css.formInput} name="location" value={form.location} onChange={handleChange} required />
      </label>
      <WorkPeriodField value={form.date} onChange={date => setForm(previous => ({ ...previous, date }))} />

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
