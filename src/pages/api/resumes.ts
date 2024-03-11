/** @format */

import { NextApiRequest, NextApiResponse } from "next";

import {
  resumeCollectionService,
  resumeType,
} from "../../utils/services/resumeService";
import { APIHandler } from "./projects";

const resumeService = new resumeCollectionService();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const handlerOutput = APIHandler(req);
  if (handlerOutput[0] !== "success") {
    return res.status(400).json({ error: handlerOutput[0] });
  }

  const { type, filter, offset } = handlerOutput[1]!;

  let results: resumeType[] = [];
  switch (type) {
    case "all":
      const response = await resumeService.getResumes(offset);
      results = response[0];
      break;
    default:
      results = await resumeService.getResumeByCategory(filter!, offset);
      break;
  }
  res.status(200).json(results as resumeType[]);
}
