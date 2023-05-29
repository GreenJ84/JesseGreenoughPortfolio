/** @format */

import React, { useState } from "react";

import WorkBody from "./WorkBody";
import WorkCard from "./WorkCard";

import { workItem } from "../../../Utils/dataTypes";
import { ServerDescription } from "mongodb";

const css = require("./WorkExp.module.css");

interface Work {
  workData: workItem[];
  secondaryWorkData: workItem[];
}

const WorkExp = (props: Work) => {
  const [showWork, setShowWork] = useState(true);

  const filterHandler = () => {
    if (showWork) {
      setShowWork(false);
    } else {
      setShowWork(true);
    }
  };

  return (
    <section id="workContainer">
      <WorkBody />
      <nav id="workToggle" className={css.workFilter}>
        <button
          className={showWork ? css.activeFilter : ""}
          onClick={() => {
            if (!showWork) {
              filterHandler();
            }
          }}
        >
          Work
        </button>
        <button
          className={showWork ? "" : css.activeFilter}
          onClick={() => {
            if (showWork) {
              filterHandler();
            }
          }}
        >
          Internship/ Volunteer
        </button>
      </nav>
      <ul id="workList" className={css.workCardHolder}>
        {showWork
          ? props.workData.map((item) => (
              <WorkCard
                key={item.position}
                work={item}
              />
            ))
          : props.secondaryWorkData.map((item) => (
              <WorkCard
                key={item.position}
                work={item}
              />
            ))}
      </ul>
    </section>
  );
};

export default WorkExp;
