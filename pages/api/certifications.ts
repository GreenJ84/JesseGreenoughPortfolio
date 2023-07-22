/** @format */

import { NextApiRequest, NextApiResponse } from "next";
import {
  certificationCollectionService,
  certificationType,
} from "../../utils/services/educationService";
import { APIHandler } from "./projects";

const certificationService = new certificationCollectionService();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const handleOutput = APIHandler(req);
  if (handleOutput !== "success") { 
    return res.status(400).json({ error: handleOutput });
  }

  const { type, filter, offset } = req.query;

  let results: certificationType[] = [];
  switch (type) {
    case "all":
      results = await certificationService.getUnsortedCertification(parseInt(offset! as string));
      break;
    case "issuer":
      results = await certificationService.getCertificationByIssuer(
        filter as string,
        parseInt(offset! as string)
      );
      break;
    case "tech":
      results = await certificationService.getCertificationByTech(
        filter as string,
        parseInt(offset! as string)
      );
      break;
    default:
      res.status(404).send("Not Found");
      break;
  }

  res.status(200).json(results);
}
