'use client';


import { getAllEducation } from "@/app/_actions/educationService";
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
    <>
      <div className={css.dataHeader}>
        <h2>Education {educationItems.length}</h2>
        <button className={css.newBtn} disabled={loading} onClick={() => openModal()}>
          + New Education
        </button>
      </div>
      <DataStatus loading={loading} error={error} refresh={refresh} />
      <PortfolioDataList
        items={educationItems}
        openModal={openModal}
        itemDisplay={(edu: EducationDTO) => (
          <>
            <strong>{edu.degree}</strong>
            <div className={css.dataBrief}>{edu.college}</div>
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
    </>
  );
}