/** @format */

import { NextApiRequest, NextApiResponse } from "next";
import {
  projectCollectionService,
  projectType,
} from "../../utils/services/projectsService";

const projectService = new projectCollectionService();

export function APIHandler(req: NextApiRequest, filt = true) { 
  if (req.method !== "GET") {
    return "Bad Request";
  }

  const { type, filter, offset } = req.query;

  if (!type || !offset) {
    return "Bad Request";
  }

  if (Array.isArray(offset)) {
    return "Offset not a single value";
  }

  let offsetNum = 0;
  try {
    offsetNum = parseInt(offset as string);
    if (isNaN(offsetNum)) {
      throw new Error("");
    }
  } catch (error) {
    return "Offset not a valid Int";
  }

  if (filt && type !== "all" && (!filter || Array.isArray(filter))) {
    return "Valid filter not provided";
  }
  return "success";
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const handleOutput = APIHandler(req);
  if (handleOutput !== "success") { 
    return res.status(400).json({ error: handleOutput });
  }

  const { type, filter, offset } = req.query;
  let results: projectType[] = [];

  switch (type) {
    case "all":
      results = await projectService.getUnsortedProjects(parseInt(offset! as string));
      break;
    case "category":
      results = await projectService.getProjectsByCategory(
        filter as string,
        parseInt(offset! as string)
      );
      break;
    case "tech":
      results = await projectService.getProjectsByTech(
        filter as string,
        parseInt(offset! as string)
      );
      break;
    default:
      res.status(404).send("Not Found");
      break;
  }
  res.status(200).json(results);
}
