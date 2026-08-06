import { useState } from "react";
import { ChevronRight, TriangleAlert, Info } from "lucide-react";
import {
  CUSTOMERS,
  CATEGORY_META,
  GRAND_TOTAL,
  LOSS_CUSTOMERS,
  NON_LLM_SHARE,
  PERIOD,
  TOTALS,
  compactTokens,
  money,
  totalOf,
  type CategoryKey,
} from "@/data/kyber-seed";

const ORDER: CategoryKey[] = ["llm", "search", "db"];
const sorted = [...CUSTOMERS].sort((a, b) => totalOf(b) - totalOf(a));
const maxCost = totalOf(sorted[0]);

function Kpi({
  label,
  value,
  sub,
  tone = "default",
}: {
  label: string;
  value: string;
  sub: string;
  tone?: "default" | "violet" | "danger";
}) {
  const valueTone =
    tone === "violet"
      ? "text-cat-search"
      : tone === "danger"
        ? "text-destructive"
        : "text-foreground";
  return (
    <div className="panel p-5">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <p className={`mt-3 text-4xl font-semibold tracking-tight tabular-nums ${valueTone}`}>
        {value}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{sub}</p>
    </div>
  );
}

function Donut() {
  const r = 62;
  const c = 2 * Math.PI * r;
  let offset = 0;
  const slices = ORDER.map((k) => {
    const value = TOTALS[k];
    const frac = value / GRAND_TOTAL;
    const seg = { k, frac, dash: frac * c, offset };
    offset += frac * c;
    return seg;
  });

  return (
    <div className="panel flex flex-col p-5">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        Spend composition
      </p>
      <div className="mt-4 flex items-center gap-6">
        <div className="relative h-[160px] w-[160px] shrink-0">
          <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
            {slices.map((s) => (
              <circle
                key={s.k}
                cx="80"
                cy="80"
                r={r}
                fill="none"
                stroke={CATEGORY_META[s.k].token}
                strokeWidth="16"
                strokeDasharray={`${s.dash} ${c - s.dash}`}
                strokeDashoffset={-s.offset}
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-semibold tracking-tight text-cat-search tabular-nums">
              {Math.round(NON_LLM_SHARE * 100)}%
            </span>
            <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              non-LLM
            </span>
          </div>
        </div>
        <div className="min-w-0 flex-1 space-y-3">
          {ORDER.map((k) => (
            <div key={k} className="flex items-center gap-3">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-[3px]"
                style={{ backgroundColor: CATEGORY_META[k].token }}
              />
              <span className="flex-1 truncate text-sm text-muted-foreground">
                {CATEGORY_META[k].label}
              </span>
              <span className="text-sm tabular-nums text-foreground">{money(TOTALS[k])}</span>
              <span className="w-11 text-right text-xs tabular-nums text-muted-foreground">
                {Math.round((TOTALS[k] / GRAND_TOTAL) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-5 flex items-start gap-2 border-t border-hairline pt-4 text-xs leading-relaxed text-muted-foreground">
        <Info className="mt-px h-3.5 w-3.5 shrink-0" />
        <span>
          {Math.round(NON_LLM_SHARE * 100)}% of COGS never touches a model — it is tool and
          retrieval spend that token dashboards do not see.
        </span>
      </p>
    </div>
  );
}

export function CostAttribution() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-3">
        <Kpi
          label={`Total COGS · ${PERIOD}`}
          value={money(GRAND_TOTAL)}
          sub={`Across ${CUSTOMERS.length} accounts · ${money(TOTALS.revenue)} contracted revenue`}
        />
        <Kpi
          label="Non-LLM share of COGS"
          value={`${Math.round(NON_LLM_SHARE * 100)}%`}
          sub={`${money(TOTALS.search + TOTALS.db)} in search and external database calls`}
          tone="violet"
        />
        <Kpi
          label="Customers served at a loss"
          value={String(LOSS_CUSTOMERS.length)}
          sub={LOSS_CUSTOMERS.map((c) => c.name).join(" · ")}
          tone="danger"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.65fr_1fr]">
        <div className="panel overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-5 py-4">
            <div>
              <h2 className="text-sm font-semibold tracking-tight text-foreground">
                Cost attribution by customer
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Select a row for itemized task and token evidence
              </p>
            </div>
            <div className="flex items-center gap-4">
              {ORDER.map((k) => (
                <span key={k} className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span
                    className="h-2 w-2 rounded-[2px]"
                    style={{ backgroundColor: CATEGORY_META[k].token }}
                  />
                  {CATEGORY_META[k].label}
                </span>
              ))}
            </div>
          </div>

          <div className="divide-y divide-white/[0.05]">
            {sorted.map((cust) => {
              const total = totalOf(cust);
              const atLoss = total > cust.revenue;
              const isOpen = open === cust.id;
              return (
                <div key={cust.id}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : cust.id)}
                    className="w-full px-5 py-4 text-left transition-colors hover:bg-white/[0.03]"
                  >
                    <div className="flex items-center gap-3">
                      <ChevronRight
                        className={`h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-90" : ""}`}
                      />
                      <span className="truncate text-sm font-medium tracking-tight text-foreground">
                        {cust.name}
                      </span>
                      {atLoss && (
                        <span className="inline-flex items-center gap-1 rounded-md border border-destructive/40 bg-destructive/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-destructive">
                          <TriangleAlert className="h-3 w-3" />
                          Loss
                        </span>
                      )}
                      <span className="ml-auto text-[11px] tabular-nums text-muted-foreground">
                        rev {money(cust.revenue)}
                      </span>
                      <span className="w-20 text-right text-sm font-semibold tabular-nums text-foreground">
                        {money(total)}
                      </span>
                    </div>
                    <div className="mt-3 flex h-2.5 gap-0.5 pl-6">
                      <div
                        className="flex gap-0.5 overflow-hidden rounded-[3px]"
                        style={{ width: `${(total / maxCost) * 100}%` }}
                      >
                        {ORDER.map((k) => (
                          <div
                            key={k}
                            style={{
                              width: `${(cust.cost[k] / total) * 100}%`,
                              backgroundColor: CATEGORY_META[k].token,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-hairline bg-black/25 px-5 py-4">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                          Itemized tasks · {cust.plan}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          margin{" "}
                          <span
                            className={
                              atLoss ? "text-destructive tabular-nums" : "text-cat-db tabular-nums"
                            }
                          >
                            {money(cust.revenue - total)}
                          </span>
                        </p>
                      </div>
                      <table className="mt-3 w-full text-sm">
                        <thead>
                          <tr className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                            <th className="pb-2 text-left font-medium">Task</th>
                            <th className="pb-2 text-left font-medium">Model</th>
                            <th className="pb-2 text-right font-medium">Input</th>
                            <th className="pb-2 text-right font-medium">Output</th>
                            <th className="pb-2 text-right font-medium">Cost</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.05]">
                          {cust.tasks.map((t) => (
                            <tr key={t.id}>
                              <td className="py-2 pr-4 text-foreground">{t.name}</td>
                              <td className="py-2 pr-4">
                                <span className="rounded border border-hairline bg-white/[0.04] px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                                  {t.model}
                                </span>
                              </td>
                              <td className="py-2 text-right tabular-nums text-muted-foreground">
                                {compactTokens(t.inputTokens)}
                              </td>
                              <td className="py-2 text-right tabular-nums text-muted-foreground">
                                {compactTokens(t.outputTokens)}
                              </td>
                              <td className="py-2 text-right font-medium tabular-nums text-foreground">
                                {money(t.cost)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <Donut />
      </div>
    </div>
  );
}
