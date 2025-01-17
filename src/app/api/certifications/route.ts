/** @format */

import { NextRequest, NextResponse } from "next/server";

import * as certificationService from "../../education/certificationService";

export async function GET(
  req: NextRequest,
) {
  const searchParams = req.nextUrl.searchParams;
  const type = searchParams.get('type');
  if (!type) return NextResponse.json(await certificationService.getTopCertifications(), {status: 200});

  let offset = 0;
  let offsetParam = searchParams.get('offset');
  if (!!offsetParam){
    try { offset = parseInt(offsetParam); }
    catch {}
  }
  const filter = searchParams.get('filter');

  let results: certificationService.certificationType[] = [];
  switch (type) {
    case "all":
      results = await certificationService.getUnsortedCertifications(offset);
      break;
    case "issuer":
      if (!filter) {
        return NextResponse.json("Requesting certifications of a certain issuer requires the issuer filter", {status: 404});
      }
      results = await certificationService.getCertificationsByIssuer(
        filter!,
        offset
      );
      break;
    case "tech":
      if (!filter) {
        return NextResponse.json("Requesting certifications of a certain tech requires the tech filter", {status: 404});
      }
      results = await certificationService.getCertificationsByTech(
        filter!,
        offset
      );
      break;
    default:
      return NextResponse.json("Server cannot handle untyped request", {status: 500});
      break;
  }

  return NextResponse.json(results, {status: 200});
}
