'use client';

import React, { useState, useTransition } from 'react';

import type { Education } from '@/app/_lib/_types';
import { deleteEducation, saveEducation } from '@/app/_actions/educationService';

import { FormActionButtons } from '../_components/FormModal';

import css from '../_components/DataPage.module.css';

interface EducationFormProps {
  initial?: Education;
  onClose: () => void;
}

export default function EducationForm({
  initial,
  onClose,
}: EducationFormProps) {
  const [form, setForm] = useState<Education>(
    initial ?? {
      title: '',
      brief: "",
      description: "",
      start_date: new Date(),
      end_date: new Date(),
      details: [],
      image_url: '',
      url: '',
    }
  );

  // Array field handlers for description
  const handleArrayChange = (idx: number, value: string) => {
    setForm((prev: Education) => ({
      ...prev,
      details: prev.details.map((item: string, i: number) => (i === idx ? value : item)),
    }));
  };

  const addArrayItem = () => {
    setForm((prev: Education) => ({
      ...prev,
      details: [...prev.details, ''],
    }));
  };

  const removeArrayItem = (idx: number) => {
    setForm((prev: Education) => ({
      ...prev,
      details: prev.details.filter((_: string, i: number) => i !== idx),
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev: Education) => ({
      ...prev,
      [name]: name === 'start_date' || name === 'end_date' ? new Date(value) : value,
    }));
  };

  const [_isPending, startTransition] = useTransition();

  const handleSubmit = async () => {
    startTransition(async () => {
      await saveEducation(form);
      window.location.reload();
      onClose();
    });
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    startTransition(async () => {
      await deleteEducation(id);
      window.location.reload();
      onClose();
    });
  };

  return (
    <form className={css.dataForm} action={handleSubmit}>
      {form.id && <input type="hidden" name="id" value={form.id} />}
      <label className={css.formLabel}>
        College*
        <input className={css.formInput} name="brief" value={form.brief} onChange={handleChange} required />
      </label>
      <label className={css.formLabel}>
        Degree*
        <input className={css.formInput} name="title" value={form.title} onChange={handleChange} required />
      </label>
      <label className={css.formLabel}>
        Start Date
        <input className={css.formInput} name="start_date" value={form.start_date.toISOString() ?? ''} onChange={handleChange} />
      </label>
      <label className={css.formLabel}>
        End Date
        <input className={css.formInput} name="end_date" value={form.end_date?.toISOString() ?? ''} onChange={handleChange} />
      </label>
      <label className={css.formLabel}>
        Icon URL
        <input className={css.formInput} name="image_url" value={form.image_url} onChange={handleChange} />
      </label>
      <label className={css.formLabel}>
        Website
        <input className={css.formInput} name="url" value={form.url} onChange={handleChange} />
      </label>

      <fieldset className={css.formFieldset}>
        <legend className={css.formLegend}>Description</legend>
        {form.details.map((desc: string, idx: number) => (
          <div key={idx} className={css.arrayFieldRow}>
            <input
              className={css.formInput}
              value={desc}
              name="details[]"
              onChange={(e) => handleArrayChange(idx, e.target.value)}
              placeholder="Description or achievement"
            />
            <button type="button" className={css.removeBtn} onClick={() => removeArrayItem(idx)} aria-label="Remove description">✕</button>
          </div>
        ))}
        <button type="button" className={css.addBtn} onClick={addArrayItem}>Add Description</button>
      </fieldset>

      <FormActionButtons
        id={form.id}
        onClose={onClose}
        onDelete={handleDelete}
      />
    </form>
  );
}