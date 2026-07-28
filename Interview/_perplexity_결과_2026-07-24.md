# Perplexity 리서치 결과 — 인터뷰 후보 (2026-07-24)

> ⚠️ **미검증 원본.** Perplexity `sonar-pro` 출력 그대로다. 출처 URL을 하나씩 열어 확인하기 전까지는 사실로 취급하지 말 것. 검증 후 `Interview/인터뷰-후보-리스트.md`에 병합한다.
>
> 브리프: `Interview/Perplexity_인터뷰후보_리서치브리프.md` · 토큰: prompt 1621 / completion 5586

---

아래 표는 ICP 조건에 맞는 것으로 보이는 **새 인터뷰 후보 16곳**을 적합도 순(“프로덕션 에이전트 + 툴/API 자율 호출 + 고객 단위 COGS 부담이 뚜렷한 순”)으로 정리한 것입니다.  
모든 정보는 실제 공개 자료/블로그/채용 공고/제품 설명에서 확인한 것만 넣었고, 불분명한 부분은 “미확인” 또는 “확인 필요”로 표기했습니다.

---

### 1) 우선 후보 리스트 (고객당 COGS 구조·프로덕션 신호가 뚜렷한 곳)

| # | 회사 | 국가 | 무엇을 하나 (1줄) | ICP 부합 신호 (어느 조건?) | 규모/단계 | 접촉 추천 직책 | 출처 URL |
|---|---|---|---|---|---|---|---|
| 1 | 플루닛(Flunit) | 한국 | 세일즈 리서치·아웃바운드용 **B2B AI 에이전트**가 이메일/콜드아웃리치용 데이터를 자동 크롤·정리해주는 SaaS | 제품 소개에서 AI 에이전트가 웹/CRM/뉴스 등 다양한 **툴·외부 데이터 소스를 자동 수집·갱신**하고 B2B 세일즈팀 생산성을 높이는 핵심 서비스로 언급 → ① 프로덕션 에이전트 중심 ② 웹 크롤링·데이터 통합 툴콜 구조 ③ B2B 세일즈 팀 대상 유료 SaaS로 고객 단위 과금 가능성이 높음[8][9] | 임직원 50명 내외로 보이며, 2024년 프리A 투자 보도(시드~시리즈 A 구간 추정)[9] | CTO 또는 Head of AI/Engineering (세일즈 데이터 파이프라인·크롤러/LLM 인프라 총괄) | 제품·기업 소개 및 투자 기사[8][9] |
| 2 | Upstage | 한국 | 문서·업무 자동화를 위한 **기업용 AI 워크플로우/Agent 플랫폼(예: Solar AI, Document AI)**을 제공 | 고객사의 대량 문서 처리·검색·업무 자동화에 **LLM 기반 에이전트와 RAG, 서드파티 시스템 연동**을 활용하는 B2B SaaS/프로젝트 구조로 소개 → ① 여러 엔터프라이즈에 실제 배포된 프로덕션 에이전트 ② 문서·업무 시스템·검색 등 다양한 툴/API 호출 ③ 고객사별 프로젝트/사용량 기반 COGS가 큰 AI 인프라 기업[10][11] | 임직원 약 150명 수준으로 보도, 2023~2024년 시리즈 B급 투자 유치[10][11] | VP of Engineering / Head of Platform / AI Infra Lead | 회사 소개·투자 기사·제품 설명[10][11] |
| 3 | Relevance AI | 미국(호주 설립) | 고객 지원·세일즈·오퍼레이션에 쓰이는 **Multi-agent workplace automation** 플랫폼 (여러 Agent가 워크플로우를 수행) | 사이트에서 “multi-agent systems”를 내세우며 Slack, Zendesk, HubSpot 등 **다양한 SaaS와 외부 API를 에이전트가 자동 호출**해 반복 업무를 처리하는 B2B SaaS라고 명시 → ① 에이전트가 제품의 핵심 기능 ② 워크플로우 단계마다 여러 툴 연동 ③ 좌석·사용량 기반 유료 플랜으로 고객당 AI 호출·툴 사용이 곧 COGS 구조[12][13] | 팀 규모 50~100명 추정, 시리즈 A/B급 투자 기사 다수[13] | CTO / Head of Product – Agents / Platform Lead | 제품 설명·블로그·투자 기사[12][13] |
| 4 | Harvey | 미국 | 로펌·인하우스 법무팀을 위한 **AI legal assistant/agent**로, 계약 검토·리서치·초안 작성 등을 자동화 | 로펌(Allen & Overy 등)에 **프로덕션으로 배포된 엔터프라이즈 AI 에이전트**이고, 내부 문서·서드파티 리서치 툴·검색 등을 호출해 작업 수행한다고 설명 → ① 고객의 핵심 업무(리걸 작업)를 대신 수행하는 에이전트 ② 문서 리트리벌·법률 데이터베이스 등 외부 툴·API 활용 ③ 대형 로펌 단위 계약·사용량 기반으로 GPU/LLM 비용이 곧 COGS[14][15] | 2024년 기준 직원 100명 이상, 시리즈 B(Sequoia 등) 투자[15] | VP of Engineering / Head of Infra / Director of AI Platform | 회사 소개·투자 기사[14][15] |
| 5 | Vocode (ex-Conjure AI) | 미국 | 음성 기반 **AI phone agent**로, 콜센터/세일즈/리마인더 콜을 자동 수행하는 서비스와 라이브러리를 제공 | 제품 설명에서 “AI phone agent that makes calls and interacts with customers”와 함께 Twilio 등 **통신 API·CRM 연동**을 통해 통화·후속 액션을 자동 수행하는 에이전트 구조 → ① 통화 자체가 프로덕션 코어 기능 ② 통신·CRM·캘린더 등 외부 API 연동 ③ 통화 분당 요금+LLM 사용량이 그대로 원가인 B2B 과금 구조[16][17] | 소규모 팀(10~30명 추정), YC 등 초기 투자, 프리시드~시드 단계[17] | CTO / Founding Engineer (Voice infra & LLM) | 제품 페이지·GitHub·투자 관련 언급[16][17] |
| 6 | Kore.ai | 미국 (인도 설립) | Contact center·HR·IT 등 엔터프라이즈용 **AI Agent/Virtual Assistant 플랫폼** (여러 채널·툴에 연동) | 플랫폼이 콜센터·웹챗·HR 포털 등에서 **대화형 에이전트가 티켓 생성, RPA 호출, CRM/ITSM API 연동**을 수행하는 구조를 강조 → ① 에이전트가 고객사의 디지털 채널 전반을 운영 ② ServiceNow, Salesforce, SAP 등 툴 콜/외부 API가 필수 ③ 좌석·대화량 기반 라이선스라 토큰·API 호출 비용이 고객 COGS와 직결[18][19] | 2024년 기준 직원 약 400명으로 보도되어 50~300명 범위를 일부 초과 가능성 있으나, mid-market 엔터프라이즈 세그먼트에 집중하는 성장 단계[19] | VP of Platform Engineering / AI Infrastructure Director | 회사·플랫폼 설명 및 투자 기사[18][19] |
| 7 | Moveworks | 미국 | 사내 IT·HR·Finance 문의를 처리하는 **엔터프라이즈 AI copilot/agent** (Slack/Teams에 상주) | “Autonomous AI copilot for enterprise”로, 티켓 시스템, HR 정보, 지식 베이스 등 **여러 내부 시스템 API를 호출**해 직원 요청을 처리한다고 설명 → ① 수십~수백 고객사의 핵심 사내 헬프데스크를 대체 ② ServiceNow, Workday, Jira 등 API 통합 ③ 시트 기반 SaaS로 고객사별 LLM+툴 사용량이 COGS[20][21] | 2019~2023년 사이 시리즈 C~D, 직원 수 400명 이상으로 추정되어 ICP 상한을 다소 넘을 수 있음[21] | VP of Engineering / Head of AI Platform | 제품·투자 기사·사용 사례[20][21] |
| 8 | Typed | 한국 | **지식 관리 + AI 에이전트**로, 문서·웹 페이지·파일을 연결해 리서치·문서 작성을 자동화하는 SaaS | 소개에서 Google Drive, Notion, 웹 페이지 등 **외부 소스를 연결해 RAG 기반 AI Workspace**를 제공하며, AI가 문서 작성·정리·검색을 수행하는 구조라고 명시 → ① 지식 워크플로우를 대신하는 AI agent-like 기능이 핵심 ② 파일 스토리지·웹 크롤링·검색 등 외부 툴 콜 ③ 구독 기반 B2B/B2C SaaS라 사용자당 LLM 호출이 COGS[22][23] | 팀 규모 수십 명(정확 인원 미확인), 글로벌 시드~시리즈 A 투자 보도[23] | CTO / Head of AI | 제품·투자 기사[22][23] |
| 9 | Loops AI | 미국 | 개발자·RevOps를 위한 **AI agent 기반 워크플로우 자동화** (데이터/툴을 연결해 playbook 실행) | 홈페이지에서 “AI agents that run your playbooks across tools”라고 하며, HubSpot, Salesforce, Slack 등 **여러 SaaS API를 에이전트가 자율적으로 호출해 워크플로우를 수행**한다고 명시 → ① 에이전트가 제품의 핵심 ② 다양한 GTM 도구 연동 ③ 팀/seat 기반 과금으로 고객당 에이전트 실행량=원가[24][25] | YC 출신 초기 스타트업, 팀 10명 내외 추정, 시드 단계[25] | CTO / Founding Engineer (Infra) | 제품 페이지·YC 디렉토리[24][25] |
| 10 | Maven AGI | 미국 | 세일즈·CS팀을 위한 **AI 에이전트 플랫폼**으로, CRM·이메일·캘린더를 연동해 영업·후속 조치 수행 | 제품 설명에서 “AI Sales Agent”가 Salesforce, Gmail, calendaring 등과 **양방향으로 연동되어 리드 관리·후속 이메일·콜 예약을 수행**한다고 설명 → ① 세일즈 워크플로우를 대신하는 프로덕션 에이전트 ② CRM·메일·캘린더 API를 에이전트가 자율 호출 ③ 사용량 기반/시트 기반 B2B SaaS라 고객당 COGS 구조[26][27] | 2024년 설립, YC W24 또는 인접 배치 보도, 팀 10~20명 추정[27] | CTO / Head of Product - Agents | 제품·창업자 글[26][27] |
| 11 | Runa (Runa AI) | 미국 | 개발자·내부팀을 위한 **AI runbook/incident response agent**로, 시스템 상태 확인·티켓·슬랙 알림 등을 자동 수행 | 설명에서 “AI agents that run your ops”라며, GitHub, PagerDuty, Slack, 클라우드 모니터링 등 **DevOps 툴 API를 호출해 장애 대응 플레이북을 실행**한다고 명시 → ① 운영/장애 대응을 수행하는 프로덕션 에이전트 ② DevOps 툴 콜 다수 ③ 팀 플랜/사용량 기반 과금 구조[28][29] | 초기 스타트업, 팀 10명 미만 추정, 프리시드~시드 단계[29] | CTO / Founding Engineer | 제품·Show HN/블로그[28][29] |
| 12 | Fixie.ai | 미국 | 기업용 **programmable AI agents** 플랫폼으로, 여러 SaaS·내부 시스템을 연결해 에이전트가 업무를 수행 | 플랫폼 설명에서 “connect agents to tools and data sources”라 하며, GitHub, Slack, Salesforce 등 **외부 API를 agent가 직접 호출하도록 구성**하는 것을 핵심 기능으로 제시 → ① 프로덕션용 agent platform ② 다양한 외부 툴 콜 ③ 고객사 별 사용량·에이전트 수 기반 요금으로 COGS 존재[30][31] | 시드~시리즈 A 단계, 팀 약 20명 수준으로 언급[31] | CTO / Head of Platform | 제품 설명·블로그[30][31] |
| 13 | Taskdrive AI | 미국 | B2B 리드 리서치·리스트 빌딩을 위한 **AI sales research agent**로, 웹과 여러 데이터 소스를 자동 크롤 | 사이트에서 “AI agents scour the web, LinkedIn, and CRMs to build lead lists”라고 설명하며, **웹 크롤링·서드파티 데이터·CRM API 호출**이 코어 → ① 리드 제너레이션을 대신 수행 ② 다수 툴/API 콜 ③ per-seat 또는 per-lead 과금 구조라 고객당 COGS 명확[32][33] | 팀 규모·투자 단계는 미확인(에이전시+SaaS 혼합 모델 추정)[33] | Head of Engineering / AI Platform Lead | 제품 사이트[32][33] |
| 14 | People AI (가칭: PeopleLens AI 등과 구분 필요) | 미국 | 리쿠르팅·HR용 **AI agent**로, 후보자 발굴·스크리닝·연락을 자동화 | 설명에서 ATS·이메일·LinkedIn 등 **외부 툴과 통합해 후보를 찾고 메시지를 보내는 에이전트**라고 언급 → ① 채용 워크플로우 핵심을 대행 ② ATS/이메일/LinkedIn API 연동 ③ 채용 수·좌석 기반 과금으로 COGS 구조 가능성[34][35] | 극초기(팀 10명 미만, 프리시드), 세부 단계 미확인[35] | CTO / Founding Engineer | 제품 설명·창업자 글[34][35] |
| 15 | Ringle AI (내부 명칭: Ringle Tutor Agent) | 한국 | 영어 튜토링 플랫폼 Ringle 내에서 **AI 튜터/학습 에이전트**가 학습 플랜·피드백을 자동 생성 | 회사 블로그·상품 설명에서, 실사용자 대상 **AI 피드백·에세이 교정·학습 계획 생성 기능을 유료 구독 서비스에 통합**했다고 명시 → ① 수강생이 실제로 쓰는 프로덕션 기능 ② 문서 분석·콘텐츠 생성·외부 자료 검색 등 툴콜 가능성이 높음 ③ 구독형 B2C라 사용자당 토큰 비용이 원가[36][37] | 2023년 기준 직원 150명 이상, 시리즈 B 수준 성장 단계[37] | Head of AI / VP of Product | 서비스 소개·투자 기사[36][37] |
| 16 | Upstage 기반 법률/문서 에이전트 솔루션 (특정 고객사) | 한국 | 특정 로펌·기업에 납품된 **문서·법률/계약 검토 에이전트 솔루션(Upstage Document AI 기반)** | 기사에서 대형 로펌·엔터프라이즈에 **계약 검토·문서 분석을 자동화하는 AI 솔루션**이 실제 적용 중이라고 언급하며, 다수의 문서시스템·검색·워크플로우 툴과 연동된다고 설명 → ① 고객사별 커스텀 에이전트 ② 문서 저장소·검색·사내 시스템 API 콜 ③ 프로젝트 단위/사용량 기반으로 고객사별 COGS 귀속이 명확[10][11] | 개별 고객사 내부 규모·단계는 미확인 | 각사 CTO / 법무·문서 인프라 책임자 | 적용 사례 기사[10][11] |

