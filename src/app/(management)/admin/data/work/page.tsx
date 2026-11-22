'use client';

import React, { useCallback } from "react";

import { getFullAllWorkByCategory } from "@/app/_actions/workService";
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
    <>
      <div className={css.dataHeader}>
        <h2>Work Experience {workItems.length}</h2>
        <button className={css.newBtn} disabled={loading} onClick={() => openModal()}>
          + New Work Experience
        </button>
      </div>
      <div style={{ margin: '1rem auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '40vw' }}>
        <button
          type="button"
          className={category === 'primary' ? css.submitBtn : css.cancelBtn}
          onClick={() => setCategory('primary')}
          disabled={category === 'primary'}
        >
          Primary
        </button>
        <button
          type="button"
          className={category === 'secondary' ? css.submitBtn : css.cancelBtn}
          onClick={() => setCategory('secondary')}
          disabled={category === 'secondary'}
          style={{ marginLeft: '0.5rem' }}
        >
          Secondary
        </button>
      </div>
      <DataStatus loading={loading} error={error} refresh={refresh} />
      <PortfolioDataList
        items={workItems}
        openModal={openModal}
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
    </>
  );
}