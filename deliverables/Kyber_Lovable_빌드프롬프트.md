# Kyber — Lovable 빌드 프롬프트 (트랙1: 피치 크리티컬 패스)

> 생성: 2026-07-29 (office-hours 설계 기반)
> 설계 문서: `~/.gstack/projects/jmormalik-WTIA_AI_Cost_Gov/taewonki-main-design-20260729-122506.md`
> 범위: **트랙1(8/6 피치)** 만. 순수 프론트 + 시드 JSON, 백엔드/인증 없음. 백엔드(Supabase)는 8/12 이후 트랙2.
> 언어: 프롬프트·UI 카피 모두 영어 (심사위원 영어권 + 영어 피치덱 정합 + 생성형 빌더는 영어에서 정확).

---

## Lovable에 붙여넣을 프롬프트 (영어)

```text
Build a single-page enterprise SaaS dashboard called "Kyber" — an AI agent cost-governance tool. NO backend, NO auth, NO database. Everything runs client-side from a hardcoded seed dataset (a JS constant), so it works fully offline. React + Tailwind only.

## Aesthetic (critical — do NOT produce a generic template look)
Premium enterprise register like Vercel / Linear / Stripe. Dark theme:
- Canvas: zinc-950 background with a subtle ambient radial glow top-center.
- Cards: translucent, border border-white/[0.07], rounded-xl, shadow-lg, subtle backdrop-blur.
- Header: sticky, backdrop-blur-xl, thin bottom border.
- Typography: tight tracking, muted-grey secondary text (zinc-400/500), white primary.
- Color discipline: neutral grey as the base, and ONLY TWO accent colors — muted violet (#8b5cf6-ish) and muted teal (#14b8a6-ish). Use grey for "LLM API" and the two accents for the two non-LLM categories, so the chart is legible from color alone.
- No emojis. Use lucide-react icons sparingly.

## Layout: top tab switcher with two tabs.

### TAB 1 — "Cost Attribution" (the hero)
Goal: show COGS broken down BY CUSTOMER, revealing that a big share of cost is NON-LLM and that some customers are served at a loss.
- Top: 3 KPI cards — Total COGS (this month), % of COGS that is non-LLM (should read ~41%), and "Customers served at a loss" count.
- Main: a horizontal stacked bar per customer (one row each), segmented into three cost categories: "LLM API" (grey), "Search Tool" (violet), "External Database" (teal). Sort by total cost descending. Show the $ total at the end of each bar. Customers whose cost exceeds their contract revenue get a small red "Loss" badge.
- A compact donut showing the LLM vs Search vs External DB split across all customers, with the 41% non-LLM figure called out.
- DRILL-DOWN: clicking a customer row expands (or opens a side panel) an itemized task list for that customer. Each task row shows: task name, model used (e.g. "GPT-4o", "Claude Sonnet"), input tokens, output tokens, and cost. This is where token detail lives — as evidence inside attribution, not as the headline.

### TAB 2 — "Live Breaker" (semantic loop kill-switch)
Goal: dramatize catching a runaway agent stuck in a meaningless loop and REFUSING the next call at the gate BEFORE it executes (not an after-the-fact alert).
- A live log panel that appends one event per second via a client-side setInterval replaying a hardcoded seed sequence (NO realtime/websocket). Each event line: timestamp, the agent's action (e.g. 'search("Q3 refund policy")'), and running cost.
- The seed sequence shows the SAME tool call repeating (same normalized query) with no new information gained.
- A "Detection" panel showing the reason live: e.g. "Same tool_call signature repeated 3× · state delta: 0 · new information: none".
- A "Hard Limit" toggle. When ON, once the loop is detected (after the repeated signature hits the threshold), the NEXT call is REFUSED at the gate: show a prominent BLOCKED state with an audit-grade reason string, and the log stops. When OFF, the loop keeps burning cost so the contrast is visible.
- Tie back to Tab 1: show "This block prevented ~$Y that would have been attributed to [Customer X]".

## Seed data requirements
Create one JS constant with: ~6 customers, each with contract revenue + per-category costs (LLM/Search/External DB) so that non-LLM ≈ 41% of total and 2 customers are at a loss; per-customer itemized tasks (model, input tokens, output tokens, cost); and a runaway-loop event sequence for Tab 2 with a customer_id and an estimated-savings number. All numbers internally consistent.

## Must-haves
- Fully offline (no network calls anywhere).
- Both flows must be visually obvious to a non-technical judge in under 10 seconds each.
- Polished, dense, enterprise — not a toy.
```

---

## 사용법

1. Lovable 새 프로젝트 → 위 코드블록 통째로 붙여넣기
2. 첫 결과 후 **뷰1(Cost Attribution) 드릴다운부터** 다듬기 — 이게 히어로
3. 짧은 반복 프롬프트 예: `Make the customer drill-down open as a right-side panel`, `Increase spacing, reduce card borders to border-white/[0.06]`
4. **마일스톤: 8/2까지 뷰1만이라도 완성** (Lovable 크레딧·시간 리스크 대비)
5. 화질이 기존 React 데모(`DEMO_최신_이걸_더블클릭.html`)를 못 넘으면 → **8/6 무대는 기존 데모 확정**, Lovable은 제품 트랙으로

## 무대 자산 원칙
- 8/6 무대 = 기존 손튜닝 React 데모 (오프라인 안전자산)
- Lovable판 = 제품 트랙 실험 + 뷰1 귀속 드릴다운 강화. 무대 화질 경쟁 아님.
