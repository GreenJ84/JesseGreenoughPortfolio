/** @format */

import React from "react";

const css = require("./AboutDetails.module.css");

const AboutDetails = () => {
  return (
    <section id="aboutDetail" className={css.aboutDetail}>
      <h1>
        All About <span className="detail">Me</span>
      </h1>
      <p>
        {" "}
        I was born and raise in the border city of
        <span className="detail"> El Paso, Texas.</span> Ever since I was young,
        I strove to make the most of myself. I participated in community sports,
        educational clubs (math club, debate team, etc), and the Boy Scouts of
        America. These kept me active and spending a lot of my time either
        outdoors or solving equations, which is where my fascination with nature
        (GREEN-ery =&gt; GREEN-ough 🤣) and my love of math began. Both are big
        parts of my identity to this day.
      </p>
      <p>
        {" "}
        I attended a Running Start focused high school where, through my
        determination and effort, attained distinguished achievements and was
        able to receive my Associates degree my junior year of high school, a
        year earlier than the program, 1 of 3 students to accomplish that feat
        for the city of El Paso that year. High school is also where I was
        introduced to coding for the first time throught the robotics club and
        where I started coding as a hobby.
      </p>
      <p>
        {" "}
        College ended up being one of the hardest times of my life. I traveled
        across the states to attend college at the University of Washington
        Seattle campus. In my second semester of college my father&apos;s mental
        health deteriorated which led to him to revealing dark truths about my
        immediate family, some of which altered my entire reality around the
        people I knew and the events of my childhood, which led to a very
        unstable environment for me mentally and concluded with my withdrawal as
        I faced my own mental health crisis.
      </p>
      <p>
        {" "}
        From there I re-established myself and entered the workforce as my only
        forseeable option to start earning towards paying off accumulated debt.
        In the workplace I started to recover and even excel because I was able
        to utilize my work ethic and abilities within a structured environment.
        It facilitated my ability to attain achievement and experience, allowing
        me to move up from starting positions to lead positions like, Store
        Apprentice with Chipotle and Department Manager at Fred Meyer. It was in
        the latter position that where I found my amazing fiancé and was blessed
        with a beautiful daughter that has become the love of my life.
      </p>
      <p>
        {" "}
        While life went on I had kept learning bits and pieces of code here and
        there in my leisure, tring expanding my knowledge with what free time
        that I had. Then in 2022, I recieved the opportunity to attend the
        Coding Dojo full stack web development bootcamp. Within the bootcamp I
        was able significantly increase my knowledge by learning the skills
        necessary to become a Full-stack Software Developer across multiple
        stacks. Ever since I have continuously been increasing my knowledge
        though online course consumption, building and deploying applications,
        and continual algorithm practice.
      </p>
    </section>
  );
};

export default AboutDetails;
