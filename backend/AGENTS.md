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

- See [README.md](README.md) for environment variable names (`GOOGLE_SPREADSHEET_ID`, `GOOGLE_SERVICE_EMAIL`, `GOOGLE_PRIVATE_KEY`).

Project shape (important paths)

- Main app: [src/app.ts](src/app.ts#L1)
- RSS parsing: [src/parse.ts](src/parse.ts#L1)
- Core utilities: [src/common/utils.ts](src/common/utils.ts#L1)
- Controllers: [src/controllers](src/controllers)
- Routes: [src/routes](src/routes)
- Google Sheets service: [src/services/db.ts](src/services/db.ts#L1)
- API docs (OpenAPI): [src/docs/swaggerDef.ts](src/docs/swaggerDef.ts#L1)

Conventions & notes for agents

- Project uses TypeScript + native ESM. Scripts use `node --experimental-strip-types` to run TS files directly.
- Tests live alongside source under `src/**/*.test.ts` and are run with Node's test runner.
- Prefer making small, test-covered changes. Run `npm test` and `npm run typecheck` before proposing large refactors.
- When editing routes or controllers, update corresponding OpenAPI YAML files under `src/docs/components/paths` and `src/docs/components/schemas`.
- Persisted provider data is read from a Google Spreadsheet via the service account env vars — avoid requesting real secrets.

Agent workflow suggestions (recommended)

- When asked to implement an API change: run unit tests, add/adjust a `*.test.ts`, run `npm run typecheck`, update OpenAPI docs if the surface changes.
- When asked to debug runtime errors: reproduce locally with `npm run dev`, capture stack traces, add focused unit tests.

Next customizations to consider

- `create-skill:run-tests` — a small skill that runs `npm test`, `npm run typecheck`, and reports failures.
- `create-instruction:backend` — a trimmed `.github/copilot-instructions.md` focusing on backend work and deployment notes.

If you want, I can also add a `.github/copilot-instructions.md` with a short checklist for PRs and test expectations.
