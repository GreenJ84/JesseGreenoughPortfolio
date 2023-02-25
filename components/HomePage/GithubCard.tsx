/** @format */

import React, { useEffect, useState } from "react";
import GitHubCalendar from "react-github-calendar";

const css = require("./TechnicalSkills.module.css");

const calenderStyle = {
  margin: "3vw auto 10vw",
  color: "var(--text-ternary)",
  height: "150px",
};


const GithubCard = () => {
  const [width, setWidth] = useState(20);

  useEffect(() => {
    const windowObserver = () => {
      setWidth(Math.round(window.innerWidth/100*2))
    }
    window.addEventListener("resize", windowObserver)
    return () => {
      window.removeEventListener('resize', windowObserver)
    }
  }, []);

  return (
    <>
      <h1 className={css.projectHeading}>
        Days I <strong className="detail">Code</strong>
      </h1>
      <GitHubCalendar
        username="GreenJ84"
        color="#229955"
        style={calenderStyle}
        blockSize={width}
        blockRadius={4}
        blockMargin={8}
        fontSize={Math.min(width, 30)}
      />
    </>
  );
};

export default GithubCard;
