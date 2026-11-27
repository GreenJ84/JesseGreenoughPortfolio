# Rust software engineering SEO release check

The current refactor describes Jesse as a Rust-first backend engineer with a
security focus. The public pages have unique titles and descriptions, one
canonical production host, matching Open Graph URLs, a seven-page sitemap, and
a crawl policy that excludes admin and API paths. The About page includes
ProfilePage/Person structured data. Vercel Preview deployments are noindex.
CI checks the rendered production-mode responses with `scripts/check-seo.cjs`.

## Before merging to main

- Confirm the production domain is still
  `https://jesse-greenough-portfolio.vercel.app`. If a custom domain becomes
  primary, change `APP_URL` in `src/app/(portfolio)/sharedMetadata.ts` and the
  `SEO_CANONICAL_ORIGIN` CI expectation together. Redirect the old hostname to
  the new one in Vercel.
- Review the actual production project records. The title and metadata say
  Rust backend engineering, so the visible projects should substantiate that
  claim with working repositories, clear architecture, security decisions,
  and outcomes. Do not add invented projects or skills for search traffic.
- Check the Open Graph portrait URL, real project images, and resume downloads.
  Check page source for one canonical URL, title, description, and social URL.

## After the Vercel deployment

1. Load `/robots.txt` and `/sitemap.xml` on the production domain; confirm
   the sitemap lists only the seven public pages and admin remains excluded.
2. Check Home, About, Skills, Projects, Education, Work, and Resumes on the
   live domain, including their titles, descriptions, and canonical links.
3. Verify the site in Google Search Console, submit `/sitemap.xml`, and use URL
   Inspection on Home, About, and Projects. Monitor indexing errors and search
   queries such as “Rust backend engineer” and “Rust software engineer.”
4. Use Search Console's performance report over time to compare impressions,
   clicks, and the pages that earn them. A sitemap helps discovery but does not
   guarantee indexing or ranking.

The projects page currently offers a filterable list and modals but no stable
project-detail URLs. A follow-on improvement is a genuine Rust project case
study with its own crawlable URL, architecture, threat model or security
choices, tests, outcomes, and links to the repository. That provides more
specific evidence for Rust-focused search queries than additional keywords in
metadata alone.
