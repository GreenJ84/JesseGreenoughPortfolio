# CI verification

The `Quality and deployment smoke` GitHub Actions workflow runs on pushes, pull requests, and manual dispatch. It uses a disposable MongoDB service seeded with synthetic canonical records. The workflow does not connect to production MongoDB or run the manual migration command.

Checks include `npm ci`, typecheck, lint, unit tests, a production build, standalone route smoke tests, rendered SEO checks, and browser checks at 390, 768, and 1365 px. The browser matrix covers the Home carousel, searchable filters, contact dialog, mobile navigation, themes, reduced motion, focus, screen-reader names, CSP violations, overflow, and a real project image.

Performance reports include LCP, CLS, route JavaScript transfer, an interaction timing proxy, and MongoDB query timings against the disposable fixture. The interaction proxy is not field INP. The workflow also checks pinned container base digests, smokes the final runtime image, and scans OS and library vulnerabilities. Screenshots and reports are uploaded as `portfolio-quality-evidence`.

The workflow obtains the Cloudinary tenant from the current static portrait URL so the image optimizer and container build use the same tenant without duplicating the account name in workflow configuration. Unit tests cover migration transforms and the historical skill seed; running the copy against real data remains a separate operator action.
