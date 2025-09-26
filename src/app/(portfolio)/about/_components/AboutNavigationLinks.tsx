"use client";

import React from 'react'

const css = require('./About.module.css');

const svg =
<svg id="Layer_1" enable-background="new 0 0 128 128" height="40" viewBox="0 0 128 128" width="40" xmlns="http://www.w3.org/2000/svg">
  <path stroke="var(--text-negative)" fill="var(--text-primary)" d="m64 104c-1.023 0-2.047-.391-2.828-1.172l-40-40c-1.563-1.563-1.563-4.094 0-5.656s4.094-1.563 5.656 0l37.172 37.172 37.172-37.172c1.563-1.563 4.094-1.563 5.656 0s1.563 4.094 0 5.656l-40 40c-.781.781-1.805 1.172-2.828 1.172zm2.828-33.172 40-40c1.563-1.563 1.563-4.094 0-5.656s-4.094-1.563-5.656 0l-37.172 37.172-37.172-37.172c-1.563-1.563-4.094-1.563-5.656 0s-1.563 4.094 0 5.656l40 40c.781.781 1.805 1.172 2.828 1.172s2.047-.391 2.828-1.172z"/>
</svg>

const AboutNavigationLinks = () => {
  return (
    <>
      <button
      className={`${css.aboutLink} ${css.start}`}
        onClick={(e: any) => {
          e.preventDefault();
          const targetSection = document.getElementsByClassName(css.aboutDetail)[1];
          targetSection.scrollIntoView({ behavior: "smooth" });
        }}
      >
        Latest Life Events
        {svg}
      </button>
      <button
        className={`${css.aboutLink} ${css.end}`}
        onClick={(e: any) => {
          e.preventDefault();
          const targetSections = document.getElementsByClassName(css.aboutDetail);
          targetSections[targetSections.length - 1].scrollIntoView({ behavior: "smooth" });
        }}
      >
        From the Beginning
        {svg}
      </button>
    </>
  )
}

export default AboutNavigationLinks;