'use client';

import React, { useEffect } from "react";

import { getFullAllWorkByCategory } from "@/app/_actions/workService";
import type { WorkType } from "@/app/_lib/_types";

import useDataManager from "../_components/useDataManager";
import FormModal from "../_components/FormModal";
import PortfolioDataList from "../_components/PortfolioDataList";
import WorkForm from "./WorkForm";

import css from '../_components/DataPage.module.css';

export default function WorkPage() {
  const [category, setCategory] = React.useState<'primary' | 'secondary'>('primary');
  const {
    items: workItems,
    setItems: setWorkItems,
    selected,
    showModal,
    openModal,
    closeModal
  } = useDataManager<WorkType>();

  // Fetch all work items on mount
  useEffect(() => {
    (async () => {
      const data = await getFullAllWorkByCategory(category);
      setWorkItems(data);
    })();
  }, [setWorkItems, category]);

  return (
    <>
      <div className={css.dataHeader}>
        <h2>Work Experience {workItems.length}</h2>
        <button className={css.newBtn} onClick={() => openModal()}>
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
            initial={selected || undefined}
            category={category}
            onClose={closeModal}
          />
        </FormModal>
      )}
    </>
  );
}