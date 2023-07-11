/** @format */

import React, { useContext, useEffect } from "react";
import dynamic from "next/dynamic";

import { BsArrowDownCircle } from "react-icons/bs";

import { AppContext, WindowWidth } from "../utils/AppContext";

import {DeveloperPortrait, MetaHead} from "../components/Layout/LayoutExtras";
import HomeTop from "../components/HomePage/HomeTop";
const DeveloperTools = dynamic(
  () => import("../components/HomePage/DeveloperTools")
);
const GithubCard = dynamic(() => import("../components/HomePage/GithubCard"));
const Languages = dynamic(() => import("../components/HomePage/Languages"));
const Framework = dynamic(() => import("../components/HomePage/Framework"));
const Databases = dynamic(() => import("../components/HomePage/Databases"));

const css = require("../components/HomePage/Home.module.css");

const HomePage = () => {
  const { windowWidth } = useContext(AppContext);

  // Window scrolling affect on home page Title
  useEffect(() => {
    const animateScroll = () => {
      const mobile = windowWidth === WindowWidth.SMALL;
      const slide = document.getElementById("slideTitle")!;
      const rect = slide.getBoundingClientRect();
      const down = document.getElementById("titleDown")!;

      if (
        (rect.bottom <= window.innerHeight && rect.bottom >= 0) ||
        (rect.top <= window.innerHeight && rect.top >= 0)
      ) {
        let mid = (rect.bottom + rect.top) / 2;
        slide.style.visibility = "visible";
        down.style.visibility = "visible";

        let scale = 2 - Math.abs(mid - window.innerHeight / 2) / 400;
        scale = mobile ? Math.min(scale, 1.2) : Math.min(scale, 1.4);
        const translateY = (mid / window.innerHeight) * 80 - 80;
        const opacity = mobile
          ? Math.min(scale - 0.3, 1)
          : Math.min(scale - 0.5, 1);

        slide.style.transform = `translateY(${
          translateY * 3
        }px) scale(${scale})`;
        slide.style.opacity = `${opacity}`;
        down.style.transform = `translateY(${
          translateY * 0.75
        }px) scale(${scale})`;
        down.style.opacity = `${opacity}`;
      } else {
        slide.style.visibility = "hidden";
        down.style.visibility = "hidden";
      }
    };

    window.addEventListener("scroll", animateScroll);
    return () => {
      window.removeEventListener("scroll", animateScroll);
    };
  }, [windowWidth]);

  return (
    <>
      <MetaHead
        title="Jesse Greenough's Development Portfolio"
        description="View the Technical Development Skills possessed by Full Stack Engineer Jesse Greenough"
        keywords="Software,Developer,Engineer,Full-Stack,Portfolio,Skills,Projects,Experience,Resumes,Jesse Greenough"
      />

      <main
        id="homePage"
        style={{ padding: "clamp(160px, 14vw, 240px) 0 0" }}
      >
        <DeveloperPortrait />
        <HomeTop />
        <section
          id="skillsIntro"
          className={css.developerSkills}
        >
          <h2 id="slideTitle">
            Check out my <span className="detail">Technical Skillsets</span>
            <br />
            <BsArrowDownCircle
              style={{ marginTop: "100px" }}
              id="titleDown"
            />
          </h2>
          <Languages />
          <Framework />
          <Databases />
          <DeveloperTools />
          {windowWidth === WindowWidth.LARGE && <GithubCard />}
        </section>
      </main>
    </>
  );
};

export default HomePage;
