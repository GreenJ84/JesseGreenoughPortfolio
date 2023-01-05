/** @format */

import { MongoClient } from "mongodb";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { Container } from "react-bootstrap";

import EduExp from "../../components/ExperiencePage/Education/EduExp";
import ExpNavbar from "../../components/ExperiencePage/ExpNavbar";
import WorkExp from "../../components/ExperiencePage/Work/WorkExp";

import { certificationType } from "../../Utils/data/CertificationData";
import { educationType } from "../../Utils/data/EducationData";
import { workItem } from "../../Utils/data/WorkData";
export interface Experience {
  educationData: educationType[];
  certificationData: certificationType[];
  workData: workItem[];
  secondaryWorkData: workItem[];
}

const ExperiencePage = (props: Experience) => {
  const [showWork, setShowWork] = useState(false);

  const changeActive = () => {
    if (showWork) {
      setShowWork(false);
    } else {
      setShowWork(true);
    }
  };

  return (
    <Container style={{ padding: "12rem 3vw 1rem", margin: "0 2vw" }}>
      <ExpNavbar
        changeActive={changeActive}
        workActive={showWork}
      />
      <div>
        {showWork ? (
          <WorkExp
            workData={props.workData}
            secondaryWorkData={props.secondaryWorkData}
          />
        ) : (
          <EduExp
            educationData={props.educationData}
            certificationData={props.certificationData}
          />
        )}
      </div>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<Experience> = async () => {
  const client = new MongoClient(process.env.DB_CONN_STRING!);
  const db = client.db(process.env.DB_NAME);

  const educationData = db.collection(process.env.DEG_COLL!);
  const cetificationData = db.collection(process.env.CERT_COLL!);
  const workData = db.collection(process.env.WORK_COLL!);
  const secWorkData = db.collection(process.env.SWORK_COLL!);

  const eduResults = await educationData.find().sort({ _id: -1 }).toArray();
  const certResults = await cetificationData
    .find()
    .sort({ priority: 1, date: 1, issuer: 1, _id: -1 })
    .toArray();
  const workResults = await workData.find().sort({ _id: -1 }).toArray();
  const secWorkResults = await secWorkData.find().sort({ _id: -1 }).toArray();

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

export default ExperiencePage;
