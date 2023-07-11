/** @format */

import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import axios from "axios";

import MetaHead from "../../components/Layout/MetaHead";
const WorkImg = dynamic(() => import("../../components/WorkPage/WorkImg"));
const WorkCard = dynamic(() => import("../../components/WorkPage/WorkCard"));

import {
  workCollectionService,
  workType,
} from "../../utils/services/workService";
import AddItemButton from "../../components/Layout/AddItemButton";

const css = require("../../components/WorkPage/WorkExp.module.css");

export interface WorkExp {
  workData: workType[];
  documentTotals: [number, number];
}

const WorkPage = ({ workData, documentTotals }: WorkExp) => {
  const [work, setWork] = useState(workData);
  const [showSecWork, setShowSecWork] = useState(false);
  const [workTotal, secWorkTotal] = documentTotals;

  useEffect(() => {
    async function switchWork() {
      if (!showSecWork) {
        setWork(workData);
      } else {
        const workRes = await axios.post("/api/work", {
          type: "secondary",
          offset: 0,
        });

        setWork(workRes.data);
      }
    }
    switchWork();
  }, [showSecWork, workData]);

  function checkMoreWork() {
    return (
      work.length % 5 === 0 &&
      work.length < (showSecWork ? secWorkTotal : workTotal)
    );
  }

  async function handleAddingWork() {
    let workRes: any;
    if (!showSecWork) {
      workRes = await axios.post("/api/work", {
        type: "primary",
        offset: work.length,
      });
    } else {
      workRes = await axios.post("/api/work", {
        type: "secondary",
        offset: work.length,
      });
    }
    setWork((work) => [...work, ...workRes.data]);
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
            className={!showSecWork ? css.activeFilter : css.inactiveFilter}
            onClick={() => {
              if (showSecWork) {
                setShowSecWork(!showSecWork);
              }
            }}
          >
            Work
          </button>
          <button
            className={showSecWork ? css.activeFilter : css.inactiveFilter}
            onClick={() => {
              if (!showSecWork) {
                setShowSecWork(!showSecWork);
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
          {work.map((item) => (
            <WorkCard
              key={item.position}
              work={item}
            />
          ))}
          {checkMoreWork() && <AddItemButton
            clickHandler={handleAddingWork}
            itemType={"Work"}
          />}
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
      documentTotals: await workService.getWorkTotals(),
    },
  };
};

export default WorkPage;
