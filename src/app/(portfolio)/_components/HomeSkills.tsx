import Link from 'next/link';
import { skillData } from '../skills/_components/skillData';
import css from './Home.module.css';

const languages = [
  ...skillData.languages.filter(skill => skill.name !== 'Java' && skill.name !== 'Solidity' && skill.name !== 'Markdown'),
].sort((a, b) => (a.name === 'Rust' ? -1 : b.name === 'Rust' ? 1 : 0));

export default function HomeSkills() {
  return <section className={css.homeSkills} aria-labelledby="home-skills-title">
    <div className={css.snapshotHeading}>
      <p className={css.eyebrow}>Start here</p>
      <h2 id="home-skills-title">The tools behind the work.</h2>
      <p>Rust and secure backend engineering lead the way. I also build across the web stack, from TypeScript and Node.js to Python and accessible interfaces.</p>
      <Link href="/skills" className={css.textAction}>Explore all skills <span aria-hidden="true">→</span></Link>
    </div>
    <div className={css.skillMarquee} aria-label="Languages and technologies">
      <div className={css.skillTrack}>
        {[0, 1].map(copy => <ul key={copy} aria-hidden={copy === 1}>
          {languages.map(skill => {
            const Icon = skill.icon;
            return <li key={skill.name}><Icon aria-hidden="true" /><span>{skill.name}</span></li>;
          })}
        </ul>)}
      </div>
    </div>
  </section>;
}
