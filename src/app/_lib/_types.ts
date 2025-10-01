// Base interface that all portfolio data must extend
export interface BasePortfolioItem {
  id?: string;
}

export enum DataType {
  Project = 'projects',
  Certification = 'certifications',
  Education = 'education',
  Work = 'work',
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

export interface EducationType extends BasePortfolioItem {
  college: string;
  degree: string;
  date: string; // "start - end"
  startDate?: string;
  endDate?: string;
  description: string[];
  icon: string;
  website: string;
}

export interface WorkType extends BasePortfolioItem {
  company: string;
  position: string;
  logo: string;
  location: string;
  date: string; // "start - end"
  details: string[];
}