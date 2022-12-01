import { relative } from 'node:path/win32'
import React from 'react'
import GitHubCalendar from 'react-github-calendar'

const css = require('./TechnicalSkills.module.css')

const calenderStyle = {
    margin: '1rem auto 4rem',
    color: 'white'
}

const githubCard = () => {
    return (
        <>
            <h1 className={ css.projectHeading } >
                Days I <strong className="purple">Code</strong>
            </h1>
            <GitHubCalendar
            username="GreenJ84"
            color="#0be116"
            style={ calenderStyle }
            />
        </>
    )
}

export default githubCard