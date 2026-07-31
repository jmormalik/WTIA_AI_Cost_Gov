# 2026-07-31 — Briefcase AI Founding Engineer Sarah Chen (모의 인터뷰)

> ⚠️ **가상 인물·가상 회사** — 연습-페르소나.md 페르소나 4 기반 모의 인터뷰. 영어 진행.
> - **형식**: Video call (약 35분)
> - **대상**: US YC startup, paid B2B research agent, monthly spend $14K
> - **스크리닝 판정**: 통과 (paid B2B ✓, tool-call ✓, monthly spend $14K ✓)
> - **목적**: 가설 H0 검증 ("툴/외부API 비용이 COGS의 15%+ 인 세그먼트가 존재하는가") + H2 귀속 격차 탐색

---

## Interview Dialogue (English)

### Screening & Warm-up (Q1–Q4)

**I:** Sarah, thanks for taking the time today. I appreciate it. Before we dive in — can you give me a quick rundown of what Briefcase AI does and what your role is day-to-day?

**S:** Sure. Briefcase is a research agent for B2B sales teams. You connect it to a prospect list, it goes and pulls company data — news, filings, LinkedIn signals — and surfaces the stuff that matters before a call. I'm one of the founding engineers, so I touch everything: infra, agent pipeline, the occasional customer support ticket when something blows up.

**I:** How long have you been running this in production?

**S:** About fourteen months. We went paid around month four.

**I:** And ballpark — how many paying customers right now?

**S:** Around forty teams. Somewhere between thirty-eight and forty-two, depending on which week you ask — some churn on annual renewal.

---

### Workflow Deep Dive (Q5–Q9)

**I:** Walk me through what happens technically when a user runs a research job. What fires, in what order?

**S:** User submits a batch — usually a list of companies. We fan out to a few data sources: a web search API for fresh news, a few enrichment databases for firmographic stuff, then our own scraper for the company website. That all feeds into a context assembly step, and then we hit the LLM to write the summary. Standard RAG-ish pipeline, nothing exotic.

**I:** When you say "a few data sources" — are those external paid APIs, or stuff you built in-house?

**S:** Mix. The web search is a paid API — we're on a mid-tier plan so it's not crazy. The scraper is ours. Firmographic enrichment is third-party, per-request pricing.

**I:** When a job finishes, does your system give you any visibility into what it cost to run — like, broken down by step?

**S:** We have logging, sure. We track LLM tokens pretty carefully because that's the big one. The API calls we basically know from the plan pricing — it's predictable enough that we don't sweat it in real time.

**I:** What does "track pretty carefully" look like? Like, do you have a dashboard, or is someone pulling from logs?

**S:** We've got a small internal Grafana setup. Token counts per job, model breakdown — we use a couple different models depending on task. I built it myself over a weekend. It's good enough for now.

**I:** Has tracking tokens per job ever led you to actually change something — like a pricing decision, or cutting a model?

**S:** Yeah, once. We noticed one customer's jobs were averaging 3x the token count of everyone else. Turned out they were feeding in massive prospect lists — way more than the product was designed for. We added a soft cap and bumped their plan. That's basically the only time the data drove a concrete action.

---

### Cost Structure Probe (Q10–Q13)

**I:** If you think back to last month — where did your AI-related spend actually go? Like, what were the rough buckets?

**S:** LLM calls, by a mile. That's tokens in, tokens out — summarization is verbose. Then a sliver for the search API, and a bit for the enrichment DB. If I had to put numbers to it... model costs are probably ninety-four percent of the bill. External APIs — search plus enrichment — are maybe six. And I'm rounding. The external API line is basically a rounding error.

**I:** That's useful — so roughly ninety-four percent tokens, six percent external APIs?

**S:** Yeah. The search plan we're on is actually pretty cheap for our volume. And the enrichment DB charges per-request but we batch aggressively so it stays flat. Neither is a thing I think about much.

**I:** Got it. Have you ever had a month where that ratio looked dramatically different — like a spike that threw off the budget?

