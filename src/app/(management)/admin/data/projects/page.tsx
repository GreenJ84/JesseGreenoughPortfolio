'use client';


import { getFullAllProjects } from "@/app/_actions/projectService";

import type { ProjectType } from "@/app/_lib/_types";

import DataStatus from "../_components/DataStatus";
import useDataManager from "../_components/useDataManager";
import FormModal from "../_components/FormModal";
import PortfolioDataList from "../_components/PortfolioDataList";
import ProjectForm from "./ProjectForm";
import css from '../_components/DataPage.module.css';

export default function ProjectsPage() {
  const {
    loading, error, refresh, afterMutation,
    items: projects,
    selected,
    showModal,
    openModal,
    closeModal
  } = useDataManager<ProjectType>(getFullAllProjects);

  return (
    <>
      <div className={css.dataHeader}>
        <h2>Projects {projects.length}</h2>
        <button className={css.newBtn} disabled={loading} onClick={() => openModal()}>
          + New Project
        </button>
      </div>
      <DataStatus loading={loading} error={error} refresh={refresh} />
      <PortfolioDataList
        items={projects}
        openModal={openModal}
        itemDisplay={(proj: ProjectType) => (
          <>
            <strong>{proj.name}</strong>
            <div className={css.dataBrief}>{proj.brief}</div>
          </>
        )}
      />
      {showModal && (
        <FormModal
          title={selected ? "Edit Project" : "New Project"}
          onClose={closeModal}
        >
          <ProjectForm
            onSaved={afterMutation}
            initial={selected || undefined}
            onClose={closeModal}
          />
        </FormModal>
      )}
    </>
  );
}