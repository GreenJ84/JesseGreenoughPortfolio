import dynamic from 'next/dynamic';

export const Home = dynamic(() => import("react-icons/ai").then((mod) => mod.AiOutlineHome));

export const About = dynamic(() => import("react-icons/ai").then((mod) => mod.AiOutlineUser));

export const Projects = dynamic(() => import("react-icons/ai").then((mod) => mod.AiOutlineFundProjectionScreen));

export const Skills = dynamic(() => import("react-icons/ai").then((mod) => mod.AiFillStar));

export const Education = dynamic(() => import("react-icons/ai").then((mod) => mod.AiOutlineHome));

export const Work = dynamic(() => import("react-icons/ai").then((mod) => mod.AiOutlineHome));

export const Resume = dynamic(() => import("react-icons/cg").then((mod) => mod.CgFileDocument));

