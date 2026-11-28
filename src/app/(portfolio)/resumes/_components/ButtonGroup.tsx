import css from './Resume.module.css';

export default function ButtonGroup({ download, view }: { download: string; view: string; section?: string }) {
  return <div className={css.resumeButtonHolder}>
    <a className={css.resumeButton} href={view} target="_blank" rel="noopener noreferrer">Open PDF ↗</a>
    <a className={css.resumeButton} href={download} target="_blank" rel="noopener noreferrer" download>Download PDF ↓</a>
  </div>;
}
