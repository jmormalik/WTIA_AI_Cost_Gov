# Kyber — AI Agent Cost Governance Dashboard

Fully client-side React + Tailwind v4 dashboard. No backend, no network calls.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Structure

- `src/App.tsx` — tab shell (Cost Attribution / Live Breaker)
- `src/components/kyber/CostAttribution.tsx` — KPIs, stacked bars, donut, task drill-down
- `src/components/kyber/LiveBreaker.tsx` — 1s-tick loop simulation + hard-limit kill switch
- `src/data/kyber-seed.ts` — all hardcoded seed data
- `src/styles.css` — design tokens (dark canvas, violet/teal accents)
