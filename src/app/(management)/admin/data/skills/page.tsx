'use client';

import type { Skill } from '@/app/_lib/_types';
import { deleteSkill, getAdminSkills } from '@/app/_actions/skillService';
import DataStatus from '../_components/DataStatus';
import useDataManager from '../_components/useDataManager';
import FormModal from '../_components/FormModal';
import PortfolioDataList from '../_components/PortfolioDataList';
import SkillForm from './SkillForm';
import css from '../_components/DataPage.module.css';

export default function SkillsAdminPage() {
  const { items, selected, showModal, openModal, closeModal, loading, error, refresh, afterMutation } = useDataManager<Skill>(getAdminSkills);
  return <main className={css.dataPageWrap}>
    <div className={css.dataHeader}>
      <div><p className={css.eyebrow}>Portfolio data</p><h1>Skills <span>{items.length}</span></h1><p>Manage public skills, proficiency, icons, and display order.</p></div>
      <button type="button" className={css.newBtn} disabled={loading} onClick={() => openModal()}>+ New skill</button>
    </div>
    <DataStatus loading={loading} error={error} refresh={refresh} />
    <PortfolioDataList items={items} openModal={openModal} itemLabel={item => item.title} searchText={item => [item.title, item.category, item.image_url].join(' ')} groupBy={item => item.category} groupLabel={category => category.replaceAll('_', ' ')} defaultOpenGroup="languages" groupItemLabel={['skill', 'skills']}
      onDelete={async item => { if (item.id) { await deleteSkill(item.id); await afterMutation(); } }}
      itemDisplay={item => <><strong>{item.title} · {item.rating}/5</strong><div className={css.dataBrief}>{item.category.replaceAll('_', ' ')} · {item.visible ? 'Visible' : 'Hidden'} · order {item.sortOrder}</div></>} />
    {showModal && <FormModal title={selected ? 'Edit Skill' : 'New Skill'} onClose={closeModal}><SkillForm initial={selected} onSaved={afterMutation} onClose={closeModal} /></FormModal>}
  </main>;
}
