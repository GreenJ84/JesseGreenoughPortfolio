/** @format */
import dynamic from "next/dynamic";
import { ComponentType } from "react";
import { IconBaseProps } from "react-icons";

//Languages
const Html5 = dynamic(() =>
  import("react-icons/ai").then((m) => m.AiFillHtml5)
);
const Css3 = dynamic(() => import("react-icons/di").then((m) => m.DiCss3));
const Typescript = dynamic(() =>
  import("react-icons/si").then((m) => m.SiTypescript)
);
const Javascript = dynamic(() =>
  import("react-icons/di").then((m) => m.DiJavascript1)
);
const Java = dynamic(() => import("react-icons/fa").then((m) => m.FaJava));
const SiGraphql = dynamic(() =>
  import("react-icons/si").then((m) => m.SiGraphql)
);
const AiOutlineConsoleSql = dynamic(() =>
  import("react-icons/ai").then((m) => m.AiOutlineConsoleSql)
);
const Python = dynamic(() =>
  import("react-icons/di").then((m) => m.DiPython)
);
const BsFillMarkdownFill = dynamic(() =>
  import("react-icons/bs").then((m) => m.BsFillMarkdownFill)
);
const Rust = dynamic(() => import("react-icons/fa").then((m) => m.FaRust));
const SiSolidity = dynamic(() =>
  import("react-icons/si").then((m) => m.SiSolidity)
);
// Frameworks
const NextJS = dynamic(() =>
  import("react-icons/si").then((m) => m.SiNextdotjs)
);
const React = dynamic(() => import("react-icons/di").then((m) => m.DiReact));
const Express = dynamic(() =>
  import("react-icons/si").then((m) => m.SiExpress)
);
const Tailwindcss = dynamic(() =>
  import("react-icons/si").then((m) => m.SiTailwindcss)
);
const Cypress = dynamic(() => import("react-icons/si").then((m) => m.SiCypress));
const Django = dynamic(() =>
  import("react-icons/si").then((m) => m.SiDjango)
);

const Flask = dynamic(() => import("react-icons/si").then((m) => m.SiFlask));
const Jest = dynamic(() => import("react-icons/si").then((m) => m.SiJest));
const SpringBoot = dynamic(() =>
  import("react-icons/si").then((m) => m.SiSpringboot)
);

// Databases
const Mysql = dynamic(() => import("react-icons/gr").then((m) => m.GrMysql));
const Sqlite = dynamic(() =>
  import("react-icons/di").then((m) => m.DiSqllite)
);
const Postgresql = dynamic(() =>
  import("react-icons/si").then((m) => m.SiPostgresql)
);
const Mongodb = dynamic(() =>
  import("react-icons/si").then((m) => m.SiMongodb)
);
const Redis = dynamic(() => import("react-icons/di").then((m) => m.DiRedis));
const DynamoDB = dynamic(() =>
  import("react-icons/si").then((m) => m.SiAmazondynamodb)
);

