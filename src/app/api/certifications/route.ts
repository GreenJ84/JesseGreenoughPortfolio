/** @format */

import { NextRequest, NextResponse } from "next/server";

import { CertificationType } from "@/app/_lib/_types";
import * as CertificationService from "@/app/_actions/certificationService";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const type = searchParams.get("type") ?? "top";

  const offsetRaw = searchParams.get("offset") ?? "0";
  const offset = Number.isNaN(Number(offsetRaw)) ? 0 : parseInt(offsetRaw, 10);

  const filter = searchParams.get("filter") ?? "";

  try {
    let results: CertificationType[] = [];

    switch (type) {
      case "top":
        results = await CertificationService.getTopCertifications();
        break;
      case "all":
        results = await CertificationService.getAllCertifications(offset);
        break;
      case "issuer":
        if (!filter) {
          return NextResponse.json({ error: "issuer filter required" }, { status: 400 });
        }
        results = await CertificationService.getCertificationsByIssuer(filter, offset);
        break;
      case "tech":
        if (!filter) {
          return NextResponse.json({ error: "tech filter required" }, { status: 400 });
        }
        results = await CertificationService.getCertificationsByTech(filter, offset);
        break;
      default:
        return NextResponse.json({ error: "invalid type parameter" }, { status: 400 });
    }

    return NextResponse.json(results);
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
