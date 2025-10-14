'use client';

import React, { useEffect, useMemo } from "react";

import { getFullAllCertifications } from "@/app/_actions/certificationService";
import type { CertificationType } from "@/app/_lib/_types";

import useDataManager from "../_components/useDataManager";
import FormModal from "../_components/FormModal";
import PortfolioDataList from "../_components/PortfolioDataList";
import CertificationForm from "./CertificationForm";

import css from '../_components/DataPage.module.css';

export default function CertificationsPage() {
  const {
    items: certifications,
    setItems: setCertifications,
    selected,
    showModal,
    openModal,
    closeModal
  } = useDataManager<CertificationType>();

  // Fetch all certifications on mount
  useEffect(() => {
    (async () => {
      const data = await getFullAllCertifications();
      setCertifications(data);
    })();
  }, [setCertifications]);

  const form = useMemo(() => {
    return (
      <CertificationForm initial={selected} onClose={closeModal} />
    );
  }, [selected, closeModal]);

  return (
    <>
      <div className={css.dataHeader}>
        <h2>Certifications {certifications.length}</h2>
        <button className={css.newBtn} onClick={() => openModal()}>
          + New Certification
        </button>
      </div>
      <PortfolioDataList
        items={certifications}
        openModal={openModal}
        itemDisplay={(cert: CertificationType) => (
          <>
            <strong>{cert.title}</strong>
            <div className={css.dataBrief}>{cert.issuer}</div>
          </>
        )}
      />
      {showModal && (
        <FormModal
          title={selected ? "Edit Certification" : "New Certification"}
          onClose={closeModal}
        >
          {form}
        </FormModal>
      )}
    </>
  );
}