'use client';

import React, { useState, useTransition } from 'react';

import type { ProjectType } from '@/app/_lib/_types';
import { deleteProject, saveProject } from '@/app/_actions/projectService';

import { FormActionButtons } from '../_components/FormModal';

import css from '../_components/DataPage.module.css';

interface ProjectFormProps {
  initial?: ProjectType;
  onClose: () => void;
}

export default function ProjectForm({
  initial,
  onClose,
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

  // Array field handlers
  const handleArrayChange = (field: 'categories' | 'key_techs', idx: number, value: string) => {
    setForm((prev: ProjectType) => ({
      ...prev,
      [field]: prev[field].map((item: string, i: number) => (i === idx ? value : item)),
    }));
  };

  const addArrayItem = (field: 'categories' | 'key_techs') => {
    setForm((prev: ProjectType) => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const removeArrayItem = (field: 'categories' | 'key_techs', idx: number) => {
    setForm((prev: ProjectType) => ({
      ...prev,
      [field]: prev[field].filter((_: string, i: number) => i !== idx),
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev: ProjectType) => ({
      ...prev,
      [name]: name === 'priority' ? Number(value) : value,
    }));
  };

  const [_isPending, startTransition] = useTransition();

  const handleSubmit = async () => {
    startTransition(async () => {
      await saveProject(form);
      window.location.reload();
      onClose();
    });
  };

  const handleDelete = async (id: string) => {
    startTransition(async () => {
      await deleteProject(id);
      window.location.reload();
      onClose();
    });
  }

  return (
      <form className={css.dataForm} action={handleSubmit}>
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
        <label className={css.formLabel}>
          Date*
          <input className={css.formInput} name="date" value={form.date} onChange={handleChange} required />
        </label>
        <label className={css.formLabel}>
          Brief*
          <input className={css.formInput} name="brief" value={form.brief} onChange={handleChange} required />
        </label>
        <label className={css.formLabel}>
          Description*
          <textarea className={css.formTextarea} name="description" value={form.description} onChange={handleChange} rows={4} required />
        </label>
        <label className={css.formLabel}>
          Image Path*
          <input className={css.formInput} name="image_path" value={form.image_path} onChange={handleChange} required />
        </label>
        <label className={css.formLabel}>
          Deployed URL
          <input className={css.formInput} name="deployed_url" value={form.deployed_url} onChange={handleChange} />
        </label>
        <label className={css.formLabel}>
          GitHub URL*
          <input className={css.formInput} name="github_url" value={form.github_url} onChange={handleChange} required />
        </label>

        <fieldset className={css.formFieldset}>
          <legend className={css.formLegend}>Categories</legend>
          {form.categories.map((cat: string, idx: number) => (
            <div key={idx} className={css.arrayFieldRow}>
              <input
                className={css.formInput}
                value={cat}
                name="categories[]"
                onChange={(e) => handleArrayChange('categories', idx, e.target.value)}
                placeholder="Category"
              />
              <button type="button" className={css.removeBtn} onClick={() => removeArrayItem('categories', idx)} aria-label="Remove category">✕</button>
            </div>
          ))}
          <button type="button" className={css.addBtn} onClick={() => addArrayItem('categories')}>Add Category</button>
        </fieldset>

        <fieldset className={css.formFieldset}>
          <legend className={css.formLegend}>Key Technologies</legend>
          {form.key_techs}
          {form.key_techs.map((tech: string, idx: number) => (
            <div key={idx} className={css.arrayFieldRow}>
              <input
                className={css.formInput}
                value={tech}
                name="key_techs[]"
                onChange={(e) => handleArrayChange('key_techs', idx, e.target.value)}
                placeholder="Technology"
              />
              <button type="button" className={css.removeBtn} onClick={() => removeArrayItem('key_techs', idx)} aria-label="Remove tech">✕</button>
            </div>
          ))}
          <button type="button" className={css.addBtn} onClick={() => addArrayItem('key_techs')}>Add Technology</button>
        </fieldset>

        <FormActionButtons
          id={form.id}
          onClose={onClose}
          onDelete={handleDelete}
        />
      </form>
  );
}