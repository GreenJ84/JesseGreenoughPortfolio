import { requireOwnerPage } from '@/app/_security/ownerPage';
import { DB, DB_INFO } from '@/app/_utils/Database';
import { ownerPasskeys } from '@/app/_security/passkeys';
import Link from 'next/link';
import Navigation from '../_components/Navigation';
import styles from './Admin.module.css';

const destinations = [
  { label: 'Projects', href: '/admin/data/projects', collection: DB_INFO.collections.PROJ },
  { label: 'Certifications', href: '/admin/data/certifications', collection: DB_INFO.collections.CERT },
  { label: 'Education', href: '/admin/data/education', collection: DB_INFO.collections.EDU },
  { label: 'Work', href: '/admin/data/work', collection: DB_INFO.collections.WORK },
] as const;

export default async function AdminDashboard() {
  await requireOwnerPage();
  const [ping, counts, keys] = await Promise.all([
    DB.command({ ping: 1 }).then(() => true).catch(() => false),
    Promise.all(destinations.map(async destination => ({ ...destination, count: await DB.collection(destination.collection).countDocuments() + (destination.label === 'Work' ? await DB.collection(DB_INFO.collections.SWORK).countDocuments() : 0) }))).catch(() => []),
    ownerPasskeys().then(value => value.length).catch(() => 0),
  ]);
  return <><Navigation /><main className={styles.adminContainer}>
    <header className={styles.adminHeader}>
      <div><h1>Portfolio admin</h1><p>Manage published content and review site status.</p></div>
      <Link href="/" target="_blank">View public site</Link>
    </header>
    <section aria-labelledby="contentHeading">
      <h2 id="contentHeading">Content</h2>
      <div className={styles.adminGrid}>
        {destinations.map(destination => <Link key={destination.href} href={destination.href} className={styles.adminCard}>
          <h3>{destination.label}</h3>
          <p>{counts.find(item => item.href === destination.href)?.count ?? 'Unavailable'} records</p>
          <span>Open manager →</span>
        </Link>)}
      </div>
    </section>
    <section className={styles.quickStats} aria-labelledby="statusHeading">
      <h2 id="statusHeading">System status</h2>
      <p role="status">Database: {ping ? 'Connected' : 'Unavailable'}</p>
      <p>Owner passkeys: {keys}. <Link href="/admin/settings">Manage sign-in</Link></p>
      <p><Link href="/admin/analytics">View traffic and alerts</Link></p>
    </section>
  </main></>;
}
