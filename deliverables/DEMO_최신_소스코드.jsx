import React, { useState, useEffect, useRef, useCallback } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity, ShieldCheck, ShieldOff, Ban, Cpu, Database, Search, Zap, Users,
  Layers, RotateCcw, AlertTriangle, TrendingUp, Gauge, Lock, Unlock, Terminal, ChevronRight
} from "lucide-react";

/* ============================================================
   Ledger — AI Cost Governance
   Single-component interactive demo. All figures are simulated.
   ============================================================ */

/* Palette — deep zinc canvas, two accents (violet/indigo + emerald-teal).
   Rose appears only as a state colour, desaturated. */
const C = {
  llm: "#52525b",     // zinc-600   — the cost your invoice already shows
  search: "#7c66ea",  // muted violet — the cost nobody attributes
  db: "#2aae9e",      // muted teal   — the cost nobody attributes
  good: "#34d399",
  bad: "#fb7185",
};

const CUSTOMERS = [
  { name: "Vertex Logistics", plan: "Enterprise", mrr: 96000, llm: 15100, search: 4700, db: 7300 },
  { name: "Sunfield Bank",    plan: "Enterprise", mrr: 112000, llm: 13400, search: 2600, db: 6900 },
  { name: "Meridian Legal",   plan: "Growth",     mrr: 19000, llm: 17600, search: 1400, db: 2400 },
  { name: "Cobalt Retail",    plan: "Growth",     mrr: 21000, llm: 8900,  search: 12400, db: 3600 },
  { name: "Halden Group",     plan: "Enterprise", mrr: 78000, llm: 12200, search: 2400, db: 3700 },
  { name: "Arcadia Foods",    plan: "Growth",     mrr: 34000, llm: 4200,  search: 1300, db: 1200 },
];
const withTotals = CUSTOMERS.map(c => {
  const total = c.llm + c.search + c.db;
  return { ...c, total, nonLlm: c.search + c.db, margin: ((c.mrr - total) / c.mrr) * 100 };
});
const TOT = withTotals.reduce(
  (a, c) => ({ llm: a.llm + c.llm, search: a.search + c.search, db: a.db + c.db, all: a.all + c.total }),
  { llm: 0, search: 0, db: 0, all: 0 }
);
const NON_LLM_PCT = ((TOT.search + TOT.db) / TOT.all) * 100;

const usd = (n, d = 0) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
const mmss = s => String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");

/* ============================================================
   Hand-rolled charts.
   Recharts + its d3 dependencies were ~430KB of the bundle, which
   pushed the single-file build past what the artifact viewer will
   render. These three components cover everything the demo needs
   at a fraction of the weight, and give exact control over the
   palette and the 0.1-opacity grid.
   ============================================================ */

function useSize() {
  const ref = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const read = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    read();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, size];
}

const Tip = ({ children }) => (
  <div className="pointer-events-none rounded-xl border border-white/[0.09] bg-zinc-950/90 px-4 py-3 text-[12px] shadow-2xl shadow-black/60 backdrop-blur-xl">
    {children}
  </div>
);

/* ------------------------------------------------------------------
   Stacked bars — laid out with positioned elements rather than SVG so
   the corner radii and hover states are plain CSS.
   ------------------------------------------------------------------ */
