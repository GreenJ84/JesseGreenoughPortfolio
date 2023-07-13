/** @format */

import { NextApiRequest, NextApiResponse } from "next";
import {
  resumeCollectionService,
  resumeType,
} from "../../utils/services/resumeService";

const resumeService = new resumeCollectionService();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type, filter, offset } = req.body;

  let results: resumeType[] = [];
  switch (type) {
    case "all":
      const response = await resumeService.getResumes(offset);
      results = response[0];
      break;
    default:
      results = await resumeService.getResumeByCategory(filter, offset);
      break;
  }
  res.status(200).json(results);
}
