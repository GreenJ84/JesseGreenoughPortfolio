import { NextRequest, NextResponse } from "next/server";
import { queryInput } from "@/app/_security/query";
import { ValidationError } from "@/app/_security/validation";
import * as service from "../../(portfolio)/resumes/resumeService";

export async function GET(req: NextRequest) {
  try {
    const { type, offset, filter } = queryInput(req.nextUrl.searchParams, ["all", "category", "top"], "all");
    const results = type === "category" ? await service.getResumesByCategory(filter!, offset) : type === "top" ? await service.getTopResumes(offset) : await service.getResumes(offset);
    return NextResponse.json(results);
  } catch (error) {
    if (error instanceof ValidationError) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
