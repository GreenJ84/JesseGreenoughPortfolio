/** @format */

import { Collection, WithId } from "mongodb";
import { DB, DB_INFO } from "../Database";

export interface workType {
  id?: string;
  company: string;
  position: string;
  logo: string;
  location: string;
  date: string; // "start - end"
  details: string[];
}
const workDatabase = DB.collection<workType>(DB_INFO.collections.WORK);
const secWorkDatabase = DB.collection<workType>(DB_INFO.collections.SWORK!);

export class workCollectionService {
  public async getWorkTotals(): Promise<[number, number]> {
    const workTotal = await workDatabase.countDocuments();
    const secWorkTotal = await secWorkDatabase.countDocuments();

    return [workTotal, secWorkTotal];
  }

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

  static async #getWorkItems(database: Collection<workType>, offset: number) {
    return workCollectionService.#mapWorkData(
      await database.find().sort({ _id: -1 }).skip(offset).limit(5).toArray()
    );
  }

  public async getPrimaryWork(offset: number = 0) {
    return workCollectionService.#getWorkItems(workDatabase, offset);
  }

  public async getSecondaryWork(offset: number = 0) {
    return workCollectionService.#getWorkItems(secWorkDatabase, offset);
  }
}
