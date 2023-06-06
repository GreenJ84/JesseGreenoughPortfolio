/** @format */
/* eslint-disable react/jsx-key */

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button, Nav, Navbar } from "react-bootstrap";
import Particle from "./Particle";

import {
  AiFillStar,
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
} from "react-icons/ai";
import { CgFileDocument, CgGitFork } from "react-icons/cg";
import { ImBlog } from "react-icons/im";

import { AppContext, WindowWidth } from "../../Utils/AppContext";

const logo1 = "/assets/logo.png";
const logo2 = "/assets/CyberHedera1.png";
const css = require("./NavBar.module.css");

const NavLinkData = [
  ["/", <AiOutlineHome className={css.navIcon} />, "Home"],
  ["/about", <AiOutlineUser className={css.navIcon} />, "About"],
  [
    "/projects",
    <AiOutlineFundProjectionScreen className={css.navIcon} />,
    "Projects",
  ],
  ["/experience", <ImBlog className={css.navIcon} />, "Experience"],
  ["/resume", <CgFileDocument className={css.navIcon} />, "Resume"],
];

const NavBar = () => {
  const { windowWidth, theme, setTheme } = React.useContext(AppContext);

  // Control Navigation Rendering
  const [expandedNav, setExpandedNav] = useState(true);
  const [navFade, setNavFade] = useState(false);

  useEffect(() => {
    if (windowWidth !== WindowWidth.SMALL) {
      setExpandedNav(true);
    }
  }, [windowWidth]);

  // Scroll mapping for Navigation display
  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY >= 60) {
        setNavFade(true);
      } else {
        setNavFade(false);
      }
    };
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <>
      {theme == "dark" && <Particle theme="dark" />}
      {theme == "light" && <Particle theme="light" />}
      <Navbar
        expanded={expandedNav}
        fixed="top"
        expand="md"
        className={navFade ? css.sticky : css.navbar}
        id="navbar"
      >
        {/* Developer NFT Theme Changing Logo */}
        <Navbar.Brand
          id="navbarBrand"
          className={css.navBarBrand}
          aria-label="Click to change Color Theme"
          href="/"
        >
          <Image
            src={theme === "dark" ? logo1 : logo2}
            id="themeLogo"
            className={css.themeLogo}
            alt="Developer NFT Brand logo"
            width={250}
            height={250}
          />
        </Navbar.Brand>

        {/* Collapse-able Navbar Links */}
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className={css.navbarCollpase}
        >
          <Nav
            className={
              windowWidth === WindowWidth.LARGE
                ? css.navbarNav
                : expandedNav
                ? css.navbarNav
                : css.navClosed
            }
            defaultActiveKey="#home"
          >
            {NavLinkData.map((item, idx) => {
              return (
                <Nav.Item
                  key={idx}
                  className={css.navItem}
                >
                  <Nav.Link
                    as={Link}
                    href={item[0] as string}
                    className={css.navLink}
                    rel="noreferrer"
                    onClick={() => setExpandedNav(false)}
                  >
                    {item[1]}
                    {item[2]}
                  </Nav.Link>
                </Nav.Item>
              );
            })}
            {windowWidth === WindowWidth.LARGE && (
              <Nav.Item className={css.navFork}>
                <Button
                  href="https://github.com/GreenJ84"
                  target="_blank"
                  className="github-btn-inner center"
                >
                  <CgGitFork className={css.forkIcon} />{" "}
                  <AiFillStar className={css.forkIcon} />
                </Button>
              </Nav.Item>
            )}
          </Nav>
          <label className={css.themeSwitch}>
            <input
              className={css.themeInput}
              type="checkbox"
              checked={theme === "dark"}
              data-theme-toggle
              onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                setTheme();
              }}
            />
            <span className={css.themeSlider}></span>
          </label>
        </Navbar.Collapse>

        {/* Navbar Collpase Menu Toggle */}
        <Navbar.Toggle
          id="navbarToggle"
          className={expandedNav ? css.navbarToggler : css.navbarTogglerClosed}
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            setExpandedNav(expandedNav ? false : true);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
      </Navbar>
    </>
  );
};

export default NavBar;
