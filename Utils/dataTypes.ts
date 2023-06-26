/** @format */

export interface workItem {
  company: string;
  logo: string;
  position: string;
  location: string;
  date: string;
  details: string[];
}

export interface IProject {
  id: string;
  priority?: number;
  name: string;
  date?: string;
  brief?: string;
  description: string;
  image_path: string;
  deployed_url: string | null;
  github_url: string;
  category: string[];
  key_techs: string[];
}

export interface educationType {
  college: string;
  degree: string;
  date: string;
  description: string[];
  icon: string;
  website: string;
}

export interface certificationType {
  id?: string;
  priority?: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
  url: string;
  tech?: string[];
}
