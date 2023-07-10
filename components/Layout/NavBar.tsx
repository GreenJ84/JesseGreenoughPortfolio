/** @format */

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { Button, Navbar } from "react-bootstrap";
import Particle from "./Particle";

import {
  AiFillStar,
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
} from "react-icons/ai";
import { CgFileDocument, CgGitFork } from "react-icons/cg";
import { ImBlog } from "react-icons/im";

import { AppContext, WindowWidth } from "../../utils/AppContext";

const brandLogo1 = "/assets/TrippyFrensNFT_logo.png";
const brandLogo2 = "/assets/CyberHedera1.png";
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

  // Navigation Route Handling
  const router = useRouter();
  const handleLink = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    router.push(href);
  };

  // Navigation Display Rendering
  const [expandedNav, setExpandedNav] = useState(true);
  const [navFade, setNavFade] = useState(false);
  useEffect(() => {
    if (windowWidth !== WindowWidth.SMALL) {
      setExpandedNav(true);
    } else {
      setExpandedNav(false);
    }
  }, [windowWidth]);

  // Scroll mapping for Sticky navigation display
  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY >= 60) {
        setNavFade(true);
      } else {
        setNavFade(false);
      }

      if (
        window.scrollY + window.innerHeight >
          document.body.scrollHeight - 350 &&
        window.scrollY >= 350
      ) {
        document.getElementById("navbar")!.style.transform =
          "translateY(-100%)";
      } else {
        document.getElementById("navbar")!.style.transform = "translateY(0)";
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
          aria-label="Home Return"
          href="/"
          onClick={(e) => {
            setExpandedNav(false);
            handleLink(e, "/");
          }}
        >
          <Image
            src={theme === "dark" ? brandLogo1 : brandLogo2}
            id="themeLogo"
            className={css.themeLogo}
            alt="Developer NFT Brand logo"
            width={250}
            height={250}
          />
        </Navbar.Brand>

        {/* Collapse-able Navbar Links */}
        <Navbar.Collapse
          id="navbarCollapse"
          className={css.navbarCollpase}
        >
          <ul
            className={
              windowWidth === WindowWidth.LARGE
                ? css.navbarNav
                : expandedNav
                ? css.navbarNav
                : css.navClosed
            }
          >
            {NavLinkData.map((item, idx) => {
              const [href, icon, title] = item;
              return (
                <li
                  key={idx}
                  className={css.navItem}
                >
                  {title == "Experience" &&
                    windowWidth !== WindowWidth.SMALL && (
                      // Navigation dropdown for medium+ screens
                      <dialog className={css.experience}>
                        <div></div>
                        <div></div>
                        <Link href={"/experience/education"}>Education</Link>
                        <Link href={"/experience/work"}>Work</Link>
                      </dialog>
                    )}

                  <Link
                    href={href as string}
                    className={css.navLink}
                    rel="noreferrer"
                    onClick={(e) => {
                      setExpandedNav(false);
                      handleLink(e, href as string);
                    }}
                  >
                    {icon}
                    {title}
                  </Link>
                </li>
              );
            })}
            {windowWidth === WindowWidth.LARGE && (
              // Render GitHub Link in nav with Large screens
              <Button
                href="https://github.com/GreenJ84"
                target="_blank"
                className={css.githubBtn}
              >
                <CgGitFork className={css.forkIcon} />{" "}
                <AiFillStar className={css.forkIcon} />
              </Button>
            )}
          </ul>

          <label className={css.themeSwitch}>
            <input
              className={css.themeInput}
              type="checkbox"
              defaultChecked={theme === "dark"}
              data-theme-toggle
              onClick={() => {
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
