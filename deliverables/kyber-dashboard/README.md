# Kyber — AI Agent Cost Governance Dashboard

Fully client-side React + Tailwind v4 dashboard. No backend, no network calls.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Structure

- `src/App.tsx` — tab shell (Cost Attribution / Live Breaker / Cost Report)
- `src/components/kyber/CostAttribution.tsx` — KPIs, stacked bars, donut, task drill-down
- `src/components/kyber/LiveBreaker.tsx` — 1s-tick loop simulation + hard-limit kill switch
- `src/components/kyber/CostReport.tsx` — **AI agent cost analysis report** (masthead, headline metrics, cost composition, per-account unit economics, findings, recommendations) — the screenshot-ready "Promised Land" deliverable
- `src/data/kyber-seed.ts` — all hardcoded seed data
- `src/styles.css` — design tokens (dark canvas, violet/teal accents)

## ⚠️ Illustrative data

Every figure here — including the ~41% non-LLM share — is **simulated sample data** to demonstrate
the attribution model, **not a market benchmark**. The deck fact-check (`Pitch/FACTCHECK-*`) found no
public source for a clean "non-LLM % of agent COGS" number, so the UI labels these figures as
illustrative. Swap `src/data/kyber-seed.ts` for real design-partner numbers before presenting any
figure as fact.
