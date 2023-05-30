/** @format */

import React from "react";
import Image from "next/image";

import DegreeCard from "./DegreeCard";

import { educationType } from "../../../Utils/dataTypes";

const css = require("./Degree.module.css");

interface Education {
  educationData: educationType[];
}

const Degree = (props: Education) => {
  return (
    <article id="degreeContainer">
      <h2 className={css.title}>Degrees Recieved</h2>
      <ul
        id="degreeList"
        style={{ all: "unset" }}
      >
        {props.educationData.map((exp) => (
          <li
            key={exp.college}
            className={css.degrees}
          >
            <a href={exp.website}>
              <Image
                src={exp.icon}
                width={200}
                height={200}
                alt={`${exp.college} icon`}
                className={css.image}
              />
            </a>
            <DegreeCard education={exp} />
          </li>
        ))}
      </ul>
    </article>
  );
};

export default Degree;