function StackedBars({ data, keys, colors, fmt, onPick }) {
  const [hover, setHover] = useState(null);
  const PAD_L = 54, PAD_B = 30;

  const totals = data.map(d => keys.reduce((s, k) => s + d[k], 0));
  const max = Math.max(...totals);
  const step = Math.ceil(max / 4 / 1000) * 1000;
  const top = step * 4;
  const ticks = [0, 1, 2, 3, 4].map(i => i * step);

  return (
    <div className="relative h-full w-full select-none">
      {/* grid + y axis */}
      <div className="absolute left-0 right-0 top-0" style={{ bottom: PAD_B }}>
        {ticks.map((t, i) => (
          <div key={t} className="absolute left-0 right-0" style={{ bottom: (i / 4) * 100 + "%" }}>
            <div className="absolute right-0 border-t border-dashed border-white/10" style={{ left: PAD_L }} />
            <div
              className="absolute text-[11px] leading-none tabular-nums text-zinc-500"
              style={{ left: 0, width: PAD_L - 12, textAlign: "right", transform: "translateY(50%)" }}
            >
              {fmt(t)}
            </div>
          </div>
        ))}
      </div>

      {/* columns */}
      <div className="absolute right-0 top-0 flex items-end" style={{ left: PAD_L, bottom: PAD_B }}>
        {data.map((d, i) => {
          const tot = totals[i];
          const on = hover === i;
          return (
            <div
              key={d.name}
              data-bar={d.name}
              className="group relative flex h-full flex-1 cursor-pointer flex-col justify-end px-3"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onClick={() => onPick && onPick(d)}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 bottom-0 rounded-lg transition-colors duration-150"
                style={{ background: on ? "rgba(255,255,255,0.03)" : "transparent" }}
              />
              <div
                className="relative mx-auto flex w-full max-w-[56px] flex-col justify-end transition-all duration-200"
                style={{ height: (tot / top) * 100 + "%" }}
              >
                {keys.slice().reverse().map((k, j) => {
                  const isTop = j === 0;
                  const isBottom = j === keys.length - 1;
                  return (
                    <div
                      key={k}
                      className="w-full transition-opacity duration-150"
                      style={{
                        height: (d[k] / tot) * 100 + "%",
                        background: colors[k],
                        opacity: hover === null || on ? 1 : 0.55,
                        borderTopLeftRadius: isTop ? 6 : 0,
                        borderTopRightRadius: isTop ? 6 : 0,
                        borderBottomLeftRadius: isBottom ? 6 : 0,
                        borderBottomRightRadius: isBottom ? 6 : 0,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* x axis */}
      <div className="absolute bottom-0 right-0 flex" style={{ left: PAD_L, height: PAD_B }}>
        {data.map(d => (
          <div key={d.name} className="flex-1 pt-3 text-center text-[11px] leading-none text-zinc-500">
            {d.name}
          </div>
        ))}
      </div>

      {/* tooltip */}
      {hover !== null && (
        <div
          className="absolute z-20"
          style={{
            left: `calc(${PAD_L}px + (100% - ${PAD_L}px) * ${(hover + 0.5) / data.length})`,
            top: 4,
            transform: "translateX(-50%)",
          }}
        >
          <Tip>
            <div className="mb-2.5 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
              {data[hover].full || data[hover].name}
            </div>
            {keys.map(k => (
              <div key={k} className="flex items-center gap-3 whitespace-nowrap py-[3px]">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: colors[k] }} />
                <span className="text-zinc-400">{k}</span>
                <span className="ml-auto pl-6 font-medium tabular-nums text-zinc-100">
                  {fmt(data[hover][k], true)}
                </span>
              </div>
            ))}
            <div className="mt-2.5 flex items-center gap-3 whitespace-nowrap border-t border-white/[0.07] pt-2.5">
              <span className="text-zinc-500">Total</span>
              <span className="ml-auto pl-6 font-semibold tabular-nums text-zinc-50">
                {fmt(totals[hover], true)}
              </span>
            </div>
          </Tip>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------
   Donut — three arcs on one circle, rounded caps for the gap.
   ------------------------------------------------------------------ */
function Donut({ data, size = 176, thickness = 22 }) {
  const [hover, setHover] = useState(null);
  const r = size / 2 - thickness / 2 - 2;
  const c = 2 * Math.PI * r;
  const total = data.reduce((s, d) => s + d.value, 0);
  /* round caps stick out by thickness/2 at each end, so the gap has to
     swallow both caps and still leave daylight between the arcs */
  const GAP = thickness + 6;
  let acc = 0;

  return (
    <svg width={size} height={size} className="mx-auto block" role="img">
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        {data.map((d, i) => {
          const len = (d.value / total) * c;
          const draw = Math.max(1, len - GAP);
          const el = (
            <circle
              key={d.name}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={d.color}
              strokeWidth={thickness}
              strokeLinecap="round"
              strokeDasharray={`${draw} ${c - draw}`}
              strokeDashoffset={-(acc + GAP / 2)}
              opacity={hover === null || hover === i ? 1 : 0.4}
              style={{ transition: "opacity .15s" }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            />
          );
          acc += len;
          return el;
        })}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------
   Burn-rate area chart.
   ------------------------------------------------------------------ */
function BurnChart({ series, budget, color, ceilingColor, fmt }) {
  const [ref, { w, h }] = useSize();
  const PAD_L = 42, PAD_B = 22, PAD_T = 12, PAD_R = 6;

  const iw = Math.max(1, w - PAD_L - PAD_R);
  const ih = Math.max(1, h - PAD_T - PAD_B);
  const peak = Math.max(budget, ...series.map(s => s.spend));
  const top = Math.ceil((peak * 1.18) / 15) * 15 || 15;
  const n = Math.max(1, series.length - 1);

  const x = i => PAD_L + (i / n) * iw;
  const y = v => PAD_T + ih - (v / top) * ih;

  const pts = series.map((s, i) => [x(i), y(s.spend)]);
  const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const area = pts.length
    ? line + ` L${x(series.length - 1).toFixed(1)} ${(PAD_T + ih).toFixed(1)} L${PAD_L} ${(PAD_T + ih).toFixed(1)} Z`
    : "";

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(f => Math.round(top * f));
  const xEvery = Math.max(1, Math.ceil(series.length / 12));

  return (
    <div ref={ref} className="h-full w-full">
      {w > 0 && (
        <svg width={w} height={h} className="overflow-visible">
          <defs>
            <linearGradient id="burnfill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.26" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>

          {yTicks.map(t => (
            <g key={t}>
              <line
                x1={PAD_L} x2={w - PAD_R} y1={y(t)} y2={y(t)}
                stroke="#ffffff" strokeOpacity="0.1" strokeDasharray="2 6"
              />
              <text x={PAD_L - 10} y={y(t) + 3.5} textAnchor="end" fill="#52525b" fontSize="10">
                {fmt(t)}
              </text>
            </g>
          ))}

          <line
            x1={PAD_L} x2={w - PAD_R} y1={y(budget)} y2={y(budget)}
            stroke={ceilingColor} strokeOpacity="0.55" strokeDasharray="4 5"
          />
          <text x={PAD_L + 6} y={y(budget) - 6} fill="#fda4af" fontSize="10">
            ceiling {fmt(budget)}
          </text>

          {area && <path d={area} fill="url(#burnfill)" />}
          {line && <path d={line} fill="none" stroke={color} strokeWidth="1.75" strokeLinejoin="round" />}

          {series.map((s, i) =>
            i % xEvery === 0 ? (
              <text key={i} x={x(i)} y={h - 4} textAnchor="middle" fill="#52525b" fontSize="10">
                {s.i}
              </text>
            ) : null
          )}
        </svg>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  primitives                                                         */
/* ------------------------------------------------------------------ */

const Card = ({ className = "", children }) => (
  <div className={
    "rounded-2xl border border-white/[0.07] bg-white/[0.02] shadow-lg shadow-black/50 " +
    "supports-[backdrop-filter]:backdrop-blur-xl " + className
  }>{children}</div>
);

const Head = ({ icon: Icon, title, desc, right }) => (
  <div className="mb-7 flex items-start gap-3.5">
    {Icon && (
      <div className="mt-px rounded-xl border border-white/[0.07] bg-white/[0.03] p-2">
        <Icon className="h-3.5 w-3.5 text-zinc-400" strokeWidth={1.75} />
      </div>
    )}
    <div className="min-w-0">
      <h2 className="text-[13.5px] font-semibold leading-tight tracking-tight text-zinc-100">{title}</h2>
      {desc && <p className="mt-1.5 text-[12px] leading-relaxed text-zinc-500">{desc}</p>}
    </div>
    {right && <div className="ml-auto shrink-0 pl-4">{right}</div>}
  </div>
);

const Tag = ({ children, tone = "zinc" }) => {
  const t = {
    zinc: "border-white/[0.08] bg-white/[0.04] text-zinc-400",
    emerald: "border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300",
    rose: "border-rose-400/20 bg-rose-400/[0.08] text-rose-300",
    violet: "border-violet-400/20 bg-violet-400/[0.08] text-violet-300",
  }[tone];
  return (
    <span className={"rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] " + t}>
      {children}
    </span>
  );
};

const Kpi = ({ icon: Icon, label, value, sub, tone = "default" }) => {
  const t = { default: "text-zinc-50", good: "text-emerald-300", bad: "text-rose-300" }[tone];
  return (
    <Card className="px-7 py-6">
      <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-500">
        <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
        {label}
      </div>
      <div className="mt-4 flex items-baseline gap-2.5">
        <span className={"text-[30px] font-bold leading-none tracking-tight tabular-nums " + t}>{value}</span>
        {sub && <span className="text-[11.5px] font-normal text-zinc-500">{sub}</span>}
      </div>
    </Card>
  );
};

/* axis tick formatter: compact on the scale, exact inside a tooltip */
const kUsd = (v, exact) => (exact ? usd(v) : "$" + Math.round(v / 1000) + "k");

const KEYS = ["LLM API", "Search Tool", "External Database"];
const KEY_COLORS = { "LLM API": C.llm, "Search Tool": C.search, "External Database": C.db };

/* ============================================================
   TAB 1 — COGS ATTRIBUTION
   ============================================================ */
function Attribution() {
  const [sel, setSel] = useState(null);
  const barData = withTotals.map(c => ({
    name: c.name.split(" ")[0], full: c.name,
    "LLM API": c.llm, "Search Tool": c.search, "External Database": c.db,
  }));
  const pieData = [
    { name: "LLM API", value: TOT.llm, color: C.llm },
    { name: "Search Tool", value: TOT.search, color: C.search },
    { name: "External Database", value: TOT.db, color: C.db },
  ];

  return (
    <div className="space-y-6">
      {/* headline claim */}
      <Card className="px-8 py-7">
        <div className="flex items-start gap-5">
          <div className="mt-0.5 rounded-xl border border-violet-400/20 bg-violet-400/[0.08] p-2.5">
            <AlertTriangle className="h-4 w-4 text-violet-300" strokeWidth={1.75} />
          </div>
          <div className="min-w-0">
            <h1 className="text-[19px] font-semibold leading-snug tracking-tight text-zinc-50">
              {NON_LLM_PCT.toFixed(0)}% of AI COGS never appears on an LLM invoice.
            </h1>
            <p className="mt-2.5 max-w-3xl text-[12.5px] leading-relaxed text-zinc-500">
              Autonomous agents decide on their own to run searches, crawl pages and query third-party
              databases. A token dashboard sees the grey band at the base of each bar and nothing else.
              Everything in colour above it is billed by five other vendors and lands on finance's desk
              unattributed.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr]">
        <Card className="flex flex-col px-8 py-7">
          <Head
            icon={Layers}
            title="Total cost of execution, by customer"
            desc="Reconstructed from execution traces, not from vendor invoices."
            right={<Tag>Click a bar</Tag>}
          />
          <div className="min-h-[344px] flex-1">
            <StackedBars
              data={barData}
              keys={KEYS}
              colors={KEY_COLORS}
              fmt={kUsd}
              onPick={d => setSel(withTotals.find(c => c.name === d.full))}
            />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-7">
            {KEYS.map(k => (
              <span key={k} className="flex items-center gap-2 text-[12px] text-zinc-400">
                <span className="h-[7px] w-[7px] rounded-full" style={{ background: KEY_COLORS[k] }} />
                {k}
              </span>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="px-8 py-7">
            <Head title="Where the money leaves" desc="Month to date · every vendor in the execution path" />
            <div className="relative h-[184px]">
              <Donut data={pieData} size={176} thickness={22} />
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-[26px] font-bold leading-none tracking-tight tabular-nums text-zinc-50">
                  {NON_LLM_PCT.toFixed(0)}%
                </div>
                <div className="mt-1.5 text-[9.5px] font-medium uppercase tracking-[0.18em] text-zinc-500">non-LLM</div>
              </div>
            </div>
            <div className="mt-7 space-y-3 border-t border-white/[0.05] pt-6">
              {pieData.map(d => (
                <div key={d.name} className="flex items-center gap-3 text-[12.5px]">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: d.color }} />
                  <span className="text-zinc-300">{d.name}</span>
                  <span className="ml-auto font-medium tabular-nums text-zinc-500">{usd(d.value)}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="px-8 py-7">
            <Head title="Margin after AI COGS" desc="Plan MRR minus everything that account's agents spend" />
            <div className="space-y-3.5">
              {withTotals.slice().sort((a, b) => a.margin - b.margin).map(c => (
                <button key={c.name} onClick={() => setSel(c)}
                  className="group flex w-full items-center gap-4 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-white/[0.03]">
                  <span className="w-[104px] shrink-0 truncate text-[12.5px] text-zinc-400 transition-colors group-hover:text-zinc-200">
                    {c.name}
                  </span>
                  <span className="relative h-1 flex-1 rounded-full bg-white/[0.07]">
                    <span className="absolute inset-y-0 rounded-full"
                      style={c.margin < 0
                        ? { right: "50%", width: Math.min(50, Math.abs(c.margin) / 2) + "%", background: C.bad }
                        : { left: "50%", width: Math.min(50, c.margin / 2) + "%", background: C.good, opacity: 0.75 }} />
                    <span className="absolute left-1/2 top-[-4px] h-[10px] w-px bg-white/15" />
                  </span>
                  <span className={"w-[52px] shrink-0 text-right text-[12.5px] font-semibold tabular-nums " +
                    (c.margin < 0 ? "text-rose-300" : "text-emerald-300/90")}>
                    {c.margin > 0 ? "+" : ""}{c.margin.toFixed(1)}%
                  </span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {sel && (
        <Card className="px-8 py-7">
          <div className="mb-7 flex flex-wrap items-center gap-3.5">
            <h2 className="text-[15px] font-semibold tracking-tight text-zinc-50">{sel.name}</h2>
            <Tag tone={sel.margin < 0 ? "rose" : "zinc"}>{sel.plan}</Tag>
            <button onClick={() => setSel(null)}
              className="ml-auto text-[12px] text-zinc-600 transition-colors hover:text-zinc-300">
              close
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-4">
            {[["Plan MRR", usd(sel.mrr)], ["AI COGS", usd(sel.total)],
              ["Non-LLM share", ((sel.nonLlm / sel.total) * 100).toFixed(0) + "%"],
              ["Margin", (sel.margin > 0 ? "+" : "") + sel.margin.toFixed(1) + "%"]].map(([l, v], i) => (
              <div key={l} className="rounded-xl border border-white/[0.05] bg-white/[0.02] px-6 py-5">
                <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-500">{l}</div>
                <div className={"mt-3 text-[24px] font-bold leading-none tracking-tight tabular-nums " +
                  (i === 3 ? (sel.margin < 0 ? "text-rose-300" : "text-emerald-300") : "text-zinc-50")}>{v}</div>
              </div>
            ))}
          </div>
          <p className="mt-7 max-w-4xl text-[12.5px] leading-relaxed text-zinc-500">
            {sel.margin < 0
              ? <>This account is served at a loss of <b className="font-semibold text-rose-300">{usd(sel.total - sel.mrr)}/month</b>. {(sel.nonLlm / sel.total) > 0.4
                  ? "Most of the overrun is tool and database spend, so a discount from the model vendor would not close it — the fix is a retry cap and a re-price."
                  : "The overrun is concentrated in frontier-model calls on long documents; size-based routing recovers most of it."}</>
              : <>Healthy. This account can absorb roughly <b className="font-semibold text-zinc-200">{usd(Math.round((sel.mrr * 0.45 - sel.total) / 100) * 100)}</b> more monthly AI cost before margin falls below 55%.</>}
          </p>
        </Card>
      )}
    </div>
  );
}

/* ============================================================
   TAB 2 — LIVE BREAKER
   ============================================================ */
const BUDGET = 50;
const STEPS = [
  { t: "call", tool: "search.web", txt: 'Serper query "sku 8841 spec sheet" · 1 of 4,100', c: 0.42 },
  { t: "call", tool: "llm", txt: "claude-sonnet-4 · extract fields · 11,204 in / 1,840 out", c: 0.61 },
  { t: "call", tool: "db", txt: "vector.upsert · Pinecone · 128 vectors", c: 0.18 },
  { t: "warn", tool: "agent", txt: "extraction returned null — page layout changed", c: 0.0 },
  { t: "call", tool: "search.web", txt: 'retry 1/∞ · Serper query "sku 8841 spec sheet"', c: 0.55 },
  { t: "call", tool: "llm", txt: "claude-sonnet-4 · re-extract · 12,880 in / 2,140 out", c: 0.78 },
  { t: "warn", tool: "agent", txt: "extraction returned null — retrying without backoff", c: 0.0 },
  { t: "call", tool: "search.web", txt: "retry 2/∞ · same query, same 4,100 SKUs", c: 0.94 },
  { t: "call", tool: "db", txt: "external.lookup · product API · 4,100 rows", c: 1.35 },
  { t: "call", tool: "llm", txt: "claude-sonnet-4 · re-extract · 14,020 in / 2,610 out", c: 1.62 },
  { t: "warn", tool: "agent", txt: "loop signature detected — 3 identical tool sequences", c: 0.0 },
  { t: "call", tool: "search.web", txt: "retry 3/∞ · concurrency raised to 32 by planner", c: 2.4 },
  { t: "call", tool: "llm", txt: "claude-sonnet-4 · 32 parallel re-extractions", c: 3.9 },
  { t: "call", tool: "db", txt: "external.lookup · product API · 32 parallel batches", c: 4.8 },
  { t: "call", tool: "search.web", txt: "retry 4/∞ · 32 parallel Serper queries", c: 5.6 },
  { t: "call", tool: "llm", txt: "claude-sonnet-4 · 32 parallel re-extractions", c: 6.9 },
  { t: "call", tool: "db", txt: "vector.upsert · 4,096 duplicate vectors", c: 7.4 },
  { t: "call", tool: "search.web", txt: "retry 5/∞ · queue depth 1,412 and rising", c: 8.8 },
];
const TOOL_META = {
  "search.web": { icon: Search, cls: "text-violet-300/90", label: "SEARCH" },
  llm: { icon: Cpu, cls: "text-indigo-300/90", label: "LLM" },
  db: { icon: Database, cls: "text-teal-300/90", label: "DB" },
  agent: { icon: Activity, cls: "text-zinc-400", label: "AGENT" },
};

function Breaker({ onBlock }) {
  const [hardLimit, setHardLimit] = useState(false);
  const [log, setLog] = useState([]);
  const [spend, setSpend] = useState(0);
  const [blocked, setBlocked] = useState(false);
  const [series, setSeries] = useState([{ i: 0, spend: 0 }]);
  const idx = useRef(0);
  const spendRef = useRef(0);
  const limitRef = useRef(false);
  const consoleRef = useRef(null);
  useEffect(() => { limitRef.current = hardLimit; }, [hardLimit]);

  const reset = useCallback(() => {
    idx.current = 0; spendRef.current = 0;
    setLog([]); setSpend(0); setBlocked(false); setSeries([{ i: 0, spend: 0 }]);
  }, []);

  useEffect(() => {
    if (blocked) return;
    const id = setInterval(() => {
      const i = idx.current;
      const step = STEPS[Math.min(i, STEPS.length - 1)];
      const growth = i >= STEPS.length ? 1 + (i - STEPS.length) * 0.22 : 1;
      const cost = +(step.c * growth).toFixed(2);
      const next = +(spendRef.current + cost).toFixed(2);

      if (limitRef.current && next >= BUDGET) {
        const avoided = Math.round(cost * 3600);
        setLog(l => [...l, {
          id: "blk", t: "block", tool: "agent", ts: i + 1,
          txt: "⛔ BLOCKED: Budget Exceeded (Audit-grade reason: Infinite retry loop detected on Search Tool)",
          detail: `policy budget.customer.hard · run at ${usd(spendRef.current, 2)} against a ${usd(BUDGET, 2)} ceiling · 1,412 queued calls refused at the gate — nothing reached Serper, Anthropic or Pinecone · projected spend avoided ${usd(avoided)}/hr · trace agent_run_7f21 written to audit log`,
          cost: 0, cum: spendRef.current,
        }]);
        setBlocked(true);
        onBlock && onBlock();
        return;
      }

      spendRef.current = next;
      setSpend(next);
      setSeries(s => [...s.slice(-59), { i: s.length, spend: next }]);
      setLog(l => [...l.slice(-80), {
        id: "s" + i, t: step.t, tool: step.tool, ts: i + 1,
        txt: i >= STEPS.length ? step.txt.replace(/retry \d+/, "retry " + (5 + i - STEPS.length + 1)) : step.txt,
        cost, cum: next,
      }]);
      idx.current = i + 1;
    }, 1000);
    return () => clearInterval(id);
  }, [blocked, onBlock]);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [log]);

  const over = spend > BUDGET;
  const pct = Math.min(100, (spend / BUDGET) * 100);
  const meter = over ? C.bad : blocked ? C.good : pct > 85 ? "#fbbf24" : C.good;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
      {/* -------------------- console -------------------- */}
      <Card className="flex min-h-[588px] flex-col overflow-hidden">
        <div className="flex items-center gap-3 border-b border-white/[0.06] px-7 py-5">
          <Terminal className="h-4 w-4 text-zinc-500" strokeWidth={1.75} />
          <h2 className="text-[13.5px] font-semibold tracking-tight text-zinc-100">Agent Execution Log</h2>
          <span className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1 font-mono text-[10px] text-zinc-500">
            agent_run_7f21
          </span>
          <span className="ml-auto flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em]">
            {blocked
              ? <><Ban className="h-3.5 w-3.5 text-rose-300" strokeWidth={2} /><span className="text-rose-300">Halted</span></>
              : <><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.5)]" />
                  <span className="text-emerald-300">Running</span></>}
          </span>
        </div>

        <div id="exec-log" ref={consoleRef}
          className="flex-1 overflow-y-auto px-3 py-3 font-mono text-[11.5px] leading-relaxed">
          {log.length === 0 && (
            <div className="px-4 py-3 text-zinc-600">initialising agent run…</div>
          )}
          {log.map((l, n) => {
            const M = TOOL_META[l.tool] || TOOL_META.agent;
            const Icon = M.icon;

            if (l.t === "block") return (
              <div key={n} className="my-3 overflow-hidden rounded-xl border border-rose-400/25 bg-rose-500/[0.07] shadow-lg shadow-rose-950/30">
                <div className="px-6 py-5">
                  <div className="min-w-0">
                    <div className="font-sans text-[13.5px] font-semibold leading-snug tracking-tight text-rose-200">
                      {l.txt}
                    </div>
                    <div className="mt-2.5 font-sans text-[11.5px] leading-relaxed text-zinc-400">{l.detail}</div>
                  </div>
                </div>
              </div>
            );

            const hot = l.cum > BUDGET;
            return (
              <div key={n} className={"flex items-start gap-3 rounded-lg px-4 py-[7px] transition-colors " +
                (l.t === "warn" ? "bg-amber-300/[0.045]" : hot ? "bg-rose-500/[0.06]" : "hover:bg-white/[0.025]")}>
                <span className="w-[34px] shrink-0 pt-px text-[10px] tabular-nums text-zinc-600">{mmss(l.ts)}</span>
                <Icon className={"mt-[3px] h-3 w-3 shrink-0 " + (l.t === "warn" ? "text-amber-300/80" : M.cls)} strokeWidth={2} />
                <span className={"w-[50px] shrink-0 text-[9.5px] font-semibold uppercase tracking-[0.1em] " +
                  (l.t === "warn" ? "text-amber-300/80" : M.cls)}>
                  {l.t === "warn" ? "warn" : M.label}
                </span>
                <span className={"min-w-0 flex-1 " +
                  (l.t === "warn" ? "text-amber-100/70" : hot ? "text-rose-100/75" : "text-zinc-300")}>
                  {l.txt}
                </span>
                <span className={"shrink-0 tabular-nums " + (hot ? "font-medium text-rose-300" : "text-zinc-600")}>
                  {l.cost > 0 ? "+" + usd(l.cost, 2) : "—"}
                </span>
                <span className={"w-[64px] shrink-0 text-right tabular-nums " +
                  (hot ? "font-semibold text-rose-300" : "text-zinc-400")}>
                  {usd(l.cum, 2)}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* -------------------- controls -------------------- */}
      <div className="space-y-6">
        <Card className={"px-8 py-7 transition-colors duration-500 " +
          (hardLimit ? "border-emerald-400/20" : "border-white/[0.07]")}>
          <div className="flex items-start gap-4">
            <div className={"rounded-xl border p-2.5 transition-colors duration-500 " +
              (hardLimit ? "border-emerald-400/20 bg-emerald-400/[0.09]" : "border-white/[0.07] bg-white/[0.03]")}>
              {hardLimit
                ? <ShieldCheck className="h-4 w-4 text-emerald-300" strokeWidth={1.75} />
                : <ShieldOff className="h-4 w-4 text-zinc-500" strokeWidth={1.75} />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[13.5px] font-semibold tracking-tight text-zinc-100">Enable Hard Limit</div>
              <div className="mt-1.5 text-[12px] leading-relaxed text-zinc-500">
                Evaluate every call against the budget <b className="font-semibold text-zinc-300">before</b> it executes.
              </div>
            </div>
            <button data-testid="hardlimit" onClick={() => setHardLimit(v => !v)} role="switch" aria-checked={hardLimit}
              className={"relative mt-0.5 h-[26px] w-[46px] shrink-0 rounded-full border transition-all duration-300 " +
                (hardLimit
                  ? "border-emerald-400/40 bg-emerald-500/80 shadow-[0_0_0_4px_rgba(52,211,153,0.10)]"
                  : "border-white/[0.08] bg-white/[0.06]")}>
              <span className={"absolute top-[3px] h-[18px] w-[18px] rounded-full bg-zinc-50 shadow-md transition-all duration-300 " +
                (hardLimit ? "left-[24px]" : "left-[3px]")} />
            </button>
          </div>

          <div className="mt-8">
            <div className="mb-3 flex items-baseline justify-between">
              <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-500">
                {hardLimit ? <Lock className="h-3 w-3" strokeWidth={2} /> : <Unlock className="h-3 w-3" strokeWidth={2} />}
                Session budget
              </span>
              <span className="tabular-nums">
                <span className={"text-[17px] font-bold tracking-tight " + (over ? "text-rose-300" : "text-zinc-50")}>
                  {usd(spend, 2)}
                </span>
                <span className="ml-1.5 text-[12px] text-zinc-600">/ {usd(BUDGET, 2)}</span>
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width: pct + "%", background: meter, boxShadow: `0 0 12px ${meter}55` }} />
            </div>
            <div className="mt-3.5 text-[12px] leading-relaxed">
              {blocked ? (
                <span className="text-emerald-300">Execution halted at the gate. Downstream vendors were never called.</span>
              ) : over ? (
                <span className="text-rose-300">
                  {usd(spend - BUDGET, 2)} over budget and still climbing — nothing is stopping it.
                </span>
              ) : (
                <span className="text-zinc-500">
                  {hardLimit ? "Policy armed. The first call that would cross the ceiling is refused."
                             : "No policy armed. Every call below executes against live vendors."}
                </span>
              )}
            </div>
          </div>

          <div className="mt-7 flex items-center gap-3 border-t border-white/[0.05] pt-6">
            <button onClick={reset}
              className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-[12px] font-medium text-zinc-400 transition-colors hover:bg-white/[0.07] hover:text-zinc-100">
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.75} /> Reset run
            </button>
            {!hardLimit && !blocked && (
              <span className="flex items-center gap-2 text-[11.5px] text-zinc-600">
                <Zap className="h-3.5 w-3.5 text-violet-300/80" strokeWidth={1.75} /> Arm the breaker mid-run
              </span>
            )}
          </div>
        </Card>

        <Card className="px-8 py-7">
          <Head icon={TrendingUp} title="Session burn rate" desc="Cumulative spend · one point per second" />
          <div className="h-[176px]">
            <BurnChart
              series={series}
              budget={BUDGET}
              color={over ? C.bad : C.good}
              ceilingColor={C.bad}
              fmt={v => "$" + v}
            />
          </div>
        </Card>

        <Card className={"px-8 py-7 transition-colors duration-500 " +
          (blocked ? "border-emerald-400/20 bg-emerald-400/[0.04]" : "")}>
          <div className="flex items-start gap-3.5">
            <ChevronRight className={"mt-0.5 h-4 w-4 shrink-0 " + (blocked ? "text-emerald-300" : "text-zinc-600")} strokeWidth={2} />
            <p className="text-[12.5px] leading-relaxed text-zinc-500">
              {blocked
                ? <><b className="font-semibold text-zinc-100">This is the product.</b> Not an alert after the fact — a
                    refusal at the gate, with the reason, the policy id and the trace attached. Finance can hand that
                    line to the board; a billing dashboard can only hand them the number.</>
                : <><b className="font-semibold text-zinc-100">Breaker disarmed.</b> Everything above costs real money at
                    real vendors right now, and a monthly dashboard would surface it tomorrow morning. Arm the limit to
                    watch the next call get refused at <span className="tabular-nums text-zinc-300">{usd(BUDGET)}</span>.</>}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ============================================================
   ROOT
   ============================================================ */
function App() {
  const [tab, setTab] = useState("breaker");
  const [spend, setSpend] = useState(TOT.all);
  const [agents, setAgents] = useState(47);
  const [blockedReq, setBlockedReq] = useState(1284);

  useEffect(() => {
    const id = setInterval(() => {
      setSpend(s => s + 3 + Math.random() * 14);
      setAgents(a => Math.max(38, Math.min(58, a + (Math.random() > 0.5 ? 1 : -1))));
      if (Math.random() > 0.72) setBlockedReq(b => b + 1);
    }, 1200);
    return () => clearInterval(id);
  }, []);

  const TABS = [
    { k: "attr", label: "COGS Attribution", icon: Layers },
    { k: "breaker", label: "Live Breaker", icon: Gauge },
  ];

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-200 antialiased">
      {/* ambient wash */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(900px 480px at 18% -10%, rgba(79,70,229,0.13), transparent 60%)," +
            "radial-gradient(760px 420px at 88% -6%, rgba(45,212,191,0.09), transparent 62%)",
        }} />

      <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-zinc-950/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center gap-8 px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] border border-white/10 bg-gradient-to-br from-indigo-500/90 to-teal-400/80 text-[14px] font-bold text-zinc-950 shadow-lg shadow-indigo-950/40">
              L
            </div>
            <div>
              <div className="text-[14px] font-semibold leading-none tracking-tight text-zinc-50">Ledger</div>
              <div className="mt-1.5 text-[10.5px] leading-none text-zinc-500">Agent execution & cost control plane</div>
            </div>
          </div>

          <nav className="flex items-center gap-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-1">
            {TABS.map(t => {
              const Icon = t.icon;
              const on = tab === t.k;
              return (
                <button key={t.k} onClick={() => setTab(t.k)}
                  className={"flex items-center gap-2 rounded-lg px-3.5 py-2 text-[12.5px] font-medium transition-all duration-200 " +
                    (on
                      ? "bg-white/[0.07] text-zinc-50 shadow-sm shadow-black/40"
                      : "text-zinc-500 hover:text-zinc-300")}>
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.75} /> {t.label}
                </button>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-4">
            <span className="hidden text-[11.5px] text-zinc-600 lg:inline">Northwind AI · 140 people</span>
            <span className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.5)]" />
              Live
            </span>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-[1400px] px-8 pb-16 pt-8">
        <div className="mb-6 grid gap-6 sm:grid-cols-3">
          <Kpi icon={Activity} label="Total monthly spend" value={usd(spend)} sub="of $186,000 budget" />
          <Kpi icon={Users} label="Active agents" value={agents} sub="across 6 accounts" tone="good" />
          <Kpi icon={Ban} label="Blocked requests" value={blockedReq.toLocaleString()} sub="this month" tone="bad" />
        </div>

        {tab === "attr" ? <Attribution /> : <Breaker onBlock={() => setBlockedReq(b => b + 1412)} />}

        <p className="mt-14 text-center text-[11px] text-zinc-700">
          Simulated data for demonstration · Ledger — WTIA capstone, 2026
        </p>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
