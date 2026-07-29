# _START_HERE — Claude context brief

> **To Claude:** When invoked on this idea/project, read ONLY this file first, then start. Open other docs only when this file points to them. After every idea-related session, update this file (esp. "Status", "Next", "Decision log").
> **Output language = Korean** (deliverables + chat). This brief is English for token economy only.
> Last updated: 2026-07-28 (PDT)

---

## 0. 30-sec summary

- **Topic:** AI agent cost governance. A layer that controls the LLM/tool/external-API spend an agent triggers on its own **in the request path, before execution**, and **explains (audit-grade) why it blocked**.
- **One-liner:** "Not a CCTV after the fire — a breaker before it ignites."
- **Form:** team project (user = **CEO**, also customer dev/GTM; teammate = tech originator). WTIA capstone = **investor pitch deck**.
- **User's real goal:** NOT to actually found a company. Goal = a **winning pitch** (stable + brilliant + Q&A-defensible), but the model must be realistic.
- **Biggest bottleneck:** formal customer interviews = **0** (1 screening Q&A done — US seed, anti-ICP). Every number (ACV/market/finance) traces back to this.

---

## 1. Locked positioning (2026-07 reset)

Old framing (small startups + cost-saving) collapsed under two rebuttals → switched to:

- **① ICP: small startups → mid-market/scaleup** ($50K–$500K/mo AI spend, 50–300 ppl). Test: "no engineers to build in-house like Meta, but bigger spend/audit pressure than a startup." Korean AI startups (라이너·뤼튼·채널코퍼레이션) = **free design partners**. (Reflected into `ICP/ICP.md` + candidate list on 2026-07-23.)
- **② Value: cost-saving → cost attribution/explanation (COGS).** "We cut your AI bill" ❌ → "We let you explain your AI unit cost" ✅. (Saving fights adoption incentives + negative ROI at small scale.)
- **③ Market story:** Korea = wedge, market = global agent infra. **Do NOT present LAM $80k as market size.**

---

## 2. Key evidence numbers (✅=pitch-citable / 🔵=source only / ⚠️=corrected / ❓=unverified)

- ✅ Enterprise AI budget overrun **79%** (DoiT 2026), **mid-size 81% > large 76%**
- 🔵 mid-market 가격 comps (7/24, 3자 추정): CloudZero % of spend 1~3% ($36–96k/yr) · Langfuse units ($10–40k) · Helicone requests ($5–20k) · Vantage spend-band ($9.6–24k). **"2~3% of spend" 앵커 실증 + 우리 $18k/yr = 시장 한복판.** Detail: `Solution/mid-market-가격-comps.md`
- ✅ AI Gateway market $2.4B→$15B (2035), CAGR **~20%**
- ✅ **TAM/SAM/SOM 재산정 (7/27, Perplexity 교차검증):** TAM ≈ **$0.7B~2.5B (2026)** → $3B~8B(2030). 두 렌즈 수렴 — 렌즈A(관리 지출 × 2~3% take rate; Gartner GenAI $28.3B / 넓게 $60~84B) = 피치 메인, 렌즈B(직접 카테고리: AI FinOps $0.7B·LLM 비용최적화 $1.1B·LLMOps $4~7B) = 교차확인. SAM ≈ **$0.3B~0.6B** (ICP부합 1만~2만곳 ⚠️ × ACV **$30K = 경쟁사 mid-market ACV 중간값 평균**: CloudZero $66k·Langfuse $25k·Vantage $17k·Helicone $13k). SOM ≈ **3년 $1.5M~4.5M ARR** (미 유료 50~150곳). 성장기울기 = 엔터프라이즈 에이전틱 CAGR **46%** · 토큰 2030까지 **24배**. **take-rate 2~3% = FinOps 업계 실측(1~3%)로 방어됨.** Detail: `Market/TAM-SAM-SOM.md`
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
- **Solution slides 6–8 = drafted** in `Pitch/스토리라인-통합-Problem-Solution.md` (COGS-lead flow; tech reworded to in-path policy engine / semantic attribution / dynamic routing = by-product; moat = data accumulation). Still needs interview numbers. Ask amount/use TBD.
- **3 mandatory rebuttals:** "just buy tokens" / "build it yourself" / "what if OpenAI does it" (answers §1·§3). +1 pending: unified OSS-only rebuttal (team agenda ④).
- **Finance slide = revenue (hockey stick) only. Drop cost/net income** (7/21 class). Purpose = land a 2nd meeting.
- **BM/pricing locked (logic only, 7/24):** per-agent lead + flat platform base + COGS/cost-center premium. Subscription-led (Model A) = main, usage-led (Model B) = documented alt. Value metric ≠ spend → avoids take-rate rebuttal; agent-count expansion → net-negative churn. All numbers ⚠️ hypothesis (anchor: 2-3% of governed AI spend). Docs: `Solution/비즈니스모델-가격.md` (tiers, 2 models, 6-qtr roadmap, 3yr financial skeleton) + `Pitch/슬라이드-BM-가격.md` (deck slide copy: BM/pricing/finance/rebuttals, sits after Moat slide 8) + interview guide §4-3 Q-P1~5 (pricing validation, Mom-Test framed). Buyer confirmed = **CTO (economic buyer)**, finance = influencer only — COGS pivot did NOT change buyer.
- **20-min discipline:** target 10-min talk (filling all 20 = penalty) + 8–10 min Q&A (score via the rebuttals).
- Traction: with 0 interviews, substitute **"N design partners + interview findings"**, target metric = net-negative churn.

