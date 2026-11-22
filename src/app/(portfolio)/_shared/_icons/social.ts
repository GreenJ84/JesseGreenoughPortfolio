import { AiFillGithub, AiOutlineTwitter, AiFillInstagram } from "react-icons/ai";
import dynamic from "next/dynamic";




const FaLinkedinIn  = dynamic(() => import("react-icons/fa").then(m => m.FaLinkedinIn));
export const SocialIcons = {
  Github: AiFillGithub,
  Twitter: AiOutlineTwitter,
  Instagram: AiFillInstagram,
  Linkedin: FaLinkedinIn,
}


import {NavLink} from './navigation';
export const SocialLinks: NavLink[] = [
  {
    route: "https://github.com/GreenJ84",
    text: "GitHub",
    icon: SocialIcons.Github,
  },
  {
    route: "https://twitter.com/GoodGreens84",
    text: "Twitter",
    icon: SocialIcons.Twitter,
  },
  {
    route: "https://www.linkedin.com/in/jessegreenough/",
    text: "LinkedIn",
    icon: SocialIcons.Linkedin,
  },
  {
    route: "https://www.instagram.com/jesse.greenough/",
    text: "Instagram",
    icon: SocialIcons.Instagram,
  },
];

export default SocialLinks;