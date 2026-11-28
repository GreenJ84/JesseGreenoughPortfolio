import { AiFillHtml5 as Html5, AiOutlineConsoleSql, AiFillGithub } from "react-icons/ai";
import { DiCss3 as Css3, DiJavascript1 as Javascript, DiPython as Python, DiReact as React, DiSqllite as Sqlite, DiRedis as Redis, DiGit as Git, DiChrome as ChromeDev, DiNpm as NPM, DiNodejs as NodeJS, DiNginx } from "react-icons/di";
import { SiTypescript as Typescript, SiGraphql, SiSolidity, SiNextdotjs as NextJS, SiExpress as Express, SiTailwindcss as Tailwindcss, SiNestjs as NestJS, SiCypress as Cypress, SiDjango as Django, SiFlask as Flask, SiJest as Jest, SiSpringboot as SpringBoot, SiPostgresql as Postgresql, SiMongodb as Mongodb, SiAmazondynamodb as DynamoDB, SiFigma as FigmaIcon, SiNotion as NotionIcon, SiVisualstudiocode as VSCode, SiSpring as SpringTools, SiPostman as Postman, SiApollographql as ApolloGraphql, SiGitkraken as Gitkraken, SiYarn as Yarn, SiDeno as Deno, SiApachetomcat as ApacheTomcat, SiWasmer as Wasmer, SiVercel, SiKubernetes, SiPm2, SiRedux as Redux, SiJsonwebtokens as JSONWebTokens, SiFirebase as Firebase, SiSocketdotio as SocketIO } from "react-icons/si";
import { FaJava as Java, FaRust as Rust, FaTrello as TrelloIcon, FaHardHat as HardHat, FaAws, FaShieldAlt as NextAuth } from "react-icons/fa";
import { BsFillMarkdownFill } from "react-icons/bs";
import { GrMysql as Mysql, GrDocker } from "react-icons/gr";
import { GiUnicorn } from "react-icons/gi";
import { TiWeatherWindyCloudy as EthersJS } from "react-icons/ti";

import { BsQuestionCircle } from "react-icons/bs";
import type { ComponentType } from "react";
import type { IconBaseProps } from "react-icons";

// Category order and icon choices are presentation metadata. Skill records live in MongoDB.
export const skillCategories = [
  "languages", "frameworks", "databases", "planning_Tools",
  "development_Tools", "runtime_Tools", "devops_Tools", "extras",
] as const;

export const skillIconRegistry: Record<string, ComponentType<IconBaseProps>> = {
  General: BsQuestionCircle,
  'Rust': Rust,
  'HTML5': Html5,
  'JavaScript': Javascript,
  'TypeScript': Typescript,
  'CSS3': Css3,
  'Java': Java,
  'SQL': AiOutlineConsoleSql,
  'GraphQL': SiGraphql,
  'Markdown': BsFillMarkdownFill,
  'Python': Python,
  'Solidity': SiSolidity,
  'Next.js': NextJS,
  'React': React,
  'ExpressJS': Express,
  'Spring Boot': SpringBoot,
  'Tailwind CSS': Tailwindcss,
  'Jest': Jest,
  'Cypress': Cypress,
  'Flask': Flask,
  'NestJS': NestJS,
  'Django': Django,
  'MySQL': Mysql,
  'Sqlite': Sqlite,
  'PostgreSQL': Postgresql,
  'MongoDB': Mongodb,
  'Redis': Redis,
  'DynamoDB': DynamoDB,
  'Trello': TrelloIcon,
  'Figma': FigmaIcon,
  'Notion': NotionIcon,
  'Visual Studio Code': VSCode,
  'Git': Git,
  'Chrome DevTools': ChromeDev,
  'NPM': NPM,
  'Spring Tools': SpringTools,
  'Postman': Postman,
  'Apollo Graphql': ApolloGraphql,
  'Gitkraken': Gitkraken,
  'Yarn': Yarn,
  'HardHat': HardHat,
  'NodeJS': NodeJS,
  'Deno': Deno,
  'Apache Tomcat': ApacheTomcat,
  'Wasmer': Wasmer,
  'Github Pages': AiFillGithub,
  'Vercel': SiVercel,
  'Docker': GrDocker,
  'AWS EC2': FaAws,
  'Nginx': DiNginx,
  'Kubernetes': SiKubernetes,
  'Gunicorn': GiUnicorn,
  'PM2': SiPm2,
  'JSON Web Tokens': JSONWebTokens,
  'ReduxJS': Redux,
  'Firebase': Firebase,
  'NextAuth.js': NextAuth,
  'Socket.io': SocketIO,
  'Ethers.js': EthersJS,
};

export const skillIconKeys = Object.keys(skillIconRegistry).sort((a, b) => a.localeCompare(b));
export const getSkillIcon = (key: string) => Object.hasOwn(skillIconRegistry, key) ? skillIconRegistry[key] : skillIconRegistry.General;
export const normalizeSkillName = (name: string) => name.trim().toLocaleLowerCase("en-US");
