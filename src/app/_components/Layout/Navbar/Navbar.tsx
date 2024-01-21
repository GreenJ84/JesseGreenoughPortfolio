/**
 * eslint-disable react/jsx-key
 *
 * @format
 */

// Third party Functionality
import React from 'react';
import Link from 'next/link';

// Custom Functionality
import ThemeSwitch from './ThemeSwitch';
import NavbarToggle from './NavbarToggle';
import Navigation from '../Navigation';
import { CgGitFork } from 'react-icons/cg';
const css = require('./Navbar.module.css');

const Navbar = () => {
  return (
    <header>
      <nav
        id='navbar'
        className={css.navbar}
      >
        <Link
          id='navbarBrand'
          className={css.navBarBrand}
          aria-label='Home Return'
          replace={true}
          href='/'
        >
          <h1>GreenO</h1>
        </Link>

        {/* Collapse-able Navbar Links */}
        <div
          id='navbarCollapse'
          className={`${css.navbarCollapse} ${css.collapsed}`}
        >
          <ul className={css.navbarNav}>
            <Navigation icon={true} />
            <li className={css.github}>
              <Link
                aria-label="Visit this project's Github Repository"
                href='https://github.com/GreenJ84'
                target='_blank'
                className={css.githubBtn}
              >
                <CgGitFork className={css.forkIcon} />
              </Link>
            </li>
          </ul>
          <ThemeSwitch />
        </div>
        <NavbarToggle />
      </nav>
    </header>
  );
};

export default Navbar;
