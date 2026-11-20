import { NextRequest, NextResponse } from "next/server";
import { queryInput } from "@/app/_security/query";
import { ValidationError } from "@/app/_security/validation";
import { getEducation } from "@/app/_actions/educationService";

export async function GET(req: NextRequest) {
  try {
    const { offset } = queryInput(req.nextUrl.searchParams, ["all"], "all");
    const results = await getEducation(offset);
    return NextResponse.json(results);
  } catch (error) {
    if (error instanceof ValidationError) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
