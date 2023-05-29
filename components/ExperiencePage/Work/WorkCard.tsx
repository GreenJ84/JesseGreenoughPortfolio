/** @format */

import React from "react";
import Image from "next/image";

import { ImPointRight } from "react-icons/im";

import { workItem } from "../../../Utils/dataTypes";
const css = require("./WorkCard.module.css");

interface workCard {
  work: workItem;
}

const WorkCard = (props: workCard) => {
  return (
    <section className={css.workCard}>
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
        {props.work.details.map((item, idx) => (
          <p
            key={idx}
            className={css.details}
          >
            {" "}
            <ImPointRight /> {item}{" "}
          </p>
        ))}
      </div>
    </section>
  );
};

export default WorkCard;
