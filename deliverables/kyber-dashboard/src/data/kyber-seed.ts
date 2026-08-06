export type CategoryKey = "llm" | "search" | "db";

export const CATEGORY_META: Record<CategoryKey, { label: string; token: string }> = {
  llm: { label: "LLM API", token: "var(--cat-llm)" },
  search: { label: "Search Tool", token: "var(--cat-search)" },
  db: { label: "External Database", token: "var(--cat-db)" },
};

export type Task = {
  id: string;
  name: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  cost: number;
};

export type Customer = {
  id: string;
  name: string;
  plan: string;
  revenue: number;
  cost: Record<CategoryKey, number>;
  tasks: Task[];
};

export const PERIOD = "July 2026";

export const CUSTOMERS: Customer[] = [
  {
    id: "northwind",
    name: "Northwind Logistics",
    plan: "Enterprise · Annual",
    revenue: 42000,
    cost: { llm: 18420, search: 6800, db: 5140 },
    tasks: [
      { id: "nw-1", name: "Freight exception triage", model: "GPT-4o", inputTokens: 4820000, outputTokens: 611000, cost: 11240 },
      { id: "nw-2", name: "Carrier contract lookup", model: "Claude Sonnet", inputTokens: 3110000, outputTokens: 402000, cost: 8120 },
      { id: "nw-3", name: "Customs document parse", model: "GPT-4o mini", inputTokens: 6440000, outputTokens: 288000, cost: 6300 },
      { id: "nw-4", name: "Route delay summarization", model: "Claude Haiku", inputTokens: 2980000, outputTokens: 174000, cost: 4700 },
    ],
  },
  {
    id: "helix",
    name: "Helix Bioworks",
    plan: "Growth · Monthly",
    revenue: 21000,
    cost: { llm: 14300, search: 6250, db: 3900 },
    tasks: [
      { id: "hx-1", name: "Assay literature sweep", model: "GPT-4o", inputTokens: 5210000, outputTokens: 540000, cost: 9800 },
      { id: "hx-2", name: "Protocol deviation review", model: "Claude Sonnet", inputTokens: 2640000, outputTokens: 331000, cost: 6450 },
      { id: "hx-3", name: "Reagent vendor compare", model: "GPT-4o mini", inputTokens: 4180000, outputTokens: 210000, cost: 5200 },
      { id: "hx-4", name: "Batch record QA", model: "Claude Haiku", inputTokens: 1920000, outputTokens: 96000, cost: 3000 },
    ],
  },
  {
    id: "vantage",
    name: "Vantage Financial",
    plan: "Enterprise · Annual",
    revenue: 36000,
    cost: { llm: 12880, search: 5100, db: 3420 },
    tasks: [
      { id: "vf-1", name: "KYC dossier assembly", model: "GPT-4o", inputTokens: 3980000, outputTokens: 466000, cost: 8600 },
      { id: "vf-2", name: "Sanctions list reconcile", model: "Claude Sonnet", inputTokens: 2410000, outputTokens: 187000, cost: 5900 },
      { id: "vf-3", name: "Filing footnote extract", model: "GPT-4o mini", inputTokens: 3350000, outputTokens: 142000, cost: 4300 },
      { id: "vf-4", name: "Client memo drafting", model: "Claude Haiku", inputTokens: 1240000, outputTokens: 210000, cost: 2600 },
    ],
  },
  {
    id: "orbital",
    name: "Orbital Freight",
    plan: "Growth · Monthly",
    revenue: 15500,
    cost: { llm: 9640, search: 4880, db: 3960 },
    tasks: [
      { id: "of-1", name: "Refund policy resolution", model: "GPT-4o", inputTokens: 3120000, outputTokens: 388000, cost: 7200 },
      { id: "of-2", name: "Shipment status agent", model: "Claude Sonnet", inputTokens: 2260000, outputTokens: 244000, cost: 5180 },
      { id: "of-3", name: "Invoice dispute match", model: "GPT-4o mini", inputTokens: 2840000, outputTokens: 131000, cost: 3900 },
      { id: "of-4", name: "Warehouse SOP lookup", model: "Claude Haiku", inputTokens: 1410000, outputTokens: 84000, cost: 2200 },
    ],
  },
  {
    id: "meridian",
    name: "Meridian Health",
    plan: "Enterprise · Annual",
    revenue: 24000,
    cost: { llm: 8120, search: 2940, db: 2010 },
    tasks: [
      { id: "mh-1", name: "Prior-auth packet build", model: "GPT-4o", inputTokens: 2450000, outputTokens: 302000, cost: 5400 },
      { id: "mh-2", name: "Claims denial analysis", model: "Claude Sonnet", inputTokens: 1780000, outputTokens: 164000, cost: 3870 },
      { id: "mh-3", name: "Coding guideline lookup", model: "GPT-4o mini", inputTokens: 1960000, outputTokens: 88000, cost: 2300 },
      { id: "mh-4", name: "Patient message triage", model: "Claude Haiku", inputTokens: 940000, outputTokens: 71000, cost: 1500 },
    ],
  },
  {
    id: "corepoint",
    name: "Corepoint Retail",
    plan: "Growth · Monthly",
    revenue: 14000,
    cost: { llm: 5410, search: 1880, db: 1530 },
    tasks: [
      { id: "cp-1", name: "Catalog enrichment", model: "GPT-4o mini", inputTokens: 4120000, outputTokens: 196000, cost: 3600 },
      { id: "cp-2", name: "Return reason clustering", model: "Claude Sonnet", inputTokens: 1180000, outputTokens: 122000, cost: 2420 },
      { id: "cp-3", name: "Supplier lead-time check", model: "GPT-4o", inputTokens: 640000, outputTokens: 74000, cost: 1800 },
      { id: "cp-4", name: "Store FAQ agent", model: "Claude Haiku", inputTokens: 720000, outputTokens: 52000, cost: 1000 },
    ],
  },
];

