'use client';


import { deleteEducation, getAllEducation } from "@/app/_actions/educationService";
import type { EducationDTO } from "@/app/_lib/_types";

import DataStatus from "../_components/DataStatus";
import useDataManager from "../_components/useDataManager";
import FormModal from "../_components/FormModal";
import PortfolioDataList from "../_components/PortfolioDataList";
import EducationEditor from "./EducationEditor";

import css from '../_components/DataPage.module.css';

export default function EducationPage() {
  const {
    loading, error, refresh, afterMutation,
    items: educationItems,
    selected,
    showModal,
    openModal,
    closeModal
  } = useDataManager<EducationDTO>(getAllEducation);

  return (
    <main className={css.dataPageWrap}>
      <div className={css.dataHeader}>
        <div><p className={css.eyebrow}>Portfolio data</p><h1>Education <span>{educationItems.length}</span></h1><p>Keep degrees, dates, and supporting details easy to review.</p></div>
        <button type="button" className={css.newBtn} disabled={loading} onClick={() => openModal()}>
          + New education
        </button>
      </div>
      <DataStatus loading={loading} error={error} refresh={refresh} />
      <PortfolioDataList
        items={educationItems}
        openModal={openModal}
        itemLabel={education => education.title}
        searchText={education => [education.title, education.brief, ...(education.details ?? [])].join(' ')}
        onDelete={async education => { if (education.id) { await deleteEducation(education.id); await afterMutation(); } }}
        itemDisplay={(edu: EducationDTO) => (
          <>
            <strong>{edu.title}</strong>
            <div className={css.dataBrief}>{edu.brief}</div>
          </>
        )}
      />
      {showModal && (
        <FormModal
          title={selected ? "Edit Education" : "New Education"}
          onClose={closeModal}
        >
          <EducationEditor
            onSaved={afterMutation}
            initial={selected || undefined}
            onClose={closeModal}
          />
        </FormModal>
      )}
    </main>
  );
}
