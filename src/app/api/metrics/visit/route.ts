import { NextRequest, NextResponse } from 'next/server';
import { publicRoutes, recordVisit, type PublicRoute } from '@/app/_observability/metrics';
import { rateLimit } from '@/app/_security/rateLimit';
export async function POST(request: NextRequest) {
  if (request.headers.get('origin') !== request.nextUrl.origin) return new Response(null, { status: 403 });
  if (request.headers.get('content-type')?.split(';')[0] !== 'application/json') return new Response(null, { status: 415 });
  const raw = await request.text();
  if (raw.length > 128) return new Response(null, { status: 413 });
  let route: unknown;
  try { route = JSON.parse(raw).route; } catch { return new Response(null, { status: 400 }); }
  if (typeof route !== 'string' || !publicRoutes.includes(route as PublicRoute)) return new Response(null, { status: 400 });
  try {
    await rateLimit('visitor-metric-global', 'public', 10000, 86400);
    await recordVisit(route as PublicRoute);
    return new Response(null, { status: 204 });
  } catch { return NextResponse.json({ error: 'Metrics unavailable' }, { status: 503 }); }
}