## 4-1. Schedule (backward)

- **8/6, 8/10 pitch practice · 8/11–12 final pitch** (4 judges, 20-min blocks).
- 8/13 program ends (networking happy hour). Next week = Tech Week.
- **D-day = 8/6.** Before it: ① lock solution ② interviews ③ deck draft.

---

## 5. Status & next

**Status:** Problem · Why Now · competition · ICP · personas · market research (verified) · positioning reset · pitch-narrative worksheet = done. **Pitch storyline (Problem→Solution, slides 3–8) + COGS dashboard prototype + Seattle-VC pitch script (Notion) + mentor-Q&A brief for Gemini = done (7/23).** Interviews: 0 formal, 2 screening Q&A (US seed — anti-ICP confirmed, `Interview/2026-07-21-미국-시드-에이전트-플랫폼-개발자.md`; **라이너 Lead ML Eng — 7/27, `Interview/2026-07-27-라이너-리드-ML-엔지니어.md`: 비용 구조 상세 확인, 단 "다중 호출=추적 가장 까다로움" 가설에 부분 반증 뉘앙스(엔지니어는 서버 용량 기준 추정 가능한 문제로 봄) + build/buy가 비용 구조 1차 분기 확인. 후속 질문 5종 준비 — pain·attribution 행동 데이터가 아직 0**). **Outreach sending started 7/23** (달파 email, 라이너 LinkedIn — `Interview/아웃리치-파이프라인.md`). **Solution form: Option C "trust ladder" CONFIRMED by team (7/23 team meeting — teammate agreed to premise 2 "proxy-first is a dead path"**; design doc: `~/.gstack/projects/jmormalik-WTIA_AI_Cost_Gov/taewonki-main-design-20260723-135451.md`). **CEO plan done (7/23 plan-ceo-review):** parallel tracks (user = deck+interviews / teammate = Cost Autopsy demo), deck scope + 2-week checkpoints locked — plan: `~/.gstack/projects/jmormalik-WTIA_AI_Cost_Gov/ceo-plans/2026-07-23-trust-ladder-pitch-deck.md`. **New-ICP propagation done (7/23):** `ICP/ICP.md` rewritten (paid target = mid-market / Korean startups = free design partners), candidate list reclassified. **US mid-market research done (7/24):** 15 new verified candidates added to candidate list ("미국 중간 시장 본선" section; Top 5 = Regal · Maven AGI · Infinitus · Rogo · Pylon — all usage/per-unit-priced or with public multi-model-routing/token-spend evidence).
Repo `WTIA_AI_Cost_Gov` (github.com/jmormalik/WTIA_AI_Cost_Gov, SSH) live on origin/main. Notion 검증본 enriched. Context files (CLAUDE.md, _START_HERE.md) in English (Korean output rule unchanged).

**2026-07-28 (demo):** The pitch demo is built and lives in `deliverables/`. **`DEMO_최신_이걸_더블클릭.html`** — double-click it; no server, no install, no network (React + Tailwind + icons + hand-written charts all inlined, 201KB). Source: `deliverables/DEMO_최신_소스코드.jsx`. Superseded versions moved to `deliverables/_구버전/` — do not run those. Two tabs: (1) **COGS attribution** stacked by **LLM API / Search Tool / External Database** — 41% of COGS is non-LLM, 2 accounts served at a loss; (2) **Live Breaker** — a runaway agent logs once a second until the Hard Limit toggle refuses the *next* call at the $50 ceiling with an audit-grade reason (refusal at the gate, not an after-the-fact alert). All numbers are simulated and internally reconciled — swap them once interview data lands. ⚠️ **Cross-check against the 7/27 라이너 screening:** that engineer reads multi-call cost as estimable from server capacity, i.e. partly pushes back on the premise behind tab 2. Re-test that beat before it goes into the deck.

