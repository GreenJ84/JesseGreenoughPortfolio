# Skills data

Skills are stored in the singular `skill` MongoDB collection. Home and Skills read only visible records from that collection; the owner-only editor at `/admin/data/skills` reads all records. An empty collection renders an empty skill list. A database failure is an error, not an invitation to show stale hardcoded data.

Each record stores `title`/`name`, `brief`, `category`, `rating` (1–5), `image_url` (an icon key), `sortOrder`, and `visible`. Category labels and the allowlisted icon registry remain in application code as presentation metadata; skill names, ratings, visibility, and ordering are database data. Admin writes create the unique `(category, normalizedName)` index and invalidate public skill caches.

## Development copy

`npm run data:copy` reads legacy `skills` through the read-only `PORTFOLIO_SOURCE_URI` and writes canonical `skill` records to the database named in `DB_CONN_STRING`. Run `data:preview` first and `data:verify` afterward. The source collection stays intact, and the application does not migrate on startup. The hardcoded seed script and admin import control have been removed.

Check the copied records before relying on them: total count, visible count, category values, icon keys, and Home/Skills rendering. The tested local copy had 58 records, all visible, with supported categories and icon keys. A future production migration must copy the current production records; the local copy is not a production source of truth.

## Deployment gate

Do not deploy the database-only skill reader until the production `skill` collection is populated and verified. Keep the legacy `skills` collection through the rollback window so the previous deployment can still read it. The full sequence is in [the rollout plan](ROLLOUT_PLAN_2026-11.md).
