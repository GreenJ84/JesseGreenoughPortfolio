import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import { CgGitFork } from "react-icons/cg";
import { ImBlog } from "react-icons/im";
import { AiFillStar, AiOutlineHome, AiOutlineFundProjectionScreen, AiOutlineUser,
} from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";

import logo from "../../public/assets/logo.png";
import { useRouter } from "next/router";

const css = require('./NavBar.module.css');

const NavBar = () => {
    const [expandBar, setExpandBar] = useState(false);
    const [wideScreen, setWideScreen] = useState(true)
    const [navFade, setNavFade] = useState(false);
    const { pathname } = useRouter();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname])

    useEffect(() => {
        const scrollHandler = () => {
            if (window.scrollY >= 60) {
                setNavFade(true);
            } else {
                setNavFade(false);
            }
        }
        const sizeHandler = () => {
            if (innerWidth > 900) {
                setExpandBar(true);
                setWideScreen(true);
            } else {
                setWideScreen(false);
            }
        }
        window.addEventListener("scroll", scrollHandler);
        window.addEventListener('resize',
        sizeHandler)

        const unMount = () => {
            window.removeEventListener("scroll", scrollHandler);
        return unMount
        };
    });

    return (
        <Navbar expanded={expandBar} fixed="top" expand="md" className={navFade ? css.sticky : css.navbar}>
            <Container className={ css.navbarContainer }>
                <Navbar.Brand href="/" className={ css.navBarBrand }>
                    <Image src={logo} className={ css.logo } alt="brand" />
                </Navbar.Brand>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className={ wideScreen ? css.navbarNav : expandBar ? css.navbarNav : css.navClosed }defaultActiveKey="#home">
                        <Nav.Item className={ css.navItem }>
                            <Nav.Link as={Link} href='/' className={ css.navLink } onClick={() => setExpandBar(false)}>
                                <AiOutlineHome style={{ marginBottom: "2px" }} />
                                Home
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item className={ css.navItem }>
                            <Nav.Link as={Link} href="/about" className={ css.navLink } onClick={() => setExpandBar(false)}>
                                <AiOutlineUser style={{ marginBottom: "2px" }} />
                                About
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item className={ css.navItem }>
                            <Nav.Link as={Link} href="/projects" className={ css.navLink }  onClick={() => setExpandBar(false)}>
                                <AiOutlineFundProjectionScreen style={{ marginBottom: "2px" }} />
                                {" "}
                                Projects
                            </Nav.Link>
                            </Nav.Item>
                            
                        <Nav.Item className={ css.navItem }>
                            <Nav.Link href="/experience" className={ css.navLink } rel="noreferrer" >
                                <ImBlog style={{ marginBottom: "2px" }} />
                                Expeience
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item className={ css.navItem }>
                            <Nav.Link as={Link} href="/resume" className={ css.navLink } onClick={() => setExpandBar(false)}>
                                <CgFileDocument style={{ marginBottom: "2px" }} />
                                Resume
                            </Nav.Link>
                        </Nav.Item>


                        { wideScreen && <Nav.Item className={ css.navItem && "fork-btn"}>
                            <Button href="https://github.com/GreenJ84" target="_blank" className="github-btn-inner">
                                <CgGitFork style={{ fontSize: "1.2em" }} />{" "}
                                <AiFillStar style={{ fontSize: "1.1em" }} />
                            </Button>
                        </Nav.Item>}

                    </Nav>
                </Navbar.Collapse>
                <Navbar.Toggle className={ expandBar ? css.navbarToggler : css.navbarTogglerClosed } aria-controls="responsive-navbar-nav" onClick={() => { setExpandBar(expandBar ? false : true); console.log(expandBar)}}>
                    <span></span>
                    <span></span>
                    <span></span>
                </Navbar.Toggle>
            </Container>
        </Navbar>
    )
}

export default NavBar;