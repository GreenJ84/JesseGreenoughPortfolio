/** @format */

import {
  Collection,
  WithId,
  Document,
  OptionalUnlessRequiredId,
  ObjectId,
} from 'mongodb';

export class CollectionService {
  /**
   * Maps the collection data from MongoDB to an array format.
   *
   * @param data - The WithId collection data to be mapped.
   * @returns The mapped collection data.
   */
  static _mapData<CollectionType>(
    data: WithId<CollectionType>[]
  ): CollectionType[] {
    return data.map((result) => {
      // Pull out Mongo _id value as id
      let { _id, ...data } = {
        id: result._id.toString(),
        ...result,
      } as WithId<CollectionType>;
      return data as CollectionType;
    });
  }

  /**
   * Returns the total number of items in the collection.
   *
   * @param {Collection<CollectionType>} conn - The MongoDB collection to count the items in.
   * @returns {number} The total number of items in the collection.
   */
  public static getTotal<CollectionType extends Document>(
    conn: Collection<CollectionType>
  ): Function {
    return async () => await conn.countDocuments();
  }

  public static getPage<CollectionType extends Document>(
    conn: Collection<CollectionType>
  ): Function {
    return async (
      offset: number,
      limit: number = 5,
      filterOptions?: object
    ): Promise<CollectionType[]> => {
      let data: WithId<CollectionType>[];
      try {
        data = await conn
          .find(filterOptions ?? {})
          .sort({ _id: -1 })
          .skip(offset * limit)
          .limit(limit)
          .toArray();
      } catch (error) {
        console.error(error);
        throw error;
      }

      return CollectionService._mapData(data);
    };
  }

  public static createItem<CollectionType extends Document>(
    conn: Collection<CollectionType>
  ): Function {
    return async (
      newItem: CollectionType
    ): Promise<{ success: boolean; insert: CollectionType }> => {
      let acknowledged: boolean = false;
      let insertedId: ObjectId | null = null;
      try {
        await conn
          .insertOne(newItem as OptionalUnlessRequiredId<CollectionType>)
          .then((res) => {
            ({ acknowledged, insertedId } = res);
          });
      } catch (error) {
        console.error(error);
        throw error;
      }

      return {
        success: acknowledged,
        insert: { id: insertedId, ...newItem } as CollectionType,
      };
    };
  }

  public static updateItem<CollectionType extends Document>(
    conn: Collection<CollectionType>
  ): Function {
    return async (data: CollectionType): Promise<CollectionType> => {
      try {
        conn.updateOne(
          { _id: data.id! },
          {
            $set: data,
          }
        );
      } catch (error) {
        console.error(error);
        throw error;
      }

      return data;
    };
  }
}

// //** ======== Certification Collection
// export interface certificationType {
//   // _id: string;
//   priority: number;
//   title: string;
//   issuer: string;
//   date: string;
//   description: string;
//   image: string;
//   url: string;
//   techs: string[];
// }

// const certificationDatabase = DB.collection<certificationType>(
//   process.env.CERT_COLL!
// );

// export class certificationService {
//   public static async getCertificationFilterOptions(): Promise<
//     [string, string]
//   > {
//     const res: {
//       issuer: string;
//       techs: string[];
//     }[] = await certificationDatabase
//       .find()
//       .project<{ issuer: string; techs: string[] }>({
//         issuer: 1,
//         techs: 1,
//         _id: 0,
//       })
//       .toArray();

//     const issuerMap = new Map<string, number>();
//     const techMap = new Map<string, number>();
//     res.map((item) => {
//       if (issuerMap.has(item.issuer)) {
//         issuerMap.set(item.issuer, issuerMap.get(item.issuer)! + 1);
//       } else {
//         issuerMap.set(item.issuer, 1);
//       }
//       item.techs.forEach((tech) => {
//         if (techMap.has(tech)) {
//           techMap.set(tech, techMap.get(tech)! + 1);
//         } else {
//           techMap.set(tech, 1);
//         }
//       });
//     });

//     return [
//       JSON.stringify(Array.from(issuerMap.entries())),
//       JSON.stringify(Array.from(techMap.entries())),
//     ];
//   }

//   static #mapCertificationData(data: WithId<certificationType>[]) {
//     return data.map(
//       (result) =>
//         ({
//           id: result._id.toString(),
//           priority: result.priority,
//           title: result.title,
//           issuer: result.issuer,
//           date: result.date.slice(0, 10),
//           description: result.description,
//           image: result.image,
//           url: result.url,
//           techs: result.techs,
//         } as certificationType)
//     );
//   }

//   static async #getCertificationItems(
//     sort: boolean = true,
//     offset: number = 0,
//     filterOptions?: object
//   ) {
//     let sortOption: { [key: string]: SortDirection } = {
//       title: 1,
//       _id: -1,
//     };
//     if (sort) {
//       sortOption = {
//         priority: 1,
//         date: -1,
//         ...sortOption,
//       };
//     }
//     return this.#mapCertificationData(
//       await certificationDatabase
//         .find(filterOptions ?? {})
//         .sort(sortOption)
//         .skip(offset)
//         .limit(10)
//         .toArray()
//     );
//   }

//   public async getUnsortedCertification(offset: number = 0) {
//     return await certificationCollectionService.#getCertificationItems(
//       false,
//       offset
//     );
//   }

//   static async getTopCertification(): Promise<[certificationType[], number]> {
//     return [
//       await certificationCollectionService.#getCertificationItems(),
//       await certificationDatabase.countDocuments(),
//     ];
//   }

//   public async getCertificationByTech(tech: string, offset: number = 0) {
//     return await certificationCollectionService.#getCertificationItems(
//       true,
//       offset,
//       {
//         techs: tech,
//       }
//     );
//   }

//   public async getCertificationByIssuer(issuer: string, offset: number = 0) {
//     return await certificationCollectionService.#getCertificationItems(
//       true,
//       offset,
//       {
//         issuer: issuer,
//       }
//     );
//   }
// }
