/** @format */

import dynamic from "next/dynamic";
import React, { useState } from "react";

const AiFillGithub = dynamic(() =>
  import("react-icons/ai").then((m) => m.AiFillGithub)
);
const AiFillProject = dynamic(() =>
  import("react-icons/ai").then((m) => m.AiFillProject)
);
const MdClose = dynamic(() => import("react-icons/md").then((m) => m.MdClose));

import Image from "next/image";
import { FlipCard } from "../_layout/LayoutExtras";

import { projectType } from "./projectService";

const css = require("./Project.module.css");

const ProjectCard = ({ project }: { project: projectType }) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <li className={css.display}>
      <FlipCard
        style={{ width: "100%", height: "100%", margin: "0", padding: "0" }}
        frontDisplay={
          <div
            id="projectDisplayCard"
            className={css.projectDisplay}
          >
            <Image
              priority
              src={project.image_path}
              alt={project.name}
              className={css.displayImage}
              height="150"
              width="300"
            />
            <p className={css.displayTitle}>{project.name}</p>
          </div>
        }
        backDisplay={
          <div
            id="projectDetailCard"
            className={css.projectDetail}
          >
            <h2>{project.name}</h2>
            <p>{project.brief}</p>
            <button onClick={() => setShowDetail(true)}> View More </button>
          </div>
        }
      />
      {showDetail && (
        <div className={css.detailModal}>
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
                src={project.image_path}
                alt={project.name}
                className={css.detailImage}
                height="150"
                width="300"
              />
              <div id="projectLinks">
                <a href={project.github_url}>
                  <AiFillGithub className={css.detailIcons} />
                  <span>Github</span>
                </a>
                {project.deployed_url && (
                  <a href={project.deployed_url}>
                    <AiFillProject className={css.detailIcons} />
                    <span>Project</span>
                  </a>
                )}
              </div>
            </div>

            <div
              id="detailRight"
              className={css.detailRight}
            >
              <h2>{project.name}</h2>
              <p>{project.description}</p>
              <h3>Key Techs:</h3>
              <ul className={css.techs}>
                {project.key_techs.map((tech) => (
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
        </div>
      )}
    </li>
  );
};

export default ProjectCard;
