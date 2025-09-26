/** @format */

import { unstable_cache } from "next/cache";
import { WithId } from "mongodb";

import { DB, DB_INFO } from "../../_utils/Database";

export interface resumeType {
  id?: string;
  image_url: string;
  download: string;
  view: string;
  categories: string[];
}
const resumeDatabase = DB.collection<resumeType>(DB_INFO.collections.RES);

const getResumeItems = async (offset: number, filterOptions?: object) => {
  return (
    await resumeDatabase
      .find(filterOptions ?? {})
      .sort({ _id: -1 })
      .skip(offset)
      .limit(5)
      .toArray()
  ).map((resume: WithId<resumeType>) => {
    const { _id, ...rest } = resume;
    return { id: _id.toString(),...rest } as resumeType;
  });
}

export const getResumeCount = unstable_cache(
  async (): Promise<number> => {
    return await resumeDatabase.countDocuments();
  },
  ['totalResumes'],
  { revalidate: 60, tags: ['totalResumes'] }
);

export const getResumes = unstable_cache(
  async (
    offset: number = 0
  ): Promise<resumeType[]> => {
    return await getResumeItems(offset);
  },
  ['resumes'],
  { revalidate: 60, tags: ['resumes'] }
);

export const getResumeFilterOptions =  unstable_cache(
  async (): Promise<string> => {
    const res: {
      categories: string[];
    }[] = await resumeDatabase
      .find()
      .project<{ categories: string[] }>({
        categories: 1,
        _id: 0,
      })
      .toArray();

    const categoryMap = new Map<string, number>();
    res.map((item) => {
      item.categories.forEach((cat) => {
        if (categoryMap.has(cat)) {
          categoryMap.set(cat, categoryMap.get(cat)! + 1);
        } else {
          categoryMap.set(cat, 1);
        }
      });
    });

    return JSON.stringify(Array.from(categoryMap.entries()));
  },
  ['resumeFilterOptions'],
  { revalidate: 60, tags: ['resumeFilterOptions'] }
);


export const getResumesByCategory = unstable_cache(
  async (category: string, offset: number = 0) => {
    return await getResumeItems(offset, {
      categories: category,
    });
  },
);
