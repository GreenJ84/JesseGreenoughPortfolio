import Image from 'next/image';
import Link from 'next/link';
import css from './Home.module.css';

export default function AboutPreview() {
  return <section className={css.developerIntro} aria-labelledby="about-preview-title">
    <div className={css.aboutCopy}>
      <p className={css.eyebrow}>A little about me</p>
      <h2 id="about-preview-title">Curiosity that turns into useful products.</h2>
      <p>I’m a Texas-born Eagle Scout living in Washington State. My path from web development to software engineering and a master’s in cybersecurity shaped how I build: start with sound systems, then make them approachable.</p>
      <p>Rust and backend security are my focus. TypeScript, Node.js, Python, and frontend work help me carry an idea through to a useful product.</p>
      <Link href="/about" className={css.textAction}>Read my story <span aria-hidden="true">→</span></Link>
    </div>
    <div className={css.avatarWrap}><Image src="/assets/pages/home/user_avatar.svg" alt="Illustration of a developer at work" width={400} height={400} className={css.myAvatarImage} unoptimized /></div>
  </section>;
}
