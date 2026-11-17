// Base interface that all portfolio data must extend
export interface BasePortfolioItem {
  id?: string;
}
export interface BaseItem {
  id?: string;
  title: string;
  brief: string;
  description: string;
  image: string;
  url: string;
}


export type PortfolioData = ProjectType | CertificationType | EducationType | WorkType;


export interface ProjectType extends BasePortfolioItem {
  priority: number;
  name: string;
  date: string;
  brief: string;
  description: string;
  image_path: string;
  deployed_url: string;
  github_url: string;
  categories: string[];
  key_techs: string[];
}

export interface CertificationType extends BasePortfolioItem {
  priority: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
  url: string;
  techs: string[];
}

export interface EducationType extends BaseItem {
  college: string;
  start_date: Date;
  end_date?: Date;
  details: string[];
}

export interface WorkType extends BasePortfolioItem {
  company: string;
  position: string;
  logo: string;
  location: string;
  date: string; // "start - end"
  details: string[];
}