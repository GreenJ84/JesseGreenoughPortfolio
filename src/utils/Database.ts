
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

// Database connection
const production = process.env.NODE_ENV === "production";
export const DB_INFO = {
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

const DB_CLIENT = new MongoClient( production ? 
    process.env.DB_CONN_STRING! : 
    "mongodb://localhost:27017"
  );

export const DB = DB_CLIENT.db(DB_INFO.name);

