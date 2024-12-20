/** @format */

import { NextRequest, NextResponse } from "next/server";

import * as resumeService from "../../resumes/resumeService";


export async function GET(
  req: NextRequest,
) {
  const searchParams = req.nextUrl.searchParams;
  let type = searchParams.get('type');
  if (!type) type = "all";;

  let offset = 0;
  const offsetParam = searchParams.get('offset');
  if (!!offsetParam){
    try { offset = parseInt(offsetParam); }
    catch {}
  }
  const filter = searchParams.get('filter');


  let results: resumeService.resumeType[] = [];
  switch (type) {
    case "category":
      if (!filter) return NextResponse.json("Must have a filter string parameter for a category selection", { status: 400 });
      results = await resumeService.getResumesByCategory(filter!, offset);
      break;
    default:
      results = await resumeService.getResumes(offset);
      break;
  }
  return NextResponse.json(results, { status: 200 });
}
