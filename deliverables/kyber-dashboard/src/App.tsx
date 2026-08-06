import { useEffect, useState } from "react";
import { Hexagon } from "lucide-react";
import { CostAttribution } from "@/components/kyber/CostAttribution";
import { LiveBreaker } from "@/components/kyber/LiveBreaker";
import { CostReport } from "@/components/kyber/CostReport";
import { PERIOD } from "@/data/kyber-seed";

const TABS = [
  { id: "attribution", label: "Cost Attribution" },
  { id: "breaker", label: "Live Breaker" },
  { id: "report", label: "Cost Report" },
] as const;

const THEMES = [
  { id: "color", label: "Dark", title: "Full color · dark" },
  { id: "light", label: "Light", title: "Full color · light" },
  { id: "mono", label: "B&W", title: "Black & white · dark" },
] as const;

type Theme = (typeof THEMES)[number]["id"];

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = typeof localStorage !== "undefined" ? localStorage.getItem("kyber-theme") : null;
    return saved === "mono" || saved === "light" || saved === "color" ? saved : "color";
  });
  useEffect(() => {
    const el = document.documentElement;
    el.classList.remove("theme-mono", "theme-light");
    if (theme === "mono") el.classList.add("theme-mono");
    if (theme === "light") el.classList.add("theme-light");
    localStorage.setItem("kyber-theme", theme);
  }, [theme]);
  return [theme, setTheme] as const;
}

export default function App() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("attribution");
  const [theme, setTheme] = useTheme();

  return (
    <div className="ambient-canvas min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-hairline bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-8 gap-y-3 px-6 py-3.5">
          <div className="flex items-center gap-2.5">
            <Hexagon className="h-4 w-4 text-cat-search" />
            <span className="text-sm font-semibold tracking-tight text-foreground">Kyber</span>
            <span className="rounded border border-hairline px-1.5 py-0.5 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              Cost governance
            </span>
          </div>
          <nav className="flex items-center gap-1 rounded-lg border border-hairline bg-overlay-hover p-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium tracking-tight transition-colors ${
                  tab === t.id
                    ? "bg-overlay-strong text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3 text-[11px] text-muted-foreground">
            <div className="flex items-center rounded-lg border border-hairline bg-overlay-hover p-0.5">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  title={t.title}
                  onClick={() => setTheme(t.id)}
                  className={`rounded-md px-2 py-1 text-[10px] font-medium uppercase tracking-[0.1em] transition-colors ${
                    theme === t.id
                      ? "bg-overlay-strong text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <span className="rounded border border-cat-search/40 bg-cat-search/10 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.12em] text-cat-search">
              Illustrative data
            </span>
            <span>
              Billing period <span className="text-foreground">{PERIOD}</span>
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 py-7">
        <h1 className="sr-only">Kyber AI agent cost governance dashboard</h1>
        {tab === "attribution" ? (
          <CostAttribution />
        ) : tab === "breaker" ? (
          <LiveBreaker />
        ) : (
          <CostReport />
        )}
      </main>
    </div>
  );
}
