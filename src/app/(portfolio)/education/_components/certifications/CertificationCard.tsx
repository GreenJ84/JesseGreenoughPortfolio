import Image from 'next/image';
import type { CertificationType } from '@/app/_lib/_types';
import css from './Certifications.module.css';

export default function CertificationCard({ certificate }: { certificate: CertificationType }) {
  return <li className={css.certCard}><article>
    <div className={css.certHead}><Image src={certificate.image} alt="" width={72} height={72} className={css.certImage} /><div><p className={css.issuer}>{certificate.issuer}</p><h4>{certificate.title}</h4></div></div>
    <p className={css.description}>{certificate.description}</p>
    {certificate.techs.length > 0 && <ul className={css.techs}>{certificate.techs.slice(0, 5).map(tech => <li key={tech}>{tech}</li>)}</ul>}
    {certificate.url && <a className={css.certLink} href={certificate.url} target="_blank" rel="noopener noreferrer">View credential ↗</a>}
  </article></li>;
}
