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
  if (handlerOutput !== "success") {
    return res.status(400).json(handlerOutput);
  }
  
  const { type, filter, offset } = req.query;

  let results: resumeType[] = [];
  switch (type) {
    case "all":
      const response = await resumeService.getResumes(parseInt(offset! as string));
      results = response[0];
      break;
    default:
      results = await resumeService.getResumeByCategory(
        filter as string,
        parseInt(offset! as string)
      );
      break;
  }
  res.status(200).json(results);
}
