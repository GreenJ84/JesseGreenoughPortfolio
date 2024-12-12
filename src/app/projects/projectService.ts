import { unstable_cache } from "next/cache";
import { DB, DB_INFO } from "../../utils/Database";
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
  sort: boolean = true,
  offset: number = 0,
  filterOptions?: object
): Promise<projectType[]> => {
  let sortOption: { [key: string]: SortDirection } = {
    name: 1,
    _id: -1,
  };
  if (sort) {
    sortOption = {
      priority: 1,
      date: -1,
      ...sortOption,
    };
  }
  return (await projectDatabase
    .find(filterOptions ?? {})
    .sort(sortOption)
    .skip(offset)
    .limit(10)
    .toArray())
    .map((res: WithId<projectType>) => {
      return {id: res._id.toString(), ...res};
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
    return await getProjects();
  },
  ['topProjects'],
  { revalidate: 60, tags: ['topProjects'] }
)

export const getUnsortedProjects = unstable_cache(
  async (offset: number): Promise<projectType[]>  => {
    return await getProjects(false, offset);
  },
  ['unsortedProjects'],
  { revalidate: 60, tags: ['topProjects'] }
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
    return await getProjects(true, offset, {
      categories: category,
    });
  });

  export const getProjectsByTech = unstable_cache(
    async (tech: string, offset: number = 0): Promise<projectType[]> => {
      return getProjects(true, offset, {
        key_techs: tech,
      })
    }
  );