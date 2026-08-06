import type { ReactNode } from "react";
import {
  FileText,
  TriangleAlert,
  Lightbulb,
  ArrowDownRight,
  ShieldCheck,
} from "lucide-react";
import {
  CUSTOMERS,
  CATEGORY_META,
  GRAND_TOTAL,
  LOOP,
  NON_LLM_SHARE,
  PERIOD,
  TOTALS,
  money,
  totalOf,
  type CategoryKey,
} from "@/data/kyber-seed";

const ORDER: CategoryKey[] = ["llm", "search", "db"];

const ORG_REVENUE = TOTALS.revenue;
const ORG_MARGIN = ORG_REVENUE - GRAND_TOTAL;
const ORG_MARGIN_PCT = ORG_MARGIN / ORG_REVENUE;
const NON_LLM_COST = TOTALS.search + TOTALS.db;

const ROWS = CUSTOMERS.map((c) => {
  const cogs = totalOf(c);
  const margin = c.revenue - cogs;
  return {
    id: c.id,
    name: c.name,
    plan: c.plan,
    revenue: c.revenue,
    cogs,
    margin,
    marginPct: margin / c.revenue,
    nonLlm: (c.cost.search + c.cost.db) / cogs,
  };
}).sort((a, b) => a.marginPct - b.marginPct);

const LOSS = ROWS.filter((r) => r.margin < 0);

function pct(n: number) {
  return `${Math.round(n * 100)}%`;
}

function Metric({
  label,
  value,
  sub,
  tone = "default",
}: {
  label: string;
  value: string;
  sub: string;
  tone?: "default" | "violet" | "teal" | "danger";
}) {
  const toneClass =
    tone === "violet"
      ? "text-cat-search"
      : tone === "teal"
        ? "text-cat-db"
        : tone === "danger"
          ? "text-destructive"
          : "text-foreground";
  return (
    <div className="panel p-5">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <p className={`mt-3 text-3xl font-semibold tracking-tight tabular-nums ${toneClass}`}>
        {value}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{sub}</p>
    </div>
  );
}

function SectionTitle({ n, title, hint }: { n: string; title: string; hint?: string }) {
  return (
    <div className="mb-4 flex items-baseline gap-3">
      <span className="font-mono text-xs text-cat-search">{n}</span>
      <h2 className="text-sm font-semibold tracking-tight text-foreground">{title}</h2>
      {hint && <span className="text-[11px] text-muted-foreground">· {hint}</span>}
    </div>
  );
}