**Next (priority):**
1. ~~Lock Option C~~ → **done (7/23 team meeting)**. Remaining team agenda to confirm: ② Cost Autopsy 48h prototype resourcing (sample-log deadline 7/31) ③ new slogan ("차단기를 팔기 전에 장부부터") adoption ④ unified OSS-only rebuttal.
1-0. **Deck execution checkpoints (CEO plan; detail in plan file):** 7/25 guide hypothesis-1 reflected → 7/28 slides 6·7 draft → 7/31 sample-log deadline → 8/1 E1·E2·E6 drafts → 8/3 weekly sync (E3·E4 gate call) → 8/5 team rehearsal (10-min discipline + 4 rebuttals) → 8/6 pitch practice #1.
1-1. **Add hypothesis 1 to interview guide (deadline 7/25, before outreach replies)** — "Is COGS explanation/attribution an always-on need?": (i) recurring engineer hours (ii) CFO/board actually consumes the numbers (iii) wrong-number incident cases — 5+ survive / 3− reject / 3–4 → add 5 more, re-judge once. Add behavioral metric **"would you hand over logs?"**.
2. **10–15 interviews** — life/death Qs: "what % of spend is tools/external API?" (= hypothesis 0, formalized with judgment rule, guide §4-2 Q-H0) + "willing to put a proxy in the path?" + "at what spend level buy vs build?". Guide heavily updated 2026-07-23 — re-read before interviewing. Then swap illustrative numbers in storyline/dashboard/pitch-script for real data.
3. **Team check:** does the screening requirement (revenue mainly paid/B2B) conflict with "Korean startups = free design partners"? Decide tagging paid-validation samples vs design-partner candidates in one pipeline.
4. **US mid-market outreach** — ~~research~~ done (7/24, 15 candidates listed). Next: verify `[재확인]` items before sending, then LinkedIn outreach starting with Top 5 (Regal · Maven AGI · Infinitus · Rogo · Pylon; English guide questions).
5. **Week5 homework** (2 revenue models · pricing hypothesis · 6-quarter roadmap · 3–5yr financials) — **BM logic done (7/24) in `Solution/비즈니스모델-가격.md`**; remaining = swap ⚠️ hypothesis numbers (ACV/NRR/WTP) for interview data via the 5 validation targets in §8, then port into homework template (`_class-materials/`, git-ignored).
6. **Assemble pitch deck (.pptx)** — **English .pptx generated (7/28) for both narrative versions:** `deliverables/Pitch_Deck_VersionA_Market-Shift_EN.pptx` (pure Market Shift) + `deliverables/Pitch_Deck_VersionB_Hero-Hybrid_EN.pptx` (Hero×Shift, Sarah persona). **Product name = Kyber (locked 7/28).** Both = 16 slides, dark theme, shared body (6–15) + version-specific openings (2–5) & vision close, defense-doc ⚠️ bets labeled, speaker notes embedded. **Pricing/finance numbers now research-backed (7/28 deep research → `Solution/가격-재무-딥리서치-2026-07.md`):** ACV $30K ✅validated (competitor median), take-rate anchor CORRECTED 2-3%→**~1-2%** (0.75-3% actual), NRR 110% reframed as top-quartile target, ARR curve kept but labeled aggressive + customer counts (8→45→160) added. Generator script (python-pptx) in scratchpad. **Demo to embed (slide 7) = `deliverables/DEMO_최신_이걸_더블클릭.html`** (React build, ready, offline-safe). Remaining gaps: team name, traction real data, Ask amount, team "why us" line, per-interview price precision (Q-P2).

---

## 6. Repository tour (teammate onboarding — read this to work any file)

> **New teammate quickstart:** (1) Drop the whole repo folder into Claude (Cowork/Project). (2) Claude reads THIS file first (rule at top) — that alone loads full context. (3) Output language = Korean; industry terms stay English. (4) Role split: 태원 = tech/product, 재민(Malik) = CEO · customer dev · GTM · research. (5) Every doc separates ✅ verified facts from ⚠️ hypotheses; never edit interview quotes. (6) At session end, Claude updates §5 Status/Next + §7 Decision log here. (7) `_class-materials/` is git-ignored — a fresh git clone won't have it; that's fine, it's local reference only.

Below: every tracked file, what it is, and when to open it. Open a file only when the task needs it (token economy).

**Root files**
- `_START_HERE.md` — this master brief. Always read first; single source of truth for context.
- `README.md` — public-facing repo intro (what the repo is, dir map, positioning). Sober tone for outside readers.
- `CLAUDE.md` — working rules for Claude in this repo (Korean output, dir conventions, cross-doc consistency, session-start rule, skill routing).
- Root now holds only nav/config: `_START_HERE.md`, `README.md`, `CLAUDE.md`, `.gitignore`, `.mcp.json`. **Topic docs moved into folders 2026-07-24** (see §7). Task list = §5 Next (old `TODOS.md` deleted).
- `_archive/` — git-ignored local archive. Holds `WTIA_AI_Cost_Gov_Moat_Why_Now_v1.md` (rejected Gemini Why-Now/Moat draft; cost-saving lead + "kernel/C++" framing rejected — see §7 2026-07-23). Won't appear after a fresh clone.

