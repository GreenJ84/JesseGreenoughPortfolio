/** @format */
'use server';

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const databaseName = 'PersonalPortfolio';
const connectionString = process.env.DB_CONN_STRING;
if (!connectionString) {
  throw new Error('Env DB_CONN_STRING is not defined!');
}

const DB_CLIENT = new MongoClient(connectionString);
const DB = DB_CLIENT.db(databaseName);
export default DB;

export const DatabaseCollections = {
  projects: 'projects',
  education: 'degrees',
  certifications: 'certifications',
  workExperience: 'workExperience',
  secondaryExperience: 'secondaryExperience',
  resumes: 'resumes',
};
export type DatabaseCollectionType = keyof typeof DatabaseCollections;
