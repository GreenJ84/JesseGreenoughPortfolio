/** @format */

import { offsetInput, filterInput } from "../../_security/validation";

import { unstable_cache } from "next/cache";
import { WithId } from "mongodb";
import type { ResumeType } from '@/app/_lib/_types';

import { DB, DB_INFO } from "../../_utils/Database";

const resumeDatabase = DB.collection<ResumeType>(DB_INFO.collections.RES);
const cacheScope = [DB_INFO.name, DB_INFO.collections.RES, 'legacy-20261123'];

const getResumeItems = async (offset: number, filterOptions?: object, limit = 5) => {
  return (
    await resumeDatabase
      .find(filterOptions ?? {})
      .sort({ _id: -1 })
      .skip(offsetInput(offset))
      .limit(limit)
      .toArray()
  ).map((resume: WithId<ResumeType>) => {
    const { _id, ...rest } = resume;
    return { id: _id.toString(),...rest } as ResumeType;
  });
}

export const getResumeCount = unstable_cache(
  async (): Promise<number> => {
    return await resumeDatabase.countDocuments();
  },
  ['totalResumes', ...cacheScope],
  { revalidate: 60, tags: ['totalResumes'] }
);

export const getResumes = unstable_cache(
  async (
    offset: number = 0
  ): Promise<ResumeType[]> => {
    return await getResumeItems(offset);
  },
  ['resumes', ...cacheScope],
  { revalidate: 60, tags: ['resumes'] }
);

export const getTopResumes = unstable_cache(
  async (offset: number = 0): Promise<ResumeType[]> => offset >= 10 ? [] : getResumeItems(offset, undefined, Math.min(5, 10 - offset)),
  ['topResumes', ...cacheScope],
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
  ['resumeFilterOptions', ...cacheScope],
  { revalidate: 60, tags: ['resumeFilterOptions'] }
);


export const getResumesByCategory = unstable_cache(
  async (category: string, offset: number = 0) => {
    return await getResumeItems(offset, {
      categories: filterInput(category),
    });
  },
  ['resumesByCategory', ...cacheScope],
  { revalidate: 60, tags: ['resumes'] }
);
