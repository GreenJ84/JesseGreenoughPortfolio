/** @format */

import React from "react";

import WorkImg from "./WorkImg";

const css = require("./WorkBody.module.css");

const WorkBody = () => {
  return (
    <section id="workIntro">
      <h1 className={css.workBodyTitle}>Professional experience</h1>
      <div className={css.workBody}>
        <WorkImg />
        <p>
          I have over 5 years of customer success, operations management, and leadership
          experience with proven results
          in a variety of fast-paced environents.
        </p>
      </div>
    </section>
  );
};

export default WorkBody;
