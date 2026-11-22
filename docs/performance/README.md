# Phase 5: performance results

The production comparison uses three cold Chrome loads per route/profile. Raw samples and complete conditions are preserved in [before.json](before.json) and [after.json](after.json); bundle summaries are in [bundles-before.json](bundles-before.json) and [bundles-after.json](bundles-after.json).

## Measured results

| Profile / route | Script transfer, bytes | LCP, ms | Startup main-thread work, ms | Idle work / 3 seconds, ms | Interaction proxy, ms |
| --- | ---: | ---: | ---: | ---: | ---: |
| mobile / | 874,344 → 265,830 | 3,412 → 916 | 1,956 → 639 | 364 → 205 | 80 → 48 |
| mobile /skills | 866,479 → 265,830 | 628 → 620 | 2,028 → 626 | 273 → 107 | 80 → 56 |
| desktop / | 874,344 → 265,830 | 380 → 364 | 642 → 362 | 621 → 453 | 64 → 64 |
| desktop /skills | 866,479 → 265,830 | 48 → 88 | 592 → 293 | 638 → 406 | 56 → 48 |

Values are medians. All-route generated JavaScript fell from 7,520,575 to 1,345,112 parsed bytes (82.1% smaller); the sum of individually gzipped assets fell from 1,774,600 to 430,191 bytes (75.8% smaller). These all-route totals differ from browser route transfer.

All 12 optimized browser samples had no page exceptions. Every baseline home sample had a React hydration mismatch traced in development to the GitHub calendar. Home improvements therefore include removing recovery work, alongside the bundle changes. Mobile skills LCP was similar (628 → 620 ms); desktop skills LCP rose from 48 to 88 ms in these small lab samples. Desktop home interaction timing was unchanged. Home loads another 9,916 script bytes when activity is approached, rather than on initial load.

## Implemented changes

- Replace dynamic icon-family imports with direct named imports so unused SVG definitions can be removed.
- Replace the full particle bundle with compatible slim features; import after page load plus 1.5 seconds, cap counts at 18/48, disable click growth and retina scaling, and use lower frame budgets. Reduced motion and Save-Data skip imports; preference changes remove the animation. Preserve a static gradient and tolerate decorative loading failures.
- Load activity only within 200px of its reserved region, keep the browser-dependent calendar client-only, lazily decode stats images with dimensions, and coalesce resize updates.
- Fetch featured projects inside a Suspense child. Home remains statically built; this isolates data waiting during streaming/regeneration, rather than claiming a static-page TTFB improvement.
- Split the contact button from the form; load form/Axios only when opened. Preserve failure drafts and duplicate-submit protection.
- Preload the hero portrait using the Next 16 prop; lazily load project cards and declare image sizes matching CSS.

## Reproduce and verify

Use Node 22.23.5 and the pinned dependencies. Start an isolated local Mongo fixture, set the required database/auth environment variables, then run `npm run analyze`. Serve the built production app on port 3150; do not use the development server for comparative timing.

```sh
npm run perf:bundles
PERF_OUTPUT=/tmp/portfolio-comparison.json npm run perf:browser
node scripts/check-performance.cjs
npm test
npm run typecheck
npm run lint
npm audit
```

The browser correctness checks use installed Chrome, mock the mail endpoint (no mail is sent), verify failure draft retention, check normal/reduced-motion/Save-Data animation behavior, and verify activity resources wait for viewport proximity. Set `PERF_BASE_URL` for another local fixture server.

Validation for this phase: production analyzer build, 45 regression tests, TypeScript and lint passed; dependency audit reported zero vulnerabilities. Build/type checks used the working tree, including the eight pre-existing user-owned pending files. Those files were preserved byte-for-byte and excluded from phase 5 commits; this does not establish a clean-checkout build independent of that pending work.

## Interpretation and follow-up

- These are local lab results, not field Core Web Vitals or production INP. Mobile uses 4× CPU slowdown and 1.6 Mbps / 150ms networking; desktop is unthrottled. Images/calendar/stats use fixed responses. Three samples are directional evidence, not statistical guarantees.
- Script transfer is captured through load + 5.5 seconds, including normal framework prefetch and delayed particle imports. Startup main-thread work ends at load + 2.5 seconds. Idle work covers the next three seconds. Neither metric is a critical-path-only measure.
- The baseline harness scrolled the outer window, which did not exercise the nested home scroll container. The final harness explicitly approaches the activity section, and the separate correctness check verifies its requests. Post-scroll transfer is therefore not a like-for-like baseline comparison; initial transfer and timing windows are unchanged.
- Image fixtures deliberately remove CDN variation; validate actual responsive image payloads, visual layout and cache behavior in staging. CLS is not measured by this harness.
- After deployment, review existing Speed Insights field data by route/device for LCP and INP. Recheck bundle transfer with this harness after dependency or component-loading changes; avoid concurrent builds while timing. Investigate regressions before adding more performance work.
