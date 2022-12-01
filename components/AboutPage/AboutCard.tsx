import React from 'react'
import { Card } from 'react-bootstrap'
import { ImPointRight } from 'react-icons/im'

const css = require('./AboutCard.module.css')

const AboutCard = () => {
    return (
        <Card className={ css.quoteCardView }>
            <Card.Body>
                <blockquote className={ css.blockquote }>
                    <p style={{ textAlign: "left" }}>
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
                    <p className={ css.quote }>
                        &quot;Build to make a difference!&quot;{" "}
                    </p>
                    <footer className={ css.blockquoteFooter }>
                        - <span className="purple">Jesse</span>
                    </footer>
                </blockquote>
            </Card.Body>
        </Card>
    )
}

export default AboutCard