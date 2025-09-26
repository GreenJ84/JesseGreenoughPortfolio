
"use client";
import React, { useEffect, useMemo } from 'react';

const css = require('./Skill.module.css');
const formattedName = (name: string) => name.charAt(0).toUpperCase() + name.slice(1).split("_").join(" ");

const SkillsNav = ({sections} : { sections: string[] }) => {
    const viewable_sections = useMemo(() => {
      let temp = sections.filter(section => !section.endsWith("Tools"));
      temp.splice(3, 0, "tools");
      return temp;
    }, [sections]);
    const tools = useMemo(() => sections.filter(section => section.endsWith("Tools")), [sections]);


  useEffect(() => {
      const sections = document.querySelectorAll(".skillSection");
      const links = document.querySelectorAll(".skillLink");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const activeId = entry.target.id;
              document.getElementsByClassName(css.linkHolder)[0].classList.toggle(css.active, activeId.endsWith("Tools"));
              links.forEach((link) => {
                link.classList.toggle(css.active, link.getAttribute("data-id") === activeId);
              });
            }
          });
        },
        { root: document.querySelector("#scrollSnapContainer"), threshold: 0.5 }
      );

      sections.forEach((section) => observer.observe(section));

      links.forEach((link) => {
        link.addEventListener("click", (e: any) => {
          e.preventDefault();
          const targetId = link.getAttribute("data-id")!;
          const targetSection = document.getElementById(targetId)!;
          targetSection.scrollIntoView({ behavior: "smooth" });
        });
      });
  }, []);

  const linkItem = (title: string, subLink: boolean = false) => {
    return <li
      key={title}
      data-id={title}
      className={`${subLink ? css.skillSubLink : css.skillLink} skillLink`}
    >
      {subLink ? formattedName(title.slice(0, title.indexOf("_"))) : formattedName(title)}
    </li>
  }

  return (
    <nav id="skillsNav" className={css.skillsNav}>
      <ul>
        {viewable_sections.map(section => {
          return section !== "tools" ? linkItem(section) :
            <li
              key={section}
              className={css.linkHolder}
            >
              {formattedName(section)}
              <ul>
                {tools.map(tool => linkItem(tool, true))}
              </ul>
            </li>
        })}
      </ul>
    </nav>
  )
}

export default SkillsNav