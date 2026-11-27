/** @format */

// TODO: Update styling logic gor route

import PageClient from "./PageClient";
import Footer from '../_layout/Footer/Footer';

import { Project } from "@/app/_lib/_types";
import {
  getProjectCount,
  getProjectFilters,
  getTopProjects,
} from "@/app/_actions/projectService";

const css = require("./_components/Project.module.css");

const ProjectPage = async () => {
  const [projectData, total, filters] = await Promise.all([
    getTopProjects(),
    getProjectCount(),
    getProjectFilters(),
  ]);

  return (
    <main
      id="pageContainer"
      className={css.projectsBody}
    >
      <PageClient
        JSONData={projectData.map((project: Project) => JSON.stringify(project))}
        total={total}
        filters={filters}
      />
      <Footer />
    </main>
  );
};

export default ProjectPage;

import { portfolioMetadata } from '../sharedMetadata';

export const metadata = portfolioMetadata(
  '/projects',
  'Rust Backend & Security Projects | Jesse Greenough',
  'Explore Jesse Greenough’s selected Rust backend, security, and full-stack engineering projects, with links to code and live work.'
);
