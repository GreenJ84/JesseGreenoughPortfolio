/** @format */
'use client';

import React, { useContext } from 'react';

import { AppContext } from '../../../_utils/AppContext';

const css = require('./Navbar.module.css');

const ThemeSwitch = () => {
  const { theme, setTheme } = useContext(AppContext);

  return (
    <label
      aria-label='Toggle Day and Night themes'
      className={css.themeSwitch}
    >
      <input
        id='themeChange'
        aria-labelledby='themeChange'
        className={css.themeInput}
        type='checkbox'
        aria-checked={theme === 'dark'}
        defaultChecked={theme === 'dark'}
        data-theme-toggle
        onClick={() => {
          setTheme();
        }}
      />
      <span
        aria-controls='themeChange'
        className={css.themeSlider}
      ></span>
    </label>
  );
};

export default ThemeSwitch;
