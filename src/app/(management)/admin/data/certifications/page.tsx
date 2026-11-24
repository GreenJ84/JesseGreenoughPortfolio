'use client';


import { deleteCertification, getFullAllCertifications } from "@/app/_actions/certificationService";
import type { Certification } from "@/app/_lib/_types";

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
  } = useDataManager<Certification>(getFullAllCertifications);

  return (
    <main className={css.dataPageWrap}>
      <div className={css.dataHeader}>
        <div><p className={css.eyebrow}>Portfolio data</p><h1>Certifications <span>{certifications.length}</span></h1><p>Find credentials by title, issuer, or technology and keep their details current.</p></div>
        <button type="button" className={css.newBtn} disabled={loading} onClick={() => openModal()}>
          + New certification
        </button>
      </div>
      <DataStatus loading={loading} error={error} refresh={refresh} />
      <PortfolioDataList
        items={certifications}
        openModal={openModal}
        itemLabel={cert => cert.title}
        searchText={cert => [cert.title, cert.brief, ...(cert.techs ?? [])].join(' ')}
        onDelete={async cert => { if (cert.id) { await deleteCertification(cert.id); await afterMutation(); } }}
        itemDisplay={(cert: Certification) => (
          <>
            <strong>{cert.title}</strong>
            <div className={css.dataBrief}>{cert.brief}</div>
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
    </main>
  );
}
