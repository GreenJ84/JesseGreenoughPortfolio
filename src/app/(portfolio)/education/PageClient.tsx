"use client";

import React, { useState } from 'react';

const css = require("./_components/EduBody.module.css")


interface ClientProps {
  degreeComp: React.JSX.Element;
  certComp: React.JSX.Element;
}
const PageClient = ({degreeComp, certComp}: ClientProps) => {
  const [displayDegrees, setDisplay] = useState(true);

  return (
    <>
      <div className={css.eduNav} role="tablist" aria-label="Education sections">
        <button
          id="degree-tab"
          type="button"
          role="tab"
          aria-selected={displayDegrees}
          aria-controls="degreeContainer"
          onClick={() => setDisplay(true)}
          className={`${css.title} ${displayDegrees ? css.active : ""}`}
        >
          Degrees
        </button>
        <button
          id="certification-tab"
          type="button"
          role="tab"
          aria-selected={!displayDegrees}
          aria-controls="certificationContainer"
          onClick={() => setDisplay(false)}
          className={`${css.title} ${displayDegrees ? "" : css.active}`}
        >
          Certifications
        </button>
      </div>
      {displayDegrees ?
        degreeComp :
        certComp
      }
    </>
  );
}

export default PageClient
