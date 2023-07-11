/** @format */

import React, { useState, useEffect, useContext } from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import axios from "axios";

import { BsArrowLeft, BsArrowRight, BsPlusCircleFill } from "react-icons/bs";

import MetaHead from "../components/Layout/MetaHead";
import ButtonGroup from "../components/ResumePage/ButtonGroup";

import { AppContext } from "../utils/AppContext";
import {
  resumeCollectionService,
  resumeType,
} from "../utils/services/resumeService";

const css = require("../components/ResumePage/Resume.module.css");

interface resumeProps {
  resumeData: resumeType[];
  total: number;
  categoryData: string;
}
const ResumePage = ({ resumeData, total, categoryData }: resumeProps) => {
  // Mobile device display warning
  const { mobile } = useContext(AppContext);
  const [modal, closeModal] = useState(mobile);

  // Dynamic Resume Size Rendering
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const checkWindow = (width: number) => {
      if (width < 900) {
        setWidth(width * 0.7);
      } else {
        setWidth(width * 0.8);
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

  const [resumes, setResumes] = useState(resumeData);
  const [category, setCategory] = useState("all");
  const [resNum, setResNum] = useState(0);

  // Filter Resumes on category change
  React.useEffect(() => {
    async function filter() {
      if (category === "all") {
        setResumes(resumeData);
      } else {
        const respose = await axios.post("/api/resumes", {
          type: "category",
          filter: category,
          offset: 0,
        });
        setResumes(respose.data);
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
        const response = await axios.post("/api/resumes", {
          type: category,
          offset: resumes.length,
        });

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
        <nav
          id="projectsFilter"
          className={css.resumeFilter}
        >
          <h2>
            Filter by <span className="detail">Category</span>
          </h2>
          <select
            id="categorySelect"
            name="categorySelect"
            defaultValue="all"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              e.preventDefault();
              setCategory(e.target.value);
            }}
          >
            <option value="all">All</option>
            {Array.from(categoryMap.keys()).map((cat, idx) => (
              <option
                key={idx}
                value={cat}
              >
                {cat.toUpperCase()}
              </option>
            ))}
          </select>
        </nav>
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
            onClick={(e) => changeResNum(e, "left")}
          >
            <BsArrowLeft />
          </div>
          {// Mobile viewing warnins
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
              (resNum === resumes.length && !checkMoreResumes()) && css.disabled
            }`}
            onClick={(e) => changeResNum(e, "right")}
          >
            {(resNum === resumes.length && checkMoreResumes()) ? <BsArrowRight /> : <BsPlusCircleFill/>}
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
  const resumeService = new resumeCollectionService();
  const [resumes, total] = await resumeService.getResumes();

  return {
    props: {
      resumeData: resumes,
      total: total!,
      categoryData: await resumeService.getResumeFilterOptions(),
    },
  };
};
