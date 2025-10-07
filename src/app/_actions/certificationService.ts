'use server';

import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { ObjectId, SortDirection, WithId } from "mongodb";

import { CertificationType } from "../_lib/_types";
import { DB, DB_INFO } from "../_utils/Database";

const certificationDatabase = DB.collection<CertificationType>(DB_INFO.collections.CERT);

const getCertifications = async (
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
      ...sortBase,
      ...sortOption,
    };
  }
  return (await certificationDatabase
    .find(filterOptions ?? {})
    .sort(sortBase)
    .skip(offset)
    .limit(10)
    .toArray())
    .map((cert: WithId<CertificationType>) => {
      const { _id, ...rest } = cert;
      return { id: _id.toString(), ...rest };
    });
};

export const getCertificationCount = unstable_cache(
  async (): Promise<number> => {
    return await certificationDatabase.countDocuments();
  },
  ['totalCertifications'],
  { revalidate: 3600, tags: ['totalCertifications'] }
);

export const getTopCertifications = unstable_cache(
  async (): Promise<CertificationType[]> => {
    return await getCertifications(0, { priority: 1, date: -1 });
  },
  ['topCertifications'],
  { revalidate: 3600, tags: ['topCertifications'] }
);

export const getAllCertifications = unstable_cache(
  async (offset: number): Promise<CertificationType[]> => {
    return await getCertifications(offset);
  },
  ['allCertifications'],
  { revalidate: 3600, tags: ['allCertifications'] }
);

export const getFullAllCertifications = async (): Promise<CertificationType[]> => {
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
  async (): Promise<[[string, number][], [string, number][]]> => {
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
      Array.from(issuerMap.entries()),
      Array.from(techMap.entries()),
    ];
  },
  ['certificationFilters'],
  { revalidate: 3600, tags: ['certificationFilters'] }
);

export const getCertificationsByTech = unstable_cache(
  async (tech: string, offset: number = 0): Promise<CertificationType[]> => {
    return await getCertifications(
      offset,
      { priority: 1, date: -1, title: 1 },
      { techs: tech }
    );
  },
  ['certificationsByTech'],
  { revalidate: 3600, tags: ['certificationsByTech'] }
);

export const getCertificationsByIssuer = unstable_cache(
  async (issuer: string, offset: number = 0): Promise<CertificationType[]> => {
    return await getCertifications(
      offset,
      { priority: 1, date: -1, title: 1 },
      { issuer: issuer }
    );
  },
  ['certificationsByIssuer'],
  { revalidate: 3600, tags: ['certificationsByIssuer'] }
);

export const saveCertification = async (formData: CertificationType) => {
  if (formData.id) {
    const { id, ...rest } = formData;
    try {
      await certificationDatabase.updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...rest } }
      );
    } catch (error) {
      console.error('Update certification error:', error);
      throw new Error('Failed to update certification');
    }
  } else {
    try {
      await certificationDatabase.insertOne(formData);
    } catch (error) {
      console.error('Insert certification error:', error);
      throw new Error('Failed to insert certification');
    }
  }
  revalidateTag('totalCertifications');
  revalidateTag('allCertifications');
  revalidateTag('topCertifications');
  revalidateTag('certificationFilters');
  revalidateTag('certificationsByTech');
  revalidateTag('certificationsByIssuer');
};

export const deleteCertification = async (id: string) => {
  if (!id) throw new Error('Invalid certification id');
  try {
    await certificationDatabase.deleteOne({ _id: new ObjectId(id) });
    revalidatePath('/(management)/admin/data/certifications');
  } catch (error) {
    console.error('Delete certification error:', error);
    throw new Error('Failed to delete certification');
  }
  revalidateTag('totalCertifications');
  revalidateTag('allCertifications');
  revalidateTag('topCertifications');
  revalidateTag('certificationFilters');
  revalidateTag('certificationsByTech');
  revalidateTag('certificationsByIssuer');
};