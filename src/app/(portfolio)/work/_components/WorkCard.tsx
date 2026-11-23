import Image from 'next/image';
import type { WorkType } from '@/app/_lib/_types';
import css from './WorkExp.module.css';

export default function WorkCard({ work }: { work: WorkType }) {
  return <li className={css.workCard}><article>
    <div className={css.cardHead}>
      <Image src={work.logo} width={64} height={64} alt="" className={css.workImage} />
      <div><p className={css.company}>{work.company}</p><h2>{work.position}</h2><p className={css.meta}>{work.date}{work.location ? ` · ${work.location}` : ''}</p></div>
    </div>
    {work.details.length > 0 && <ul className={css.details}>{work.details.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}</ul>}
  </article></li>;
}
