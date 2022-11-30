import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AiFillGithub, AiOutlineTwitter,  AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

const css = require('./Footer.module.css')

const Footer = () => {
    let date = new Date();
    let year = date.getFullYear();

    return (
        <Container fluid className={css.footer}>
            <Row>
                <Col md="4" className="footer-copywright">
                    <h3>Designed and Developed by Jesse Greenough </h3>
                </Col>
                <Col md="4" className={css.footerCopywright}>
                    <h3>Copyright © {year} JLG</h3>
                </Col>
                <Col md="4" className={css.footerBody}>
                    <ul className={ css.footerIcons }>
                        <li className={ css.socialIcons }>
                            <a
                                href="https://github.com/GreenJ84"
                                style={{ color: "white" }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <AiFillGithub />
                            </a>
                        </li>
                        <li className={ css.socialIcons }>
                            <a
                                href="https://twitter.com/GoodGreens84"
                                style={{ color: "white" }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <AiOutlineTwitter />
                            </a>
                        </li>
                        <li className={ css.socialIcons }>
                            <a
                                href="https://www.linkedin.com/in/jessegreenough/"
                                style={{ color: "white" }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaLinkedinIn />
                            </a>
                        </li>
                        <li className={ css.socialIcons }>
                            <a
                                href="https://www.instagram.com/jesse.greenough/"
                                style={{ color: "white" }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <AiFillInstagram />
                            </a>
                        </li>
                    </ul>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer