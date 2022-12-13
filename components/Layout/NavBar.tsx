import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

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
const css = require('./NavBar.module.css');

const NavBar = () => {
    // For NavBar Accordian on small screens
    const [expandBar, setExpandBar] = useState(false);
    // For Responsive NavBar change
    const [wideScreen, setWideScreen] = useState(true)
    // For fading as you scroll
    const [navFade, setNavFade] = useState(false);
    const { pathname } = useRouter();

    // Starting at the top on every new page selected
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname])

    // Response listeners for window changes
    useEffect(() => {
        if (window.innerWidth > 900) {
            setExpandBar(false);
            setWideScreen(true);
        } else {
            setWideScreen(false);
            setExpandBar(false);
        }

        const scrollHandler = () => {
            if (window.scrollY >= 60) {
                setNavFade(true);
            } else {
                setNavFade(false);
            }
        }
        window.addEventListener("scroll", scrollHandler);
        
        const sizeHandler = () => {
            if (window.innerWidth > 900) {
                setExpandBar(false);
                setWideScreen(true);
            } else {
                setWideScreen(false);
            }
        }
        window.addEventListener('resize', sizeHandler)

        const unMount = () => {
            window.removeEventListener("scroll", scrollHandler);
            window.removeEventListener('resize',sizeHandler);
        return unMount
        };
    }, []);

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
                                <AiOutlineHome className={ css.navIcon } />
                                Home
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item className={ css.navItem }>
                            <Nav.Link as={Link} href="/about" className={ css.navLink } onClick={() => setExpandBar(false)}>
                                <AiOutlineUser className={ css.navIcon } />
                                About
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item className={ css.navItem }>
                            <Nav.Link as={Link} href="/projects" className={ css.navLink }  onClick={() => setExpandBar(false)}>
                                <AiOutlineFundProjectionScreen className={ css.navIcon } />
                                {" "}
                                Projects
                            </Nav.Link>
                        </Nav.Item>
                            
                        <Nav.Item className={ css.navItem }>
                            <Nav.Link as={Link} href="/experience" className={ css.navLink } rel="noreferrer" onClick={() => setExpandBar(false)}>
                                <ImBlog className={ css.navIcon } />
                                Experience
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item className={ css.navItem }>
                            <Nav.Link as={Link} href="/resume" className={ css.navLink } onClick={() => setExpandBar(false)}>
                                <CgFileDocument className={ css.navIcon } />
                                Resume
                            </Nav.Link>
                        </Nav.Item>


                        { wideScreen && <Nav.Item className={ css.navFork }>
                            <Button href="https://github.com/GreenJ84" target="_blank" className="github-btn-inner center">
                                <CgGitFork className={ css.forkIcon} />{" "}
                                <AiFillStar className={ css.forkIcon} />
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