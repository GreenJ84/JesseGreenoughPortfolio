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