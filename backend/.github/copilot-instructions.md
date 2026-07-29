# .github/copilot-instructions.md — PR checklist & agent guidance

Purpose

- Short guidance for AI contributors and Copilot-style agents working on the backend.

Quick commands

- Install deps: `npm install`
- Run dev server: `npm run dev`
- Run tests: `npm test`
- Type check: `npm run typecheck`
- Lint: `npm run lint`

Before opening a PR

- Run `npm test` and ensure new/changed behavior is covered by tests.
- Run `npm run typecheck` and fix any TypeScript errors.
- Run `npm run lint` and resolve lint warnings where reasonable.
- If you change API surface (routes or controller responses), update the matching OpenAPI files under `src/docs/components/paths` and `src/docs/components/schemas`.
- Do not include secrets or private keys. Use env var references and document any required `.env` entries in [README.md](README.md).

Testing guidance

- Prefer focused unit tests in `src/**/*.test.ts` that assert behavior (parsing, normalization, filtering).
- For controller changes, add tests that exercise request/response shape and error cases.

Commit & PR style

- Small, single-purpose commits are preferred. Explain reasoning and mention which tests were added/updated.
- Title: short noun phrase. Body: rationale, test summary, deployment considerations (if any).

When asking an agent for help

- Provide: the failing test or error output, steps to reproduce, and the file(s) you intend to change.
- If the fix requires secrets or API credentials, provide a mocked example and unit tests instead of real keys.

References

- Repository README: [README.md](README.md)
- Agent overview: [AGENTS.md](AGENTS.md)
