'use client';


import { getFullAllCertifications } from "@/app/_actions/certificationService";
import type { CertificationType } from "@/app/_lib/_types";

import DataStatus from "../_components/DataStatus";
import useDataManager from "../_components/useDataManager";
import FormModal from "../_components/FormModal";
import PortfolioDataList from "../_components/PortfolioDataList";
import CertificationForm from "./CertificationForm";

import css from '../_components/DataPage.module.css';

export default function CertificationsPage() {
  const {
    loading, error, refresh, afterMutation,
    items: certifications,
    selected,
    showModal,
    openModal,
    closeModal
  } = useDataManager<CertificationType>(getFullAllCertifications);

  return (
    <>
      <div className={css.dataHeader}>
        <h2>Certifications {certifications.length}</h2>
        <button className={css.newBtn} disabled={loading} onClick={() => openModal()}>
          + New Certification
        </button>
      </div>
      <DataStatus loading={loading} error={error} refresh={refresh} />
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
          <CertificationForm initial={selected} onClose={closeModal} onSaved={afterMutation} />
        </FormModal>
      )}
    </>
  );
}