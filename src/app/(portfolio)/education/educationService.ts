/** @format */

import { DB, DB_INFO } from "../../_utils/Database";

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
const educationDatabase = DB.collection<educationType>(DB_INFO.collections.EDU);

const getEducationItems = async (offset: number): Promise<educationType[]> => {
  return (await educationDatabase
    .find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(5)
    .toArray()
  ).map(item => {
    const { _id,...rest} = item;
    return {id: _id.toString(),...rest} as educationType;
  });
}

export const getEducationCount =  async (): Promise<number> => {
  return await educationDatabase.countDocuments();
}

export const getEducationData =  async (
  offset: number = 0
): Promise<educationType[]> => {
  return await getEducationItems(offset);
}