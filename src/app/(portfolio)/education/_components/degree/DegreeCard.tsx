/** @format */


import { HiOutlineExternalLink } from "react-icons/hi";

import { EducationDTO } from "@/app/_lib/_types";

import { formatEducationMonth } from "@/app/_lib/educationDates";

const css = require("./Degree.module.css");

interface DegreeCardProps {
  education: EducationDTO;
}

const DegreeCard = (props: DegreeCardProps) => {
  return (
    <article className={css.cardContainer}>
      <div className={css.cardHead}>
        <h3>{props.education.college}</h3>
        <p>
          {formatEducationMonth(props.education.start_date)} -{" "}
          {props.education.end_date ? formatEducationMonth(props.education.end_date) : "Present"}
        </p>
        <p>{props.education.title}</p>
      </div>
      <div className={css.cardBody}>
        <ul>
          {props.education.details?.map((item, idx) => (
            <li key={idx}> ☞ {item} </li>
          ))}
        </ul>
      </div>
      <a
        target="blank"
        href={props.education.url}
        className={css.siteLink}
      >
        Visit Site <HiOutlineExternalLink />
      </a>
    </article>
  );
};

export default DegreeCard;
