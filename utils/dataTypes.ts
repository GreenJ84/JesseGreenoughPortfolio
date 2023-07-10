/** @format */

import { MongoClient } from "mongodb";

// Database connection
const DB_CLIENT = new MongoClient(process.env.DB_CONN_STRING!);
const DB = DB_CLIENT.db(process.env.DB_NAME);


export const workDatabase = DB.collection<workType>(process.env.WORK_COLL!);
export const secWorkDatabase = DB.collection<workType>(process.env.SWORK_COLL!);
export interface workType {
  id?: string;
  company: string;
  position: string;
  logo: string;
  location: string;
  date: string; // "start - end"
  startDate?: string;
  endDate?: string;
  details: string[];
}

export const projectDatabase = DB.collection<projectType>(process.env.PROJ_COLL!);
export interface projectType {
  id?: string;
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

export const educationDatabase = DB.collection<educationType>(process.env.DEG_COLL!);
export interface educationType {
  id?: string;
  college: string;
  degree: string;
  date: string; // "start - end"
  startDate?: string;
  endDate?: string;
  description: string[];
  icon: string;
  website: string;
}

export const certificationDatabase = DB.collection<certificationType>(process.env.CERT_COLL!);
export interface certificationType {
  id?: string;
  priority: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
  url: string;
  techs: string[];
}

export const resumeDatabase = DB.collection<resumeType>(process.env.RES_COLL!);
export interface resumeType {
  id?: string;
  image_url: string;
  download: string;
  view: string;
  categories: string[];
}