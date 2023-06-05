/** @format */

import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { MongoClient } from "mongodb";

import { certificationType, educationType } from "../../Utils/dataTypes";

import EduBody from "../../Components/EducationPage/EduBody";
import Degree from "../../Components/EducationPage/Degree";
import Certifications from "../../Components/EducationPage/Certifications";

export interface Experience {
  educationData: educationType[];
  certificationData: certificationType[];
}

const EducationPage = (props: Experience) => {
  const bodyStyle = {
    backgroundColor: "var(--background2)",
    padding: "0 2.5vw 6rem",
  };

  return (
    <>
      <Head>
        <title>Educational Experience for Jesse Greenough</title>
        <meta
          property="og:title"
          content="Educational Experience for Jesse Greenough"
        />
        <meta
          name="description"
          content="View the Educational experience attained by Jesse Greenough"
          key="desc"
        />
        <meta
          property="og:description"
          content="View the Educational experience attained by Jesse Greenough"
        />
        <meta
          name="keywords"
          content="Software, Developer, Engineer, Education, Work, Experience"
        ></meta>
      </Head>
      <main
        id="educationContainer"
        style={{ padding: "12rem 3vw 1rem", margin: "0 2vw" }}
      >
        <EduBody />
        <Degree educationData={props.educationData} />
        <Certifications certificationData={props.certificationData} />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Experience> = async () => {
  const client = new MongoClient(process.env.DB_CONN_STRING!);
  const db = client.db(process.env.DB_NAME);

  // Get all Education experience data
  const educationData = db.collection(process.env.DEG_COLL!);
  const eduResults = await educationData.find().sort({ _id: -1 }).toArray();

  // Get all Certifications achieved
  const cetificationData = db.collection(process.env.CERT_COLL!);
  const certResults = await cetificationData
    .find()
    .sort({ priority: 1, date: 1, issuer: 1, _id: -1 })
    .toArray();

  return {
    props: {
      educationData: eduResults.map((result) => ({
        college: result.college,
        degree: result.degree,
        date: result.date,
        description: result.description,
        icon: result.icon,
        website: result.website,
        id: result._id.toString(),
      })),

      certificationData: certResults.map((result) => ({
        title: result.title,
        issuer: result.issuer,
        date: result.date,
        url: result.url,
        description: result.description,
        image: result.image,
        id: result._id.toString(),
      })),
    },
  };
};

export default EducationPage;
