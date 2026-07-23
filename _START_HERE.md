# _START_HERE — Claude context brief

> **To Claude:** When invoked on this idea/project, read ONLY this file first, then start. Open other docs only when this file points to them. After every idea-related session, update this file (esp. "Status", "Next", "Decision log").
> **Output language = Korean** (deliverables + chat). This brief is English for token economy only.
> Last updated: 2026-07-23 (PDT)

---

## 0. 30-sec summary

- **Topic:** AI agent cost governance. A layer that controls the LLM/tool/external-API spend an agent triggers on its own **in the request path, before execution**, and **explains (audit-grade) why it blocked**.
- **One-liner:** "Not a CCTV after the fire — a breaker before it ignites."
- **Form:** team project (user = customer dev/GTM, teammate = tech originator). WTIA capstone = **investor pitch deck**.
- **User's real goal:** NOT to actually found a company. Goal = a **winning pitch** (stable + brilliant + Q&A-defensible), but the model must be realistic.
- **Biggest bottleneck:** customer interviews = **0**. Every number (ACV/market/finance) traces back to this.

---

## 1. Locked positioning (2026-07 reset)

Old framing (small startups + cost-saving) collapsed under two rebuttals → switched to:

- **① ICP: small startups → mid-market/scaleup** ($50K–$500K/mo AI spend, 50–300 ppl). Test: "no engineers to build in-house like Meta, but bigger spend/audit pressure than a startup." Korean AI startups (라이너·뤼튼·채널코퍼레이션) = **free design partners**.
- **② Value: cost-saving → cost attribution/explanation (COGS).** "We cut your AI bill" ❌ → "We let you explain your AI unit cost" ✅. (Saving fights adoption incentives + negative ROI at small scale.)
- **③ Market story:** Korea = wedge, market = global agent infra. **Do NOT present LAM $80k as market size.**

---

## 2. Key evidence numbers (✅=pitch-citable / 🔵=source only / ⚠️=corrected / ❓=unverified)

- ✅ Enterprise AI budget overrun **79%** (DoiT 2026), **mid-size 81% > large 76%**
- ✅ AI Gateway market $2.4B→$15B (2035), CAGR **~20%**
- ✅ "Sustainable AI SaaS keeps LLM cost < 20% of COGS"
- ✅ Uber built own gateway (<40ms) — "you need a foundation to build it" = our rebuttal ammo
- ✅ Meta: Claudeonomics leaderboard → tokenmaxxing → billions/yr → built own AI Gateway
- 🔵 93% overrun (McKinsey, cite alongside) · DoorDash in-house (secondary)
- ⚠️ Startup real spend $500–5K (原 $4–10K overstated)
- ❓ **Korea Build→Buy threshold $10–15K · 0.2 FTE** ← top interview-verify target

---

## 3. Competition & risk (summary)

**4 competitive layers:** ① In-path enforcement (SatGate = direct; LiteLLM = OSS standard + Korea free self-host threat; Portkey) ② Observability (Langfuse·Helicone) ③ FinOps/COGS (CloudZero·Vantage — head-on if we lead with COGS) ④ Agent payments (Skyfire·Payman).

**Fatal risks & counters (detail: `Problem/리스크-분석-및-대책.md`):**
1. Platform absorption (OpenAI/Anthropic/Meta) → cross-vendor neutrality + independent audit (vendor self-audit = no evidentiary weight)
2. Trust↔data circular dependency → **start with off-path reports** (no proxy), enter path after earning trust
3. LiteLLM already covers the core → interview-verify whether remaining wedge (tools/external API) is 10x
4. Negative ROI (small) / build in-house (large) = death valley → answer: mid-market + COGS
5. Inline proxy latency/SPOF → sidecar/async/bypass

**Differentiation candidate (team debate):** Semantic ROI Kill-switch (detect + block agents spinning uselessly) — more defensible than COGS.

---

## 4. Pitch deck direction (per 7.23 class)

- **Structure: The Market Shift (Raskin)** — no traction, so push the market shift.
- **Flow:** title → Shift (spend-decider shifts human→model) → Villain (after-the-fact dashboards, static keys) → incident evidence ($4.2K–$500M) → Promised Land → Vehicle (solution) → demo → customer → market → competition → moat → BM/pricing → GTM → traction → team → finance/Ask.
- **⚠️ Unfinished:** solution (slides 6–7) not locked = biggest task. Ask amount/use TBD.
- **3 mandatory rebuttals:** "just buy tokens" / "build it yourself" / "what if OpenAI does it" (answers §1·§3).
- **Finance slide = revenue (hockey stick) only. Drop cost/net income** (7/21 class). Purpose = land a 2nd meeting.
- **20-min discipline:** target 10-min talk (filling all 20 = penalty) + 8–10 min Q&A (score via the 3 rebuttals).
- Traction: with 0 interviews, substitute **"N design partners + interview findings"**, target metric = net-negative churn.

