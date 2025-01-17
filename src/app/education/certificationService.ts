import { SortDirection } from "mongodb";
import { DB, DB_INFO } from "../_utils/Database";

export interface certificationType {
  id?: string;
  priority: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
  url: string;
  techs: string[];
  }
const certificationDatabase = DB.collection<certificationType>(DB_INFO.collections.CERT);

const getCertificationItems = async (
  sort: boolean = true,
  offset: number = 0,
  filterOptions?: object
): Promise<certificationType[]> => {
  let sortOption: { [key: string]: SortDirection } = {
    title: 1,
    _id: -1,
  };
  if (sort) {
    sortOption = {
      priority: 1,
      date: -1,
      ...sortOption,
    };
  }
  return (await certificationDatabase
    .find(filterOptions ?? {})
    .sort(sortOption)
    .skip(offset)
    .limit(10)
    .toArray()
  ).map(item => {
    const { _id, ...rest} = item;
    return {id: _id.toString(), ...rest} as certificationType;
  });
}

export const getCertificationCount = async () => {
  return await certificationDatabase.countDocuments();
}

export const getUnsortedCertifications = async (offset: number = 0) => {
  return await getCertificationItems(
    false,
    offset
  );
}

export const getTopCertifications = async (): Promise<certificationType[]> => {
  return await getCertificationItems();
}


export const getCertificationFilterOptions = async (): Promise<[string, string]> => {
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
}


export const getCertificationsByTech = async (tech: string, offset: number = 0) => {
  return await getCertificationItems(
    true,
    offset,
    {
      techs: tech,
    }
  );
}

export const getCertificationsByIssuer = async (issuer: string, offset: number = 0) => {
  return await getCertificationItems(
    true,
    offset,
    {
      issuer: issuer,
    }
  );
}