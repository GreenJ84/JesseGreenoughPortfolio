"use client";

import React, { useState } from 'react';

const css = require("./_components/EduBody.module.css")


interface ClientProps {
  degreeComp: JSX.Element;
  certComp: JSX.Element;
}
const PageClient = ({degreeComp, certComp}: ClientProps) => {
  const [displayDegrees, setDisplay] = useState(true);

  return (
    <>
      <nav className={css.eduNav}>
        <button
          onClick={() => setDisplay(true)}
          className={`${css.title} ${displayDegrees ? css.active : ""}`}
        >
          Degrees I Received
        </button>
        <button
          onClick={() => setDisplay(false)}
          className={`${css.title} ${displayDegrees ? "" : css.active}`}
        >
          Certifications Achieved
        </button>
      </nav>
      {displayDegrees ?
        degreeComp :
        certComp
      }
    </>
  );
}

export default PageClient