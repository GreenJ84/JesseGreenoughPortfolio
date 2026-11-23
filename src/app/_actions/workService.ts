/** @format */
'use server';
import { recordAdminEvent } from '../_observability/metrics';

import { requireAdmin } from "../_security/session";
import { workInput, objectId, offsetInput, workCategory } from "../_security/validation";


import { updateTag, unstable_cache } from "next/cache";
import { Collection, ObjectId, WithId } from "mongodb";

import type { WorkType } from "../_lib/_types";
import { DB, DB_INFO } from "../_utils/Database";

const WORK_COLLECTIONS = {
  primary: DB.collection<WorkType>(DB_INFO.collections.WORK),
  secondary: DB.collection<WorkType>(DB_INFO.collections.SWORK),
};

export type WorkCategory = keyof typeof WORK_COLLECTIONS; // 'primary' | 'secondary'
const cacheScope = [DB_INFO.name, DB_INFO.collections.WORK, DB_INFO.collections.SWORK, 'legacy-20261123'];

export const getWorkTotals = unstable_cache(
  async (): Promise<[number, number]> => {
    const workTotal = await WORK_COLLECTIONS.primary.countDocuments();
    const secWorkTotal = await WORK_COLLECTIONS.secondary.countDocuments();
    return [workTotal, secWorkTotal];
  },
  ['workTotals', ...cacheScope],
  { revalidate: 3600, tags: ['workTotals'] }
);


const getWorkBase = async (category: WorkCategory, offset: number = 0) => {
  const database: Collection<WorkType> = WORK_COLLECTIONS[workCategory(category)];
  return (await database.find()
    .sort({ _id: -1 })
    .skip(offsetInput(offset))
    .limit(5)
    .toArray())
    .map((work: WithId<WorkType>) => {
      const { _id, ...rest } = work;
      return { id: _id.toString(), ...rest } as WorkType;
    });
};

export const getWorkByCategory = unstable_cache(
  async (category: WorkCategory, offset: number = 0): Promise<WorkType[]> => {
    return getWorkBase(category, offset);
  },
  ['workByCategory', ...cacheScope],
  { revalidate: 3600, tags: ['workByCategory'] }
);

const getFullAllWorkByCategoryCached = unstable_cache(
  async (category: WorkCategory): Promise<WorkType[]> => {
    const database: Collection<WorkType> = WORK_COLLECTIONS[workCategory(category)];
    return (await database.find()
      .sort({ _id: -1 })
      .toArray())
      .map((work: WithId<WorkType>) => {
        const { _id, ...rest } = work;
        return { id: _id.toString(), ...rest } as WorkType;
      });
  },
  ['fullAllWorkByCategory', ...cacheScope],
  { revalidate: 3600, tags: ['fullAllWorkByCategory'] }
);

export const getFullAllWorkByCategory = async (category: WorkCategory): Promise<WorkType[]> => {
  await requireAdmin();
  return getFullAllWorkByCategoryCached(workCategory(category));
};

export const saveWork = async (category: unknown, input: unknown) => {
  const admin = await requireAdmin();
  const database = WORK_COLLECTIONS[workCategory(category)];
  const { id, ...data } = workInput(input);
  if (id) {
    const result = await database.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
    if (!result.matchedCount) throw new Error('Record not found');
  } else {
    await database.insertOne(data);
  }
  await recordAdminEvent(admin.username, id ? 'update' : 'create', 'work', id);
  updateTag('workTotals');
  updateTag('workByCategory');
  updateTag('fullAllWorkByCategory');
};

export const deleteWork = async (category: unknown, inputId: unknown) => {
  const admin = await requireAdmin();
  const id = objectId(inputId);
  const database = WORK_COLLECTIONS[workCategory(category)];
  try {
    const result = await database.deleteOne({ _id: new ObjectId(id) });
    if (!result.deletedCount) throw new Error('Record not found');
  } catch (error) {
    console.error('Delete work error:', error);
    throw new Error('Failed to delete work');
  }
  await recordAdminEvent(admin.username, 'delete', 'work', id);
  updateTag('workTotals');
  updateTag('workByCategory');
  updateTag('fullAllWorkByCategory');
};
