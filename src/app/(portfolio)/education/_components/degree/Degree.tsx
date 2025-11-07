/** @format */
"use client";

import React from "react";
import dynamic from "next/dynamic";

import Image from "next/image";
import EducationImg from "./EduImage";
import DegreeCard from "./DegreeCard";
const AddItemsButton = dynamic(() =>
import("../../../_shared/AddItemsButton")
);

import { EducationType } from "@/app/_lib/_types";

const css = require("./Degree.module.css");

interface Education {
  educationData: {
    eduItems: EducationType[];
    total: number;
  };
}

const Degree = ({ educationData }: Education) => {
  const { eduItems, total } = educationData;

  const [education, setEducation] = React.useState<EducationType[]>(eduItems);

  async function handleAddingEdu(e: React.MouseEvent) {
    e.preventDefault();
    const response = await fetch(
      `/api/education?offset=${education.length}`
    );
    const responseData = await response.json();
    setEducation((education) => [...education, ...responseData]);
  }

  return (
    <section id="degreeContainer">
      <EducationImg />
      <ul
        id="degreeList"
        style={{ all: "unset" }}
      >
        {education.map((exp, idx) => (
          <li
            key={idx}
            className={css.degrees}
          >
            <a href={exp.website}>
              <Image
                src={exp.icon}
                width={200}
                height={200}
                alt={`${exp.college} icon`}
                className={css.image}
                loading="lazy"
              />
            </a>
            <DegreeCard education={exp} />
          </li>
        ))}
      </ul>
      {education.length % 5 === 0 && education.length < total && (
        <AddItemsButton
          clickHandler={handleAddingEdu}
          itemType="Education"
        />
      )}
    </section>
  );
};

export default Degree;
