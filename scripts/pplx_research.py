#!/usr/bin/env python3
"""
Perplexity API로 인터뷰 후보 리서치 브리프를 실행한다.

사용법 (맥 터미널):
    export PERPLEXITY_API_KEY="pplx-..."      # 한 번만 ~/.zshrc 에 넣어두면 됨
    cd ~/Desktop/WTIA/AI_cost_gov
    python3 scripts/pplx_research.py

옵션:
    python3 scripts/pplx_research.py --model sonar-deep-research
    python3 scripts/pplx_research.py --brief Interview/다른브리프.md

결과는 Interview/_perplexity_결과_YYYY-MM-DD.md 로 저장된다.
저장 후 그 파일을 Claude에 올려서 검증·병합하면 된다.
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
DEFAULT_BRIEF = ROOT / "Interview" / "Perplexity_인터뷰후보_리서치브리프.md"
OUT_DIR = ROOT / "Interview"
ENDPOINT = "https://api.perplexity.ai/chat/completions"

SYSTEM_PROMPT = (
    "You are a research analyst. Follow the user's brief exactly, including its "
    "output table format. Every company you list must be backed by a real, "
    "verifiable source URL that you actually found in search. Never invent a "
    "company, a headcount, a funding stage, or a URL. If you cannot verify "
    "something, write 미확인. Answer in Korean, keeping industry terms in English."
)


def die(msg: str) -> None:
    print(f"\n[에러] {msg}\n", file=sys.stderr)
    sys.exit(1)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--model", default=os.environ.get("PPLX_MODEL", "sonar-pro"),
                    help="sonar | sonar-pro | sonar-reasoning-pro | sonar-deep-research")
    ap.add_argument("--brief", default=str(DEFAULT_BRIEF))
    ap.add_argument("--timeout", type=int, default=1800)
    args = ap.parse_args()

    key = os.environ.get("PERPLEXITY_API_KEY")
    if not key:
        die("PERPLEXITY_API_KEY 환경변수가 없다.\n"
            '      해결: echo \'export PERPLEXITY_API_KEY="pplx-..."\' >> ~/.zshrc && source ~/.zshrc')

    brief_path = pathlib.Path(args.brief)
    if not brief_path.is_absolute():
        brief_path = ROOT / brief_path
    if not brief_path.exists():
        die(f"브리프 파일을 못 찾았다: {brief_path}")

    brief = brief_path.read_text(encoding="utf-8")

    payload = {
        "model": args.model,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": brief},
        ],
    }

    print(f"모델: {args.model}")
    print(f"브리프: {brief_path.relative_to(ROOT)} ({len(brief):,}자)")
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

    # 출처: 모델/버전에 따라 search_results 또는 citations 로 온다
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
    out_path = OUT_DIR / f"_perplexity_결과_{today}.md"

    doc = [
        f"# Perplexity 리서치 결과 — 인터뷰 후보 ({today})",
        "",
        f"> ⚠️ **미검증 원본.** Perplexity `{args.model}` 출력 그대로다. "
        "출처 URL을 하나씩 열어 확인하기 전까지는 사실로 취급하지 말 것. "
        "검증 후 `Interview/인터뷰-후보-리스트.md`에 병합한다.",
        f">",
        f"> 브리프: `{brief_path.relative_to(ROOT)}` · "
        f"토큰: prompt {usage.get('prompt_tokens', '?')} / completion {usage.get('completion_tokens', '?')}",
        "",
        "---",
        "",
        content.strip(),
    ]
    if sources:
        doc += ["", "---", "", "## 모델이 실제로 참조한 소스", "", *sources]

    out_path.write_text("\n".join(doc) + "\n", encoding="utf-8")

    print(f"\n완료 → {out_path.relative_to(ROOT)}")
    print(f"참조 소스 {len(sources)}건 · "
          f"토큰 {usage.get('prompt_tokens', '?')}/{usage.get('completion_tokens', '?')}")


if __name__ == "__main__":
    main()
