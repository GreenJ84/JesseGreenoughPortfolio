'use client';
import { useMemo } from 'react';
import DataFilter from '../_shared/DataFilter';
import AddItemsButton from '../_shared/AddItemsButton';
import ListStatus from '../_shared/ListStatus';
import { usePaginatedList } from '../_shared/usePaginatedList';
import ProjectCard from './_components/ProjectCard';
import type { Project } from '@/app/_lib/_types';
const css = require('./_components/Project.module.css');

export default function PageClient({ JSONData, total, filters }: { JSONData: string[]; total: number; filters: [[string, number][], [string, number][]] }) {
  const initial = useMemo(() => JSONData.map(item => JSON.parse(item) as Project), [JSONData]);
  const list = usePaginatedList('/api/projects', initial, initial.length, 10, 'top');
  const [categories, technologies] = filters;
  const selected: [string?, string?] = [list.query.type === 'category' || list.query.type === 'combined' ? list.query.filter : undefined, list.query.type === 'tech' ? list.query.filter : list.query.secondFilter];
  const count = list.query.type === 'top' ? initial.length : list.query.type === 'all' ? total : list.query.type === 'combined' ? null : (list.query.type === 'category' ? categories : technologies).find(([name]) => name === list.query.filter)?.[1] ?? 0;
  function select(index: number, value: string) {
    const [category, tech] = selected.map((item, i) => i === index ? value : item);
    if (category && tech) void list.select({ type: 'combined', filter: category, secondFilter: tech }, Number.POSITIVE_INFINITY);
    else if (category) void list.select({ type: 'category', filter: category }, categories.find(([name]) => name === category)?.[1] ?? 0);
    else if (tech) void list.select({ type: 'tech', filter: tech }, technologies.find(([name]) => name === tech)?.[1] ?? 0);
    else void list.select({ type: 'all' }, total);
  }
  return <>
    <DataFilter heading={list.query.type === 'top' ? <>Selected <span className="detail">projects</span></> : <>{count ?? 'Filtered'} <span className="detail">projects</span></>} titles={['Category', 'Technology']} options={[categories.map(([name]) => name), technologies.map(([name]) => name)]} values={selected} onSelect={select} mode={list.query.type === 'top' ? 'top' : list.query.type === 'all' ? 'all' : 'filtered'} onMode={mode => { if (mode === 'top') void list.select({ type: 'top' }, initial.length, initial); else void list.select({ type: 'all' }, total); }} topLabel="Selected (top 10)" />
    <ListStatus pending={list.pending} error={list.error} retry={() => { void list.loadMore(); }} />
    <ul id="projectsList" className={css.projectsListHolder} aria-busy={list.pending}>{list.items.map(project => <ProjectCard key={project.id} project={project} />)}</ul>
    {!list.pending && !list.error && !list.items.length && <p>No projects match this filter.</p>}
    {list.hasMore && !list.error && <AddItemsButton itemType="Projects" pending={list.pending} clickHandler={() => { void list.loadMore(); }} />}
  </>;
}
