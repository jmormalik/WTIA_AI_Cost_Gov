# CLAUDE.md

Guidance for Claude working in this repository.

## Nature of this repo

Not a code repo. A **document workspace to validate a startup idea around AI (agent) cost governance**. No build/test/lint; all deliverables are markdown.

**Output language = Korean.** Write docs and converse in Korean (keep industry terms like ICP, Buyer Persona in English). This CLAUDE.md and `_START_HERE.md` are kept in English for token economy — that does NOT change the Korean output rule.

## Directory structure

- `Problem/` — problem definition. Hypotheses, evidence, severity/frequency analysis.
- `ICP/` — Ideal Customer Profile. Company-level profile: size, industry, AI usage.
- `Buyer-Persona/` — individual decision-maker personas (role, goals, pain points, buying triggers).
- `Competitor-Analysis/` — competitive landscape: direct (same problem+solution), indirect (same problem only), status quo (what they do with no solution).
- `Interview/` — customer interview records. Filename format `YYYY-MM-DD-target.md` (date first).
- `Solution/` — solution direction & differentiation; moat candidates, product hypotheses, business model & pricing.
- `Pitch/` — deck slide copy (pitch storyline, BM/pricing/finance slides) + live-pitch support (mentor Q&A brief). Stage-facing material; `Solution/` holds the strategy behind it.
- `Market/` — market sizing (TAM/SAM/SOM), cross-verified market/competition write-up (`시장조사.md`).
- `deliverables/` — our filled homework/outputs (docx/xlsx).
- `_archive/` — **git-ignored.** Rejected/superseded drafts kept for local history only; absent after a fresh clone.
- `_class-materials/` — **git-ignored.** Lecture pptx, mentor PDF, blank templates. Local reference only; do not upload.

## Working principles

- Cross-document consistency is critical. Editing one doc → check impact on linked docs (e.g. Problem hypothesis change → ICP/Persona).
- Interview records are raw data. You may append summary/interpretation but never alter the original quotes.
- Distinguish unverified hypotheses from interview-confirmed facts within each doc.

## ⚡ Session-start rule (important)

When invoked for idea/business work, **read `_START_HERE.md` first**, then start.
Open other docs only when `_START_HERE.md` points to them or a specific task needs them (token economy).
After every idea-related session, update `_START_HERE.md` ("Status · Next · Decision log").

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:
- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore
- Author a backlog-ready spec/issue → invoke /spec
