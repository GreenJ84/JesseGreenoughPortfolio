// Shared persisted fields. Concrete resources make their own stored fields required.
export interface BaseItem {
  id?: string;
  title?: string;
  name?: string;
  brief?: string;
  description?: string;
  image?: string;
  url?: string;
  date?: string;
  priority?: number;
  categories?: string[];
  details?: string[];
}

export const DataType = {
  Project: 'projects',
  Certification: 'certifications',
  Education: 'education',
  Work: 'work',
  Skill: 'skills',
} as const;


export type PortfolioData = ProjectType | CertificationType | EducationType | WorkType | SkillType | ResumeType;

export interface ResumeType extends BaseItem {
  image_url: string;
  download: string;
  view: string;
  categories: string[];
}

export interface SkillType extends BaseItem {
  category: string;
  name: string;
  rating: number;
  iconKey: string;
  sortOrder: number;
  visible: boolean;
}


export interface ProjectType extends BaseItem {
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

export interface CertificationType extends BaseItem {
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
  title: string;
  brief: string;
  description: string;
  image: string;
  url: string;
  college: string;
  start_date: Date;
  end_date?: Date;
  details: string[];
}

export interface WorkType extends BaseItem {
  company: string;
  position: string;
  logo: string;
  location: string;
  date: string; // "start - end"
  details: string[];
}
// Browser/API dates are UTC date-only strings, while MongoDB keeps BSON Dates.
export type EducationDTO = Omit<EducationType, 'id' | 'start_date' | 'end_date'> & {
  id: string;
  start_date: string;
  end_date?: string;
};
