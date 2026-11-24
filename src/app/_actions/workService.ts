'use server';

import { recordAdminEvent } from '../_observability/metrics';
import { requireAdmin } from '../_security/session';
import { workInput, objectId, offsetInput, workCategory } from '../_security/validation';
import { updateTag, unstable_cache } from 'next/cache';
import { ObjectId, type WithId } from 'mongodb';
import type { Work } from '../_lib/_types';
import { DB, DB_INFO } from '../_utils/Database';

const workCollection = DB.collection<Work>(DB_INFO.collections.WORK);
export type WorkCategory = 'primary' | 'secondary';
const cacheScope = [DB_INFO.name, DB_INFO.collections.WORK, 'model-v2'];
const tag = 'work';
const primaryFor = (category: WorkCategory) => workCategory(category) === 'primary';
const toWork = ({ _id, ...fields }: WithId<Work>): Work => ({ id: _id.toString(), ...fields });

export const getWorkTotals = unstable_cache(async (): Promise<[number, number]> => {
  const [primary, secondary] = await Promise.all([
    workCollection.countDocuments({ primary: true }),
    workCollection.countDocuments({ primary: false }),
  ]);
  return [primary, secondary];
}, ['workTotals', ...cacheScope], { revalidate: 3600, tags: [tag] });

export const getWorkByCategory = unstable_cache(async (category: WorkCategory, offset = 0): Promise<Work[]> =>
  (await workCollection.find({ primary: primaryFor(category) }).sort({ _id: -1 }).skip(offsetInput(offset)).limit(5).toArray()).map(toWork),
  ['workByCategory', ...cacheScope], { revalidate: 3600, tags: [tag] });

export async function getFullAllWorkByCategory(category: WorkCategory): Promise<Work[]> {
  await requireAdmin();
  return (await workCollection.find({ primary: primaryFor(category) }).sort({ _id: -1 }).toArray()).map(toWork);
}

export async function saveWork(category: unknown, input: unknown) {
  const admin = await requireAdmin();
  const primary = primaryFor(workCategory(category));
  const { id, ...data } = workInput(input);
  if (data.primary !== primary) throw new Error('Work category mismatch');
  if (id) {
    const result = await workCollection.updateOne({ _id: new ObjectId(id) }, { $set: data, ...(data.end_date ? {} : { $unset: { end_date: '' } }) });
    if (!result.matchedCount) throw new Error('Record not found');
  } else await workCollection.insertOne(data);
  await recordAdminEvent(admin.username, id ? 'update' : 'create', 'work', id);
  updateTag(tag);
}

export async function deleteWork(category: unknown, inputId: unknown) {
  const admin = await requireAdmin();
  const id = objectId(inputId);
  const result = await workCollection.deleteOne({ _id: new ObjectId(id), primary: primaryFor(workCategory(category)) });
  if (!result.deletedCount) throw new Error('Record not found');
  await recordAdminEvent(admin.username, 'delete', 'work', id);
  updateTag(tag);
}
