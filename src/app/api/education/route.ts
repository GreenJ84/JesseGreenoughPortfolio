/** @format */

import { NextRequest, NextResponse } from "next/server";
import { getEducationData } from "../../education/educationService";

export async function GET(
  req: NextRequest,
) {
  const searchParams = req.nextUrl.searchParams;
  let offset = 0;
  let offsetParam = searchParams.get('offset');
  if (!!offsetParam){
    try { offset = parseInt(offsetParam); }
    catch {}
  }

  const results = await getEducationData(offset);

  return NextResponse.json(results);
}
