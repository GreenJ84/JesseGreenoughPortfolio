'use client';

import React, { useEffect, useState } from 'react';

import type { CertificationType } from '@/app/_lib/_types';
import { saveCertification, deleteCertification } from '@/app/_actions/certificationService';
import { getCertificationTagOptions } from '@/app/_actions/adminTagOptions';

import { FormActionButtons, useFormMutation } from '../_components/FormModal';
import { PortfolioDateField } from '../_components/PortfolioDateFields';
import TagPicker from '../_components/TagPicker';
import MediaPicker from '../_components/MediaPicker';
import ResourceJsonImport from '../_components/ResourceJsonImport';
import { certificationInput } from '@/app/_security/validation';

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

  const [tagOptions, setTagOptions] = useState<string[]>([]);
  const [tagError, setTagError] = useState(false);
  const [mediaBusy, setMediaBusy] = useState(false);
  const [jsonMode, setJsonMode] = useState(false);
  useEffect(() => {
    let active = true;
    void getCertificationTagOptions().then(options => { if (active) setTagOptions(options); }).catch(() => { if (active) setTagError(true); });
    return () => { active = false; };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev: CertificationType) => ({
      ...prev,
      [name]: name === 'priority' ? Number(value) : value,
    }));
  };

  const mutation = useFormMutation();
  const handleSubmit = async () => { if (!mediaBusy && !jsonMode) await mutation.run('save', () => saveCertification(form), onSaved); };
  const handleDelete = async (id?: string) => { if (id) await mutation.run('delete', () => deleteCertification(id), onSaved); };

  return (
    <form className={css.dataForm} action={handleSubmit}>
      <ResourceJsonImport value={form} validate={certificationInput} onApply={setForm} onModeChange={setJsonMode} />
      <fieldset hidden={jsonMode} disabled={mutation.pending} className={css.formFields}>
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
      <MediaPicker label="Credential image" value={form.image} onChange={image => setForm(previous => ({ ...previous, image }))} onBusyChange={setMediaBusy} />
      <label className={css.formLabel}>
        Certification URL
        <input className={css.formInput} name="url" type="url" value={form.url} onChange={handleChange} />
      </label>

      {tagError && <p className={css.formError}>Existing options are unavailable. You can still add a new value.</p>}
      <TagPicker label="Technologies" values={form.techs} options={tagOptions} onChange={techs => setForm(previous => ({ ...previous, techs }))} />

      <FormActionButtons
        id={form.id || undefined}
        onClose={onClose}
        onDelete={handleDelete}
        blocked={mediaBusy}
      />
      </fieldset>
    </form>
  );
}
