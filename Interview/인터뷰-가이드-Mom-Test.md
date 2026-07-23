# 고객 인터뷰 가이드 (Mom Test 적용)

> 용도: 실제 인터뷰 진행용 질문지. 인터뷰 **기록**은 이 파일이 아니라 `YYYY-MM-DD-대상.md`로 별도 작성한다.
>
> 검증 대상 가설: **가설 0 (선행, 2026-07-23 신설)** — tool-call/외부 API 비용이 COGS의 유의미한 비중(15%+)인 세그먼트가 존재한다 (검증 스프린트 설계 문서 기준). 이어서 [../Problem/문제-정의.md](../Problem/문제-정의.md) 하위 가설 1~4, [../ICP/ICP.md](../ICP/ICP.md)의 프로필·크레딧 트리거. **가설 0이 통과된 세그먼트에서만 가설 2·3을 본격 검증**한다.
>
> 메모: 한국 트랙이 본선(Tier 1: 로앤컴퍼니·달파·채널톡·라이너), 미국 트랙 병행 (2026-07-23 갱신). 미국 인터뷰 결과를 한국 ICP에 적용할 때는 시장 차이(지출 규모, 크레딧 구조)를 보정해서 해석할 것.

## Mom Test 핵심 원칙 (인터뷰 전 반드시 숙지)

1. **내 아이디어를 설명하지 않는다.** 상대의 삶(업무)에 대해 이야기한다. 아이디어를 말하는 순간 상대는 예의상 칭찬한다.
2. **미래·가정이 아니라 과거의 구체적 사건을 묻는다.** "쓰실 건가요?"(가정) ❌ → "지난달에 실제로 어떻게 하셨나요?"(사실) ✅
3. **적게 말하고 많이 듣는다.** 내가 말하는 시간은 20% 이하.

**금지 질문 (절대 하지 않기):**
- "이런 제품이 있다면 쓰시겠어요?" / "Would you use a product that...?"
- "좋은 아이디어 같나요?" / "Do you think this is a good idea?"
- "얼마면 내시겠어요?" / "How much would you pay for...?"

---

## 0. 오프닝 (30초)

아이디어 피칭이 아니라 학습이 목적임을 밝힌다. 제품 이야기는 하지 않는다.

- 🇰🇷 "AI 에이전트를 프로덕션에서 운영하는 팀들이 비용을 어떻게 관리하는지 공부하고 있어요. 제품을 팔려는 게 아니라, 실제로 어떻게 일하시는지 듣고 싶어요."
- 🇺🇸 "I'm researching how teams running AI agents in production handle their costs. I'm not selling anything — I just want to learn how you actually work."

## 1. 스크리닝 (5분) — ICP 부합 확인

**Q1. 프로덕션 여부**
- 🇰🇷 "지금 만들고 계신 AI 기능에 대해 얘기해 주세요. 실제 고객 트래픽을 받고 있나요?"
- 🇺🇸 "Tell me about the AI features you're building. Are they serving real customer traffic right now?"

**Q2. 자율 툴 콜 여부·규모**
- 🇰🇷 "응답을 만들 때 모델이 검색이나 DB 조회, 외부 API 같은 툴을 스스로 호출하나요? 요청 하나에 보통 몇 번쯤 되나요?"
- 🇺🇸 "When generating a response, does the model call tools on its own — search, database lookups, external APIs? Roughly how many calls per request?"

**Q3. 지출 규모·크레딧** (판정식의 절대액 조건 입력 — 숫자를 꼭 확보)
- 🇰🇷 "월 LLM/API 비용이 대략 어느 정도예요? 클라우드 크레딧으로 내고 있나요, 실비인가요?"
- 🇺🇸 "What's your monthly LLM/API spend, roughly? Are you paying with cloud credits or out of pocket?"

**Q3-b. 수익 모델** (ICP 스크리닝 필수 조건 — 2026-07-23 추가)
- 🇰🇷 "매출은 주로 어디서 나와요? 유료 구독인가요, B2B 계약인가요, 아직 무료 중심인가요?"
- 🇺🇸 "Where does your revenue mainly come from — paid subscriptions, B2B contracts, or is it mostly free for now?"

