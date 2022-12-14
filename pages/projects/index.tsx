/** @format */

import React, { useState } from "react";
import { MongoClient } from "mongodb";
import { GetServerSideProps } from "next";
import { Container } from "react-bootstrap";

import ProjectCard from "../../components/ProjectsPage/ProjectCard";
import ProjectNavbar from "../../components/ProjectsPage/ProjectNavbar";

import { Category, IProject } from "../../Utils/data/ProjectData";

interface Projects {
  projectData: IProject[];
}

const projectBody = {
  padding: "9rem 2vw 10vw",
};

const container = {
  backgroundColor: "var(--background2)",
  padding: "4vw 4vw 8vw",
  border: "2px solid black",
};
const title = {
  marginBottom: "8vw",
  textAlign: "center",
  color: "var(--text-primary)",
  fontSize: "2vw",
};
const flexbox = {
  display: "flex",
  flexWrap: "wrap",
};

const ProjectPage = (props: Projects) => {
  const [projectData, setProjectData] = useState(props.projectData);
  const [activeNav, setActiveNav] = useState("all");

  console.log(projectData);

  const filterHandler = (category: Category | "all") => {
    if (category === "all") {
      setProjectData(props.projectData);
      setActiveNav(category);
      return;
    } else {
      const newArray = props.projectData.filter((project) =>
        project.category.includes(category)
      );
      setProjectData(newArray);
      setActiveNav(category);
    }
  };

  return (
    <Container
      fluid
      style={projectBody}
    >
      <div style={{ padding: "0 3vw" }}>
        <ProjectNavbar
          filterHandler={filterHandler}
          active={activeNav}
        />
        <div style={container as React.CSSProperties}>
          <p style={title as React.CSSProperties}>
            {" "}
            I have created{" "}
            <span className="detail">over {projectData.length}</span> projects
            related to the filtered category{" "}
          </p>
          <div style={flexbox as React.CSSProperties}>
            {projectData.map((project) => (
              <ProjectCard
                project={project}
                key={project.name}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
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
