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
  if (handleOutput[0] !== "success") {
    return res.status(400).json({ error: handleOutput[0] });
  }

  const { type, filter, offset } = handleOutput[1]!;

  let results: certificationType[] = [];
  switch (type) {
    case "all":
      results = await certificationService.getUnsortedCertification(offset);
      break;
    case "issuer":
      results = await certificationService.getCertificationByIssuer(
        filter!,
        offset
      );
      break;
    case "tech":
      results = await certificationService.getCertificationByTech(
        filter!,
        offset
      );
      break;
    default:
      res.status(404).send("Not Found");
      break;
  }

  res.status(200).json(results as certificationType[]);
}
