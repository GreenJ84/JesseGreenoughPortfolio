import { AiFillGithub, AiOutlineTwitter, AiFillInstagram} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { NavLink } from './navigation';


export const SocialIcons = {
  Github: AiFillGithub,
  Twitter: AiOutlineTwitter,
  Instagram: AiFillInstagram,
  Linkedin: FaLinkedinIn,
}

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