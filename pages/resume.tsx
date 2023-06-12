/** @format */

import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { MongoClient } from "mongodb";

import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

import ButtonGroup from "../components/ResumePage/ButtonGroup";
import MetaHead from "../components/Layout/MetaHead";

import { AppContext } from "../Utils/AppContext";

const css = require("../components/ResumePage/Resume.module.css");

interface resumeProps {
  resumeData: [
    {
      link: string;
      download: string;
      view: string;
      categories: string[];
    }
  ];
}
const ResumePage = (props: resumeProps) => {
  const { mobile } = useContext(AppContext);
  const [modal, closeModal] = useState(mobile);
  const [width, setWidth] = useState(0);
  const [resNum, setResNum] = useState(0);

  // Dynamic Resume Size Rendering
  useEffect(() => {
    const checkWindow = (width: number) => {
      if (width < 900) {
        setWidth(width / 0.62);
      } else {
        setWidth(width);
      }
    };
    checkWindow(window.innerWidth);
    window.addEventListener("resize", () => checkWindow(window.innerWidth));
    return () => {
      window.removeEventListener("resize", () =>
        checkWindow(window.innerWidth)
      );
    };
  }, []);

  // Resume Flip Through
  const changeResNum = (dir: string) => {
    if (dir == "left") {
      if (resNum <= 0) {
        setResNum(props.resumeData.length - 1);
      } else {
        setResNum(resNum - 1);
      }
    } else if (dir == "right") {
      setResNum((resNum + 1) % props.resumeData.length);
    }
  };

  return (
    <>
      <MetaHead
        title="Jesse Greenough&apos;s Software Engineering Resumes"
        description="View and Download Jesse Greenough&apos;s Software Engineering Resumes"
        keywords="Resume,Full-Stack,Software,Developer,Engineer,TypeScript,React,NextJS"
      />
      <main
        id="resumePage"
        className={css.resumeContainer}
        >
        <ButtonGroup
          section="top"
          download={props.resumeData[resNum].download}
          view={props.resumeData[resNum].view}
          />
        <section
          id="resume"
          className={css.resume}
          >
          <div
            className={css.leftArrow}
            onClick={() => changeResNum("left")}
            >
            <BsArrowLeft />
          </div>
          {modal && <div className={css.mobileModal}>
              <p>
                <button onClick={() => {closeModal(false)}}>X</button>
                If you are viewing on mobile it is best to use the view button to get a better PDF viewing experience.
              </p>
            </div>}
          <Image
            id="resumeImage"
            src={props.resumeData[resNum].link}
            alt="MyResume"
            width={Math.max(width, 900)}
            height={Math.max(width * 1.2, 1100)}
            onClick={() => {
              let image = document.getElementById("resumeImage")!;
              if (window.innerWidth < 900) {
                return;
              }
              if (image.style.transform === "scale(1)") {
                image.style.transform = "scale(1.2)";
                image.style.zIndex = "30";
              } else {
                image.style.transform = "scale(1)";
                image.style.zIndex = "1";
              }
            }}
          />
          <div
            className={css.rightArrow}
            onClick={() => changeResNum("right")}
          >
            <BsArrowRight />
          </div>
        </section>
        <ButtonGroup
          section="bottom"
          download={props.resumeData[resNum].download}
          view={props.resumeData[resNum].view}
        />
      </main>
    </>
  );
};

export default ResumePage;

export const getServerSideProps: GetServerSideProps = async () => {
  const client = new MongoClient(process.env.DB_CONN_STRING!);
  const db = client.db(process.env.DB_NAME);

  const resumeData = db.collection(process.env.RES_COLL!);

  const results = await resumeData.find().sort({ _id: -1 }).toArray();

  return {
    props: {
      resumeData: results.map((result) => ({
        id: result._id.toString(),
        link: result.link,
        download: result.download,
        view: result.view,
        categories: result.categories,
      })),
    },
  };
};
