import 'server-only';
import { DB } from '../_utils/Database';
export const publicRoutes = ['/', '/about', '/skills', '/projects', '/education', '/work', '/resumes'] as const;
export type PublicRoute = typeof publicRoutes[number];
interface DailyVisit { _id: string; route: PublicRoute; day: string; views: number }
interface AdminEvent { at: Date; action: string; entity: string; recordId?: string; owner: string }
const visits = DB.collection<DailyVisit>('visitorDailyViews');
const events = DB.collection<AdminEvent>('adminAuditEvents');
export async function recordVisit(route: PublicRoute) {
  const day = new Date().toISOString().slice(0, 10);
  await visits.updateOne({ _id: `${day}:${route}` }, { $inc: { views: 1 }, $setOnInsert: { day, route } }, { upsert: true });
}
export async function recentVisits(days = 7) {
  const since = new Date(Date.now() - (days - 1) * 86400000).toISOString().slice(0, 10);
  return visits.find({ day: { $gte: since } }).sort({ day: -1 }).toArray();
}
export async function recordAdminEvent(owner: string, action: 'create' | 'update' | 'delete', entity: string, recordId?: string) {
  try { await events.insertOne({ at: new Date(), owner, action, entity, recordId }); }
  catch { console.error('Admin audit event could not be stored'); }
}
export async function recentAdminEvents() {
  return events.find({}, { projection: { _id: 0 } }).sort({ at: -1 }).limit(20).toArray();
}
