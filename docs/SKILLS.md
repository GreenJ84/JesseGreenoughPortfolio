# Skills data

Home and Skills read visible records from the singular `skill` MongoDB
collection. The owner editor at `/admin/data/skills` reads all records. An
empty collection renders an empty skill list; the app has no hardcoded fallback.

Each record stores `title`/`name`, `brief`, `category`, `rating` (1–5),
`image_url` (an icon key), `sortOrder`, and `visible`. Category labels and the
icon registry remain presentation metadata in the application. Admin writes
create the unique `(category, normalizedName)` index and invalidate caches.

## Recovered historical seed

The old `skillData.ts` at Git commit `007e9a1` contained 58 skills in eight
groups. `migration/historical-skills.json` preserves their names, ratings,
icon keys, group order, and item order. The manual migration creates stable
`skill` IDs from those values. It does not require or read a legacy `skills`
collection. All recovered skills are visible by default. Any edits made only
to the erased local database are not in the historical source and must be
re-entered through admin after review.

Run `data:preview`, `data:copy`, and `data:verify` first against a fresh local
database, then against production by changing only `DB_CONN_STRING`. Inspect
the 58 records, icons, ratings, ordering, and Home/Skills rendering before
deploying the database-only reader. See [manual migration](DEVELOPMENT_DATA.md).
