# News Rover Frontend - AI Agent Guide

## Quick Start

**Build & Run:**

- `npm start` - Start dev server (Vite) at http://127.0.0.1:3000/
- `npm build` - Production build
- `npm lint` - Run ESLint (uses Prettier for formatting)
- `npm test` - Run tests with Vitest
- `npm test:coverage` - Generate coverage report

**Tech Stack:** React 19 + TypeScript + Vite + Redux Toolkit + React Query + Tailwind + SCSS

---

## Architecture Overview

### Project Structure

```
src/
  api/              # HTTP wrapper + request/response transformation
  components/       # Reusable UI components (buttons, cards, modals, etc.)
  constants/        # App-wide constants (API endpoints, defaults)
  contexts/         # React Context providers (localization, themes)
  hooks/            # Custom hooks (useAnimation, useLocalization, useMediaQuery, etc.)
  layout/           # Page shells and layout components
  pages/            # Page components (home, bookmarks, settings, providers)
  queries/          # React Query hooks for data fetching
  store/            # Redux Toolkit slices (settings, bookmarks, addedProviders)
  styles/           # Global SCSS (variables, mixins, themes)
  types/            # TypeScript type definitions
  utils/            # Utility functions and helpers
  assets/           # Fonts and images
  App.tsx           # Root component
  index.tsx         # Bootstrap entry
```

### State Management Layers

1. **Redux** (persistent): User settings, bookmarks, selected providers → synced to localStorage
2. **React Query** (server): News feeds, provider data → managed by TanStack Query cache
3. **React Context** (session): Localization, themes
4. **Component State** (local): UI interactions, animations, form inputs

---

## Code Conventions

### Naming Patterns

| Pattern   | Usage                       | Example                                          |
| --------- | --------------------------- | ------------------------------------------------ |
| `T*`      | Type definitions            | `TProvider`, `TNewsItem`, `TViewMode`            |
| `E*`      | Enums                       | `ETheme`, `EViewMode`, `EIcon`                   |
| `I*`      | Interfaces                  | `IProps`, `INewsCardProps`                       |
| `do*`     | Redux actions               | `doAddBookmark`, `doUpdateSettings`              |
| `select*` | Redux selectors             | `selectBookmarks`, `selectProviderById(id)`      |
| `use*`    | Custom hooks or React Query | `useBreakpoints`, `useAnimations`, `useNewsData` |
| `*Data`   | React Query hook            | `useNewsData`, `useProvidersData`                |

### Imports & Aliases

Use path aliases from `tsconfig.json`:

```typescript
// ✓ Correct
import { Button } from '@components/ui/button';
import { useBreakpoints } from '@hooks';
import { getClassName } from '@utils/get-class-name';
import styles from '~styles/_variables.scss';

// ✗ Avoid
import { Button } from '../../components/ui/button';
```

### File Naming

- Components: `kebab-case/` folders with `kebab-case.tsx` files
- Types: `component.types.ts` for complex type definitions
- Styles: `component.styles.scss` for scoped styles
- Utils: kebab-case filenames
- Barrel exports: Always include `index.ts` in folders

---

## Design Patterns

### Redux (Persistent State)

```typescript
// 1. Define slice in src/store/slices/*.ts
import { createSlice } from '@reduxjs/toolkit';
// 2. Use typed hooks in components
import { useAppDispatch, useAppSelector } from '@store/hooks';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: { theme: 'light', locale: 'en-us' },
  reducers: {
    doUpdateTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

const MyComponent = () => {
  const theme = useAppSelector((state) => state.settings.theme);
  const dispatch = useAppDispatch();

  const handleThemeChange = () => {
    dispatch(doUpdateTheme('dark'));
  };
};

// 3. Auto-synced to localStorage via store subscription
```

### React Query (Server State)

```typescript
// 1. Define in src/queries/_*.ts
export const useNewsData = (params?: TFetchParams) => {
  return useQuery({
    queryKey: ['fetch-news', params],
    queryFn: () => fetchNews(params),
    // Default: retry 3 times, staleTime 5min, cacheTime 10min
  });
};

// 2. Use in components with error/loading handling
const { data, isLoading, error } = useNewsData({ provider: 'bbc' });

if (isLoading) return <CardListSkeleton />;
if (error) return <ErrorState />;
if (!data?.length) return <EmptyState />;

return <CardList data={data} />;
```

### Custom Hooks (Generic + Composable)

```typescript
// Example: useMediaQuery (generic media query hook)
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    mq.addEventListener('change', (e) => setMatches(e.matches));
  }, [query]);

  return matches;
};

// Example: useDraggableList (generic with TypeScript generics)
export const useDraggableList = <T extends { id: string | number }>(
  items: T[],
  onReorder: (newItems: T[]) => void,
) => {
  /* ... */
};
```

### Component Structure

```typescript
// src/components/news-card/news-card.tsx
import { INewsCardProps } from './news-card.types';
import styles from './news-card.styles.scss';

export const NewsCard: React.FC<INewsCardProps> = ({
  title,
  description,
  imageUrl,
}) => (
  <div className={styles.newsCard}>
    <h3>{title}</h3>
    {description && <p>{description}</p>}
    {imageUrl && <img src={imageUrl} alt={title} />}
  </div>
);

export default NewsCard;
```

### Styling (Tailwind + SCSS)

