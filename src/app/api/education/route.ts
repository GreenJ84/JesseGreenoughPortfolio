/** @format */

import { NextRequest, NextResponse } from "next/server";
import { getEducation } from "@/app/_actions/educationService";

export async function GET(
  req: NextRequest,
) {
  const searchParams = req.nextUrl.searchParams;

  const offsetRaw = searchParams.get("offset") ?? "0";
  const offset = Number.isNaN(Number(offsetRaw)) ? 0 : parseInt(offsetRaw, 10);

  const results = await getEducation(offset);

  return NextResponse.json(results);
}
