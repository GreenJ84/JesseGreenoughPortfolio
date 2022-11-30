import React, { useState } from "react";
import useRouter from "next";

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
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
    const [expandBar, setExpandBar] = useState(false);
    const [navFade, setNavFade] = useState(false);

    const scrollHandler = () => {
        if (window.scrollY >= 20) {
            setNavFade(true);
        } else {
            setNavFade(false);
        }
    }


    return (
        <Navbar expanded={expandBar} fixed="top" expand="md" className={navFade ? "sticky" : "navbar"}>
            <Container>
                <Navbar.Brand href="/" className="d-flex">
                    <Image src={logo} className="img-fluid logo" alt="brand" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => { setExpandBar(expandBar ? false : true);}}>
                    <span></span>
                    <span></span>
                    <span></span>
                </Navbar.Toggle>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto" defaultActiveKey="#home">
                        <Nav.Item>
                            <Nav.Link as={Link} href='/' onClick={() => setExpandBar(false)}>
                                <AiOutlineHome style={{ marginBottom: "2px" }} />
                                Home
                            </Nav.Link>
                        </Nav.Item>

                    <Nav.Item>
                        <Nav.Link as={Link} href="/about" onClick={() => setExpandBar(false)}>
                            <AiOutlineUser style={{ marginBottom: "2px" }} />
                            About
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link as={Link} href="/project" onClick={() => setExpandBar(false)}>
                            <AiOutlineFundProjectionScreen style={{ marginBottom: "2px" }} />
                            {" "}
                            Projects
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link as={Link} href="/resume" onClick={() => setExpandBar(false)}>
                            <CgFileDocument style={{ marginBottom: "2px" }} />
                            Resume
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link href="https://blogs.soumya-jit.tech/" target="_blank" rel="noreferrer" >
                            <ImBlog style={{ marginBottom: "2px" }} />
                            Blogs
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item className="fork-btn">
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