// Planning Tools
const TrelloIcon = dynamic(() =>
  import("react-icons/fa").then((m) => m.FaTrello)
);
const FigmaIcon = dynamic(() => import("react-icons/si").then((m) => m.SiFigma));
const NotionIcon = dynamic(() =>
  import("react-icons/si").then((m) => m.SiNotion)
);
// Developer Tools
const VSCode = dynamic(() =>
  import("react-icons/si").then((m) => m.SiVisualstudiocode)
);
const Git = dynamic(() => import("react-icons/di").then((m) => m.DiGit));
const ChromeDev = dynamic(() =>
  import("react-icons/di").then((m) => m.DiChrome)
);
const NPM = dynamic(() => import("react-icons/di").then((m) => m.DiNpm));
const SpringTools = dynamic(() =>
  import("react-icons/si").then((m) => m.SiSpring)
);
const Postman = dynamic(() =>
  import("react-icons/si").then((m) => m.SiPostman)
);
const ApolloGraphql = dynamic(() =>
  import("react-icons/si").then((m) => m.SiApollographql)
);
const Gitkraken = dynamic(() =>
  import("react-icons/si").then((m) => m.SiGitkraken)
);
const Yarn = dynamic(() => import("react-icons/si").then((m) => m.SiYarn));
const HardHat = dynamic(() =>
  import("react-icons/fa").then((m) => m.FaHardHat)
);
// Runtime Tools
const NodeJS = dynamic(() =>
  import("react-icons/di").then((m) => m.DiNodejs)
);
const Deno = dynamic(() =>
  import("react-icons/si").then((m) => m.SiDeno)
);
const ApacheTomcat = dynamic(() =>
  import("react-icons/si").then((m) => m.SiApachetomcat)
);
const Wasmer = dynamic(() =>
  import("react-icons/si").then((m) => m.SiWasmer)
);
// Devops Tools
const AiFillGithub = dynamic(() =>
  import("react-icons/ai").then((m) => m.AiFillGithub)
);
const SiVercel = dynamic(() =>
  import("react-icons/si").then((m) => m.SiVercel)
);
const GrDocker = dynamic(() =>
  import("react-icons/gr").then((m) => m.GrDocker)
);
const FaAws = dynamic(() => import("react-icons/fa").then((m) => m.FaAws));
const DiNginx = dynamic(() => import("react-icons/di").then((m) => m.DiNginx));
const SiKubernetes = dynamic(() =>
  import("react-icons/si").then((m) => m.SiKubernetes)
);
const GiUnicorn = dynamic(() =>
  import("react-icons/gi").then((m) => m.GiUnicorn)
);
const SiPm2 = dynamic(() => import("react-icons/si").then((m) => m.SiPm2));
// Extras
const Redux = dynamic(() => import("react-icons/si").then((m) => m.SiRedux));
const JSONWebTokens = dynamic(() =>
  import("react-icons/si").then((m) => m.SiJsonwebtokens)
);
const Firebase = dynamic(() =>
  import("react-icons/si").then((m) => m.SiFirebase)
);
const NextAuth = dynamic(() =>
  import("react-icons/fa").then((m) => m.FaShieldAlt)
);
const SocketIO = dynamic(() =>
  import("react-icons/si").then((m) => m.SiSocketdotio)
);
const EthersJS = dynamic(() =>
  import("react-icons/ti").then((m) => m.TiWeatherWindyCloudy)
);

