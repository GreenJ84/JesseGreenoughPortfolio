// Shared persisted fields. Concrete resources make their own stored fields required.
export interface BaseItem {
  id?: string;
  title: string;
  brief: string;
  image_url: string;
}

export type PortfolioData = Project | Certification | Education | Work | Skill | Resume;

export interface Resume extends BaseItem {
  // id?: string; -> send vs receive
  // title: string; -> job_title
  // brief: string; -> view
  // image_url: string; -> image
  download: string;
  categories: string[];
}

// TODO: Fix
export interface Skill extends BaseItem {
  // id?: string; -> send vs receive
  // title: string; -> name
  // brief: string; -> issuer
  // image_url: string; -> icon_key
  category: string;
  name: string;
  rating: number;
  sortOrder: number;
  visible: boolean;
}


export interface Project extends BaseItem {
  // id?: string; -> send vs receive
  // title: string; -> name
  // brief: string; -> brief
  // image_url: string; -> image_path
  description: string;
  priority: number;
  date: string;
  deployed_url: string;
  github_url: string;
  categories: string[];
  key_techs: string[];
}

export interface Certification extends BaseItem {
  // id?: string; -> send vs receive
  // title: string; -> title
  // brief: string; -> issuer
  // image_url: string; -> image_path
  description: string;
  priority: number;
  date: string;
  url: string;
  techs: string[];
}

export interface Education extends BaseItem {
  // id?: string; -> send vs receive
  // title: string; -> program_name
  // brief: string; -> school_name
  // image_url: string; -> image_path
  description: string;
  url: string;
  start_date: Date;
  end_date?: Date;
  details: string[];
}

export interface Work extends BaseItem {
  // id?: string; -> send vs receive
  // title: string; -> position
  // brief: string; -> company
  // image_url: string; -> logo of the company
  primary: boolean;
  location: string;
  start_date: string;
  end_date?: string;
  details: string[];
}
// Browser/API dates are UTC date-only strings, while MongoDB keeps BSON Dates.
export type EducationDTO = Omit<Education, 'id' | 'start_date' | 'end_date'> & {
  id: string;
  start_date: string;
  end_date?: string;
};
