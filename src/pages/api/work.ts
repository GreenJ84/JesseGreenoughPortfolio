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
  const handlerOutput = APIHandler(req, false);
  if (handlerOutput[0] !== "success") {
    return res.status(400).json({ error: handlerOutput[0] });
  }
  const { type, offset } = handlerOutput[1]!;

  let results: workType[] = [];
  switch (type) {
    case "primary":
      results = await workService.getPrimaryWork(offset);
      break;
    case "secondary":
      results = await workService.getSecondaryWork(offset);
      break;
    default:
      res.status(404).send("Not Found");
      return;
  }

  res.status(200).json(results as workType[]);
}
