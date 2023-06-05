/** @format */

import React from "react";
import Head from "next/head";

import { Container } from "react-bootstrap";

import AboutDetails from "../components/AboutPage/AboutDetails";
import AboutMain from "../components/AboutPage/AboutMain";

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
      <Container
        fluid
        style={{ padding: "10vw 4vw 0" }}
      >
        <AboutMain />
        <AboutDetails />
      </Container>
    </>
  );
};

export default AboutPage;
