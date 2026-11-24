import { NextRequest, NextResponse } from "next/server";
import { queryInput } from "@/app/_security/query";
import { ValidationError } from "@/app/_security/validation";
import * as service from "@/app/_actions/certificationService";

export async function GET(req: NextRequest) {
  try {
    const { type, offset, filter, secondFilter } = queryInput(req.nextUrl.searchParams, ["top", "all", "issuer", "tech", "combined"], "top");
    const results = type === "combined" ? await service.getCertificationsByIssuerAndTech(filter!, secondFilter!, offset) : type === "issuer" ? await service.getCertificationsByIssuer(filter!, offset) : type === "tech" ? await service.getCertificationsByTech(filter!, offset) : type === "all" ? await service.getAllCertifications(offset) : await service.getTopCertifications();
    return NextResponse.json(results);
  } catch (error) {
    if (error instanceof ValidationError) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
