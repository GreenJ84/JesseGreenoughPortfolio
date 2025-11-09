import { NextRequest, NextResponse } from "next/server";

import { ProjectType } from "@/app/_lib/_types";
import { getProjectsByCategory, getProjectsByTech, getAllProjects } from "@/app/_actions/projectService";

export async function GET (req: NextRequest){
  const searchParams = req.nextUrl.searchParams;
  const type = searchParams.get('type') ?? 'all';

  const offsetRaw = searchParams.get("offset") ?? "0";
  const offset = Number.isNaN(Number(offsetRaw)) ? 0 : parseInt(offsetRaw, 10);

  const filter = searchParams.get('filter');

  try {
    let results: ProjectType[] = [];
    switch (type) {
      case "all":
        results = await getAllProjects(offset);
        break;
      case "category":
        if (!filter) {
          return NextResponse.json({error: "Requesting projects of a certain category requires the category filter"}, {status: 404});
        }
        results = await getProjectsByCategory(filter!, offset);
        break;
      case "tech":
        if (!filter) {
          return NextResponse.json({error: "Requesting projects of a certain tech requires the tech filter"}, {status: 404});
        }
        results = await getProjectsByTech(filter!, offset);
        break;
      default:
        return NextResponse.json({error: "Server cannot handle untyped request"}, {status: 500});
    }

    return NextResponse.json(results, {status: 200});
  } catch (err) {
    return NextResponse.json({error: "Internal server error"}, {status: 500});
  }
}