import React from 'react';
import Link from 'next/link';

import ProjectDetailCard from './ProjectDetailCard';
import * as projectService from '../projectService';

import css from './Project.module.css';

const ProjectsPreview = ({projects} : {
  projects: projectService.projectType[];
}) => {

  return (
    <section className={css.projectsPreviewSection}>
      <h2>Latest Top Projects</h2>
      <div className={css.previewGrid}>
        {projects.slice(0, 2).map((project) => (
          <ProjectDetailCard
            key={project.id!}
            project={project}
          />
        ))}
      </div>
      <Link href="/projects" className={css.moreLink}>
        View More Projects
      </Link>
  </section>
  )
}

export default ProjectsPreview