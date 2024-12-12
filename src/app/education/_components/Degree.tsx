/** @format */
"use client";

import React from "react";
import dynamic from "next/dynamic";

import Image from "next/image";
import EducationImg from "./EduImage";
import DegreeCard from "./DegreeCard";
const AddItemButton = dynamic(() =>
import("../../../components/Layout/LayoutExtras").then((mod) => mod.AddItemButton)
);

import { educationType } from "../educationService";

const css = require("./Degree.module.css");

interface Education {
  educationData: {
    eduItems: educationType[];
    total: number;
  };
}

const Degree = ({ educationData }: Education) => {
  const { eduItems, total } = educationData;

  const [education, setEducation] = React.useState<educationType[]>(eduItems);

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
      <h2 className={css.title}>Degrees I Received</h2>
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
        <AddItemButton
          clickHandler={handleAddingEdu}
          itemType="Education"
        />
      )}
    </section>
  );
};

export default Degree;
