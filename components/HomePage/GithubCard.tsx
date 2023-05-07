/** @format */

import React, { useEffect, useState } from "react";
import GitHubCalendar from "react-github-calendar";

const css = require("./TechnicalSkills.module.css");

const calenderStyle = {
  width: "min(90%, 1400px)",
  margin: "3vw auto 10vw",
  color: "var(--text-primary)",
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
    <div id="githubCard">
      <h1 className={css.skillSectionTitle}>
        Days I <strong className="detail">Code</strong>
      </h1>
      <GitHubCalendar
        username="GreenJ84"
        color="#229955"
        style={calenderStyle}
        blockSize={width}
        blockRadius={4}
        blockMargin={8}
        fontSize={Math.min(width, 34)}
      />
    </div>
  );
};

export default GithubCard;
