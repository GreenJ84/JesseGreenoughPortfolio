/** @format */

import { NextApiRequest, NextApiResponse } from "next";
import {
  projectCollectionService,
  projectType,
} from "../../utils/services/projectsService";

const projectService = new projectCollectionService();

interface RequestVariables {
  type: string;
  offset: number;
  filter?: string;
}

export function APIHandler(
  req: NextApiRequest,
  filt = true
): [string, RequestVariables?] {
  if (req.method !== "GET") {
    return ["Bad Request"];
  }

  const { type, filter, offset } = req.query;

  if (!type || !offset) {
    return ["Bad Request"];
  }
  if (Array.isArray(type)) {
    return ["Type not a single value"];
  }
  if (Array.isArray(offset)) {
    return ["Offset not a single value"];
  }

  let offsetNum = 0;
  try {
    offsetNum = parseInt(offset as string);
    if (isNaN(offsetNum)) {
      throw new Error("");
    }
  } catch (error) {
    return ["Offset not a valid Int"];
  }

  if (filt && type !== "all") {
    if (!filter) {
      return ["Bad Request"];
    }
    if (Array.isArray(filter)) {
      return ["Valid filter not provided"];
    }
    return ["success", { type, offset: offsetNum, filter }];
  }

  return ["success", { type, offset: offsetNum }];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const handleOutput = APIHandler(req);
  if (handleOutput[0] !== "success") {
    return res.status(400).json({ error: handleOutput[0] });
  }

  const { type, filter, offset } = handleOutput[1]!;
  let results: projectType[] = [];

  switch (type) {
    case "all":
      results = await projectService.getUnsortedProjects(offset);
      break;
    case "category":
      results = await projectService.getProjectsByCategory(filter!, offset);
      break;
    case "tech":
      results = await projectService.getProjectsByTech(filter!, offset);
      break;
    default:
      res.status(404).send("Not Found");
      break;
  }
  res.status(200).json(results as projectType[]);
}
