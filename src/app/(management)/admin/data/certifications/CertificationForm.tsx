'use client';

import React, { useState } from 'react';

import type { CertificationType } from '@/app/_lib/_types';
import { saveCertification, deleteCertification } from '@/app/_actions/certificationService';

import { FormActionButtons, useFormMutation } from '../_components/FormModal';
import { PortfolioDateField } from '../_components/PortfolioDateFields';

import css from '../_components/DataPage.module.css';

interface CertificationFormProps {
  initial?: CertificationType;
  onClose: () => void;
  onSaved: () => Promise<void>;
}

export default function CertificationForm({
  initial,
  onClose,
  onSaved,
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

  const mutation = useFormMutation();
  const handleSubmit = async () => { await mutation.run('save', () => saveCertification(form), onSaved); };
  const handleDelete = async (id?: string) => { if (id) await mutation.run('delete', () => deleteCertification(id), onSaved); };

  return (
    <form className={css.dataForm} action={handleSubmit}>
      <fieldset disabled={mutation.pending} className={css.formFields}>
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
      <PortfolioDateField value={form.date} onChange={date => setForm(previous => ({ ...previous, date }))} />
      <label className={`${css.formLabel} ${css.wideField}`}>
        Description*
        <textarea className={css.formTextarea} name="description" value={form.description} onChange={handleChange} rows={3} required />
      </label>
      <label className={css.formLabel}>
        Image URL
        <input className={css.formInput} name="image" value={form.image} onChange={handleChange} />
      </label>
      <label className={css.formLabel}>
        Certification URL
        <input className={css.formInput} name="url" type="url" value={form.url} onChange={handleChange} />
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
      </fieldset>
    </form>
  );
}
