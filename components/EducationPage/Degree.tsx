/** @format */

import React, { useContext, useEffect } from "react";
import Image from "next/image";

import DegreeCard from "./DegreeCard";

import { educationType } from "../../utils/services/educationService";
import { AppContext, WindowWidth } from "../../utils/AppContext";
import EducationImg from "./EduImage";
import axios from "axios";
import AddItemButton from "../Layout/AddItemButton";

const css = require("./Degree.module.css");

interface Education {
  educationData: { eduItems: educationType[]; total: number };
}

const Degree = ({ educationData }: Education) => {
  const { eduItems, total } = educationData;

  const [education, setEducation] = React.useState(eduItems);
  const { windowWidth } = useContext(AppContext);

  useEffect(() => {
    const title: HTMLElement = document.querySelector("#degreeContainer > h2")!;
    const locDefault = title.getBoundingClientRect().bottom;
    const isSmall = windowWidth === WindowWidth.SMALL;

    const animateTitle = () => {
      if (window.scrollY > locDefault) {
        title.style.transform = `scale(1)`;
      } else if (window.scrollY < 10) {
        title.style.opacity = "0";
      } else {
        title.style.transform = `scale(${
          window.scrollY / locDefault + 0.4 + (isSmall ? 0.15 : 0)
        })`;
        title.style.opacity = `${window.scrollY / locDefault + 0.4}`;
      }
    };

    window.addEventListener("scroll", animateTitle);
    return () => {
      window.removeEventListener("scroll", animateTitle);
    };
  }, [windowWidth]);

  async function handleAddingEdu(e: React.MouseEvent) {
    e.preventDefault();
    console.log("Handling");
    const response = await axios.post("/api/education", {
      offset: 0,
    });
    setEducation((education) => [...education, ...response.data]);
  }

  return (
    <section id="degreeContainer">
      <h2 className={css.title}>Degrees I Recieved</h2>
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
