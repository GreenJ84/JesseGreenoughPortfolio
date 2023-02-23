/** @format */

export interface IProject {
  id: string;
  priority?: number;
  name: string;
  date?: string;
  description: string;
  image_path: string;
  deployed_url: string | null;
  github_url: string;
  category: string[];
  key_techs: string[];
}
