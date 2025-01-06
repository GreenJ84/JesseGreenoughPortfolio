/** @format */
import React from "react";
import dynamic from "next/dynamic";

const RiExternalLinkFill = dynamic(() =>
  import("react-icons/ri").then((m) => m.RiExternalLinkFill)
);

import Image from "next/image";
import FlipCard from "../../../_shared/FlipCard";

import { certificationType } from "../../certificationService";

const css = require("./Certifications.module.css");

interface certificateCardProps {
  certificate: certificationType;
}

const CertificationCard = (props: certificateCardProps) => {
  // TODO: Replace -> const { mobile } = useContext(AppContext);
  const mobile = false;

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
              width={mobile ? 60 : 200}
              height={mobile ? 60 : 200}
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
              <a href={props.certificate.url}>
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
