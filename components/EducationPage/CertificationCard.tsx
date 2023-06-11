/** @format */

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { RiExternalLinkFill } from "react-icons/ri";
import FlipCard from "../../components/Layout/FlipCard";

import { certificationType } from "../../Utils/dataTypes";

const css = require("./CertificationCard.module.css");

interface certificateCardProps {
  certificate: certificationType;
}

const CertificationCard = (props: certificateCardProps) => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)
    ) {
      setMobile(true);
    }
  }, []);

  return (
    <li className={css.certCard}>
      <FlipCard
        style={{"width": "100%","height": "100%" }}
        frontDisplay={
          <div
            className={css.certDisplay}
          >
            <Image
              src={props.certificate.image}
              alt={props.certificate.title}
              className={css.certImage}
              width={mobile ? 100 : 200}
              height={mobile ? 100 : 200}
              loading="lazy"
            />
            <h5>{props.certificate.title}</h5>
            <p>{props.certificate.issuer}</p>
          </div>
        }
        backDisplay={
          <div className={css.certDetailCard}>
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
