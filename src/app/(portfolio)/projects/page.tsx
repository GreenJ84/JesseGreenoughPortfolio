/** @format */

// TODO: Update styling logic gor route
import dynamic from "next/dynamic";

import PageClient from "./PageClient";
const Footer = dynamic(() => import("../_layout/Footer/Footer"));

import { ProjectType } from "@/app/_lib/_types";
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
        JSONData={projectData.map((project: ProjectType) => JSON.stringify(project))}
        total={total}
        filters={filters}
      />
      <Footer />
    </main>
  );
};

export default ProjectPage;

import { Metadata } from 'next/types';
import { APP_URL, OPEN_GRAPH, TWITTER_SHARE } from '../sharedMetadata';

const PROJECT_URL = APP_URL + '/projects';
const TITLE="Jesse Greenough's development project archive"
const DESCRIPTION ="View the development projects crafted and completed by Jesse Greenough"
const KEYWORDS ="Work,Experience,Management,Software,Development,Engineering,Retail"

export const metadata: Metadata = {
  metadataBase: new URL(PROJECT_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: KEYWORDS,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PROJECT_URL,
    siteName: TITLE,
    ...OPEN_GRAPH
  },
  twitter: {
    site: PROJECT_URL,
    title: TITLE,
    description: DESCRIPTION,
    ...TWITTER_SHARE
  },
};