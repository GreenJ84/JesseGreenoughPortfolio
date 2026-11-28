# Application architecture

The public portfolio uses the Next.js App Router for Home, About, Skills, Projects, Education, Work, and Resumes. Home and About contain authored profile content. The resource pages read MongoDB through server-side services and paginated API routes. An empty collection displays an empty list; there is no hardcoded resource fallback.

`src/app/_lib/_types.ts` defines shared fields and resource-specific models. The app reads the singular `project`, `certification`, `education`, `work`, `resume`, and `skill` collections. Skills are records with category, rating, icon key, order, and visibility. The icon registry is presentation code. Public read services cache selected queries and invalidate cache tags after owner writes.

The configured `ADMIN_USERNAME` is the only administrator. `/admin` contains the dashboard, resource editors, analytics, and passkey settings. Server actions and protected pages check an active MongoDB session before data access. Resource editors support date fields, category and technology suggestions, validated JSON import, and Cloudinary media selection and upload. The media API uses `CLOUDINARY_CLOUD_NAME` to restrict uploads and returned URLs to the configured tenant.

Visit metrics count page views, not unique visitors. Health and alert records support operational checks. GitHub Actions uses synthetic MongoDB records for application, browser, security, performance, and container checks. Production data migration is an explicit operator command in `migration/migrate-portfolio.cjs`; application startup and CI never run it.
