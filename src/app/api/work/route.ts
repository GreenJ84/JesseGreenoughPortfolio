import { NextRequest, NextResponse } from "next/server";
import { queryInput } from "@/app/_security/query";
import { ValidationError } from "@/app/_security/validation";
import * as service from "@/app/_actions/workService";

export async function GET(req: NextRequest) {
  try {
    const { type, offset } = queryInput(req.nextUrl.searchParams, ["primary", "secondary"], "primary");
    const results = await service.getWorkByCategory(type as "primary" | "secondary", offset);
    return NextResponse.json(results);
  } catch (error) {
    if (error instanceof ValidationError) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
