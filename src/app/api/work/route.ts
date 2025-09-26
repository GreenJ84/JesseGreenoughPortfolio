/** @format */

import { NextRequest, NextResponse } from "next/server";

import * as workService from "../../(portfolio)/work/workService";

export async function GET(
  req: NextRequest
) {
  const searchParams = req.nextUrl.searchParams;
  let type = searchParams.get('type');
  if (!type) type = "primary"

  let offset = 0;
  const offsetParam = searchParams.get('offset');
  if (!!offsetParam){
    try { offset = parseInt(offsetParam); }
    catch {}
  }

  let results: workService.workType[] = [];
  switch (type) {
    case "primary":
      results = await workService.getPrimaryWork(offset);
      break;
    case "secondary":
      results = await workService.getSecondaryWork(offset);
      break;
    default:
      return NextResponse.json("Not Found", { status: 500 });
  }

  return NextResponse.json(results, { status: 200 });
}
