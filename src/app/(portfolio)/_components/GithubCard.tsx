/** @format */
"use client"
import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import type { GitHubCalendar as CalendarComponent } from "react-github-calendar";
type CalendarTheme = NonNullable<ComponentProps<typeof CalendarComponent>["theme"]>;
import { useContext, useEffect, useMemo, useState } from "react";

const GitHubCalendar = dynamic(() => import("react-github-calendar").then(module => module.GitHubCalendar), { ssr: false });

import { AppContext } from "../../_utils/AppContext";

const css = require("./Home.module.css");

const calenderStyle = {
  width: "min(90%, 1300px)",
  margin: "3dvh auto 10dvh",
  color: "var(--text-secondary)",
  height: "150px",
};

const calendarTheme: CalendarTheme = {
  dark: ["rgba(100, 165, 130, .6)", "rgb(20, 125, 50)", "rgb(0, 165, 30)", "rgb(0, 235, 0)", "rgb(200, 255, 200)"],
  light: ["rgb(0, 220, 255)", "rgb(20, 150, 232)", "rgb(20, 100, 212)", "rgb(0, 60, 152)", "rgb(0, 0, 82)"],
};

const GithubCard = () => {
  const [width, setWidth] = useState(20);
  const { theme } = useContext(AppContext);
  const themeVal = useMemo(() => theme == 'dark' ? "greenj_dark" : "greenj_light" , [theme])

  // Dynamic GitHub Calendar sizing
  useEffect(() => {
    let frame = 0;
    const measure = () => setWidth(Math.min(Math.round(window.innerWidth * 0.03), 20));
    const windowObserver = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("resize", windowObserver);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", windowObserver);
    };
  }, []);

  return (
    <section
      id="githubCard"
      className={css.developerSkills}
    >
      <h2>
        <strong className="detail">Coding</strong> Activity
      </h2>

      <div className={css.svgContainer}>
        <picture>
          <img loading="lazy" decoding="async" width={600} height={200} className={css.svgModal} src={`https://greenj-readme-stats.onrender.com/leetcode/stats/GreenJ84?theme=${themeVal}`} alt="GreenJ84's LeetCode Profile Stats"/>
        </picture>
        <picture>
          <img loading="lazy" decoding="async" width={600} height={200} className={css.svgModal} src={`https://greenj-readme-stats.onrender.com/github/stats/GreenJ84?theme=${themeVal}`} alt="GreenJ84's LeetCode Profile Stats"/>
        </picture>
        <picture>
          <img loading="lazy" decoding="async" width={600} height={200} className={css.svgModal} src={`https://greenj-readme-stats.onrender.com/wakatime/insights/GreenJ84?theme=${themeVal}`} alt="GreenJ84's LeetCode Profile Stats"/>
        </picture>
        <picture>
          <img loading="lazy" decoding="async" width={600} height={200} className={css.svgModal} src={`https://greenj-readme-stats.onrender.com/wakatime/languages/GreenJ84?theme=${themeVal}`} alt="GreenJ84's LeetCode Profile Stats"/>
        </picture>
      </div>
      <GitHubCalendar
        username="GreenJ84"
        theme={calendarTheme}
        colorScheme={theme === "dark" ? "dark" : "light"}
        style={calenderStyle}
        blockSize={width}
        blockRadius={width / 4}
        blockMargin={60 / width}
        fontSize={20}
      />
    </section>
  );
};

export default GithubCard;
