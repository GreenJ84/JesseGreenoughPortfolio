'use client';

import React, { useState, useTransition } from 'react';

import type { EducationType } from '@/app/_lib/_types';
import { deleteEducation, saveEducation } from '@/app/_actions/educationService';

import { FormActionButtons } from '../_components/FormModal';

import css from '../_components/DataPage.module.css';

interface EducationFormProps {
  initial?: EducationType;
  onClose: () => void;
}

export default function EducationForm({
  initial,
  onClose,
}: EducationFormProps) {
  const [form, setForm] = useState<EducationType>(
    initial ?? {
      college: '',
      degree: '',
      date: '',
      startDate: '',
      endDate: '',
      description: [],
      icon: '',
      website: '',
    }
  );

  // Array field handlers for description
  const handleArrayChange = (idx: number, value: string) => {
    setForm((prev: EducationType) => ({
      ...prev,
      description: prev.description.map((item: string, i: number) => (i === idx ? value : item)),
    }));
  };

  const addArrayItem = () => {
    setForm((prev: EducationType) => ({
      ...prev,
      description: [...prev.description, ''],
    }));
  };

  const removeArrayItem = (idx: number) => {
    setForm((prev: EducationType) => ({
      ...prev,
      description: prev.description.filter((_: string, i: number) => i !== idx),
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev: EducationType) => ({
      ...prev,
      [name]: value,
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
        <input className={css.formInput} name="college" value={form.college} onChange={handleChange} required />
      </label>
      <label className={css.formLabel}>
        Degree*
        <input className={css.formInput} name="degree" value={form.degree} onChange={handleChange} required />
      </label>
      <label className={css.formLabel}>
        Date (e.g. &quot;2020 - 2024&quot;)*
        <input className={css.formInput} name="date" value={form.date} onChange={handleChange} required />
      </label>
      <label className={css.formLabel}>
        Start Date
        <input className={css.formInput} name="startDate" value={form.startDate ?? ''} onChange={handleChange} />
      </label>
      <label className={css.formLabel}>
        End Date
        <input className={css.formInput} name="endDate" value={form.endDate ?? ''} onChange={handleChange} />
      </label>
      <label className={css.formLabel}>
        Icon URL
        <input className={css.formInput} name="icon" value={form.icon} onChange={handleChange} />
      </label>
      <label className={css.formLabel}>
        Website
        <input className={css.formInput} name="website" value={form.website} onChange={handleChange} />
      </label>

      <fieldset className={css.formFieldset}>
        <legend className={css.formLegend}>Description</legend>
        {form.description.map((desc: string, idx: number) => (
          <div key={idx} className={css.arrayFieldRow}>
            <input
              className={css.formInput}
              value={desc}
              name="description[]"
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