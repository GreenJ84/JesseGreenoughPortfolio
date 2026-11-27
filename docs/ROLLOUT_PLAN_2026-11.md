# Portfolio model rollout plan

## Current data contract

The refactored app reads `project`, `certification`, `education`, `work`,
`resume`, and `skill`. Five resource types come from the six required legacy
collections. The 58 skills come from the reviewed historical seed in
`migration/historical-skills.json`; no legacy `skills` collection is required.
The explicit migration commands read legacy production data through the
read-only `PORTFOLIO_SOURCE_URI` and write only to the database selected by
`DB_CONN_STRING`. The app never migrates on startup. No migration command drops
or renames legacy data.

## Release gates

1. CI must pass npm install, typecheck, lint, unit tests, build, route/browser,
   accessibility, performance, and container security checks. CI uses synthetic
   data only and does not access production MongoDB.
2. Back up production. Review the source collection inventory, counts, schema
   variants, links, images, resume files, dates, and visible content. Review
   inferred January/December months in historical work periods and all 58
   recovered skill ratings and icons.
3. Run the manual migration first into a fresh local development database.
   Review `data:preview`, execute `data:copy`, then require `data:verify` and
   inspect the pages locally. See [the full command procedure](DEVELOPMENT_DATA.md).
4. Freeze legacy resource edits, take a fresh backup, change only
   `DB_CONN_STRING` to the production `PersonalPortfolio` destination, and run
   the same three commands. The verified new collections must exist before
   the refactor is merged into `main`.
5. Review the Vercel Preview deployment and production environment settings.
   When possible, stage the production build before assigning the live domain.
   Test public routes, owner access, contact delivery, media, metrics, health,
   and real images after the new deployment is serving traffic.

## Rollback and cleanup

Keep the legacy collections for a defined rollback window. If the new release
fails, route traffic back to the old deployment, which still reads its legacy
collections. Reconcile any admin edits made after cutover before retrying.
Remove legacy collections only after a verified backup, stable live operation,
and a separate cleanup review confirming no old deployment needs them. The
migration script has no delete mode.

## Follow-on hardening

### Owner availability

Confirm the trusted client-IP header at the deployment proxy and test that
callers cannot spoof it. Keep a second passkey on a separate device. Monitor
session and passkey store health, and rehearse recovery privately.

### Visitor metrics

Label current counts as page views. Filter known bots, distinguish admin and
internal traffic, and sample or aggregate if write volume grows. Document
retention and privacy expectations; do not call these unique visitors.

### Data reads

Capture collection sizes, query plans, and p95 read latency before changing
queries. Add indexes or pagination only where those measurements show a need,
then compare query plans and cache behavior after each change.
