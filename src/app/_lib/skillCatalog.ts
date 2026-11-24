import { skillData } from '../(portfolio)/skills/_components/skillData';
import { BsQuestionCircle } from 'react-icons/bs';
import type { ComponentType } from 'react';
import type { IconBaseProps } from 'react-icons';
import type { SkillType } from './_types';

export const skillCategories = Object.keys(skillData) as (keyof typeof skillData)[];
export const skillIconRegistry: Record<string, ComponentType<IconBaseProps>> = { General: BsQuestionCircle, ...Object.fromEntries(Object.values(skillData).flat().map(skill => [skill.name, skill.icon])) };
export const skillIconKeys = Object.keys(skillIconRegistry).sort((a, b) => a.localeCompare(b));
export const getSkillIcon = (key: string) => Object.hasOwn(skillIconRegistry, key) ? skillIconRegistry[key] : skillIconRegistry.General;

export const seedSkills: SkillType[] = skillCategories.flatMap(category => skillData[category].map((skill, sortOrder) => ({
  category, name: skill.name, rating: skill.rating, iconKey: skill.name, sortOrder, visible: true,
})));

export const normalizeSkillName = (name: string) => name.trim().toLocaleLowerCase('en-US');
