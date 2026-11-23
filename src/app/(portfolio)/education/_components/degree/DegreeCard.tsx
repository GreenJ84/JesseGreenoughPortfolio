/** @format */


import Image from 'next/image';

import { EducationDTO } from "@/app/_lib/_types";

import { formatEducationMonth } from "@/app/_lib/educationDates";

const css = require("./Degree.module.css");

interface DegreeCardProps {
  education: EducationDTO;
}

const DegreeCard = ({ education }: DegreeCardProps) => {
  return (
    <article className={css.cardContainer}>
      <div className={css.cardHead}>
        <Image src={education.image} width={72} height={72} alt="" className={css.image} />
        <div><p className={css.date}>{formatEducationMonth(education.start_date)} – {education.end_date ? formatEducationMonth(education.end_date) : 'Present'}</p>
        <h3>{education.title}</h3><p className={css.college}>{education.college}</p></div>
      </div>
      <div className={css.cardBody}>
        <ul>
          {education.details?.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
      {education.url && <a target="_blank" rel="noopener noreferrer" href={education.url} className={css.siteLink}>Visit institution ↗</a>}
    </article>
  );
};

export default DegreeCard;
