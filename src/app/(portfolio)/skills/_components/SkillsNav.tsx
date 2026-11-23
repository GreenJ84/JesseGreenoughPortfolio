'use client';
import { useEffect, useRef, useState } from 'react';
import css from './Skill.module.css';

const label = (value: string) => value.replaceAll('_', ' ').replace(/([a-z])([A-Z])/g, '$1 $2');

export default function SkillsNav({ sections }: { sections: string[] }) {
  const nav = useRef<HTMLElement>(null);
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setStuck((nav.current?.getBoundingClientRect().top ?? 1000) <= 77));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);
  return <nav ref={nav} className={`${css.categoryNav} ${stuck ? css.categoryNavStuck : ''}`} aria-label="Skill categories">
    <ul className={css.categoryList}>{sections.map(section => <li key={section}>
      <a href={`#${section}`} className={css.categoryButton}>{label(section)}</a>
    </li>)}</ul>
  </nav>;
}
