/** @format */

import React, { useContext, useEffect } from "react";
import { GetServerSideProps } from "next";

import {
  certificationCollectionService,
  certificationType,
  educationDatabase,
  educationType,
} from "../../utils/dataTypes";
import { AppContext, WindowWidth } from "../../utils/AppContext";

import MetaHead from "../../components/Layout/MetaHead";
import Degree from "../../components/EducationPage/Degree";
import Certifications from "../../components/EducationPage/Certifications";

export interface Experience {
  educationData: educationType[];
  certificationData: {
    certItems: certificationType[];
    total: number;
    issuerData: string;
    techData: string;
  }
}

const css = require("../../components/EducationPage/EduBody.module.css");

const EducationPage = ({
  educationData,
  certificationData
}: Experience) => {
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
        <Degree educationData={educationData} />
        <Certifications certificationData={certificationData} />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Experience> = async () => {
  // Get all Education experience data
  const eduResults = await educationDatabase.find().sort({ _id: -1 }).toArray();

  const [certifications, total] = await certificationCollectionService.getTopCertification();
  const [issuers, techs] = await certificationCollectionService.getCertificationFilterOptions();


  return {
    props: {
      educationData: eduResults.map((result) => ({
        id: result._id.toString(),
        college: result.college,
        degree: result.degree,
        date: result.date,
        description: result.description,
        icon: result.icon,
        website: result.website,
      })),
      certificationData: {
        certItems: certifications,
        total,
        issuerData: issuers,
        techData: techs,
      }
    },
  };
};

export default EducationPage;
