import React, { useState, useEffect } from "react";
import Image from "next/image";

import { Container, Row } from "react-bootstrap"
import Button from "react-bootstrap/Button";
import { AiOutlineDownload } from "react-icons/ai";

import resume from '../../public/assets/JesseGreenough.React.Resume.png'
import Particle from "../../components/Layout/Particle";

const css = require('../../styles/Resume.module.css')


const ReumePage = () => {

    const [width, setWidth] = useState(1200);

    useEffect(() => {
        window.addEventListener('resize',
        () => setWidth(window.innerWidth));

        const unMount = () => {

        }
    }, []);
    
    return (
        <div>
            <Container fluid className={css.resumeSection }>
                <Row className={ css.download }>
                    <Button
                    variant="primary"
                    href={'https://github.com/GreenJ84/GreenJ84.github.io/raw/main/images/JesseGreenough.React.Resume.pdf'}
                    target="_blank"
                    className={ css.downloadButton }>
                        <AiOutlineDownload />
                        &nbsp;Download CV
                    </Button>
                </Row>
    
                <Row className={ css.resume }>
                    <Image src={resume} alt='MyResume' width={width - 200} height={(width - 200) * 1.5}/>
                </Row>
    
                <Row className={ css.download }>
                    <Button
                    variant="primary"
                    href={'https://github.com/GreenJ84/GreenJ84.github.io/raw/main/images/JesseGreenough.React.Resume.pdf'}
                    target="_blank"
                    className={ css.downloadButton }
                    >
                    <AiOutlineDownload />
                    &nbsp;Download CV
                    </Button>
                </Row>
            </Container>
        </div>
    )
}


export default ReumePage