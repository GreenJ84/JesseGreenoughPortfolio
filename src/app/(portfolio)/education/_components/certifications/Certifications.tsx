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
  const count = list.query.type === 'top' ? certItems.length : list.query.type === 'all' ? total : (list.query.type === 'issuer' ? issuers : technologies).find(([name]) => name === list.query.filter)?.[1] ?? 0;
  function select(value: string, type: 'issuer' | 'tech') {
    if (value === 'top') void list.select({ type: 'top' }, certItems.length, certItems);
    else if (value === 'all') void list.select({ type: 'all' }, total);
    else void list.select({ type, filter: value }, (type === 'issuer' ? issuers : technologies).find(([name]) => name === value)?.[1] ?? 0);
  }
  const general = ['all', 'top'].includes(list.query.type) ? list.query.type : '';
  return <section id="certificationContainer" role="tabpanel" aria-labelledby="certification-tab">
    <h3 className={css.certSubTitle}>{list.query.type === 'top' ? <>Selected <strong className="detail">certifications</strong></> : <>{count} <strong className="detail">certifications</strong></>}</h3>
    <DataFilter titles={['Issuer', 'Technology']} options={[issuers.map(([name]) => name), technologies.map(([name]) => name)]} values={[list.query.type === 'issuer' ? list.query.filter! : general, list.query.type === 'tech' ? list.query.filter! : general]} firstHandler={value => select(value, 'issuer')} secondHandler={value => select(value, 'tech')} topLabel="Selected certifications" />
    <ListStatus pending={list.pending} error={list.error} retry={() => { void list.loadMore(); }} />
    <ul id="certificationList" className={css.certCardHolder} aria-busy={list.pending}>{list.items.map(item => <CertificationCard key={item.id} certificate={item} />)}</ul>
    {!list.pending && !list.error && !list.items.length && <p>No certifications match this filter.</p>}
    {list.hasMore && !list.error && <AddItemsButton itemType="Certifications" pending={list.pending} clickHandler={() => { void list.loadMore(); }} />}
  </section>;
}