export type TSkill = {
  name: string;
  rating: number;
  icon: ComponentType<IconBaseProps>;
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
    {
      name: "HTML5",
      rating: 5,
      icon: Html5
    },
    {
      name: "CSS3",
      rating: 5,
      icon: Css3
    },
    {
      name: "TypeScript",
      rating: 5,
      icon: Typescript
    },
    {
      name: "JavaScript",
      rating: 5,
      icon: Javascript
    },
    {
      name: "Java",
      rating: 4,
      icon: Java
    },
    {
      name: "SQL",
      rating: 4,
      icon: AiOutlineConsoleSql
    },
    {
      name: "GraphQL",
      rating: 4,
      icon: SiGraphql
    },
    {
      name: "Python",
      rating: 3,
      icon: Python
    },
    {
      name: "Markdown",
      rating: 3,
      icon: BsFillMarkdownFill
    },
    {
      name: "Rust",
      rating: 3,
      icon: Rust
    },
    {
      name: "Solidity",
      rating: 2,
      icon: SiSolidity
    },
  ],
  "frameworks": [
    {
      name: "Next.js",
      rating: 5,
      icon: NextJS
    },
    {
      name: "React",
      rating: 5,
      icon: React
    },
    {
      name: "ExpressJS",
      rating: 4,
      icon: Express
    },
    {
      name: "Spring Boot",
      rating: 4,
      icon: SpringBoot
    },
    {
      name: "Tailwind CSS",
      rating: 3,
      icon: Tailwindcss
    },
    {
      name: "Jest",
      rating: 4,
      icon: Jest
    },
    {
      name: "Cypress",
      rating: 3,
      icon: Cypress
    },
    {
      name: "Flask",
      rating: 3,
      icon: Flask
    },
    {
      name: "Django",
      rating: 2,
      icon: Django
    },
  ],
  "databases": [
    {
      name: "MySQL",
      rating: 5,
      icon: Mysql
    },
    {
      name: "Sqlite",
      rating: 5,
      icon: Sqlite
    },
    {
      name: "PostgreSQL",
      rating: 4,
      icon: Postgresql
    },
    {
      name: "MongoDB",
      rating: 4,
      icon: Mongodb
    },
    {
      name: "Redis",
      rating: 4,
      icon: Redis
    },
    {
      name: "DynamoDB",
      rating: 1,
      icon: DynamoDB
    },
  ],
  "planning_Tools": [
    {
      name: "Trello",
      rating: 4,
      icon: TrelloIcon
    },
    {
      name: "Figma",
      rating: 3,
      icon: FigmaIcon
    },
    {
      name: "Notion",
      rating: 3,
      icon: NotionIcon
    }
  ],
  "development_Tools": [
    {
      name: "Visual Studio Code",
      rating: 5,
      icon: VSCode
    },
    {
      name: "Git",
      rating: 4,
      icon: Git
    },
    {
      name: "Chrome DevTools",
      rating: 4,
      icon: ChromeDev
    },
    {
      name: "NPM",
      rating: 4,
      icon: NPM
    },
    {
      name: "Spring Tools",
      rating: 3,
      icon: SpringTools
    },
    {
      name: "Postman",
      rating: 3,
      icon: Postman
    },
    {
      name: "Apollo Graphql",
      rating: 3,
      icon: ApolloGraphql
    },
    {
      name: "Gitkraken",
      rating: 3,
      icon: Gitkraken
    },
    {
      name: "Yarn",
      rating: 2,
      icon: Yarn
    },
    {
      name: "HardHat",
      rating: 2,
      icon: HardHat
    },

  ],
  "runtime_Tools": [
    {
      name: "NodeJS",
      rating: 5,
      icon: NodeJS
    },
    {
      name: "Deno",
      rating: 3,
      icon: Deno
    },
    {
      name: "Apache Tomcat",
      rating: 2,
      icon: ApacheTomcat
    },
    {
      name: "Wasmer",
      rating: 1,
      icon: Wasmer
    }
  ],
  "devops_Tools": [
    {
      name: "Github Pages",
      rating: 5,
      icon: AiFillGithub
    },
    {
      name: "Vercel",
      rating: 4,
      icon: SiVercel
    },
    {
      name: "Docker",
      rating: 4,
      icon: GrDocker
    },
    {
      name: "AWS EC2",
      rating: 3,
      icon: FaAws
    },
    {
      name: "Nginx",
      rating: 3,
      icon: DiNginx
    },
    {
      name: "Kubernetes",
      rating: 2,
      icon: SiKubernetes
    },
    {
      name: "Gunicorn",
      rating: 2,
      icon: GiUnicorn
    },
    {
      name: "PM2",
      rating: 2,
      icon: SiPm2
    }
  ],
  "extras": [
    {
      name: "JSON Web Tokens",
      rating: 4,
      icon: JSONWebTokens
    },
    {
      name: "ReduxJS",
      rating: 4,
      icon: Redux
    },
    {
      name: "Firebase",
      rating: 3,
      icon: Firebase
    },
    {
      name: "NextAuth.js",
      rating: 3,
      icon: NextAuth
    },
    {
      name: "Socket.io",
      rating: 3,
      icon: SocketIO
    },
    {
      name: "Ethers.js",
      rating: 2,
      icon: EthersJS
    },
  ]
}