import Link from 'next/link';
import { requireOwnerPage } from '@/app/_security/ownerPage';
import { recentVisits, recentAdminEvents, publicRoutes } from '@/app/_observability/metrics';
import { recentAlerts } from '@/app/_observability/alerts';
import { DB } from '@/app/_utils/Database';
import { ownerPasskeys } from '@/app/_security/passkeys';
import Navigation from '../_components/Navigation';

export default async function AnalyticsPage() {
  await requireOwnerPage();
  const [visits, events, operationalAlerts, database, keys] = await Promise.all([
    recentVisits().catch(() => []),
    recentAdminEvents().catch(() => []),
    recentAlerts().catch(() => []),
    DB.command({ ping: 1 }).then(() => true).catch(() => false),
    ownerPasskeys().then(value => value.length).catch(() => 0),
  ]);
  const total = visits.reduce((sum, item) => sum + item.views, 0);
  const alerts = [
    ...(!database ? ['Database unavailable'] : []),
    ...(!process.env.USER_EMAIL || !process.env.USER_PASS || !process.env.CONTACT_EMAIL ? ['Contact email is not configured'] : []),
    ...(keys < 2 ? ['Add a second owner passkey for recovery'] : []),
    ...operationalAlerts.map(alert => `${alert.kind}: ${alert.count} event(s) at ${alert.lastAt.toISOString()}`),
  ];
  return <><Navigation /><main style={{ maxWidth: 1000, margin: '2rem auto', padding: '1rem', color: 'var(--text-primary)' }}>
    <h1>Site metrics and alerts</h1>
    <p>Last seven UTC days: {total.toLocaleString()} recorded page views. Counts are approximate and exclude browsers with Do Not Track. No visitor identity, cookie, or IP address is stored for these counts.</p>
    <section aria-labelledby="routesHeading"><h2 id="routesHeading">Views by page</h2><ul>
      {publicRoutes.map(route => <li key={route}><Link href={route}>{route}</Link>: {visits.filter(item => item.route === route).reduce((sum, item) => sum + item.views, 0).toLocaleString()}</li>)}
    </ul></section>
    <section aria-labelledby="alertsHeading"><h2 id="alertsHeading">Current alerts</h2>
      {alerts.length ? <ul>{alerts.map(alert => <li key={alert}>{alert}</li>)}</ul> : <p>All configured checks are healthy.</p>}
    </section>
    <section aria-labelledby="eventsHeading"><h2 id="eventsHeading">Recent content changes</h2>
      {events.length ? <ol>{events.map((event, index) => <li key={`${event.at.toISOString()}-${index}`}>{event.at.toISOString()}: {event.action} {event.entity}{event.recordId ? ` (${event.recordId})` : ''}</li>)}</ol> : <p>No recorded changes yet.</p>}
    </section>
  </main></>;
}
