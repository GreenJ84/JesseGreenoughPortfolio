/** @format */

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";

import {
  AiFillStar,
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
} from "react-icons/ai";
import { CgFileDocument, CgGitFork } from "react-icons/cg";
import { ImBlog } from "react-icons/im";

const css = require("./NavBar.module.css");

const NavBarCollapse = (props: {
  toggle: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}) => {
  // For NavBar Accordian on small screens
  const [expandBar, setExpandBar] = props.toggle;
  // For Responsive NavBar change
  const [wideScreen, setWideScreen] = useState(true);

  // Response listeners for window changes
  useEffect(() => {
    const sizeHandler = () => {
      if (window.innerWidth > 900) {
        setExpandBar(false);
        setWideScreen(true);
      } else {
        setWideScreen(false);
      }
    };
    sizeHandler();
    window.addEventListener("resize", sizeHandler);

    return () => {
      window.removeEventListener("resize", sizeHandler);
    };
  }, []);

  return (
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav
        className={
          wideScreen ? css.navbarNav : expandBar ? css.navbarNav : css.navClosed
        }
        defaultActiveKey="#home"
      >
        <Nav.Item className={css.navItem}>
          <Nav.Link
            as={Link}
            href="/"
            className={css.navLink}
            onClick={() => setExpandBar(false)}
          >
            <AiOutlineHome className={css.navIcon} />
            Home
          </Nav.Link>
        </Nav.Item>

        <Nav.Item className={css.navItem}>
          <Nav.Link
            as={Link}
            href="/about"
            className={css.navLink}
            onClick={() => setExpandBar(false)}
          >
            <AiOutlineUser className={css.navIcon} />
            About
          </Nav.Link>
        </Nav.Item>

        <Nav.Item className={css.navItem}>
          <Nav.Link
            as={Link}
            href="/projects"
            className={css.navLink}
            onClick={() => setExpandBar(false)}
          >
            <AiOutlineFundProjectionScreen className={css.navIcon} /> Projects
          </Nav.Link>
        </Nav.Item>

        <Nav.Item className={css.navItem}>
          <Nav.Link
            as={Link}
            href="/experience"
            className={css.navLink}
            rel="noreferrer"
            onClick={() => setExpandBar(false)}
          >
            <ImBlog className={css.navIcon} />
            Experience
          </Nav.Link>
        </Nav.Item>

        <Nav.Item className={css.navItem}>
          <Nav.Link
            as={Link}
            href="/resume"
            className={css.navLink}
            onClick={() => setExpandBar(false)}
          >
            <CgFileDocument className={css.navIcon} />
            Resume
          </Nav.Link>
        </Nav.Item>

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
  );
};

export default NavBarCollapse;
