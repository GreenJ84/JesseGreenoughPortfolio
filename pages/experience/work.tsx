/** @format */

import React, { useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { MongoClient } from "mongodb";

import WorkBody from "../../components/WorkPage/WorkBody";
import WorkCard from "../../components/WorkPage/WorkCard";

import { workItem } from "../../Utils/dataTypes";

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
      <Head>
        <title>Work Experience for Jesse Greenough</title>
        <meta
          property="og:title"
          content="Work Experience for Jesse Greenough"
        />
        <meta
          name="description"
          content="View the Work experience attained by Jesse Greenough"
          key="desc"
        />
        <meta
          property="og:description"
          content="View the Work experience attained by Jesse Greenough"
        />
        <meta
          name="keywords"
          content="Software, Developer, Engineer, Work, Experience"
        ></meta>
      </Head>
      <main
        id="workContainer"
        style={{ padding: "12rem 3vw 1rem", margin: "0 2vw" }}
      >
        <WorkBody />
        <nav
          id="workToggle"
          className={css.workFilter}
        >
          <button
            className={showWork ? css.activeFilter : ""}
            onClick={() => {
              if (!showWork) {
                filterHandler();
              }
            }}
          >
            Work
          </button>
          <button
            className={showWork ? "" : css.activeFilter}
            onClick={() => {
              if (showWork) {
                filterHandler();
              }
            }}
          >
            Internship/ Volunteer
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

export const getServerSideProps: GetServerSideProps<Experience> = async () => {
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
