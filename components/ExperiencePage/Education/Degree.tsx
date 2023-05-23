/** @format */

import React from "react";
import Image from "next/image";

import DegreeCard from "./DegreeCard";

import { educationType } from "../../../Utils/data/EducationData";

const css = require("./Degree.module.css");

interface Education {
  educationData: educationType[];
}

const Degree = (props: Education) => {
  return (
    <>
      <h1 className={css.title}> Degrees Recieved </h1>
      {props.educationData.map((exp) => (
        <div
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
        </div>
      ))}
    </>
  );
};

export default Degree;
