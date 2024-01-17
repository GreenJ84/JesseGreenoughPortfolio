/** @format */

import React from "react";

import { HiOutlineExternalLink } from "react-icons/hi";

import { educationType } from "../../utils/services/educationService";

const css = require("./Degree.module.css");

interface degreeCard {
  education: educationType;
}

const DegreeCard = (props: degreeCard) => {
  return (
    <article className={css.cardContainer}>
      <div className={css.cardHead}>
        <h3>{props.education.college}</h3>
        <p>{props.education.date}</p>
        <p>{props.education.degree}</p>
      </div>
      <div className={css.cardBody}>
        <ul>
          {props.education.description.map((item, idx) => (
            <li key={idx}> ☞ {item} </li>
          ))}
        </ul>
      </div>
      <a
        target="blank"
        href={props.education.website}
        className={css.siteLink}
      >
        Visit Site <HiOutlineExternalLink />
      </a>
    </article>
  );
};

export default DegreeCard;
