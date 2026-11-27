# Portfolio model rollout plan

## Current development contract

The canonical collections are `project`, `certification`, `education`, `work`, `resume`, and `skill`. All resource documents use `title`, `brief`, and `image_url`; work uses `primary`, `start_date`, and optional `end_date`. The two legacy work collections merge into `work`.

The explicit `data:preview`, `data:copy`, and `data:verify` commands read legacy collections through `PORTFOLIO_SOURCE_URI` and use `DB_CONN_STRING` as the only destination selector. In development, use a named loopback database; for production cutover, change `DB_CONN_STRING` to the production `PersonalPortfolio` database. The commands compare transformed documents by `_id` and field value and retain every legacy collection. Application startup never migrates. A conflict or unrecognized date stops the command without dropping source data.

## Development gates before production work

1. Run `npm ci`, `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build` in CI. Retain the existing admin and public route smoke checks and add browser checks for the home carousel, searchable filters, contact modal, mobile navigation, and light/dark themes.
2. Run the shared migration command against a disposable named development database with representative legacy documents in every source collection. Compare counts and mapped fields, verify legacy collections remain, and repeat the copy to prove idempotence. Include malformed dates and conflicting target records to prove it stops without deleting sources.
3. Use the read-only `PORTFOLIO_SOURCE_URI` and a named local `DB_CONN_STRING` destination for a current production-data rehearsal. Audit every record after migration: image URLs, credential links, project links, work dates, resume downloads, skill icons, and visible content. Review any inferred month precision before accepting it.
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

## Deployment execution checklist (26 November 2026)

This is a plan, not an executed production migration. The shared migration command exists, but no production copy or legacy cleanup has been executed. The protected production-data rehearsal and preview remain release gates. Legacy cleanup is a separate reviewed operation after the rollback window.

### 0. Commit and release gates

- Review and commit the settled `_types.ts` and other pending user edits as deliberate slices. A clean checkout currently contains the old type names and is not equivalent to the tested working tree. Run all checks from that clean commit, not just the local workspace.
- Verify `npm ci`, typecheck, lint, tests, build, production server smoke, passkey checks, and browser flows in CI. Add a MongoDB fixture job with both old and new collection states. Fail the gate when transformed data is absent, mismatched, or a migration emits a warning even if Next exits zero.
- Inventory production collections, counts, and schema variants with read-only credentials. Confirm images, dates, links, and visibility. Run `npm audit` in CI and require a reviewed result.

### 1. Review the shared production migration command

- The command has read-only `--plan` and `--verify` modes and an idempotent `--apply` copy mode. Review its report, including source hashes, old/new collection counts, inferred dates, and conflicts, without printing credentials or private document contents. Rehearsal cleanup is separate and only removes disposable local targets.
- Use a source account that can read legacy resource collections and a distinct destination account that can write only the six new resource collections. Neither migration credential needs permission to drop legacy collections.
- Reuse the reviewed transforms but add shape validation for every output, deterministic counts and per-collection checksums or a field-level comparison keyed by `_id`, and a manifest recording source counts, destination counts, conflicts, start/end times, and code commit. Stop on unknown legacy dates or mismatched target documents. Make reruns idempotent.
- Do not migrate owner passkeys, sessions, rate limits, visitor metrics, or alerts as part of the resource rename; they keep their existing collection names. Preserve the old resource collections for rollback.

### 2. Rehearse on production data without serving the release

- Back up production and capture a restore point. Freeze owner resource edits for the short copy/verify window or reconcile any changes before final cutover.
- Confirm the six new names are absent or identify a separate approved rehearsal namespace. Copy old production collections to the new names, verify every `_id` and mapped field, and compare record counts. A pass means exact parity for all six resources, valid skill visibility/icons, usable images and downloads, and no unrecognized transform values.
- Point an access-controlled preview deployment at those new collections. Exercise public pages, all filters, the Home carousel, admin CRUD, owner session/passkey access, contact delivery, health, and metrics. Keep the preview from sending real visitor metrics or contact messages unless using explicit test settings.
- Remove only the new collections created by this rehearsal after the manifest has been archived and the old deployment remains healthy. Record the cleanup result. Never drop or modify the legacy collections during rehearsal.

### 3. Cut over and roll back

- Schedule the release window; freeze owner edits; take a fresh backup; run the copy and verification again. Keep the old deployment serving the legacy collections until parity passes.
- Deploy the reviewed commit with production `DB_CONN_STRING`, admin credentials, passkey origin/RP ID, mail settings, and trusted IP settings checked for the actual host. Route traffic only after health and data-backed smoke checks pass. Invalidate or wait out old data caches as needed.
- Monitor page errors, data counts, owner login, contact delivery, metrics writes, latency, and CSP reports. If the new release fails, route traffic back to the old code, which still reads the preserved legacy collections. Reconcile any owner edits made after cutover before a retry.
- Retain legacy collections through a defined rollback window. Remove them only in a separately reviewed cleanup with a verified backup and no old deployment depending on them.