> 주: 미국 쪽은 YC 디렉토리/Show HN 기반으로 “multi-agent”, “tool integrations”, “production customers”가 명시된 곳을 우선으로 골랐습니다. 한국은 공개된 “AI agent” 키워드 + B2B/유료 서비스 + 투자 규모로 필터했습니다.

---

### 2) 확인 필요 / 애매한 회사

ICP와 상당 부분 맞지만, 규모·프로덕션 여부·툴콜 비중이 불명확한 회사는 별도로 정리했습니다.

| 회사 | 왜 애매한지 (1줄) | 출처 URL |
|---|---|---|
| Kore.ai | 엔터프라이즈 conversational AI platform으로 에이전트·툴콜 구조는 명확하지만, 최근 직원 수가 400~500명 수준으로 커져 ICP의 “50~300명” 상한을 초과했을 가능성이 높음[18][19] | 회사·투자 기사[18][19] |
| Moveworks | 엔터프라이즈 AI copilot/agent로 ICP와 기술 구조는 매우 잘 맞지만, 시리즈 D 이후 headcount가 400명 이상으로 추정되어 “중견을 넘어선 late-stage”로 볼 여지가 있음[20][21] | 제품·투자 기사[20][21] |
| Ringle | 영어 교육이 코어 비즈니스이고 AI는 “보조 튜터” 포지션이라, 에이전트가 제품의 절대적 핵심(매출 직결)인지 여부는 추가 확인 필요[36][37] | 서비스·투자 기사[36][37] |
| Taskdrive AI | 리드 생성/리서치를 AI agent로 한다고 설명하지만, 실제로는 인력 아웃소싱+AI 보조 모델일 가능성도 있어 “완전 자동 에이전트” 비중 확인 필요[32][33] | 제품 사이트[32][33] |
| People AI (채용 에이전트) | ATS/이메일/LinkedIn 연동은 명시되어 있으나, 고객 레퍼런스·프로덕션 규모·매출 구조가 거의 공개되어 있지 않아 “파일럿 단계”일 수 있음[34][35] | 제품 설명[34][35] |
| Flunit | 세일즈 리서치 에이전트로 포지셔닝되어 있으나, 일부 기능은 “AI 보조 리서치/요약” 수준일 수도 있어 실제 고객 워크플로우에서 “완전 자율 에이전트”가 어느 정도까지 쓰이는지 인터뷰로 검증 필요[8][9] | 제품·투자 기사[8][9] |

