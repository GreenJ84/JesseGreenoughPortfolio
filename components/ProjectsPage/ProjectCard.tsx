/** @format */

import React, { useState } from "react";
import Image from "next/image";

import { AiFillGithub, AiFillProject } from "react-icons/ai";
import { MdClose } from "react-icons/md";

import { IProject } from "../../Utils/dataTypes";

const css = require("./ProjectCard.module.css");

interface projectProps {
  project: IProject;
}

const ProjectCard = (props: projectProps) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <li
        className={css.display}
        onClick={() => setShowDetail(true)}
      >
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
      </li>
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
    </>
  );
};

export default ProjectCard;
