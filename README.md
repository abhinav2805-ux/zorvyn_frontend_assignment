# Finance Dashboard UI

## Overview

A modern, interactive finance dashboard for tracking balances, income, expenses, and transactions. The app emphasizes **clear architecture**, **centralized state**, and **predictable data flow** from a single store through derived helpers into the UI.

**Live demo:** https://zorvyn-frontend-assignment-flax.vercel.app/

---

## Key features

### Core

- **Dashboard overview** — Total Balance, Income, and Expenses computed from the transaction list (`calculateSummary` in `src/utils/helpers.js`).
- **Charts** — Recharts line chart (cash flow by date) and donut chart (spending by category), fed from the same transactions as the rest of the app.
- **Transactions table** — Search, category/type filters, sortable Date and Amount columns, CSV export of the **filtered** set.
- **RBAC** — `viewer` vs `admin` in Zustand; Admin unlocks add/edit/delete and row actions.
- **CRUD** — Modal forms call `addTransaction`, `updateTransaction`, and `deleteTransaction` on the store.

### Enhancements

- **Persistence** — Zustand `persist` middleware syncs transactions, role, and theme key to `localStorage` (key: `finance-dashboard-storage`).
- **Dark mode** — Toggle in the header toggles the `dark` class on the document root (with Tailwind `dark` variant).
- **CSV export** — Blob + temporary `<a download>`; no extra CSV library.
- **Simulated loading** — On first paint of the dashboard, a **1s** delay shows `components/dashboard-skeleton.tsx` before content (mock “API” latency).
- **Motion** — Framer Motion on chart containers, summary cards, and table rows (staggered row delay).

---

## Technical stack

| Area | Choice |
|------|--------|
| Framework | **Next.js** (App Router), React 19 |
| State | **Zustand** + `persist` |
| Styling | **Tailwind CSS** v4 |
| UI primitives | **shadcn/ui**-style components under `components/ui/` |
| Icons | **lucide-react** |
| Charts | **Recharts** |
| Animation | **framer-motion** |

The UI is organized as **routes** under `app/`, **feature components** under `components/`, and **domain logic** (store, seed data, helpers) under `src/`.

---

## State and data flow

1. **`src/store/useFinanceStore.js`** holds `transactions`, `role`, `theme`, and CRUD actions. It is the **single source of truth** for finance data and role.
2. **`src/utils/helpers.js`** derives summaries, category aggregates, trend series, and highest spending category—keeping components thin.
3. **UI components** subscribe with selectors (`useFinanceStore((s) => s.transactions))`) so charts, cards, and the table stay in sync when data changes.
4. **`components/transactions-table.tsx`** uses **`useMemo`** for filtered + sorted rows so work scales with filter changes, not every unrelated render.

---

## Project structure

```
.
├── app/
│   ├── layout.tsx              # Root layout, providers
│   ├── page.tsx                # Entry redirect / landing
│   ├── dashboard/              # Dashboard route
│   │   └── page.tsx            # Skeleton delay, summary, charts, table
│   ├── dashboard-context.tsx   # Sidebar + theme (non-finance UI state)
│   ├── globals.css
│   ├── transactions/
│   └── settings/
├── components/
│   ├── charts.tsx              # Recharts line + donut
│   ├── header.tsx              # Dark mode + role (Zustand)
│   ├── sidebar.tsx
│   ├── summary-card.tsx
│   ├── insight-card.tsx
│   ├── transactions-table.tsx  # Filters, sort, CSV, RBAC, motion rows
│   ├── transaction-modal.tsx     # Add / edit dialog
│   ├── dashboard-skeleton.tsx  # Loading placeholder
│   └── ui/                     # shadcn-style primitives
├── src/
│   ├── store/
│   │   └── useFinanceStore.js
│   └── utils/
│       ├── mockData.js         # Seed transactions
│       └── helpers.js          # Summary + chart helpers
└── lib/
    └── utils.ts                # cn() helpers for UI
```

---

## Getting started

### Prerequisites

- **Node.js** 18+ (20+ recommended)

### Install

```bash
git clone https://github.com/abhinav2805-ux/zorvyn_frontend_assignment
cd zorvyn_frontend_assignment
npm install
```

### Development

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** (Next.js default port). The app redirects to the dashboard route as configured in `app/page.tsx`.

### Production build

```bash
npm run build
npm start
```

---

## Notes for reviewers

| Topic | Notes |
|------|--------|
| `src/store/useFinanceStore.js` | Global state, persistence, CRUD |
| `src/utils/helpers.js` | Derived metrics and chart data |
| `components/transactions-table.tsx` | `useMemo` filtering/sorting, CSV export, RBAC, `motion.tr` rows |
| `app/dashboard/page.tsx` | Simulated load delay + skeleton |
| `components/charts.tsx` | Recharts + Framer Motion wrappers |

---
