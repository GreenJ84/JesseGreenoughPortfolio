import React from "react";
import Tilt from "react-parallax-tilt";
import Image from "next/image";

import { Container, Row, Col } from "react-bootstrap";

import { AiFillGithub, AiOutlineTwitter, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

import TechnicalSkills from "./TechnicalSkills";
import DeveloperTools from "./DeveloperTools";
import GithubCard from "./GithubCard";

import myImg from "../../public/assets/avatar.svg";
const css = require('./HomeBottom.module.css')

const HomeBottom = () => {
    return (
        <Container fluid id="about">
            <Container>
                <Row className={ css.topRow }>
                    <Col md={8} className={ css.homeAboutDescription }>
                        <h1 className={ css.homeAboutTitle }>
                            LET ME <span className="detail"> INTRODUCE </span> MYSELF
                        </h1>
                        <p className={ css.homeAboutBody }>
                            I fell in love with programming over 3 years ago and have constantly pushed learning more and more at every opportunity I had! This year I got the opportunity to attend <i><b className="detail"> Coding Dojo </b></i> bootcamp and change my hobby into a full-time career pursuit.
                            <br />
                            <br />
                            I am fluent in classics like
                            <i>
                                <b className="detail"> Java, Javascript and Python </b> with Typings.
                            </i>
                            <br />
                            <br />
                            My interest in coding is the ability it provides to to build new &nbsp;
                            <i>
                                <b className="detail">Web technologies and Products that help society </b>, especilly around topics within areas relating to{" "}
                                <b className="detail">
                                Web3/Blockchain development.
                                </b>
                            </i>
                            <br />
                            <br />
                            Whenever possible, I apply my passion for developing products
                            with
                                <b className="detail"> Node.js</b> and
                            <i>
                            <b className="detail">
                                {" "}
                                Modern Javascript Library and Frameworks
                            </b>
                            </i>
                            &nbsp; like
                            <i>
                            <b className="detail"> React.js and Next.js</b>
                            </i>
                        </p>
                    </Col>
                    <Col md={4} className={ css.myAvtar }>
                        <Tilt>
                            <Image src={myImg} className={css.myAvatarImage } alt="avatar" />
                        </Tilt>
                    </Col>
                </Row>
                <TechnicalSkills />
                <DeveloperTools />
                <GithubCard />
                <Row>
                    <Col md={12} className={ css.homeAboutSocial }>
                    <p>
                        Feel free to <span className="detail">connect </span>with me on
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