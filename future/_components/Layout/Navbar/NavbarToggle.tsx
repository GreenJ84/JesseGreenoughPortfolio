/** @format */

'use client';
import React from 'react';

// Custom Functionality
const css = require('./Navbar.module.css');

const NavbarToggle = () => {
  const handleClick = ( e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    document.getElementById('navbarToggle')!.classList.toggle(
      css.closed,
    );
    document.getElementById('navbarCollapse')!.classList.toggle(
      css.collapsed,
    );
  };
  return (
    <button
      id='navbarToggle'
      className={`${css.navbarToggler} ${css.closed}`}
      aria-label='Toggle navigation menu'
      aria-controls='navbarMenu'
      onClick={handleClick}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

export default NavbarToggle;
