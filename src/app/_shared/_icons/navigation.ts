import { IconBaseProps } from 'react-icons';
import {AiOutlineHome, AiOutlineUser, AiOutlineFundProjectionScreen, AiFillStar } from "react-icons/ai";
import {CgFileDocument} from "react-icons/cg";

export interface NavLink {
  route: string;
  text: string;
  icon: React.ComponentType<IconBaseProps>;
}

export const InternalIcons = {
  Home: AiOutlineHome,
  About: AiOutlineUser,
  Skills: AiFillStar,
  Projects: AiOutlineFundProjectionScreen,
  Education: AiOutlineHome,
  Work: AiOutlineHome,
  Resume: CgFileDocument,
}

export const InternalLinks: NavLink[] = [
  {
    route: '/',
    text: 'Home',
    icon: InternalIcons.Home,
  },
  {
    route: '/about',
    text: 'About',
    icon: InternalIcons.About,
  },
  {
    route: '/skills',
    text: 'Skills',
    icon: InternalIcons.Skills,
  },
  {
    route: '/projects',
    text: 'Projects',
    icon: InternalIcons.Projects,
  },
  {
    route: '/education',
    text: 'Education',
    icon: InternalIcons.Education,
  },
  {
    route: '/work',
    text: 'Work',
    icon: InternalIcons.Work,
  },
  {
    route: '/resumes',
    text: 'Resumes',
    icon: InternalIcons.Resume,
  },
];

export default InternalLinks;