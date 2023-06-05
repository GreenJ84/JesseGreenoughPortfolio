/** @format */
/* eslint-disable react/jsx-key */

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import useLocalStorage from "use-local-storage";

import { Button, Nav, Navbar } from "react-bootstrap";

import {
  AiFillStar,
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
} from "react-icons/ai";
import { CgFileDocument, CgGitFork } from "react-icons/cg";
import { ImBlog } from "react-icons/im";

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
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  // Control Navigation Rendering
  const [wideScreen, setWideScreen] = useState(true);
  const [expandedNav, setExpandedNav] = useState(false);
  const [navFade, setNavFade] = useState(false);

  // Grab User theme preference on initial app load
  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(matchMedia.matches ? "dark" : "light");
  }, [setTheme]);

  // Theme change handling
  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);
  const switchMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Window Scroll handler for page transitions
  const { pathname } = useRouter();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Scroll mapping for Navigation display
  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY >= 60) {
        setNavFade(true);
      } else {
        setNavFade(false);
      }
    };
    const sizeHandler = () => {
      if (window.innerWidth > 900) {
        setExpandedNav(false);
        setWideScreen(true);
      } else {
        setWideScreen(false);
      }
    };
    sizeHandler();
    window.addEventListener("resize", sizeHandler);

    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("resize", sizeHandler);
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
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
        onMouseEnter={() => {
          document.getElementById("themeLogo")!.style.filter =
            "grayscale(100%) contrast(200%) opacity(0.1)";
          document.getElementById("mode")!.style.display = "block";
        }}
        onMouseLeave={() => {
          document.getElementById("mode")!.style.display = "none";
          document.getElementById("themeLogo")!.style.filter = "";
        }}
        onClick={(e: React.MouseEvent<HTMLImageElement>) => {
          e.preventDefault();
          switchMode();
        }}
      >
        {theme === "dark" ? <p id="mode">🌞</p> : <p id="mode">🌙</p>}
        <Image
          src={theme === "dark" ? logo1 : logo2}
          id="themeLogo"
          className={css.themeLogo}
          alt="Developer NFT Navigation logo"
          width={250}
          height={250}
        />
      </Navbar.Brand>

      {/* Collapse-able Navbar Links */}
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav
          className={
            wideScreen
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
          {wideScreen && (
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
  );
};

export default NavBar;
