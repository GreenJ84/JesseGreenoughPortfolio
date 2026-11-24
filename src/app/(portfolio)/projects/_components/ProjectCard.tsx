import Image from 'next/image';
import type { Project } from '@/app/_lib/_types';
import css from './Project.module.css';

export default function ProjectCard({ project }: { project: Project }) {
  return <li className={css.projectCard}>
    <article>
      <div className={css.projectImage}><Image src={project.image_url} alt="" width={1200} height={800} sizes="(max-width: 760px) 90vw, (max-width: 1200px) 45vw, 360px" /></div>
      <div className={css.projectContent}>
        <p className={css.projectCategory}>{project.categories.slice(0, 2).join(' · ') || 'Software project'}</p>
        <h2>{project.title}</h2>
        <p className={css.projectBrief}>{project.brief}</p>
        <ul className={css.techList}>{project.key_techs.slice(0, 5).map(tech => <li key={tech}>{tech}</li>)}</ul>
        <div className={css.projectLinks}>
          {project.deployed_url && <a href={project.deployed_url} target="_blank" rel="noopener noreferrer">View project ↗</a>}
          {project.github_url && <a href={project.github_url} target="_blank" rel="noopener noreferrer">Source code ↗</a>}
        </div>
        {project.description && <details className={css.projectDetails}><summary>Read project details</summary><p>{project.description}</p></details>}
      </div>
    </article>
  </li>;
}
