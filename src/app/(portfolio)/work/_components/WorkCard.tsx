import Image from 'next/image';
import type { Work } from '@/app/_lib/_types';
import { formatWorkPeriod } from '@/app/_lib/portfolioDates';
import css from './WorkExp.module.css';

export default function WorkCard({ work }: { work: Work }) {
  return <li className={css.workCard}><article>
    <div className={css.cardHead}>
      {work.image_url && <Image src={work.image_url} width={64} height={64} alt="" className={css.workImage} />}
      <div><p className={css.company}>{work.brief}</p><h2>{work.title}</h2><p className={css.meta}>{formatWorkPeriod(`${work.start_date}..${work.end_date || 'present'}`)}{work.location ? ` · ${work.location}` : ''}</p></div>
    </div>
    {work.details.length > 0 && <ul className={css.details}>{work.details.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}</ul>}
  </article></li>;
}
