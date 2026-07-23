# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 이 저장소의 성격

코드 저장소가 아니다. **AI 비용 거버넌스(AI cost governance)** 관련 창업 아이디어를 검증하기 위한 문서 워크스페이스다. 빌드/테스트/린트 명령은 없으며, 산출물은 전부 마크다운 문서다.

기본 언어는 한국어. 문서 작성과 대화 모두 한국어로 한다 (ICP, Buyer Persona 같은 업계 용어는 영어 그대로 사용).

## 디렉토리 구조

- `Problem/` — 해결하려는 문제 정의. 가설, 근거, 문제의 심각도·빈도 분석
- `ICP/` — Ideal Customer Profile. 타겟 기업의 규모, 산업, AI 사용 형태 등 기업 단위 프로필
- `Buyer-Persona/` — 구매 의사결정자 개인 단위 페르소나 (역할, 목표, pain point, 구매 트리거)
- `Competitor-Analysis/` — 경쟁 환경 분석. 직접 경쟁자(문제·솔루션 동일), 간접 경쟁자(문제만 동일), status quo(솔루션 없이 취하는 행동)로 분류
- `Interview/` — 고객 인터뷰 기록. 파일명은 `YYYY-MM-DD-대상.md` 형식으로 날짜를 앞에 붙인다
- `Solution/` — 솔루션 방향과 차별화. 경쟁사 대비 moat 후보 발굴과 제품 가설
- `Market/` — 시장 규모 산정(TAM/SAM/SOM)과 시장 데이터

## 작업 원칙

- 문서 간 일관성이 핵심이다. 한 문서를 수정하면 연관 문서(예: Problem 가설 변경 → ICP/Persona)에 영향이 없는지 확인한다.
- 인터뷰 기록은 원자료다. 요약·해석을 덧붙일 수는 있어도 원문 발언을 수정하지 않는다.
- 검증되지 않은 가설과 인터뷰로 확인된 사실을 문서 안에서 구분해서 표기한다.

## ⚡ 세션 시작 규칙 (중요)

아이디어/사업 관련 작업으로 호출되면 **먼저 `_START_HERE.md`를 읽고** 바로 시작한다.
다른 문서는 `_START_HERE.md`가 가리키거나 특정 작업에 필요할 때만 연다(토큰 절약).
아이디어 관련 대화가 끝날 때마다 `_START_HERE.md`의 "현재 상태·다음 할 일·결정 로그"를 최신화한다.
