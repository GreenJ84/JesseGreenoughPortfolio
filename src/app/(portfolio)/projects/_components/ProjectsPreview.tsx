import React from 'react';
import Link from 'next/link';

import { ProjectType } from '@/app/_lib/_types';

import ProjectDetailCard from './ProjectDetailCard';

import css from './Project.module.css';

const ProjectsPreview = ({projects} : {
  projects: ProjectType[];
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