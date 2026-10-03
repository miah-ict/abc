# AGENTS.md — PERN Stack Template

## Quick Start

| Command | Description |
|---|---|
| `npm run install:all` | Installs deps for root, `backend/`, and `frontend/` |
| `npm run db:init` | Initializes PostgreSQL schema via `backend/src/db/init.js` |
| `npm run dev` | Starts backend (`:5000`) and frontend (`:3000`) concurrently |
| `npm run dev:backend` | Starts Express API only (nodemon) |
| `npm run dev:frontend` | Starts Vite React dev server only |
| `npm run build:frontend` | Builds production React bundle |

## Architecture

- **Backend**: Express MVC in `backend/src/`. Routes under `/api`, controllers in `controllers/`, models in `models/`.
- **Frontend**: Vite + React + TypeScript in `frontend/src/`. Entry is `src/main.tsx` (loaded from `frontend/index.html:22`). Proxies `/api` → `http://localhost:5000` (vite.config.js:10-14), though no code currently calls the API — the UI is fully driven by `src/data/mockData.ts`.
- **Frontend structure**:
  - `App.tsx` — switches between public landing (`components/PublicWebsite.tsx`) and admin (`components/admin/SuperAdminPortal.tsx`).
  - `components/admin/` — `AdminHeader`, `AdminSidebar`, `SuperAdminPortal` (tab router, `initialTab` prop), `views/` (Dashboard, Schools, Users, Programs, Analytics, Reports, Settings, Logs, Backup), `components/modals/` (9 modals).
  - `types.ts`, `data/mockData.ts` — shared data model and fixture data.
  - `_legacy/` — original PERN starter UI (unreferenced; see its `README.md`).
- **Styling**: Tailwind CSS **v4** via `@tailwindcss/vite` plugin. Theme tokens (`--color-brand-navy`, `--font-display`, `--shadow-card`, `--shadow-cardHover`, …) live in `src/index.css` under `@theme`. There is **no** `tailwind.config.js`/`postcss.config.js`.
- **UI zoom (fixed 75%)**: both experiences render inside a zoom shell defined in `src/index.css` and are fixed at `zoom: 0.75` so more content fits on screen.
  - Public site → `.site-shell` wrapper around `PublicWebsite` in `App.tsx`; `min-height: calc(100vh / 0.75)` keeps it filling the screen.
  - Super Admin portal → `.admin-shell` on the `SuperAdminPortal` root; `height: calc(100vh / 0.75)` makes it cover the viewport exactly, and `App.tsx` switches its wrapper to `h-screen overflow-hidden` in admin mode so the oversized (pre-zoom) box cannot create a page scrollbar.
  - Under `zoom`, percentage sizes are already in the element's scaled coordinate system (`width: 100%` spans the parent exactly) — only `vh`/`vw` are raw px and must be divided by the zoom factor. Using `100vw` for width adds the scrollbar width and causes a horizontal scrollbar.
  - `@supports (zoom: 1)` guards the rules; browsers without `zoom` fall back to `width/height: 100%` (no zoom).
- **DB**: PostgreSQL. Connection env vars in `.env` (DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME).
- **Mock fallback**: `backend/src/models/item.model.js` falls back to in-memory data if PostgreSQL is unreachable (queries return mock data instead of throwing).

## Environment

- Backend reads `.env` from `backend/src/config/env.js` which resolves `path.resolve(__dirname, '../../.env')` — place `.env` at repo root.
- Copy `.env.example` and adjust values. Required vars: `PORT`, `NODE_ENV`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, `DB_NAME`.
- Frontend currently reads no env vars. If needed, use the Vite `import.meta.env.VITE_*` prefix.

## Database

- Schema: `backend/src/db/schema.sql` — defines `items` table with seed data.
- `npm run db:init` runs `init.js` which executes `schema.sql` against the connected pool.
- Health check: `GET /api/health` returns DB status.

## Lint / Typecheck

- `npm run lint` in `frontend/` is **broken/pre-existing**: the script invokes `eslint`, which is not in devDependencies. No typecheck script is configured for the TS frontend (`tsc` is available via `@types/react` toolchain only insofar as installed — run `npx tsc --noEmit` from `frontend/` if a type check is needed).
- Backend is CommonJS — use `node --check` or standard Node linting if needed.

## Key Quirks

- **Tailwind v4**: install `tailwindcss` + `@tailwindcss/vite` and register the plugin in `vite.config.js`. Custom utilities such as `shadow-card`/`shadow-cardHover`, `font-display`, `font-outfit`, `brand-navy` are defined in `src/index.css` `@theme` — they do not exist without it.
- **Pinned native dep**: `@tailwindcss/oxide-linux-x64-gnu` is an explicit devDependency (npm optional-deps bug on this machine); keep it when reinstalling.
- **Node v18**: `EBADENGINE` warnings on install are expected and harmless.
- **CORS**: Backend allows all origins (`cors()`). Frontend proxies `/api` through the Vite dev server.
- **DB offline mode**: If PostgreSQL is down, `ItemModel.findAll()` etc. return `{ source: 'mock', items: [...] }`.
- **`new/` directory**: Separate React daycare project (TypeScript, `@google/genai`, Tailwind v4) — the design source this frontend was ported from. Use `npm --prefix new run dev` to start it independently.
- **`copy-assets.cjs`**: `predev`/`prebuild` step (`frontend/package.json:7-8`) copies `../docs/icons` → `frontend/public/icons`. `docs/` does not exist in this repo, so it logs a harmless `⚠️ srcDir does not exist` warning on every build/dev start. (`copy-assets.js` is an identical duplicate.)
