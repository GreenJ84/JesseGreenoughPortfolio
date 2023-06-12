/** @format */

import React, { useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { MongoClient } from "mongodb";

import WorkCard from "../../components/WorkPage/WorkCard";
import MetaHead from "../../components/Layout/MetaHead";

import { workItem } from "../../Utils/dataTypes";
import WorkImg from "../../components/WorkPage/WorkImg";

const css = require("../../components/WorkPage/WorkExp.module.css");

export interface WorkExp {
  workData: workItem[];
  secondaryWorkData: workItem[];
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
        style={{ padding: "12rem 3vw 1rem", margin: "0 2vw" }}
      >
        <section id="workIntro">
          <h1 className={css.workBodyTitle}>Professional experience</h1>
          <div className={css.workBody}>
            <WorkImg />
            <p>
              I have over 5 years of customer success, operations management,
              and leadership experience with proven results in a variety of
              fast-paced environents.
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
  const client = new MongoClient(process.env.DB_CONN_STRING!);
  const db = client.db(process.env.DB_NAME);

  // Get all Primary work Experience
  const workData = db.collection(process.env.WORK_COLL!);
  const workResults = await workData.find().sort({ _id: -1 }).toArray();

  // Get all Secondary Volunteer Work
  const secWorkData = db.collection(process.env.SWORK_COLL!);
  const secWorkResults = await secWorkData.find().sort({ _id: -1 }).toArray();

  return {
    props: {
      workData: workResults.map((result) => ({
        company: result.company,
        logo: result.logo,
        position: result.position,
        location: result.location,
        date: result.date,
        details: result.details,
        id: result._id.toString(),
      })),

      secondaryWorkData: secWorkResults.map((result) => ({
        company: result.company,
        logo: result.logo,
        position: result.position,
        location: result.location,
        date: result.date,
        details: result.details,
        id: result._id.toString(),
      })),
    },
  };
};

export default WorkPage;
