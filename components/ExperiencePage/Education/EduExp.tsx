/** @format */

import React from "react";

import Certifications from "./Certifications";
import Degree from "./Degree";
import EduBody from "./EduBody";

import { certificationType } from "../../../Utils/data/CertificationData";
import { educationType } from "../../../Utils/data/EducationData";

const bodyStyle = {
  backgroundColor: "var(--background2)",
  padding: "0 2.5vw 6rem",
};

interface Education {
  educationData: educationType[];
  certificationData: certificationType[];
}

const EduExp = (props: Education) => {
  return (
    <div style={bodyStyle}>
      <EduBody />
      <Degree educationData={props.educationData} />
      <Certifications certificationData={props.certificationData} />
    </div>
  );
};

export default EduExp;
