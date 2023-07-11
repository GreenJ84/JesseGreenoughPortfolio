/** @format */

import { SortDirection, WithId } from "mongodb";
import { DB } from "../AppContext";

//** ======== Education Collection
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
const educationDatabase = DB.collection<educationType>(process.env.DEG_COLL!);

export class educationCollectionService {
  static #mapEducationData(data: WithId<educationType>[]) {
    return data.map(
      (result) =>
        ({
          id: result._id.toString(),
          college: result.college,
          degree: result.degree,
          date: result.date,
          description: result.description,
          icon: result.icon,
          website: result.website,
        } as educationType)
    );
  }

  static async #getEducationItems(offset: number) {
    return this.#mapEducationData(
      await educationDatabase
        .find()
        .sort({ _id: -1 })
        .skip(offset)
        .limit(5)
        .toArray()
    );
  }

  public static async getEducationData(
    offset: number = 0
  ): Promise<[educationType[], number?]> {
    return offset === 0
      ? [
          await educationCollectionService.#getEducationItems(offset),
          (await educationDatabase.countDocuments()) * 10,
        ]
      : [await educationCollectionService.#getEducationItems(offset)];
  }
}

//** ======== Certification Collection
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
const certificationDatabase = DB.collection<certificationType>(
  process.env.CERT_COLL!
);

export class certificationCollectionService {
  public static async getCertificationFilterOptions(): Promise<
    [string, string]
  > {
    const res: {
      issuer: string;
      techs: string[];
    }[] = await certificationDatabase
      .find()
      .project<{ issuer: string; techs: string[] }>({
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
        .sort(sortOption)
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
    return [
      await certificationCollectionService.#getCertificationItems(),
      await certificationDatabase.countDocuments(),
    ];
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
