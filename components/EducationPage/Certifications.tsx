/** @format */

import React, { useState } from "react";

import CertificationCard from "./CertificationCard";
import CertificationsFilter from "./CertificationsFilter";

import { certificationType } from "../../utils/dataTypes";

const css = require("./Certifications.module.css");

interface Certification {
  certificationData: certificationType[];
}

const Certifications = (props: Certification) => {
  const [certData, setCertData] = useState(
    props.certificationData.slice(0, 10)
  );
  const [fresh, setFresh] = useState(true);

  let issuers = new Set<string>();
  let techs = new Set<string>();
  props.certificationData.forEach((cert) => {
    issuers.add(cert.issuer);
    cert.techs?.map((item) => techs.add(item));
  });

  // Filter Certifications by Issuers Category
  const issueHandler = (category: string) => {
    const select = document.getElementById("techSelect")! as HTMLSelectElement;
    if (category === "top") {
      select.getElementsByTagName("option")[1]!.selected = true;
      setCertData(props.certificationData.slice(0, 10));
      setFresh(true);
    } else if (category === "all") {
      select.getElementsByTagName("option")[2]!.selected = true;
      setCertData(props.certificationData);
      setFresh(false);
    } else {
      select.getElementsByTagName("option")[0]!.selected = true;
      const newArray = props.certificationData.filter((cert) =>
        cert.issuer.includes(category)
      );
      setCertData(newArray);
      setFresh(false);
    }
  };

  // Filter Certifications by Technologies Category
  const techHandler = (category: string) => {
    const select = document.getElementById(
      "issuerSelect"
    )! as HTMLSelectElement;
    if (category === "top") {
      select.getElementsByTagName("option")[1]!.selected = true;
      setCertData(props.certificationData.slice(0, 10));
      setFresh(true);
    } else if (category === "all") {
      select.getElementsByTagName("option")[2]!.selected = true;
      setCertData(props.certificationData);
      setFresh(false);
    } else {
      select.getElementsByTagName("option")[0]!.selected = true;
      const newArray = props.certificationData.filter((cert) =>
        cert.techs?.includes(category)
      );
      setCertData(newArray);
      setFresh(false);
    }
  };

  return (
    <section id="certificationContainer">
      <h2 className={css.certTitle}>Certifications Achieved</h2>
      <CertificationsFilter
        issuerHandler={issueHandler}
        techHandler={techHandler}
        options={[issuers, techs]}
      />
      {fresh ? (
        <h3 className={css.certSubTitle}>
          My current <strong className="detail">Top 10</strong> certifications
        </h3>
      ) : (
        <h3 className={css.certSubTitle}>
          I have recieved{" "}
          <strong className="detail">~{certData.length}</strong> certifications to date
        </h3>
      )}
      <ul id="certificationList" className={css.certCardHolder}>
        {certData.map((item) => (
          <CertificationCard
            certificate={item}
            key={item.id}
          />
        ))}
      </ul>
    </section>
  );
};

export default Certifications;
