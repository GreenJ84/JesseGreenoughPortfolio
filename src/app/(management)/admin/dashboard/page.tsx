import React from 'react';
import Link from 'next/link';

import LogoutButton from '../Logout';
import styles from './Admin.module.css';

const AdminPage = () => {

  return (
    <div className={styles.adminContainer}>
      <header className={styles.adminHeader}>
        <h1>Admin Dashboard</h1>
        <LogoutButton />
      </header>

      <div className={styles.adminGrid}>
        <div className={styles.adminCard}>
          <h2>Website Analytics</h2>
          <p>View website metrics and visitor statistics</p>
          <Link href="/admin/analytics" className={styles.cardButton}>
            Go to Analytics
          </Link>
        </div>

        <div className={styles.adminCard}>
          <h2>Data Management</h2>
          <p>Manage projects, education, work experience, and skills</p>
          <Link href="/admin/data" className={styles.cardButton}>
            Manage Data
          </Link>
        </div>

        <div className={styles.adminCard}>
          <h2>Settings</h2>
          <p>Configure admin settings and preferences</p>
          <Link href="/admin/settings" className={styles.cardButton}>
            Settings
          </Link>
        </div>
      </div>

      <div className={styles.quickStats}>
        <h2>Quick Stats</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>Projects</h3>
            <p className={styles.statNumber}>12</p>
          </div>
          <div className={styles.statCard}>
            <h3>Skills</h3>
            <p className={styles.statNumber}>25</p>
          </div>
          <div className={styles.statCard}>
            <h3>Work Experience</h3>
            <p className={styles.statNumber}>5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;