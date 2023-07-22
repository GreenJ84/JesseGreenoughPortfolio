/** @format */

import { NextApiRequest, NextApiResponse } from "next";
import {
  workCollectionService,
  workType,
} from "../../utils/services/workService";
import { APIHandler } from "./projects";

const workService = new workCollectionService();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const handleOutput = APIHandler(req);
  if (handleOutput !== "success") {
    return res.status(400).json({ error: handleOutput });
  }

  const { type, offset } = req.query;

  let results: workType[] = [];
  switch (type) {
    case "primary":
      results = await workService.getPrimaryWork(parseInt(offset! as string));
      break;
    case "secondary":
      results = await workService.getSecondaryWork(parseInt(offset! as string));
      break;
    default:
      res.status(404).send("Not Found");
      return;
  }

  res.status(200).json(results);
}
