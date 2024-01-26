/** @format */

'use server';
import { cache } from "react";
import {
  Document,
  Collection
} from "mongodb";

import { CollectionService } from "./collectionsService";
import DB, { DatabaseCollections } from "./database";


export interface resumeType extends Document {
  id?: string;
  image_url: string;
  download: string;
  view: string;
  categories: string[];
}

class ResumeService extends CollectionService {
  public static getResumeCategories(
    conn: Collection<resumeType>
  ): Function {
    return async (filter: Object): Promise<string> => {
      const res: {
        categories: string[];
      }[] = await conn
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


const conn = DB.collection<resumeType>(DatabaseCollections.resumes!);

export const getTotal = cache(ResumeService.getTotal<resumeType>(conn));

export const getPage = cache(ResumeService.getPage<resumeType>(conn));

export const getResumeCategories = cache(ResumeService.getResumeCategories(conn));

export const createItem = cache(ResumeService.createItem<resumeType>(conn));

export const updateItem = cache(ResumeService.updateItem<resumeType>(conn));
