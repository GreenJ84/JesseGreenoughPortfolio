/** @format */

import React from "react";
import Image from "next/image";

import { ImPointRight } from "react-icons/im";

import { workType } from "../../Utils/dataTypes";
const css = require("./WorkCard.module.css");

interface workCard {
  work: workType;
}

const WorkCard = (props: workCard) => {
  return (
    <li className={css.workCard}>
      <div className={css.workImageHolder}>
        <Image
          src={props.work.logo}
          width={200}
          height={200}
          className={css.workImage}
          alt={props.work.company}
        />
      </div>
      <div className={css.workCardBody}>
        <div>
          <h2>{props.work.position }</h2>
          <p>{props.work.date}</p>
        </div>
        <div>
          <p>{props.work.company}</p>
          <p>{props.work.location}</p>
        </div>
        <ul>
        {props.work.details.map((item, idx) => (
          <li
            key={idx}
            className={css.details}
          >
            {" "}
            <ImPointRight /> {item}{" "}
          </li>
        ))}
        </ul>
      </div>
    </li>
  );
};

export default WorkCard;
