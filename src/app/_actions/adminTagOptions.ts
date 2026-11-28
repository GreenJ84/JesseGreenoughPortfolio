'use server';

import { requireAdmin } from '../_security/session';
import { DB, DB_INFO } from '../_utils/Database';
import { uniqueTags } from '../_lib/tagOptions';

export async function getProjectTagOptions(): Promise<{ categories: string[]; technologies: string[] }> {
  await requireAdmin();
  const collection = DB.collection(DB_INFO.collections.PROJ);
  const [categories, technologies] = await Promise.all([
    collection.distinct('categories'),
    collection.distinct('key_techs'),
  ]);
  return { categories: uniqueTags(categories), technologies: uniqueTags(technologies) };
}

export async function getCertificationTagOptions(): Promise<string[]> {
  await requireAdmin();
  return uniqueTags(await DB.collection(DB_INFO.collections.CERT).distinct('techs'));
}
