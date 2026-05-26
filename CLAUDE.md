# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start Vite dev server
npm run build        # Type-check + production build (tsc -b && vite build)
npm run lint         # ESLint
npm run format       # Prettier + ESLint fix
npm run test         # Vitest (watch mode)
npm run test:ui      # Vitest with browser UI
npm run preview      # Preview production build
```

Run a single test file:

```bash
npx vitest run src/tests/App.test.tsx
```

## Architecture

Single-page portfolio app — no routing. `App.tsx` renders all sections sequentially: `Navbar → Hero → Skills → WorkExperience → Education → Projects → Contact → Footer`.

**Path alias:** `#/` maps to `src/` (configured in `vite.config.ts`).

**Styling:** Tailwind v4 (via `@tailwindcss/vite` plugin) + heavy use of CSS custom properties defined in `src/index.css`. Theme variables (`--bg-color`, `--text-color`, `--accent-*`, `--font-*`, `--grid-*`) drive the dark/light toggle. Light mode is applied via `[data-theme="light"]` on `<html>`. Component styles use semantic class names (e.g. `.timeline-card`, `.section-header`) defined in `index.css`, not inline Tailwind utilities.

**Theme:** `ThemeContext` (`src/context/ThemeContext.tsx`) manages dark/light state, persists to `localStorage`, and responds to system preference changes. `ThemeProvider` wraps the app in `main.tsx`. Components consume it via `useTheme()`.

**Animations:** GSAP + `@gsap/react` (`useGSAP` hook). `ScrollTrigger` is registered globally in each component that uses it. All scroll-driven animations use `{ scope: sectionRef }` for cleanup. The `useGSAP` hook is preferred over raw `useEffect` for GSAP to ensure proper cleanup.

**Content data:** All portfolio content (experiences, education, projects, skills) lives in `src/data/*.ts` as typed arrays. Edit these files to update portfolio content — no component changes needed.

**Contact terminal:** `useTerminal` hook (`src/hooks/useTerminal.ts`) implements a fake CLI in the Contact section. Supported commands: `email`, `github`, `linkedin`, `all`, `clear`, `help`. Contact info is hardcoded in that hook.

**Tests:** Vitest + jsdom + Testing Library. Setup file at `src/tests/setupTests.ts`. Currently minimal coverage (App smoke test + a sum utility test).

**Pre-commit hook:** Husky + lint-staged runs `npm run lint` on all staged files.

**Fonts:** Self-hosted Geist variable fonts (`/public/fonts/`). Loaded via `@font-face` in `index.css` before the Tailwind import.
