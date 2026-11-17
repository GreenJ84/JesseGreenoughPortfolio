import { Db, WithId } from "mongodb";

import { OLD_DB_INFO, DB_INFO } from "./Database";

import { EducationType as OldEdu } from "../_lib/_old_types";
import { EducationType } from "../_lib/_types";

import { parseMonthYearRange } from "./migration";

export async function migrateEdu(DB: Db) {
  console.log("Migrating Education...");

  const old_edu = DB.collection(OLD_DB_INFO.collections.EDU);
  console.log("Found Edu count:", await old_edu.countDocuments());
  const cursorE = old_edu.find({});

  const edu = DB.collection(DB_INFO.collections.EDU);
  while (await cursorE.hasNext()) {
    const doc = await cursorE.next() as WithId<OldEdu>;

    let valid = true;
    const updated: EducationType = {
      title: "",
      brief: "",
      description: "",
      image: "",
      url: "",
      college: "",
      start_date: new Date(),
      details: []
    };

    if (doc.college === "") valid = false;
    updated.college = doc.college;

    if (doc.degree === "") valid = false;
    updated.title = doc.degree;

    if (doc.description.length === 0) valid = false;
    updated.details = doc.description;

    if (doc.website === "") valid = false;
    updated.url = doc.website;

    if (doc.icon === "") valid = false;
    updated.image = doc.icon;

    const { startDate, endDate } = parseMonthYearRange(doc.date);

    if (!startDate) {
      valid = false;
      updated.start_date = new Date();
    } else {
      updated.start_date = startDate!;
    }

    if (endDate) updated.end_date = endDate;

    if (!valid) {
      console.warn("Skipping invalid education record", doc._id.toString());
      continue;
    }

    console.log("Edu", doc._id, "VALID", updated);
    await edu.insertOne({ _id: doc._id, ...updated });
  }
}