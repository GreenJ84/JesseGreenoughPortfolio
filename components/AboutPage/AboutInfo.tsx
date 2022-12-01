import React from 'react'

const css = require('./AboutInfo.module.css')

const AboutInfo = () => {
    return (
        <>
            <h1 className={ css.title }> All About <span className='purple'>Me</span> </h1>
            <p className={ css.aboutMe }> Born and raise in the border city of <span className='purple'>El Paso, Texas.</span> Ever since I was young, I strived to make the most of myself, participating in community sports, educational clubs (specifically school math club), and Boy Scouts. This kept me active and spending a lot of time either outdoors or solving equations, which is where my fascination with nature(GREEN-ery) and my love of math began. Both are big parts of my identity to this day.</p>
            <p className={ css.aboutMe }> I attended a Running Start focused high school. Through my determination and distinguished achievement I was able to receive my Associates degree my junior year, a year early. 1 of 3 students to accomplish that feat for the city of El Paso.</p>
            <p className={ css.aboutMe }> College after ended up being one of the hardest times of my life. I traveled across the states to attend college at the University of Washington I Seattle, WA. In my second semester of college my father&apos;s mental health deteriorated which inevitably caused him to reveal dark truths about my immediate family, some that altered the entire reality of the people I knew and the events of my childhood. This led to a very unstable environment for me mentally and concluded with my withdrawal as I faced my own mental health crisis. </p>
            <p className={ css.aboutMe }>From there I re-established myself and entered the workforce start earn toward paying on accumulated debt. I started to excel because I was able to put in work with a structured environment. It helped me attain achievement and experience moving up from a starting positions to a lead positions at every job I had. Even taking over manager positions at multiple locations. It is in the customer service industry, specifially work at Fred Meyer, that led me to me my amazing fiancé, in which I also recieved the blessing of a beautful daughter that has become the love of my life.</p>
            <p className={ css.aboutMe }> While I worked I started learning bits and pieces of code here and there as a hobby at first. I started helping out others with my skill and tried expanding my knowledge. After a over a year of self-learning, I ran had the opportunity to attend Coding Dojo. WIth the bootcamp I was able increase my knowledge even further and to learn the skills necessary to become a full-stack software developer. Ever since I have continuously been increasing my knowledge building and deploying applications to learn new skills.</p>
        </>
    )
}

export default AboutInfo