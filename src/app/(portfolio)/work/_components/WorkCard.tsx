/** @format */

import React from "react";
import Image from "next/image";

import { ImPointRight } from "react-icons/im";

import { WorkType } from "@/app/_lib/_types.ts";
const css = require("./WorkExp.module.css");

interface WorkCard {
  work: WorkType;
}

const WorkCard = (props: WorkCard) => {
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
          <h2>{props.work.position}</h2>
          <p>{props.work.date}</p>
        </div>
        <div>
          <p>{props.work.company}</p>
          <p>{props.work.location}</p>
        </div>
        <ul>
          {props.work.details.map((item: string, idx: number) => (
            <li
              key={idx}
              className={css.details}
            >
              <ImPointRight /> {item}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default WorkCard;
