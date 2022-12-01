import React from 'react'
import { Card } from 'react-bootstrap'
import { ImPointRight } from 'react-icons/im'

const css = require('./AboutCard.module.css')

const AboutCard = () => {
    return (
        <Card className={ css.quoteCardView }>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    <p style={{ textAlign: "justify" }}>
                        Hi Everyone, I am <span className="purple">Jesse Greenough </span> currently residing in <span className="purple"> Shoreline, Washington USA.</span>
                        <br />
                        <br />
                        I am a Full-stack Developer with 5+ years of operations, management, and cusomer success experience
                        <br />
                        <br />
                        Apart from learning and coding, some other activities that I love to do are: 
                    </p>
                    <ul>
                        <li className={ css.aboutActivity }>
                        <ImPointRight /> Spending time with my amazing family 
                        </li>
                        <li className={ css.aboutActivity }>
                            <ImPointRight /> Playing video games or watching anime
                        </li>
                        <li className={ css.aboutActivity }>
                            <ImPointRight /> Doing sudoku and word puzzles
                        </li>
                        <li className={ css.aboutActivity }>
                            <ImPointRight /> Play Sports ( basketball! )
                        </li>
                        <li className={ css.aboutActivity }>
                            <ImPointRight /> Enjoying the outdoors!
                        </li>
                    </ul>
                    <p style={{ color: "rgb(155 126 172)" }}>
                        &ldquote;Build to make a difference!&rdquote;{" "}
                    </p>
                    <footer className="blockquote-footer">
                        Jesse
                    </footer>
                </blockquote>
            </Card.Body>
        </Card>
    )
}

export default AboutCard