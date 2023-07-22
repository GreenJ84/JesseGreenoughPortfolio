/** @format */

import { NextApiRequest, NextApiResponse } from "next";
import {
  educationCollectionService,
  educationType,
} from "../../utils/services/educationService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(400).json({ error: "Bad Request" });
  }
  const { offset } = req.query;

  if (!offset) {
    return "Bad Request";
  }

  if (Array.isArray(offset)) {
    return res.status(400).json({ error: "Offset not a single value" });
  }

  let offsetNum = 0;
  try {
    offsetNum = parseInt(offset as string);
    if (isNaN(offsetNum)) {
      throw new Error("");
    }
  } catch (error) {
    return res.status(400).json({ error: "Offset not a valid Int" });
  }

  const results = await educationCollectionService.getEducationData(offsetNum);

  res.status(200).json(results[0] as educationType[]);
}
