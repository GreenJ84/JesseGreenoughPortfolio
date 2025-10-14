'use client';

import React, { useState, useTransition } from 'react';

import type { CertificationType } from '@/app/_lib/_types';
import { saveCertification, deleteCertification } from '@/app/_actions/certificationService';

import { FormActionButtons } from '../_components/FormModal';

import css from '../_components/DataPage.module.css';

interface CertificationFormProps {
  initial?: CertificationType;
  onClose: () => void;
}

export default function CertificationForm({
  initial,
  onClose,
}: CertificationFormProps) {
  const [form, setForm] = useState<CertificationType>(
    initial ?? {
      priority: 0,
      title: '',
      issuer: '',
      date: '',
      description: '',
      image: '',
      url: '',
      techs: [],
    }
  );

  // Array field handlers for techs
  const handleArrayChange = (idx: number, value: string) => {
    setForm((prev: CertificationType) => ({
      ...prev,
      techs: prev.techs.map((item: string, i: number) => (i === idx ? value : item)),
    }));
  };

  const addArrayItem = () => {
    setForm((prev: CertificationType) => ({
      ...prev,
      techs: [...prev.techs, ''],
    }));
  };

  const removeArrayItem = (idx: number) => {
    setForm((prev: CertificationType) => ({
      ...prev,
      techs: prev.techs.filter((_, i) => i !== idx),
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev: CertificationType) => ({
      ...prev,
      [name]: name === 'priority' ? Number(value) : value,
    }));
  };

  const [_isPending, startTransition] = useTransition();

  const handleSubmit = async () => {
    startTransition(async () => {
      await saveCertification(form);
      window.location.reload();
      onClose();
    });
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    startTransition(async () => {
      await deleteCertification(id);
      window.location.reload();
      onClose();
    });
  };

  return (
    <form className={css.dataForm} action={handleSubmit}>
      {form.id && <input type="hidden" name="id" value={form.id} />}
      <label className={css.formLabel}>
        Title*
        <input className={css.formInput} name="title" value={form.title} onChange={handleChange} required />
      </label>
      <label className={css.formLabel}>
        Issuer*
        <input className={css.formInput} name="issuer" value={form.issuer} onChange={handleChange} required />
      </label>
      <label className={css.formLabel}>
        Priority*
        <input
          className={css.formInput}
          name="priority"
          type="number"
          value={form.priority}
          onChange={handleChange}
          min={0}
          required
        />
      </label>
      <label className={css.formLabel}>
        Date*
        <input className={css.formInput} name="date" value={form.date} onChange={handleChange} required />
      </label>
      <label className={css.formLabel}>
        Description*
        <textarea className={css.formTextarea} name="description" value={form.description} onChange={handleChange} rows={3} required />
      </label>
      <label className={css.formLabel}>
        Image URL
        <input className={css.formInput} name="image" value={form.image} onChange={handleChange} />
      </label>
      <label className={css.formLabel}>
        Certification URL
        <input className={css.formInput} name="url" value={form.url} onChange={handleChange} />
      </label>

      <fieldset className={css.formFieldset}>
        <legend className={css.formLegend}>Techs</legend>
        {form.techs.map((tech: string, idx: number) => (
          <div key={idx} className={css.arrayFieldRow}>
            <input
              className={css.formInput}
              value={tech}
              name="techs[]"
              onChange={(e) => handleArrayChange(idx, e.target.value)}
              placeholder="Technology"
            />
            <button type="button" className={css.removeBtn} onClick={() => removeArrayItem(idx)} aria-label="Remove tech">✕</button>
          </div>
        ))}
        <button type="button" className={css.addBtn} onClick={addArrayItem}>Add Tech</button>
      </fieldset>

      <FormActionButtons
        id={form.id || undefined}
        onClose={onClose}
        onDelete={handleDelete}
      />
    </form>
  );
}