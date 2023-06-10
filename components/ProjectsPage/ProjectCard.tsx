/** @format */

import React, { useState } from "react";
import Image from "next/image";

import { AiFillGithub, AiFillProject } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import FlipCard from "../Layout/FlipCard";

import { IProject } from "../../Utils/dataTypes";
import { divMode } from "tsparticles-engine";

const css = require("./ProjectCard.module.css");

interface projectProps {
  project: IProject;
}

const ProjectCard = (props: projectProps) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <li className={css.display}>
        <FlipCard
          style={{ width: "100%", height: "100%" }}
          frontDisplay={
            <div className={css.projectDisplay}>
              <Image
                src={props.project.image_path}
                alt={props.project.name}
                className={css.displayImage}
                priority={
                  props.project.image_path ==
                  "https://github.com/GreenJ84/JesseGreenoughPortfolio/raw/main/public/projectImages/myPortfolio.png"
                    ? true
                    : false
                }
                height="150"
                width="300"
              />
              <p className={css.displayTitle}>{props.project.name}</p>
            </div>
          }
          backDisplay={
            <div
              id="projectDetailModal"
              className={css.projectDetail}
            >
              <h2>{props.project.name}</h2>
              <p>{props.project.description}</p>
              <button onClick={() => setShowDetail(true)}> View More </button>
            </div>
          }
        />
        {showDetail && (
          <>
            <div
              id="modalUnderlay"
              className={css.cover}
              onClick={() => setShowDetail(false)}
            ></div>
            <dialog
              id="projectDetailModal"
              className={css.detail}
            >
              <div
                id="detailLeft"
                className={css.detailLeft}
              >
                <Image
                  src={props.project.image_path}
                  alt={props.project.name}
                  className={css.detailImage}
                  height="150"
                  width="300"
                />
                <div id="projectLinks">
                  <a href={props.project.github_url}>
                    <AiFillGithub /> <span>Github</span>
                  </a>
                  {props.project.deployed_url && (
                    <a href={props.project.deployed_url}>
                      <AiFillProject /> <span>Project</span>
                    </a>
                  )}
                </div>
              </div>

              <div
                id="detailRight"
                className={css.detailRight}
              >
                <h2>{props.project.name}</h2>
                <p>{props.project.description}</p>
                <h3>Key Techs:</h3>
                <ul className={css.techs}>
                  {props.project.key_techs.map((tech) => (
                    <li
                      key={tech}
                      className={css.detailTech}
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                id="modalClose"
                onClick={() => setShowDetail(false)}
                className={css.detailClose}
              >
                <MdClose />
              </button>
            </dialog>
          </>
        )}
      </li>
    </>
  );
};

export default ProjectCard;
