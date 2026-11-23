import { NextRequest, NextResponse } from 'next/server';
import { publicRoutes, recordVisit, type PublicRoute } from '@/app/_observability/metrics';
import { rateLimit } from '@/app/_security/rateLimit';
import { boundedJson, BodyTooLargeError, UnsupportedMediaError } from '@/app/_security/request';
export async function POST(request: NextRequest) {
  if (request.headers.get('origin') !== request.nextUrl.origin) return new Response(null, { status: 403 });
  let route: unknown;
  try { route = (await boundedJson(request, 128) as { route?: unknown }).route; }
  catch (error) { return new Response(null, { status: error instanceof BodyTooLargeError ? 413 : error instanceof UnsupportedMediaError ? 415 : 400 }); }
  if (typeof route !== 'string' || !publicRoutes.includes(route as PublicRoute)) return new Response(null, { status: 400 });
  try {
    await rateLimit('visitor-metric-global', 'public', 10000, 86400);
    await recordVisit(route as PublicRoute);
    return new Response(null, { status: 204 });
  } catch { return NextResponse.json({ error: 'Metrics unavailable' }, { status: 503 }); }
}
