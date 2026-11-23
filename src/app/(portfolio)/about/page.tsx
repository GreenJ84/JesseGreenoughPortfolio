import Link from 'next/link';
import type { Metadata } from 'next';
import DeveloperPortrait from '../_shared/DeveloperPortrait';
import Footer from '../_layout/Footer/Footer';
import { APP_URL, OPEN_GRAPH, TWITTER_SHARE } from '../sharedMetadata';
import css from './_components/About.module.css';

const strengths = [
  { title: 'End-to-end engineering', text: 'I enjoy connecting a polished interface with the services and data that make it dependable.' },
  { title: 'People-first perspective', text: 'Years in customer success and team leadership shaped how I communicate, prioritize, and solve problems.' },
  { title: 'Continual learning', text: 'I keep building across TypeScript, Java, Rust, Python, and the tools that best fit the work.' },
];

const milestones = [
  { date: '2024', title: 'Software Engineering degree', text: 'Earned a Bachelor of Science in Software Engineering from Western Governors University.' },
  { date: '2022', title: 'Full stack bootcamp', text: 'Completed Coding Dojo’s web development bootcamp while continuing to build independent projects.' },
  { date: 'Before code', title: 'Leadership and service', text: 'Spent more than eight years in customer success and operations, including team leadership roles.' },
];

export default function AboutPage() {
  return <><main className={css.page}>
    <section className={css.hero} aria-labelledby="about-title">
      <div className={css.intro}>
        <p className={css.eyebrow}>About Jesse</p>
        <h1 id="about-title">A builder with a curious mind and a people-first perspective.</h1>
        <p className={css.lead}>I’m a full stack developer in Washington State. I bring together software engineering, customer empathy, and a habit of learning by building.</p>
        <div className={css.actions}><Link className={css.primary} href="/projects">See my projects ↗</Link><Link className={css.secondary} href="/resumes">View resumes →</Link></div>
      </div>
      <div className={css.portrait}><DeveloperPortrait /><p>Originally from El Paso, now at home in the Pacific Northwest.</p></div>
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
    <section className={css.personal} aria-labelledby="personal-title"><div><p className={css.eyebrow}>Away from the keyboard</p><h2 id="personal-title">Rooted in family and the outdoors.</h2><p>I’m an Eagle Scout, a husband and father, and someone who recharges through time outside, basketball, games, and puzzles. Those interests keep me curious and grounded in the people who use what I build.</p></div></section>
  </main><Footer /></>;
}

const title = 'About Jesse Greenough | Full Stack Developer';
const description = 'Meet Jesse Greenough, a full stack developer combining software engineering, team leadership, and a people-first approach.';
export const metadata: Metadata = {
  metadataBase: new URL(APP_URL), title, description,
  openGraph: { title, description, url: `${APP_URL}/about`, siteName: title, ...OPEN_GRAPH },
  twitter: { title, description, ...TWITTER_SHARE },
};
