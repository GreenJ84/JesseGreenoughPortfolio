
//** ======== Resume Collection
export const resumeDatabase = DB.collection<resumeType>(process.env.RES_COLL!);
export interface resumeType {
  id?: string;
  image_url: string;
  download: string;
  view: string;
  categories: string[];
}

export class resumeCollectionService {
  public static async getResumeFilterOptions(): Promise<[string]> {
    let res: {
      categories: string[];
    }[] = await certificationDatabase
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

    return [
      JSON.stringify(Array.from(categoryMap.entries()))
    ];
  }

  static #mapResumeData(data: WithId<resumeType>[]) {
    return data.map(
      (result) =>
        ({
          id: result._id.toString(),
          image_url: result.image_url,
          download: result.download,
          view: result.view,
          categories: result.categories,
        } as resumeType)
    );
  }

  static async #getResumeItems(offset: number, filterOptions?: object) {
    return resumeCollectionService.#mapResumeData(
      await resumeDatabase
        .find(filterOptions ?? {})
        .sort({ _id: -1 })
        .skip(offset)
        .limit(5)
        .toArray()
    );
  }

  public async getResumes(offset: number = 0) {
    return await resumeCollectionService.#getResumeItems(offset);
  }

  public async getResumeByCategory(category: string, offset: number = 0) {
    return await resumeCollectionService.#getResumeItems(
      offset,
      { categories: category }
    )
  }
}