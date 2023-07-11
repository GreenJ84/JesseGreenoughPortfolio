/** @format */

import { NextApiRequest, NextApiResponse } from "next";
import {
  certificationCollectionService,
  certificationType,
} from "../../utils/services/educationService";

const certificationService = new certificationCollectionService();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type, filter, offset } = req.body;

  let results: certificationType[] = [];
  switch (type) {
    case "all":
      results = await certificationService.getUnsortedCertification(offset);
      break;
    case "issuer":
      results = await certificationService.getCertificationByIssuer(
        filter,
        offset
      );
      break;
    case "tech":
      results = await certificationService.getCertificationByTech(
        filter,
        offset
      );
      break;
    default:
      res.status(404).send("Not Found");
      break;
  }

  res.status(200).json(results);
}
