'use client';

import React, { useState, useTransition } from 'react';

import type { WorkType } from '@/app/_lib/_types';
import { saveWork, deleteWork } from '@/app/_actions/workService';

import { FormActionButtons } from '../_components/FormModal';

import css from '../_components/DataPage.module.css';

interface WorkFormProps {
  initial?: WorkType;
  category: 'primary' | 'secondary';
  onClose: () => void;
}

export default function WorkForm({
  initial,
  category,
  onClose,
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

  const [_isPending, startTransition] = useTransition();

  const handleSubmit = async () => {
    startTransition(async () => {
      await saveWork(category, form);
      window.location.reload();
      onClose();
    });
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    startTransition(async () => {
      await deleteWork(category, id);
      window.location.reload();
      onClose();
    });
  };

  return (
    <form className={css.dataForm} action={handleSubmit}>
      {form.id && <input type="hidden" name="id" value={form.id} />}
      <label className={css.formLabel}>
        Company*
        <input className={css.formInput} name="company" value={form.company} onChange={handleChange} required />
      </label>
      <label className={css.formLabel}>
        Position*
        <input className={css.formInput} name="position" value={form.position} onChange={handleChange} required />
      </label>
      <label className={css.formLabel}>
        Logo URL
        <input className={css.formInput} name="logo" value={form.logo} onChange={handleChange} />
      </label>
      <label className={css.formLabel}>
        Location*
        <input className={css.formInput} name="location" value={form.location} onChange={handleChange} required />
      </label>
      <label className={css.formLabel}>
        Date (e.g. &quot;2020 - 2024&quot;)*
        <input className={css.formInput} name="date" value={form.date} onChange={handleChange} required />
      </label>

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
      />
    </form>
  );
}