**S:** The ratio itself? Not really. But we had a bad week in February where the *token* number went crazy. We had a prompt loop — one job got stuck, kept re-querying the LLM for the same company, something like six hundred iterations before our job timeout caught it. We burned about nine hundred dollars in a single day on that one job.

**I:** Nine hundred in a day from a loop — that's rough. How did you find out?

**S:** I got an alert from our cloud provider billing. Which, honestly, was way later than I would have liked — it was an end-of-day email summary, not real-time. By the time I saw it the job had already timed out on its own. So the fire was out, but the money was gone.

**I:** What would have been more useful — finding out earlier in that job's execution, or knowing which customer triggered it?

**S:** Both, but earlier in execution for sure. Knowing the customer was easy — we log job IDs. But if I'd had something that said "this job has used fifty dollars and hasn't finished yet, do you want to kill it" — that would have saved most of it.

**I:** Makes sense. Did you build anything after that incident?

**S:** We tightened the timeout logic and added a per-job token budget — like a hard ceiling. It's a config value now, not code. So yeah, we have something, but it's manual and fragile. I set the ceiling conservatively and it sometimes fires on legitimate big jobs.

---

### Attribution Gap Probe (Q14–Q15)

**I:** When a customer calls and asks "why did our bill go up this month" — can you answer that?

**S:** For the LLM side, yes — I can pull the token logs and say "you ran X jobs, average Y tokens per job, that's Z." It's a little tedious but it's there. For the external APIs, I'd just say "that's basically flat, it's not that." Which is true.

**I:** Is there any scenario where you'd want to know the external API cost *attributed to a specific customer or feature* — like, broken out in a way you could put in an invoice?

**S:** Honestly, not right now. The external API costs are small enough that it doesn't matter. If they were a meaningful chunk — like, if we were running something expensive per-call — I'd care. But for us, it's noise. The LLM tokens are where the money is, and we can roughly account for those already.

**I:** What would "meaningful chunk" look like, in dollar terms?

**S:** I don't know, maybe if it crossed ten percent of the bill? Right now it's nowhere near that. If a single API call was costing me a dollar and we're running a thousand jobs a day, that's a different conversation. But that's not our world.

---

### Closing (Q16–Q17)

**I:** Last two questions. If you could wave a magic wand and have one piece of information about your agent pipeline that you don't have today — what would it be?

**S:** Predictive cost before the job runs. Like — I submit a batch of three hundred companies, I want a number *before* I send it. Right now I can estimate based on average job size but it's rough. If I could say "this batch will cost forty-two dollars" with reasonable confidence, that would be great for quoting customers and catching weird inputs early.

**I:** That's useful. One more — is there anyone else you'd point me toward? Either someone at a company spending more on the AI infra side, or someone dealing with a harder version of this problem?

**S:** Maybe someone running a more complex multi-agent setup? We're pretty linear — one job, one pipeline. I've heard the attribution story gets way harder when you've got agents spawning sub-agents and the costs are interleaved. A company doing that at scale would probably have the pain you're describing more than we do. I could maybe intro you to someone from a YC batch we overlap with — they're doing agentic workflow automation, more moving parts. Want me to check if they'd be open to talking?

**I:** That'd be great, I'd really appreciate the intro. Thanks so much for your time today, Sarah — this was exactly the kind of honest picture I was hoping for.

**S:** Happy to help. Good luck with it.

---

## 이중 기록 (가설 0 부정 데이터)

- **Q-H0 응답:** 토큰 **94%** : 외부 API **6%**
- **판정:** 가설 0 **부정** — 외부 API 비중 6%, 15% 임계치 미달
- **원문 인용:** *"Model costs are probably ninety-four percent of the bill. External APIs — search plus enrichment — are maybe six. And I'm rounding. The external API line is basically a rounding error."*
- **인터뷰어 처리:** 수치를 그대로 수용, 반론/유도 없이 기록. H0 negation data로 등재.
- ⚠️ **단, 토큰 사고($900/일)는 실재 — pain은 있으나 Kyber 비-LLM 귀속 wedge와 무관**
  - 사고 원인: 프롬프트 루프(LLM 과다호출), 비-LLM 외부 API와 무관
  - 현재 대응: 타임아웃 강화 + per-job 토큰 상한(하드코딩). "수동이고 불안정하다"고 본인 평가.
  - 이 pain의 답은 **실행 전 토큰 예산 강제** — Kyber의 타겟 기능이지만 wedge는 LLM 절감이지 비-LLM 귀속이 아님.

