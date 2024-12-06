/** @format */

import { IconBaseProps } from 'react-icons';
import * as NavIcons from './_icons/navigation';
import * as SocialIcons from './_icons/social';

interface NavLink {
  route: string;
  text: string;
  icon: React.ComponentType<IconBaseProps>;
}

export const InternalNavLinks: NavLink[] = [
  {
    route: '/',
    text: 'Home',
    icon: NavIcons.Home,
  },
  {
    route: '/about',
    text: 'About',
    icon: NavIcons.About,
  },
  {
    route: '/skills',
    text: 'Skills',
    icon: NavIcons.Skills,
  },
  {
    route: '/projects',
    text: 'Projects',
    icon: NavIcons.Projects,
  },
  {
    route: '/education',
    text: 'Education',
    icon: NavIcons.Education,
  },
  {
    route: '/work',
    text: 'Work',
    icon: NavIcons.Work,
  },
  {
    route: '/resumes',
    text: 'Resumes',
    icon: NavIcons.Resume,
  },
];

export const SocialNavLinks: NavLink[] = [
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
