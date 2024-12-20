/** @format */

import React from "react";
import dynamic from "next/dynamic";

import { Preloader } from "../_layout/LayoutExtras";
const Degree = dynamic(() => import("./_components/Degree"), {
  loading: () => <Preloader />,
});
const Certifications = dynamic(
  () => import("./_components/Certifications"),
  { loading: () => <Preloader /> }
);

import * as educationService from "./educationService";
import * as certificationService from "./certificationService";

const css = require("./_components/EduBody.module.css");

const Page = async () => {
  const [eduItems, eduTotal, certItems, certTotal, [issuerData, techData]] =
  await Promise.all([
    educationService.getEducationData(),
    educationService.getEducationCount(),
    certificationService.getTopCertifications(),
    certificationService.getCertificationCount(),
    certificationService.getCertificationFilterOptions(),
  ]);

  return (
    <>
      <main
        id="educationContainer"
        className={css.eduBody}
      >
        <p>
          I actively participate in tech-related activities and partake in
          courses to further my understanding and knowledge.
        </p>
        <h1 id="educationTitle">
          Educational Experience, Qualifications and Certifications
        </h1>
        <Degree
          educationData={{
            eduItems,
            total: eduTotal!,
          }}
        />
        <Certifications
          certificationData={{
            certItems,
            total: certTotal,
            issuerData,
            techData,
          }}
        />
      </main>
    </>
  );
};

export default Page;
