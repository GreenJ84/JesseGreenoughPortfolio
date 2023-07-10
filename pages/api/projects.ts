/** @format */

import { NextApiRequest, NextApiResponse } from "next";
import { projectCollectionService, projectType } from "../../utils/dataTypes";

const projectService = new projectCollectionService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { type, filter, offset } = req.body;

  let results: projectType[] = [];

  switch (type) { 
    case "all":
      results = await projectService.getUnsortedProjects(offset);
      break;
    case "category":
      results = await projectService.getProjectsByCategory(filter, offset);
      break;
    case "tech":
      results = await projectService.getProjectsByTech(filter, offset);
      break;
    default:
      res.status(404).send("Not Found");
      break;
  }

  res.status(200).json(results);
}
