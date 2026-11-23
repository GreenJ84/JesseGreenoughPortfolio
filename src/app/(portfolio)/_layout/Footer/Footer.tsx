import Link from 'next/link';
import ContactButton from '../ContactButton';
import { SocialLinks } from '../../_shared/_icons/social';
import css from './Footer.module.css';

const links = [
  { href: '/about', label: 'About' }, { href: '/skills', label: 'Skills' },
  { href: '/projects', label: 'Projects' }, { href: '/education', label: 'Education' },
  { href: '/work', label: 'Work' }, { href: '/resumes', label: 'Resumes' },
];

export default function Footer() {
  return <footer id="footer" className={css.footer}>
    <div className={css.inner}>
      <div className={css.top}>
        <div className={css.intro}><p className={css.eyebrow}>Let’s connect</p><h2>Have an idea worth building?</h2><p>I’m always interested in thoughtful projects, useful technology, and good conversations.</p><ContactButton /></div>
        <div className={css.links}>
          <nav aria-label="Footer navigation"><h3>Explore</h3>{links.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}</nav>
          <nav aria-label="Social profiles"><h3>Elsewhere</h3>{SocialLinks.map(link => <a key={link.route} href={link.route} target="_blank" rel="noopener noreferrer">{link.text} <span aria-hidden="true">↗</span></a>)}</nav>
        </div>
      </div>
      <div className={css.bottom}><span>© {new Date().getFullYear()} Jesse Greenough</span><span>Built with care in Washington State.</span></div>
    </div>
  </footer>;
}
