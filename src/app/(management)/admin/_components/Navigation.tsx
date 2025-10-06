import React from 'react';
import Link from 'next/link';

import { logoutAction } from '../../../_actions/auth';

import css from './Navigation.module.css';

const AdminNavigation = () => {
  return (
    <nav className={css.navigation}>
      <div className={css.navBrand}>
        <Link href="/admin/dashboard">Portfolio Admin</Link>
      </div>
      <div className={css.navLinks}>
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

      <form action={logoutAction} className={css.logoutForm}>
        <button type="submit" className={css.logoutButton}>
          Logout
        </button>
      </form>
    </nav>
  );
};

export default AdminNavigation;