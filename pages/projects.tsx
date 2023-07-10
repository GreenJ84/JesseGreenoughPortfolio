/** @format */

import React, { useState } from "react";
import { GetServerSideProps } from "next";
import axios from "axios";

import MetaHead from "../components/Layout/MetaHead";

import ProjectCard from "../components/ProjectsPage/ProjectCard";
import ProjectNavbar from "../components/ProjectsPage/ProjectNavbar";
import { projectType, projectCollectionService } from "../utils/dataTypes";
interface Projects {
  projectData: projectType[];
  categories: string[];
  techs: string[];
}

const css = require("../components/ProjectsPage/Project.module.css");

// const projectService = new projectCollectionService();

const ProjectPage = ({ projectData, categories, techs }: Projects) => {
  const [projects, setProjects] = useState<projectType[]>(projectData);
  const [fresh, setFresh] = useState(true);
  const [category, setCategory] = useState('top');
  const [tech, setTech] = useState('top');

  // Filter element handling function
  function updateFilterOption(filter: HTMLSelectElement, idx: number) {
    filter.getElementsByTagName("option")[idx]!.selected = true;
  }
  // Project filtering on category change
  React.useEffect(() => {
    console.log(category)
    const catFilter = document.getElementById("techSelect")! as HTMLSelectElement;

    async function filter() {
      if (category === "top") {
        setProjects(projectData);
        setFresh(true);
        updateFilterOption(catFilter, 1);
      } else if (category === "all") {
        const projRes = await axios.post('/api/projects', {
          type: 'all',
          filter: '',
          offset: 0
        })
        setProjects(projRes.data);
        setFresh(false);
        updateFilterOption(catFilter, 2);
      } else {
        const projRes = await axios.post('/api/projects', {
          type: 'category',
          filter: category,
          offset: 0
        })
        setProjects(projRes.data);
        setFresh(false);
        updateFilterOption(catFilter, 0);
      }
    }
    filter();
  }, [category]);

  // Project filtering on Tech change
  React.useEffect(() => {
    const techFilter = document.getElementById("langSelect")! as HTMLSelectElement;
    async function filter() {
      if (tech === "top") {
        setProjects(projectData);
        setFresh(true);
        updateFilterOption(techFilter, 1);
      } else if (tech === "all") {
        const projRes = await axios.post('/api/projects', {
          type: 'all',
          filter: '',
          offset: 0
        })
        setProjects(projRes.data);
        setFresh(false);
        updateFilterOption(techFilter, 2);
      } else {
        const projRes = await axios.post('/api/projects', {
          type: 'tech',
          filter: tech,
          offset: 0
        })
        setProjects(projRes.data);
        setFresh(false);
        updateFilterOption(techFilter, 0);
      }
    }
    filter();
  }, [tech]);

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
          langHandler={(cat: string) => setCategory(cat)}
          techHandler={(tech: string) => setTech(tech)}
          options={[categories, techs]}
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
  const results = await projectCollectionService.getTopProjects();

  const [categories, techs] = await projectCollectionService.getProjectFilterOptions();

  return {
    props: {
      projectData: results,
      categories,
      techs,
    },
  };
};

export default ProjectPage;