```typescript
// Primary: Tailwind utilities for spacing, colors, typography
<div className="p-4 bg-slate-100 text-lg font-semibold">
  Tailwind styling
</div>

// Scoped: SCSS modules for component-specific styles
// src/components/card/card.styles.scss
.card {
  &--elevated { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); }
  &__title { font-size: var(--font-size-large); }
}

// Use getClassName() utility for BEM-style classes
import { getClassName } from '@utils/get-class-name';
const classes = getClassName('card', { elevated: true });
// Result: 'card card--elevated'
```

### Localization (i18n)

```typescript
// 1. Define in public/locales/{en-us,de-de,uk}.json
{ "app.title": "News Rover", "app.search": "Search..." }

// 2. Use context hook
const { t } = useLocalization();
<h1>{t('app.title')}</h1>

// 3. Change locale via dispatch
dispatch(doUpdateLocale('de-de'));
```

---

## Testing Patterns

### Test Structure (Vitest + Testing Library)

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NewsCard } from './news-card';

describe('(Component) NewsCard', () => {
  it('should render title and description', () => {
    render(
      <NewsCard
        title="Breaking News"
        description="Latest updates..."
        imageUrl=""
      />
    );

    expect(screen.getByText('Breaking News')).toBeInTheDocument();
    expect(screen.getByText('Latest updates...')).toBeInTheDocument();
  });

  it('should not render image when imageUrl is empty', () => {
    render(<NewsCard title="News" description="" imageUrl="" />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('should render image when imageUrl is provided', () => {
    render(
      <NewsCard
        title="News"
        description=""
        imageUrl="https://example.com/img.jpg"
      />
    );
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://example.com/img.jpg'
    );
  });
});
```

### Testing Hooks (useBreakpoints example)

```typescript
import { renderHook } from '@testing-library/react';

import { useBreakpoints } from './use-breakpoints';

describe('(Hook) useBreakpoints', () => {
  it('should return correct breakpoint state', () => {
    const { result } = renderHook(() => useBreakpoints());
    expect(result.current).toHaveProperty('isMobile');
    expect(result.current).toHaveProperty('isTablet');
  });
});
```

---

## Workflow Guides

### Adding a New Feature

1. **Create component structure:**

   ```
   src/components/my-feature/
   ├── my-feature.tsx
   ├── my-feature.types.ts
   ├── my-feature.styles.scss
   ├── my-feature.test.tsx
   └── index.ts
   ```

2. **Update Redux if needed:**

   - Add slice in `src/store/slices/my-feature.ts`
   - Export actions & selectors
   - Update `src/store/index.ts`

3. **Add tests:** Write tests for components and hooks before implementation

4. **Lint & format:** `npm lint` (auto-fixes formatting issues)

### Updating Redux State

1. Define action in slice: `doUpdateSettings: (state, action) => { state.theme = action.payload; }`
2. Dispatch from component: `dispatch(doUpdateSettings('dark'))`
3. Selector auto-syncs to localStorage via store subscription

### Fetching Data

1. Create query hook in `src/queries/_*.ts` using React Query
2. Handle loading/error/empty states in component
3. Use `queryKey` pattern for cache invalidation: `['fetch-*', ...params]`

### Styling Components

- Use Tailwind for layout, spacing, typography, colors
- Use SCSS module for complex/scoped styles
- Keep component-level styles in `component.styles.scss`
- Use variables from `~styles/_variables.scss` for theme values

---

## Common Pitfalls & Solutions

| Pitfall                                       | Impact                         | Solution                                                       |
| --------------------------------------------- | ------------------------------ | -------------------------------------------------------------- |
| Redux state saves on every dispatch           | localStorage thrashing         | Use batch() from Redux, or accept frequent writes (status quo) |
| React Query retries 3x by default             | Slow UX on network errors      | Pass `retry: 0` to `useQuery()` if immediate feedback needed   |
| Media queries in hooks ≠ Tailwind breakpoints | Mismatched responsive behavior | Align custom breakpoints with Tailwind config                  |
| Missing path alias in import                  | Build fails silently in dev    | Use `@components`, `@hooks`, etc. from `tsconfig.json`         |
| Type imports not tree-shaken                  | Larger bundle                  | Use `import type { Type }` for type-only imports               |
| Forgetting `default export` on components     | Import fails for barrel        | Always export component as default; named exports for helpers  |
| Locale not persisted on page reload           | UX regression                  | Redux slice handles persistence, no extra work needed          |
| Incomplete `setupTests.ts` imports            | Tests fail silently            | Ensure `@testing-library/jest-dom` is imported                 |

---

## Code Style & Linting

- **Formatter:** Prettier (auto-run with ESLint)
- **Rules:** ESLint + TypeScript ESLint + React plugin
- **TypeScript:** Strict mode enabled (`strict: true`)
- **React:** Version detection automatic (React 19)
- **Run:** `npm lint` to check and auto-fix style issues

---

## Debugging Tips

- Check Redux state: `useAppSelector(state => state)` in console
- Monitor React Query cache: `useQueryClient().getQueryData(['fetch-*'])`
- Test media queries: Use browser DevTools → Ctrl+Shift+M (toggle device mode)
- Check localization: Switch locale via Redux action, verify JSON in Network tab
- View theme: Inspect `<html data-theme="light|dark">` attribute

---

## Useful References

- [README.md](README.md) - Project overview and installation
- [Vite Docs](https://vitejs.dev/) - Build tool
- [React 19 Docs](https://react.dev/) - Latest React features
- [Redux Toolkit Docs](https://redux-toolkit.js.org/) - State management
- [React Query Docs](https://tanstack.com/query/latest) - Server state
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Type system
- [Vitest Docs](https://vitest.dev/) - Test runner
