// TODO: Update styling logic gor route
import React from 'react';

import { skillData } from './_components/skillData';
import TechnicalSkill from './_components/TechnicalSkill';

const css = require("./_components/Skill.module.css");

const page = () => {
  const formattedName = (name: string) => name.charAt(0).toUpperCase() + name.slice(1).split("_").join(" ");

  return (
    <>
        {Object.entries(skillData).map(
          ([category, data]) =>{
            return <section key={category}>
              <h2>{formattedName(category)}</h2>
              <ul
                id={`${category}`}
                className={css.skillsListContainer}
              >
                {data.map(skill => {
                  return <TechnicalSkill key={skill.name} {...skill}/>
                })}
              </ul>
            </section>
          })}
    </>
  )
}

export default page;

const SKILLS_URL = APP_URL + '/skills';
const TITLE="Jesse Greenough's Software Engineering skills set"
const DESCRIPTION ="View the technical technology skill set for Jesse Greenough"
const KEYWORDS="Full-Stack,Software,Developer,Engineer,TypeScript,React,NextJS,Java,SpringBoot,Rust,Yew,Rocket,Python,Flask,Django";

import { APP_URL, OPEN_GRAPH, TWITTER_SHARE } from '../sharedMetadata';
import { Metadata } from 'next/types';
export const metadata: Metadata = {
  metadataBase: new URL(SKILLS_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: KEYWORDS,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SKILLS_URL,
    siteName: TITLE,
    ...OPEN_GRAPH
  },
  twitter: {
    site: SKILLS_URL,
    title: TITLE,
    description: DESCRIPTION,
    ...TWITTER_SHARE
  },
};