/** @format */

import React, { useState } from "react";
import { GetServerSideProps } from "next";

import MetaHead from "../components/Layout/MetaHead";
import ProjectCard from "../components/ProjectsPage/ProjectCard";
import ProjectNavbar from "../components/ProjectsPage/ProjectNavbar";

import { projectType, projectDatabase } from "../utils/dataTypes";

const css = require("../components/ProjectsPage/Project.module.css");

interface Projects {
  projectData: projectType[];
}

const ProjectPage = ({ projectData }: Projects) => {
  const [projects, setProjects] = useState<projectType[]>(
    projectData.slice(0, 10)
  );
  const [fresh, setFresh] = useState(true);

  let cat = new Set<string>();
  let tech = new Set<string>();
  projectData.forEach((project) => {
    project.categories.map((item) => cat.add(item));
    project.key_techs.map((item) => tech.add(item));
  });

  // Filter Projects by languages used
  const langHandler = (category: string) => {
    const select = document.getElementById("techSelect")! as HTMLSelectElement;
    if (category === "top") {
      setProjects(projectData.slice(0, 10));
      setFresh(true);
      select.getElementsByTagName("option")[1]!.selected = true;
    } else if (category === "all") {
      setProjects(projectData);
      setFresh(false);
      select.getElementsByTagName("option")[2]!.selected = true;
    } else {
      const newArray = projectData.filter((project) =>
        project.categories.includes(category)
      );
      setProjects(newArray);
      setFresh(false);
      select.getElementsByTagName("option")[0]!.selected = true;
    }
  };

  // Filter projects by Technologies used
  const techHandler = (category: string) => {
    const select = document.getElementById("langSelect")! as HTMLSelectElement;
    if (category === "top") {
      setProjects(projectData.slice(0, 10));
      setFresh(true);
      select.getElementsByTagName("option")[1]!.selected = true;
    } else if (category === "all") {
      setProjects(projectData);
      setFresh(false);
      select.getElementsByTagName("option")[2]!.selected = true;
    } else {
      const newArray = projectData.filter((project) =>
        project.key_techs.includes(category)
      );
      setProjects(newArray);
      setFresh(false);
      select.getElementsByTagName("option")[0]!.selected = true;
    }
  };

  return (
    <>
      <MetaHead
        title="Software Development projects created by Jesse Greenough"
        description="View and sort through the software engineering projects completed by Jesse Greenough"
        keywords="Software, Developer, Engineer, Projects, Deployments, Repositories"
      />

      <main
        id="pageContainer"
        className={css.projectsBody}
      >
        <ProjectNavbar
          langHandler={langHandler}
          techHandler={techHandler}
          options={[cat, tech]}
        />
        <hr style={{ border: ".5px solid var(--text-secondary)" }} />
        {fresh ? (
          <h1 id="projectsTitle">
            My current <span className="detail">Top 10</span> projects
          </h1>
        ) : (
          <h1 id="projectsTitle">
            I have created over
            <span className="detail"> {projects.length} </span>
            projects to date
          </h1>
        )}
        <ul
          id="projectsList"
          className={css.projectsListHolder}
        >
          {projects.map((project) => (
            <ProjectCard
              project={project}
              key={project.id}
            />
          ))}
        </ul>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Projects> = async () => {
  const results = await projectDatabase
    .find()
    .sort({ priority: 1, date: -1, _id: -1 })
    .toArray();

  return {
    props: {
      projectData: results.map((result) => ({
        id: result._id.toString(),
        priority: result.priority,
        name: result.name,
        date: result.date.slice(0, 7),
        brief: result.brief ?? result.description,
        description: result.description,
        image_path: result.image_path,
        deployed_url: result.deployed_url,
        github_url: result.github_url,
        categories: result.categories,
        key_techs: result.key_techs,
      })),
    },
  };
};

export default ProjectPage;
