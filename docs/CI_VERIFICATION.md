# CI verification

The `Quality and deployment smoke` workflow runs on pushes, pull requests, and
manual dispatch. It runs `npm ci`, typecheck, lint, unit tests, and build against
a disposable MongoDB service seeded with canonical portfolio records. It
starts the standalone build, runs admin and public route smoke checks, tests
the contact dialog keyboard flow, and runs browser checks at 390, 768, and
1365 px. The browser matrix checks the carousel, searchable filters, mobile
menu, theme switch, reduced motion, screen-reader names, CSP violations,
horizontal overflow, and a real project image. Screenshots and performance
reports are uploaded as `portfolio-quality-evidence`.

CI includes unit checks for migration transforms and the historical skill
seed as code verification. It does **not** connect to production MongoDB,
run migration plan/copy/verify, or remove legacy collections. The manual
process is in [DEVELOPMENT_DATA.md](DEVELOPMENT_DATA.md).

## Performance evidence

The workflow measures LCP, CLS, route JavaScript transfer, and an Event Timing
interaction proxy at mobile and desktop sizes. It compares Home and Skills
with `docs/performance/after.json` and records Projects as a new route
baseline. The lab uses fixed image and third-party response fixtures; the
browser matrix checks a real project image separately. The interaction proxy
is **not field INP**. Check field INP in deployed Speed Insights after release.
Query median, p95, and documents examined are saved for common MongoDB reads
on the CI fixture; these are functional baselines, not production targets.

## Container security gate

`npm audit` checks npm dependencies, not Debian packages or the Node image's
bundled npm tooling. CI compares both Dockerfile pins with their current
registry index digests, builds and smokes the final runtime image, and saves a
Trivy OS/library report in `portfolio-quality-evidence`.

The 27 November 2026 local scan of the distroless Node 22 Debian 13 runtime
found 56 reported vulnerabilities: 2 high, 35 medium, 17 low, and 2 unknown.
The two high findings are `CVE-2026-107494` and `CVE-2026-124709` in Debian
`libssl3t64`; Trivy reported no fixed version. CI fails for any new
high/critical finding or when a fixed package becomes available for either of
these two. Review the complete report and refresh the runtime pin when Debian
publishes a fix.
