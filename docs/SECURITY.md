# Security configuration

## Required environment

Start with the tracked [`.env-template`](../.env-template) for local development.
Next.js loads project-root environment files; deployment values belong in the
hosting platform's secrets or environment manager. Keep credentials out of
source control. The application uses these variable names:

| Variable | Requirement |
| --- | --- |
| `JWT_SECRET` | Random signing secret of at least 32 bytes; generate with a cryptographic random generator. |
| `ADMIN_USERNAME` | Nonempty administrator username, at most 200 characters. |
| `ADMIN_PASSWORD` | Unique password of 16–1024 characters. |
| `DB_CONN_STRING` | Required in production. Development retains the local MongoDB fallback. |
| `USER_EMAIL` | Single Gmail sender address. |
| `USER_PASS` | Gmail application password. |
| `CONTACT_EMAIL` | Single recipient address for contact messages. |
| `TRUSTED_CLIENT_IP_HEADER` | Optional. See trusted proxy configuration below. |

Missing/short authentication credentials fail when the authentication module loads.
Mail configuration is checked on send; failures return a generic service-unavailable
response. No credential values or provider error messages are returned to callers.

## Sessions and authorization

Admin cookies remain HTTP-only, same-site strict, and secure in production. Sessions
expire after one hour. Tokens require HS256, the configured admin identity and role,
a session ID, issuance/expiration times, and the application's issuer and audience.
Old tokens from before this change are invalid; log in again after deployment.
Once a passkey is enrolled, password-only sign-in is disabled for the owner.

Each mutation and full admin-list action checks the active MongoDB session before
performing data operations. Authorization is never cached. Dashboard/data page
boundaries also check the session. Middleware is only a signed-token navigation
check; revocation is enforced at the server action/page boundary.

Logout deletes the session before clearing the cookie. A copied token cannot be
reused after a successful logout. If session storage is unavailable, logout displays
an error rather than claiming the session was revoked. Rotating `JWT_SECRET`
invalidates all existing tokens. Password credentials remain a bootstrap gate for
passkey sign-in; recovery and a second passkey need an operational drill.

## Shared storage and rate limits

Two dedicated MongoDB collections are created on first use: `adminSessions` and
`securityRateLimits`. The database account needs read/write and create-index
permissions for these collections. Each has a TTL index on `expiresAt`. The built-in
unique `_id` index enforces atomic counters/session identity. Index creation is
idempotent and happens on first security operation, never on database import.

Expiration is checked in queries/window keys; correctness does not depend on when
MongoDB's background TTL cleanup runs. Rate-limit storage failures reject the
operation. Counters store SHA-256 identities rather than raw email/IP strings;
these hashes are pseudonymous and must still be treated as private data.

| Operation | Aggregate limit | Additional limit |
| --- | --- | --- |
| Login, successful or failed | 30 attempts per 15-minute window | 5 per trusted client IP per 15 minutes |
| Contact | 20 requests per hour | 3 per sender and 3 per trusted client IP per 15 minutes |

Limits use fixed windows, so traffic immediately around a boundary can consume
both adjacent windows. Malformed attempts count toward aggregate limits. Contact
responses include `Retry-After` on HTTP 429. Aggregate and sender limits work without
client-IP configuration and across application processes/instances.

### Trusted proxy configuration

By default, **no forwarded IP header is trusted**. To enable per-client limits,
set `TRUSTED_CLIENT_IP_HEADER` only to a header that your ingress overwrites with
one validated IP address. The deployment must prevent requests from reaching the
application outside that ingress. Do not enable a header that callers can supply.
Comma-separated proxy chains and malformed addresses are ignored; aggregate limits
still apply. Verify this behavior against your hosting provider before enabling it.

## Input and contact protections

Mutation inputs are reconstructed from allowlisted fields. IDs must be 24 hexadecimal
characters; priorities, dates, strings, arrays, categories, and URLs are checked at
runtime. URLs are restricted to HTTP(S), plus root-relative image paths. Pagination
is limited to integer offsets from 0 through 10000. Invalid query parameters return
400, while unexpected data-service failures return a generic 500.

Contact accepts JSON only, with a streamed 16000-byte limit, a 5000-character
message limit, bounded single-line name/subject fields, and one sender address.
Cross-origin browser requests are rejected. A hidden honeypot suppresses obvious
spam. Mail is plain text with `replyTo`, no file/URL access, and bounded SMTP timeouts.
Only SMTP acceptance produces a normal success response; failures produce a generic
503. The UI prevents duplicate submission and displays success/failure status.

## Verification

`npm test` exercises actual TypeScript modules with isolated MongoDB, HTTP framework,
and SMTP boundaries. JWT tests use the real JOSE implementation. Tests cover
unauthorized mutations and admin reads, bad claims/signatures, logout replay,
validation and query errors, atomic limiter behavior, bounded bodies, and delivery
failure handling. Live deployment/database/SMTP smoke tests remain separate; these
checks send no email and require no running database.

Implementation references: [Next.js 14 Server Actions](https://nextjs.org/docs/14/app/building-your-application/data-fetching/server-actions-and-mutations)
and [MongoDB TTL indexes](https://www.mongodb.com/docs/manual/core/index-ttl/).

## Response and image configuration

Pages and APIs receive a CSP, framing denial, content-type protection, a conservative
referrer policy, disabled camera/microphone/geolocation/payment permissions, and
production HSTS. API responses no longer advertise wildcard credentialed CORS;
same-origin application requests continue to work. Browser source maps and the
framework identification header are disabled.

The per-request nonce CSP permits the existing GitHub calendar API and Vercel
measurement endpoints. Development alone permits eval and websocket reloads.
`unsafe-inline` is absent; the nonce policy requires dynamic page rendering.
External HTTPS images remain allowed in browser markup for the existing stats cards.

The optimizer accepts HTTPS on the existing image hosts, with Cloudinary restricted
to the `portfolio-g84` tenant and no query string. Other legacy hosts retain their
path/query flexibility until stored image URLs can be inventoried. The SVG stats
service is used by plain image tags and is no longer an optimizer origin. SVG
optimization and local-IP fetching are disabled; optimized responses use attachment
disposition and a sandboxed CSP. Local optimization is limited to `/assets`,
`/projectImages`, and compiled static media, with no query strings. This does not
move the existing legacy `src/public` directory; static-asset cleanup remains separate.

`npm run test:config` verifies the response and image contracts using the installed
Next.js URL matchers. Consult the [Next.js CSP guide](https://nextjs.org/docs/app/guides/content-security-policy)
and [image configuration reference](https://nextjs.org/docs/app/api-reference/components/image).
