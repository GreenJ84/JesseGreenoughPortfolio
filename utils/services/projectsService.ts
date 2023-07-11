import { SortDirection, WithId } from "mongodb";
import { DB } from "../AppContext";


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
const projectDatabase = DB.collection<projectType>(process.env.PROJ_COLL!);

export class projectCollectionService {
  // Retrieve Project categories and key techs
  public static async getProjectFilterOptions() {
    let res: {
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
      JSON.stringify(Array.from(categories.entries())),
      JSON.stringify(Array.from(techs.entries())),
    ];
  }

  // Private type mapper
  static #mapProjectItem(results: WithId<projectType>[]) {
    return results.map(
      (result) =>
        ({
          id: result._id.toString(),
          priority: result.priority,
          name: result.name,
          date: result.date.slice(0, 7),
          brief: result.brief ?? result.description,
          description: result.description,
          image_path: result.image_path,
          deployed_url: result.deployed_url,
          github_url: result.github_url,
          categories: result.categories,
          key_techs: result.key_techs,
        } as projectType)
    );
  }

  // Private Project retrival base
  static async #getProjectItems(
    sort: boolean = true,
    offset: number = 0,
    filterOptions?: object
  ) {
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

    return await projectDatabase
      .find(filterOptions ?? {})
      .sort(sortOption)
      .skip(offset)
      .limit(10)
      .toArray();
  }

  public async getUnsortedProjects(offset: number = 0) {
    return projectCollectionService.#mapProjectItem(
      await projectCollectionService.#getProjectItems(false, offset)
    );
  }

  // Top priority project retrival
  public static async getTopProjects(): Promise<[projectType[], number]> {
    return [
      this.#mapProjectItem(await this.#getProjectItems()),
      await projectDatabase.countDocuments(),
    ];
  }

  // Category filtered project retrival
  public async getProjectsByCategory(category: string, offset: number = 0) {
    return projectCollectionService.#mapProjectItem(
      await projectCollectionService.#getProjectItems(true, offset, {
        categories: category,
      })
    );
  }

  // Key tech filtered project retrival
  public async getProjectsByTech(tech: string, offset: number = 0) {
    return projectCollectionService.#mapProjectItem(
      await projectCollectionService.#getProjectItems(true, offset, {
        key_techs: tech,
      })
    );
  }
}
