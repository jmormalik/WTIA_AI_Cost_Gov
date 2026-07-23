# Why Now — 왜 이 문제가 하필 지금인가 (2026-07 조사)

[문제-정의.md](문제-정의.md)를 뒷받침하는 타이밍 논거와 실제 사례 모음. 웹 조사 기반이며, 2차 인용 사례는 표기함.

## 구조적 논거: 2025~2026년에 세 가지가 동시에 겹쳤다

1. **챗봇 → 에이전트 전환.** 단일 호출 챗봇과 달리 에이전트는 추론 루프마다 누적된 컨텍스트 전체를 다시 보낸다. 프로덕션 벤치마크 기준 **에이전트는 동일 작업에서 단일 턴 챗봇 대비 약 50배의 토큰을 소모**한다 (LeanOps, 2026). 비용의 자릿수가 달라졌다.
2. **종량제 가격 + 자율적 호출 결정 = 지출이 사람의 의도와 분리됐다.** 전통 소프트웨어는 라이선스가 고정비지만, AI는 토큰·호출량 종량제다. 그런데 호출 횟수를 사람이 아니라 **모델이 스스로 결정**하므로, 도입이 가속되는 순간 청구서도 통제 없이 가속된다.
3. **지출 규모가 임계점을 넘었다.** 2026년 기업 AI 지출은 전년 대비 108% 증가, 조직당 평균 $1.2M. Gartner는 2026년 글로벌 AI 지출을 $2.59T로 전망 (전년 대비 47%↑, 기업 기술 지출 사상 최고 성장률).

→ 요약: **"비싸진 것"이 아니라 "통제 주체가 사람에서 모델로 넘어간 것"이 지금 일어난 변화다.** 이것이 우리 문제 정의(모델이 스스로 판단해 호출하므로 추적·통제 불가)의 타이밍 근거다.

## 실제 사고 사례 (규모 순)

| 사례 | 금액 | 내용 |
|---|---|---|
| 익명 대기업 (Axios 보도, 2차 인용 ⚠️) | **$500M / 1개월** | 사용량 상한·지출 통제 없이 전 직원에게 Claude 접근 개방 → 한 달 만에 $500M 지출 |
| Uber | 2026년 연간 AI 예산 소진 | 에이전틱 코딩 도구 사용으로 **연간 예산을 4개월 만에 소진** → 직원 사용량 상한 도입 |
| Peter Steinberger / OpenClaw (2026-05) | **$1.3M / 30일** | 코딩 에이전트 ~100개 인스턴스 운영 → 30일간 6,030억 토큰, 760만 요청 |
| 무한 재시도 루프 사고 (2025-11) | **$47K / 11일** | 에이전트 4개가 무한 재시도 루프 진입, **11일간 아무도 인지 못함** → 청구서로 발견 |
| 취미 네트워크 스캔 사고 (2026) | $6.5K | 에이전트가 자율적으로 네트워크 스캔을 반복하며 AWS 요금 발생 |
| 개발자 1인 주말 사고 | $4.2K / 주말 | 자율 리팩토링 실행을 켜두고 연휴 → 주말 사이 $4,200 |

사례의 스펙트럼에 주목: **개발자 1인($4K) → 팀($47K) → 스타트업($1.3M) → 엔터프라이즈($500M)** — 규모와 무관하게 같은 구조(자율 호출 + 사후 인지)로 사고가 난다. 특히 $47K 사례의 본질은 금액이 아니라 **"11일간 아무도 몰랐다"** — 추적 부재가 문제의 핵심임을 보여준다.

## 시장 데이터 (설문·리포트)

- IT 리더의 **78%가 예산에 없던 예상외 AI 청구를 경험** (2026)
- FinOps Foundation 2026 State of FinOps: **기업 73%가 AI 비용이 당초 예상을 초과**했다고 응답
- 기업 AI 지출 전년 대비 108% 증가, 조직당 평균 $1.2M (2026)

## 시장 형성 신호 (지금이 진입 창이라는 근거)

- Agent Gateway 카테고리가 2026년 상반기에 막 형성 중 (Forbes 2026-07). SatGate는 프리론칭, Cycles는 v0.1 — **아무도 시장을 잡지 못했다** ([../Competitor-Analysis/경쟁사-분석.md](../Competitor-Analysis/경쟁사-분석.md))
- FinOps Foundation이 AI 비용을 공식 의제로 다루기 시작 — 구매자 측에 예산·직무(FinOps 팀)가 생기고 있다
- 경쟁자(Cycles)도 자사 블로그에 동일한 사고 사례를 수집 중 — 이 내러티브 자체가 시장에서 형성되는 중

## 한국 맥락 (보완 필요 ⚠️)

한국의 공개된 대형 사고 사례는 아직 조사에서 확인되지 않음. 두 가지로 해석 가능: (a) 하이퍼스케일러 크레딧이 비용을 흡수해 pain이 지연되는 중 ([../ICP/ICP.md](../ICP/ICP.md)의 크레딧 소진 트리거 가설과 일치), (b) 사례가 있으나 공개되지 않음. **한국 사례는 기사가 아니라 인터뷰로 수집하는 것이 현실적** — 인터뷰 가이드 Q7~Q10이 그 역할.

## Why Now 한 문단 버전 (피치용)

> 2025년까지 AI 비용은 사람이 코드에 적은 만큼만 나갔다. 2026년, 에이전트가 프로덕션에 들어가면서 호출 횟수를 모델이 스스로 결정하기 시작했고, 토큰 소모는 챗봇의 50배가 됐다. 결과는 이미 나타나고 있다 — Uber는 연간 AI 예산을 4개월 만에 소진했고, 한 대기업은 통제 없이 개방한 AI로 한 달에 $500M을 썼으며, 기업의 73%가 AI 비용이 예상을 초과했다고 답한다. 지출 통제의 주체가 사람에서 모델로 넘어간 지금, 이를 다시 통제할 레이어는 아직 비어 있다.

## 출처

- [LeanOps — AI Agents Burn 50x More Tokens Than Chats](https://leanopstech.com/blog/agentic-ai-cost-runaway-token-budget-2026/)
- [byteiota — The $500M AI Bill: How Agentic Loops Break Enterprise Budgets](https://byteiota.com/ai-agent-cost-runaway-enterprise-budget-500m-bill/)
- [DEV — How an AI Agent Ran Up a $47,000 Bill in 11 Days](https://dev.to/dingdawg/how-an-ai-agent-ran-up-a-47000-bill-in-11-days-and-how-to-stop-it-1fk)
- [vaasblock — Enterprise AI Spending ROI Crisis 2026](https://www.vaasblock.com/news/corporate-ai-spending-roi-enterprise-reckoning-2026/)
- [BERI — AI Costs Surge 108%: Why Your 2026 Budget Is Already Outdated](https://www.beri.net/article/ai-costs-surge-108-percent-2026-budget)
- [SmarterX — Uber, Microsoft, and Others Burning Through AI Budgets](https://smarterx.ai/smarterxblog/ai-costs-exploding-at-enterprise)
- [BankInfoSecurity — Why AI Spending Keeps Outrunning Budgets](https://www.bankinfosecurity.com/ai-spending-keeps-outrunning-budgets-a-31956)
- [Cycles — The True Cost of Uncontrolled Agents](https://runcycles.io/blog/true-cost-of-uncontrolled-agents) (경쟁자의 동일 내러티브)
- [Larridin — Your AI Budget Is Burning. Here's Why You Can't See It.](https://larridin.com/blog/ai-budget-overruns)
