/_
Purpose: concise, project-specific guidance for AI coding agents (Copilot/assistants).
_/

# Project Overview

-   Framework: Next.js (App Router, `app/` directory). Main layout: `app/layout.tsx`.
-   UI: Tailwind CSS + DaisyUI; utility class merging uses `cn()` from `app/lib/utils.ts` (wraps `clsx` + `tailwind-merge`).
-   The Todo feature is composed of small sections under `app/components/sections/` (example: `TodoForm.tsx`, `TodoList.tsx`, `Theme.tsx`).
-   Hooks are colocated in `app/hooks/` and implement business logic + persistence: `useLocalStorage.js`, `useTodos.ts`, `useUserLocale.ts`.

# Big-picture architecture & data flow

-   The main Todo container (assembled from `sections/*`) obtains persistent state via `useLocalStorage('todo', [])` (client-side only) which returns `[todos, setTodos]`.
-   Business operations (create, delete, toggle, edit) are implemented in `app/hooks/useTodos.ts` and are invoked by UI components (e.g. `TodoForm.tsx`, `TodoList.tsx`).
-   Filtering and sorting are handled in `app/lib/filters.js` and configured via `app/lib/filterConfig.js` (use Intl.Collator for locale-aware sorting; `useUserLocale` provides locale hints).

# Important developer workflows

-   Start dev server: `npm run dev` (uses Next v16 App Router). Build: `npm run build`. Lint: `npm run lint`.
-   When changing client components that use browser APIs (localStorage, geolocation), ensure files have `"use client"` and guard access (e.g. `if (typeof window === 'undefined') return;`).
-   The project mixes TypeScript (`.ts/.tsx`) and plain JS (`.js`) for hooks and small utils — keep file extensions consistent with neighboring files when adding new modules.

# Project-specific conventions & patterns

-   File locations:
    -   Reusable UI: `app/components/` and subfolders like `sections/` for page-specific composition.
    -   Hooks: `app/hooks/` (client-only hooks live here, e.g. `useLocalStorage.js`).
    -   Utilities: `app/lib/` (filters, configs, utils).
-   Styling: prefer `cn(...)` to merge Tailwind classes; avoid duplicating semantic classnames — the repo relies on custom utility class strings like `container level-1 glass`.
-   Localization: `useUserLocale.ts` may return `nb` for Norwegian if geolocation indicates Norway. When sorting or formatting, pass this locale into `sortArray(array, sortOrder, locale)`.
-   Persistence: `useLocalStorage.js` returns tuple [value, setValue]; it JSON serializes arrays and guards server rendering.

# Integration points & external dependencies

-   `next-themes` used in `app/layout.tsx` (`ThemeProvider` + `class` attribute) — toggling theme should respect the library and DaisyUI theme classes.
-   Fonts loaded with `next/font/google` in `app/layout.tsx` — avoid replacing with other font loaders without checking Next v16 compatibility.
-   Key dependencies to be mindful of: `next@16`, `react@19`, `tailwindcss@4`, `daisyui`, `next-themes`, `clsx`, `tailwind-merge`.

# Safe editing rules for AI agents

-   Do not mutate `app/layout.tsx` unless adjusting global theming or fonts; changes there affect the entire app.
-   For UI changes, prefer adding/modifying `app/components/sections/*` and `app/components/*` files.
-   When adding stateful logic that uses browser APIs, place it under `app/hooks/` and mark caller components with `"use client"`.
-   Preserve usage of `cn()` for class composition. When adding new class strings, prefer existing project tokens (e.g. `glass`, `container level-2`) to keep visual consistency.

# Examples to reference while coding

-   Add a new todo: call `addTask(text)` from `useTodos.ts` and persist via `setTodos` coming from `useLocalStorage('todo', [])` (see `app/hooks/useTodos.ts`).
-   Filter + sort pipeline: `sortArray(toggleFilters(todos, filter), sortOrder, userLocale)` (see `app/lib/filters.js` and `app/lib/filterConfig.js`).
-   Guard localStorage: `if (typeof window === 'undefined') return defaultValue` (see `app/hooks/useLocalStorage.js`).

# When unsure / debugging tips

-   Start dev server and watch console for Next/Turbopack hints: `npm run dev`.
-   If type errors occur, check mixed `.js` and `.ts` imports — prefer explicit extension when necessary (the codebase uses `@/app/lib/filterConfig.js` imports).
-   If CSS classes behave unexpectedly, confirm `cn()` is used and `tailwind-merge` is not removing desired variants.

# Final notes

-   There is no existing `.github/copilot-instructions.md` to merge with; this file should be kept short and updated when project structure changes.
-   If you want, I can expand this into a longer `AGENT.md` that includes step-by-step reproduction steps, common pitfalls, and a minimal dev checklist.
-   Do not make estimations or do guesswork.
-   ClassNames should be written using the cn component -> className={cn()}
-   cn() should be formatted as this: cn({some_styling},"",""). the cn should allways havethose two empty strings (,"","") at the end of it, that makes it easier for me to work with.
-   Do not use var when writing tailwind, "top-[var(--popover-top)]" should be "top-(--popover-top)".
-   Do not use [] when writing tailwind, "z-[9999]" should be "z-9999"
-   Always prefer tailwind before any other styling.
-   CSS should almost never be used, but if it does get used, is should only be in global.css
