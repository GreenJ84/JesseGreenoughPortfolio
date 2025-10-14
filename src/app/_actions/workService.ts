/** @format */
'use server';

import { revalidateTag, unstable_cache } from "next/cache";
import { Collection, ObjectId, WithId } from "mongodb";

import type { WorkType } from "../_lib/_types";
import { DB, DB_INFO } from "../_utils/Database";

const WORK_COLLECTIONS = {
  primary: DB.collection<WorkType>(DB_INFO.collections.WORK),
  secondary: DB.collection<WorkType>(DB_INFO.collections.SWORK!),
};

export type WorkCategory = keyof typeof WORK_COLLECTIONS; // 'primary' | 'secondary'

const getWorkItems = async (category: WorkCategory, offset: number = 0) => {
  const database: Collection<WorkType> = WORK_COLLECTIONS[category];
  return (await database.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(5)
    .toArray())
    .map((work: WithId<WorkType>) => {
      const { _id, ...rest } = work;
      return { id: _id.toString(), ...rest } as WorkType;
    });
};

export const getWorkTotals = unstable_cache(
  async (): Promise<[number, number]> => {
    const workTotal = await WORK_COLLECTIONS.primary.countDocuments();
    const secWorkTotal = await WORK_COLLECTIONS.secondary.countDocuments();
    return [workTotal, secWorkTotal];
  },
  ['workTotals'],
  { revalidate: 3600, tags: ['workTotals'] }
);

export const getWorkByCategory = unstable_cache(
  async (category: WorkCategory, offset: number = 0): Promise<WorkType[]> => {
    return getWorkItems(category, offset);
  },
  ['workByCategory'],
  { revalidate: 3600, tags: ['workByCategory'] }
);

export const getFullAllWorkByCategory = unstable_cache(
  async (category: WorkCategory): Promise<WorkType[]> => {
    const database: Collection<WorkType> = WORK_COLLECTIONS[category];
    return (await database.find()
      .sort({ _id: -1 })
      .toArray())
      .map((work: WithId<WorkType>) => {
        const { _id, ...rest } = work;
        return { id: _id.toString(), ...rest } as WorkType;
      });
  },
  ['fullAllWorkByCategory'],
  { revalidate: 3600, tags: ['fullAllWorkByCategory'] }
);

export const saveWork = async (category: WorkCategory, formData: WorkType) => {
  const database: Collection<WorkType> = WORK_COLLECTIONS[category];
  if (formData.id) {
    const { id, ...rest } = formData;
    try {
      await database.updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...rest } }
      );
    } catch (error) {
      console.error('Update work error:', error);
      throw new Error('Failed to update work');
    }
  } else {
    try {
      await database.insertOne(formData);
    } catch (error) {
      console.error('Insert work error:', error);
      throw new Error('Failed to insert work');
    }
  }
  revalidateTag('workTotals');
  revalidateTag('workByCategory');
  revalidateTag('fullAllWorkByCategory');
};

export const deleteWork = async (category: WorkCategory, id: string) => {
  if (!id) throw new Error('Invalid work id');
  const database: Collection<WorkType> = WORK_COLLECTIONS[category];
  try {
    await database.deleteOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.error('Delete work error:', error);
    throw new Error('Failed to delete work');
  }
  revalidateTag('workTotals');
  revalidateTag('workByCategory');
  revalidateTag('fullAllWorkByCategory');
};