# AGENTS.md — AI coding agent instructions

Purpose

- Help AI agents become productive quickly in this repository by exposing how to run, test, and navigate the codebase.

Quick run & test

- Install: `npm install`
- Start (production): `npm start` (uses Node ESM and `--experimental-strip-types`).
- Start (dev, auto-reload): `npm run dev`.
- Tests: `npm test` (uses Node's built-in test runner over `src/**/*.test.ts`).
- Type check: `npm run typecheck`.
- Lint: `npm run lint`.

Environment

- `DATABASE_URL_UNPOOLED` is required to connect to the Neon PostgreSQL database.

Project shape (important paths)

- Main app: [src/app.ts](src/app.ts#L1)
- RSS parsing: [src/parse.ts](src/parse.ts#L1)
- Core utilities: [src/common/utils.ts](src/common/utils.ts#L1)
- Controllers: [src/controllers](src/controllers)
- Routes: [src/routes](src/routes)
- Drizzle database service: [src/services/db.ts](src/services/db.ts#L1)
- Drizzle schema: [src/db/schema.ts](src/db/schema.ts#L1)
- Database migrations: [drizzle](drizzle)
- API docs (OpenAPI): [src/docs/swaggerDef.ts](src/docs/swaggerDef.ts#L1)

Conventions & notes for agents

- Project uses TypeScript + native ESM. Scripts use `node --experimental-strip-types` to run TS files directly.
- Tests live alongside source under `src/**/*.test.ts` and are run with Node's test runner.
- Prefer making small, test-covered changes. Run `npm test` and `npm run typecheck` before proposing large refactors.
- When editing routes or controllers, update corresponding OpenAPI YAML files under `src/docs/components/paths` and `src/docs/components/schemas`.
- Provider and category data are stored in PostgreSQL and accessed through Drizzle ORM; the Neon serverless connection is initialized in `src/services/db.ts`.
- The Drizzle schema is defined in `src/db/schema.ts`. Providers reference rows in the `provider_category` table; categories are stored data, not derived from providers.
- Do not request or expose database credentials. Use `DATABASE_URL_UNPOOLED` from the environment when a database connection is required.

Agent workflow suggestions (recommended)

- When asked to implement an API change: run unit tests, add/adjust a `*.test.ts`, run `npm run typecheck`, update OpenAPI docs if the surface changes.
- When asked to debug runtime errors: reproduce locally with `npm run dev`, capture stack traces, add focused unit tests.

Next customizations to consider

- `create-skill:run-tests` — a small skill that runs `npm test`, `npm run typecheck`, and reports failures.
- `create-instruction:backend` — a trimmed `.github/copilot-instructions.md` focusing on backend work and deployment notes.

If you want, I can also add a `.github/copilot-instructions.md` with a short checklist for PRs and test expectations.
