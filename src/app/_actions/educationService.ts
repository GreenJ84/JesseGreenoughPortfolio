/** @format */
'use server';

import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";


import { DB, DB_INFO } from "../_utils/Database";
import { EducationType } from "../_lib/_types";
import { ObjectId } from "mongodb";

const educationDatabase = DB.collection<EducationType>(DB_INFO.collections.EDU);

export const getEducation = unstable_cache(
  async (offset: number = 0): Promise<EducationType[]> => {
    return (await educationDatabase
      .find()
      .sort({ _id: -1 })
      .skip(offset)
      .limit(5)
      .toArray()
    ).map(item => {
      const { _id,...rest} = item;
      return {id: _id.toString(),...rest} as EducationType;
    });
  },
  ['educationData'],
  { revalidate: 3600, tags: ['educationData'] }
);

export const getEducationCount =  unstable_cache(
  async (): Promise<number> => {
    return await educationDatabase.countDocuments();
  },
  ['totalEducation'],
  { revalidate: 3600, tags: ['totalEducation'] }
)

export const saveEducation = async (formData: EducationType) => {
  if (formData.id) {
    const { id, ...rest } = formData;
    try {
      await educationDatabase.updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...rest } }
      );
    } catch (error) {
      console.error('Update education error:', error);
      throw new Error('Failed to update education');
    }
  } else {
    try {
      await educationDatabase.insertOne(formData);
    } catch (error) {
      console.error('Insert education error:', error);
      throw new Error('Failed to insert education');
    }
  }
  revalidateTag('educationData');
  revalidateTag('totalEducation');
}

export const deleteEducation = async (id: string) => {
  if (!id) throw new Error('Invalid education id');
  try {
    await educationDatabase.deleteOne({ _id: new ObjectId(id) });
    revalidatePath('/(management)/admin/data/education');
  } catch (error) {
    console.error('Delete education error:', error);
    throw new Error('Failed to delete education');
  }
  revalidateTag('educationData');
  revalidateTag('totalEducation');
}