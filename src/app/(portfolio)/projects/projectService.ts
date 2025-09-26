import { unstable_cache } from "next/cache";
import { DB, DB_INFO } from "../../_utils/Database";
import { SortDirection, WithId } from "mongodb";

export interface projectType {
  id?: string;
  priority: number;
  name: string;
  date: string;
  brief: string;
  description: string;
  image_path: string;
  deployed_url: string;
  github_url: string;
  categories: string[];
  key_techs: string[];
}
const projectDatabase = DB.collection<projectType>(DB_INFO.collections.PROJ);

const getProjects = async (
  offset: number = 0,
  sortOption?: object,
  filterOptions?: object
): Promise<projectType[]> => {
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
    .skip(offset)
    .limit(10)
    .toArray())
    .map((project: WithId<projectType>) => {
      const { _id, ...rest } = project;
      return { id: _id.toString(), ...rest };
    })
}

export const getProjectCount = unstable_cache(
  async (): Promise<number> => {
    return await projectDatabase.countDocuments()
  },
  ['totalProjects'],
  { revalidate: 60, tags: ['totalProjects'] }
)

export const getTopProjects = unstable_cache(
  async (): Promise<projectType[]> => {
    return await getProjects(0, { priority: 1, date: -1, name: 1 });
  },
  ['topProjects'],
  { revalidate: 60, tags: ['topProjects'] }
)

export const getAllProjects = unstable_cache(
  async (offset: number): Promise<projectType[]>  => {
    return await getProjects(offset, { date: -1, name: 1 });
  },
  ['allProjects'],
  { revalidate: 60, tags: ['allProjects'] }
)

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
  ['totalProjects'],
  { revalidate: 60, tags: ['totalProjects'] }
)

export const getProjectsByCategory = unstable_cache(
  async (category: string, offset: number = 0): Promise<projectType[]> => {
    return await getProjects(offset,
      { priority: 1, date: -1, name: 1 },
      { categories: category}
    );
  });

  export const getProjectsByTech = unstable_cache(
    async (tech: string, offset: number = 0): Promise<projectType[]> => {
      return getProjects(offset,
        { priority: 1, date: -1, name: 1 },
        { key_techs: tech }
      );
    }
  );