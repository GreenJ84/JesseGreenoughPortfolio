# Skills data

Skills now use the `skills` collection. Public Home and Skills views read visible records from that collection after initialization. Until a reachable database is initialized, they render the existing 58 static records so a deployment does not start with an empty skills page. If the database cannot be checked, public reads return no skills rather than exposing records whose visibility is unknown. The owner-only admin page is at `/admin/data/skills`.

Each record stores a category, name, 1–5 rating, icon key, display order, and visibility. Icon keys are chosen from the application's allowlisted icon registry; React components are never stored in MongoDB. A unique index on category and normalized name prevents duplicates within a group.

## Initialize a development copy

Set `PORTFOLIO_DB_NAME` to the isolated `PersonalPortfolioDev_YYYYMMDD_XXXXXXXX` database from `npm run data:copy`. The seed uses `DB_CONN_STRING` when present, otherwise `PORTFOLIO_LOCAL_URI` or loopback MongoDB. It rejects remote hosts and a URI database path that differs from `PORTFOLIO_DB_NAME`.

```sh
npm run skills:preview
npm run skills:seed
```

The preview reports the target and current count. The seed inserts missing legacy records, leaves existing matching records unchanged, then marks the collection initialized. Repeating it after initialization makes no changes. You can also initialize through the owner-only **Import current skills** button on the Skills admin page.

## Production rollout

Review the development copy first. A production preview uses `PORTFOLIO_PRODUCTION_URI` and `node scripts/seed-skills.cjs --production`. An explicit production write requires `--production --apply --confirm-production-skills`; no production import was run as part of this implementation. After import, edits in the admin page invalidate the public skills cache and refresh Home and Skills.

The former static list remains as the seed and pre-initialization fallback. A standalone script import may require page revalidation or redeployment before the static Home and Skills pages refresh; the admin import triggers that refresh directly. The static list can be removed after production has been initialized and checked.
