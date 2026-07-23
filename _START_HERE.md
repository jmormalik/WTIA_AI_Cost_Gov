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

## 6. Repository tour (teammate onboarding — read this to work any file)

> **New teammate quickstart:** (1) Drop the whole `AI_cost_gov/` folder into Claude (Cowork/Project). (2) Claude reads THIS file first (rule at top) — that alone loads full context. (3) Output language = Korean; industry terms stay English. (4) Role split: 태원 = tech/product, 재민(Malik) = customer dev · GTM · research. (5) Every doc separates ✅ verified facts from ⚠️ hypotheses; never edit interview quotes. (6) At session end, Claude updates §5 Status/Next + §7 Decision log here. (7) `_class-materials/` is git-ignored — a fresh git clone won't have it; that's fine, it's local reference only.

Below: every tracked file, what it is, and when to open it. Open a file only when the task needs it (token economy).

**Root files**
- `_START_HERE.md` — this master brief. Always read first; single source of truth for context.
- `README.md` — public-facing repo intro (what the repo is, dir map, positioning). Sober tone for outside readers.
- `CLAUDE.md` — working rules for Claude in this repo (Korean output, dir conventions, cross-doc consistency, session-start rule).
- `시장조사.md` — cross-verified market & competition write-up. Each figure tagged pitch-citable vs caution. Main evidence source.
- `WTIA_AI_Cost_Gov_Moat_Why_Now_v1.md` — teammate's Gemini-authored Why-Now/Moat draft. ⚠️ Its cost-saving lead + "kernel/C++ low-level moat" framing was **rejected** (see §7, 2026-07-23); kept only for reference. Do not reuse its unsourced stats.
- `MENTOR_QA_CONTEXT_for_Gemini.md` — standalone English brief to paste into Gemini so it can translate a live mentor question + recommend an answer in our locked positioning. Use during mentoring sessions.

**`Problem/` — problem definition & timing**
- `문제-정의.md` — core problem hypothesis + the sub-hypotheses interviews must verify.
- `why-now.md` — timing argument + real incident cases ($4.2K single dev → $500M enterprise; $47K/11-day runaway loop).
- `리스크-분석-및-대책.md` — 5 fatal risks + counters. Open before any competition, rebuttal, or GTM work.

**`ICP/`**
- `ICP.md` — ideal customer profile (mid-market/scale-up, $50K+/mo AI spend, 50–300 ppl).

**`Buyer-Persona/`**
- `01-CTO-공동창업자.md` · `02-AI-리드-챔피언.md` — the two decision-maker personas (goals, pains, buying triggers).
- `이해관계자-맵.md` — Power × Interest stakeholder map.

**`Solution/`**
- `포지셔닝-재설정.md` — the LOCKED positioning (mid-market × COGS attribution). Foundational — read with §1 of this file.
- `moat-후보.md` — moat candidates; principle "feature gap ≠ moat" → data accumulation (unit economics, benchmark).
- `스토리라인-통합-Problem-Solution.md` — pitch Problem→Solution slide flow (COGS-lead, savings as by-product, tech reworded to defensible terms). Newest strategy doc; basis for deck slides 3–8.

**`Competitor-Analysis/`**
- `경쟁사-분석.md` — competitor profiles + funding. `기능-비교-매트릭스.md` — feature matrix (source of moat candidates). `전략-캔버스.md` — strategy canvas.

**`Market/`**
- `TAM-SAM-SOM.md` — market sizing (⚠️ under revision — do NOT present the old LAM $80K as market size).

**`Interview/` — ⚠️ 0 records so far (the #1 bottleneck)**
- `인터뷰-가이드-Mom-Test.md` — Mom Test question guide. `인터뷰-후보-리스트.md` — target list. `아웃리치-이메일-초안.md` — outreach email drafts. New records go here named `YYYY-MM-DD-target.md`; never alter original quotes.

**`deliverables/` — submittable outputs**
- `Pitch_Narrative_Worksheet_채움.docx` — filled pitch-narrative worksheet. `Week3_숙제_-_ICP___경쟁사___시장규모_채움.docx` — Week3 homework. `Competitive_Analysis_AI_Cost_Governance.xlsx` — competitor comparison sheet. `ai_cost_gov_dashboard_prototype.html` — COGS dashboard prototype (per-customer unit economics + real-time budget hard-limits + LLM routing); also saved as Cowork artifact "ai-cost-gov-dashboard".

**`_class-materials/` (git-ignored — local only, may be absent after clone)**
- Lecture decks (`7.21/7.23/7.24 ... .pptx`), mentor PDF (`18-F-0203 ... .pdf`), blank homework templates (`Week 5 ... .docx`, `Financial Forecast Template ... .xlsx`), `Traction_Slide_Examples_B2B.pptx`. Reference only; do not commit.

**External**
- **Notion hub:** https://app.notion.com/p/3a4b5f428bfd81eea734fbb1b73c86c2 — sub-pages include the verified market page, positioning-reset page, and the pitch script "🎤 피칭 대본 — 데이터 축적 해자". Notion is the shareable mirror; this repo is the working source.

---

## 7. Decision log (chronological — append each new decision)

- 2026-07 early: original solo idea = fake-news detector API (archived). Shelved for legal risk (copyright/defamation) + "defining truth" problem.
- 2026-07: joined team → pivot to AI agent cost governance. User role = customer dev/GTM.
- 2026-07-22: positioning reset (mid-market × COGS). Basis = Meta case + ROI/build-in-house rebuttals.
- 2026-07-22: market research cross-verified, tags applied. 79% · CAGR20% · Uber · mid-size 81% · COGS20% = locked as pitch-citable.
- 2026-07-23: dir cleanup — class materials → `_class-materials/` (git-ignored), our outputs → `deliverables/`. README + .gitignore set. GitHub repo created (SSH), teammate invited. Push pending (user runs locally).
- 2026-07-23: Notion 검증본 page enriched to full white-paper depth (competitor funding, vendor gap, market sizing, Korea ecosystem, full sources). CLAUDE.md + _START_HERE.md converted to English for token economy (Korean output rule unchanged).
- 2026-07-23: Rejected Gemini Moat/Why-Now draft's cost-saving lead + "kernel/C++" framing; confirmed COGS-lead + data-accumulation moat. Added deliverables: `Solution/스토리라인-통합-Problem-Solution.md`, `deliverables/ai_cost_gov_dashboard_prototype.html` (+ Cowork artifact), Notion pitch-script sub-page, `MENTOR_QA_CONTEXT_for_Gemini.md`. README rewritten to sober prose.
- 2026-07-23: §6 expanded into a full repository tour (every file described + teammate onboarding quickstart) so a teammate can drop the folder into Claude and start immediately.