> 판정 (2026-07-23 갱신 — 필수 1 + 선택 2중 1): **[필수]** 매출의 주된 원천이 유료 구독/B2B (Q3-b — 무료 중심 + 일부 유료는 미충족). [선택] 프로덕션 자율 tool-call (Q1·Q2) / 월 AI 지출 $500+ (Q3). 필수 미충족이거나 "아직 데모/파일럿", "툴 콜 없음"이면 Anti-ICP — 인터뷰는 짧게 마무리하고 소개 요청으로 전환. 탈락 사유(저볼륨/무료 모델/지출 미달)를 파이프라인 추적표에 기록 — **5건 연속 탈락 시 ICP 기준 재검토 트리거**.

## 2. 현재 워크플로 (10분) — 비용을 실제로 어떻게 보는가

**Q4. 비용 확인 루틴**
- 🇰🇷 "AI 비용은 지금 어떻게 확인하세요? 마지막으로 확인한 게 언제였는지, 그때 뭘 봤는지 얘기해 주세요."
- 🇺🇸 "How do you check your AI costs today? When was the last time you looked, and walk me through what you actually looked at."

**Q5. 귀속(attribution)**
- 🇰🇷 "그 비용을 기능별이나 고객별, 팀별로 쪼개서 볼 수 있나요? 실제로 그렇게 본 적 있어요?"
- 🇺🇸 "Can you break that spend down by feature, customer, or team? Have you actually done that?"

**Q6. 툴 콜 비용의 가시성** (하위 가설 2 검증)
- 🇰🇷 "에이전트가 호출하는 외부 API — 검색 API나 서드파티 SaaS 같은 것들 — 그 비용도 LLM 비용이랑 같이 보이나요, 따로 흩어져 있나요?"
- 🇺🇸 "The external APIs your agent calls — search APIs, third-party SaaS — do those costs show up alongside your LLM costs, or are they scattered somewhere else?"

## 3. 최근 사건 딥다이브 (15분) — 인터뷰의 핵심

**Q7. 비용 급증 사건** (하위 가설 1 검증)
- 🇰🇷 "최근에 AI 비용이 예상보다 튀었던 적이 있나요? 가장 최근 사례를 처음부터 얘기해 주세요 — 언제, 어떻게 알게 됐고, 그다음 뭘 하셨어요?"
- 🇺🇸 "Has your AI spend ever spiked unexpectedly? Tell me about the most recent time — when was it, how did you find out, and what did you do next?"

**Q8. 원인 추적 과정** (status quo 행동 확인: 로그 뒤지기·스크립트)
- 🇰🇷 "원인은 어떻게 찾았어요? 뭘 뒤졌고, 시간이 얼마나 걸렸어요?"
- 🇺🇸 "How did you track down the cause? What did you dig through, and how long did it take?"

**Q9. 비용(임팩트) 정량화**
- 🇰🇷 "그 일로 실제로 얼마가 나갔어요? 그리고 그걸 수습하는 데 팀의 시간이 얼마나 들어갔어요?"
- 🇺🇸 "How much money did that end up costing you? And how much of the team's time went into cleaning it up?"

**Q10. 재발 여부·빈도**
- 🇰🇷 "그런 일이 얼마나 자주 있어요? 그 뒤로 또 있었나요?"
- 🇺🇸 "How often does something like that happen? Has it happened again since?"

> 팁: Q7에서 사례가 안 나오면 이 문제는 그 팀에겐 없는 것이다. 억지로 유도하지 말고 기록할 것 — "문제 없음"도 중요한 데이터다.

## 4. 시도해본 해결책 (10분) — 하위 가설 2·3 검증

**Q11. 자구책**
- 🇰🇷 "그 문제 때문에 뭔가 만들거나 도입한 게 있어요? 직접 짠 스크립트든, 도구든요."
- 🇺🇸 "Have you built or adopted anything because of this? Homegrown scripts, tools, anything."

**Q12. 기존 도구 경험** (LiteLLM 등 게이트웨이 사용자면)
- 🇰🇷 "(도구를 쓴다면) 그걸로 해결이 됐어요? 그걸 쓰는데도 여전히 답답한 부분은 뭐예요?"
- 🇺🇸 "(If they use a tool) Did that solve it? What's still frustrating even with that in place?"

