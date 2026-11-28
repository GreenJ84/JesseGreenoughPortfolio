'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeSwitch from './ThemeSwitch';
import css from './Navbar.module.css';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/skills', label: 'Skills' },
  { href: '/projects', label: 'Projects' },
  { href: '/education', label: 'Education' },
  { href: '/work', label: 'Work' },
  { href: '/resumes', label: 'Resumes' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return <header className={css.header}>
    <div className={css.inner}>
      <Link className={css.brand} href="/" aria-label="Jesse Greenough, home" onClick={() => setOpen(false)}>
        <span className={css.brandMark}>JG</span><span>Jesse Greenough</span>
      </Link>
      <nav id="portfolio-navigation" className={`${css.navigation} ${open ? css.open : ''}`} aria-label="Primary navigation">
        {links.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? 'page' : undefined} onClick={() => setOpen(false)}>{link.label}</Link>)}
      </nav>
      <div className={css.actions}>
        <ThemeSwitch />
        <button type="button" className={css.menuButton} aria-label={open ? 'Close menu' : 'Open menu'} aria-controls="portfolio-navigation" aria-expanded={open} onClick={() => setOpen(value => !value)}>
          <span>{open ? 'Close' : 'Menu'}</span><span aria-hidden="true">{open ? '×' : '☰'}</span>
        </button>
      </div>
    </div>
  </header>;
}
