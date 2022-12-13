import React, { useState, useEffect } from "react";
import Image from "next/image";

import { Container, Row } from "react-bootstrap"
import Button from "react-bootstrap/Button";
import { AiOutlineDownload } from "react-icons/ai";

import resume from '../../public/assets/JesseGreenough.React.Resume.png'

const css = require('../../styles/Resume.module.css')


const ReumePage = () => {
    const [width, setWidth] = useState(0);

    React.useEffect(() => {
        const checkWindow = ( width: number ) => { 
            if ( width < 900) {
                setWidth( width / .62)
            }
            else {
                setWidth( width)
            }
        }
        checkWindow(window.innerWidth)
        window.addEventListener('resize', () => checkWindow(window.innerWidth));

        return () => {
            window.removeEventListener('resize', () => checkWindow(window.innerWidth));
        }
    }, []);

    return (
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
                <Image src={resume} alt='MyResume' width={width * .6
                } height={(width * .6) * 1.3} />
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
    )
}


export default ReumePage