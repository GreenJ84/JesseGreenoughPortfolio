# Skills persistence plan

Historical design note. Skills are now persisted, and the manual migration
seeds the recovered 58 records from `migration/historical-skills.json`. Follow
[the current procedure](DEVELOPMENT_DATA.md) for local and production copies.

## Current shape

`skillData.ts` contains eight ordered groups of skills. Each item stores a name, a 1–5 rating, and a React icon component. The Home skills carousel reads the language group directly. The Skills page reads every group and passes the component to `TechnicalSkill`. Skills have no collection, shared database type, validation, admin editor, or cache invalidation yet.

## Data contract

- Add a `skills` collection identifier to `DB_INFO.collections` and a `SkillType` in `_lib/_types.ts`, alongside the other portfolio resources.
- Store one document per skill: `id`, `category` (one of the eight existing keys), `name`, `rating` (integer 1–5), `iconKey`, `sortOrder`, and `visible`. Use a stable `iconKey` string, not a React component, in MongoDB.
- Keep a client-safe allowlisted `iconKey -> component` registry. Unknown keys render a generic icon. Preserve each current icon during import.
- Enforce a unique normalized `category + name` pair, with an index; validate category, rating, key, name length, and sort order at the server boundary.

## Migration and public reads

1. Add an idempotent, explicit seed script that converts every entry in `skillData.ts` into the new document shape. Preserve current group order and item order. The script must target the configured development database by default and require an explicit production target.
2. Add public read service functions for visible skills, ordered by group and `sortOrder`. Cache the result with a skills tag and revalidate on every owner write.
3. Change Home skills and the Skills page to consume the same public DTO. Keep the existing scale legend and meter semantics. Preserve the Home exclusions for Java, Solidity, and Markdown unless the owner changes the carousel policy.
4. After the seed and public reads are verified, remove the static data dependency. Keep the icon registry as code; it is presentation logic, not content.

## Owner CRUD

1. Add a Skills card to `/admin/data` and an owner-gated `/admin/data/skills` listing with create, edit, delete, visibility, group, and order controls consistent with the other resource editors.
2. Validate every mutation on the server and call `requireAdmin()` before collection access. Record create, update, and delete audit events. Invalidate the public skills cache and revalidate Home and Skills.
3. Use a rating control with the existing 1/5–5/5 descriptions and an icon picker backed by the allowlisted registry. Show the public rendering in the editor preview.
4. Confirm deletion and prevent accidental duplicates. Keep admin list reads uncached so edits appear immediately.

## Verification and release

- Test seed idempotence and preservation of all current skills, rating bounds, icon key handling, owner-only mutations, cache invalidation, and public visibility/order.
- Check Home carousel and Skills page against the current content on desktop and mobile, including keyboard and reduced-motion behavior.
- Seed a development copy, review the record counts and ordering, then perform the production seed in a controlled release before switching public reads.
