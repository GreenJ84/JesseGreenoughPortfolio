/** @format */

import React from "react";

const css = require("./AboutDetails.module.css");

const AboutDetails = () => {
  return (
    <>
      <h1 className={css.title}>
        {" "}
        All About <span className="detail">Me</span>{" "}
      </h1>
      <p className={css.aboutMe}>
        {" "}
        I was born and raise in the border city of{" "}
        <span className="detail">El Paso, Texas.</span> Ever since I was young,
        I strove to make the most of myself. I participated in community
        sports, educational clubs (math club, debate team, etc), and the Boy Scouts of America.
        These kept me active and spending a lot of my time either outdoors or
        solving equations, which is where my fascination with nature (GREEN-ery
        =&gt; GREEN-ough 🤣) and my love of math began. Both are big parts of my
        identity to this day.
      </p>
      <p className={css.aboutMe}>
        {" "}
        I attended a Running Start focused high school where, through my determination
        and effort, attained distinguished achievements and was able to receive my Associates degree
        my junior year of high school, a year earlier than the program. 1 of 3 students to accomplish that feat
        for the city of El Paso that year. Also,  this is where I was introduced to
        coding in robotics club and started using it as a hobby in my life.{" "}
      </p>
      <p className={css.aboutMe}>
        {" "}
        College afterwards ended up being one of the hardest times of my life. I
        traveled across the states to attend college at the University of
        Washington in Seattle, WA. In my second semester of college my
        father&apos;s mental health deteriorated which inevitably caused him to
        reveal dark truths about my immediate family, some of which altered my
        entire reality around the people I knew and the events of my childhood, which
        led to a very unstable environment for me mentally and concluded with my
        withdrawal as I faced my own mental health crisis.{" "}
      </p>
      <p className={css.aboutMe}>
        {" "}
        From there I re-established myself and entered the workforce as my only forseeable option to start
        earning towards paying off accumulated debt. In the workplace I started to excel because
        I was able to utilize my work ethic and abilities within a structured environment. It facilitated
        my ability to attain achievement and experience, allowing me to move up
        from starting positions to lead positions at every job I had. Even
        taking over manager positions at multiple locations. It was in the
        customer service industry, specifially working at Fred Meyer, that led me
        to me my amazing fiancé and the blessing of a
        beautiful daughter that has become the love of my life.
      </p>
      <p className={css.aboutMe}>
        {" "}
        While life went on I had kept learning bits and pieces of code here and
        there. Within the last 3 years I started helping out others with my
        skill and tried expanding my knowledge with the free time that I had. In 2022, I recieved the
        opportunity to attend the Coding Dojo full stack web development bootcamp. Within the bootcamp I was able significantly increase
        my knowledge by learning the skills necessary to
        become a Full-stack Software Developer across multiple stacks. Ever since I have continuously
        been increasing my knowledge though online course consumption, building and deploying
        applications, and continual algorithm practice.
      </p>
    </>
  );
};

export default AboutDetails;
