/** @format */

import React, { useState } from "react";
import { MongoClient } from "mongodb";
import { GetServerSideProps } from "next";
import { Container } from "react-bootstrap";

import ProjectCard from "../../components/ProjectsPage/ProjectCard";
import ProjectNavbar from "../../components/ProjectsPage/ProjectNavbar";

import { IProject } from "../../Utils/data/ProjectData";

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
  }
  );


  const langHandler = (category: string) => {
    if (category === "all") {
      setProjectData(props.projectData);
    } else {
      const newArray = props.projectData.filter((project) =>
        project.category.includes(category)
      );
      setProjectData(newArray);
      setFresh(false);
    }
  };
  const techHandler = (category: string) => {
    if (category === "all") {
      setProjectData(props.projectData);
    } else {
      const newArray = props.projectData.filter((project) =>
        project.key_techs.includes(category)
      );
      setProjectData(newArray);
      setFresh(false);
    }
  };

  return (
    <Container
      fluid
      style={projectBody}
    >
      <div
        style={{ position: "relative", margin: "6vw 0 0", padding: "0 3vw 0" }}
      >
        <div style={container as React.CSSProperties}>
          <ProjectNavbar
            langHandler={langHandler}
            techHandler={techHandler}
            options={[cat, tech]}
          />
          <hr style={{border: ".5px solid var(--text-secondary)"}} />
          {fresh ? (
            <p style={title as React.CSSProperties}>
              My current <span className="detail">top 10</span> projects
            </p>
          ) : (
            <p style={title as React.CSSProperties}>
              {" "}
              I have created{" "}
              <span className="detail">over {projectData.length}</span> projects
              related to the filtered category{" "}
            </p>
          )}
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

const projectBody = {
  padding: "8rem 2vw 10vw",
};

const container = {
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
  justifyContent: "space-around"
};
