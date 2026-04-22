# News Rover — Agent Instructions

News Rover is a personal RSS news aggregator. Users pick providers (news sources) stored in a Google Spreadsheet; the backend fetches/parses their RSS feeds; the frontend displays articles with bookmarking, themes, localization, and draggable provider ordering.

## Repository layout

```
backend/             Express REST API → deployed as a Vercel serverless function
frontend/            React SPA → deployed on Netlify
integration-tests/   Playwright E2E tests
```

## Commands

### Backend (`cd backend`)
| Purpose | Command |
|---|---|
| Dev server (watch) | `npm run dev` |
| Type-check | `npm run typecheck` |
| Lint | `npm run lint` |
| Unit tests | `npm test` |

> **No build step.** Node runs TypeScript directly via `--experimental-strip-types`.

### Frontend (`cd frontend`)
| Purpose | Command |
|---|---|
| Dev server (port 3000) | `npm start` |
| Production build → `build/` | `npm run build` |
| Type-check | `npx tsc --noEmit` |
| Lint | `npm run lint` |
| Unit tests | `npm test` |
| Unit tests with coverage | `npm run test:coverage` |
| Storybook | `npm run storybook` |

### Integration tests (`cd integration-tests`)
| Purpose | Command |
|---|---|
| All tests | `npm test` |
| Smoke tests only | `npm run test:smoke` |
| Interactive UI | `npm run test:ui` |

> Playwright auto-starts backend and frontend via `webServer` config — no manual servers needed.

## Architecture

### Backend

- **Routes** (`src/routes/`) → **Controllers** (`src/controllers/`) → **Services** (`src/services/db.ts`)
- Controllers use factory functions for dependency injection and testability:
  ```ts
  export function createCategoriesController(deps: CategoriesDeps) { ... }
  ```
- **Data layer**: Google Sheets API v4 (`services/db.ts`). All providers live in one sheet; categories are *derived* from providers (not stored separately). In-memory cache with `CACHE_DURATION_MINUTES` TTL (default 5 min).
- **RSS parsing**: `src/parse.ts` — supports RSS (`rss.channel`) and Atom (`feed`) formats, normalises dates including Ukrainian/Russian month names.
- See [backend/README.md](backend/README.md) for API endpoint reference.

### Frontend

Provider stack (outer → inner): `<Provider store>` → `<QueryClientProvider>` → `<LocalizationProvider>` → `<BrowserRouter>` → `<App />`

| Concern | Location | Notes |
|---|---|---|
| Routes | `src/App.tsx` | `/`, `/bookmarks`, `/providers`, `/settings`; unknown paths redirect to `/` |
| Client state | `src/store/` | Redux Toolkit; 3 slices: `settings`, `addedProviders`, `bookmarks` |
| Server state | `src/queries/` | react-query v3; naming convention `useXxxData()` |
| Raw API calls | `src/api/index.ts` | Native `fetch()`; validates via `isValidResponse()` |
| Types/enums | `src/types/index.ts` | **All** TypeScript types live here as a single barrel |
| Localization | `src/contexts/localization-context.tsx` | Fetches `/locales/{locale}.json` on locale change |
| Styling | TailwindCSS v4 + SASS | Theme applied as `data-theme` on `<html>` |
| Icons | IcoMoon font | CSS class `icon-*`; values in `EIcon` enum in `@types` |

## Key conventions

### Frontend

- **Always use path aliases** — never relative imports for aliased paths:  
  `@api`, `@components`, `@constants`, `@contexts`, `@hooks`, `@layout`, `@pages`, `@queries`, `@storage`, `@store`, `@types`, `@utils`, `~styles`, `~assets`
- **Redux action creators**: named `doVerbNoun` (e.g., `doAddProvider`, `doUpdateSettings`)
- **Redux selectors**: named `selectXxx`
- **Use typed hooks**: `useAppDispatch()` and `useAppSelector()` — never raw `useDispatch`/`useSelector`
- **react-query hooks**: named `useXxxData()`
- **Slice/query files**: prefixed with `_` (e.g., `_settings.ts`), re-exported via a barrel `index.ts`
- **`localStorage` key**: `"NewsRover"` (the `APP_NAME` constant)
- **Default post limit**: `DEFAULT_POSTS_LIMIT` (frontend) / `DEFAULT_POST_LIMIT` (backend) — both equal `10`

### Backend

- `"verbatimModuleSyntax": true` — use `import type` for type-only imports
- Import TypeScript files with the `.ts` extension (enabled by `allowImportingTsExtensions`)
- Categories are derived from provider data — do not add a separate categories data source

## Testing

### Backend unit tests — Node.js `node:test` (no third-party runner)
```ts
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { createCategoriesController } from './categories.ts';
```
- Mock `Request`/`Response` objects manually — no framework helpers
- Tests co-located with source (`*.test.ts`)

### Frontend unit tests — Vitest + @testing-library/react
```ts
import { vi } from 'vitest'; // describe/it/expect are globals — no import needed
vi.mock('@constants', () => ({ DEFAULT_POSTS_LIMIT: 10 }));
```
- `globals: true` — `describe`, `it`, `expect`, etc. are auto-imported
- `environment: 'jsdom'`; setup file: `src/setupTests.ts` (`@testing-library/jest-dom`)
- Mock modules via `vi.mock(alias, factory)` using path aliases
- Tests co-located with source (`*.test.ts` / `*.test.tsx`)

### Integration tests — Playwright (Chromium only)
- Clear `localStorage` in each test via `page.addInitScript(() => localStorage.clear())`
- Prefer `getByRole` / `getByText` locators

## Environment variables

**Backend** (required unless noted):
| Variable | Notes |
|---|---|
| `GOOGLE_SPREADSHEET_ID` | ID of the Google Sheet containing providers |
| `GOOGLE_SERVICE_EMAIL` | Service account email |
| `GOOGLE_PRIVATE_KEY` | Service account key (`\n` are replaced with real newlines at runtime) |
| `CACHE_DURATION_MINUTES` | Optional; default `5` |
| `PORT` | Optional; default `4000` |

**Frontend** (set in `.env`):
| Variable | Notes |
|---|---|
| `VITE_API_URL` | Backend base URL — **must end with `/`** |
| `VITE_AUTOREFRESH_INTERVALS_MINUTES` | Comma-separated list, e.g. `5,10,15,30,60` |

## Localization

Three locales: `en-US`, `uk`, `de-DE`.  
Dictionary files: `frontend/public/locales/{locale.toLowerCase()}.json`  
Consume in components: `const dic = useLocalization()` → `dic.someKey`  
All keys are typed via `TDic` in `@types`.
