/** @format */

"use client";

import React, { useState } from "react";

import Image from "next/image";
import FlipCard from "../../_shared/FlipCard";

import { ProjectType } from "@/app/_lib/_types";
import ProjectDetailCard from "./ProjectDetailCard";

const css = require("./Project.module.css");

const ProjectCard = ({ project }: { project: ProjectType }) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <li className={css.display}>
      <FlipCard
        style={{ width: "100%", height: "100%", margin: "0", padding: "0" }}
        frontDisplay={
          <div
            className={css.projectDisplay}
          >
            <Image
              priority
              src={project.image_path}
              alt={project.name}
              className={css.displayImage}
              height="200"
              width="300"
            />
            <p className={css.displayTitle}>{project.name}</p>
          </div>
        }
        backDisplay={
          <div
            className={css.displayDetail}
          >
            <h2>{project.name}</h2>
            <p>{project.brief}</p>
            <button onClick={() => setShowDetail(true)}> View More </button>
          </div>
        }
      />

      {showDetail && (
        <div
          className={css.detailModal}
          onClick={() => setShowDetail(false)}
        >
          <ProjectDetailCard
            project={project}
            setShowDetail={setShowDetail}
          />
        </div>
      )}
    </li>
  );
};

export default ProjectCard;
