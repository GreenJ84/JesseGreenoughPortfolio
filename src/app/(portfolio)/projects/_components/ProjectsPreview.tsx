'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ProjectType } from '@/app/_lib/_types';
import css from './Project.module.css';

export default function ProjectsPreview({ projects }: { projects: ProjectType[] }) {
  const featured = projects.slice(0, 10);
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const visible = featured.length < 3 ? featured.map((project, index) => ({ project, position: index === active ? 'center' : index < active ? 'left' : 'right' })) : [-1, 0, 1].map(offset => ({ project: featured[(active + offset + featured.length) % featured.length], position: offset < 0 ? 'left' : offset > 0 ? 'right' : 'center' }));
  return <section className={css.projectsPreviewSection} aria-labelledby="featured-projects-title">
    <div className={css.previewHeading}>
      <div><p className={css.previewEyebrow}>Selected work</p><h2 id="featured-projects-title">Projects worth exploring.</h2></div>
      <Link href="/projects" className={css.moreLink}>All projects <span aria-hidden="true">→</span></Link>
    </div>
    <div className={css.previewCarousel} aria-roledescription="carousel" aria-label="Featured projects">
      {visible.map(({ project, position }) => <article key={project.id} className={`${css.previewCard} ${css[`preview${position}`]}`} aria-current={position === 'center' ? 'true' : undefined}>
        <div className={css.previewMedia}>
          <Image src={project.image_path} alt="" fill sizes="(max-width: 760px) 90vw, 45vw" />
          {position === 'center' && project.description && <>
            <button className={css.previewExpand} type="button" aria-expanded={expanded} aria-controls={`preview-description-${project.id}`} onClick={() => setExpanded(value => !value)}>{expanded ? 'Close details' : 'Read details'} <span aria-hidden="true">{expanded ? '−' : '+'}</span></button>
            <div id={`preview-description-${project.id}`} className={`${css.previewDescription} ${expanded ? css.previewDescriptionOpen : ''}`} hidden={!expanded} tabIndex={expanded ? 0 : -1}><p>{project.description}</p></div>
          </>}
        </div>
        <div className={css.previewContent}>
          <h3>{project.name}</h3>
          <p>{project.brief}</p>
          {position === 'center' && <><ul>{project.key_techs.slice(0, 4).map(tech => <li key={tech}>{tech}</li>)}</ul>
          <div className={css.previewLinks}>
            {project.deployed_url && <a href={project.deployed_url} target="_blank" rel="noopener noreferrer">Live project ↗</a>}
            {project.github_url && <a href={project.github_url} target="_blank" rel="noopener noreferrer">Source code ↗</a>}
          </div></>}
        </div>
        {position !== 'center' && <button className={css.previewSideButton} type="button" aria-label={`Show ${project.name}`} onClick={() => { setExpanded(false); setActive(index => (index + (position === 'left' ? -1 : 1) + featured.length) % featured.length); }} />}
      </article>)}
    </div>
    {featured.length > 1 && <div className={css.previewPagination} aria-label="Choose featured project">{featured.map((project, index) => <button key={project.id} type="button" aria-label={`Show ${project.name}`} aria-current={index === active ? 'true' : undefined} onClick={() => { setExpanded(false); setActive(index); }} />)}</div>}
  </section>;
}
