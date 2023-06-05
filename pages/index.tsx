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
      <section style={{ padding: "min(14vw, 210px) 2vw 0" }}>
        <HomeTop />
        <HomeBottom />
      </section>
    </>
  );
};

export default HomePage;