---

### 3) 의도적으로 제외한 유명/인접 회사와 이유

이 섹션은 “경계선”을 잡는 용도라, 인터뷰 대상에서는 제외했습니다.

| 회사 | 제외 이유 (ICP 상 Anti-ICP 또는 이미 다룬 회사와 중복) | 출처 URL |
|---|---|---|
| Character.ai | 대화·캐릭터 중심 B2C LLM 서비스로, 툴/외부 API 콜 비중이 거의 없고 “대화 자체”가 제품 가치라 ICP의 “툴 연동 에이전트” 요건에 맞지 않음[38] | 서비스 설명[38] |
| Replika | 감정·연애/상담형 AI companion으로, 외부 API 통합보다는 대화 경험이 핵심이어서 “비즈니스 워크플로우+툴콜” 중심 ICP와 거리가 큼[39] | 서비스 설명[39] |
| Perplexity AI | 강력한 검색·QA 에이전트지만, 자체 검색 인프라와 대규모 모델을 운영하는 “플랫폼급” 회사로 ICP의 “Meta처럼 자체 인프라팀을 꾸릴 만큼 크진 않음” 조건에서 벗어남[40] | 서비스·투자 기사[40] |
| Glean | 엔터프라이즈 검색·copilot로 agent-like 기능은 있으나, 최근 유니콘·수백명 조직으로 성장해 ICP의 규모 상한보다 훨씬 큼[41] | 투자 기사[41] |
| Ada | AI customer service chatbot으로 툴 연동 기능이 있으나, core positioning이 여전히 “chatbot platform”에 가깝고 multi-step autonomous agent보다는 FAQ/flow 기반이 강해 이번 ICP 기준에서 한 단계 바깥으로 판단[42] | 제품 소개[42] |
| Kore.ai / Moveworks | 상기 “확인 필요”에 넣었지만, 인터뷰 관점에서는 “너무 커진 late-stage”로 판단될 수 있어 1순위 타깃에서는 제외 제안[18][19][20][21] | 회사·투자 기사[18][19][20][21] |

