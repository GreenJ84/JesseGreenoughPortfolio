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
    const [navFade, setNavFade] = useState(false);
    const { pathname } = useRouter();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname])

    useEffect(() => {
        const scrollHandler = () => {
            if (window.scrollY >= 20) {
                setNavFade(true);
            } else {
                setNavFade(false);
            }
        }
        window.addEventListener("scroll", scrollHandler);

        const unMount = () => {
            window.removeEventListener("scroll", scrollHandler);
        return unMount
        };
    });


    return (
        <Navbar expanded={expandBar} fixed="top" expand="md" className={navFade ? css.sticky : css.navbar}>
            <Container>
                <Navbar.Brand href="/" className={ css.navbarBrand && "d-flex"}>
                    <Image src={logo} className={css.logo && "img-fluid"} alt="brand" />
                </Navbar.Brand>
                <Navbar.Toggle className={ css.navbarToggler } aria-controls="responsive-navbar-nav" onClick={() => { setExpandBar(expandBar ? false : true);}}>
                    <span></span>
                    <span></span>
                    <span></span>
                </Navbar.Toggle>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className={ css.navbarNav && "ms-auto"} defaultActiveKey="#home">
                        <Nav.Item className={ css.navItem }>
                            <Nav.Link as={Link} href='/' onClick={() => setExpandBar(false)}>
                                <AiOutlineHome style={{ marginBottom: "2px" }} />
                                Home
                            </Nav.Link>
                        </Nav.Item>

                    <Nav.Item className={ css.navItem }>
                        <Nav.Link as={Link} href="/about" onClick={() => setExpandBar(false)}>
                            <AiOutlineUser style={{ marginBottom: "2px" }} />
                            About
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item className={ css.navItem }>
                        <Nav.Link as={Link} href="/projects" onClick={() => setExpandBar(false)}>
                            <AiOutlineFundProjectionScreen style={{ marginBottom: "2px" }} />
                            {" "}
                            Projects
                        </Nav.Link>
                        </Nav.Item>
                        
                    <Nav.Item className={ css.navItem }>
                        <Nav.Link href="/experience" rel="noreferrer" >
                            <ImBlog style={{ marginBottom: "2px" }} />
                            Expeience
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item className={ css.navItem }>
                        <Nav.Link as={Link} href="/resume" onClick={() => setExpandBar(false)}>
                            <CgFileDocument style={{ marginBottom: "2px" }} />
                            Resume
                        </Nav.Link>
                    </Nav.Item>


                    <Nav.Item className={ css.navItem && "fork-btn"}>
                        <Button href="https://github.com/GreenJ84" target="_blank" className="github-btn-inner">
                            <CgGitFork style={{ fontSize: "1.2em" }} />{" "}
                            <AiFillStar style={{ fontSize: "1.1em" }} />
                        </Button>
                    </Nav.Item>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;