'use client';

import { useEffect, useState } from 'react';
import type { SkillType } from '@/app/_lib/_types';
import { deleteSkill, getAdminSkills, getSkillInitializationStatus, importLegacySkills } from '@/app/_actions/skillService';
import DataStatus from '../_components/DataStatus';
import useDataManager from '../_components/useDataManager';
import FormModal from '../_components/FormModal';
import PortfolioDataList from '../_components/PortfolioDataList';
import SkillForm from './SkillForm';
import css from '../_components/DataPage.module.css';

export default function SkillsAdminPage() {
  const { items, selected, showModal, openModal, closeModal, loading, error, refresh, afterMutation } = useDataManager<SkillType>(getAdminSkills);
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState<boolean | null>(null);
  useEffect(() => { let active = true; void getSkillInitializationStatus().then(value => { if (active) setInitialized(value); }).catch(() => { if (active) setImportError('Could not check skill initialization.'); }); return () => { active = false; }; }, []);
  async function importCurrent() {
    setImporting(true);
    setImportError(null);
    try { await importLegacySkills(); setInitialized(true); await refresh(); }
    catch (cause) { setImportError(cause instanceof Error ? cause.message : 'Could not import skills.'); }
    finally { setImporting(false); }
  }
  return <main className={css.dataPageWrap}>
    <div className={css.dataHeader}>
      <div><p className={css.eyebrow}>Portfolio data</p><h1>Skills <span>{items.length}</span></h1><p>Manage public skills, proficiency, icons, and display order.</p></div>
      <button type="button" className={css.newBtn} disabled={loading || importing || initialized !== true} onClick={() => openModal()}>+ New skill</button>
    </div>
    {initialized === false && <button type="button" className={css.newBtn} disabled={importing} onClick={() => { void importCurrent(); }}>{importing ? 'Importing…' : 'Import current skills'}</button>}
    {importError && <p className={css.listError} role="alert">{importError}</p>}
    <DataStatus loading={loading} error={error} refresh={refresh} />
    <PortfolioDataList items={items} openModal={openModal} itemLabel={item => item.name} searchText={item => [item.name, item.category, item.iconKey].join(' ')}
      onDelete={async item => { if (item.id) { await deleteSkill(item.id); await afterMutation(); } }}
      itemDisplay={item => <><strong>{item.name} · {item.rating}/5</strong><div className={css.dataBrief}>{item.category.replaceAll('_', ' ')} · {item.visible ? 'Visible' : 'Hidden'} · order {item.sortOrder}</div></>} />
    {showModal && <FormModal title={selected ? 'Edit Skill' : 'New Skill'} onClose={closeModal}><SkillForm initial={selected} onSaved={afterMutation} onClose={closeModal} /></FormModal>}
  </main>;
}