---

## 가설 매핑

| 신호 | 관련 가설 | 방향 |
|---|---|---|
| "External API: 6%, basically a rounding error" | H0: 툴/외부API COGS 15%+ 세그먼트 존재 | ❌ **부정** — 이 세그먼트(소규모 YC B2B SaaS, RAG-heavy)에서는 외부 API 비중 낮음. 단일 데이터 포인트이나 방향성 명확 |
| "Model costs are ninety-four percent of the bill" | H0 역방향: LLM 비중 압도적 | ⚠️ **세그먼트 의존성** — long-context RAG 패턴(대용량 컨텍스트 요약)은 토큰 중심 비용 구조를 만든다. 검색 API가 저가 플랜에 묶여 있는 경우 외부 API 비중이 더욱 낮아짐 |
| "$900 토큰 루프 사고 (Feb)" | H0 부수 pain: LLM 과다호출 | ⚠️ **무관** — 비-LLM 귀속 wedge와 별개. 단, "실행 전 차단" 필요성 자체는 현업이 직접 확인 ("earlier in execution would have saved most of it") |
| "If it crossed ten percent of the bill I'd care" | H0 임계 인식 | 📊 **역산 단서** — 현업이 직접 10% 선을 외부 API 관심 임계로 언급. 6%는 의식 밖. |
| "Attribution for LLM: tedious but doable; for external APIs: 'basically flat, not that'" | H2: 귀속 격차 | ⚠️ **부분 해당** — LLM은 이미 per-job 귀속 가능(자체 Grafana). 외부 API는 귀속 필요성 자체를 못 느낌(비중이 작으므로). H2 pain은 외부 API 비중이 높을 때 발화한다는 단서. |
| "Multi-agent / agents spawning sub-agents = attribution harder" — 타 회사 소개 제안 | H0·H2 세그먼트 재정의 | ✅ **유용한 방향 제시** — 복잡한 멀티 에이전트 구조에서 비용 인터리빙 = 더 어렵다. 소규모 선형 파이프라인보다 복잡 워크플로우 타겟이 H0/H2를 더 강하게 느낄 것. |
| "Predictive cost before job runs" (마법 지팡이 Q) | 미탐색 가설: 사전 예산 추정 | ✅ **새로운 pain 발굴** — 기존 가설(사후 귀속)이 아닌 **사전 예측(pre-execution cost estimate)** 니즈. "고객 견적"·"이상 입력 조기 차단"이 실제 use case. Kyber의 in-path 실행 전 차단과 연결 가능. |

---

## 심각도 신호 체크

| 체크 항목 | 결과 |
|---|---|
| 외부 API 비중 15%+ | ❌ 불합격 (6%) |
| 월 외부 API 지출 $2K+ | ❌ 불합격 (추정 $840/mo = $14K × 6%) |
| 귀속 격차로 인한 실제 손해 사례 | ❌ 미확인 (외부 API 귀속 자체를 안 함, 비중이 작아서) |
| 실행 전 차단 니즈 (토큰 사고) | ✅ 확인 ($900 루프, "earlier in execution" 언급) |
| H2 귀속 격차 (멀티에이전트 복잡 워크플로우) | 🔵 간접 확인 — 본인 사례 아님, 타 회사 소개 제안 |
| 사전 비용 예측 니즈 | ✅ **신규 pain 발굴** — "predictive cost before job runs" |

---

## 시사점 (Korean)

### 1. H0 부정 — 이 세그먼트는 우리 타겟이 아니다

