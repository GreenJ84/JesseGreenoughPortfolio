/** @format */

import React from "react";

import EduImage from "./EduImage";

const css = require("./EduBody.module.css");

const EduBody = () => {
  return (
    <div className={css.eduBody}>
      <h1>Basic Qualifications and Certifications</h1>
      <EduImage />
      <p>
        I activiely participate in tech-related activities and partake in
        courses to further my understanding and knowledge.
      </p>
    </div>
  );
};

export default EduBody;
