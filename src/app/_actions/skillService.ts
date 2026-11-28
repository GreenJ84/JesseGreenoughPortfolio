'use server';

import { unstable_cache, updateTag, revalidatePath } from 'next/cache';
import { ObjectId, type WithId } from 'mongodb';
import { DB, DB_INFO } from '../_utils/Database';
import type { Skill } from '../_lib/_types';
import { normalizeSkillName, skillCategories } from '../_lib/skillCatalog';
import { skillInput, objectId, ValidationError } from '../_security/validation';
import { requireAdmin } from '../_security/session';
import { recordAdminEvent } from '../_observability/metrics';

type StoredSkill = Skill & { normalizedName: string };
const skills = DB.collection<StoredSkill>(DB_INFO.collections.SKILL);
const cacheScope = [DB_INFO.name, DB_INFO.collections.SKILL, 'model-v2'];
const tag = 'publicSkills';

function toSkill(document: WithId<StoredSkill>): Skill {
  const { _id, normalizedName, ...skill } = document;
  void normalizedName;
  return { id: _id.toString(), ...skill };
}

async function readSkills(visibleOnly: boolean): Promise<Skill[]> {
  const query = visibleOnly ? { visible: true } : {};
  const rows = await skills.find(query).sort({ category: 1, sortOrder: 1, title: 1, _id: 1 }).toArray();
  const categoryOrder = new Map<string, number>(skillCategories.map((category, index) => [category, index]));
  return rows.map(toSkill).sort((a, b) =>
    (categoryOrder.get(a.category) ?? 999) - (categoryOrder.get(b.category) ?? 999)
    || a.sortOrder - b.sortOrder || a.title.localeCompare(b.title));
}

const getCachedSkills = unstable_cache(async (): Promise<Skill[]> => {
  return readSkills(true);
}, ['publicSkills', ...cacheScope], { revalidate: 3600, tags: [tag] });

export async function getPublicSkills(): Promise<Skill[]> {
  return getCachedSkills();
}

export async function getAdminSkills(): Promise<Skill[]> {
  await requireAdmin();
  return readSkills(false);
}

async function prepareCollection() {
  await skills.createIndex({ category: 1, normalizedName: 1 }, { unique: true, name: 'skill_category_name_unique' });
}

function refreshSkills() {
  updateTag(tag);
  revalidatePath('/');
  revalidatePath('/skills');
}

export async function saveSkill(input: unknown): Promise<void> {
  const admin = await requireAdmin();
  const { id, ...skill } = skillInput(input);
  await prepareCollection();
  const normalizedName = normalizeSkillName(skill.title);
  try {
    if (id) {
      const result = await skills.updateOne({ _id: new ObjectId(id) }, { $set: { ...skill, normalizedName } });
      if (!result.matchedCount) throw new Error('Record not found');
    } else {
      await skills.insertOne({ ...skill, normalizedName });
    }
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) throw new ValidationError('A skill with this name already exists in this group');
    throw error;
  }
  await recordAdminEvent(admin.username, id ? 'update' : 'create', 'skill', id);
  refreshSkills();
}

export async function deleteSkill(inputId: unknown): Promise<void> {
  const admin = await requireAdmin();
  const id = objectId(inputId);
  const result = await skills.deleteOne({ _id: new ObjectId(id) });
  if (!result.deletedCount) throw new Error('Record not found');
  await recordAdminEvent(admin.username, 'delete', 'skill', id);
  refreshSkills();
}
