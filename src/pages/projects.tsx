/** @format */

import axios from "axios";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import React, { useState, useEffect } from "react";

import { MetaHead, DataFilter } from "../components/Layout/LayoutExtras";
import ProjectCard from "../components/ProjectsPage/ProjectCard";
const AddItemButton = dynamic(() =>
  import("../components/Layout/LayoutExtras").then((mod) => mod.AddItemButton)
);

import {
  projectType,
  projectCollectionService,
} from "../utils/services/projectsService";

interface Projects {
  projectData: projectType[];
  total: number;
  categories: string;
  techs: string;
}
type currentDisplayType = "all" | "top" | "category" | "tech";

const css = require("../components/ProjectsPage/Project.module.css");

const ProjectPage = ({ projectData, total, categories, techs }: Projects) => {
  // Curr Projects list state
  const [projects, setProjects] = useState<projectType[]>(projectData);

  // Current filtering settings state
  const [currentType, setCurrentType] = useState<currentDisplayType>("top");
  const [category, setCategory] = useState("top");
  const [tech, setTech] = useState("top");

  // Filter element transition handling function
  function updateFilterOption(filter: HTMLSelectElement, idx: number) {
    filter.getElementsByTagName("option")[idx]!.selected = true;
  }
  // Filter projects on category change
  useEffect(() => {
    const techFilter = document.getElementById(
      "secondSelector"
    )! as HTMLSelectElement;

    async function filter() {
      if (category === "top") {
        setProjects(projectData);
        setCurrentType("top");
        updateFilterOption(techFilter, 1);
      } else if (category === "all") {
        const projRes = await axios.get(`/api/projects?type=all&offset=0`);
        setProjects(projRes.data);
        setCurrentType("all");
        updateFilterOption(techFilter, 2);
      } else {
        const projRes = await axios.get(
          `/api/projects?type=category&filter=${category}&offset=0`
        );
        setProjects(projRes.data);
        setCurrentType("category");
        updateFilterOption(techFilter, 0);
      }
    }
    filter();
  }, [category, projectData]);

  // Filter projects on tech change
  useEffect(() => {
    const catFilter = document.getElementById(
      "firstSelector"
    )! as HTMLSelectElement;
    async function filter() {
      if (tech === "top") {
        setProjects(projectData);
        setCurrentType("top");
        updateFilterOption(catFilter, 1);
      } else if (tech === "all") {
        const projRes = await axios.get(`/api/projects?type=all&offset=0`);
        setProjects(projRes.data);
        setCurrentType("all");
        updateFilterOption(catFilter, 2);
      } else {
        const projRes = await axios.get(
          `/api/projects?type=tech&filter=${tech}&offset=0`
        );
        setProjects(projRes.data);
        setCurrentType("tech");
        updateFilterOption(catFilter, 0);
      }
    }
    filter();
  }, [tech, projectData]);

  // Check if more projects are available in current Type
  const categoryMap: Map<string, number> = new Map(JSON.parse(categories));
  const techMap: Map<string, number> = new Map(JSON.parse(techs));
  function checkMoreProjects(): boolean {
    switch (currentType) {
      case "all":
        return projects.length < total;
      case "category":
        return categoryMap.get(category)! > projects.length;
      case "tech":
        return techMap.get(tech)! > projects.length;
      default:
        return false;
    }
  }

  // Add extra data to projects list on user expand
  async function handleAddingProjects(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const offset = projects.length;
    let projRes: any;

    switch (currentType) {
      case "all":
        projRes = await axios.get(`/api/projects?type=all&offset=${offset}`);
        break;
      case "category":
        projRes = await axios.get(
          `/api/projects?type=category&filter=${category}&offset=${offset}`
        );
        break;
      case "tech":
        projRes = await axios.get(
          `/api/projects?type=tech&filter=${tech}&offset=${offset}`
        );
        break;
      default:
        return;
    }

    if (projRes) {
      setProjects((projects) => [...projects, ...projRes.data]);
    }
  }

  return (
    <>
      <MetaHead
        title="Software Development projects created by Jesse Greenough"
        description="View and sort through the software engineering projects completed by Jesse Greenough"
        keywords="Software,Developer,Engineer,Projects,Deployments,Repositories"
      />

      <main
        id="pageContainer"
        className={css.projectsBody}
      >
        <DataFilter
          titles={["Category", "Technology"]}
          options={[Array.from(categoryMap.keys()), Array.from(techMap.keys())]}
          firstHandler={(cat: string) => setCategory(cat)}
          secondHandler={(tech: string) => setTech(tech)}
        />
        {currentType == "top" ? (
          <h1 id="projectsTitle">
            My current <span className="detail">Top 10</span> projects
          </h1>
        ) : (
          <h1 id="projectsTitle">
            I have created over
            <span className="detail">
              {` ${
                currentType === "all"
                  ? total
                  : currentType === "category"
                  ? categoryMap.get(category)!
                  : techMap.get(tech)!
              } `}
            </span>
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
        {currentType !== "top" &&
          projects.length % 10 === 0 &&
          checkMoreProjects() && (
            <AddItemButton
              clickHandler={handleAddingProjects}
              itemType="Projects"
            />
          )}
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Projects> = async () => {
  const [[projectData, total], [categories, techs]] = await Promise.all([
    projectCollectionService.getTopProjects(),
    projectCollectionService.getProjectFilterOptions(),
  ]);

  return {
    props: {
      projectData,
      total,
      categories,
      techs,
    },
  };
};

export default ProjectPage;
