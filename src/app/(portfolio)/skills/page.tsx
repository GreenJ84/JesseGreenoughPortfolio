// TODO: Update styling logic gor route

import { skillData } from './_components/skillData';
import TechnicalSkill from './_components/TechnicalSkill';
import SkillsNav from './_components/SkillsNav';
import Footer from '../_layout/Footer/Footer';


const css = require("./_components/Skill.module.css");

const page = () => {

  return (
    <main
      className="scrollSnapContainer"
    >
      <SkillsNav sections={Object.keys(skillData)}/>
      {Object.entries(skillData).map(
        ([category, data]) =>{
          return <section
            id={category}
            key={category}
            className={`${css.skillSection} skillSection`}
          >
            <h2 className={css.sectionTitle}>{category.replaceAll('_', ' ').replace(/([a-z])([A-Z])/g, '$1 $2')}</h2>
            <ul
              className={css.skillsListContainer}
            >
              {data.map(skill =>
                <TechnicalSkill key={skill.name} {...skill}/>
              )}
            </ul>
          </section>
      })}
      <Footer />
    </main>
  );
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
