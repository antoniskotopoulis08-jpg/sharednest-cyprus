import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { cities, propertyTypes, uses, formatEUR, properties } from "@/lib/properties";
import { PropertyCard } from "@/components/property-card";
import { Sparkles, Users } from "lucide-react";
import { Disclaimer } from "@/components/disclaimer";
import { CountUp } from "@/components/count-up";

export const Route = createFileRoute("/matchmaker")({
  head: () => ({
    meta: [
      { title: "AI Co-Buyer Matchmaker — Share B&B" },
      { name: "description", content: "Answer a short questionnaire and let Share B&B's AI find compatible co-buyers and properties across Cyprus." },
      { property: "og:title", content: "AI Co-Buyer Matchmaker" },
      { property: "og:description", content: "Get matched with compatible co-buyers and shared-ownership properties." },
    ],
  }),
  component: Matchmaker,
});

const sampleBuyers = [
  { name: "Elena K.", city: "Limassol", use: "Mixed", budget: 180_000 },
  { name: "Andreas P.", city: "Paphos", use: "Personal use", budget: 120_000 },
  { name: "Marta R.", city: "Ayia Napa", use: "Rental income", budget: 240_000 },
  { name: "Yiannis L.", city: "Larnaca", use: "Rental income", budget: 90_000 },
];

function Matchmaker() {
  const [budget, setBudget] = useState(150_000);
  const [city, setCity] = useState<string>(cities[0]);
  const [type, setType] = useState<string>(propertyTypes[0]);
  const [use, setUse] = useState<string>(uses[0]);
  const [nights, setNights] = useState<number>(45);
  const [horizon, setHorizon] = useState<number>(7);
  const [submitted, setSubmitted] = useState(false);

  const results = useMemo(() => {
    return properties
      .filter((p) => p.city === city)
      .map((p) => {
        const minShareEUR = (p.fullPrice * p.minSharePct) / 100;
        const affordabilityScore = budget >= minShareEUR ? 40 : Math.max(0, 40 - ((minShareEUR - budget) / minShareEUR) * 40);
        const typeScore = p.type === type ? 25 : 10;
        const useScore = p.expectedUse === use ? 25 : 10;
        const balance = Math.max(0, 10 - Math.abs(30 - nights) / 6);
        const score = Math.round(affordabilityScore + typeScore + useScore + balance);
        return { p, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [budget, city, type, use, nights]);

  const buyerMatches = useMemo(() => {
    return sampleBuyers
      .map((b) => {
        let score = 40;
        if (b.city === city) score += 25;
        if (b.use === use) score += 20;
        const diff = Math.abs(b.budget - budget);
        score += Math.max(0, 15 - diff / 20_000);
        return { ...b, score: Math.round(Math.min(99, score)) };
      })
      .sort((a, b) => b.score - a.score);
  }, [city, use, budget]);

  return (
    <div className="container-page py-16">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold">
          <Sparkles className="h-3.5 w-3.5" /> AI Matchmaker
        </div>
        <h1 className="mt-2 font-serif text-4xl md:text-5xl">Meet your ideal co-buyers.</h1>
        <p className="mt-4 text-muted-foreground">
          Answer a few questions. Our AI will suggest properties that fit your budget and
          highlight compatible co-buyers who share your usage plans.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[380px_1fr]">
        <form
          onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
          className="rounded-xl border border-border bg-card p-6 h-fit"
        >
          <div className="space-y-5">
            <Field label={`Your budget · ${formatEUR(budget)}`}>
              <input type="range" min={40_000} max={600_000} step={10_000} value={budget}
                onChange={(e) => setBudget(Number(e.target.value))} className="w-full accent-[color:var(--gold)]" />
            </Field>
            <Field label="Preferred city">
              <select value={city} onChange={(e) => setCity(e.target.value)} className={inputCls}>
                {cities.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Property type">
              <select value={type} onChange={(e) => setType(e.target.value)} className={inputCls}>
                {propertyTypes.map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Expected use">
              <select value={use} onChange={(e) => setUse(e.target.value)} className={inputCls}>
                {uses.map((u) => <option key={u}>{u}</option>)}
              </select>
            </Field>
            <Field label={`Nights per year at the home · ${nights}`}>
              <input type="range" min={0} max={120} step={5} value={nights}
                onChange={(e) => setNights(Number(e.target.value))} className="w-full accent-[color:var(--gold)]" />
            </Field>
            <Field label={`Ownership horizon · ${horizon} years`}>
              <input type="range" min={2} max={20} step={1} value={horizon}
                onChange={(e) => setHorizon(Number(e.target.value))} className="w-full accent-[color:var(--gold)]" />
            </Field>
          </div>
          <button className="mt-6 w-full rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Match me
          </button>
          <p className="mt-3 text-xs text-muted-foreground">
            Preview only. Full onboarding requires ID and source-of-funds verification.
          </p>
        </form>

        <div className="space-y-10">
          <section>
            <h2 className="font-serif text-2xl">Suggested properties</h2>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              {results.map(({ p, score }) => (
                <div key={p.id} className="relative">
                  <div className="absolute -top-3 left-4 z-10 rounded-full bg-gold px-3 py-1 text-xs font-medium text-gold-foreground">
                    Match {score}%
                  </div>
                  <PropertyCard p={p} />
                </div>
              ))}
            </div>
            {results.length === 0 && (
              <div className="text-sm text-muted-foreground mt-4">No matches in {city} yet — try another city.</div>
            )}
          </section>

          <section>
            <h2 className="font-serif text-2xl flex items-center gap-2">
              <Users className="h-5 w-5 text-gold" /> Compatible co-buyers
            </h2>
            <div className="mt-4 grid gap-3">
              {buyerMatches.map((b, i) => (
                <div key={b.name} className="flex items-center justify-between gap-4 rounded-lg border border-border bg-card p-4">
                  <div className="min-w-0">
                    <div className="font-medium">{b.name}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {b.city} · {b.use} · budget {formatEUR(b.budget)}
                    </div>
                  </div>
                  <ScoreRing key={`${b.name}-${b.score}`} score={b.score} delay={i * 120} />
                </div>
              ))}
            </div>
          </section>

          {submitted && (
            <div className="rounded-lg border border-gold/40 bg-gold/10 p-4 text-sm">
              Thanks — a Share B&amp;B advisor will reach out to introduce you to compatible co-buyers.
            </div>
          )}
          <Disclaimer />
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs text-muted-foreground mb-1.5">{label}</div>
      {children}
    </label>
  );
}

function ScoreRing({ score, delay = 0 }: { score: number; delay?: number }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setValue(score), delay + 60);
    return () => clearTimeout(t);
  }, [score, delay]);
  const r = 26;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative h-16 w-16 shrink-0">
      <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
        <circle cx="32" cy="32" r={r} stroke="var(--border)" strokeWidth="4" fill="none" />
        <circle
          cx="32" cy="32" r={r}
          stroke="var(--gold)" strokeWidth="4" fill="none" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1200ms cubic-bezier(0.2,0.8,0.2,1)" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center font-serif text-lg">
        <CountUp value={value} format={(n) => `${n}`} duration={1100} />
      </div>
    </div>
  );
}
