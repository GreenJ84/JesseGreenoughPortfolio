/** @format */
"use client";

import axios from "axios";
import dynamic from "next/dynamic";
import React, { useState } from "react";

import { DataFilter } from "../../../components/Layout/LayoutExtras";
import CertificationCard from "./CertificationCard";
const AddItemButton = dynamic(() =>
import("../../../components/Layout/LayoutExtras").then((mod) => mod.AddItemButton)
);

import { certificationType } from "../certificationService";

const css = require("./Certifications.module.css");

type currentDisplayType = "all" | "top" | "issuer" | "tech";
interface Certification {
  certificationData: {
    certItems: certificationType[];
    total: number;
    issuerData: string;
    techData: string;
  };
}

const Certifications = ({ certificationData }: Certification) => {
  const { certItems, total, issuerData, techData } = certificationData;

  const [certData, setCertData] = useState<certificationType[]>(certItems);

  // Certification filtering state
  const [currentType, setCurrentType] = useState<currentDisplayType>("top");
  const [issuer, setIssuer] = useState("top");
  const [tech, setTech] = useState("top");

  // Filter element transition handling function
  function updateFilterOption(filter: HTMLSelectElement, idx: number) {
    filter.getElementsByTagName("option")[idx]!.selected = true;
  }

  // Filter certifications on Issuer change
  React.useEffect(() => {
    const techSelect = document.getElementById(
      "secondSelector"
    )! as HTMLSelectElement;

    async function filter() {
      if (issuer === "top") {
        setCertData(certItems);
        setCurrentType("top");
        updateFilterOption(techSelect, 1);
      } else if (issuer === "all") {
        const certRes = await axios.get(
          "/api/certifications?type=all&offset=0"
        );
        setCertData(certRes.data);
        setCurrentType("all");
        updateFilterOption(techSelect, 2);
      } else {
        const certRes = await axios.get(
          `/api/certifications?type=issuer&filter=${issuer}&offset=0`
        );
        setCertData(certRes.data);
        setCurrentType("issuer");
        updateFilterOption(techSelect, 0);
      }
    }
    filter();
  }, [issuer, certItems]);

  React.useEffect(() => {
    const issuerSelect = document.getElementById(
      "firstSelector"
    )! as HTMLSelectElement;

    async function filter() {
      if (tech === "top") {
        setCertData(certItems);
        setCurrentType("top");
        updateFilterOption(issuerSelect, 1);
      } else if (tech === "all") {
        const certRes = await axios.get(
          "/api/certifications?type=all&offset=0"
        );
        setCertData(certRes.data);
        setCurrentType("all");
        updateFilterOption(issuerSelect, 2);
      } else {
        const certRes = await axios.get(
          `/api/certifications?type=tech&filter=${tech}&offset=0`
        );
        setCertData(certRes.data);
        setCurrentType("tech");
        updateFilterOption(issuerSelect, 0);
      }
    }
    filter();
  }, [tech, certItems]);

  const issuerMap: Map<string, number> = new Map(JSON.parse(issuerData));
  const techMap: Map<string, number> = new Map(JSON.parse(techData));
  function checkMoreCerts(): boolean {
    switch (currentType) {
      case "all":
        return certData.length < total;
      case "issuer":
        return issuerMap.get(issuer)! > certData.length;
      case "tech":
        return techMap.get(tech)! > certData.length;
      default:
        return false;
    }
  }

  // Add extra data to projects list on user expand
  async function handleAddingCert(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const offset = certData.length;
    let projRes: any;

    switch (currentType) {
      case "all":
        projRes = await axios.get(
          `/api/certifications?type=all&offset=${offset}`
        );
        break;
      case "issuer":
        projRes = await axios.get(
          `/api/certifications?type=issuer&filter=${issuer}&offset=${offset}`
        );
        break;
      case "tech":
        projRes = await axios.get(
          `/api/certifications?type=tech&filter=${tech}&offset=${offset}`
        );
        break;
      default:
        return;
    }

    if (projRes) {
      setCertData((certs) => [...certs, ...projRes.data]);
    }
  }

  return (
    <section id="certificationContainer">
      <h2 className={css.certTitle}>Certifications Achieved</h2>
      <DataFilter
        titles={["Issuer", "Technology"]}
        options={[Array.from(issuerMap.keys()), Array.from(techMap.keys())]}
        firstHandler={(issuer: string) => {
          setIssuer(issuer);
        }}
        secondHandler={(tech: string) => setTech(tech)}
      />
      {currentType === "top" ? (
        <h3 className={css.certSubTitle}>
          My current <strong className="detail">Top 10</strong> certifications
        </h3>
      ) : (
        <h3 className={css.certSubTitle}>
          I have recieved
          <strong className="detail">{` ${
            currentType === "all"
              ? total
              : currentType === "issuer"
              ? issuerMap.get(issuer)
              : techMap.get(tech)
          } `}</strong>
          certifications to date
        </h3>
      )}
      <ul
        id="certificationList"
        className={css.certCardHolder}
      >
        {certData.map((item) => (
          <CertificationCard
            certificate={item}
            key={item.id}
          />
        ))}
      </ul>
      {currentType !== "top" &&
        certData.length % 10 === 0 &&
        checkMoreCerts() && (
          <AddItemButton
            clickHandler={handleAddingCert}
            itemType="Certifications"
          />
        )}
    </section>
  );
};

export default Certifications;
