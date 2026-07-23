# 시장 규모 산정: TAM / SAM / SOM (2026-07)

> ⚠️ 모든 산정은 가정 기반 추정이다. 각 숫자에 근거를 달았고, `[가정]` 표시는 인터뷰·추가 조사로 정밀화해야 하는 변수다. 지배 변수는 **ICP 부합률**과 **객단가(ACV)** 두 개 — 이 둘이 흔들리면 전체가 흔들린다.

## 산정 대상 시장의 정의

**"AI 에이전트 비용 거버넌스"** — 에이전트의 자율적 LLM·툴·API 호출 비용을 추적·귀속·통제하는 소프트웨어 ([../Problem/문제-정의.md](../Problem/문제-정의.md)). 인접 시장(LLM 게이트웨이 전체, FinOps 전체)과 구분해서 산정한다.

---

## TAM — 전체 시장 (글로벌, 전 기업 규모)

**접근: 탑다운 (시장 리포트 교차)**

| 앵커 | 수치 | 출처 |
|---|---|---|
| LLM 비용 최적화 시장 | 미국 $343M (2025), 글로벌 $9.2B (2035E), CAGR 26% | market.us |
| AI Gateway 시장 | $3.7B (2025) → $9.6B (2032E) | 360iResearch |
| 기업 LLM API 지출 | **$15B (2026E)** — 에이전틱 워크로드가 성장 견인 | 업계 추정 |

산정: 비용 관리 도구는 통상 관리 대상 지출의 2~5%를 가져간다 `[가정 — FinOps 업계 휴리스틱]`. 기업 LLM API 지출 $15B(2026) 기준 → **TAM ≈ $0.3B~0.75B (2026), 2030년까지 $1.5B~3B** (API 지출이 CAGR 25%+로 성장 시). LLM 비용 최적화 리포트($9.2B@2035)와 자릿수가 교차 확인됨.

## SAM — 우리 솔루션 형태가 도달 가능한 시장

**접근: 바텀업 (우리 제품 형태 = 스타트업~스케일업 셀프서브 SaaS 기준)**

| 변수 | 값 | 근거 |
|---|---|---|
| 글로벌 펀딩받은 AI 스타트업 | ~10,000개 | Growth List 등 트래킹 DB (전체 AI 스타트업은 6만+이나 유료 SaaS 구매력 기준 펀딩 기업으로 한정) |
| 그중 에이전트를 프로덕션 운영 (ICP 구조 부합) | 30~40% → **3,000~4,000개** | `[가정]` YC W26 배치 80%가 AI 코어, 에이전트 네이티브가 최대 성장 세그먼트라는 신호로 뒷받침 |
| 스타트업 티어 ACV | $1.2K~6K/년 (평균 ~$4K) | 경쟁사 가격 앵커: Portkey $49/월, TrueFoundry $499/월 |
| 스케일업 티어 (상위 ~10%) | ACV $30K~50K/년 | `[가정]` TrueFoundry Pro Plus $2,999/월 앵커 |

산정: (3,000~4,000 × $4K) + (300~400 × $40K) ≈ **SAM ≈ $25M~40M/년 (2026 현재)**. 시장 CAGR 25%+ 적용 시 **2030년 ~$80M~120M**.

## SOM — 3년 내 현실적 획득 가능 시장

**접근: 바텀업 (한국 wedge → 글로벌 확장 경로)**

**한국:**

| 변수 | 값 | 근거 |
|---|---|---|
| 한국 AI 스타트업 | 800~1,500개 | `[가정 — 검증 필요]` 정확한 공식 통계 미확보. 한국 AI 민간투자 세계 12위($1.78B, 2025) 규모에서 역산한 범위 |
| ICP 부합 (프로덕션 에이전트 + 지출 임계) | 15~25% → **150~250개** | `[가정]` 인터뷰 스크리닝 통과율로 정밀화 |
| 3년 내 획득 | 그중 10~20% → **20~50 고객** | `[가정]` 셀프서브 + wedge(크레딧 카운트다운) 전략 전제 |

한국 SOM ≈ 20~50 고객 × $4K ≈ **$0.1M~0.2M/년** — 여기에 글로벌(미국 YC 네트워크 경유) 초기 고객 20~50개를 더해 **3년 SOM ≈ $0.2M~0.5M ARR**.

---

## 이 숫자가 말해주는 것 (산정보다 중요한 부분)

1. **한국만으로는 시장이 안 된다.** 한국 ICP 전체(150~250개)를 다 먹어도 연 $1M 수준. 한국은 **검증·wedge 시장**이고, 매출은 글로벌(특히 미국)에서 나와야 한다. "한국 우선"은 시장 선택이 아니라 **검증 순서**로 해석해야 한다 — 미국 트랙 인터뷰를 병행하는 현재 방향과 일치.
2. **셀프서브 스타트업 티어만으로는 SAM이 얕다.** $25M~40M SAM은 VC 스케일로는 작다. 성장 스토리는 (a) 스케일업·엔터프라이즈 티어로의 ACV 상승, (b) 시장 자체의 CAGR 25%+ (에이전트 확산), (c) 인접 확장(관측성·FinOps 기능 흡수)에 달려 있다. 이는 SatGate가 처음부터 엔터프라이즈를 겨냥하는 이유이기도 하다.
3. **시장이 지금 작은 건 문제가 아니라 전제다.** Why-now 논거 그대로 — 카테고리가 2026년에 막 형성 중이므로 현재 SAM이 작은 것은 당연하고, 베팅은 시장의 크기가 아니라 **성장 기울기**(에이전트 지출 CAGR 25%+, 카테고리 형성기 선점)에 하는 것이다.

## 민감도: 정밀화가 필요한 두 변수

| 변수 | 현재 범위 | 정밀화 방법 |
|---|---|---|
| ICP 부합률 (15~25%) | 2배 차이 → SAM/SOM 2배 차이 | 인터뷰 스크리닝(Q1~Q3) 통과율을 그대로 측정치로 사용 |
| ACV ($1.2K~6K) | 5배 차이 | 인터뷰 Q14(현재 지불액) + 경쟁사 가격 추적 |

## 출처

- [market.us — LLM Cost Optimization Market (CAGR 26%, $9.2B@2035)](https://market.us/report/llm-cost-optimization-market/)
- [360iResearch — AI Gateway Market ($3.7B 2025 → $9.6B 2032)](https://www.360iresearch.com/library/intelligence/ai-gateway)
- [Growth List — 9,953 Funded AI Startups](https://growthlist.co/ai-startups/) · [Ascendix — How Many AI Companies Are There](https://ascendixtech.com/how-many-ai-companies-are-there/)
- [The Agent Report — YC W26 배치 분석](https://the-agent-report.com/2026/07/ai-agent-startup-explosion-2026-yc-ecosystem/)
- [국가전략포털 — AI Index Report 2026 (한국 AI 민간투자 12위, $1.78B)](https://nsp.nanet.go.kr/plan/subject/detail.do?nationalPlanControlNo=PLAN0000062343)
- 가격 앵커: [TrueFoundry Pricing](https://www.truefoundry.com/pricing), [Portkey Pricing Guide](https://www.truefoundry.com/blog/portkey-pricing-guide)
