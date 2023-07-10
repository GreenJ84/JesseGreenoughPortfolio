/** @format */

import { NextApiRequest, NextApiResponse } from "next";
import { workCollectionService, workType } from "../../utils/dataTypes";

const workService = new workCollectionService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { type, offset } = req.body;
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
      break;
  }

  res.status(200).json(results);
}
