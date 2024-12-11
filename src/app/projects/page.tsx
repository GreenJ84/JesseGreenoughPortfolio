/** @format */

import React from "react";

import {
  getProjectCount,
  getProjectFilters,
  getTopProjects,
} from "./projectService";

import PageClient from "./pageClient";

const css = require("./Project.module.css");


const ProjectPage = async () => {
  const [projectData, total, filters] = await Promise.all([
    getTopProjects(),
    getProjectCount(),
    getProjectFilters(),
  ]);

  return (
    <>
      <main
        id="pageContainer"
        className={css.projectsBody}
      >
        <PageClient
          JSONData={projectData}
          total={total}
          filters={filters}
        />
      </main>
    </>
  );
};

export default ProjectPage;
