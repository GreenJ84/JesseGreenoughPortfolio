import Link from 'next/link';
import DeveloperPortrait from '../_shared/DeveloperPortrait';
import css from './Home.module.css';

export default function HomeTop() {
  return <section className={css.homeIntro} aria-labelledby="hero-title">
    <div className={css.heroCopy}>
      <p className={css.eyebrow}>Full stack developer · Washington State</p>
      <h1 id="hero-title" className={css.homeHeader}>Hi, I’m <span>Jesse Greenough.</span></h1>
      <p className={css.heroLead}>I build thoughtful software for real people, from polished interfaces to dependable systems behind them.</p>
      <div className={css.heroActions}>
        <Link href="/projects" className={css.primaryAction}>Explore my work <span aria-hidden="true">↗</span></Link>
        <Link href="/about" className={css.secondaryAction}>More about me <span aria-hidden="true">→</span></Link>
      </div>
      <p className={css.heroNote}>TypeScript · React · Node.js · Java · Rust · Python</p>
    </div>
    <div className={css.heroPortrait}><DeveloperPortrait /><span className={css.portraitCaption}>Designing, building, learning.</span></div>
  </section>;
}
