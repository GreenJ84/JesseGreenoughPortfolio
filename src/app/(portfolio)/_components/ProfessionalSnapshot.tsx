import Link from 'next/link';
import css from './Home.module.css';

const paths = [
  { number: '01', title: 'Projects', text: 'Explore selected applications and the thinking behind them.', href: '/projects' },
  { number: '02', title: 'Experience', text: 'See how engineering and people leadership meet in my work.', href: '/work' },
  { number: '03', title: 'Resumes', text: 'Get a concise view of my background and qualifications.', href: '/resumes' },
];

export default function ProfessionalSnapshot() {
  return <section className={css.snapshot} aria-labelledby="next-steps-title">
    <div className={css.snapshotHeading}><p className={css.eyebrow}>Start here</p><h2 id="next-steps-title">A clear view of what I bring.</h2></div>
    <div className={css.snapshotGrid}>{paths.map(path => <Link key={path.href} href={path.href} className={css.snapshotCard}>
      <span>{path.number}</span><h3>{path.title}</h3><p>{path.text}</p><strong>Explore <span aria-hidden="true">→</span></strong>
    </Link>)}</div>
  </section>;
}
