'use client';

import { useState } from 'react';
import type { SkillType } from '@/app/_lib/_types';
import { skillCategories, skillIconKeys } from '@/app/_lib/skillCatalog';
import { saveSkill, deleteSkill } from '@/app/_actions/skillService';
import TechnicalSkill from '@/app/(portfolio)/skills/_components/TechnicalSkill';
import { FormActionButtons, useFormMutation } from '../_components/FormModal';
import css from '../_components/DataPage.module.css';

export default function SkillForm({ initial, onClose, onSaved }: { initial?: SkillType; onClose: () => void; onSaved: () => Promise<void> }) {
  const [form, setForm] = useState<SkillType>(initial ?? { category: 'languages', name: '', rating: 3, iconKey: 'Rust', sortOrder: 0, visible: true });
  const mutation = useFormMutation();
  const save = async () => { await mutation.run('save', () => saveSkill(form), onSaved); };
  const remove = async (id: string) => mutation.run('delete', () => deleteSkill(id), onSaved);
  return <form className={css.dataForm} action={save}>
    <fieldset disabled={mutation.pending} className={css.formFields}>
      <label className={css.formLabel}>Name*
        <input className={css.formInput} value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} required maxLength={100} />
      </label>
      <label className={css.formLabel}>Group*
        <select className={css.formInput} value={form.category} onChange={event => setForm({ ...form, category: event.target.value })}>{skillCategories.map(category => <option key={category} value={category}>{category.replaceAll('_', ' ')}</option>)}</select>
      </label>
      <label className={css.formLabel}>Rating (1 = have used, 5 = expert)*
        <input className={css.formInput} type="number" min={1} max={5} step={1} value={form.rating} onChange={event => setForm({ ...form, rating: Number(event.target.value) })} required />
      </label>
      <label className={css.formLabel}>Display order*
        <input className={css.formInput} type="number" min={0} max={10000} step={1} value={form.sortOrder} onChange={event => setForm({ ...form, sortOrder: Number(event.target.value) })} required />
      </label>
      <label className={css.formLabel}>Icon*
        <select className={css.formInput} value={form.iconKey} onChange={event => setForm({ ...form, iconKey: event.target.value })}>{skillIconKeys.map(key => <option key={key} value={key}>{key}</option>)}</select>
      </label>
      <label className={css.formLabel}>Visibility
        <select className={css.formInput} value={String(form.visible)} onChange={event => setForm({ ...form, visible: event.target.value === 'true' })}><option value="true">Visible publicly</option><option value="false">Hidden</option></select>
      </label>
      {form.name && <div className={css.wideField} aria-label="Public skill preview"><p>Public preview</p><ul style={{ listStyle: 'none', padding: 0 }}><TechnicalSkill {...form} /></ul></div>}
      <FormActionButtons id={form.id} onClose={onClose} onDelete={remove} />
    </fieldset>
  </form>;
}
