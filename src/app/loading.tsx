/** @format */

import React from 'react';

const css = require('./_components/Layout/Shared/layout.module.css');

export default function Loading() {
  return (
    <main className={css.pageLoadingContainer}>
      <div className={css.pageLoading}>
        <span className={css.span}></span>
        <span className={css.span}></span>
        <span className={css.span}></span>
      </div>
    </main>
  );
}
