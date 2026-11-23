import Image from 'next/image';
import Link from 'next/link';
import type { ProjectType } from '@/app/_lib/_types';
import css from './Project.module.css';

export default function ProjectsPreview({ projects }: { projects: ProjectType[] }) {
  return <section className={css.projectsPreviewSection} aria-labelledby="featured-projects-title">
    <div className={css.previewHeading}>
      <div><p className={css.previewEyebrow}>Selected work</p><h2 id="featured-projects-title">Projects worth exploring.</h2></div>
      <Link href="/projects" className={css.moreLink}>All projects <span aria-hidden="true">→</span></Link>
    </div>
    <div className={css.previewGrid}>
      {projects.slice(0, 2).map(project => <article key={project.id} className={css.previewCard}>
        <div className={css.previewMedia}><Image src={project.image_path} alt="" fill sizes="(max-width: 760px) 90vw, 45vw" /></div>
        <div className={css.previewContent}>
          <h3>{project.name}</h3>
          <p>{project.brief}</p>
          <ul>{project.key_techs.slice(0, 4).map(tech => <li key={tech}>{tech}</li>)}</ul>
          <div className={css.previewLinks}>
            {project.deployed_url && <a href={project.deployed_url} target="_blank" rel="noopener noreferrer">Live project ↗</a>}
            {project.github_url && <a href={project.github_url} target="_blank" rel="noopener noreferrer">Source code ↗</a>}
          </div>
        </div>
      </article>)}
    </div>
  </section>;
}
