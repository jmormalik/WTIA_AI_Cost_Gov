#!/usr/bin/env python3
"""
인터뷰 후보 발굴 — Perplexity 분할 질의 버전.

긴 브리프를 한 번에 던지면 모델이 검색을 거의 안 하고 기억으로 표를 채운다
(2026-07-24 1차 시도에서 실증됨: 회사 16곳에 실제 검색 소스는 7건, 그나마 전부 무관).
그래서 좁은 질의를 여러 번 나눠 던지고, 질의마다 모델이 실제로 연 URL을 같이 기록한다.

사용법 (맥 터미널):
    export PERPLEXITY_API_KEY="pplx-..."
    cd ~/Desktop/WTIA/AI_cost_gov
    python3 scripts/pplx_discover.py

옵션:
    python3 scripts/pplx_discover.py --model sonar-pro   # 기본값
    python3 scripts/pplx_discover.py --only 1 3 5        # 특정 질의만 재실행

결과: Interview/_perplexity_발굴_YYYY-MM-DD.md
"""

import argparse
import datetime
import json
import os
import pathlib
import sys
import time
import urllib.error
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "Interview"
ENDPOINT = "https://api.perplexity.ai/chat/completions"

EXCLUDE = (
    "라이너/Liner, 뤼튼/Wrtn, 로앤컴퍼니/슈퍼로이어, 달파/Dalpha, 채널톡/채널코퍼레이션, "
    "올거나이즈/Allganize, 스캐터랩/제타, 제논, 스켈터랩스, Amulet, Sidekick, Bravi, "
    "Lindy, Dust, 11x, Artisan, Sierra, Decagon, Cognition"
)

SYSTEM_PROMPT = f"""You are a research analyst building a list of real companies.

HARD RULES — violating any of these makes the answer worthless:
1. List a company ONLY if you actually opened a page about it in this search. If you
   did not retrieve a page, do not list it. Fewer verified rows beats more guessed rows.
2. Every row must carry the exact URL you retrieved. No bare citation numbers.
3. Never invent a company, a headcount, a funding stage, a product description, or a URL.
   If a field is not on the page you read, write 미확인.
4. If the search returns nothing useful, say so plainly and output an empty table.
   That is an acceptable answer.
5. Already covered — do NOT list these: {EXCLUDE}

Output format: a markdown table with exactly these columns, max 8 rows.
| 회사 | 국가 | 무엇을 하나 (1줄) | 에이전트가 툴/외부 API를 자율 호출하는 근거 | 규모/단계 | 근거 URL |

After the table, add one line starting with "메모:" noting anything you could not verify.
Answer in Korean; keep company names and industry terms in English/원어.
"""

CONTEXT = (
    "찾는 대상: 프로덕션에서 AI 에이전트를 돌리고, 그 에이전트가 자율적으로 툴·외부 API를 "
    "호출하며, 그 비용이 사업 원가(COGS)에 직결되는 회사. 규모 50~300명 / 시드~시리즈 C. "
    "단순 챗봇, AI가 곁가지인 SaaS, 파일럿만 있는 곳은 제외."
)

QUERIES = [
    ("한국 · AIIA 국가대표 AI 100 (에이전트 분야)",
     "AIIA(한국인공지능산업협회)가 선정한 '국가대표 AI 기업 100'의 AI 에이전트 분야에 "
     "포함된 기업 명단을 찾아라. 실제 명단이 실린 기사나 협회 페이지를 열고, 거기 나온 "
     "회사 중 위 조건에 맞는 곳만 표로 정리해라."),

    ("한국 · Google for Startups AI First Korea 배치",
     "Google for Startups의 AI First Korea(또는 Accelerator: AI First 한국 배치) 참여 "
     "스타트업 명단을 찾아라. 명단이 실린 공식 페이지나 기사를 열고, 그중 AI 에이전트를 "
     "프로덕션으로 운영하는 회사만 표로 정리해라."),

    ("한국 · B2B AI 에이전트 스타트업 (시드~시리즈B, 유료 고객)",
     "2025~2026년 한국의 B2B AI 에이전트 스타트업 중 유료 고객사를 확보했다고 "
     "보도된 곳을 찾아라. 투자 유치 기사, THE VC 기업 페이지, 회사 블로그를 근거로 삼아라."),

    ("한국 · 버티컬 에이전트 (의료·금융·커머스·제조)",
     "한국에서 의료, 금융, 커머스, 제조 중 한 분야에 특화된 AI 에이전트를 실제 고객사에 "
     "납품·운영 중인 스타트업을 찾아라. 법률과 CS 분야는 이미 다뤘으니 제외."),

    ("미국 · YC 최근 배치 AI agent",
     "Y Combinator W25, S25, W26 배치 중 AI agent 제품을 만들고 유료 고객이 있다고 "
     "명시된 회사를 YC 디렉토리 페이지에서 찾아라. 각 회사의 YC 디렉토리 URL을 근거로 달아라."),

    ("미국 · 툴 콜 집약형 에이전트 (외부 API 다수 연동)",
     "미국의 시드~시리즈A AI agent 스타트업 중, 제품 문서나 엔지니어링 블로그에서 "
     "에이전트가 여러 외부 SaaS·API를 자율적으로 호출한다고 명시한 회사를 찾아라. "
     "제품 문서 또는 기술 블로그 URL을 근거로 달아라."),

    ("미국 · Voice AI agent (통화당 원가 구조)",
     "미국의 voice AI agent 스타트업 중 실제 고객사 통화를 운영 중이고 통화당/분당 과금 "
     "구조를 공개한 곳을 찾아라. 통화량이 곧 원가라 COGS pain이 뚜렷한 회사를 우선."),

    ("미국 · 고객사별 에이전트 운영 (멀티테넌트 원가 귀속)",
     "미국의 AI agent 스타트업 중 고객사마다 별도 에이전트를 배포·운영하는 모델(고객사 "
     "단위 비용 귀속이 필요한 구조)을 쓰는 곳을 찾아라. 가격 페이지나 아키텍처 문서를 근거로."),
]


