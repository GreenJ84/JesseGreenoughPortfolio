
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

// Database connection
export const OLD_DB_INFO = {
  name: "PersonalPortfolio",
  collections: {
    RES: "resumes",
    WORK: "workExperience",
    SWORK: "secondaryExperience",
    CERT: "certifications",
    EDU: "degrees",
    PROJ: "projects",
  }
}

export const DB_INFO = {
  name: "PersonalPortfolio",
  collections: {
    RES: "resume",
    WORK: "work",
    SWORK: "secondaryExperience",
    CERT: "certification",
    EDU: "education",
    PROJ: "project",
  }
}

// Creating a client is lazy: importing this module never connects or migrates data.
const connectionString = process.env.DB_CONN_STRING?.trim()
  || (process.env.NODE_ENV !== "production" ? "mongodb://localhost:27017" : "");

if (!connectionString) {
  throw new Error("DB_CONN_STRING must be configured in production");
}

const databaseGlobal = globalThis as typeof globalThis & {
  portfolioMongoClient?: MongoClient;
};

const client = databaseGlobal.portfolioMongoClient ?? new MongoClient(connectionString);

// Keep the pool across development hot reloads. Application code must not close it.
if (process.env.NODE_ENV !== "production") {
  databaseGlobal.portfolioMongoClient = client;
}

export const DB = client.db(DB_INFO.name);
