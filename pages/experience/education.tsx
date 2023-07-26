/** @format */

import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import React, { Suspense, useContext, useEffect } from "react";

import {
  certificationCollectionService,
  certificationType,
  educationCollectionService,
  educationType,
} from "../../utils/services/educationService";
import { AppContext, WindowWidth } from "../../utils/AppContext";

import { MetaHead, Preloader } from "../../components/Layout/LayoutExtras";
const Degree = dynamic(() => import("../../components/EducationPage/Degree"));
const Certifications = dynamic(
  () => import("../../components/EducationPage/Certifications")
);

const css = require("../../components/EducationPage/EduBody.module.css");

export interface Experience {
  educationData: {
    eduItems: educationType[];
    total: number;
  };
  certificationData: {
    certItems: certificationType[];
    total: number;
    issuerData: string;
    techData: string;
  };
}
const EducationPage = ({ educationData, certificationData }: Experience) => {
  const { windowWidth } = useContext(AppContext);

  // Education page title animations
  useEffect(() => {
    const eduTitle = document.getElementById("educationTitle")!;
    const eduSnippet: HTMLElement = document.querySelector(
      "#educationContainer > p:first-of-type"
    )!;
    const topDefault = eduTitle.getBoundingClientRect().top;
    const isSmall = windowWidth === WindowWidth.SMALL;

    const popupScroll = () => {
      if (window.scrollY > topDefault) {
        eduSnippet.style.transform = "scale(1)";
      } else {
        eduTitle.style.opacity = `${
          1.5 - (window.scrollY / topDefault) * 1.2 - (isSmall ? 0.6 : 0)
        }`;

        // Description animations
        eduSnippet.style.transform = `scale(${
          1 - window.scrollY / topDefault
        })`;
        eduSnippet.style.opacity = `${1 - (window.scrollY / topDefault) * 2}`;
      }
    };
    window.addEventListener("scroll", popupScroll);
    return () => {
      window.removeEventListener("scroll", popupScroll);
    };
  }, [windowWidth]);

  return (
    <>
      <MetaHead
        title="Educational experience attained by Jesse Greenough"
        description="View the Profession Educational and self-driven experience attained by Jesse Greenough"
        keywords="College,Bootcamp,Software,Developer,Engineer,Education,Experience,Certifications,Courses,Trainings"
      />
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
        <Suspense fallback={<Preloader />}>
          <Degree educationData={educationData} />
        </Suspense>

        <Suspense fallback={<Preloader />}>
          <Certifications certificationData={certificationData} />
        </Suspense>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Experience> = async () => {
  // Get all Education experience data
  const [[eduItems, eduTotal], [certItems, certTotal], [issuerData, techData]] =
    await Promise.all([
      educationCollectionService.getEducationData(),
      certificationCollectionService.getTopCertification(),
      certificationCollectionService.getCertificationFilterOptions(),
    ]);

  return {
    props: {
      educationData: { eduItems, total: eduTotal! },
      certificationData: {
        certItems,
        total: certTotal,
        issuerData,
        techData,
      },
    },
  };
};

export default EducationPage;
