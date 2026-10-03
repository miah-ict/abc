# _legacy — previous PERN UI (unreferenced)

Files from the original PERN starter dashboard, kept only so nothing is lost
(no git in this repo). Nothing imports from here; the live app uses
`src/App.tsx` (landing `PublicWebsite` + `SuperAdminPortal`).

- `App.jsx`, `main.jsx` — old entry/view switch (replaced by `App.tsx`/`main.tsx`)
- `pages/` — old `LandingPage.jsx` + `DashboardPage.jsx`
- `components/` — old Header / DbStatusCard / ItemManager / ApiTester
- `services/` — fetch wrappers for the Express `/api` (health, items)
- `styles/` — old landing.css / index.css (several classes were never defined)

Safe to delete once you no longer need them as reference.
