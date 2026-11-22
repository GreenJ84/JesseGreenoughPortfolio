/** @format */
'use server';

import { cacheTags } from '../_lib/cacheTags';

import { requireAdmin } from "../_security/session";
import { educationInput, objectId, offsetInput } from "../_security/validation";


import { revalidatePath, updateTag, unstable_cache } from "next/cache";


import { DB, DB_INFO } from "../_utils/Database";
import { educationDTO } from "../_lib/educationDates";
import { EducationType, EducationDTO } from "../_lib/_types";
import { ObjectId } from "mongodb";

const educationDatabase = DB.collection<EducationType>(DB_INFO.collections.EDU);

export const getEducation = unstable_cache(
  async (offset: number = 0): Promise<EducationDTO[]> => {
    return (await educationDatabase
      .find()
      .sort({ _id: -1 })
      .skip(offsetInput(offset))
      .limit(5)
      .toArray()
    ).map(item => {
      const { _id,...rest} = item;
      return educationDTO({ ...rest, id: _id.toString() });
    });
  },
  [cacheTags.education.list],
  { revalidate: 3600, tags: [cacheTags.education.list] }
);

const getAllEducationCached = unstable_cache(
  async (): Promise<EducationDTO[]> => {
    return (await educationDatabase
      .find()
      .sort({ _id: -1 })
      .toArray()
    ).map(item => {
      const { _id,...rest} = item;
      return educationDTO({ ...rest, id: _id.toString() });
    });
  },
  [cacheTags.education.all],
  { revalidate: 3600, tags: [cacheTags.education.all] }
);

export const getAllEducation = async (): Promise<EducationDTO[]> => {
  await requireAdmin();
  return getAllEducationCached();
};

export const getEducationCount =  unstable_cache(
  async (): Promise<number> => {
    return await educationDatabase.countDocuments();
  },
  [cacheTags.education.count],
  { revalidate: 3600, tags: [cacheTags.education.count] }
)

export const saveEducation = async (input: unknown) => {
  await requireAdmin();
  const { id, ...data } = educationInput(input);
  if (id) {
    const result = await educationDatabase.updateOne(
      { _id: new ObjectId(id) },
      { $set: data, ...(data.end_date ? {} : { $unset: { end_date: "" } }) }
    );
    if (!result.matchedCount) throw new Error('Record not found');
  } else {
    await educationDatabase.insertOne(data);
  }
  for (const tag of Object.values(cacheTags.education)) updateTag(tag);
}

export const deleteEducation = async (inputId: unknown) => {
  await requireAdmin();
  const id = objectId(inputId);
  try {
    const result = await educationDatabase.deleteOne({ _id: new ObjectId(id) });
    if (!result.deletedCount) throw new Error('Record not found');
    revalidatePath('/admin/data/education');
  } catch (error) {
    console.error('Delete education error:', error);
    throw new Error('Failed to delete education');
  }
  for (const tag of Object.values(cacheTags.education)) updateTag(tag);
}