/** @format */

import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { MongoClient } from "mongodb";

import MetaHead from "../components/Layout/MetaHead";
import ProjectCard from "../components/ProjectsPage/ProjectCard";
import ProjectNavbar from "../components/ProjectsPage/ProjectNavbar";

import { IProject } from "../Utils/dataTypes";
const css = require("../components/ProjectsPage/Project.module.css");

interface Projects {
  projectData: IProject[];
}

const ProjectPage = (props: Projects) => {
  const [projectData, setProjectData] = useState(
    props.projectData.slice(0, 10)
  );
  const [fresh, setFresh] = useState(true);

  let cat = new Set<string>();
  let tech = new Set<string>();
  props.projectData.forEach((project) => {
    project.category.map((item) => cat.add(item));
    project.key_techs.map((item) => tech.add(item));
  });

  // Filter Projects by languages used
  const langHandler = (category: string) => {
    const select = document.getElementById("techSelect")! as HTMLSelectElement;
    if (category === "top") {
      setProjectData(props.projectData.slice(0, 10));
      setFresh(true);
      select.getElementsByTagName("option")[1]!.selected = true;
    } else if (category === "all") {
      setProjectData(props.projectData);
      setFresh(false);
      select.getElementsByTagName("option")[2]!.selected = true;
    } else {
      const newArray = props.projectData.filter((project) =>
        project.category.includes(category)
      );
      setProjectData(newArray);
      setFresh(false);
      select.getElementsByTagName("option")[0]!.selected = true;
    }
  };

  // Filter projects by Technologies used
  const techHandler = (category: string) => {
    const select = document.getElementById("langSelect")! as HTMLSelectElement;
    if (category === "top") {
      setProjectData(props.projectData.slice(0, 10));
      setFresh(true);
      select.getElementsByTagName("option")[1]!.selected = true;
    } else if (category === "all") {
      setProjectData(props.projectData);
      setFresh(false);
      select.getElementsByTagName("option")[2]!.selected = true;
    } else {
      const newArray = props.projectData.filter((project) =>
        project.key_techs.includes(category)
      );
      setProjectData(newArray);
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
            <span className="detail"> {projectData.length} </span>
            projects to date
          </h1>
        )}
        <ul
          id="projectsList"
          className={css.projectsListHolder}
        >
          {projectData.map((project) => (
            <ProjectCard
              project={project}
              key={project.name}
            />
          ))}
        </ul>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const client = new MongoClient(process.env.DB_CONN_STRING!);
  const db = client.db(process.env.DB_NAME);

  const projectData = db.collection(process.env.PROJ_COLL!);

  const results = await projectData
    .find()
    .sort({ priority: 1, date: -1, name: 1 })
    .toArray();

  return {
    props: {
      projectData: results.map((result) => ({
        id: result._id.toString(),
        priority: result.priority,
        name: result.name,
        description: result.description,
        date: result.date,
        image_path: result.image_path,
        deployed_url: result.deployed_url,
        github_url: result.github_url,
        category: result.category,
        key_techs: result.key_techs,
      })),
    },
  };
};

export default ProjectPage;
