/** @format */

import React from "react";
import dynamic from "next/dynamic";

import HomeTop from "./_components/HomeTop";
const GithubCard = dynamic(() => import("./_components/GithubCard"));

const HomePage = () => {

  return (
      <>
        <HomeTop />
        {/* Introduction (About preview) */}
        {/* Skills preview */}
        {/* Project preview */}
        {/* Education preview */}
        <GithubCard />
        {/* Fixed contact widget */}
    </>
  );
};

export default HomePage;



