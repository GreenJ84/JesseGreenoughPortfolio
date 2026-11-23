import Image from 'next/image';
import css from './Shared.module.css';

const portrait = 'https://res.cloudinary.com/portfolio-g84/image/upload/v1690310921/personal/personal_portrait.jpg';

export default function DeveloperPortrait() {
  return <div className={css.portraitFrame}>
    <Image src={portrait} alt="Jesse Greenough" className={css.developerPortrait} width={520} height={520} sizes="(max-width: 800px) 240px, 360px" preload />
  </div>;
}
