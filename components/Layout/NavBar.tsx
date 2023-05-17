/** @format */

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "react-bootstrap/Navbar";

import NavBarBrand from "./NavBarBrand";
import NavBarCollapse from "./NavBarCollapse";

const css = require("./NavBar.module.css");

const NavBar = (props: { mode: Function; theme: String }) => {
  // For NavBar Accordian on small screens
  const [expandBar, setExpandBar] = useState(false);

  // For fading as you scroll
  const [navFade, setNavFade] = useState(false);

  // Starting at the top on every new page selected
  const { pathname } = useRouter();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Response listeners for window changes
  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY >= 60) {
        setNavFade(true);
      } else {
        setNavFade(false);
      }
    };
    window.addEventListener("scroll", scrollHandler);

    const sizeHandler = () => {
      if (window.innerWidth > 900) {
        setExpandBar(false);
      }
    };
    sizeHandler();
    window.addEventListener("resize", sizeHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("resize", sizeHandler);
    };
  }, []);

  return (
    <Navbar
      expanded={expandBar}
      fixed="top"
      expand="md"
      className={navFade ? css.sticky : css.navbar}
      id="navbar"
    >
      <NavBarBrand
        theme={props.theme}
        mode={props.mode}
      />
      <NavBarCollapse toggle={[expandBar, setExpandBar]} />
      <Navbar.Toggle
        id="navbarToggle"
        className={expandBar ? css.navbarToggler : css.navbarTogglerClosed}
        aria-controls="responsive-navbar-nav"
        onClick={() => {
          setExpandBar(expandBar ? false : true);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </Navbar.Toggle>
    </Navbar>
  );
};

export default NavBar;
