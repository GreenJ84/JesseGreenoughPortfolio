"use client";
import axios, { AxiosResponse } from 'axios';
import dynamic from 'next/dynamic';
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import DataFilter from "../_shared/DataFilter";
import ProjectCard from "./_components/ProjectCard";
const AddItemsButton = dynamic(() => import("../_shared/AddItemsButton"));

import { ProjectType } from '@/app/_lib/_types';
type currentDisplayType = "all" | "top" | "category" | "tech";

const css = require("./_components/Project.module.css");

const PageClient = ({JSONData, total, filters}: {
  JSONData: string[],
  total: number,
  filters: [[string, number][], [string, number][]]
}) => {
  const projectData: ProjectType[] = useMemo(() => JSONData.map(project => JSON.parse(project) as ProjectType), [JSONData]);

  const [projects, setProjects] = useState<ProjectType[]>(projectData);
  const [currentType, setCurrentType] = useState<currentDisplayType>("top");
  const [category, setCategory] = useState("top");
  const [tech, setTech] = useState("top");

  const updateFilterOption = useCallback((filter: HTMLSelectElement, idx: number) => {
    filter.getElementsByTagName("option")[idx]!.selected = true;
  }, []);

  const getProjectData = useCallback(async (type: string, offset: number = 0, keyword?: string) => {
    let projectResponse: AxiosResponse<ProjectType[], any>;
    switch (type) {
      case "all":
        projectResponse = await axios.get(`/api/projects?type=all&offset=${offset}`);
        break;
      case "recent":
        projectResponse = await axios.get(`/api/projects?type=recent&offset=${offset}`);
        break;
      case "category":
        projectResponse = await axios.get(
          `/api/projects?type=category&filter=${keyword}&offset=${offset}`
        );
        break;
      case "tech":
        projectResponse = await axios.get(
          `/api/projects?type=tech&filter=${keyword}&offset=${offset}`
        );
        break;
      default:
        return [];
    }
    return projectResponse.data;
  }, []);

  useEffect(() => {
    const techFilter = document.getElementById(
      "secondSelector"
    )! as HTMLSelectElement;

    async function filter() {
      switch (category){
        case "top":
          setProjects(projectData);
          setCurrentType("top");
          updateFilterOption(techFilter, 1);
          break;
        case "all":
          setProjects(await getProjectData("all"));
          setCurrentType("all");
          updateFilterOption(techFilter, 2);
          break;
        default:
          setProjects(await getProjectData("category", 0, category));
          setCurrentType("category");
          updateFilterOption(techFilter, 0);
      }
    }
    filter();
  }, [category, projectData, getProjectData, updateFilterOption]);

  // Filter projects on tech change
  useEffect(() => {
    const catFilter = document.getElementById(
      "firstSelector"
    )! as HTMLSelectElement;
    async function filter() {
      switch (tech){
        case "top":
          setProjects(projectData);
          setCurrentType("top");
          updateFilterOption(catFilter, 1);
          break;
        case "all":
          setProjects(await getProjectData("all"));
          setCurrentType("all");
          updateFilterOption(catFilter, 2);
          break;
        default:
          setProjects(await getProjectData("tech", 0, tech));
          setCurrentType("tech");
          updateFilterOption(catFilter, 0);
      }
    }
    filter();
  }, [tech, projectData, getProjectData, updateFilterOption]);

  const [categories, techs] = filters;
  const categoryMap: Map<string, number> = useMemo(() => new Map(categories), [categories]);
  const techMap: Map<string, number> = useMemo(() => new Map(techs), [techs]);
  const moreProjects = useMemo(() => {
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
  }, [category, categoryMap, currentType, projects.length, tech, techMap, total]);

  async function handleAddingProjects(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const offset = projects.length;

    let projRes: ProjectType[];
    switch (currentType) {
      case "all":
        projRes = await getProjectData("all", offset);
        break;
      case "all":
        projRes = await getProjectData("recent", offset);
        break;
      case "category":
        projRes = await getProjectData("category", offset, category);
        break;
      case "tech":
        projRes = await getProjectData("tech", offset, tech);
        break;
      default:
        return;
    }

    if (projRes) {
      setProjects((projects) => [...projects, ...projRes]);
    }
  }

  return (
    <>
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
        moreProjects && (
          <AddItemsButton
            clickHandler={handleAddingProjects}
            itemType="Projects"
          />
        )
      }
    </>
  )
}

export default PageClient