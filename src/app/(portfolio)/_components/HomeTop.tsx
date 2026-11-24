import Link from 'next/link';
import DeveloperPortrait from '../_shared/DeveloperPortrait';
import css from './Home.module.css';

export default function HomeTop() {
  return <section className={css.homeIntro} aria-labelledby="hero-title">
    <div className={css.heroCopy}>
      <p className={css.eyebrow}>Rust-first backend engineer · Security focused</p>
      <h1 id="hero-title" className={css.homeHeader}>Hi, I’m <span>Jesse Greenough.</span></h1>
      <p className={css.heroLead}>I build secure, dependable backend systems in Rust, with the full-stack experience to deliver the interfaces people use every day.</p>
      <div className={css.heroActions}>
        <Link href="/projects" className={css.primaryAction}>Explore my work <span aria-hidden="true">↗</span></Link>
        <Link href="/resumes" className={css.secondaryAction}>View my resume <span aria-hidden="true">→</span></Link>
        <a href="https://github.com/GreenJ84" className={css.secondaryAction} target="_blank" rel="noopener noreferrer">Review my GitHub <span aria-hidden="true">↗</span></a>
      </div>
      <p className={css.heroNote}>M.S. Cybersecurity and Information Assurance · WGU, Oct 2025<br />CompTIA SecurityX (CASP+) · 2026</p>
    </div>
    <div className={css.heroPortrait}><DeveloperPortrait /><span className={css.portraitCaption}>Designing, building, learning.</span></div>
  </section>;
}
