'use server';

import { requireAdmin } from "../_security/session";
import { projectInput, objectId, offsetInput, filterInput } from "../_security/validation";


import { revalidatePath, updateTag, unstable_cache } from "next/cache";
import { ObjectId, SortDirection, WithId } from "mongodb";

import { ProjectType } from "../_lib/_types";
import { DB, DB_INFO } from "../_utils/Database";

const projectDatabase = DB.collection<ProjectType>(DB_INFO.collections.PROJ);

export const getProjectCount = unstable_cache(
  async (): Promise<number> => {
    return await projectDatabase.countDocuments()
  },
  ['totalProjects'],
  { revalidate: 3600, tags: ['totalProjects'] }
);

const getProjectsBase = async (
  offset: number = 0,
  sortOption?: object,
  filterOptions?: object,
): Promise<ProjectType[]> => {
  let sortBase: { [key: string]: SortDirection } = {};
  if (sortOption) {
    sortBase = {
      ...sortOption,
      ...sortBase
    };
  }
  return (await projectDatabase
    .find(filterOptions ?? {})
    .sort(sortBase)
    .skip(offsetInput(offset))
    .limit(10)
    .toArray())
    .map((project: WithId<ProjectType>) => {
      const { _id, ...rest } = project;
      return { id: _id.toString(), ...rest };
    })
}

export const getTopProjects = unstable_cache(
  async (): Promise<ProjectType[]> => {
    return await getProjectsBase(0, { priority: 1, date: -1, name: 1 });
  },
  ['topProjects'],
  { revalidate: 3600, tags: ['topProjects'] }
)

export const getAllProjects = unstable_cache(
  async (offset: number): Promise<ProjectType[]>  => {
    return await getProjectsBase(offset, { priority: 1, date: -1, name: 1 });
  },
  ['allProjects'],
  { revalidate: 3600, tags: ['allProjects'] }
)

export const getFullAllProjects = async (): Promise<ProjectType[]> => {
  await requireAdmin();
  return (await projectDatabase
    .find({})
    .sort({ priority: 1, date: -1, name: 1 })
    .toArray())
    .map((project: WithId<ProjectType>) => {
      const { _id, ...rest } = project;
      return { id: _id.toString(), ...rest };
    })
}

export const getProjectFilters = unstable_cache(
  async (): Promise<[[string, number][], [string, number][]]>  => {
    const res: {
      categories: string[];
      key_techs: string[];
    }[] = await projectDatabase
      .find()
      .project<{ categories: string[]; key_techs: string[] }>({
        categories: 1,
        key_techs: 1,
        _id: 0,
      })
      .toArray();

    const categories = new Map<string, number>();
    const techs = new Map<string, number>();
    res.map((item) => {
      item.categories.forEach((category) => {
        if (categories.has(category)) {
          categories.set(category, categories.get(category)! + 1);
        } else {
          categories.set(category, 1);
        }
      });
      item.key_techs.forEach((tech) => {
        if (techs.has(tech)) {
          techs.set(tech, techs.get(tech)! + 1);
        } else {
          techs.set(tech, 1);
        }
      });
    });

    return [
      Array.from(categories.entries()),
      Array.from(techs.entries()),
    ];
  },
  ['projectFilters'],
  { revalidate: 3600, tags: ['projectFilters'] }
)

export const getProjectsByCategory = unstable_cache(
  async (category: string, offset: number = 0): Promise<ProjectType[]> => {
    return await getProjectsBase(offset,
      { priority: 1, date: -1, name: 1 },
      { categories: filterInput(category)}
    );
  },
  ['projectsByCategory'],
  { revalidate: 3600, tags: ['projectsByCategory'] }
);

export const getProjectsByTech = unstable_cache(
  async (tech: string, offset: number = 0): Promise<ProjectType[]> => {
    return getProjectsBase(offset,
      { priority: 1, date: -1, name: 1 },
      { key_techs: filterInput(tech) }
    );
  },
  ['projectsByTech'],
  { revalidate: 3600, tags: ['projectsByTech'] }
);

export const saveProject = async (input: unknown) => {
  await requireAdmin();
  const { id, ...data } = projectInput(input);
  if (id) {
    const result = await projectDatabase.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
    if (!result.matchedCount) throw new Error('Record not found');
  } else {
    await projectDatabase.insertOne(data);
  }
  updateTag('totalProjects');
  updateTag('allProjects');
  updateTag('topProjects');
  updateTag('projectsByCategory');
  updateTag('projectsByTech');
}

export const deleteProject = async (inputId: unknown) => {
  await requireAdmin();
  const id = objectId(inputId);
  try {
    const result = await projectDatabase.deleteOne({ _id: new ObjectId(id) });
    if (!result.deletedCount) throw new Error('Record not found');
    revalidatePath('/(management)/admin/data/projects');
  } catch (error) {
    console.error('Delete project error:', error);
    throw new Error('Failed to delete project');
  }
  updateTag('totalProjects');
  updateTag('allProjects');
  updateTag('topProjects');
  updateTag('projectsByCategory');
  updateTag('projectsByTech');
}