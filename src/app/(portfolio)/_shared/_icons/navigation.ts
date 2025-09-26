import dynamic from 'next/dynamic';
import { IconBaseProps } from 'react-icons';


const AiOutlineHome = dynamic(() => import("react-icons/ai").then(m => m.AiOutlineHome));
const AiOutlineUser = dynamic(() => import("react-icons/ai").then(m => m.AiOutlineUser));
const AiOutlineFundProjectionScreen = dynamic(() => import("react-icons/ai").then(m => m.AiOutlineFundProjectionScreen));
const AiFillStar = dynamic(() => import("react-icons/ai").then(m => m.AiFillStar));
const CgFileDocument = dynamic(() => import("react-icons/cg").then(m => m.CgFileDocument));
export const InternalIcons = {
  Home: AiOutlineHome,
  About: AiOutlineUser,
  Skills: AiFillStar,
  Projects: AiOutlineFundProjectionScreen,
  Education: AiOutlineHome,
  Work: AiOutlineHome,
  Resume: CgFileDocument,
}

export interface NavLink {
  route: string;
  text: string;
  icon: React.ComponentType<IconBaseProps>;
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