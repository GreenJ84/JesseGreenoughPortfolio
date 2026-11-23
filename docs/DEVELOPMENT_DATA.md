# Copy production portfolio content into a local development database

Use a **read-only** Atlas account in `PORTFOLIO_SOURCE_URI`. The script never writes to the source. It copies only the six public content collections; admin sessions, login limits, credentials, and other collections are excluded. The destination must be a loopback MongoDB server without URI credentials. Every copy uses a fresh local database name, so existing local data is never deleted or overwritten.

Inject `PORTFOLIO_SOURCE_URI` through your secret manager or a temporary shell environment before these commands. Preview collection counts first:

```sh
npm run data:preview
```

Then create a copy:

```sh
npm run data:copy
```

The script prints `PORTFOLIO_DB_NAME=PersonalPortfolioDev_...` after a successful copy. Set that environment variable alongside local `DB_CONN_STRING` when running `npm run dev`. It is ignored in production. Never put the source URI in a committed file, command history, CI output, or a browser variable. Prefer a secret manager or a temporary environment file outside the repository. Copying real portfolio data into development also requires appropriate local access and retention controls.

The copy is best-effort across collections, not a transactionally consistent database snapshot. It checks counts during each collection and deletes the *new* local destination if the copy fails. For a point-in-time backup, use database backup tooling and a defined snapshot window. Old schema migration helpers were removed; schema transformation will be designed separately.
