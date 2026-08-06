# 팩트체크 — 🔴 항목만 (2026-08-06)

> 대상: `Pitch/셀프제작-슬라이드-가이드.md` (2026-08-05). 전체 판정본은 `Pitch/FACTCHECK-2026-08-06.md`.
> 이 문서는 전체 13개 주장 중 **근거 없음·반증됨(🔴)으로 판정된 4개 클러스터만** 추린 것이다. Perplexity deep-research 교차검증용으로 검색 예산을 이 4건에 집중시키기 위해 분리했다.
> 1차 판정 방법: `api.perplexity.ai` 아웃바운드가 차단되어 웹 리서치 7개 병렬 에이전트로 수행. 모든 근거에 실제 URL·발행일 첨부.
> **이 4건은 각각 슬라이드 [3]·[4]·[7]의 핵심 숫자 또는 핵심 문장이며, [3][4][7]은 서사의 척추 다음 3장 전부다.**

---

## 0. 검증 대상 4건

| # | 주장 | 위치 | 1차 판정 | 1차 조치안 |
|---|---|---|---|---|
| C2 | AI 원가의 **41%**가 비-LLM (LLM 59 / Search 24 / DB 17) | [3] Villain ★, 데모 tab1 | 🔴 | **출처 전무.** 자사 측정치로 재라벨 or 삭제 |
| C3 | 무한 루프로 **11일간 $47K** | [4] Stakes | 🔴 | **자체계산도 안 맞는 익명 블로그.** Gemini $82,314/2일로 교체 |
| C4 | 하룻밤 API **400%** 급증 | [4] Stakes | 🔴 | **사례 0건.** DoiT 79% / Mavvrik 89%로 교체 |
| C9a | Langfuse·Helicone = 추적만, 실행 전 차단 불가 | [7] 경쟁 ★★ | 🔴 | **반증됨. Helicone은 실행 전 비용 차단을 이미 제공** |
| C10 | SatGate = 프리론칭 | [7] 경쟁 | 🔴 | **SatGate는 라이브 제품.** 게다가 진짜 위협은 누락 |

---

## 1. 🔴 즉시 무대에서 내려야 할 것

### C2 — "41% of COGS never touches a model" (슬라이드 [3] 대문짝 숫자)

**LLM 59% / Search 24% / External DB 17% 이라는 분해는 어떤 공개 조사·벤치마크·벤더 리포트에도 존재하지 않습니다.** Menlo Ventures 엔터프라이즈 조사, LangChain State of AI Agents 두 판본, FinOps Foundation — 전부 직접 확인했고 비용 구성 분해가 없습니다.

실제로 존재하는, 서로 전혀 일치하지 않는 수치들:

- **LLM 처리 = 에이전트 실행 시간의 71~98%**, 툴 실행 2~29% (웹 검색 중심 워크로드에서 28.7%로 최대) — arXiv:2605.26297, 2026-05-25. *실측이지만 시간이지 돈이 아님.*
- LLM 추론 ≈ 연간 운영비의 **70~75%** — Gettia Consulting 모델 케이스, 2026-06-09. *단일 모델링, 조사 아님. 그리고 나머지 25~30%는 검색 API가 아니라 모니터링·호스팅.*
- LLM 추론 ≈ TCO의 **20%** (즉 비-LLM 80%) — Cockroach Labs, 2026-06-10. *벤더 콘텐츠, 방법론 미공개. 우리 주장과 정반대 방향으로 어긋남.*

즉 비-모델 비중은 **COGS 경계를 어디에 긋느냐에 따라 2%에서 80%까지** 나옵니다. 41%라는 합의는 없습니다.

