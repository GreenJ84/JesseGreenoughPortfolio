/** @format */

import React from "react";

import Head from "next/head";
import Link from "next/link";


const ExperiencePage = () => {

  return (
    <>
      <Head>
        <title>Dive into the Experience of Jesse Greenough</title>
        <meta
          property="og:title"
          content="Dive into the Experience of Jesse Greenough"
        />
        <meta
          name="description"
          content="A landing page to direct viewers to the Education and Work experiences of Jesse Greenough"
          key="desc"
        />
        <meta
          property="og:description"
          content="A landing page to direct viewers to the Education and Work experiences of Jesse Greenough"
        />
      </Head>
      <main
        id="experienceContainer"
        style={{ padding: "12rem 3vw 1rem", margin: "0 2vw" }}
      >
        <Link href={"/experience/education"}> Education Animation Card </Link>
        <Link href={"/experience/work"}> Work Animation Card </Link>
      </main>
    </>
  );
};

export default ExperiencePage;
