#!/usr/bin/env python3
"""
이미 작성된 문서(팩트체크 리포트 등)를 Perplexity에 넣어 교차검증한다.

사용법 (맥 터미널):
    export PERPLEXITY_API_KEY="pplx-..."      # ~/.zshrc 에 한 번만
    cd ~/Desktop/WTIA/AI_cost_gov
    python3 scripts/pplx_verify.py --doc Pitch/FACTCHECK-2026-08-06.md

옵션:
    --model sonar-reasoning-pro    (기본 sonar-pro / 깊게 보려면 sonar-deep-research)
    --out   직접 저장 경로 지정

결과는 Pitch/PPLX-VERIFY-YYYY-MM-DD.md 로 저장된다 (ASCII 파일명).
API 키는 환경변수로만 읽는다. 절대 이 파일이나 리포지토리에 적지 말 것 (repo는 PUBLIC).
"""

import argparse
import datetime
import json
import os
import pathlib
import sys
import urllib.error
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
ENDPOINT = "https://api.perplexity.ai/chat/completions"

SYSTEM_PROMPT = (
    "You are an adversarial fact-checker preparing a founder for a live investor "
    "Q&A. You will be given a Korean fact-check report that another analyst wrote. "
    "Your job is NOT to agree with it. Independently verify every numeric claim, "
    "every source attribution, and every competitive claim in it using real search. "
    "For each item output exactly these fields:\n"
    "  CLAIM_ID / VERDICT (CONFIRMED | WRONG | UNVERIFIABLE | OUTDATED) / "
    "REAL_NUMBER / EVIDENCE (source name + publication date + URL) / "
    "SAFE_REPHRASE (a sentence the founder can safely say on stage).\n"
    "Rules: NEVER invent a URL, a report title, a date, or a figure. If you cannot "
    "find a source, write NO_SOURCE_FOUND -- that is a valid and valuable verdict, "
    "not a failure. If the report's own cited source does not actually contain the "
    "number attributed to it, say so explicitly. Flag any claim that was true in "
    "2025 but is stale in 2026. Prioritize primary sources (vendor docs, filed "
    "reports, official pricing pages) over secondary blogs. "
    "Answer in Korean, keeping industry terms in English."
)

USER_PREFIX = (
    "아래는 검증 대상 문서다. 이 문서의 판정을 그대로 믿지 말고, 각 주장을 "
    "독립적으로 다시 검색해서 확인하라. 특히 (1) 출처가 실제로 그 숫자를 담고 "
    "있는지, (2) 2026년 기준으로 여전히 유효한지, (3) 경쟁사 관련 주장이 해당 "
    "업체의 공식 문서와 배치되지 않는지를 집중적으로 본다.\n\n"
    "=== 검증 대상 문서 시작 ===\n\n"
)


def die(msg: str) -> None:
    print(f"\n[에러] {msg}\n", file=sys.stderr)
    sys.exit(1)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--doc", required=True, help="검증할 문서 경로 (repo 기준 상대경로 가능)")
    ap.add_argument("--model", default=os.environ.get("PPLX_MODEL", "sonar-pro"),
                    help="sonar | sonar-pro | sonar-reasoning-pro | sonar-deep-research")
    ap.add_argument("--out", default=None)
    ap.add_argument("--timeout", type=int, default=1800)
    args = ap.parse_args()

    key = os.environ.get("PERPLEXITY_API_KEY")
    if not key:
        die("PERPLEXITY_API_KEY 환경변수가 없다.\n"
            '      해결: echo \'export PERPLEXITY_API_KEY="pplx-..."\' >> ~/.zshrc && source ~/.zshrc')

    doc_path = pathlib.Path(args.doc)
    if not doc_path.is_absolute():
        doc_path = ROOT / doc_path
    if not doc_path.exists():
        die(f"문서를 못 찾았다: {doc_path}")

    doc = doc_path.read_text(encoding="utf-8")

    payload = {
        "model": args.model,
        "temperature": 0.1,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": USER_PREFIX + doc},
        ],
    }

    print(f"모델: {args.model}")
    print(f"검증 대상: {doc_path.name} ({len(doc):,}자)")
    print("호출 중... (deep-research 모델은 수 분 걸릴 수 있다)")

    req = urllib.request.Request(
        ENDPOINT,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=args.timeout) as resp:
            data = json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", "replace")[:1000]
        die(f"HTTP {e.code}\n{body}")
    except urllib.error.URLError as e:
        die(f"네트워크 연결 실패: {e.reason}")

    content = data["choices"][0]["message"]["content"]

    sources = []
    for item in data.get("search_results") or []:
        title = item.get("title") or item.get("url", "")
        url = item.get("url", "")
        date = item.get("date") or ""
        sources.append(f"- [{title}]({url}){f' — {date}' if date else ''}")
    if not sources:
        for url in data.get("citations") or []:
            sources.append(f"- {url}")

    usage = data.get("usage", {})
    today = datetime.date.today().isoformat()
    out_path = pathlib.Path(args.out) if args.out else (ROOT / "Pitch" / f"PPLX-VERIFY-{today}.md")
    if not out_path.is_absolute():
        out_path = ROOT / out_path

    out = [
        f"# Perplexity 교차검증 결과 — {doc_path.name} ({today})",
        "",
        f"> ⚠️ **미검증 원본.** Perplexity `{args.model}` 출력 그대로다. "
        "출처 URL을 하나씩 열어보기 전까지 사실로 취급하지 말 것. "
        "두 판정이 엇갈리면 원문 URL을 직접 연 쪽을 따른다.",
        ">",
        f"> 대상: `{doc_path.relative_to(ROOT)}` · "
        f"토큰: prompt {usage.get('prompt_tokens', '?')} / completion {usage.get('completion_tokens', '?')}",
        "",
        "---",
        "",
        content.strip(),
    ]
    if sources:
        out += ["", "---", "", "## 모델이 실제로 참조한 소스", "", *sources]

    out_path.write_text("\n".join(out) + "\n", encoding="utf-8")

    print(f"\n완료 → {out_path.relative_to(ROOT)}")
    print(f"참조 소스 {len(sources)}건")


if __name__ == "__main__":
    main()
