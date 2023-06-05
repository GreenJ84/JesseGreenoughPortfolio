/** @format */

import React, { useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { MongoClient } from "mongodb";

import ProjectCard from "../components/ProjectsPage/ProjectCard";
import ProjectNavbar from "../components/ProjectsPage/ProjectNavbar";

import { IProject } from "../Utils/dataTypes";

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
      <Head>
        <title>Software Development projects by Jesse Greenough</title>
        <meta
          property="og:title"
          content="Software Development projects by Jesse Greenough"
        />
        <meta
          name="description"
          content="View the software engineering projects completed by Jesse Greenough"
          key="desc"
        />
        <meta
          property="og:description"
          content="View the software engineering projects completed by Jesse Greenough"
        />
        <meta
          name="keywords"
          content="Software, Developer, Engineer, Projects, Deployments, Repositories"
        ></meta>
      </Head>
      <main
        id="pageContainer"
        style={projectBody}
      >
        <section
          id="projectsContainer"
          style={container as React.CSSProperties}
        >
          <ProjectNavbar
            langHandler={langHandler}
            techHandler={techHandler}
            options={[cat, tech]}
          />
          <hr style={{ border: ".5px solid var(--text-secondary)" }} />
          {fresh ? (
            <h1
              id="projectsTitle"
              style={title as React.CSSProperties}
            >
              My current <span className="detail">Top 10</span> projects
            </h1>
          ) : (
            <h1
              id="projectsTitle"
              style={title as React.CSSProperties}
            >
              I have created
              <span className="detail"> over {projectData.length} </span>
              projects to date
            </h1>
          )}
          <ul
            id="projectsList"
            style={flexbox as React.CSSProperties}
          >
            {projectData.map((project) => (
              <ProjectCard
                project={project}
                key={project.name}
              />
            ))}
          </ul>
        </section>
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

const projectBody = {
  padding: "12rem 2vw 10vw",
};

const container = {
  position: "relative",
  backgroundColor: "var(--background2)",
  padding: "clamp(160px, 14vw, 200px) 4vw 8vw",
  border: "2px solid black",
};
const title = {
  marginBottom: "8vw",
  textAlign: "center",
  color: "var(--text-primary)",
  fontSize: "clamp(24px, 3.6vw, 62px)",
};
const flexbox = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
};