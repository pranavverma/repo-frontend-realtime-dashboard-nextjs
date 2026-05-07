# Real-Time Ops Dashboard — Next.js 14

A dark-themed, real-time platform engineering dashboard built with Next.js 14
App Router, TypeScript, Tailwind CSS, Recharts, and SWR. Designed to show live
cluster health, service status, deployment activity, and key performance metrics
across a microservices platform.

---

## What it does

```
┌───────────────────────────────────────────────────────────┐
│                    Ops Dashboard                          │
│                                                           │
│  Dashboard page   ──►  stat cards + 4 live metric charts  │
│  Services page    ──►  sortable table with pod health     │
│  Deployments page ──►  deployment history + status feed   │
│                                                           │
│  SWR auto-refresh ──►  5s metrics, 10s services, 15s deps │
└───────────────────────────────────────────────────────────┘
           │
     Next.js API routes
     (swap for real backend)
```

---

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. No environment variables needed — all data comes
from the built-in mock API routes.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx              Root layout (sidebar + dark HTML)
│   ├── page.tsx                Dashboard (stat cards, charts, grids)
│   ├── services/page.tsx       Services table
│   ├── deployments/page.tsx    Deployments table
│   └── api/
│       ├── metrics/route.ts    GET /api/metrics  (jittered per request)
│       ├── services/route.ts   GET /api/services
│       └── deployments/route.ts GET /api/deployments
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx         Navigation sidebar
│   │   └── Header.tsx          Page header with refresh indicator
│   ├── dashboard/
│   │   ├── StatCard.tsx        KPI card with icon
│   │   ├── MetricsChart.tsx    Recharts line chart (SWR)
│   │   ├── ServiceStatusGrid.tsx  Pod-level service cards
│   │   └── DeploymentFeed.tsx  Recent deployment list
│   └── ui/
│       ├── Badge.tsx           Status badge
│       └── Spinner.tsx         Loading spinner
├── hooks/
│   ├── useMetrics.ts           SWR hook — refreshes every 5s
│   ├── useServices.ts          SWR hook — refreshes every 10s
│   └── useDeployments.ts       SWR hook — refreshes every 15s
└── lib/
    ├── types.ts                TypeScript interfaces
    ├── mock-data.ts            Deterministic mock data with realistic drift
    └── utils.ts                cn(), formatDuration(), color helpers
```

---

## Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 14 (App Router) | Server + client components, built-in API routes |
| Language | TypeScript (strict) | Full type coverage across data flows |
| Styling | Tailwind CSS + dark theme | Utility-first, no runtime cost |
| Charts | Recharts | Declarative, works with React 18 |
| Data fetching | SWR | Stale-while-revalidate, auto-refresh |
| Icons | lucide-react | Consistent, tree-shakeable |

---

## Connecting to a real backend

Replace the mock API routes in `src/app/api/` with `fetch` calls to your actual
platform API. The shape of each response is defined in `src/lib/types.ts` — keep
that contract and the client components require zero changes.

Example for `src/app/api/services/route.ts`:

```ts
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://your-portal-api/services/");
  const data = await res.json();
  return NextResponse.json(data);
}
```

---

## Pages

### Dashboard (`/`)
- Six KPI stat cards (server-rendered)
- Four live metric line charts — requests/sec, p99 latency, error rate, CPU
- Per-service pod health grid (ready pods progress bar)
- Recent deployment activity feed

### Services (`/services`)
- Full service table: team, language, environment, status, pod ratio, uptime, version
- Auto-refreshes every 10 seconds

### Deployments (`/deployments`)
- Full deployment table: version, environment, status badge, trigger source, duration
- In-progress deployments show animated "in progress" label
- Auto-refreshes every 15 seconds