**`Problem/` — problem definition & timing**
- `문제-정의.md` — core problem hypothesis + the sub-hypotheses interviews must verify.
- `why-now.md` — timing argument + real incident cases ($4.2K single dev → $500M enterprise; $47K/11-day runaway loop).
- `리스크-분석-및-대책.md` — 5 fatal risks + counters. Open before any competition, rebuttal, or GTM work.

**`ICP/`**
- `ICP.md` — ideal customer profile. **Rewritten 2026-07-23:** §1 paid target = mid-market/scale-up ($50K–$500K/mo, 50–300 ppl, can't build in-house), §2 Korean AI startups = free design partners, reversed switch triggers.

**`Buyer-Persona/`**
- `01-CTO-공동창업자.md` · `02-AI-리드-챔피언.md` — the two decision-maker personas (goals, pains, buying triggers). Mid-market adds CFO/finance as economic stakeholder behind them.
- `이해관계자-맵.md` — Power × Interest stakeholder map.

**`Solution/`**
- `포지셔닝-재설정.md` — the LOCKED positioning (mid-market × COGS attribution). Foundational — read with §1 of this file.
- `moat-후보.md` — moat candidates; principle "feature gap ≠ moat" → data accumulation (unit economics, benchmark).
- `비즈니스모델-가격.md` — **LOCKED BM (2026-07-24):** per-agent 구독 + 정액 기본료 + COGS/cost-center 프리미엄. Tiers, 2 revenue models, 6-qtr roadmap, 3yr financial skeleton, interview validation targets. (Deck copy → `Pitch/`.)
- `mid-market-가격-comps.md` — public pricing comps (CloudZero/Vantage/Langfuse/Helicone) anchoring the "2–3% of spend" price logic. 🔵 3rd-party estimates, cite as ranges.

**`Pitch/` — 무대용 (deck slide copy + live-pitch support)**
- `피치덱-통합-아웃라인.md` — **MASTER deck outline (2026-07-24):** all 16 slides + Q&A backup, paste-ready for Gamma/Slides. Assembles storyline + BM + market/competition/moat/GTM/traction/team/Ask. Start here for .pptx assembly; lists the 6 gaps to fill before 8/6.
- `스토리라인-통합-Problem-Solution.md` — pitch Problem→Solution slide flow (slides 3–8; COGS-lead, savings as by-product, tech reworded to defensible terms).
- `슬라이드-BM-가격.md` — BM·가격·재무 slide copy (sits after Moat slide 8; per-agent model + pricing card + hockey-stick finance + pricing rebuttals).
- `Pitch/MENTOR_QA_CONTEXT_for_Gemini.md` — English brief to paste into Gemini during live mentoring (translate a mentor question + recommend an answer in locked positioning).

**`Competitor-Analysis/`**
- `경쟁사-분석.md` — competitor profiles + funding. `기능-비교-매트릭스.md` — feature matrix (source of moat candidates). `전략-캔버스.md` — strategy canvas.

**`Market/`**
- `TAM-SAM-SOM.md` — market sizing (⚠️ under revision — do NOT present the old LAM $80K as market size).
- `Market/시장조사.md` — cross-verified market & competition write-up (moved from root 2026-07-24). Each figure tagged pitch-citable vs caution. Main evidence source.

**`Interview/` — 0 formal records, 1 screening (the #1 bottleneck)**
- `인터뷰-가이드-Mom-Test.md` — Mom Test question guide (§4-2 hypothesis-0 items; heavily updated 7/23).
- `인터뷰-후보-리스트.md` — target list, reclassified 7/23 to new ICP (Korea = design partners / US = main paid-ICP track).
- `아웃리치-이메일-초안.md` — outreach drafts (KR/US LinkedIn templates included). `아웃리치-파이프라인.md` — per-company outreach tracker (sending started 7/23).
- `연습-페르소나.md` — 5 fictional personas for interview role-play practice.
- `2026-07-21-미국-시드-에이전트-플랫폼-개발자.md` — anonymized screening record (anti-ICP data point). New records: `YYYY-MM-DD-target.md`; never alter original quotes.

**`deliverables/` — submittable outputs**
- **`DEMO_최신_이걸_더블클릭.html`** — THE pitch demo. Double-click it; no server, no install, no network (React + Tailwind + icons + hand-written charts all inlined, 201KB). `DEMO_최신_소스코드.jsx` — its React source, not runnable on its own. `_구버전/` — superseded demos (static 4-tab HTML with the presenter script; the 2026-07-23 mockup), kept for reference only, see the README in there.
- `Pitch_Narrative_Worksheet_채움.docx` — filled pitch-narrative worksheet. `Week3_숙제_-_ICP___경쟁사___시장규모_채움.docx` — Week3 homework. `Competitive_Analysis_AI_Cost_Governance.xlsx` — competitor comparison sheet.
- `README.md` in this folder repeats the above in Korean — it exists so the right file is obvious from Finder alone.

**`_class-materials/` (git-ignored — local only, may be absent after clone)**
- Lecture decks (`7.21/7.23/7.24 ... .pptx`), mentor PDF (`18-F-0203 ... .pdf`), blank homework templates (`Week 5 ... .docx`, `Financial Forecast Template ... .xlsx`), `Traction_Slide_Examples_B2B.pptx`. Reference only; do not commit.

**External**
- **Notion hub:** https://app.notion.com/p/3a4b5f428bfd81eea734fbb1b73c86c2 — sub-pages include the verified market page, positioning-reset page, and the pitch script "🎤 피칭 대본 — 데이터 축적 해자". Notion is the shareable mirror; this repo is the working source.
- **gstack local docs (not in repo):** design doc + CEO plan under `~/.gstack/projects/jmormalik-WTIA_AI_Cost_Gov/`.

---

## 7. Decision log (chronological — append each new decision)

- 2026-07 early: original solo idea = fake-news detector API (archived). Shelved for legal risk (copyright/defamation) + "defining truth" problem.
- 2026-07: joined team → pivot to AI agent cost governance. User role = customer dev/GTM.
- 2026-07-22: positioning reset (mid-market × COGS). Basis = Meta case + ROI/build-in-house rebuttals.
- 2026-07-22: market research cross-verified, tags applied. 79% · CAGR20% · Uber · mid-size 81% · COGS20% = locked as pitch-citable.
- 2026-07-23: dir cleanup — class materials → `_class-materials/` (git-ignored), our outputs → `deliverables/`. README + .gitignore set. GitHub repo created (SSH), teammate invited, pushed to origin/main.
- 2026-07-23: Notion 검증본 page enriched to full white-paper depth. CLAUDE.md + _START_HERE.md converted to English for token economy (Korean output rule unchanged).
- 2026-07-23: Rejected Gemini Moat/Why-Now draft's cost-saving lead + "kernel/C++" framing; confirmed COGS-lead + data-accumulation moat. Added: `Pitch/스토리라인-통합-Problem-Solution.md`, `deliverables/_구버전/ai_cost_gov_dashboard_prototype.html` (+ Cowork artifact), Notion pitch-script sub-page, `Pitch/MENTOR_QA_CONTEXT_for_Gemini.md`. README rewritten to sober prose.
- 2026-07-23: §6 expanded into a full repository tour (teammate onboarding quickstart).
- 2026-07-23: **가설 0 신설** — "툴/외부API 비용이 COGS의 15%+ 인 세그먼트가 존재하는가"를 선행 가설로 공식화. 판정식(비중 15%+ AND 월 지출 $2K+ 또는 툴콜 $300+/월, 6건 중 3건+ 생존), 문항 배치 규칙(라포 후반), "분리 불가" 응답의 이중 기록(결측 + 귀속 미성숙 증거) 포함. 인터뷰 가이드 §4-2 반영.
- 2026-07-23: **기밀 규칙** — 인터뷰 기록의 외부 공유 시 회사·인물 식별 정보와 구체 숫자는 익명화·범위화. 이 저장소는 PUBLIC이므로 개인 단위 원자료(원문 인용·실명 추적표)는 로컬 보관, 저장소에는 익명화·집계본만.
- 2026-07-23: 아웃리치 발송 시작 (달파 이메일 + 라이너 링크드인). 검증 스프린트 6주 설계 (판정 2026-09-02).
- 2026-07-23: 역할 명확화 — 사용자 = **CEO**(고객개발·GTM 겸임). 팀 미팅 주재·최종 의사결정 권한은 사용자에게 있음.
- 2026-07-23 (오피스아워): **솔루션 형태 C안 "신뢰 사다리" 잠정 채택** (팀 확정 대기) — 1단 경로 밖 리포트(유료) → 2단 비동기 정책 → 3단 고객 소유 게이트웨이 플러그인 차단(우리는 경로를 소유하지 않음). 근거: 1차 증거 0건이므로 복구 비용 비대칭 + "critical path엔 OSS만" 신호 + 8/6 덱 요구. B안(프록시 선행) 기각. **가설 1 신설**(COGS 상시 니즈, 반증 판정식). 인터뷰 측정 지표에 "로그를 넘기겠는가" 추가. 슬로건 재작성 제안(팀 합의 대상). 독립 2차 소견·적대적 리뷰 2R(14건 반영, 8/10) 통과.
- 2026-07-23 (팀 미팅): **C안 "신뢰 사다리" 팀 확정** — 팀원(기술)이 전제 2("인라인 강제층은 무료 OSS가 status quo, 프록시 선행은 죽은 길")에 동의. A안 폴백 절차 종료. 잔여 안건(②Cost Autopsy 리소스 ③슬로건 ④OSS-only 답)은 확인 대기.
- 2026-07-23 (CEO 리뷰): **피치덱 실행 경로 = 병렬 트랙 채택** (덱-우선·데모-우선 기각) — 사용자는 덱+인터뷰, 팀원은 데모, 데모 실패가 덱을 막지 않는 구조. 덱 스코프: E1 "탈락 데이터" 트랙션 재프레임 · E2 반론 백업 3장 · E3 로그 깔때기 카운터(8/3 판정: 의향 ≥2건 게재) · E4 Cost Autopsy 리포트 1장(2중 게이트: 미팅 승인 ≤7/28 + 로그 7/31, 8/3 실물 없으면 제거) · E6 Meta↔솔루션 연결 문장 채택, E5 Week5 BM 선정렬은 유예(방향만 확정: 절감액 연동 금지, 정액+티어). 팀 미팅 안건 3→4개(+OSS-only 반론 통합 답), 기한 7/26 · 무응답 시 7/28 정오 A안 폴백 간주. 덱 게재물에 기밀 규칙 명시 적용(회사명 노출 금지·범위화).
- 2026-07-24: Perplexity API adopted for candidate discovery, run from the user's Mac (`scripts/`). **Rule learned: one long brief → the model fills the table from memory.** Split into narrow queries with row caps, "an empty table is an acceptable answer", and a per-query dump of the real `search_results`; treat any table whose source list is empty or off-topic as fabricated. Second rule: a **Korean-worded query searches Korean sources even for US targets** — write US queries in English.
- 2026-07-24: Contact channels collected for all 4 verified candidates (LinkedIn + email where public) and written into `Interview/인터뷰-후보-리스트.md`; a Notion sub-page mirrors it. **Headcount reality check: only 인핸스 (81, Series B ₩17B) sits inside the 50–300 ICP band** — Retell 40, Leaping 11, 딥세일즈 10. The latter three are kept for pain-structure evidence, not as buyers. Retell headcount corrected: YC directory says **40**, which IS citable; only the "ARR $60M" figure stays banned.
- 2026-07-24: 4 candidates verified against primary sources and added to `Interview/인터뷰-후보-리스트.md` (인핸스, 딥세일즈, Leaping AI, Retell AI). **Do NOT cite** Retell's "35명 / ARR $60M" (getlatka estimate) or Enhans' "50개국 · 매출 100억" (YouTube interview only). Dev agencies (Contus Tech, Intellectyx, LuMay) and YC-list noise (A1Base, Verbiflow, General Agency, BlindPay, Vantel, Augento) rejected. Wildcard (YC W25) reclassified as an adjacent gateway player → `Competitor-Analysis/`. AIIA "국가대표 AI 100" source is exhausted.
- 2026-07-24 (오피스아워 BM): **수익모델 잠금** — value metric = **per-agent(감시 에이전트 수)** 리드 + 정액 기본료 + COGS/cost-center 프리미엄. 근거: 4개 테스트(take-rate 회피·확장·계량성·구매자 정렬) + 신뢰 사다리 1단계 경로 밖이라 call-volume 과금 불가 → per-agent가 유일 생존. **수익모델 2개**: A 구독 리드(메인)·B 사용량 리드(병기). spend-band/call-volume/per-seat/flat = 리드 지표 탈락. **구매자 정정:** COGS 피벗이 구매자를 CFO로 바꾼 게 아님 — 경제적 구매자 = **CTO 그대로**, 재무는 mid-market 영향자. 이중 메트릭(per-agent=챔피언, COGS=CTO)이 이중 이해관계자에 매핑. 산출: `Solution/비즈니스모델-가격.md`(티어·2모델·6분기 로드맵·3년 재무 스켈레톤·인터뷰 검증 타겟 5개). 모든 숫자 ⚠️가설(앵커: 관리 AI 지출 2~3%).
- 2026-07-24 (저장소 정리): 디렉토리 재구성 — 루트 잡동사니를 폴더로 이동(`시장조사.md`→`Market/`, 덱 슬라이드 카피·멘토 브리프→신설 `Pitch/`), `Solution/`은 전략 문서만 남김(포지셔닝·moat·BM·comps). 기각된 Gemini 초안(`WTIA_..._Moat_Why_Now_v1.md`)→`_archive/`(git-ignored, 이력만 보존), 완료된 `TODOS.md` 삭제(태스크는 §5로 일원화). 인터뷰 가이드의 깨진 링크(`재포지셔닝-옵션-과금-인프라.md` 부재 → `비즈니스모델-가격.md`로 재지정) 수정. 모든 교차링크·README·§6 투어·CLAUDE.md 디렉토리 규약 갱신. `.mcp.json`(Perplexity MCP, 비밀키는 `~/.zshenv`에 있어 파일엔 없음) 커밋.
- 2026-07-23 (신 ICP 전파): `ICP/ICP.md` 전면 재작성(유료 타겟 = 중간 시장 §1 / 한국 = 무료 디자인 파트너 §2 / 전환 트리거 역방향 재작성) + `Interview/인터뷰-후보-리스트.md` 신 ICP 재분류(본선: Clay·Cresta·Hebbia 승격 / 경계선: Decagon·EvenUp / 초과: Harvey·Sierra 등 = 레퍼런스 소스). "AX 전환 중견기업" 표현은 anti-ICP와 혼동 위험으로 사용 금지, "비치헤드" 대신 "무료 디자인 파트너"로 표기. 미국 중간 시장 신규 후보 리서치 착수.
- 2026-07-27 (서사 전략 **확정**): 강의(5개 서사 구조) × office-hours 진단 교차 후 → **CEO 결정 = 순수 The Market Shift 채택**(하이브리드 기각). 로켓십·어벤저스 탈락(트랙션 0·팀 리드 약점). 순수 구조의 두 리스크는 별도 구조 없이 흡수: ①blink test = slide 4 Villain에 구체 사건($47K·11일)을 증거로(히어로 콜드오픈 아님) ②강사 절대조건 "시프트=반박 불가" = 시프트 주장을 slide 2 한 층("에이전트가 스스로 지출 결정")으로 제한, 논쟁적 주장(자체구축 불가·상시 니즈·mid-market이 산다)은 vehicle/customer 층 ⚠️베팅으로 분리(`덱-방어력-봉합안.md`와 정합). 2인 A/B는 선택(8/6 연습 한정). 문서: `Pitch/서사-전략.md`.
- 2026-07-27 (office-hours 덱 방어력): 채택 = **B안 "덱만 정직하게 봉합"**(인터뷰 무의존). 진단: 하중벽 3개(자체구축 불가·상시 COGS 니즈·mid-market이 산다)가 전부 ⚠️가설 + 유일 1차 신호(라이너)가 그중 하나를 밀고 있음. 봉합안 = `Pitch/덱-방어력-봉합안.md`(slide 4 급성/만성 2층 분리·slide 8 "추정 가능≠감사등급 귀속" 반론 선제·slide 14 "탐색 규율" 재프레임·Q&A 2행 추가). **🚩 미해결:** Team 슬라이드[15] 역할 불일치(덱=태원 기술/Malik CEO vs 메모리=태원 CEO) — 팀 확정 필요.
- 2026-07-27 (라이너 스크리닝 회신): 라이너 Lead ML Eng이 링크드인 문답에 성실 회신 → `Interview/2026-07-27-라이너-리드-ML-엔지니어.md` 신설. **소득:** ① 비용 구조 상세(크롤링=수집 로직 고정·사용자 무관 / 검색·리랭킹=서버 요청 용량 기준 / 리랭킹=별도 인프라·별도 비용 / 외부 검색 API=요청당 과금·토큰 아님) ② build/buy가 비용 구조 1차 분기라는 현업 확인. **경고:** "다중 호출=추적 가장 까다로움" 가설에 부분 반증 뉘앙스 — 엔지니어에겐 추적 곤란이 아니라 **서버 용량 기준 추정 가능한 문제**로 보임. **자기비판:** 가설을 직접 물어(Mom Test 위반) pain·attribution 행동 데이터가 0으로 남음. 후속 질문 5종 준비(1순위 = build/buy 현황·계기 + 월말 기능/팀/고객별 원가 실제 산출 경험). 다음 라운드는 과거 행동·구체 사건으로만 물을 것.
- 2026-07-27: Interviews delegated to a teammate; user's track = demo + deck. Built the interactive demo twice — first a static single-file HTML, then (at the user's request) a **React version** (React 18 + Recharts + Lucide + Tailwind, bundled with esbuild into one offline HTML so it opens with no network at the venue). Delivered as `deliverables/DEMO_최신_이걸_더블클릭.html` + `deliverables/DEMO_최신_소스코드.jsx`, and the Cowork artifact `ai-cost-gov-demo` now points at the React build. Demo doctrine confirmed: the pitch beat is **attribution across the whole execution path** (LLM + tool + external API, 41% non-LLM) and **refusal at the gate**, not an after-the-fact alert. `.pptx` deck still does not exist.
- 2026-07-27 (later): React demo **visually rebuilt to a premium enterprise standard** (Vercel/Linear/Stripe register) after the first pass read as a generic template. Zinc-950 canvas, translucent `border-white/[0.07]` cards with `shadow-lg`, `backdrop-blur-xl` header and tooltips, ambient radial wash, muted-grey log timestamps, `strokeOpacity={0.1}` chart grid, ~1.5x internal padding. Palette reduced to a neutral grey LLM band plus **two** accents (muted violet = Search Tool, muted teal = External Database) so the 41%-non-LLM claim is legible from the chart alone: grey is what the invoice already shows, colour is what nobody attributes. Both verification flows still pass (exact BLOCKED string, log stops, legend labels intact, no console errors). Files and artifact re-delivered.
- 2026-07-27 (later 2): **Recharts removed entirely.** The bundled HTML had grown to 626KB (~430KB of it Recharts + its d3 deps) and the Cowork artifact panel rendered it as a blank screen — the file itself was healthy and opened fine in a normal browser, so the ceiling is the artifact viewer's payload size, not the code. The three charts (stacked bars, donut, burn line) were rewritten by hand — bars as positioned HTML/CSS, donut and burn as plain SVG — cutting the file to **201KB**, which renders. Design and behaviour are unchanged; `DEMO_최신_소스코드.jsx` is still one self-contained component (878 lines) since the chart code was spliced back in. **Rule learned: keep any artifact-bound single-file build well under ~600KB; a heavy charting lib is almost always the reason it blows past that.** Both verification flows re-run and pass (`bars: 6`, exact BLOCKED string, log stops, no console errors).
- 2026-07-27 (later 3): `deliverables/` was getting hard to read — three HTML files sat side by side with no clue which was current. Superseded demos moved to `deliverables/_구버전/` (with a README saying not to run them), and the live pair renamed to **`DEMO_최신_이걸_더블클릭.html`** / `DEMO_최신_소스코드.jsx` so the runnable file is unmistakable from Finder. `deliverables/README.md` added. All references in this file updated. **Rule: only one demo file lives at the top of `deliverables/`; anything superseded goes straight to `_구버전/`.**
- 2026-07-28 (제품명 + 가격/재무 딥리서치): **제품명 = Kyber 확정.** 영어 피치덱 2버전(A 순수 시장전환 · B 히어로혼합, 각 16장) 생성 → `deliverables/Pitch_Deck_Version*.pptx`. **가격/재무 딥리서치**(Perplexity high-context, deep-research 워크플로우는 스키마 실패로 폴백) → `Solution/가격-재무-딥리서치-2026-07.md`. **핵심 교정 4건:** ① 🚩 **take-rate 앵커 2~3%→~1~2%** — FinOps 실측은 0.75~3% 스펙트럼, 실거래 0.5~2%에 몰림(Cloudability 공식 0.75~3%·CloudZero 0.5~1%·Finout ~1%·**Vantage=take-rate 아님/정액**). 옛 근거의 "Vantage 1~3%"는 오류. 2~3%는 상한값. TAM 렌즈A 미드포인트 보수화(TAM-SAM-SOM.md에 교정 배너). ② ✅ **ACV $30K = 실증 방어**(옵저버빌리티 $5~25K < 우리 $30K < FinOps $30~130K). ③ ⚠️ **NRR 110~120% = 상위 사분위 목표**지 중앙값 아님(SaaS Capital: ACV$100K+ 상위25%=118~120%, B2B 중앙 82~97%) → "목표" 프레임. ④ ⚠️ **3년 ARR 램프 = 신뢰 가능하나 공격적**(5.6배·3.6배, 강한 실행 케이스) → 고객 수 8→45→160 병기로 sanity check. ✅ per-agent 과금 선례(Agentforce·Datadog per-host) 확보 = BM 서사 보강. 덱 slide 9·12·16 + 발표노트 반영 완료.
- 2026-07-27 (TAM/SAM/SOM 재산정): `Market/TAM-SAM-SOM.md` 전면 재작성 — Perplexity 교차검증(TAM은 리서치 완료, SAM/SOM 재료는 실측 앵커 기반 추정). 옛 버전(스타트업×절감, ACV $4K, LAM $80K) 폐기 → 신 포지셔닝(미들마켓×COGS, per-agent BM) 반영. **방법론:** TAM=탑다운 2렌즈, SAM=바텀업(기업수×ACV), SOM=바텀업(3년 GTM). **결과:** TAM $0.7B~2.5B(2026)→$3B~8B(2030) · SAM $0.3B~0.8B · SOM 3년 $1M~5M ARR. **피치 프레임 결정:** 렌즈A(관리 지출 × 2~3% take rate)를 메인 제시 — take-rate 2~3%가 FinOps 업계 실측(Cloudability 2~3%·CloudZero 1~2%·Vantage 1~3%)이라 "왜 2~3%냐" 반론 방어됨 + 우리 BM 가치지표와 직결. 렌즈B(직접 카테고리 $0.7B~1.1B) = 교차확인용 병기. Why-Now 근거 = 엔터프라이즈 에이전틱 CAGR 46%·토큰 2030까지 24배. **⚠️ 미검증:** SAM 모집단(ICP부합 1만~2만곳)은 여전히 가설 — 인터뷰 스크리닝 통과율로 정밀화 필요. **ACV = $30K로 확정** (경쟁사 mid-market ACV 4개 중간값 평균: CloudZero $66k·Langfuse $25k·Vantage $17k·Helicone $13k → $30k; 우리 Growth $18k↔Enterprise $60k 블렌디드 중앙과 정합). 인터뷰 Q-P2로 실측 대체 예정.
