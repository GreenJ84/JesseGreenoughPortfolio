/** @format */

import React from 'react';
// import { Preloader } from "../components/Layout/LayoutExtras";

const css = require('./_components/Layout/Layout.module.css');

export default function Loading() {
  return (
    <main className={css.pageLoadingContainer}>
      <div className={css.pageLoading}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </main>
  );
}