> **조치 (택1)**
> (a) **자사 측정치로 재라벨** — 데모/실측에서 나온 숫자라면 슬라이드에 "당사 프로덕션 계측 기준"을 명기하고, 각주로 COGS 산정 범위(무엇을 포함/제외했는지)를 밝힌다. 이러면 방어 가능하고, 오히려 "우리가 직접 재봤다"는 강점이 된다.
> (b) **출처 있는 문장으로 교체** — "툴 실행은 에이전트 실행 시간의 2~29%를 차지하며 웹 검색 중심 워크로드에서 최대치에 근접한다 (arXiv:2605.26297, 2026-05)."
> (c) 둘 다 안 되면 **41% 숫자를 지우고** "모델 외 비용은 워크로드마다 2%에서 80%까지 벌어지며, 누구도 표준 분해를 공표한 적이 없다 — 그게 문제다"로 프레임을 뒤집는다. 이게 사실 가장 강한 버전입니다.

### C3 — "$47K / 11일" (슬라이드 [4] 숫자 카드 1)

출처는 단 하나, Teja Kusireddy의 Towards AI(Medium) 글(2025-10-31)입니다. 그리고 원문을 읽으면 주장 4요소 중 3개가 틀립니다.

- "개발자 1인"이 아니라 **팀**("we"/"our team"), LangChain 에이전트 4개.
- **$47K는 11일 청구액이 아니라 4주 누적**. 11일은 루프가 *발견되지 않은* 기간.
- 원문의 주차별 금액 $127 + $891 + $6,240 + $18,400 = **$25,658**. $47,000이 아닙니다. 자기 글 안에서 산수가 안 맞습니다.
- 회사명·벤더명·인보이스·스크린샷 전무.

이후 확산된 Tech Startups, Revenium, dev.to 글들은 전부 이 한 글을 재인용한 것이고, "forensic analysis"를 자칭한 clyro.dev 글은 본문에 **"이 일자별 서사는 복수 사건의 합성 재구성"**이라고 스스로 밝혀놨습니다.

> **교체 권장: Gemini API 키 탈취 — 2일간 $82,314.**
> 3인 스타트업의 월 $180 Gemini 청구서가 키 유출 후 이틀 만에 $82,314. 창업자가 "파산 직면"이라고 공개. 2026년 3월, Tom's Hardware·The Register 등 메인스트림 테크 매체가 피해자 실명·스크린샷과 함께 보도.
> — https://www.tomshardware.com/tech-industry/artificial-intelligence/gemini-api-key-thief-racks-up-usd82-314-in-charges-in-just-two-days-victim-facing-bankruptcy-affected-devs-call-for-basic-guardrails-against-catastrophic-usage-anomalies
> — https://www.theregister.com/security/2026/03/03/dev-stunned-by-82k-gemini-api-key-bill-after-theft/
>
> 보조: Sysdig "LLMjacking" — 탈취 자격증명으로 Bedrock 경유 Claude 호출 시 **피해자 부담 최대 $46,000/일** (2024-05-06, CSO Online·Infosecurity 후속 보도). https://www.sysdig.com/blog/llmjacking-stolen-cloud-credentials-used-in-new-ai-attack

### C4 — "하룻밤 400% 급증" (슬라이드 [4] 숫자 카드 2)

**단 한 건도 문서화된 사례가 없습니다.** 하루/하룻밤 단위 400% 급증은 기업명·날짜·포스트모템 어느 것도 나오지 않습니다. 가장 가까운 실제 수치는 6개월 500%(Via CTO, 2026-05), 전년비 108%(Zylo 2026), 전년비 36%(CloudZero 2025)로 전부 다월·연 단위입니다.

