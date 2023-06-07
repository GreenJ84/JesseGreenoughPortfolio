/** @format */

import React from "react";
import Head from "next/head";

import HomeBottom from "../components/HomePage/HomeBottom";
import HomeTop from "../components/HomePage/HomeTop";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Jesse Greenough&apos;s Development Portfolio</title>
        <meta
          property="og:title"
          content="Jesse Greenough's Development Portfolio"
        />
        <meta
          name="description"
          content="View the Development experience of Full Stack Engineer Jesse Greenough"
          key="desc"
        />
        <meta
          property="og:description"
          content="View the Development experience of Full Stack Engineer Jesse Greenough"
        />
        <meta
          name="keywords"
          content="Software, Developer, Engineer, Full-Stack, Portfolio, Skills, Development"
        ></meta>
      </Head>
      <main style={{ padding: "clamp(160px, 14vw, 240px) 0 0" }}>
        <HomeTop />
        <HomeBottom />
      </main>
    </>
  );
};

export default HomePage;
