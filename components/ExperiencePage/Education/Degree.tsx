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
    <article>
      <h2 className={css.title}> Degrees Recieved </h2>
      {props.educationData.map((exp) => (
        <section
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
        </section>
      ))}
    </article>
  );
};

export default Degree;