## 4-1. Schedule (backward)

- **8/6, 8/10 pitch practice · 8/11–12 final pitch** (4 judges, 20-min blocks).
- 8/13 program ends (networking happy hour). Next week = Tech Week.
- **D-day = 8/6.** Before it: ① lock solution ② interviews ③ deck draft.

---

## 5. Status & next

**Status:** Problem · Why Now · competition · ICP · personas · market research (verified) · positioning reset · pitch-narrative worksheet = done. Interviews = 0. Solution form = undecided.
Repo `WTIA_AI_Cost_Gov` (github.com/jmormalik/WTIA_AI_Cost_Gov, SSH) created + teammate 태원 invited as collaborator, but **not yet pushed** (sandbox can't push — user must run push locally). Notion 검증본 enriched to full depth. Context files (CLAUDE.md, _START_HERE.md) converted to English.

**Next (priority):**
1. **Push repo locally** (sandbox cannot): `cd ~/Desktop/WTIA/AI_cost_gov && rm -rf WTIA_AI_Cost_Gov && git init && git remote add origin git@github.com:jmormalik/WTIA_AI_Cost_Gov.git && git add . && git status` (confirm `_class-materials/` not listed) → commit → `git push -u origin main`. Teammate becomes contributor once they push a commit under their own GitHub email.
2. **Decide solution form with team** (off-path report vs in-path proxy) — rest of deck depends on this
3. **10–15 interviews** — life/death Qs: "what % of spend is tools/external API?" + "willing to put a proxy in the path?" + "at what spend level do you buy vs build?"
4. **Week5 homework** (2 revenue models · pricing hypothesis · 6-quarter roadmap · 3–5yr financials) — templates in `_class-materials/Week 5 ... docx`, `_class-materials/Financial Forecast Template ... xlsx` (git-ignored folder)
5. Assemble pitch deck draft

---

## 6. Doc map (open only when needed)

- **Idea/strategy:** `Problem/문제-정의.md`, `Problem/why-now.md`, `Problem/리스크-분석-및-대책.md`, `Solution/포지셔닝-재설정.md`, `Solution/moat-후보.md`
- **Customer:** `ICP/ICP.md`, `Buyer-Persona/01-CTO-공동창업자.md`, `Buyer-Persona/02-AI-리드-챔피언.md`, `Buyer-Persona/이해관계자-맵.md`
- **Competition/market:** `시장조사.md` (verified), `Competitor-Analysis/*.md`, `Market/TAM-SAM-SOM.md`
- **Interview:** `Interview/인터뷰-가이드-Mom-Test.md`, `Interview/인터뷰-후보-리스트.md`, `Interview/아웃리치-이메일-초안.md`
- **Our deliverables:** `deliverables/Pitch_Narrative_Worksheet_채움.docx`, `deliverables/Week3_숙제_채움.docx`, `deliverables/Competitive_Analysis_AI_Cost_Governance.xlsx`
- **Class materials (git-ignored, local ref):** `_class-materials/` — lecture pptx · mentor PDF · blank homework templates
- **Notion hub:** https://app.notion.com/p/3a4b5f428bfd81eea734fbb1b73c86c2

---

## 7. Decision log (chronological — append each new decision)

- 2026-07 early: original solo idea = fake-news detector API (archived). Shelved for legal risk (copyright/defamation) + "defining truth" problem.
- 2026-07: joined team → pivot to AI agent cost governance. User role = customer dev/GTM.
- 2026-07-22: positioning reset (mid-market × COGS). Basis = Meta case + ROI/build-in-house rebuttals.
- 2026-07-22: market research cross-verified, tags applied. 79% · CAGR20% · Uber · mid-size 81% · COGS20% = locked as pitch-citable.
- 2026-07-23: dir cleanup — class materials → `_class-materials/` (git-ignored), our outputs → `deliverables/`. README + .gitignore set. GitHub repo created (SSH), teammate invited. Push pending (user runs locally).
- 2026-07-23: Notion 검증본 page enriched to full white-paper depth (competitor funding, vendor gap, market sizing, Korea ecosystem, full sources). CLAUDE.md + _START_HERE.md converted to English for token economy (Korean output rule unchanged).
