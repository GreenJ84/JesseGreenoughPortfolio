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
  const { offset } = req.body;

  const results = await educationCollectionService.getEducationData(offset);

  res.status(200).json(results[0]);
}
