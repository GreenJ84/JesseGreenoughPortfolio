/** @format */

import React, { useContext, useEffect, useState } from "react";
import GitHubCalendar, { Theme } from "react-github-calendar";

import { AppContext } from "../../utils/AppContext";

const css = require("./Home.module.css");

const calenderStyle = {
  width: "min(90%, 1400px)",
  margin: "3vw auto 10vw",
  color: "var(--text-secondary)",
  height: "150px",
};

const darkTheme: Theme = {
  level0: "rgba(100, 165, 130, .6)",
  level1: "rgb(20, 125, 50)",
  level2: "rgb(0, 165, 30)",
  level3: "rgb(0, 235, 0)",
  level4: "rgba(200, 255, 200)",
};
const lightTheme: Theme = {
  level0: "rgb(0, 220, 255)",
  level1: "rgb(20, 150, 232)",
  level2: "rgb(20, 100, 212)",
  level3: "rgb(0, 60, 152)",
  level4: "rgb(0, 0, 82)",
};

const GithubCard = () => {
  const [width, setWidth] = useState(20);
  const { theme } = useContext(AppContext);

  // Dynamic GitHub Calendar sizing
  useEffect(() => {
    const windowObserver = () => {
      setWidth(Math.round((window.innerWidth / 100) * 3));
    };
    window.addEventListener("resize", windowObserver);
    return () => {
      window.removeEventListener("resize", windowObserver);
    };
  }, []);

  return (
    <section
      style={{ margin: "10vh 0 40vh" }}
      id="githubCard"
    >
      <h1 className={css.skillSectionTitle}>
        Days I <strong className="detail">Code</strong>
      </h1>
      <GitHubCalendar
        username="GreenJ84"
        theme={theme === "dark" ? darkTheme : lightTheme}
        color={theme === "dark" ? "rgb(180, 255, 190)" : "rgb(33, 51, 132)"}
        style={calenderStyle}
        blockSize={width}
        blockRadius={4}
        blockMargin={8}
        fontSize={Math.min(width, 34)}
      />
    </section>
  );
};

export default GithubCard;
