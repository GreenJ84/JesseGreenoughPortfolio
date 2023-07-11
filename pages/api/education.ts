/** @format */

import { NextApiRequest, NextApiResponse } from "next";
import { educationCollectionService, educationType } from "../../utils/dataTypes";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { offset } = req.body;

  let results = await educationCollectionService.getEducationData(offset);

  res.status(200).json(results[0]);
}
