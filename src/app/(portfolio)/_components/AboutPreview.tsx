import Image from 'next/image';
import Link from 'next/link';
import css from './Home.module.css';

export default function AboutPreview() {
  return <section className={css.developerIntro} aria-labelledby="about-preview-title">
    <div className={css.aboutCopy}>
      <p className={css.eyebrow}>A little about me</p>
      <h2 id="about-preview-title">Curiosity that turns into useful products.</h2>
      <p>I’m a Texas-born Eagle Scout living in Washington State. A long-standing love of learning led me from side projects to the Coding Dojo Web Development Bootcamp in 2022, and into full stack development.</p>
      <p>I enjoy making complex ideas feel simple: clear interfaces, reliable services, and software that helps people do meaningful work.</p>
      <Link href="/about" className={css.textAction}>Read my story <span aria-hidden="true">→</span></Link>
    </div>
    <div className={css.avatarWrap}><Image src="/assets/pages/home/user_avatar.svg" alt="Illustration of a developer at work" width={400} height={400} className={css.myAvatarImage} unoptimized /></div>
  </section>;
}
