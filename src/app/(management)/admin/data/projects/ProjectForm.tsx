'use client';

import React, { useEffect, useState } from 'react';

import type { ProjectType } from '@/app/_lib/_types';
import { deleteProject, saveProject } from '@/app/_actions/projectService';
import { getProjectTagOptions } from '@/app/_actions/adminTagOptions';

import { FormActionButtons, useFormMutation } from '../_components/FormModal';
import { PortfolioDateField } from '../_components/PortfolioDateFields';
import TagPicker from '../_components/TagPicker';
import MediaPicker from '../_components/MediaPicker';
import ResourceJsonImport from '../_components/ResourceJsonImport';
import { projectInput } from '@/app/_security/validation';

import css from '../_components/DataPage.module.css';

interface ProjectFormProps {
  initial?: ProjectType;
  onClose: () => void;
  onSaved: () => Promise<void>;
}

export default function ProjectForm({
  initial,
  onClose,
  onSaved,
}: ProjectFormProps) {
  const [form, setForm] = useState<ProjectType>(
    initial ?? {
      priority: 0,
      name: '',
      date: '',
      brief: '',
      description: '',
      image_path: '',
      deployed_url: '',
      github_url: '',
      categories: [],
      key_techs: [],
    }
  );
  const [tagOptions, setTagOptions] = useState({ categories: [] as string[], technologies: [] as string[] });
  const [tagError, setTagError] = useState(false);
  const [mediaBusy, setMediaBusy] = useState(false);
  const [jsonMode, setJsonMode] = useState(false);
  useEffect(() => {
    let active = true;
    void getProjectTagOptions().then(options => { if (active) setTagOptions(options); }).catch(() => { if (active) setTagError(true); });
    return () => { active = false; };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev: ProjectType) => ({
      ...prev,
      [name]: name === 'priority' ? Number(value) : value,
    }));
  };

  const mutation = useFormMutation();
  const handleSubmit = async () => { if (!mediaBusy && !jsonMode) await mutation.run('save', () => saveProject(form), onSaved); };
  const handleDelete = async (id?: string) => { if (id) await mutation.run('delete', () => deleteProject(id), onSaved); };

  return (
    <form className={css.dataForm} action={handleSubmit}>
      <ResourceJsonImport value={form} validate={projectInput} onApply={setForm} onModeChange={setJsonMode} />
      <fieldset hidden={jsonMode} disabled={mutation.pending} className={css.formFields}>
        {form.id && <input type="hidden" name="id" value={form.id} />}
        <label className={css.formLabel}>
          Name*
          <input className={css.formInput} name="name" value={form.name} onChange={handleChange} required />
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
          Brief*
          <input className={css.formInput} name="brief" value={form.brief} onChange={handleChange} required />
        </label>
        <label className={`${css.formLabel} ${css.wideField}`}>
          Description*
          <textarea className={css.formTextarea} name="description" value={form.description} onChange={handleChange} rows={4} required />
        </label>
        <MediaPicker label="Project image" value={form.image_path} onChange={image_path => setForm(previous => ({ ...previous, image_path }))} onBusyChange={setMediaBusy} required />
        <label className={css.formLabel}>
          Deployed URL
          <input className={css.formInput} name="deployed_url" type="url" value={form.deployed_url} onChange={handleChange} />
        </label>
        <label className={css.formLabel}>
          GitHub URL*
          <input className={css.formInput} name="github_url" type="url" value={form.github_url} onChange={handleChange} required />
        </label>

        {tagError && <p className={css.formError}>Existing options are unavailable. You can still add a new value.</p>}
        <TagPicker label="Categories" values={form.categories} options={tagOptions.categories} onChange={categories => setForm(previous => ({ ...previous, categories }))} />
        <TagPicker label="Key technologies" values={form.key_techs} options={tagOptions.technologies} onChange={key_techs => setForm(previous => ({ ...previous, key_techs }))} />

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
