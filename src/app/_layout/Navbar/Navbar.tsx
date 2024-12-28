/** @format **/

import React from 'react';
import Link from 'next/link';

import { CgGitFork } from 'react-icons/cg';

import Navigation from '../Navigation';
import ThemeSwitch from './ThemeSwitch';
import NavbarToggle, { handleNavbarToggle } from './NavbarToggle';

const css = require('./Navbar.module.css');

const Navbar = () => {
  return (
    <header className={css.header}>
      <Link
        id='navbarBrand'
        className={css.navBarBrand}
        aria-label='Home Return'
        replace={true}
        href='/'
      >
        <h1>GreenO</h1>
      </Link>
      <nav
        id='navbarCollapse'
        className={`${css.navbarCollapse} ${css.collapsed}`}
      >
        <ul className={css.navbarNav}>
          <Navigation icon={true} callback={handleNavbarToggle} />
        </ul>
        <ThemeSwitch />
      </nav>
      <Link
        title="Visit this project's Github Repository"
        aria-label="Project Repository Link"
        href='https://github.com/GreenJ84'
        target='_blank'
        className={css.githubBtn}
      >
        <CgGitFork className={css.forkIcon} />
      </Link>
      <NavbarToggle />
    </header>
  );
};

export default Navbar;
