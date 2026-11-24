# Portfolio model rollout plan

## Current development contract

The canonical collections are `project`, `certification`, `education`, `work`, `resume`, and `skill`. All resource documents use `title`, `brief`, and `image_url`; work uses `primary`, `start_date`, and optional `end_date`. The two legacy work collections merge into `work`.

On a named `PersonalPortfolioDev_YYYYMMDD_hex8` database connected through loopback MongoDB, Next.js instrumentation copies legacy collections into the canonical collections at server startup, checks each transformed document by `_id`, then drops the legacy collections. It refuses remote targets and never runs in production. A conflict or unrecognized date stops the migration before any legacy collection is dropped. Do not treat a successful build as evidence that real portfolio data migrated: the development copy must be exercised with MongoDB available.

## Development gates before production work

1. Run `npm ci`, `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build` in CI. Retain the existing admin and public route smoke checks and add browser checks for the home carousel, searchable filters, contact modal, mobile navigation, and light/dark themes.
2. Add a MongoDB integration job that creates a disposable named development database with representative legacy documents in every old collection. Start `next dev`, verify the instrumentation migration completes, compare counts and mapped fields, verify old collections are absent, then repeat startup to prove idempotence. Include malformed dates and conflicting target records to prove it stops without dropping sources.
3. Use a current read-only production snapshot copied by `data:copy` to a named local database. Audit every record after migration: image URLs, credential links, project links, work dates, resume downloads, skill icons, and visible content. Review any inferred month precision before accepting it.
4. Run desktop and mobile visual checks at 390, 768, and 1365 px. Check reduced motion, keyboard focus, screen-reader names, CSP violations, and real images. Measure LCP, CLS, INP, route bundle sizes, and database query times against the existing performance baselines.
5. Require a reviewed migration report, passing CI, and a deployment preview before production cutover. Keep deployment credentials separate from development copy credentials.

## Production rehearsal and cutover

1. Create a backup and record source collection counts and checksums. Use a migration tool with **read access to legacy production collections** and write access only to new singular collections. Copy and transform; do not drop or rename legacy collections during rehearsal.
2. Point a protected preview at the new production collections. Verify all public routes, owner actions, passkeys, media, metrics, and health checks against them. Run data comparisons and a live browser review. Then **drop the rehearsal's new collections**, leaving legacy production untouched, as requested.
3. Schedule the real cutover. Freeze admin edits, take a fresh backup, repeat the copy into new collections, verify counts and representative records, deploy the new code, and run smoke and owner checks. Keep legacy collections for a defined rollback window; remove them only after the new deployment is stable and a separately reviewed cleanup is approved.
4. Rollback means redeploying the old code against preserved legacy collections. Do not rely on reversing a destructive migration.

## Follow-on hardening

### Owner availability

Confirm the trusted client-IP header at the deployment proxy, test that callers cannot spoof it, and add client-specific throttles that do not share the owner's global allowance. Keep a second passkey registered on a separate device. Alert on repeated failures and monitor session-store and passkey-store health. Test a documented recovery drill before removing any fallback.

### Visitor metrics

Label current counts as page views. Filter known bots, distinguish internal/admin traffic, and sample or aggregate requests if write volume grows. Add a reconciliation check and document retention and privacy expectations. Avoid presenting these counts as unique visitors without a sound visitor-identity design.

### Data reads

Capture collection sizes, query plans, and p95 read latency first. If the data warrants it, replace full-collection filter scans with indexed aggregation and use cursor pagination for deep lists. Add indexes for actual filter and sort patterns, then compare query plans and cache hit behavior before and after.
