/** @format */
// TODO: Migrate to app directory
import axios from "axios";
import { GetServerSideProps } from "next";
import React, { useState, useContext } from "react";

import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
const BsPlusCircleFill = dynamic(() =>
  import("react-icons/bs").then((m) => m.BsPlusCircleFill)
);

import Image from "next/image";
import { DataFilter, MetaHead } from "../app/_layout/LayoutExtras";
import ButtonGroup from "../app/resumes/_components/ButtonGroup";

import { AppContext } from "../app/AppContext";

import * as resumeService from "../app/resumes/resumeService";
import dynamic from "next/dynamic";

const css = require("../components/ResumePage/Resume.module.css");

interface resumeProps {
  resumeData: resumeService.resumeType[];
  total: number;
  categoryData: string;
}
const ResumePage = ({ resumeData, total, categoryData }: resumeProps) => {
  // Mobile device display warning
  const { mobile } = useContext(AppContext);
  const [modal, closeModal] = useState(mobile);

  const [resumes, setResumes] = useState(resumeData);
  const [category, setCategory] = useState("all");
  const [resNum, setResNum] = useState(0);

  // Filter Resumes on category change
  React.useEffect(() => {
    async function filter() {
      if (category === "all") {
        setResumes(resumeData);
      } else {
        const response = await axios.get(
          `/api/resumes?type=category&filter=${category}&offset=0`
        );
        setResumes(response.data);
      }
      setResNum(0);
    }
    filter();
  }, [category, resumeData]);

  const categoryMap: Map<string, number> = new Map(JSON.parse(categoryData));
  function checkMoreResumes() {
    return category === "all"
      ? resumes.length < total
      : resumes.length < categoryMap.get(category)!;
  }
  // Resume Flip Through
  const changeResNum = async (e: React.MouseEvent, dir: string) => {
    e.preventDefault();
    if (dir == "left") {
      if (resNum > 0) {
        setResNum((num) => num - 1);
      }
    } else if (dir == "right") {
      if (resNum < resumes.length - 1) {
        setResNum((num) => num + 1);
      }
      // If on the end, check if more Resumes need to retrieve
      else if (resumes.length % 5 === 0 && checkMoreResumes()) {
        const response = await axios.get(
          `/api/resumes?type=${
            category === "all" ? "all" : "category"
          }&filter=${category}&offset=${resumes.length}`
        );

        setResumes((resumes) => [...resumes, ...response.data]);
        setResNum((num) => num + 1);
      }
    }
  };

  return (
    <>
      <MetaHead
        title="Jesse Greenough's Software Engineering Resumes"
        description="View and Download Jesse Greenough's Software Engineering Resumes"
        keywords="Resume,Full-Stack,Software,Developer,Engineer,TypeScript,React,NextJS,Python,Java,Rust"
      />
      <main
        id="resumePage"
        className={css.resumeContainer}
      >
        <DataFilter
          titles={["Category"]}
          options={[Array.from(categoryMap.keys())]}
          firstHandler={(category: string) => setCategory(category)}
        />
        <ButtonGroup
          section="top"
          download={resumes[resNum].download}
          view={resumes[resNum].view}
        />
        <section
          id="resume"
          className={css.resume}
        >
          {
            // Mobile viewing warnins
            modal && (
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
            )
          }
          <Image
            id="resumeImage"
            src={resumes[resNum].image_url}
            alt="My Resume pdf view"
            width={800}
            height={1400}
            priority
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
          <div>
            <label
              id="previousResume"
              aria-label="View Previous Resume"
              className={css.resumeControls}
            >
              Prev
              <button
                aria-labelledby="previousResume"
                aria-disabled={resNum === 0}
                className={`${css.leftArrow} ${resNum === 0 && css.disabled}`}
                onClick={(e) => changeResNum(e, "left")}
              >
                <BsArrowLeft />
              </button>
            </label>

            <label
              id="nextResume"
              aria-label="View Next Resume"
              className={css.resumeControls}
            >
              Next
              <button
                aria-labelledby="nextResume"
                aria-disabled={
                  resNum === resumes.length - 1 && !checkMoreResumes()
                }
                className={`${css.rightArrow} ${
                  resNum === resumes.length - 1 &&
                  !checkMoreResumes() &&
                  css.disabled
                }`}
                onClick={(e) => changeResNum(e, "right")}
              >
                {resNum === resumes.length - 1 && checkMoreResumes() ? (
                  <BsPlusCircleFill />
                ) : (
                  <BsArrowRight />
                )}
              </button>
            </label>
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

export const getServerSideProps: GetServerSideProps<resumeProps> = async () => {

  const [resumeData, total, categoryData] = await Promise.all([
    resumeService.getResumes(),
    resumeService.getResumeCount(),
    resumeService.getResumeFilterOptions(),
  ]);

  return {
    props: {
      resumeData,
      total: total!,
      categoryData,
    },
  };
};