**Q13. 사전 통제 시도** (사후 관측 vs 실행 전 통제 단층선 검증)
- 🇰🇷 "비용이 나가기 전에 막으려고 해본 건 있어요? 예산 한도나 호출 제한 같은 거요. 해봤다면 어땠어요?"
- 🇺🇸 "Have you tried to stop the spend before it happens — budget caps, call limits, that kind of thing? If so, how did that go?"

**Q14. 지불 이력** (지불 의사의 유일한 증거는 과거의 지불)
- 🇰🇷 "이 문제와 관련해서 돈을 내고 있는 건 있어요? 있다면 얼마 정도요?"
- 🇺🇸 "Are you currently paying for anything related to this? If so, roughly how much?"

### 4-1. 추가 프로브 (2026-07-21 추가 — "스타트업은 비용 도구를 안 산다" 조언 검증용)

> 목적: 자체 구축 선호의 실제 비용 측정 + "불가피한 지출"의 경계 탐색 + 과금 인프라 수요 신호 수집 ([../Solution/재포지셔닝-옵션-과금-인프라.md](../Solution/재포지셔닝-옵션-과금-인프라.md)). 섹션 4의 답변 흐름에 따라 자연스럽게 끼워 넣는다.

**Q11-b. 자체 구축물의 유지 비용** (Q11에서 "직접 만들었다"가 나오면)
- 🇰🇷 "그 대시보드(스크립트) 유지보수에 한 달에 몇 시간쯤 들어가요? 모델이나 프로바이더 바뀔 때는요? 그 시간이 아깝다고 느낀 적 있어요?"
- 🇺🇸 "How many hours a month go into maintaining that dashboard or those scripts? What about when a model or provider changes? Has that time ever felt like a waste?"

**Q14-b. 불가피한 지출의 경계** (Q14에 이어서)
- 🇰🇷 "최근 6개월 안에 새로 결제 시작한 SaaS나 인프라가 있어요? 뭐였고, 왜 그건 돈을 냈어요?"
- 🇺🇸 "Is there any SaaS or infra you started paying for in the last six months? What was it, and what made that one worth paying for?"

**Q14-c. 과금·마진 인프라 수요** (B2B/구독 모델이면 반드시)
- 🇰🇷 "고객사(고객)별 과금은 어떻게 하세요? 그 고객을 서빙하는 데 드는 AI 원가를 알고 가격을 정하신 거예요? 종량제 요금제를 검토해본 적은요?"
- 🇺🇸 "How do you charge each customer today? When you set that price, did you actually know your AI cost to serve them? Have you ever considered usage-based pricing?"

> 판정 힌트: Q11-b에서 유지보수 고통이 크면 "자체 구축 선호" 반론이 약해진다. Q14-b에서 결제 사례가 전부 수익·보안 쪽이면 멘토 조언이 강해진다 → 재포지셔닝 옵션 가중. Q14-c에서 "원가 모르고 가격 정했다"가 나오면 과금 인프라 수요의 직접 신호.

## 4-2. 비용 구성 (가설 0 — 모든 인터뷰의 필수 확보 문항, 2026-07-23 추가)

> **배치 규칙 (설계 결정)**: 이 문항은 오프닝이 아니라 **여기 — 워크플로·사건 대화로 라포가 형성된 후** 묻는다. COGS 구성은 회사에서 가장 민감한 숫자라 오프닝 배치는 확보율을 죽인다. 인터뷰가 짧아질 경우 **남은 시간 10분 시점에 다른 문항을 건너뛰고 우선 질문**한다.
>
> **질문 직전에 익명화 약속을 다시 전달**: 🇰🇷 "숫자는 익명·범위로만 정리하고 회사가 식별되게 쓰지 않아요." / 🇺🇸 "Any numbers stay anonymous and ranged — nothing traceable to your company."

**Q-H0. 비용 구성 쪼개기** (가설 0 판정식의 직접 입력)
- 🇰🇷 "지난달 에이전트 관련 비용을 토큰 vs 외부 API(검색·스크래핑·서드파티)로 쪼개면 대략 몇 대 몇이에요? 정확할 필요 없고 감이면 됩니다."
- 🇺🇸 "If you split last month's agent costs into model tokens vs external APIs — search, scraping, third-party — roughly what's the ratio? A gut feel is fine."

