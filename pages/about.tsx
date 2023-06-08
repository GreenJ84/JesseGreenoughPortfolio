/** @format */

import React from "react";
import Head from "next/head";

import AboutDetails from "../components/AboutPage/AboutDetails";
import AboutIntroduction from "../components/AboutPage/AboutIntroduction";

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About the Developer: Jesse Greenough</title>
        <meta
          property="og:title"
          content="About the Developer: Jesse Greenough"
        />
        <meta
          name="description"
          content="Learn about the life of the Jesse Greenough, Full-Stack Engineer."
          key="desc"
        />
        <meta
          property="og:description"
          content="Learn about the life of the Jesse Greenough, Full-Stack Engineer."
        />
        <meta
          name="keywords"
          content="About, Biography, Developer, Engineer"
        ></meta>
      </Head>
      <main
        style={{ position: "relative", padding: "10vw 4vw 0" }}
      >
        <AboutIntroduction />
        <AboutDetails />
      </main>
    </>
  );
};

export default AboutPage;
