'use client';
import { useMemo } from 'react';
import DataFilter from '../_shared/DataFilter';
import AddItemsButton from '../_shared/AddItemsButton';
import ListStatus from '../_shared/ListStatus';
import { usePaginatedList } from '../_shared/usePaginatedList';
import ProjectCard from './_components/ProjectCard';
import type { ProjectType } from '@/app/_lib/_types';
const css = require('./_components/Project.module.css');

export default function PageClient({ JSONData, total, filters }: { JSONData: string[]; total: number; filters: [[string, number][], [string, number][]] }) {
  const initial = useMemo(() => JSONData.map(item => JSON.parse(item) as ProjectType), [JSONData]);
  const list = usePaginatedList('/api/projects', initial, initial.length, 10, 'top');
  const [categories, technologies] = filters;
  const count = list.query.type === 'top' ? initial.length : list.query.type === 'all' ? total : (list.query.type === 'category' ? categories : technologies).find(([name]) => name === list.query.filter)?.[1] ?? 0;
  function select(value: string, type: 'category' | 'tech') {
    if (value === 'top') void list.select({ type: 'top' }, initial.length, initial);
    else if (value === 'all') void list.select({ type: 'all' }, total);
    else void list.select({ type, filter: value }, (type === 'category' ? categories : technologies).find(([name]) => name === value)?.[1] ?? 0);
  }
  const general = ['all', 'top'].includes(list.query.type) ? list.query.type : '';
  return <>
    <h1 id="projectsTitle">{list.query.type === 'top' ? <>Selected <span className="detail">projects</span></> : <>{count} <span className="detail">projects</span></>}</h1>
    <DataFilter titles={['Category', 'Technology']} options={[categories.map(([name]) => name), technologies.map(([name]) => name)]} values={[list.query.type === 'category' ? list.query.filter! : general, list.query.type === 'tech' ? list.query.filter! : general]} firstHandler={value => select(value, 'category')} secondHandler={value => select(value, 'tech')} />
    <ListStatus pending={list.pending} error={list.error} retry={() => { void list.loadMore(); }} />
    <ul id="projectsList" className={css.projectsListHolder} aria-busy={list.pending}>{list.items.map(project => <ProjectCard key={project.id} project={project} />)}</ul>
    {!list.pending && !list.error && !list.items.length && <p>No projects match this filter.</p>}
    {list.hasMore && !list.error && <AddItemsButton itemType="Projects" pending={list.pending} clickHandler={() => { void list.loadMore(); }} />}
  </>;
}
