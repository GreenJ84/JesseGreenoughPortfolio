/** @format */

import { MongoClient } from "mongodb";

// Database connection
const DB_CLIENT = new MongoClient(process.env.DB_CONN_STRING!);
export const DB = DB_CLIENT.db(process.env.DB_NAME);
export const projectDatabase = DB.collection<projectType>(process.env.PROJ_COLL!);
export interface workType {
  id?: string;
  company: string;
  logo: string;
  position: string;
  location: string;
  date: string;
  details: string[];
}

export interface projectType {
  id?: string;
  priority: number;
  name: string;
  date: string;
  brief: string;
  description: string;
  image_path: string;
  deployed_url: string | null;
  github_url: string;
  category: string[];
  key_techs: string[];
}

export interface educationType {
  id?: string;
  college: string;
  degree: string;
  date: string;
  description: string[];
  icon: string;
  website: string;
}

export interface certificationType {
  id?: string;
  priority: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
  url: string;
  tech?: string[];
}
