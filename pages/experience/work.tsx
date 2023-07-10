/** @format */

import React, { useState } from "react";
import { GetServerSideProps } from "next";
import axios from "axios";

import MetaHead from "../../components/Layout/MetaHead";
import WorkCard from "../../components/WorkPage/WorkCard";
import WorkImg from "../../components/WorkPage/WorkImg";

import { workCollectionService, workType } from "../../utils/dataTypes";

const css = require("../../components/WorkPage/WorkExp.module.css");

export interface WorkExp {
  workData: workType[];
  secondaryWorkData: workType[];
  documentTotals: [number, number];
}

const WorkPage = ({workData, secondaryWorkData, documentTotals}: WorkExp) => {
  const [work, setWork] = useState(workData);
  const [secWork, setSecWork] = useState(secondaryWorkData);
  const [workTotal, secWorkTotal] = documentTotals;

  // Work vs Volunteer data boolean
  const [showWork, setShowWork] = useState(true);
  const filterHandler = () => {
    if (showWork) {
      setShowWork(false);
    } else {
      setShowWork(true);
    }
  };

  function checkMoreWork() {
    if (showWork) { 
      return work.length % 5 === 0 &&work.length < workTotal;
    } else {
      return secWork.length % 5 === 0 && secWork.length < secWorkTotal;
    }
  }

  async function handleAddingWork() {
    if (showWork) {
      const workRes = await axios.post("/api/work", {
        type: "primary",
        offset: work.length,
      });
      setWork(work => [...work, ...workRes.data]);
    } else {
      const workRes = await axios.post("/api/work", {
        type: "secondary",
        offset: secWork.length,
      });
      setSecWork(secWork => [...secWork, ...workRes.data]);
    }
  }

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
            ? work.map((item) => (
                <WorkCard
                  key={item.position}
                  work={item}
                />
              ))
            : secWork.map((item) => (
                <WorkCard
                  key={item.position}
                  work={item}
                />
              ))}
        {checkMoreWork() && <button
          onClick={handleAddingWork}> + </button>}
        </ul>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<WorkExp> = async () => {
  const workService = new workCollectionService();

  return {
    props: {
      workData: await workService.getPrimaryWork(),
      secondaryWorkData: await workService.getSecondaryWork(),
      documentTotals: await workService.getWorkTotals()
    },
  };
};

export default WorkPage;