**Q-H0-b. 분리 불가 시 후속** ("모른다/못 쪼갠다"가 나오면 — 이 답변 자체가 데이터다)
- 🇰🇷 "왜 쪼개기 어려워요? 쪼개보려고 시도해본 적은 있어요? 그때 뭐가 막혔어요?"
- 🇺🇸 "What makes it hard to split? Have you ever tried? What got in the way?"

> **이중 기록 규칙**: "분리 불가/모른다" 응답은 ① 가설 0 판정에서는 **결측**으로 세고(순환논리 방지), ② 동시에 **가설 2(귀속 미성숙)의 지지 증거**로 기록한다. Q-H0-b의 답이 가설 2 심층 탐색으로 이어진다.
>
> 규모 계산: Q3(월 지출)에 Q-H0(비율)를 곱하면 tool-call 절대액이 나온다. 생존 카운트 조건 = **비중 15%+ 이면서 월 AI 지출 $2K+ 또는 tool-call 비용 월 $300+** (판정식은 설계 문서 참조).

## 5. 우선순위 확인 (5분)

**Q15. 문제의 상대적 위치**
- 🇰🇷 "지금 팀을 잠 못 들게 하는 문제 세 가지를 꼽으면 뭐예요? (비용 얘기가 안 나오면) AI 비용은 그 목록 어디쯤이에요?"
- 🇺🇸 "What are the top three problems keeping your team up at night? (If cost doesn't come up:) Where does AI spend rank on that list?"

## 6. 클로징 — 커밋먼트와 소개 (Mom Test: 다음 약속이 없는 인터뷰는 실패)

**Q16. 후속 커밋먼트**
- 🇰🇷 "이 주제로 뭔가 만들게 되면, 초기 버전을 보고 피드백 주실 수 있어요?"
- 🇺🇸 "If we end up building something in this space, would you be up for looking at an early version and giving feedback?"

**Q17. 소개 요청**
- 🇰🇷 "같은 문제를 겪고 있을 만한 분 두세 분만 소개해 주실 수 있어요?"
- 🇺🇸 "Could you intro me to two or three people who might be dealing with the same thing?"

---

## 청취 중 판정 기준

**그린 플래그 (기록 가치 높음):**
- 구체적 숫자·날짜·이름이 나온다 ("3월에 $4,000 나와서 이틀 동안 로그 뒤졌어요")
- 이미 뭔가 만들었거나 돈을 내고 있다
- 감정이 실린다 (분노, 한숨, "진짜 미치겠어요")
- 후속 미팅·소개에 즉답한다

**레드 플래그 (액면가로 믿지 말 것):**
- 칭찬 ("좋은 아이디어네요") — 데이터 아님
- 일반론 ("보통 다들 그렇죠", "저라면 쓸 것 같아요") — 구체적 사건으로 되물을 것
- 미래 약속 ("나오면 살게요") — 커밋먼트(시간·평판·돈)로 확인할 것

## 인터뷰 후

- 24시간 안에 `Interview/YYYY-MM-DD-대상.md`로 기록. **원문 발언은 그대로 인용**하고(수정 금지), 요약·해석은 별도 섹션에 구분해서 작성
- 각 답변이 어느 가설(**가설 0** + Problem 하위 가설 1~4, ICP 크레딧 트리거)을 지지/반박하는지 표기 — 매핑 표 형식은 [2026-07-21-Lev.md](2026-07-21-Lev.md) 재사용
- **심각도 신호 체크** (착수 게이트 입력 — 3종 중 몇 개가 나왔는지 기록): ① 비용 급증/사고 경험 (Q7~Q10), ② 자체 워크어라운드 존재 (Q11·Q11-b), ③ 지불 이력/의향 (Q14·Q14-b). 가설 0이 생존해도 심각도 신호 팀이 2건 미만이면 COGS 엑스레이 착수 보류
- [아웃리치-파이프라인.md](아웃리치-파이프라인.md) 상태를 `완료`로 갱신하고 가설 0 데이터 확보 여부(비율 확보/분리 불가/미질문) 기록
- **기밀 규칙**: 기록을 외부(블로그·IR·커뮤니티)에 재사용할 때는 회사·인물 식별 정보와 구체 숫자를 익명화·범위화
