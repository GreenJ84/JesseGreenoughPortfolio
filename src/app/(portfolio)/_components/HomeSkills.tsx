import Link from 'next/link';
import { getPublicSkills } from '@/app/_actions/skillService';
import { getSkillIcon } from '@/app/_lib/skillCatalog';
import type { Skill } from '@/app/_lib/_types';
import css from './Home.module.css';

export default async function HomeSkills() {
  const skills = await getPublicSkills();
  const languages = skills.filter((skill: Skill) => skill.category === 'languages' && !['Java', 'Solidity', 'Markdown'].includes(skill.title))
    .sort((a: Skill, b: Skill) => a.title === 'Rust' ? -1 : b.title === 'Rust' ? 1 : a.sortOrder - b.sortOrder);
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
            const Icon = getSkillIcon(skill.image_url);
            return <li key={skill.title}><Icon aria-hidden="true" /><span>{skill.title}</span></li>;
          })}
        </ul>)}
      </div>
    </div>
  </section>;
}
