import { WithId } from "mongodb";
import { DB } from "../AppContext";

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