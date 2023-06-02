/** @format */

import React from "react";
import EducationImg from "./EduImage";

const css = require("./EduBody.module.css");

const EduBody = () => {
  return (
    <section id="educationIntro" className={css.eduBody}>
      <h1>Basic Qualifications and Certifications</h1>
      <EducationImg />
      <p>
        I actively participate in tech-related activities and partake in
        courses to further my understanding and knowledge.
      </p>
    </section>
  );
};

export default EduBody;
