import Image from 'next/image';
import css from './Shared.module.css';
import portrait from '../portrait.json';

export default function DeveloperPortrait() {
  return <div className={css.portraitFrame}>
    <Image src={portrait.url} alt="Jesse Greenough" className={css.developerPortrait} width={520} height={520} sizes="(max-width: 800px) 240px, 360px" preload />
  </div>;
}