export const totalOf = (c: Customer) => c.cost.llm + c.cost.search + c.cost.db;

export const TOTALS = CUSTOMERS.reduce(
  (acc, c) => {
    acc.llm += c.cost.llm;
    acc.search += c.cost.search;
    acc.db += c.cost.db;
    acc.revenue += c.revenue;
    return acc;
  },
  { llm: 0, search: 0, db: 0, revenue: 0 },
);

export const GRAND_TOTAL = TOTALS.llm + TOTALS.search + TOTALS.db;
export const NON_LLM_SHARE = (TOTALS.search + TOTALS.db) / GRAND_TOTAL;
export const LOSS_CUSTOMERS = CUSTOMERS.filter((c) => totalOf(c) > c.revenue);

export type LoopEvent = {
  t: string;
  action: string;
  signature: string;
  cost: number;
  note: string;
};

export const LOOP = {
  agent: "orbital-support-agent-07",
  customerId: "orbital",
  customerName: "Orbital Freight",
  task: "Refund policy resolution",
  threshold: 3,
  estimatedSavings: 1840,
  events: [
    { t: "14:02:11", action: 'db.query("ticket:OF-88421")', signature: "db:ticket_lookup", cost: 0.42, note: "state delta: +1 record" },
    { t: "14:02:12", action: 'search("Q3 refund policy")', signature: "search:q3_refund_policy", cost: 0.91, note: "state delta: +2 docs" },
    { t: "14:02:13", action: 'llm.call("summarize policy", GPT-4o)', signature: "llm:summarize_policy", cost: 2.14, note: "state delta: +1 draft" },
    { t: "14:02:14", action: 'search("q3  Refund Policy")', signature: "search:q3_refund_policy", cost: 0.91, note: "state delta: 0 · duplicate result set" },
    { t: "14:02:15", action: 'llm.call("summarize policy", GPT-4o)', signature: "llm:summarize_policy", cost: 2.14, note: "state delta: 0 · identical draft" },
    { t: "14:02:16", action: 'search("Q3 REFUND policy ")', signature: "search:q3_refund_policy", cost: 0.91, note: "state delta: 0 · no new information" },
    { t: "14:02:17", action: 'search("q3 refund-policy")', signature: "search:q3_refund_policy", cost: 0.91, note: "state delta: 0 · no new information" },
    { t: "14:02:18", action: 'llm.call("summarize policy", GPT-4o)', signature: "llm:summarize_policy", cost: 2.14, note: "state delta: 0 · identical draft" },
    { t: "14:02:19", action: 'search("Q3 refund policy")', signature: "search:q3_refund_policy", cost: 0.91, note: "state delta: 0 · no new information" },
    { t: "14:02:20", action: 'llm.call("summarize policy", GPT-4o)', signature: "llm:summarize_policy", cost: 2.14, note: "state delta: 0 · identical draft" },
    { t: "14:02:21", action: 'search("q3  refund policy")', signature: "search:q3_refund_policy", cost: 0.91, note: "state delta: 0 · no new information" },
    { t: "14:02:22", action: 'llm.call("summarize policy", GPT-4o)', signature: "llm:summarize_policy", cost: 2.14, note: "state delta: 0 · identical draft" },
  ] as LoopEvent[],
};

export const money = (n: number, digits = 0) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });

export const compactTokens = (n: number) =>
  n >= 1_000_000 ? (n / 1_000_000).toFixed(2) + "M" : (n / 1000).toFixed(0) + "K";