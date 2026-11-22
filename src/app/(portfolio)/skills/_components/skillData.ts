import { AiFillHtml5 as Html5, AiOutlineConsoleSql, AiFillGithub } from "react-icons/ai";
import { DiCss3 as Css3, DiJavascript1 as Javascript, DiPython as Python, DiReact as React, DiSqllite as Sqlite, DiRedis as Redis, DiGit as Git, DiChrome as ChromeDev, DiNpm as NPM, DiNodejs as NodeJS, DiNginx } from "react-icons/di";
import { SiTypescript as Typescript, SiGraphql, SiSolidity, SiNextdotjs as NextJS, SiExpress as Express, SiTailwindcss as Tailwindcss, SiNestjs as NestJS, SiCypress as Cypress, SiDjango as Django, SiFlask as Flask, SiJest as Jest, SiSpringboot as SpringBoot, SiPostgresql as Postgresql, SiMongodb as Mongodb, SiAmazondynamodb as DynamoDB, SiFigma as FigmaIcon, SiNotion as NotionIcon, SiVisualstudiocode as VSCode, SiSpring as SpringTools, SiPostman as Postman, SiApollographql as ApolloGraphql, SiGitkraken as Gitkraken, SiYarn as Yarn, SiDeno as Deno, SiApachetomcat as ApacheTomcat, SiWasmer as Wasmer, SiVercel, SiKubernetes, SiPm2, SiRedux as Redux, SiJsonwebtokens as JSONWebTokens, SiFirebase as Firebase, SiSocketdotio as SocketIO } from "react-icons/si";
import { FaJava as Java, FaRust as Rust, FaTrello as TrelloIcon, FaHardHat as HardHat, FaAws, FaShieldAlt as NextAuth } from "react-icons/fa";
import { BsFillMarkdownFill } from "react-icons/bs";
import { GrMysql as Mysql, GrDocker } from "react-icons/gr";
import { GiUnicorn } from "react-icons/gi";
import { TiWeatherWindyCloudy as EthersJS } from "react-icons/ti";
/** @format */
import { ComponentType } from "react";
import { IconBaseProps } from "react-icons";

//Languages











// Frameworks












// Databases







// Planning Tools



// Developer Tools










// Runtime Tools




// Devops Tools








// Extras







export type TSkill = { name: string; rating: number; icon: ComponentType<IconBaseProps>;
  [key: string]: string | number | ComponentType<IconBaseProps>;
}

type TSkillData = {
  languages: TSkill[];
  frameworks: TSkill[];
  databases: TSkill[];
  "planning_Tools": TSkill[];
  "development_Tools": TSkill[];
  "runtime_Tools": TSkill[];
  "devops_Tools": TSkill[];
  extras: TSkill[];
}
export const skillData: TSkillData = {
  "languages": [
    { name: "HTML5", rating: 5, icon: Html5 },
    { name: "JavaScript", rating: 5, icon: Javascript },
    { name: "TypeScript", rating: 5, icon: Typescript },
    { name: "CSS3", rating: 4, icon: Css3 },
    { name: "Java", rating: 4, icon: Java },
    { name: "SQL", rating: 4, icon: AiOutlineConsoleSql },
    { name: "GraphQL", rating: 4, icon: SiGraphql },
    { name: "Markdown", rating: 3, icon: BsFillMarkdownFill },
    { name: "Rust", rating: 3, icon: Rust },
    { name: "Python", rating: 2, icon: Python },
    { name: "Solidity", rating: 2, icon: SiSolidity },
  ],
  "frameworks": [
    { name: "Next.js", rating: 5, icon: NextJS },
    { name: "React", rating: 5, icon: React },
    { name: "ExpressJS", rating: 4, icon: Express },
    { name: "Spring Boot", rating: 4, icon: SpringBoot },
    { name: "Tailwind CSS", rating: 3, icon: Tailwindcss },
    { name: "Jest", rating: 4, icon: Jest },
    { name: "Cypress", rating: 3, icon: Cypress },
    { name: "Flask", rating: 3, icon: Flask },
    { name: "NestJS", rating: 2, icon: NestJS },
    { name: "Django", rating: 2, icon: Django },
  ],
  "databases": [
    { name: "MySQL", rating: 5, icon: Mysql },
    { name: "Sqlite", rating: 5, icon: Sqlite },
    { name: "PostgreSQL", rating: 4, icon: Postgresql },
    { name: "MongoDB", rating: 4, icon: Mongodb },
    { name: "Redis", rating: 4, icon: Redis },
    { name: "DynamoDB", rating: 1, icon: DynamoDB },
  ],
  "planning_Tools": [
    { name: "Trello", rating: 4, icon: TrelloIcon },
    { name: "Figma", rating: 3, icon: FigmaIcon },
    { name: "Notion", rating: 3, icon: NotionIcon
    }
  ],
  "development_Tools": [
    { name: "Visual Studio Code", rating: 5, icon: VSCode },
    { name: "Git", rating: 4, icon: Git },
    { name: "Chrome DevTools", rating: 4, icon: ChromeDev },
    { name: "NPM", rating: 4, icon: NPM },
    { name: "Spring Tools", rating: 3, icon: SpringTools },
    { name: "Postman", rating: 3, icon: Postman },
    { name: "Apollo Graphql", rating: 3, icon: ApolloGraphql },
    { name: "Gitkraken", rating: 3, icon: Gitkraken },
    { name: "Yarn", rating: 2, icon: Yarn },
    { name: "HardHat", rating: 2, icon: HardHat },

  ],
  "runtime_Tools": [
    { name: "NodeJS", rating: 5, icon: NodeJS },
    { name: "Deno", rating: 3, icon: Deno },
    { name: "Apache Tomcat", rating: 2, icon: ApacheTomcat },
    { name: "Wasmer", rating: 1, icon: Wasmer
    }
  ],
  "devops_Tools": [
    { name: "Github Pages", rating: 5, icon: AiFillGithub },
    { name: "Vercel", rating: 4, icon: SiVercel },
    { name: "Docker", rating: 4, icon: GrDocker },
    { name: "AWS EC2", rating: 3, icon: FaAws },
    { name: "Nginx", rating: 3, icon: DiNginx },
    { name: "Kubernetes", rating: 2, icon: SiKubernetes },
    { name: "Gunicorn", rating: 2, icon: GiUnicorn },
    { name: "PM2", rating: 2, icon: SiPm2
    }
  ],
  "extras": [
    { name: "JSON Web Tokens", rating: 4, icon: JSONWebTokens },
    { name: "ReduxJS", rating: 4, icon: Redux },
    { name: "Firebase", rating: 3, icon: Firebase },
    { name: "NextAuth.js", rating: 3, icon: NextAuth },
    { name: "Socket.io", rating: 3, icon: SocketIO },
    { name: "Ethers.js", rating: 2, icon: EthersJS },
  ]
}