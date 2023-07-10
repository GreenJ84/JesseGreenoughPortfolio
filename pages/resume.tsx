/** @format */

import React, { useState, useEffect, useContext } from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";

import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

import MetaHead from "../components/Layout/MetaHead";
import ButtonGroup from "../components/ResumePage/ButtonGroup";

import { AppContext } from "../utils/AppContext";
import { resumeDatabase, resumeType } from "../utils/dataTypes";

const css = require("../components/ResumePage/Resume.module.css");

interface resumeProps {
  resumeData: resumeType[];
}
const ResumePage = (props: resumeProps) => {
  // Mobile device display wraning
  const { mobile } = useContext(AppContext);
  const [modal, closeModal] = useState(mobile);

  const [resumes, setResumes] = useState(props.resumeData);
  const [resNum, setResNum] = useState(0);

  //! Implement Resume type filtering
  function filterResumes(filter: string) {
    const filteredResumes = props.resumeData.filter((resume) =>
      resume.categories.includes(filter)
    );

    setResumes([...filteredResumes]);
  }

  // Dynamic Resume Size Rendering
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const checkWindow = (width: number) => {
      if (width < 900) {
        setWidth(width * 0.6);
      } else {
        setWidth(width * 0.9);
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
      if (resNum > 0) {
        setResNum(resNum - 1);
      }
    } else if (dir == "right") {
      if (resNum < resumes.length - 1) {
        setResNum(resNum + 1);
      }
    }
  };

  return (
    <>
      <MetaHead
        title="Jesse Greenough's Software Engineering Resumes"
        description="View and Download Jesse Greenough's Software Engineering Resumes"
        keywords="Resume,Full-Stack,Software,Developer,Engineer,TypeScript,React,NextJS"
      />
      <main
        id="resumePage"
        className={css.resumeContainer}
      >
        <ButtonGroup
          section="top"
          download={resumes[resNum].download}
          view={resumes[resNum].view}
        />
        <section
          id="resume"
          className={css.resume}
        >
          <div
            className={`${css.leftArrow} ${resNum === 0 && css.disabled}`}
            onClick={() => changeResNum("left")}
          >
            <BsArrowLeft />
          </div>
          {modal && (
            <div className={css.mobileModal}>
              <p>
                <button
                  onClick={() => {
                    closeModal(false);
                  }}
                >
                  X
                </button>
                If you are viewing on mobile it is best to use the view button
                to get a better PDF viewing experience.
              </p>
            </div>
          )}
          <Image
            id="resumeImage"
            src={resumes[resNum].image_url}
            alt="My Resume pdf view"
            width={Math.max(width, 900)}
            height={Math.max(width * 1.2, 1100)}
            blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8fwYAAtABzbrmHzgAAAAASUVORK5CYII="
            placeholder="blur"
            onClick={() => {
              let image = document.getElementById("resumeImage")!;
              if (window.innerWidth < 1400) {
                return;
              }
              if (image.style.transform === "scale(1)") {
                image.style.transform = "scale(1.2)";
                image.style.zIndex = "30";
              } else {
                image.style.transform = "scale(1)";
                image.style.zIndex = "10";
              }
            }}
          />
          <div
            className={`${css.rightArrow} ${
              resNum === resumes.length - 1 && css.disabled
            }`}
            onClick={() => changeResNum("right")}
          >
            <BsArrowRight />
          </div>
        </section>
        <ButtonGroup
          section="bottom"
          download={resumes[resNum].download}
          view={resumes[resNum].view}
        />
      </main>
    </>
  );
};

export default ResumePage;

export const getServerSideProps: GetServerSideProps = async () => {
  const results = await resumeDatabase.find().sort({ _id: -1 }).toArray();

  return {
    props: {
      resumeData: results.map((result) => ({
        id: result._id.toString(),
        image_url: result.image_url,
        download: result.download,
        view: result.view,
        categories: result.categories,
      })),
    },
  };
};