Sarah의 사례는 **소규모 선형 RAG 파이프라인 + 저가 검색 API 플랜** 조합이다. 이 구조에서는 토큰 비중이 94%까지 올라가며 외부 API는 의식에서 사라진다. H0 판정 공식("외부 API 15%+ AND 월 $2K+ 또는 툴콜 $300+")에 두 항목 모두 미달. **이 세그먼트에서 비-LLM 귀속 wedge는 안 팔린다.** 파이프라인이 복잡해지고 고가 외부 API(예: per-call 처리 비용이 높은 데이터 인프라)를 쓰는 타겟으로 집중해야 한다.

### 2. H0 negation은 데이터이지 실패가 아니다

인터뷰어가 leading question 없이 수치를 수용한 것은 올바른 처리다. "외부 API 비중이 낮은 세그먼트가 있다"는 사실 자체가 **ICP 필터를 더 날카롭게** 한다. 스크리닝 질문에 "외부 API 비중 추정값"을 추가하면 H0 생존 세그먼트를 더 빠르게 식별할 수 있다.

### 3. $900 루프 사고 — pain은 실재, wedge는 다르다

토큰 사고는 "실행 전 차단" 필요성을 생생하게 확인한다. 단, 이 pain의 답은 **LLM 토큰 예산 강제(per-job ceiling)**이지 비-LLM 외부 API 귀속이 아니다. Kyber가 "실행 전 차단" 기능을 보유하고 있다면 이 pain과 연결 가능하지만, 피치에서 "비-LLM 귀속"이 메인 wedge인 한 이 사례는 증거로 쓰기 어렵다. 혼동 주의.

### 4. 새로운 pain 발굴 — 사전 비용 예측(pre-execution estimate)

Sarah가 자발적으로 언급한 "배치 제출 전 예상 비용 견적" 니즈는 기존 가설에 없던 것이다. "고객 견적 + 이상 입력 조기 차단"이 실제 use case이며, Kyber의 in-path 실행 전 정책 엔진과 연결된다. **인터뷰 가이드에 추가 검토 항목으로 등재할 것.**

### 5. 세그먼트 재확인 — 멀티에이전트가 H0 생존 가능성 높다

Sarah 본인이 "멀티 에이전트에서 비용이 인터리빙되면 귀속이 훨씬 어렵다"고 자진해서 언급했다. 이는 기존 ICP 방향성(복잡 워크플로우, 에이전트가 서브에이전트를 스폰하는 구조)과 정확히 일치한다. **소개 인트로(YC 동기 회사)는 반드시 후속할 것.** 멀티에이전트 구조에서 H0 생존 여부를 다음 인터뷰의 최우선 검증 목표로 삼는다.

### 6. Mom Test 준수 여부 자체 평가

- ✅ 과거 사건 중심으로 질문 ("have you ever had a month...", "when you say you log tokens...")
- ✅ Leading question 발생 없음 — Sarah가 H0 부정 답변 줬을 때 수용, 반론 없음
- ✅ "What would meaningful look like?" 등 역산 질문으로 임계 추출
- ✅ Q17에서 소개 유도 성공
- ⚠️ "predictive cost" 니즈는 Sarah가 자진 언급 — 인터뷰어가 직접 질문하지 않았으므로 신뢰도 높음

---

## 다음 행동

1. **인트로 수락** — Sarah가 제안한 YC 동기 회사(멀티에이전트 워크플로우) 소개 수락. 해당 회사를 파이프라인에 등재하고 스크리닝 시 외부 API 비중 + 에이전트 복잡도 우선 확인.
2. **스크리닝 질문 업데이트** — "외부 API 비중 추정값"을 스크리닝 Q에 추가. H0 생존 여부를 15분 내 판별하는 필터로 활용.
3. **"사전 비용 예측" pain 인터뷰 가이드 등재** — `인터뷰-가이드-Mom-Test.md` §4에 신규 항목 추가: "배치 실행 전 비용 추정 필요성 경험이 있는가? 어떤 맥락에서?"
4. **H0 데이터 누적** — 현재 H0 응답: 1건 부정(6%). 판정 임계(6건 중 3건 생존)까지 5건 추가 필요. 이 1건은 "선형 RAG + 저가 검색 API" 세그먼트로 분류 보관.
