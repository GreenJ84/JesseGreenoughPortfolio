import { NextRequest, NextResponse } from "next/server";

import { getProjectsByCategory, getProjectsByTech, getTopProjects, getUnsortedProjects, projectType } from "../../projects/projectService";

export async function GET (req: NextRequest){
  const searchParams = req.nextUrl.searchParams;
  const type = searchParams.get('type');
  if (!type) return NextResponse.json(await getTopProjects(), {status: 200});

  let offset = 0;
  let offsetParam = searchParams.get('offset');
  if (!!offsetParam){
    try { offset = parseInt(offsetParam); }
    catch {}
  }
  const filter = searchParams.get('filter');

  let results: projectType[] = [];
  switch (type) {
    case "all":
      results = await getUnsortedProjects(offset);
      break;
    case "category":
      if (!filter) {
        return NextResponse.json("Requesting projects of a certain category requires the category filter", {status: 404});
      }
      results = await getProjectsByCategory(filter!, offset);
      break;
    case "tech":
      if (!filter) {
        return NextResponse.json("Requesting projects of a certain tech requires the tech filter", {status: 404});
      }
      results = await getProjectsByTech(filter!, offset);
      break;
    default:
      return NextResponse.json("Server cannot handle untyped request", {status: 500});
  }
  return NextResponse.json(results, {status: 200});
}