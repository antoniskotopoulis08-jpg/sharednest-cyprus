import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { properties, formatEUR } from "@/lib/properties";
import { Heart, Users, Calculator, Bell } from "lucide-react";
import { Disclaimer } from "@/components/disclaimer";
import { CountUp } from "@/components/count-up";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Buyer dashboard — Share B&B" },
      { name: "description", content: "Track saved properties, matched co-buyers and calculate affordability on Share B&B." },
      { property: "og:title", content: "Buyer dashboard — Share B&B" },
      { property: "og:description", content: "Your saved properties and matched co-buyers." },
    ],
  }),
  component: Dashboard,
});

const savedIds = ["lim-01", "paf-01", "ayn-01"];
const matches = [
  { name: "Elena K.", pct: 92, city: "Limassol", note: "Wants a shared vacation villa" },
  { name: "Andreas P.", pct: 84, city: "Paphos", note: "Long-term co-owner, personal use" },
  { name: "Marta R.", pct: 78, city: "Ayia Napa", note: "Rental income focus" },
];

function Dashboard() {
  const saved = properties.filter((p) => savedIds.includes(p.id));
  const [budget, setBudget] = useState(120_000);
  const [pct, setPct] = useState(15);
  const [total, setTotal] = useState(900_000);
  const share = Math.round((total * pct) / 100);
  const gap = share - budget;

  return (
    <div className="container-page py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-gold">Dashboard</div>
          <h1 className="mt-2 font-serif text-4xl">Welcome back, Sophia.</h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Bell className="h-4 w-4 text-gold" /> 3 new updates on your saved properties
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-4">
        {[
          ["Saved properties", saved.length.toString()],
          ["Compatible co-buyers", matches.length.toString()],
          ["Avg. min share", "12%"],
          ["Pending reviews", "1"],
        ].map(([l, v]) => (
          <div key={l} className="rounded-xl border border-border bg-card p-5">
            <div className="text-xs text-muted-foreground">{l}</div>
            <div className="mt-2 font-serif text-3xl">{v}</div>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <h2 className="font-serif text-2xl flex items-center gap-2">
            <Heart className="h-5 w-5 text-gold" /> Saved properties
          </h2>
          <div className="mt-5 space-y-4">
            {saved.map((p) => (
              <Link
                key={p.id}
                to="/property/$id"
                params={{ id: p.id }}
                className="flex gap-4 rounded-xl border border-border bg-card overflow-hidden hover:shadow-elegant transition-all"
              >
                <img src={p.image} alt={p.title} loading="lazy" width={400} height={300} className="h-32 w-40 shrink-0 object-cover" />
                <div className="min-w-0 py-3 pr-4 flex-1">
                  <div className="text-xs text-muted-foreground">{p.city}, Cyprus</div>
                  <div className="font-serif text-lg truncate">{p.title}</div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    From {formatEUR(Math.round(p.fullPrice * p.minSharePct / 100))} · {p.availableSharePct}% available
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <aside className="space-y-8">
          <div>
            <h2 className="font-serif text-2xl flex items-center gap-2">
              <Users className="h-5 w-5 text-gold" /> Matched co-buyers
            </h2>
            <div className="mt-5 space-y-3">
              {matches.map((m) => (
                <div key={m.name} className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{m.name}</div>
                    <div className="text-primary font-serif text-xl">{m.pct}%</div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{m.city} · {m.note}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-secondary/40 p-5">
            <h2 className="font-serif text-xl flex items-center gap-2">
              <Calculator className="h-5 w-5 text-gold" /> Affordability calculator
            </h2>
            <div className="mt-4 space-y-4 text-sm">
              <label className="block">
                <div className="text-xs text-muted-foreground mb-1">Property value · {formatEUR(total)}</div>
                <input type="range" min={300_000} max={3_000_000} step={50_000} value={total}
                  onChange={(e) => setTotal(Number(e.target.value))} className="w-full accent-[color:var(--gold)]" />
              </label>
              <label className="block">
                <div className="text-xs text-muted-foreground mb-1">Your share · {pct}%</div>
                <input type="range" min={5} max={50} step={5} value={pct}
                  onChange={(e) => setPct(Number(e.target.value))} className="w-full accent-[color:var(--gold)]" />
              </label>
              <label className="block">
                <div className="text-xs text-muted-foreground mb-1">Your budget · {formatEUR(budget)}</div>
                <input type="range" min={20_000} max={800_000} step={10_000} value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))} className="w-full accent-[color:var(--gold)]" />
              </label>
              <div className="rounded-md bg-card border border-border p-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Share price</span>
                  <span className="font-medium">{formatEUR(share)}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-muted-foreground">{gap > 0 ? "Shortfall" : "Headroom"}</span>
                  <span className={"font-medium " + (gap > 0 ? "text-destructive" : "text-primary")}>
                    {formatEUR(Math.abs(gap))}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Disclaimer />
        </aside>
      </div>
    </div>
  );
}
