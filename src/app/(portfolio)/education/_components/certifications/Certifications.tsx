'use client';
import { useMemo } from 'react';
import type { CertificationType } from '@/app/_lib/_types';
import DataFilter from '../../../_shared/DataFilter';
import AddItemsButton from '../../../_shared/AddItemsButton';
import ListStatus from '../../../_shared/ListStatus';
import { usePaginatedList } from '../../../_shared/usePaginatedList';
import CertificationCard from './CertificationCard';
const css = require('./Certifications.module.css');

export default function Certifications({ certificationData }: { certificationData: { certItems: CertificationType[]; total: number; issuerData: string; techData: string } }) {
  const { certItems, total, issuerData, techData } = certificationData;
  const issuers = useMemo(() => JSON.parse(issuerData) as [string, number][], [issuerData]);
  const technologies = useMemo(() => JSON.parse(techData) as [string, number][], [techData]);
  const list = usePaginatedList('/api/certifications', certItems, certItems.length, 10, 'top');
  const selected: [string?, string?] = [list.query.type === 'issuer' || list.query.type === 'combined' ? list.query.filter : undefined, list.query.type === 'tech' ? list.query.filter : list.query.secondFilter];
  const count = list.query.type === 'top' ? certItems.length : list.query.type === 'all' ? total : list.query.type === 'combined' ? null : (list.query.type === 'issuer' ? issuers : technologies).find(([name]) => name === list.query.filter)?.[1] ?? 0;
  function select(index: number, value: string) {
    const [issuer, tech] = selected.map((item, i) => i === index ? value : item);
    if (issuer && tech) void list.select({ type: 'combined', filter: issuer, secondFilter: tech }, Number.POSITIVE_INFINITY);
    else if (issuer) void list.select({ type: 'issuer', filter: issuer }, issuers.find(([name]) => name === issuer)?.[1] ?? 0);
    else if (tech) void list.select({ type: 'tech', filter: tech }, technologies.find(([name]) => name === tech)?.[1] ?? 0);
    else void list.select({ type: 'all' }, total);
  }
  return <section id="certificationContainer" role="tabpanel" aria-labelledby="certification-tab">
    <DataFilter heading={list.query.type === 'top' ? <>Selected <strong className="detail">certifications</strong></> : <>{count ?? 'Filtered'} <strong className="detail">certifications</strong></>} headingLevel="h3" titles={['Issuer', 'Technology']} options={[issuers.map(([name]) => name), technologies.map(([name]) => name)]} values={selected} onSelect={select} mode={list.query.type === 'top' ? 'top' : list.query.type === 'all' ? 'all' : 'filtered'} onMode={mode => { if (mode === 'top') void list.select({ type: 'top' }, certItems.length, certItems); else void list.select({ type: 'all' }, total); }} topLabel="Selected (top 10)" />
    <ListStatus pending={list.pending} error={list.error} retry={() => { void list.loadMore(); }} />
    <ul id="certificationList" className={css.certCardHolder} aria-busy={list.pending}>{list.items.map(item => <CertificationCard key={item.id} certificate={item} />)}</ul>
    {!list.pending && !list.error && !list.items.length && <p>No certifications match this filter.</p>}
    {list.hasMore && !list.error && <AddItemsButton itemType="Certifications" pending={list.pending} clickHandler={() => { void list.loadMore(); }} />}
  </section>;
}
