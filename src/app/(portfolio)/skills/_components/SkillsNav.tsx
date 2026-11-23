'use client';
import css from './Skill.module.css';

const label = (value: string) => value.replaceAll('_', ' ').replace(/([a-z])([A-Z])/g, '$1 $2');

export default function SkillsNav({ sections }: { sections: string[] }) {
  return <nav className={css.categoryNav} aria-label="Skill categories">
    <ul className={css.categoryList}>{sections.map(section => <li key={section}>
      <a href={`#${section}`} className={css.categoryButton}>{label(section)}</a>
    </li>)}</ul>
  </nav>;
}
