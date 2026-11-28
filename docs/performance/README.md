# Performance characteristics

The site prioritizes the hero image and defers project images, the contact form, activity charts, and ambient animation until needed. Named icon imports limit unused icon code. Reduced-motion and Save-Data preferences reduce or skip decorative animation.

The recorded Chrome comparison used three cold loads per route and device profile. Raw conditions and samples are in [before.json](before.json) and [after.json](after.json); generated bundle summaries are in [bundles-before.json](bundles-before.json) and [bundles-after.json](bundles-after.json).

| Profile / route | Script transfer, bytes | LCP, ms | Startup main-thread work, ms | Idle work / 3 seconds, ms | Interaction proxy, ms |
| --- | ---: | ---: | ---: | ---: | ---: |
| Mobile / | 874,344 → 265,830 | 3,412 → 916 | 1,956 → 639 | 364 → 205 | 80 → 48 |
| Mobile /skills | 866,479 → 265,830 | 628 → 620 | 2,028 → 626 | 273 → 107 | 80 → 56 |
| Desktop / | 874,344 → 265,830 | 380 → 364 | 642 → 362 | 621 → 453 | 64 → 64 |
| Desktop /skills | 866,479 → 265,830 | 48 → 88 | 592 → 293 | 638 → 406 | 56 → 48 |

Values are medians. All-route generated JavaScript fell from 7,520,575 to 1,345,112 parsed bytes; the sum of individually gzipped assets fell from 1,774,600 to 430,191 bytes. Generated totals differ from a single route's transferred bytes.

These are controlled local measurements, not current field Core Web Vitals. Mobile used 4× CPU slowdown and 1.6 Mbps / 150 ms networking; external images and activity services used fixed responses. Three samples are directional evidence. The interaction proxy is not field INP. Baseline Home samples included a GitHub calendar hydration mismatch, so the Home improvement includes removing that recovery work. Desktop Skills LCP rose from 48 to 88 ms in this small sample.

Current CI records route and query measurements against synthetic data in `portfolio-quality-evidence`. Production Speed Insights provides field LCP and INP after deployment.
