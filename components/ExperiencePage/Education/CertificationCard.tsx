/** @format */

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { RiExternalLinkFill } from "react-icons/ri";

import { certificationType } from "../../../Utils/dataTypes";

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
    <div className={css.certCard}>
      {showDetail ? (
        <div
          onMouseLeave={exitCard}
          onTouchEnd={exitCard}
          className={css.certDetailCard}
        >
          <div className={css.certDetails}>
            <p>{props.certificate.description}</p>
            <a href={props.certificate.url}>
              View <RiExternalLinkFill />
            </a>
          </div>
        </div>
      ) : (
        <div
          className={css.certDisplay}
          onMouseEnter={enterCard}
          onTouchStart={enterCard}
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
      )}
    </div>
  );
};

export default CertificationCard;