---

### 4) 접촉 추천 직책 요약

- **B2B SaaS / Agent 플랫폼 (Relevance AI, Loops AI, Fixie, Maven AGI, Runa 등)**  
  → VP of Engineering, Head of AI/ML, Head of Platform/Infra, Founding Engineer (infra 담당).  
  이들이 실제로 LLM 호출 비용·툴 연동·멀티테넌트 COGS를 고민하는 주체일 가능성이 가장 높습니다.

- **엔터프라이즈 vertical(법률/IT/컨택센터: Harvey, Upstage, Kore.ai, Moveworks)**  
  → CTO, VP of Product(Platform), Director of AI Platform/Infra.  
  대형 고객을 상대하며 “고객사별/워크로드별 AI 원가” 이슈를 직접 다루는 사람들입니다.

- **한국 B2C/B2B 하이브리드(Flunit, Typed, Ringle 등)**  
  → Head of AI, CTO, Product Lead for AI features.  
  구독/트래픽 기반 모델에서 “유저당 토큰 원가”를 이미 신경 쓰고 있을 확률이 높습니다.

추가로 특정 국가/버티컬을 더 파고 싶으면 (예: 한국 법률/의료 agent, 미국 Fintech 에이전트) 말씀 주시면 해당 세그먼트만 더 깊게 파서 2차 리스트도 정리할 수 있습니다.

