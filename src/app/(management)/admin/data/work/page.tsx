'use client';

import React, { useCallback } from "react";

import { deleteWork, getFullAllWorkByCategory } from "@/app/_actions/workService";
import type { WorkType } from "@/app/_lib/_types";

import DataStatus from "../_components/DataStatus";
import useDataManager from "../_components/useDataManager";
import FormModal from "../_components/FormModal";
import PortfolioDataList from "../_components/PortfolioDataList";
import WorkForm from "./WorkForm";

import css from '../_components/DataPage.module.css';

export default function WorkPage() {
  const [category, setCategory] = React.useState<'primary' | 'secondary'>('primary');
  const loader = useCallback(() => getFullAllWorkByCategory(category), [category]);
  const {
    loading, error, refresh, afterMutation,
    items: workItems,
    selected,
    showModal,
    openModal,
    closeModal
  } = useDataManager<WorkType>(loader);

  return (
    <main className={css.dataPageWrap}>
      <div className={css.dataHeader}>
        <div><p className={css.eyebrow}>Portfolio data</p><h1>Work experience <span>{workItems.length}</span></h1><p>Manage roles, organizations, and the achievements visitors see.</p></div>
        <button type="button" className={css.newBtn} disabled={loading} onClick={() => openModal()}>
          + New experience
        </button>
      </div>
      <div className={css.categorySwitch} role="group" aria-label="Experience category">
        <button
          type="button"
          className={category === 'primary' ? css.activeCategory : ''}
          aria-pressed={category === 'primary'}
          onClick={() => setCategory('primary')}
        >
          Work
        </button>
        <button
          type="button"
          className={category === 'secondary' ? css.activeCategory : ''}
          aria-pressed={category === 'secondary'}
          onClick={() => setCategory('secondary')}
        >
          Internship / volunteer
        </button>
      </div>
      <DataStatus loading={loading} error={error} refresh={refresh} />
      <PortfolioDataList
        items={workItems}
        openModal={openModal}
        itemLabel={work => `${work.position} at ${work.company}`}
        searchText={work => [work.position, work.company, work.location, work.date, ...(work.details ?? [])].join(' ')}
        onDelete={async work => { if (work.id) { await deleteWork(category, work.id); await afterMutation(); } }}
        itemDisplay={(work: WorkType) => (
          <>
            <strong>{work.position}</strong>
            <div className={css.dataBrief}>{work.company}</div>
          </>
        )}
      />
      {showModal && (
        <FormModal
          title={selected ? "Edit Work Experience" : "New Work Experience"}
          onClose={closeModal}
        >
          <WorkForm
            onSaved={afterMutation}
            initial={selected || undefined}
            category={category}
            onClose={closeModal}
          />
        </FormModal>
      )}
    </main>
  );
}
