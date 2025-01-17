/** @format */
'use client';
import React from 'react';

const css = require('./Navbar.module.css');

export const handleNavbarToggle = () => {
  document.getElementById('navbarToggle')!.classList.toggle(
    css.closed,
  );
  document.getElementById('navbarCollapse')!.classList.toggle(
    css.collapsed,
  );
};
const NavbarToggle = () => {
  return (
    <button
      id='navbarToggle'
      className={`${css.navbarToggler} ${css.closed}`}
      title="Menu"
      aria-label='Toggle navigation menu'
      aria-controls='navbarMenu'
      onClick={handleNavbarToggle}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

export default NavbarToggle;
