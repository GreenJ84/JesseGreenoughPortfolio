'use client';


import { deleteProject, getFullAllProjects } from "@/app/_actions/projectService";

import type { Project } from "@/app/_lib/_types";

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
  } = useDataManager<Project>(getFullAllProjects);

  return (
    <main className={css.dataPageWrap}>
      <div className={css.dataHeader}>
        <div><p className={css.eyebrow}>Portfolio data</p><h1>Projects <span>{projects.length}</span></h1><p>Review the project archive, then open a record to update its story and links.</p></div>
        <button type="button" className={css.newBtn} disabled={loading} onClick={() => openModal()}>
          + New project
        </button>
      </div>
      <DataStatus loading={loading} error={error} refresh={refresh} />
      <PortfolioDataList
        items={projects}
        openModal={openModal}
        itemLabel={project => project.title}
        searchText={project => [project.title, project.brief, ...(project.categories ?? []), ...(project.key_techs ?? [])].join(' ')}
        onDelete={async project => { if (project.id) { await deleteProject(project.id); await afterMutation(); } }}
        itemDisplay={(proj: Project) => (
          <>
            <strong>{proj.title}</strong>
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
    </main>
  );
}
