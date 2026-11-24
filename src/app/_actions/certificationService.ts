'use server';
import { recordAdminEvent } from '../_observability/metrics';

import { requireAdmin } from "../_security/session";
import { certificationInput, objectId, offsetInput, filterInput } from "../_security/validation";


import { revalidatePath, updateTag, unstable_cache } from "next/cache";
import { ObjectId, SortDirection, WithId } from "mongodb";

import { CertificationType } from "../_lib/_types";
import { DB, DB_INFO } from "../_utils/Database";

const certificationDatabase = DB.collection<CertificationType>(DB_INFO.collections.CERT);
const cacheScope = [DB_INFO.name, DB_INFO.collections.CERT, 'legacy-20261123'];

export const getCertificationCount = unstable_cache(
  async (): Promise<number> => {
    return await certificationDatabase.countDocuments();
  },
  ['totalCertifications', ...cacheScope],
  { revalidate: 3600, tags: ['totalCertifications'] }
);

const getCertificationsBase = async (
  offset: number = 0,
  sortOption?: object,
  filterOptions?: object,
): Promise<CertificationType[]> => {
  let sortBase: { [key: string]: SortDirection } = {
    title: 1,
    _id: -1,
  };
  if (sortOption) {
    sortBase = {
      ...sortOption,
      ...sortBase,
    };
  }
  return (await certificationDatabase
    .find(filterOptions ?? {})
    .sort(sortBase)
    .skip(offsetInput(offset))
    .limit(10)
    .toArray())
    .map((cert: WithId<CertificationType>) => {
      const { _id, ...rest } = cert;
      return { id: _id.toString(), ...rest };
    });
};

export const getTopCertifications = unstable_cache(
  async (): Promise<CertificationType[]> => {
    return await getCertificationsBase(0, { priority: 1, date: -1 });
  },
  ['topCertifications', ...cacheScope],
  { revalidate: 3600, tags: ['topCertifications'] }
);

export const getAllCertifications = unstable_cache(
  async (offset: number): Promise<CertificationType[]> => {
    return await getCertificationsBase(offset);
  },
  ['allCertifications', ...cacheScope],
  { revalidate: 3600, tags: ['allCertifications'] }
);

export const getFullAllCertifications = async (): Promise<CertificationType[]> => {
  await requireAdmin();
  return (await certificationDatabase
    .find({})
    .sort({ priority: 1, date: -1, title: 1 })
    .toArray())
    .map((cert: WithId<CertificationType>) => {
      const { _id, ...rest } = cert;
      return { id: _id.toString(), ...rest };
    });
};

export const getCertificationFilterOptions = unstable_cache(
  async (): Promise<[string, string]> => {
    const res: {
      issuer: string;
      techs: string[];
    }[] = await certificationDatabase
      .find()
      .project<{ issuer: string; techs: string[] }>({
        issuer: 1,
        techs: 1,
        _id: 0,
      })
      .toArray();

    const issuerMap = new Map<string, number>();
    const techMap = new Map<string, number>();
    res.map((item) => {
      if (issuerMap.has(item.issuer)) {
        issuerMap.set(item.issuer, issuerMap.get(item.issuer)! + 1);
      } else {
        issuerMap.set(item.issuer, 1);
      }
      item.techs.forEach((tech) => {
        if (techMap.has(tech)) {
          techMap.set(tech, techMap.get(tech)! + 1);
        } else {
          techMap.set(tech, 1);
        }
      });
    });

    return [
      JSON.stringify(Array.from(issuerMap.entries())),
      JSON.stringify(Array.from(techMap.entries())),
    ];
  },
  ['certificationFilters', ...cacheScope],
  { revalidate: 3600, tags: ['certificationFilters'] }
);

export const getCertificationsByTech = unstable_cache(
  async (tech: string, offset: number = 0): Promise<CertificationType[]> => {
    return await getCertificationsBase(
      offset,
      { priority: 1, date: -1, title: 1 },
      { techs: filterInput(tech) }
    );
  },
  ['certificationsByTech', ...cacheScope],
  { revalidate: 3600, tags: ['certificationsByTech'] }
);

export const getCertificationsByIssuer = unstable_cache(
  async (issuer: string, offset: number = 0): Promise<CertificationType[]> => {
    return await getCertificationsBase(
      offset,
      { priority: 1, date: -1, title: 1 },
      { issuer: filterInput(issuer) }
    );
  },
  ['certificationsByIssuer', ...cacheScope],
  { revalidate: 3600, tags: ['certificationsByIssuer'] }
);

export const getCertificationsByIssuerAndTech = unstable_cache(
  async (issuer: string, tech: string, offset: number = 0): Promise<CertificationType[]> =>
    getCertificationsBase(offset, { priority: 1, date: -1, title: 1 }, { issuer: filterInput(issuer), techs: filterInput(tech) }),
  ['certificationsByIssuerAndTech', ...cacheScope],
  { revalidate: 3600, tags: ['certificationsByIssuer', 'certificationsByTech'] }
);

export const saveCertification = async (input: unknown) => {
  const admin = await requireAdmin();
  const { id, ...data } = certificationInput(input);
  if (id) {
    const result = await certificationDatabase.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
    if (!result.matchedCount) throw new Error('Record not found');
  } else {
    await certificationDatabase.insertOne(data);
  }
  await recordAdminEvent(admin.username, id ? 'update' : 'create', 'certification', id);
  updateTag('totalCertifications');
  updateTag('allCertifications');
  updateTag('topCertifications');
  updateTag('certificationFilters');
  updateTag('certificationsByTech');
  updateTag('certificationsByIssuer');
};

export const deleteCertification = async (inputId: unknown) => {
  const admin = await requireAdmin();
  const id = objectId(inputId);
  try {
    const result = await certificationDatabase.deleteOne({ _id: new ObjectId(id) });
    if (!result.deletedCount) throw new Error('Record not found');
    revalidatePath('/(management)/admin/data/certifications');
  } catch (error) {
    console.error('Delete certification error:', error);
    throw new Error('Failed to delete certification');
  }
  await recordAdminEvent(admin.username, 'delete', 'certification', id);
  updateTag('totalCertifications');
  updateTag('allCertifications');
  updateTag('topCertifications');
  updateTag('certificationFilters');
  updateTag('certificationsByTech');
  updateTag('certificationsByIssuer');
};
