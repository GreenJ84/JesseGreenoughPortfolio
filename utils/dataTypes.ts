/** @format */

import { MongoClient, SortDirection, WithId } from "mongodb";

// Database connection
const DB_CLIENT = new MongoClient(process.env.DB_CONN_STRING!);
const DB = DB_CLIENT.db(process.env.DB_NAME);

// ======== Work Collection
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
export const workDatabase = DB.collection<workType>(process.env.WORK_COLL!);
export const secWorkDatabase = DB.collection<workType>(process.env.SWORK_COLL!);
export class workCollectionService {
  public static async getPrimaryWork() {
    return await workDatabase.find().sort({ _id: -1 }).limit(5).toArray();
  }

  public static async getSecondaryWork() {
    return await secWorkDatabase.find().sort({ _id: -1 }).limit(5).toArray();
  }
}

// ======== Project Collection
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
export const projectDatabase = DB.collection<projectType>(
  process.env.PROJ_COLL!
);
export class projectCollectionService {
  // Retrieve Project categories and key techs
  public static async getProjectFilterOptions() {
    let res: {
      categories: string[];
      key_techs: string[];
    }[] = await projectDatabase
      .find()
      .project<{ categories: string[]; key_techs: string[] }>({
        categories: 1,
        key_techs: 1,
        _id: 0,
      })
      .toArray();

    const categories: string[] = Array.from(
      new Set(res.map((x) => x.categories).flat())
    );
    const techs: string[] = Array.from(
      new Set(res.map((x) => x.key_techs).flat())
    );

    return [categories, techs];
  }

  // Private type mapper
  static #mapProjectItem(results: WithId<projectType>[]) {
    return results.map(
      (result) =>
        ({
          id: result._id.toString(),
          priority: result.priority,
          name: result.name,
          date: result.date.slice(0, 7),
          brief: result.brief ?? result.description,
          description: result.description,
          image_path: result.image_path,
          deployed_url: result.deployed_url,
          github_url: result.github_url,
          categories: result.categories,
          key_techs: result.key_techs,
        } as projectType)
    );
  }

  // Private Project retrival base
  static async #getProjectItems(
    sort: boolean = true,
    offset: number = 0,
    options?: object
  ) {
    let sortOption: { [key: string]: SortDirection } = {
      name: 1,
      _id: -1,
    };
    if (sort) {
      (sortOption["date"] = -1), (sortOption["priority"] = 1);
    }

    return await projectDatabase
      .find(options || {})
      .sort(sortOption)
      .skip(offset)
      .limit(10)
      .toArray();
  }

  public async getUnsortedProjects(offset: number = 0) {
    return projectCollectionService.#mapProjectItem(await projectCollectionService.#getProjectItems(false, offset));
  }

  // Top priority project retrival
  public static async getTopProjects() {
    return this.#mapProjectItem(await this.#getProjectItems());
  }

  // Category filtered project retrival
  public async getProjectsByCategory(category: string, offset: number = 0) {
    return projectCollectionService.#mapProjectItem(
      await projectCollectionService.#getProjectItems(true, offset, { categories: category })
    );
  }

  // Key tech filtered project retrival
  public async getProjectsByTech(tech: string, offset: number = 0) {
    return projectCollectionService.#mapProjectItem(
      await projectCollectionService.#getProjectItems(true, offset, { key_techs: tech })
    );
  }
}

// ======== Education Collection
export const educationDatabase = DB.collection<educationType>(
  process.env.DEG_COLL!
);
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

export const certificationDatabase = DB.collection<certificationType>(
  process.env.CERT_COLL!
);
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