> **교체 권장 — 일화 대신 조사 통계로 가는 게 훨씬 강합니다.**
> - **DoiT / Sapio Research, 2026-02** (n=500, 1,000명 이상 미·영 기업 재무 리더, ±4.4pp): **기업의 79%가 지난 12개월간 AI 비용 초과를 경험**. FinOps 성숙 조직의 평균 초과율 30.9%. AI ROI를 병목 없이 산출 가능한 곳은 15%뿐. https://www.doit.com/blog/ai-spending-survey
> - **Mavvrik + Benchmarkit, "2026 State of AI Cost Governance"** (n=396, 2026-04~05 조사, 07-29 공개): **89%가 AI 예산 예측을 10% 넘게 빗나감**. **62%는 예상 못 한 AI 비용이 실제 사업 의사결정을 바꿨다**고 응답. **40% 이사회 에스컬레이션**, **33% 긴급 지출 동결**, **25% AI 과제 지연·취소**. https://www.mavvrik.ai/state-of-ai-cost-governance-report/
>
> 특히 Mavvrik의 "40% 이사회 에스컬레이션 / 25% 과제 취소"는 우리 [4] 슬라이드가 하려는 말("진짜 손실은 설명 못 하는 것")을 일화보다 정확하게 대신합니다. **투자자용으로는 개발자 한 명의 사고보다 이사회가 열렸다는 통계가 셉니다.**

### C9a + C10 — 경쟁 포지셔닝 (슬라이드 [7]) ★★ 가장 심각

**"실행 전 통제는 아무도 안 한다"는 이 덱의 차별화 축인데, 이게 지금 사실이 아닙니다.**

- **Helicone은 이미 합니다.** 공식 문서의 `Helicone-RateLimit-Policy` 헤더는 단위로 **`cents`(비용 기반)**를 지원하고, 세그먼트로 **`user`** 및 임의 커스텀 프로퍼티를 지원합니다. 문서에 나온 예시 `"500;w=3600;u=cents;s=user"`가 **사용자당 시간당 $5 지출 상한**이고, 초과 시 프록시 계층에서 **429로 거부 — 프로바이더 호출 전**입니다. 우리가 슬라이드에 이름을 박아놓고 "못 한다"고 쓴 회사가, 자기 공식 문서에서 한다고 써놨습니다. https://docs.helicone.ai/features/advanced-usage/custom-rate-limits
- **Langfuse 부분은 맞습니다.** 자사 블로그에서 "Langfuse is not an LLM Proxy... observes from the sidelines"라고 명시하고, 프록시가 필요하면 LiteLLM을 쓰라고 권합니다. https://langfuse.com/blog/2024-09-langfuse-proxy
- **2026년에 이 기능이 게이트웨이 기본 체크박스가 됐습니다.** Cloudflare AI Gateway 지출 한도(2026-06-05 출시, 사용자 ID·팀·앱 단위로 달러 예산, 초과 시 429 차단). LangSmith LLM Gateway(2026-05-13 프라이빗 베타 — **관측성 벤더가 실행 전 차단으로 넘어옴**, 초과 시 402). LiteLLM은 예전부터 end-user 단위 `max_budget`. TrueFoundry, Portkey, Kong, OpenRouter, Solo.io agentgateway 모두 유사.
- **SatGate는 프리론칭이 아닙니다.** satgate.io는 "Agent Authority & Accountability Layer"로 **"budgets and scope enforced before execution"**과 서명된 Evidence Pack, MCP Gateway 배포 모드, macaroon 토큰, 라이브 대시보드, "Start Free" 가입까지 있는 **가동 중인 제품**입니다. (자금·팀 규모·창업일은 공개 출처 없음 — 그래서 "프리론칭"이라고 단정하는 것도, 반대로 규모를 단정하는 것도 둘 다 근거 없음.) https://satgate.io/
- **그리고 덱에 없는 진짜 위협: Revenium Guardrails — 2026년 8월 3일 출시. 사흘 전입니다.** 포지셔닝 문구가 거의 우리 것입니다: *"Guardrails decides in real time whether a call happens at all... By the time a dashboard shows the spike, the money is already spent."* 조직/제품/**에이전트**/모델/태스크 단위로 프로바이더 도달 전 차단. Two Bear Capital·WestWave Capital 투자, 창업자 ex-RightScale·MuleSoft. https://www.globenewswire.com/news-release/2026/08/03/3337254/0/en/Revenium-Launches-Guardrails-for-Real-Time-AI-Spend-and-Model-Use-Enforcement.html

