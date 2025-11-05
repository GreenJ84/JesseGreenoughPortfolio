'use client';

import React, { useEffect } from "react";

import { getEducation } from "@/app/_actions/educationService";
import type { EducationType } from "@/app/_lib/_types";

import useDataManager from "../_components/useDataManager";
import FormModal from "../_components/FormModal";
import PortfolioDataList from "../_components/PortfolioDataList";
import EducationForm from "./EducationForm";

import css from '../_components/DataPage.module.css';

export default function EducationPage() {
  const {
    items: educationItems,
    setItems: setEducationItems,
    selected,
    showModal,
    openModal,
    closeModal
  } = useDataManager<EducationType>();

  // Fetch all education items on mount
  useEffect(() => {
    (async () => {
      const data = await getEducation();
      setEducationItems(data);
    })();
  }, [setEducationItems]);

  return (
    <>
      <div className={css.dataHeader}>
        <h2>Education {educationItems.length}</h2>
        <button className={css.newBtn} onClick={() => openModal()}>
          + New Education
        </button>
      </div>
      <PortfolioDataList
        items={educationItems}
        openModal={openModal}
        itemDisplay={(edu: EducationType) => (
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
          <EducationForm
            initial={selected || undefined}
            onClose={closeModal}
          />
        </FormModal>
      )}
    </>
  );
}