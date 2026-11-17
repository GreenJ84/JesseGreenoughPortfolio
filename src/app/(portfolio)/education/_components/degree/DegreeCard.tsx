/** @format */

import React from "react";

import { HiOutlineExternalLink } from "react-icons/hi";

import { EducationType } from "@/app/_lib/_types";

const css = require("./Degree.module.css");

interface DegreeCardProps {
  education: EducationType;
}

const formatMonthYear = (d?: Date | string | null) => {
  if (!d) return "Present";
  const dateObj = d instanceof Date ? d : new Date(d);
  if (isNaN(dateObj.getTime())) return String(d);
  return dateObj.toLocaleDateString(undefined, { month: "short", year: "numeric" });
};
  
const DegreeCard = (props: DegreeCardProps) => {
  return (
    <article className={css.cardContainer}>
      <div className={css.cardHead}>
        <h3>{props.education.college}</h3>
        <p>
          {formatMonthYear(props.education.start_date)} -{" "}
          {props.education.end_date ? formatMonthYear(props.education.end_date) : "Present"}
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
