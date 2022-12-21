import React from 'react'

const css = require('./AboutInfo.module.css')

const AboutInfo = () => {
    return (
        <>
            <h1 className={ css.title }> All About <span className='detail'>Me</span> </h1>
            <p className={ css.aboutMe }> Born and raise in the border city of <span className='detail'>El Paso, Texas.</span> Ever since I was young, I strived to make the most of myself. I participated in community sports, educational clubs (mostly school math club), and Boy Scouts. These kept me active and spending a lot of time either outdoors or solving equations, which is where my fascination with nature ( GREEN-ery =&gt; GREEN-ough 🤣) and my love of math began. Both are big parts of my identity to this day.</p>
            <p className={ css.aboutMe }> I attended a Running Start focused high school. Through my determination and distinguished achievement I was able to receive my Associates degree my junior year, a year early. 1 of 3 students to accomplish that feat for the city of El Paso that year. Also, where I was introduced to coding and started using it as a hobby. </p>
            <p className={ css.aboutMe }> College afterwards ended up being one of the hardest times of my life. I traveled across the states to attend college at the University of Washington in Seattle, WA. In my second semester of college my father&apos;s mental health deteriorated which inevitably caused him to reveal dark truths about my immediate family, some that altered the entire reality of the people I knew and the events of my childhood. This led to a very unstable environment for me mentally and concluded with my withdrawal as I faced my own mental health crisis. </p>
            <p className={ css.aboutMe }> From there I re-established myself and entered the workforce to start earning towards paying off accumulated debt. I started to excel because I was able to put in work with a structured environment. It facilitated my ability to attain achievement and experience, allowing me to move up from starting positions to lead positions at every job I had. Even taking over manager positions at multiple locations. It was in the customer service industry, specifially work at Fred Meyer, that led me to me my amazing fiancé, in which I also recieved the blessing of a beautful daughter that has become the love of my life.</p>
            <p className={ css.aboutMe }> While life went on I had kept learning bits and pieces of code here and there. Within the last 3 years I started helping out others with my skill and tried expanding my knowledge. This year (2022) I recieved the opportunity to attend Coding Dojo. With the bootcamp I was able increase my knowledge significantly further by learning the skills necessary to become a Full-stack Software Developer. Ever since I have continuously been increasing my knowledge though courses, building and deploying applications to learn new skills.</p>
        </>
    )
}

export default AboutInfo