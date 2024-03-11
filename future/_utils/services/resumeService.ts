/** @format */

'use server';
import { cache } from "react";
import {
  Document,
  Collection
} from "mongodb";

import { CollectionService } from "./collectionsService";
import DB, { DatabaseCollectionType, DatabaseCollections } from "./database";


const resumeCollection: DatabaseCollectionType = 'resumes';
const connection = DB.collection<resumeType>(DatabaseCollections[resumeCollection]!);

export interface resumeType extends Document {
  id?: string;
  image_url: string;
  download: string;
  view: string;
  categories: string[];
}

class ResumeService extends CollectionService {
  public static getResumeCategories(
    connection: Collection<resumeType>
  ): Function {
    return async (filter: Object): Promise<string> => {
      const res: {
        categories: string[];

      }[] = await connection
        .find()
        .project<{ categories: string[] }>(filter)
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
    };
  }
}

export const getTotal = cache(ResumeService.getTotal<resumeType>(connection));

export const getPage = cache(ResumeService.getPage<resumeType>(connection));

export const getResumeCategories = cache(ResumeService.getResumeCategories(connection));

export const createItem = cache(ResumeService.createItem<resumeType>(connection));

export const updateItem = cache(ResumeService.updateItem<resumeType>(connection));
