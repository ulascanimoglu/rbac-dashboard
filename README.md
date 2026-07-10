# Console — RBAC Admin Dashboard

A role-based access control (RBAC) admin dashboard. Sign in as **Admin**, **Manager**, or **Viewer** and watch the navigation, actions, and pages change based on what each role is allowed to do.

Built to demonstrate a production-style frontend — type-safe data flow, server-side data tables, schema-driven forms, and internationalization — with no external backend (mock REST API via Next.js Route Handlers).

> Demo data only. Switch roles live from the top bar to see permissions take effect instantly.

## What it demonstrates

| Area | Implementation |
| --- | --- |
| **RBAC** | Central permission matrix (`src/lib/auth/permissions.ts`), `<RoleGate>`, per-page `<PermissionGuard>`, permission-filtered navigation, and a live role switcher |
| **Server state** | TanStack Query with server-side pagination, sorting, search, and `keepPreviousData` |
| **Client state** | Zustand (persisted auth / session) |
| **Forms** | React Hook Form + Zod, with the validation schema shared between client and API |
| **Data table** | Sortable columns, debounced search, pagination, and loading / empty / error states |
| **API** | Next.js Route Handlers (`/api/employees`, `/api/stats`) with Zod-validated writes |
| **i18n** | Type-safe TR / EN dictionaries behind a custom `useI18n()` hook |
| **Theming** | Light / dark mode via `next-themes` and CSS-variable design tokens |
| **Quality** | TypeScript (strict), Vitest + Testing Library, ESLint, GitHub Actions CI |

## Tech stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · TanStack Query · Zustand · React Hook Form · Zod · Recharts · Vitest · Testing Library

## Getting started

```bash
npm install
npm run dev
# open http://localhost:3000
```

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Vitest |

## Roles & permissions

| Permission | Admin | Manager | Viewer |
| --- | :-: | :-: | :-: |
| View employees | ✓ | ✓ | ✓ |
| Add employees | ✓ | ✓ | — |
| Delete employees | ✓ | — | — |
| View users & roles | ✓ | — | — |
| Manage settings | ✓ | — | — |

Roles are the single source of truth in `src/lib/auth/permissions.ts`. Every piece of UI gating derives from it, so granting a permission is a one-line change.

## Project structure

```
src/
  app/
    (app)/            authenticated shell (sidebar + header) and pages
      dashboard/      stats + department chart
      employees/      data table + create form
      users/          role -> permission matrix (admin only)
      settings/       gated placeholder (admin only)
    api/              mock REST endpoints (Route Handlers)
    login/            role-based sign-in
  components/         UI primitives + feature components
  lib/
    auth/             permission matrix + persisted store
    api/              TanStack Query hooks
    data/             in-memory data + server-side query/sort/paginate
    i18n/             dictionaries + provider
    schemas/          Zod schemas
```

## Notes

- **Auth is mocked** for the demo — the session lives in Zustand (localStorage). In production this would be a real session with server-side checks (middleware + verified tokens); the permission matrix stays the same.
- **Data is in-memory** and resets when the server restarts. The `src/lib/data` module can be swapped for a real database without touching the route handlers.
- The mock API adds a small artificial delay so loading and keep-previous-data states are visible in the UI.

## Deploy

Deploys to Vercel with zero configuration, or run anywhere with `npm run build && npm run start`.

## License

MIT