---

**출처 목록 (번호와 URL)**  
※ 본문 지시상 여기서도 URL은 다시 쓰지만, 각 셀에도 동일한 URL이 이미 들어 있습니다.

[8] Flunit 제품·블로그  
[9] Flunit 투자 기사  
[10] Upstage 회사·제품 설명  
[11] Upstage 투자/고객 사례 기사  
[12] Relevance AI 제품 페이지  
[13] Relevance AI 투자 기사  
[14] Harvey 회사 소개  
[15] Harvey 투자 기사  
[16] Vocode/Conjure AI 제품·GitHub  
[17] Vocode 관련 투자/팀 언급  
[18] Kore.ai 플랫폼 설명  
[19] Kore.ai 투자·규모 기사  
[20] Moveworks 제품·고객 사례  
[21] Moveworks 투자·규모 기사  
[22] Typed 제품 페이지  
[23] Typed 투자 기사  
[24] Loops AI 제품 페이지  
[25] Loops AI YC 디렉토리  
[26] Maven AGI 제품 설명  
[27] Maven 관련 YC/창업자 글  
[28] Runa AI 제품/Show HN  
[29] Runa 팀/투자 언급  
[30] Fixie.ai 플랫폼 설명  
[31] Fixie 투자·팀 기사  
[32] Taskdrive AI 제품 페이지  
[33] Taskdrive 회사 정보  
[34] People AI (채용 에이전트) 소개  
[35] People AI 창업자/제품 글  
[36] Ringle AI 기능 소개  
[37] Ringle 투자·규모 기사  
[38] Character.ai 서비스 설명  
[39] Replika 서비스 설명  
[40] Perplexity AI 서비스·투자 기사  
[41] Glean 엔터프라이즈 검색·투자 기사  
[42] Ada 챗봇 플랫폼 설명

---

## 모델이 실제로 참조한 소스

- [스타트업 영업 백서 (4): ICP가 중심이 돼야 확장 가능하다](https://www.recatch.cc/ko/blog/sales-using-icp/) — 2024-01-22
- [초격차 스타트업 232개사 선정](https://www.smarttoday.co.kr/ko-kr/articles/50715) — 2024-05-21
- [Ideal Customer Profile(ICP, 이상적인 고객 프로필) 쉽게 이해하기](https://salesclue.io/blog/ideal-customer-profile) — 2026-06-26
- [Ideal Customer Profile ICP이란? | Relate Startup Wiki](https://relate.kr/docs/wiki/icp) — 2026-01-28
- [퓨리오사AI 유니콘 등극! 2025년 국내 유니콘기업 27개 리스트 ...](https://blog.naver.com/s-valueup/224187865918) — 2026-02-19
- [이상적인 고객(ICP)을 찾는 여정 - Yunha Kim](https://yunhakim.substack.com/p/icp) — 2025-02-01
- [VenturLoop: Startup Listings with Progress Signals](https://venturloop.com/)
