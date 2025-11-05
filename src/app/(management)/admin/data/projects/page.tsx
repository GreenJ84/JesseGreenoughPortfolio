'use client';

import React, { useEffect } from "react";

import { getFullAllProjects } from "@/app/_actions/projectService";

import type { ProjectType } from "@/app/_lib/_types";

import useDataManager from "../_components/useDataManager";
import FormModal from "../_components/FormModal";
import PortfolioDataList from "../_components/PortfolioDataList";
import ProjectForm from "./ProjectForm";
import css from '../_components/DataPage.module.css';

export default function ProjectsPage() {
  const {
    items: projects,
    setItems: setProjects,
    selected,
    showModal,
    openModal,
    closeModal
  } = useDataManager<ProjectType>();

  // Fetch all projects on mount
  useEffect(() => {
    (async () => {
      const data = await getFullAllProjects();
      setProjects(data);
    })();
  }, [setProjects]);

  return (
    <>
      <div className={css.dataHeader}>
        <h2>Projects {projects.length}</h2>
        <button className={css.newBtn} onClick={() => openModal()}>
          + New Project
        </button>
      </div>
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
            initial={selected || undefined}
            onClose={closeModal}
          />
        </FormModal>
      )}
    </>
  );
}