def die(msg: str) -> None:
    print(f"\n[에러] {msg}\n", file=sys.stderr)
    sys.exit(1)


def ask(key: str, model: str, question: str, timeout: int) -> dict:
    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": f"{CONTEXT}\n\n질의: {question}"},
        ],
    }
    req = urllib.request.Request(
        ENDPOINT,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return json.loads(resp.read().decode("utf-8"))


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--model", default=os.environ.get("PPLX_MODEL", "sonar-pro"))
    ap.add_argument("--timeout", type=int, default=300)
    ap.add_argument("--only", nargs="*", type=int, default=None,
                    help="실행할 질의 번호 (1부터). 생략하면 전부.")
    args = ap.parse_args()

    key = os.environ.get("PERPLEXITY_API_KEY")
    if not key:
        die("PERPLEXITY_API_KEY 환경변수가 없다.\n"
            '      해결: echo \'export PERPLEXITY_API_KEY="pplx-..."\' >> ~/.zshrc && source ~/.zshrc')

    selected = list(enumerate(QUERIES, 1))
    if args.only:
        selected = [(i, q) for i, q in selected if i in args.only]

    today = datetime.date.today().isoformat()
    out_path = OUT_DIR / f"_perplexity_발굴_{today}.md"

    blocks = [
        f"# Perplexity 발굴 결과 — 인터뷰 후보 ({today})",
        "",
        f"> ⚠️ **미검증 원본.** 모델 `{args.model}`, 분할 질의 {len(selected)}건. "
        "각 질의 아래 **'실제 검색된 소스'** 목록이 핵심 판단 근거다. "
        "그 목록이 비어 있거나 질의와 무관하면 그 표는 모델이 지어낸 것이므로 버릴 것.",
        "",
    ]
    total_in = total_out = 0

    for idx, (label, question) in selected:
        print(f"[{idx}/{len(QUERIES)}] {label} ... ", end="", flush=True)
        try:
            data = ask(key, args.model, question, args.timeout)
        except urllib.error.HTTPError as e:
            body = e.read().decode("utf-8", "replace")[:300]
            print(f"실패 HTTP {e.code}")
            blocks += [f"## {idx}. {label}", "", f"❌ 호출 실패: HTTP {e.code} — {body}", ""]
            continue
        except Exception as e:  # noqa: BLE001
            print(f"실패 {e}")
            blocks += [f"## {idx}. {label}", "", f"❌ 호출 실패: {e}", ""]
            continue

        content = data["choices"][0]["message"]["content"].strip()
        results = data.get("search_results") or []
        srcs = []
        for item in results:
            srcs.append(f"- [{item.get('title') or item.get('url','')}]({item.get('url','')})")
        if not srcs:
            for url in data.get("citations") or []:
                srcs.append(f"- {url}")

        usage = data.get("usage", {})
        total_in += usage.get("prompt_tokens", 0) or 0
        total_out += usage.get("completion_tokens", 0) or 0

        print(f"소스 {len(srcs)}건")

        blocks += [
            f"## {idx}. {label}",
            "",
            f"*질의:* {question}",
            "",
            content,
            "",
            f"**실제 검색된 소스 ({len(srcs)}건)**",
            "",
            *(srcs or ["- (없음 — 이 표는 신뢰하지 말 것)"]),
            "",
            "---",
            "",
        ]
        time.sleep(1)

    blocks += ["", f"*토큰 합계: prompt {total_in:,} / completion {total_out:,}*"]
    out_path.write_text("\n".join(blocks) + "\n", encoding="utf-8")

    print(f"\n완료 → {out_path.relative_to(ROOT)}")
    print(f"토큰 {total_in:,}/{total_out:,}")


if __name__ == "__main__":
    main()
