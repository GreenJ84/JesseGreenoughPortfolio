"use client";

import axios from "axios";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { workType } from "./workService";

const WorkImg = dynamic(() => import("./_components/WorkImg"));
const WorkCard = dynamic(() => import("./_components/WorkCard"));
const AddItemsButton = dynamic(() => import("../_shared/AddItemsButton"));

const css = require("./_components/WorkExp.module.css");

export interface WorkExp {
  workData: workType[];
  documentTotals: [number, number];
}
const WorkClient = ({ workData, documentTotals }: WorkExp) => {
  const [work, setWork] = useState(workData);
  const [showSecWork, setShowSecWork] = useState(false);
  const [workTotal, secWorkTotal] = documentTotals;

  useEffect(() => {
    async function switchWork() {
      if (!showSecWork) {
        setWork(workData);
      } else {
        const workRes = await axios.get("/api/work?type=secondary&offset=0");

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
      workRes = await axios.get(`/api/work?type=primary&offset=${work.length}`);
    } else {
      workRes = await axios.get(
        `/api/work?type=secondary&offset=${work.length}`
      );
    }
    setWork((work) => [...work, ...workRes.data]);
  }

  return (
    <>
      <section id="workIntro">
        <h1 className={css.workBodyTitle}>Professional Experience</h1>
        <div className={css.workBody}>
          <WorkImg />
          <p>
            I have over 8 years of customer success
            and leadership experience with proven results in a variety of
            fast-paced environments coupled with over 3 years of development
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
        {checkMoreWork() && (
          <AddItemsButton
            clickHandler={handleAddingWork}
            itemType={"Work"}
          />
        )}
      </ul>
    </>
  )
}

export default WorkClient;