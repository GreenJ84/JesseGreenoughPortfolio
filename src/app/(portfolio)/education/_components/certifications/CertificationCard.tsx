/** @format */
import React from "react";
import dynamic from "next/dynamic";

const RiExternalLinkFill = dynamic(() =>
  import("react-icons/ri").then((m) => m.RiExternalLinkFill)
);

import Image from "next/image";
import FlipCard from "../../../_shared/FlipCard";

import { CertificationType } from "@/app/_lib/_types";

const css = require("./Certifications.module.css");

interface certificateCardProps {
  certificate: CertificationType;
}

const CertificationCard = (props: certificateCardProps) => {

  return (
    <li className={css.certCard}>
      <FlipCard
        style={{ width: "100%", height: "100%" }}
        frontDisplay={
          <div
            id="certCardFront"
            className={css.certDisplay}
          >
            <Image
              src={props.certificate.image}
              alt={props.certificate.title}
              className={css.certImage}
              width={200}
              height={200}
              loading="lazy"
            />
            <h4>{props.certificate.title}</h4>
            <p>{props.certificate.issuer}</p>
          </div>
        }
        backDisplay={
          <div
            id="certCardBack"
            className={css.certDetailCard}
          >
            <div className={css.certDetails}>
              <p>{props.certificate.description}</p>
              <a
                href={props.certificate.url}
                target="_blank noreferrer"
              >
                View <RiExternalLinkFill />
              </a>
            </div>
          </div>
        }
      />
    </li>
  );
};

export default CertificationCard;
