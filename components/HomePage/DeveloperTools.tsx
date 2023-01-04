import React from 'react'
import { Col } from 'react-bootstrap';

import { SiVisualstudiocode, SiPostman, SiVercel, SiGitkraken, SiApollographql, SiFigma, SiNotion } from "react-icons/si";
import { VscSmiley } from 'react-icons/vsc';
import { FaTrello } from 'react-icons/fa';
import { WiSmog } from 'react-icons/wi';

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
                        optimum={0} value={1}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <VscSmiley />
                    <span> Balsamiq </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={2}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiFigma />
                    <span> Figma </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={2}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiNotion />
                    <span> Notion </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={4}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <WiSmog />
                    <span> Mockflow </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={4}
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
                        optimum={0} value={1}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiVisualstudiocode />
                    <span> Git </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={2}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiVercel />
                    <span> ChromeDev Tools </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={2}
                    />
                </Col>
                <Col xs={4} md={2} className={css.techIcons}>
                    <SiGitkraken />
                    <span> GitKraken </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={2}
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
                    <SiVisualstudiocode />
                    <span> Hardhat </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={3}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiVisualstudiocode />
                    <span> Truffle </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={3}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiVisualstudiocode />
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
                    <SiVisualstudiocode />
                    <span> VIM </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={3}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiVisualstudiocode />
                    <span> Spring Tools Suite </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={4}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiVisualstudiocode />
                    <span> GitPod </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={5}
                    />
                </Col>
            </div>


            <h5> Runtime </h5>
            <div className={css.body}>
            <Col xs={4} md={2} className={ css.techIcons }>
                    <SiVisualstudiocode />
                    <span> npm </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={2}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiVisualstudiocode />
                    <span> yarn </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={3}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiVisualstudiocode />
                    <span> pip </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={3}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiVisualstudiocode />
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
                        optimum={0} value={1}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiVercel />
                    <span> Github Pages </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={2}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiVercel />
                    <span> Docker </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={3}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiVercel />
                    <span> AWS EC2 </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={3}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiVercel />
                    <span> Gunicorn </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={4}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiVercel />
                    <span> Nginx </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={4}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiVercel />
                    <span> Apache Tomcat </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={4}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiVercel />
                    <span> Kubernetes </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={4}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiVercel />
                    <span> PM2 </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={5}
                    />
                </Col>
            </div>


            <h5> Extras </h5>
            <div className={css.body}>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiVercel />
                    <span> Jinja </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={1}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiVercel />
                    <span> Java Server Pages </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={2}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiVercel />
                    <span> Axios </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={2}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiVercel />
                    <span> Bcrypt </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={3}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiVercel />
                    <span> Socket.io </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={4}
                    />
                </Col>
            </div>
        </>
    )
}

export default DeveloperTools