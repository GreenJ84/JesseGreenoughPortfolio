/** @format */

import React, { useContext, useEffect } from "react";
import Image from "next/image";

import DegreeCard from "./DegreeCard";

import { educationType } from "../../Utils/dataTypes";
import { AppContext, WindowWidth } from "../../Utils/AppContext";
import EducationImg from "./EduImage";

const css = require("./Degree.module.css");

interface Education {
  educationData: educationType[];
}

const Degree = (props: Education) => {
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
      } 
      else {
        title.style.transform = `scale(${window.scrollY / locDefault + .4 + (isSmall ? .15 : 0)})`;
        title.style.opacity = `${window.scrollY / locDefault + .4}`;
      }
    };

    window.addEventListener("scroll", animateTitle);
    return () => {
      window.removeEventListener("scroll", animateTitle);
    };
  }, [windowWidth]);

  return (
    <section id="degreeContainer">
      <h2 className={css.title}>Degrees I Recieved</h2>
      <EducationImg />
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
    </section>
  );
};

export default Degree;