> **심사위원이 던질 수 있는 가장 아픈 질문:**
> *"Helicone은 오늘 `u=cents;s=user`로 사용자별 비용 상한을 걸고, Cloudflare는 두 달 전에 사용자 ID 단위 달러 예산을 출시했습니다. 둘 다 프로바이더 호출 전에 막습니다. 당신들이 막을 수 있는데 그들이 못 막는 게 뭡니까? 만약 답이 '동시성 하에서의 정확한 회계'라면, 그건 회사가 아니라 LiteLLM 패치 아닌가요?"*

> **살아남는 차별화는 두 가지뿐이고, 지금 덱은 둘 다 주장하지 않고 있습니다.**
> 1. **동시성 하 정확도.** 기존 사업자는 전부 eventually-consistent입니다. Cloudflare 공식 문서: *"a burst of concurrent requests can briefly exceed the limit"*, 비용은 *"best-effort estimation"*. Kong 공식 문서: *"the cost... is only reflected during the next request"* — 즉 한도를 넘긴 그 호출 자체는 실행됩니다. **한도를 깨는 바로 그 호출을 막을 수 있는 곳은 아직 없습니다.** 이건 데모로 증명 가능한 주장이고(우리 tab2가 정확히 그 장면), 숫자로 말할 수 있으면(동시 에이전트 N개일 때 오버슛 규모) 무기가 됩니다.
> 2. **예산의 단위가 API 키가 아니라 비즈니스 객체.** 모든 기존 사업자의 예산 객체는 API 키·메타데이터 태그입니다. **고객 1명당 마진**을 네이티브 예산 단위로 쓰는 곳은 없습니다. 이건 우리 ③ Value(COGS 설명)와 정확히 같은 축이라 서사가 흔들리지 않습니다.
>
> **[7] 2×2의 X축을 "사후 관측 vs 실행 전 통제"에서 "근사 차단 vs 정확 차단(exactly-once)"으로 바꾸거나**, 최소한 경쟁사 점을 옮기고 "차단은 2026년에 커모디티가 됐다 — 남은 문제는 정확도와 단위다"로 프레임을 한 단계 위로 올려야 합니다. 이건 발표 전에 팀 결정이 필요한 사항입니다.

---

## 2. 교차검증 시 특히 확인할 것

1. **C2** — LLM 59 / Search 24 / DB 17 또는 "비-LLM 41%" 분해를 담은 **1차 출처가 정말 존재하지 않는지**. 존재한다면 조사명·표본수·발행일·URL. 존재하지 않는다면 그렇게 명시할 것.
2. **C3** — Towards AI(Medium) 원문의 주차별 금액 합계가 $47,000이 아닌 $25,658인지. 그리고 Gemini $82,314 사건이 Tom's Hardware·The Register 보도로 실재하는지, 금액·기간·피해자 규모가 정확한지.
3. **C4** — "하룻밤 400% 급증"에 해당하는 **문서화된 실제 사례가 단 한 건이라도 있는지**. DoiT 79%(n=500)와 Mavvrik 89%(n=396)의 표본수·조사기간·발행일이 정확한지.
4. **C9a** — Helicone 공식 문서의 `Helicone-RateLimit-Policy`가 정말 `u=cents` 단위와 `s=user` 세그먼트를 지원하고, 초과 시 **프로바이더 호출 전에** 429를 반환하는지. 이게 사실이면 이 덱의 차별화 축이 무너진다.
5. **C10** — SatGate가 라이브 제품인지, Revenium Guardrails가 2026-08-03에 실제 출시됐는지. 그리고 **여기 나열되지 않은 다른 경쟁자가 더 있는지** (2026년에 실행 전 예산 차단을 출시한 게이트웨이·관측성 벤더 전수). 누락된 경쟁자를 찾아내는 것이 이 검증의 가장 큰 가치다.
6. 전 항목 공통 — **2025년에는 참이었으나 2026년 기준으로 낡은 주장**을 표시할 것.
