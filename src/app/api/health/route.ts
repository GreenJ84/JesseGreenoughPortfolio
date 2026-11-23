import { DB } from '@/app/_utils/Database';
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    await DB.command({ ping: 1 });
    return new Response('ok', { status: 200, headers: { 'cache-control': 'no-store' } });
  } catch {
    return new Response('unavailable', { status: 503, headers: { 'cache-control': 'no-store' } });
  }
}
