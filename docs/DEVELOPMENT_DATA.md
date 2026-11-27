# Development migration rehearsal

Keep `PORTFOLIO_SOURCE_URI` set to a **read-only** production MongoDB credential for `PersonalPortfolio`. It is always the legacy input. Set only `DB_CONN_STRING` to choose the destination. In development, point it at loopback MongoDB and include a fresh database name matching `PersonalPortfolioDev_YYYYMMDD_XXXXXXXX`, for example `mongodb://127.0.0.1:27017/PersonalPortfolioDev_20261126_1234abcd`. In production, point it at the production `PersonalPortfolio` database with a separate credential that may write the six canonical resource collections. Never commit either URI.

Run the same commands in either environment:

```sh
npm run data:preview
npm run data:copy
npm run data:verify
```

The CLI loads the project-root `.env` file automatically. Explicit shell or CI
environment variables take precedence, so set `DB_CONN_STRING` in the shell to
select a different destination without editing the source URI. The CLI does not
read `.env.local`; keep the two migration URIs in `.env` or export them explicitly.

`data:preview` transforms every legacy document and checks for target conflicts without writing. `data:copy` inserts missing canonical documents, verifies every `_id` and mapped field, and checks that legacy source records did not change during the copy. It can be rerun: matching records are retained; a conflicting target stops the run. `data:verify` requires exact parity and performs no writes. All three commands retain legacy collections. The application reads the database named in `DB_CONN_STRING` and does not migrate on startup.

The seven source collections are `projects`, `certifications`, `degrees`, `workExperience`, `secondaryExperience`, `resumes`, and `skills`. They map into `project`, `certification`, `education`, `work`, `resume`, and `skill`. A missing or empty source collection stops the run; resolve the source data explicitly rather than creating empty target content. Review year-only work dates in the report because the transform infers January/December. Set `PORTFOLIO_MIGRATION_REPORT` to a local path if a JSON manifest is needed for review. Protect that report as operational data.

The production source should be stable during copy and verification. Freeze owner resource edits or take a consistent snapshot and reconcile any changes before cutover. A partial target copy after an interruption remains available for an idempotent rerun, but a source change can require review of a conflicting target. Do not remove legacy collections until the release has been verified and the rollback window has ended; their cleanup is a separate reviewed operation.
