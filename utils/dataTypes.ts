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
const workDatabase = DB.collection<workType>(process.env.WORK_COLL!);
const secWorkDatabase = DB.collection<workType>(process.env.SWORK_COLL!);
export class workCollectionService {
  static #mapWorkData(data: WithId<workType>[]) {
    return data.map(
      (result) =>
        ({
          id: result._id.toString(),
          company: result.company,
          logo: result.logo,
          position: result.position,
          location: result.location,
          date: result.date,
          details: result.details,
        } as workType)
    );
  }

  public async getWorkTotals(): Promise<[number, number]> {
    const workTotal = await workDatabase.countDocuments();
    const secWorkTotal = await secWorkDatabase.countDocuments();

    return [workTotal, secWorkTotal];
  }

  public async getPrimaryWork(offset: number = 0) {
    return workCollectionService.#mapWorkData(
      await workDatabase
        .find()
        .sort({ _id: -1 })
        .skip(offset)
        .limit(5)
        .toArray()
    );
  }

  public async getSecondaryWork(offset: number = 0) {
    return workCollectionService.#mapWorkData(
      await secWorkDatabase
        .find()
        .sort({ _id: -1 })
        .skip(offset)
        .limit(5)
        .toArray()
    );
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

    const categories = new Map<string, number>();
    const techs = new Map<string, number>();
    res.map((item) => {
      item.categories.forEach((category) => {
        if (categories.has(category)) {
          categories.set(category, categories.get(category)! + 1);
        } else {
          categories.set(category, 1);
        }
      });
      item.key_techs.forEach((tech) => {
        if (techs.has(tech)) {
          techs.set(tech, techs.get(tech)! + 1);
        } else {
          techs.set(tech, 1);
        }
      });
    });

    return [
      JSON.stringify(Array.from(categories.entries())),
      JSON.stringify(Array.from(techs.entries())),
    ];
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
    filterOptions?: object
  ) {
    let sortOption: { [key: string]: SortDirection } = {
      name: 1,
      _id: -1,
    };
    if (sort) {
      sortOption = {
        priority: 1,
        date: -1,
        ...sortOption,
      };
    }

    return await projectDatabase
      .find(filterOptions ?? {})
      .sort(sortOption)
      .skip(offset)
      .limit(10)
      .toArray();
  }

  public async getUnsortedProjects(offset: number = 0) {
    return projectCollectionService.#mapProjectItem(
      await projectCollectionService.#getProjectItems(false, offset)
    );
  }

  // Top priority project retrival
  public static async getTopProjects(): Promise<[projectType[], number]> {
    return [
      this.#mapProjectItem(await this.#getProjectItems()),
      await projectDatabase.countDocuments(),
    ];
  }

  // Category filtered project retrival
  public async getProjectsByCategory(category: string, offset: number = 0) {
    return projectCollectionService.#mapProjectItem(
      await projectCollectionService.#getProjectItems(true, offset, {
        categories: category,
      })
    );
  }

  // Key tech filtered project retrival
  public async getProjectsByTech(tech: string, offset: number = 0) {
    return projectCollectionService.#mapProjectItem(
      await projectCollectionService.#getProjectItems(true, offset, {
        key_techs: tech,
      })
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

// ======== Certification Collection
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
export class certificationCollectionService {
  public static async getCertificationFilterOptions(): Promise<[string, string]> { 
    let res: {
      issuer: string;
      techs: string[];
    }[] = await certificationDatabase
      .find()
        .project<{ issuer: string; techs: string[]; }>({
        issuer: 1,
        techs: 1,
        _id: 0,
      })
      .toArray();

    const issuerMap = new Map<string, number>();
    const techMap = new Map<string, number>();
    res.map((item) => {
      if (issuerMap.has(item.issuer)) {
        issuerMap.set(item.issuer, issuerMap.get(item.issuer)! + 1);
      } else {
        issuerMap.set(item.issuer, 1);
      }
      item.techs.forEach((tech) => {
        if (techMap.has(tech)) {
          techMap.set(tech, techMap.get(tech)! + 1);
        } else {
          techMap.set(tech, 1);
        }
      });
    });

    return [
      JSON.stringify(Array.from(issuerMap.entries())),
      JSON.stringify(Array.from(techMap.entries())),
    ];
  }

  static #mapCertificationData(data: WithId<certificationType>[]) {
    return data.map(
      (result) =>
        ({
          id: result._id.toString(),
          priority: result.priority,
          title: result.title,
          issuer: result.issuer,
          date: result.date.slice(0, 10),
          description: result.description,
          image: result.image,
          url: result.url,
          techs: result.techs,
        } as certificationType)
    );
  }

  static async #getCertificationItems(
    sort: boolean = true,
    offset: number = 0,
    filterOptions?: object
  ) {
    let sortOption: { [key: string]: SortDirection } = {
      title: 1,
      _id: -1,
    };
    if (sort) {
      sortOption = {
        priority: 1,
        date: -1,
        ...sortOption,
      };
    }
    return this.#mapCertificationData(
      await certificationDatabase
        .find(filterOptions ?? {})
        .sort({})
        .skip(offset)
        .limit(10)
        .toArray()
    );
  }

  public async getUnsortedCertification(offset: number = 0) {
    return await certificationCollectionService.#getCertificationItems(
      false,
      offset
    );
  }

  static async getTopCertification(): Promise<[certificationType[], number]> {
    return [await certificationCollectionService.#getCertificationItems(), await certificationDatabase.countDocuments()];
  }

  public async getCertificationByTech(tech: string, offset: number = 0) {
    return await certificationCollectionService.#getCertificationItems(
      true,
      offset,
      {
        techs: tech,
      }
    );
  }

  public async getCertificationByIssuer(issuer: string, offset: number = 0) {
    return await certificationCollectionService.#getCertificationItems(
      true,
      offset,
      {
        issuer: issuer,
      }
    );
  }
}

export const resumeDatabase = DB.collection<resumeType>(process.env.RES_COLL!);
export interface resumeType {
  id?: string;
  image_url: string;
  download: string;
  view: string;
  categories: string[];
}
