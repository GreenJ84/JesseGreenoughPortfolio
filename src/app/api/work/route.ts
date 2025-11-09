/** @format */

import { NextRequest, NextResponse } from "next/server";

import { WorkType } from "@/app/_lib/_types";
import * as workService from "@/app/_actions/workService";

export async function GET(
  req: NextRequest
) {
  const searchParams = req.nextUrl.searchParams;
  let type = searchParams.get('type') ?? 'primary';

  const offsetRaw = searchParams.get("offset") ?? "0";
  const offset = Number.isNaN(Number(offsetRaw)) ? 0 : parseInt(offsetRaw, 10);

  let results: WorkType[] = [];
  switch (type) {
    case "primary":
      results = await workService.getWorkByCategory("primary", offset);
      break;
    case "secondary":
      results = await workService.getWorkByCategory("secondary", offset);
      break;
    default:
      return NextResponse.json("Not Found", { status: 500 });
  }

  return NextResponse.json(results, { status: 200 });
}
