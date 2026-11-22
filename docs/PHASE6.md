# Phase 6 release checks

The quality workflow runs on pushes and pull requests. It installs from the lockfile, checks types and lint, runs the 45 Node regression tests, builds the production app against a disposable MongoDB service, then checks the standalone server. The smoke check covers home, skills, admin login, protected-route redirection, malformed API input, and `nosniff` headers. The browser check covers zoom, contact dialog naming, focus entry, Tab containment, Escape, and focus restoration. Locally, the production build, smoke check, browser check, lint, typecheck, and 45 tests passed against the current working tree.

## Clean-checkout blocker

A separate clean archive of the committed HEAD fails `npm run typecheck`. Three tracked admin files still refer to removed education fields or a removed `DataType` export. The tracked, unused `migrateEdu.ts` imports two helper files that are currently untracked. The user's pending working-tree changes repair the three admin files and supply those helpers, but they are deliberately excluded from agent commits. The CI job therefore detects these errors and will fail at typecheck until the owner reconciles and commits that pending work, or authorizes a separate cleanup. No CI bypass or exclusion was added.

The browser and smoke checks were verified against the local standalone production build. That build used the current working tree, including the user's pending files; this does not establish a passing clean-checkout build.
