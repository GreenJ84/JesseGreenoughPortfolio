/** @format */

import React, { useState } from "react";

import CertificationCard from "./CertificationCard";

import { certificationType } from "../../../Utils/data/CertificationData";
import CertificationsFilter from "./CertificationsFilter";
const css = require("./Certifications.module.css");

interface Certification {
  certificationData: certificationType[];
}

const Certifications = (props: Certification) => {
  const [certData, setCertData] = useState(props.certificationData.slice(0, 10));
  const [fresh, setFresh] = useState(true);
  const [all, setAll] = useState(false);

  let issuers = new Set<string>();
  let techs = new Set<string>();
  props.certificationData.forEach((cert) => {
    issuers.add(cert.issuer);
    cert.tech?.map((item) => techs.add(item));
  }
  );

  const issueHandler = (category: string) => {
    if (category === "top") {
      setCertData(props.certificationData.slice(0, 10));
      setFresh(true);
    } else if (category === "all") {
      setCertData(props.certificationData);
      setAll(true);
    } else {
      const newArray = props.certificationData.filter((cert) =>
        cert.issuer.includes(category)
      );
      setCertData(newArray);
      setFresh(false);
    }
  };
  const techHandler = (category: string) => {
    if (category === "top") {
      setCertData(props.certificationData.slice(0, 10));
      setFresh(true);
    } else if (category === "all") {
      setCertData(props.certificationData);
      setAll(true);
    } else {
      const newArray = props.certificationData.filter((cert) =>
        cert.tech?.includes(category)
      );
      setCertData(newArray);
      setFresh(false);
    }
  };

  return (
    <>
      <h1 className={css.certTitle}> Certifications Achieved </h1>
      <CertificationsFilter
        issuerHandler={issueHandler}
        techHandler={techHandler}
        options={[issuers, techs]}
      />
      {fresh ?
        <p className={css.certSubTitle}>
          My current <strong className="detail">Top 10</strong> certifications
        </p>
      : all ?
        <p className={css.certSubTitle}>
          I have completed{" "}
          <strong className="detail">
            ~{props.certificationData.length}
          </strong>{" "}
          courses and exams to date
        </p>
      :
        <p className={css.certSubTitle}>
          I have completed{" "}
          <strong className="detail">
            ~{certData.length}
          </strong>{" "}
          courses/exams in this category
        </p>
      }
      <div className={css.certCardHolder}>
        {certData.map((item) => (
          <CertificationCard
            certificate={item}
            key={item.id}
          />
        ))}
      </div>
    </>
  );
};

export default Certifications;
