/** @format */

import React, { useState } from "react";
import { GetServerSideProps } from "next";

import MetaHead from "../../components/Layout/MetaHead";
import WorkCard from "../../components/WorkPage/WorkCard";

import { secWorkDatabase, workDatabase, workType } from "../../utils/dataTypes";
import WorkImg from "../../components/WorkPage/WorkImg";

const css = require("../../components/WorkPage/WorkExp.module.css");

export interface WorkExp {
  workData: workType[];
  secondaryWorkData: workType[];
}

const WorkPage = (props: WorkExp) => {
  const [showWork, setShowWork] = useState(true);

  const filterHandler = () => {
    if (showWork) {
      setShowWork(false);
    } else {
      setShowWork(true);
    }
  };

  return (
    <>
      <MetaHead
        title="Lifetime Work Experience for Jesse Greenough"
        description="View the Work experience attained by Jesse Greenough of his life"
        keywords="Work,Experience,Management,Software,Development,Engineering,Retail"
      />
      <main
        id="workContainer"
        style={{ padding: "min(12vw, 12vh) 3vw 1rem", margin: "0 2vw" }}
      >
        <section id="workIntro">
          <h1 className={css.workBodyTitle}>Professional Experience</h1>
          <div className={css.workBody}>
            <WorkImg />
            <p>
              I have over 5 years of customer success, operations management,
              and leadership experience with proven results in a variety of
              fast-paced environents coupled with over 3 years of development
              experience across numerous technologies.
            </p>
          </div>
        </section>
        <nav
          id="workToggle"
          className={css.workFilter}
        >
          <button
            className={showWork ? css.activeFilter : css.inactiveFilter}
            onClick={() => {
              if (!showWork) {
                filterHandler();
              }
            }}
          >
            Work
          </button>
          <button
            className={showWork ? css.inactiveFilter : css.activeFilter}
            onClick={() => {
              if (showWork) {
                filterHandler();
              }
            }}
          >
            Internship / Volunteer
          </button>
        </nav>
        <ul
          id="workList"
          className={css.workCardHolder}
        >
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
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<WorkExp> = async () => {
  const workResults = await workDatabase.find().sort({ _id: -1 }).toArray();

  const secWorkResults = await secWorkDatabase.find().sort({ _id: -1 }).toArray();

  return {
    props: {
      workData: workResults.map((result) => ({
        id: result._id.toString(),
        company: result.company,
        logo: result.logo,
        position: result.position,
        location: result.location,
        date: result.date,
        details: result.details,
      })),

      secondaryWorkData: secWorkResults.map((result) => ({
        id: result._id.toString(),
        company: result.company,
        logo: result.logo,
        position: result.position,
        location: result.location,
        date: result.date,
        details: result.details,
      })),
    },
  };
};

export default WorkPage;
