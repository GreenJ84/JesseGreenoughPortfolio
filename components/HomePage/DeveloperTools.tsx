import React from 'react'
import Image from 'next/image';
import { Col } from 'react-bootstrap';

import { SiVisualstudiocode, SiPostman, SiVercel, SiGitkraken, SiApollographql, SiFigma, SiNotion, SiSocketdotio, SiJinja, SiPm2, SiKubernetes, SiApachetomcat, SiNodemon, SiYarn, SiGitpod, SiSpring } from "react-icons/si";
import { VscSmiley } from 'react-icons/vsc';
import { FaAws, FaHardHat, FaTrello } from 'react-icons/fa';
import { WiSmog } from 'react-icons/wi';
import { GrDocker } from 'react-icons/gr';
import { DiChrome, DiGit, DiJava, DiNginx, DiNpm, DiVim } from 'react-icons/di';
import { AiFillGithub } from 'react-icons/ai';
import { BsPip } from 'react-icons/bs';
import { GiUnicorn } from 'react-icons/gi';

const truffle = require('../../public/assets/truffle-logo-dark.svg')
const ganache = require('../../public/assets/ganache-logo-dark.svg')
const css = require('./TechnicalSkills.module.css')

const DeveloperTools = () => {
    return (
        <>
            <h1 className={ css.projectHeading }>
                Development <strong className="detail">Tools</strong>
            </h1>


            <h5> Governance/Planning </h5>
            <div className={css.body}>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <FaTrello />
                    <span> Trello </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={5}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <VscSmiley />
                    <span> Balsamiq </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={4}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiFigma />
                    <span> Figma </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={4}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiNotion />
                    <span> Notion </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={2}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <WiSmog />
                    <span> Mockflow </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={2}
                    />
                </Col>
            </div>


            <h5> Devlopment </h5>
            <div className={css.body}>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiVisualstudiocode />
                    <span> VS Code </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={5}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <DiGit />
                    <span> Git </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={4}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <DiChrome />
                    <span> ChromeDev Tools </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={4}
                    />
                </Col>
                <Col xs={4} md={2} className={css.techIcons}>
                    <SiGitkraken />
                    <span> GitKraken </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={4}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiApollographql />
                    <span> Apollo </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={3}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <FaHardHat />
                    <span> Hardhat </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={3}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <Image alt={"Truffle Logo"} src={truffle} width={ 10 } height={ 10 } className={ css.icon } />
                    <span> Truffle </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={3}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <Image alt={"Ganache Logo"} src={ganache} width={ 10 } height={ 10 } className={ css.icon }/>
                    <span> Ganache </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={3}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiPostman />
                    <span> Postman </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={3}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <DiVim />
                    <span> VIM </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={3}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiSpring />
                    <span> Spring Tools Suite </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={2}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiGitpod />
                    <span> GitPod </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={1}
                    />
                </Col>
            </div>


            <h5> Runtime </h5>
            <div className={css.body}>
            <Col xs={4} md={2} className={ css.techIcons }>
                    <DiNpm />
                    <span> npm </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={4}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiYarn />
                    <span> yarn </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={3}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <BsPip />
                    <span> pip </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={3}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiNodemon />
                    <span> nodemon </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={3}
                    />
                </Col>
            </div>


            <h5> DevOps/Serving </h5>
            <div className={css.body}>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiVercel />
                    <span> Vercel </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={5}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <AiFillGithub />
                    <span> Github Pages </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={4}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <GrDocker />
                    <span> Docker </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={3}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <FaAws />
                    <span> AWS EC2 </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={3}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <GiUnicorn />
                    <span> Gunicorn </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={2}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <DiNginx />
                    <span> Nginx </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={2}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiApachetomcat />
                    <span> Apache Tomcat </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={2}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiKubernetes />
                    <span> Kubernetes </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={2}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiPm2 />
                    <span> PM2 </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={1}
                    />
                </Col>
            </div>


            <h5> Extras </h5>
            <div className={css.body}>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiJinja />
                    <span> Jinja </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={5}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <DiJava />
                    <span> Java Server Pages </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={4}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiSocketdotio />
                    <span> Socket.io </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={2}
                    />
                </Col>
            </div>
        </>
    )
}

export default DeveloperTools