export function CostReport() {
  return (
    <div className="mx-auto max-w-[920px] space-y-8 pb-10">
      {/* Report masthead */}
      <div className="panel p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <FileText className="mt-0.5 h-5 w-5 text-cat-search" />
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-foreground">
                AI Agent Cost Analysis
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Portfolio unit economics across {CUSTOMERS.length} accounts · {PERIOD}
              </p>
            </div>
          </div>
          <div className="text-right text-[11px] text-muted-foreground">
            <p>
              Prepared by <span className="text-foreground">Kyber</span>
            </p>
            <p className="mt-0.5">Billing period {PERIOD}</p>
            <span className="mt-2 inline-block rounded border border-cat-search/40 bg-cat-search/10 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.12em] text-cat-search">
              Illustrative sample data
            </span>
          </div>
        </div>

        <p className="mt-5 border-t border-hairline pt-4 text-sm leading-relaxed text-muted-foreground">
          Total cost of goods sold reached{" "}
          <span className="font-medium text-foreground">{money(GRAND_TOTAL)}</span> against{" "}
          <span className="font-medium text-foreground">{money(ORG_REVENUE)}</span> in contracted
          revenue — a blended gross margin of{" "}
          <span className="font-medium text-cat-db">{pct(ORG_MARGIN_PCT)}</span>.{" "}
          <span className="text-foreground">{pct(NON_LLM_SHARE)}</span> of COGS never touched a
          model: it is search and external-database spend that token dashboards do not attribute to
          the agent that triggered it. Two accounts are currently served at a loss.
        </p>
      </div>

      {/* 1. Headline metrics */}
      <section>
        <SectionTitle n="01" title="Headline metrics" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric
            label="Total COGS"
            value={money(GRAND_TOTAL)}
            sub={`${money(ORG_REVENUE)} contracted revenue`}
          />
          <Metric
            label="Blended gross margin"
            value={pct(ORG_MARGIN_PCT)}
            sub={`${money(ORG_MARGIN)} retained this period`}
            tone="teal"
          />
          <Metric
            label="Non-LLM share of COGS"
            value={pct(NON_LLM_SHARE)}
            sub={`${money(NON_LLM_COST)} in search + external DB`}
            tone="violet"
          />
          <Metric
            label="Accounts at a loss"
            value={String(LOSS.length)}
            sub={LOSS.map((r) => r.name).join(" · ")}
            tone="danger"
          />
        </div>
      </section>

      {/* 2. Cost composition */}
      <section>
        <SectionTitle n="02" title="Cost composition" hint="where the money goes" />
        <div className="panel p-6">
          <div className="flex h-4 overflow-hidden rounded-md">
            {ORDER.map((k) => (
              <div
                key={k}
                style={{
                  width: `${(TOTALS[k] / GRAND_TOTAL) * 100}%`,
                  backgroundColor: CATEGORY_META[k].token,
                }}
              />
            ))}
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {ORDER.map((k) => (
              <div key={k} className="flex items-center gap-3">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-[3px]"
                  style={{ backgroundColor: CATEGORY_META[k].token }}
                />
                <div className="min-w-0">
                  <p className="text-sm text-foreground">{CATEGORY_META[k].label}</p>
                  <p className="text-xs tabular-nums text-muted-foreground">
                    {money(TOTALS[k])} · {Math.round((TOTALS[k] / GRAND_TOTAL) * 100)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Account margins */}
      <section>
        <SectionTitle n="03" title="Account unit economics" hint="ranked by margin" />
        <div className="panel overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-hairline text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                <th className="px-5 py-3 text-left font-medium">Account</th>
                <th className="px-3 py-3 text-right font-medium">Revenue</th>
                <th className="px-3 py-3 text-right font-medium">COGS</th>
                <th className="px-3 py-3 text-right font-medium">Non-LLM</th>
                <th className="px-3 py-3 text-right font-medium">Margin</th>
                <th className="px-5 py-3 text-right font-medium">Margin %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {ROWS.map((r) => (
                <tr key={r.id} className={r.margin < 0 ? "bg-destructive/[0.06]" : ""}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium tracking-tight text-foreground">{r.name}</span>
                      {r.margin < 0 && (
                        <span className="inline-flex items-center gap-1 rounded-md border border-destructive/40 bg-destructive/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-destructive">
                          <TriangleAlert className="h-3 w-3" />
                          Loss
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{r.plan}</p>
                  </td>
                  <td className="px-3 py-3 text-right tabular-nums text-muted-foreground">
                    {money(r.revenue)}
                  </td>
                  <td className="px-3 py-3 text-right tabular-nums text-muted-foreground">
                    {money(r.cogs)}
                  </td>
                  <td className="px-3 py-3 text-right tabular-nums text-muted-foreground">
                    {pct(r.nonLlm)}
                  </td>
                  <td
                    className={`px-3 py-3 text-right font-medium tabular-nums ${r.margin < 0 ? "text-destructive" : "text-foreground"}`}
                  >
                    {money(r.margin)}
                  </td>
                  <td
                    className={`px-5 py-3 text-right font-semibold tabular-nums ${r.margin < 0 ? "text-destructive" : "text-cat-db"}`}
                  >
                    {pct(r.marginPct)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Findings */}
      <section>
        <SectionTitle n="04" title="Findings" />
        <div className="grid gap-3 md:grid-cols-3">
          <Finding
            icon={<ArrowDownRight className="h-4 w-4 text-destructive" />}
            title={`${LOSS.length} accounts served at a loss`}
            body={`${LOSS.map((r) => `${r.name} (${money(r.margin)})`).join(", ")} — both on Growth plans whose flat price no longer covers their non-LLM spend.`}
          />
          <Finding
            icon={<FileText className="h-4 w-4 text-cat-search" />}
            title={`${pct(NON_LLM_SHARE)} of COGS is non-LLM`}
            body={`${money(NON_LLM_COST)} in search and external-database calls sits outside token dashboards and is not attributed to the triggering agent.`}
          />
          <Finding
            icon={<ShieldCheck className="h-4 w-4 text-cat-db" />}
            title="1 runaway loop intercepted"
            body={`${LOOP.customerName}'s refund agent repeated an identical tool call; the gate refused the next call and prevented ~${money(LOOP.estimatedSavings)} this period.`}
          />
        </div>
      </section>

      {/* 5. Recommendations */}
      <section>
        <SectionTitle n="05" title="Recommendations" />
        <ol className="panel divide-y divide-white/[0.05] p-1">
          {[
            {
              t: "Reprice the two loss accounts",
              d: "Move Helix and Orbital to a plan that prices the non-LLM tool spend they actually generate, or cap it. A flat Growth price cannot absorb search + retrieval that scales with their usage.",
            },
            {
              t: "Attribute non-LLM spend to the triggering agent",
              d: "Tag every search and external-database call to the agent, feature, and customer that caused it. Token dashboards alone leave 41% of this portfolio's COGS unattributed.",
            },
            {
              t: "Set per-account hard limits on repeated tool signatures",
              d: "The loop breaker that saved ~$1,840 on Orbital should be enforced portfolio-wide — refuse the next call once a signature repeats with zero information gain.",
            },
          ].map((r, i) => (
            <li key={i} className="flex items-start gap-3 px-4 py-4">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-cat-search" />
              <div>
                <p className="text-sm font-medium tracking-tight text-foreground">{r.t}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{r.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Footer / methodology */}
      <p className="border-t border-hairline pt-5 text-[11px] leading-relaxed text-muted-foreground">
        <span className="font-medium text-foreground">Methodology &amp; disclaimer.</span> All figures
        in this report are <span className="text-cat-search">illustrative sample data</span>{" "}
        generated to demonstrate the Kyber attribution model — they are not a market benchmark or a
        real customer portfolio. Cost is attributed across the full execution path (LLM API + search
        tools + external databases). Swap the seed data in{" "}
        <span className="font-mono">src/data/kyber-seed.ts</span> for real design-partner numbers
        before presenting any figure as fact.
      </p>
    </div>
  );
}

function Finding({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="panel p-5">
      <div className="flex items-center gap-2.5">
        {icon}
        <p className="text-sm font-medium tracking-tight text-foreground">{title}</p>
      </div>
      <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
