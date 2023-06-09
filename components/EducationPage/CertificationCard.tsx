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
  const [showDetail, setShowDetail] = useState(false);
  const [mobile, setMobile] = useState(false);

  const enterCard = () => {
    setShowDetail(true);
  };
  const exitCard = () => {
    setShowDetail(false);
  };

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
        style={{"margin": "30px 3%", "width": "clamp(120px, 34vw, 350px)","height": "clamp(220px, 35vw, 480px)" }}
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
