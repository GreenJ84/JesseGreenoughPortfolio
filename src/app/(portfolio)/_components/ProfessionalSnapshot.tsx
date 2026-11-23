import Link from 'next/link';
import css from './Home.module.css';

const paths = [
  { number: '01', title: 'Education', text: 'Software engineering, cybersecurity, and credentials behind the work.', href: '/education' },
  { number: '02', title: 'Experience', text: 'See how engineering and people leadership meet in my work.', href: '/work' },
  { number: '03', title: 'Resumes', text: 'Get a concise view of my background and qualifications.', href: '/resumes' },
];

export default function ProfessionalSnapshot() {
  return <section className={css.snapshot} aria-labelledby="next-steps-title">
    <div className={css.snapshotHeading}><p className={css.eyebrow}>The background</p><h2 id="next-steps-title">Education, experience, and the details.</h2></div>
    <div className={css.snapshotGrid}>{paths.map(path => <Link key={path.href} href={path.href} className={css.snapshotCard}>
      <span>{path.number}</span><h3>{path.title}</h3><p>{path.text}</p><strong>Explore <span aria-hidden="true">→</span></strong>
    </Link>)}</div>
  </section>;
}
