import Link from 'next/link';
import css from './Home.module.css';

const paths = [
  { number: '01', title: 'Education & credentials', text: 'M.S. Cybersecurity, B.S. Software Engineering, and SecurityX certification.', href: '/education' },
  { number: '02', title: 'Experience', text: 'Engineering work alongside more than eight years in customer success and team leadership.', href: '/work' },
  { number: '03', title: 'Resume', text: 'A concise, downloadable view of my backend, security, and full-stack background.', href: '/resumes' },
];

export default function ProfessionalSnapshot() {
  return <section className={css.snapshot} aria-labelledby="next-steps-title">
    <div className={css.snapshotHeading}><p className={css.eyebrow}>The background</p><h2 id="next-steps-title">Education, experience, and the details.</h2></div>
    <div className={css.snapshotGrid}>{paths.map(path => <Link key={path.href} href={path.href} className={css.snapshotCard}>
      <span>{path.number}</span><h3>{path.title}</h3><p>{path.text}</p><strong>Explore <span aria-hidden="true">→</span></strong>
    </Link>)}</div>
  </section>;
}
