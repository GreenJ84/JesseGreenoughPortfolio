/** @format */

export interface certificationType {
  id?: string;
  priority?: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
  url: string;
  tech?: string[]
}
