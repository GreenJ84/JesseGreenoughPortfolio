import React from "react";
import Tilt from "react-parallax-tilt";
import Image from "next/image";

import { Container, Row, Col } from "react-bootstrap";
import { AiFillGithub, AiOutlineTwitter, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

const css = require('./HomeBottom.module.css')
import myImg from "../../public/assets/avatar.svg";

const HomeBottom = () => {
    return (
        <Container fluid className={ css.homeAboutSection } id="about">
            <Container>
                <Row className={ css.topRow }>
                    <Col md={8} className={ css.homeAboutDescription }>
                        <h1 style={{ fontSize: "2.6em" }}>
                            LET ME <span className="purple"> INTRODUCE </span> MYSELF
                        </h1>
                        <p className={ css.homeAboutBody }>
                            I fell in love with programming and I have constantly pushed learning more and more at every opportunity! 🤓
                            <br />
                            <br />
                            I am fluent in classics like
                            <i>
                                <b className="purple"> Java, Javascript and Python. </b>
                            </i>
                            <br />
                            <br />
                            My field of Interest&apos;s are building new &nbsp;
                            <i>
                                <b className="purple">Web technologies and Products that help society </b> and especilly interested in topics within areas relate to{" "}
                                <b className="purple">
                                Web3/Blockchain development.
                                </b>
                            </i>
                            <br />
                            <br />
                            Whenever possible, I apply my passion for developing products
                            with
                                <b className="purple"> Node.js</b> and
                            <i>
                            <b className="purple">
                                {" "}
                                Modern Javascript Library and Frameworks
                            </b>
                            </i>
                            &nbsp; like
                            <i>
                            <b className="purple"> React.js and Next.js</b>
                            </i>
                        </p>
                    </Col>
                    <Col md={4} className={ css.myAvtar }>
                        <Tilt>
                            <Image src={myImg} className="img-fluid" alt="avatar" />
                        </Tilt>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className={ css.homeAboutSocial }>
                    <p>
                        Feel free to <span className="purple">connect </span>with me on
                    </p>
                    <ul className={ css.homeAboutSocialLinks }>
                        <li className={ css.socialIcons }>
                        <a
                            href="https://github.com/GreenJ84"
                            target="_blank"
                            rel="noreferrer"
                            className={ css.homeSocialIcons }
                        >
                            <AiFillGithub />
                        </a>
                        </li>
                        <li className={ css.socialIcons }>
                        <a
                            href="https://twitter.com/GoodGreens84"
                            target="_blank"
                            rel="noreferrer"
                            className={ css.homeSocialIcons }
                        >
                            <AiOutlineTwitter />
                        </a>
                        </li>
                        <li className={ css.socialIcons }>
                        <a
                            href="https://www.linkedin.com/in/jessegreenough/"
                            target="_blank"
                            rel="noreferrer"
                            className={ css.homeSocialIcons }
                        >
                            <FaLinkedinIn />
                        </a>
                        </li>
                        <li className={ css.socialIcons }>
                        <a
                            href="https://www.instagram.com/jesse.greenough/"
                            target="_blank"
                            rel="noreferrer"
                            className={ css.homeSocialIcons }
                        >
                            <AiFillInstagram />
                        </a>
                        </li>
                    </ul>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default HomeBottom