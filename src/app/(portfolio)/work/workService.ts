/** @format */

import { Collection, WithId } from "mongodb";
import { DB, DB_INFO } from "../../_utils/Database";
import { unstable_cache } from "next/cache";

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

export const getWorkTotals = unstable_cache(
  async (): Promise<[number, number]> => {
    const workTotal = await workDatabase.countDocuments();
    const secWorkTotal = await secWorkDatabase.countDocuments();

    return [workTotal, secWorkTotal];
  },
  ['workTotals'],
  { revalidate: 60, tags: ['workTotals'] }
);


const getWorkItems = async (database: Collection<workType>, offset: number) => {
  return (await database.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(5)
    .toArray())
    .map((work: WithId<workType>) => {
      const { _id,...rest } = work;
      return { id: _id.toString(),...rest } as workType;
    });
};

export const getPrimaryWork = unstable_cache(
  (offset: number = 0) => {
    return getWorkItems(workDatabase, offset);
  },
  ['primary_work'],
  { revalidate: 60, tags: ['primary_work'] }
);

export const getSecondaryWork = unstable_cache(
  (offset: number = 0) => {
    return getWorkItems(secWorkDatabase, offset);
  },
  ['secondary_work'],
  { revalidate: 60, tags: ['secondary_work'] }
);
