import Link from 'next/link';
import { headers } from 'next/headers';
import DeveloperPortrait from '../_shared/DeveloperPortrait';
import Footer from '../_layout/Footer/Footer';
import { APP_URL, portfolioMetadata } from '../sharedMetadata';
import css from './_components/About.module.css';

const strengths = [
  { title: 'Backend first', text: 'Rust is where I focus my systems work: clear boundaries, reliable services, and careful handling of data.' },
  { title: 'Security minded', text: 'Graduate study in cybersecurity reinforces how I think about authentication, risk, and resilient design.' },
  { title: 'Full-stack delivery', text: 'TypeScript, Node.js, Python, and frontend experience let me connect strong services to useful interfaces.' },
];

const milestones = [
  { date: '2026', title: 'CompTIA SecurityX (CASP+)', text: 'Earned the advanced practitioner cybersecurity certification.' },
  { date: 'Oct 2025', title: 'M.S. Cybersecurity and Information Assurance', text: 'Completed the master’s program at Western Governors University.' },
  { date: '2024', title: 'Software Engineering degree', text: 'Earned a Bachelor of Science in Software Engineering from Western Governors University.' },
  { date: '2022', title: 'Full stack bootcamp', text: 'Completed Coding Dojo’s web development bootcamp while continuing to build independent projects.' },
  { date: 'Before code', title: 'Leadership and service', text: 'Spent more than eight years in customer success and operations, including team leadership roles.' },
];

export default async function AboutPage() {
  const nonce = (await headers()).get('x-nonce') ?? undefined;
  const profile = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      '@id': `${APP_URL}/about#jesse-greenough`,
      name: 'Jesse Greenough',
      url: `${APP_URL}/about`,
      description: 'Rust backend engineer focused on secure systems, with full-stack TypeScript, Node.js, Python, and frontend experience.',
      knowsAbout: ['Rust', 'Backend software engineering', 'Application security', 'TypeScript', 'Node.js', 'Python'],
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'Western Governors University' },
      sameAs: ['https://github.com/GreenJ84'],
    },
  };
  return <><script type="application/ld+json" nonce={nonce} dangerouslySetInnerHTML={{ __html: JSON.stringify(profile).replace(/</g, '\\u003c') }} /><main className={css.page}>
    <section className={css.hero} aria-labelledby="about-title">
      <div className={css.intro}>
        <p className={css.eyebrow}>About Jesse</p>
        <h1 id="about-title">Rust backend engineering, grounded in security.</h1>
        <p className={css.lead}>I’m a backend engineer in Washington State focused on Rust and secure systems. My full-stack and frontend experience helps me build the complete product, from service design to the interface people see.</p>
        <div className={css.actions}><Link className={css.primary} href="/projects">See my projects ↗</Link><Link className={css.secondary} href="/resumes">View resumes →</Link></div>
      </div>
      <div className={css.portrait}><DeveloperPortrait /><p>Originally from El Paso, TX; now at home in the Pacific Northwest.</p></div>
    </section>
    <section className={css.githubSection} aria-labelledby="github-title">
      <div><p className={css.eyebrow}>Open source &amp; experiments</p><h2 id="github-title">See the code behind the work.</h2><p>Browse the repositories, experiments, and implementation details that show how I approach engineering.</p></div>
      <a className={css.primary} href="https://github.com/GreenJ84" target="_blank" rel="noopener noreferrer">Explore my GitHub ↗</a>
    </section>
    <section className={css.section} aria-labelledby="strengths-title">
      <div className={css.sectionHeading}><p className={css.eyebrow}>How I work</p><h2 id="strengths-title">Thoughtful work, from idea to delivery.</h2></div>
      <div className={css.strengthGrid}>{strengths.map(item => <article key={item.title} className={css.card}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
    </section>
    <section className={css.path} aria-labelledby="path-title">
      <div className={css.sectionHeading}><p className={css.eyebrow}>My path</p><h2 id="path-title">Experience that informs the code.</h2><p>My route into software has combined formal study, hands-on projects, and years of working directly with people.</p></div>
      <ol className={css.timeline}>{milestones.map(item => <li key={item.title}><span>{item.date}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></li>)}</ol>
      <div className={css.pathLinks}><Link href="/education">Education and certifications →</Link><Link href="/work">Professional experience →</Link></div>
    </section>
    <section className={css.personal} aria-labelledby="personal-title">
      <div className={css.personalIntro}>
        <p className={css.eyebrow}>Away from the keyboard</p>
        <h2 id="personal-title">A little Texas grit. A lot of Pacific Northwest air.</h2>
        <p>El Paso shaped my curiosity and work ethic; Washington gives me room to recharge. I’m an Eagle Scout, a husband and dad, and happiest when I can share a day outside with my family.</p>
        <span className={css.route}>EL PASO, TX <span aria-hidden="true">↗</span> WASHINGTON STATE</span>
      </div>
      <div className={css.interests} aria-label="Things I enjoy outside work">
        <div><span aria-hidden="true">01</span><strong>Outside time</strong><p>Fresh air and open trails help me come back to a problem with a clearer head.</p></div>
        <div><span aria-hidden="true">02</span><strong>Basketball &amp; games</strong><p>I enjoy the mix of teamwork, friendly competition, and a good challenge.</p></div>
        <div><span aria-hidden="true">03</span><strong>Puzzles</strong><p>There’s something satisfying about staying curious until the pieces click.</p></div>
      </div>
    </section>
  </main><Footer /></>;
}

const title = 'About Jesse Greenough | Rust Backend & Security Engineer';
const description = 'Meet Jesse Greenough, a Rust-first backend engineer focused on security with full-stack TypeScript, Node.js, Python, and frontend experience.';
export const metadata = portfolioMetadata('/about', title, description);
