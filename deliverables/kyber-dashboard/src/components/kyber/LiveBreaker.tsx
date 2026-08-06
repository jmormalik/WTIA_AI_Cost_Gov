import { useEffect, useMemo, useRef, useState } from "react";
import { Play, RotateCcw, ShieldBan, ShieldCheck, Radio } from "lucide-react";
import { LOOP, money } from "@/data/kyber-seed";

export function LiveBreaker() {
  const [hardLimit, setHardLimit] = useState(true);
  const [running, setRunning] = useState(false);
  const [index, setIndex] = useState(0);
  const [blocked, setBlocked] = useState(false);
  const [extraCost, setExtraCost] = useState(0);
  const logRef = useRef<HTMLDivElement>(null);

  const shown = LOOP.events.slice(0, index);

  const repeats = useMemo(() => {
    const counts: Record<string, number> = {};
    let dominant = { sig: "", n: 0 };
    for (const e of shown) {
      counts[e.signature] = (counts[e.signature] ?? 0) + 1;
      if (counts[e.signature] > dominant.n) dominant = { sig: e.signature, n: counts[e.signature] };
    }
    return dominant;
  }, [shown]);

  const detected = repeats.n >= LOOP.threshold;
  const burned = shown.reduce((s, e) => s + e.cost, 0) + extraCost;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setIndex((i) => {
        const next = LOOP.events[i];
        if (!next) {
          if (hardLimit) return i;
          setExtraCost((c) => c + 0.91);
          return i;
        }
        return i + 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, hardLimit]);

  useEffect(() => {
    if (!running || !hardLimit) return;
    const counts: Record<string, number> = {};
    for (let i = 0; i < index; i++) {
      const s = LOOP.events[i].signature;
      counts[s] = (counts[s] ?? 0) + 1;
      if (counts[s] >= LOOP.threshold && i + 1 < LOOP.events.length) {
        setIndex(i + 1);
        setBlocked(true);
        setRunning(false);
        return;
      }
    }
  }, [index, running, hardLimit]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [index, extraCost, blocked]);

  const reset = () => {
    setIndex(0);
    setBlocked(false);
    setExtraCost(0);
    setRunning(true);
  };

  const overrun = shown.filter((e) => e.signature === repeats.sig).length;

  return (
    <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
      <div className="panel flex flex-col overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-5 py-4">
          <div className="flex items-center gap-2.5">
            <Radio
              className={`h-3.5 w-3.5 ${running ? "animate-pulse text-cat-db" : "text-muted-foreground"}`}
            />
            <div>
              <h2 className="text-sm font-semibold tracking-tight text-foreground">
                Agent execution log
              </h2>
              <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                {LOOP.agent} · {LOOP.customerName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => (index === 0 ? reset() : setRunning((r) => !r))}
              className="inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-white/[0.08]"
            >
              <Play className="h-3 w-3" />
              {running ? "Pause" : index === 0 ? "Run agent" : "Resume"}
            </button>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 rounded-lg border border-hairline px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <RotateCcw className="h-3 w-3" />
              Replay
            </button>
          </div>
        </div>

        <div ref={logRef} className="h-[420px] overflow-y-auto px-5 py-3 font-mono text-[12px]">
          {shown.length === 0 && (
            <p className="py-10 text-center text-muted-foreground">
              Idle — start the agent to stream events.
            </p>
          )}
          {shown.map((e, i) => {
            const dup = shown.slice(0, i).some((p) => p.signature === e.signature);
            return (
              <div
                key={i}
                className="flex items-baseline gap-3 border-b border-white/[0.04] py-1.5 last:border-0"
              >
                <span className="shrink-0 text-muted-foreground">{e.t}</span>
                <span
                  className={`min-w-0 flex-1 truncate ${dup ? "text-cat-search" : "text-foreground"}`}
                >
                  {e.action}
                </span>
                <span className="shrink-0 text-[10px] text-muted-foreground">{e.note}</span>
                <span className="w-14 shrink-0 text-right tabular-nums text-muted-foreground">
                  {money(e.cost, 2)}
                </span>
              </div>
            );
          })}
          {!hardLimit && extraCost > 0 && (
            <div className="flex items-baseline gap-3 py-1.5 text-destructive">
              <span className="shrink-0">14:02:2x</span>
              <span className="flex-1 truncate">
                search("Q3 refund policy") · loop continues, unbounded
              </span>
              <span className="w-14 text-right tabular-nums">+{money(extraCost, 2)}</span>
            </div>
          )}
          {blocked && (
            <div className="mt-3 rounded-lg border border-destructive/50 bg-destructive/10 p-3">
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-destructive">
                <ShieldBan className="h-3.5 w-3.5" />
                Call refused at gate — execution halted
              </p>
              <p className="mt-2 leading-relaxed text-foreground">
                DENY tool_call <span className="text-cat-search">{repeats.sig}</span> · policy
                semantic_loop_breaker/v2 · signature repeated {LOOP.threshold}× · cumulative state
                delta 0 · information gain 0 · agent {LOOP.agent} · account {LOOP.customerId}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div
          className={`panel p-5 ${blocked ? "border-destructive/50" : detected ? "border-cat-search/50" : ""}`}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Detection
          </p>
          <p
            className={`mt-3 text-2xl font-semibold tracking-tight ${blocked ? "text-destructive" : detected ? "text-cat-search" : "text-foreground"}`}
          >
            {blocked ? "Blocked at gate" : detected ? "Loop detected" : "Nominal"}
          </p>
          <dl className="mt-4 space-y-2 text-xs">
            <Row k="tool_call signature" v={repeats.sig || "—"} mono />
            <Row k="repeat count" v={`${overrun || 0}× / threshold ${LOOP.threshold}`} />
            <Row k="state delta" v={detected ? "0" : "+1"} />
            <Row k="new information" v={detected ? "none" : "gained"} />
            <Row k="burned this run" v={money(burned, 2)} />
          </dl>
        </div>

        <div className="panel p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold tracking-tight text-foreground">Hard limit</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Refuse the next call at the gate once a loop signature crosses threshold.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={hardLimit}
              aria-label="Hard limit"
              onClick={() => {
                setHardLimit((v) => !v);
                setBlocked(false);
              }}
              className={`relative h-6 w-11 shrink-0 rounded-full border border-hairline transition-colors ${hardLimit ? "bg-cat-db/70" : "bg-white/[0.08]"}`}
            >
              <span
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-foreground transition-all ${hardLimit ? "left-6" : "left-1"}`}
              />
            </button>
          </div>
          <p
            className={`mt-4 flex items-center gap-2 rounded-lg border px-3 py-2 text-xs ${hardLimit ? "border-cat-db/40 bg-cat-db/10 text-cat-db" : "border-destructive/40 bg-destructive/10 text-destructive"}`}
          >
            {hardLimit ? (
              <ShieldCheck className="h-3.5 w-3.5" />
            ) : (
              <ShieldBan className="h-3.5 w-3.5" />
            )}
            {hardLimit
              ? "Enforcing — the loop stops before the next call executes."
              : "Off — the agent keeps burning budget on the same call."}
          </p>
        </div>

        <div className="panel p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Attribution impact
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight tabular-nums text-cat-db">
            {money(LOOP.estimatedSavings)}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            {blocked ? "This block prevented" : "Enforcing this gate prevents"} ~
            {money(LOOP.estimatedSavings)} this month that would have been attributed to{" "}
            <span className="text-foreground">{LOOP.customerName}</span> — already served at a loss
            in Cost Attribution.
          </p>
        </div>
      </div>
    </div>
  );
}

function Row({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-white/[0.05] pb-2 last:border-0">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className={`text-right text-foreground ${mono ? "font-mono text-[11px]" : "tabular-nums"}`}>
        {v}
      </dd>
    </div>
  );
}