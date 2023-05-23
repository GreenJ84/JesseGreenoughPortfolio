/** @format */

import React from "react";

import HomeBottom from "../components/HomePage/HomeBottom";
import HomeTop from "../components/HomePage/HomeTop";

const HomePage = () => {
  return (
    <section style={{ padding: "min(14vw, 210px) 2vw 0" }}>
      <HomeTop />
      <HomeBottom />
    </section>
  );
};

export default HomePage;
