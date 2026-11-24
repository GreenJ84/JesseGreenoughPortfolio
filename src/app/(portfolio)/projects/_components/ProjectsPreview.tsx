'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/app/_lib/_types';
import css from './Project.module.css';

export default function ProjectsPreview({ projects }: { projects: Project[] }) {
  const featured = projects.slice(0, 10);
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const activeCard = useRef<HTMLElement>(null);
  const visible = featured.length < 3 ? featured.map((project, index) => ({ project, position: index === active ? 'center' : index < active ? 'left' : 'right' })) : [-1, 0, 1].map(offset => ({ project: featured[(active + offset + featured.length) % featured.length], position: offset < 0 ? 'left' : offset > 0 ? 'right' : 'center' }));
  return <section className={css.projectsPreviewSection} aria-labelledby="featured-projects-title">
    <div className={css.previewHeading}>
      <div><p className={css.previewEyebrow}>Selected work</p><h2 id="featured-projects-title">Projects worth exploring.</h2></div>
      <Link href="/projects" className={css.moreLink}>All projects <span aria-hidden="true">→</span></Link>
    </div>
    <div className={css.previewCarousel} aria-roledescription="carousel" aria-label="Featured projects">
      {visible.map(({ project, position }) => {
        const isCenter = position === 'center';
        const isExpanded = isCenter && expanded;
        const canExpand = isCenter && Boolean(project.description || project.brief.length > 90);
        const isTruncated = project.brief.length > 90;
        const previewBrief = isTruncated ? project.brief.slice(0, 90).trimEnd() : project.brief;
        return <article key={project.id} ref={isCenter ? activeCard : undefined} className={`${css.previewCard} ${css[`preview${position}`]}`} aria-current={isCenter ? 'true' : undefined}>
          <div className={css.previewMedia}><Image src={project.image_url} alt="" width={1200} height={800} sizes="(max-width: 760px) 90vw, 45vw" /></div>
          <div className={`${css.previewContent} ${isExpanded ? css.previewContentExpanded : ''}`}>
            <h3>{project.title}</h3>
            {!isExpanded && <p className={css.previewBrief}>{previewBrief}{canExpand ? <span className={css.previewMoreGroup}>… <button className={css.previewInlineMore} type="button" aria-expanded={false} aria-controls={`preview-description-${project.id}`} onClick={() => { setExpanded(true); requestAnimationFrame(() => activeCard.current?.scrollIntoView({ block: 'center', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })); }}>Show more</button></span> : isTruncated ? '…' : null}</p>}
            {isCenter && <>
              <ul>{project.key_techs.slice(0, 4).map(tech => <li key={tech}>{tech}</li>)}</ul>
              <hr className={css.previewRule} hidden={!isExpanded} />
              <div id={`preview-description-${project.id}`} className={css.previewDescription} hidden={!isExpanded} tabIndex={isExpanded ? 0 : -1}><p>{project.brief}</p>{project.description && <p>{project.description}</p>}</div>
              <div className={css.previewLinks}>
                {project.deployed_url && <a href={project.deployed_url} target="_blank" rel="noopener noreferrer">Live project ↗</a>}
                {project.github_url && <a href={project.github_url} target="_blank" rel="noopener noreferrer">Source code ↗</a>}
                {isExpanded && <button type="button" className={css.previewInlineMore} aria-expanded={true} aria-controls={`preview-description-${project.id}`} onClick={() => setExpanded(false)}>Show less</button>}
              </div>
            </>}
          </div>
          {!isCenter && <button className={css.previewSideButton} type="button" aria-label={`Show ${project.title}`} onClick={() => { setExpanded(false); setActive(index => (index + (position === 'left' ? -1 : 1) + featured.length) % featured.length); }} />}
        </article>;
      })}
    </div>
    {featured.length > 1 && <div className={css.previewPagination} aria-label="Choose featured project">{featured.map((project, index) => <button key={project.id} type="button" aria-label={`Show ${project.title}`} aria-current={index === active ? 'true' : undefined} onClick={() => { setExpanded(false); setActive(index); }} />)}</div>}
  </section>;
}
