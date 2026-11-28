import Link from 'next/link';

import LogoutButton from '../Logout';

import css from './Navigation.module.css';

const AdminNavigation = () => {
  return (
    <nav className={css.navigation}>
      <div className={css.navBrand}>
        <Link href="/admin/dashboard">Portfolio Admin</Link>
      </div>
      <div className={css.navLinks}>
        <Link href="/admin/dashboard" className={css.navLink}>Overview</Link>
        <Link href="/admin/data" className={css.navLink}>
          Data
        </Link>
        <Link href="/admin/analytics" className={css.navLink}>
          Analytics
        </Link>
        <Link href="/admin/settings" className={css.navLink}>
          Settings
        </Link>
      </div>

      <div className={css.logoutForm}>
        <LogoutButton label="Logout" className={css.logoutButton} />
      </div>
    </nav>
  );
};

export default AdminNavigation;
