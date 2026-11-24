'use server';

import { unstable_cache, updateTag, revalidatePath } from 'next/cache';
import { ObjectId, type WithId } from 'mongodb';
import { DB, DB_INFO } from '../_utils/Database';
import type { SkillType } from '../_lib/_types';
import { normalizeSkillName, seedSkills, skillCategories } from '../_lib/skillCatalog';
import { skillInput, objectId, ValidationError } from '../_security/validation';
import { requireAdmin } from '../_security/session';
import { recordAdminEvent } from '../_observability/metrics';

type StoredSkill = SkillType & { normalizedName: string };
const skills = DB.collection<StoredSkill>(DB_INFO.collections.SKILL);
const state = DB.collection<{ _id: string; initialized: boolean }>('portfolioMetadata');
const cacheScope = [DB_INFO.name, DB_INFO.collections.SKILL, 'v1'];
const tag = 'publicSkills';

function toSkill(document: WithId<StoredSkill>): SkillType {
  const { _id, normalizedName, ...skill } = document;
  void normalizedName;
  return { id: _id.toString(), ...skill };
}

async function readSkills(visibleOnly: boolean): Promise<SkillType[]> {
  const query = visibleOnly ? { visible: true } : {};
  const rows = await skills.find(query).sort({ category: 1, sortOrder: 1, name: 1, _id: 1 }).toArray();
  const categoryOrder = new Map<string, number>(skillCategories.map((category, index) => [category, index]));
  return rows.map(toSkill).sort((a, b) =>
    (categoryOrder.get(a.category) ?? 999) - (categoryOrder.get(b.category) ?? 999)
    || a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
}

const getCachedSkills = unstable_cache(async (): Promise<SkillType[]> => {
  return readSkills(true);
}, ['publicSkills', ...cacheScope], { revalidate: 3600, tags: [tag] });

export async function getPublicSkills(): Promise<SkillType[]> {
  let initialized;
  try { initialized = await state.findOne({ _id: 'skills' }); }
  catch (error) {
    console.error('Skills initialization check failed:', error);
    return seedSkills;
  }
  return initialized ? getCachedSkills() : seedSkills;
}

export async function getAdminSkills(): Promise<SkillType[]> {
  await requireAdmin();
  return readSkills(false);
}

export async function getSkillInitializationStatus(): Promise<boolean> {
  await requireAdmin();
  return Boolean(await state.findOne({ _id: 'skills' }));
}

async function prepareCollection() {
  await skills.createIndex({ category: 1, normalizedName: 1 }, { unique: true, name: 'skill_category_name_unique' });
}

async function markInitialized() {
  await state.updateOne({ _id: 'skills' }, { $set: { initialized: true } }, { upsert: true });
}

function refreshSkills() {
  updateTag(tag);
  revalidatePath('/');
  revalidatePath('/skills');
}

export async function importLegacySkills(): Promise<number> {
  const admin = await requireAdmin();
  await prepareCollection();
  if (await state.findOne({ _id: 'skills' })) throw new ValidationError('Skills have already been initialized');
  await skills.bulkWrite(seedSkills.map(skill => {
    const normalizedName = normalizeSkillName(skill.name);
    return { updateOne: { filter: { category: skill.category, normalizedName }, update: { $setOnInsert: { ...skill, normalizedName } }, upsert: true } };
  }));
  await markInitialized();
  await recordAdminEvent(admin.username, 'create', 'skill', 'legacy-import');
  refreshSkills();
  return seedSkills.length;
}

export async function saveSkill(input: unknown): Promise<void> {
  const admin = await requireAdmin();
  const { id, ...skill } = skillInput(input);
  await prepareCollection();
  const normalizedName = normalizeSkillName(skill.name);
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
  await markInitialized();
  await recordAdminEvent(admin.username, id ? 'update' : 'create', 'skill', id);
  refreshSkills();
}

export async function deleteSkill(inputId: unknown): Promise<void> {
  const admin = await requireAdmin();
  const id = objectId(inputId);
  const result = await skills.deleteOne({ _id: new ObjectId(id) });
  if (!result.deletedCount) throw new Error('Record not found');
  await markInitialized();
  await recordAdminEvent(admin.username, 'delete', 'skill', id);
  refreshSkills();
}
