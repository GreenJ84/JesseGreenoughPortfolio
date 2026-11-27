# Manual portfolio migration

The migration is an operator-run command in `migration/`. CI never connects to
production data or runs a copy. Application startup never migrates. The six
canonical target collections are `project`, `certification`, `education`,
`work`, `resume`, and `skill`. Legacy collections are never dropped or renamed.

## 1. Prepare credentials and a backup

1. Back up the production `PersonalPortfolio` database and record the backup ID.
2. Create a **read-only** MongoDB credential for the legacy production source.
   Keep `PORTFOLIO_SOURCE_URI` pointed at that database for both local rehearsal
   and production cutover.
3. Use a separate destination credential. Locally it may write to a fresh
   loopback database named `PersonalPortfolioDev_YYYYMMDD_XXXXXXXX`. In
   production it may write to the canonical collections in `PersonalPortfolio`.
4. Put both variables in the project-root `.env` (ignored by Git), or export
   them in your shell. The CLI reads `.env`; explicit shell values take
   precedence. It does not read `.env.local`.

Do not print or commit either URI. Confirm both databases and credentials
before `data:copy`; it is the only command below that writes.

## 2. Rehearse against a local development database

Set `DB_CONN_STRING` to a **fresh** local destination, for example
`mongodb://127.0.0.1:27017/PersonalPortfolioDev_20261127_1234abcd`. Keep
`PORTFOLIO_SOURCE_URI` unchanged. Run:

```sh
npm ci
npm run data:preview
npm run data:copy
npm run data:verify
```

`data:preview` transforms every legacy document and checks for target conflicts
without writing. Review its counts and `inferredPeriods` before copying:
year-only work dates become January starts and December ends. `data:copy`
inserts missing canonical records, checks every `_id` and mapped field, and
verifies the source did not change during the run. `data:verify` repeats the
comparison without writing. Matching copies can be rerun; an unexpected or
changed target record stops the run. Set `PORTFOLIO_MIGRATION_REPORT` to a local
path if you want a JSON manifest; use a different path for each mode so one
report does not overwrite another.

Six legacy collections are required: `projects`, `certifications`, `degrees`,
`workExperience`, `secondaryExperience`, and `resumes`. Missing or empty
collections stop the run. **No legacy `skills` collection is required.** The
`skill` target is seeded from `migration/historical-skills.json`, which records
the 58 names, ratings, icon keys, categories, and order recovered from Git
commit `007e9a1`. All 58 are visible by default. Inspect those ratings before
publishing; later changes made only in the erased local database cannot be
recovered from this historical file.

Check each copied image, resume download, credential link, project link, work
date, and visible page in the local app. Confirm all 58 skill icons render and
the Home and Skills pages show the expected order. Keep the local database as
rehearsal evidence until production is stable.

## 3. Copy to production before deploying the refactor

Freeze owner edits to the legacy resources, take a fresh backup, and change
**only `DB_CONN_STRING`** to the production `PersonalPortfolio` URI with the
destination credential. The read-only `PORTFOLIO_SOURCE_URI` remains the same.
Run the same three commands, in order, from the reviewed release commit. Review
the preview report before copying and retain the final verify report. This
places canonical and legacy collections side by side in production.

Do not merge the refactor into `main` until production `data:verify` passes and
the public records and skill seed have been reviewed. Deploy the new app, then
check all public routes, owner sign-in and edits, downloads, contact delivery,
health, and metrics. Keep legacy collections throughout the rollback window:
the old deployment can still read them. Remove legacy collections only after
the new deployment is confirmed stable, no old deployment needs them, and a
separate backup and cleanup review are complete.
