import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { formatEUR } from "@/lib/properties";
import {
  Sparkles, Users, ArrowRight, ArrowLeft, Check, MapPin, Home, TrendingUp,
  PieChart, User, Target, Briefcase, Waves, ScrollText, Rocket,
} from "lucide-react";
import { Disclaimer } from "@/components/disclaimer";
import { CountUp } from "@/components/count-up";

export const Route = createFileRoute("/matchmaker")({
  head: () => ({
    meta: [
      { title: "AI Co-Buyer Matchmaker — SharedNest" },
      { name: "description", content: "Take the SharedNest AI quiz — get matched with compatible co-buyers and Cyprus properties." },
      { property: "og:title", content: "AI Co-Buyer Matchmaker" },
      { property: "og:description", content: "Answer a few questions and receive an AI compatibility profile." },
    ],
  }),
  component: Matchmaker,
});

/* ─────────────  Data  ───────────── */

const GOALS = [
  { id: "invest",     label: "Invest in property",           icon: TrendingUp, track: "invest"   },
  { id: "live",       label: "Live in Cyprus",               icon: Home,       track: "residency"},
  { id: "holiday",    label: "Holiday home",                 icon: Waves,      track: "residency"},
  { id: "retire",     label: "Retirement base",              icon: User,       track: "residency"},
  { id: "nomad",      label: "Digital nomad base",           icon: Rocket,     track: "residency"},
  { id: "mixed",      label: "Mixed investment + personal use", icon: PieChart, track: "invest"  },
] as const;

type GoalId = (typeof GOALS)[number]["id"];
type Track = "invest" | "residency";

const AREAS = ["Limassol", "Paphos", "Larnaca", "Nicosia", "Ayia Napa", "Troodos"];

const RETURN_PROFILES = ["Steady income", "Balanced growth + income", "Capital growth focused"];
const RISK_LEVELS = ["Low", "Medium", "High"];
const STRATEGY = ["Short-term (2–4 yrs)", "Medium (5–8 yrs)", "Long-term (10+ yrs)"];

const LIFESTYLES = ["Quiet & coastal", "Vibrant city", "Village charm", "Mountain / nature"];
const FAMILY_NEEDS = ["Solo / couple", "Young family", "Teens", "Retirees", "Multi-generational"];
const PROXIMITY = ["International school", "City centre / work", "Beach", "Airport"];
const GEO_PREF = ["Beach", "City", "Mountain", "Mixed"];
const IMMIGRATION = ["Yes, please", "Maybe — not sure yet", "No, I'm all set"];

const SHARE_SIZES = [12.5, 25, 50];

/* ─────────────  Answers state  ───────────── */

type Answers = {
  goal: GoalId | "";
  // shared
  budget: number;
  share: number;
  location: string;
  // invest
  returnProfile: string;
  rentalImportance: number; // 0-10
  risk: string;
  strategy: string;
  // residency
  lifestyle: string;
  family: string;
  proximity: string;
  geo: string;
  monthsUse: number; // 1-12
  needImmigration: string;
};

const INITIAL: Answers = {
  goal: "",
  budget: 180_000,
  share: 25,
  location: "",
  returnProfile: "",
  rentalImportance: 6,
  risk: "",
  strategy: "",
  lifestyle: "",
  family: "",
  proximity: "",
  geo: "",
  monthsUse: 3,
  needImmigration: "",
};

/* ─────────────  Component  ───────────── */

function Matchmaker() {
  const [answers, setAnswers] = useState<Answers>(INITIAL);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const track: Track | null = useMemo(() => {
    if (!answers.goal) return null;
    return GOALS.find((g) => g.id === answers.goal)!.track;
  }, [answers.goal]);

  const flow = useMemo<{ key: string; title: string; hint?: string; render: () => React.ReactNode; complete: boolean }[]>(() => {
    const set = <K extends keyof Answers>(k: K, v: Answers[K]) => setAnswers((a) => ({ ...a, [k]: v }));

    const goalStep = {
      key: "goal",
      title: "What is your main goal?",
      hint: "Pick the closest fit — we'll customise the rest of the quiz around it.",
      complete: !!answers.goal,
      render: () => (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {GOALS.map((g) => {
            const on = answers.goal === g.id;
            const Icon = g.icon;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => set("goal", g.id)}
                className={`flex items-start gap-3 rounded-xl border p-4 text-left transition ${
                  on ? "border-gold bg-gold/10" : "border-border hover:border-gold/60"
                }`}
              >
                <span
                  className="grid h-10 w-10 place-items-center rounded-lg text-[color:var(--gold-foreground)] shrink-0"
                  style={{ background: "var(--gradient-gold)" }}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="font-serif text-lg leading-tight block">{g.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {g.track === "invest" ? "Investment track" : "Residency / lifestyle track"}
                  </span>
                </span>
                {on && <Check className="h-4 w-4 text-gold ml-auto shrink-0" />}
              </button>
            );
          })}
        </div>
      ),
    };

    const budgetStep = {
      key: "budget",
      title: "What is your desired budget?",
      hint: "Comfortable maximum you'd allocate to your share.",
      complete: answers.budget > 0,
      render: () => (
        <div className="mt-4">
          <div className="font-serif text-5xl text-gold">{formatEUR(answers.budget)}</div>
          <input
            type="range" min={40_000} max={800_000} step={10_000}
            value={answers.budget}
            onChange={(e) => set("budget", Number(e.target.value))}
            className="mt-6 w-full accent-[color:var(--gold)]"
          />
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>€40k</span><span>€800k</span>
          </div>
        </div>
      ),
    };

    const locationStep = {
      key: "location",
      title: "Preferred Cyprus location",
      hint: "Pick your top choice — we'll surface alternatives too.",
      complete: !!answers.location,
      render: () => <ChoiceGrid options={AREAS} value={answers.location} onChange={(v) => set("location", v)} cols={3} />,
    };

    const shareStep = {
      key: "share",
      title: "Desired ownership percentage",
      hint: "Larger shares = higher access & upside, higher upfront cost.",
      complete: !!answers.share,
      render: () => (
        <div className="mt-6 grid grid-cols-3 gap-3">
          {SHARE_SIZES.map((s) => {
            const on = answers.share === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => set("share", s)}
                className={`rounded-xl border px-4 py-6 text-center transition ${
                  on ? "border-gold bg-gold/10" : "border-border hover:border-gold/60"
                }`}
              >
                <div className="font-serif text-3xl text-gold">{s}%</div>
                <div className="text-xs text-muted-foreground mt-1">
                  ≈ {formatEUR(Math.round((answers.budget * s) / 25))}
                </div>
              </button>
            );
          })}
        </div>
      ),
    };

    if (track === "invest") {
      return [
        goalStep,
        budgetStep,
        {
          key: "returnProfile",
          title: "Preferred return profile",
          complete: !!answers.returnProfile,
          render: () => <ChoiceGrid options={RETURN_PROFILES} value={answers.returnProfile} onChange={(v) => set("returnProfile", v)} />,
        },
        {
          key: "rentalImportance",
          title: "How important is rental income?",
          complete: true,
          render: () => <ImportanceSlider value={answers.rentalImportance} onChange={(v) => set("rentalImportance", v)} />,
        },
        {
          key: "risk",
          title: "Risk tolerance",
          complete: !!answers.risk,
          render: () => <ChoiceGrid options={RISK_LEVELS} value={answers.risk} onChange={(v) => set("risk", v)} cols={3} />,
        },
        locationStep,
        {
          key: "strategy",
          title: "Short-term or long-term strategy?",
          complete: !!answers.strategy,
          render: () => <ChoiceGrid options={STRATEGY} value={answers.strategy} onChange={(v) => set("strategy", v)} cols={3} />,
        },
        shareStep,
      ];
    }

    if (track === "residency") {
      return [
        goalStep,
        {
          key: "lifestyle",
          title: "Preferred lifestyle",
          complete: !!answers.lifestyle,
          render: () => <ChoiceGrid options={LIFESTYLES} value={answers.lifestyle} onChange={(v) => set("lifestyle", v)} />,
        },
        {
          key: "family",
          title: "Family needs",
          complete: !!answers.family,
          render: () => <ChoiceGrid options={FAMILY_NEEDS} value={answers.family} onChange={(v) => set("family", v)} />,
        },
        {
          key: "proximity",
          title: "School or work proximity",
          hint: "What should be nearby?",
          complete: !!answers.proximity,
          render: () => <ChoiceGrid options={PROXIMITY} value={answers.proximity} onChange={(v) => set("proximity", v)} />,
        },
        {
          key: "geo",
          title: "Beach, city, or mountain?",
          complete: !!answers.geo,
          render: () => <ChoiceGrid options={GEO_PREF} value={answers.geo} onChange={(v) => set("geo", v)} cols={4} />,
        },
        {
          key: "monthsUse",
          title: "How many months per year do you want to use the property?",
          complete: true,
          render: () => (
            <div className="mt-6">
              <div className="flex items-baseline justify-between">
                <div className="font-serif text-4xl text-gold">
                  {answers.monthsUse}
                  <span className="text-xl text-muted-foreground"> / 12 months</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {answers.monthsUse >= 9 ? "Primary home" : answers.monthsUse >= 4 ? "Seasonal base" : "Short visits"}
                </div>
              </div>
              <input
                type="range" min={1} max={12} step={1} value={answers.monthsUse}
                onChange={(e) => set("monthsUse", Number(e.target.value))}
                className="mt-6 w-full accent-[color:var(--gold)]"
              />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>1 month</span><span>Year-round</span>
              </div>
            </div>
          ),
        },
        shareStep,
        {
          key: "needImmigration",
          title: "Do you need legal or immigration guidance?",
          hint: "We'll flag independent Cypriot specialists — we don't advise ourselves.",
          complete: !!answers.needImmigration,
          render: () => <ChoiceGrid options={IMMIGRATION} value={answers.needImmigration} onChange={(v) => set("needImmigration", v)} cols={3} />,
        },
      ];
    }

    return [goalStep];
  }, [answers, track]);

  const total = flow.length;
  const current = flow[Math.min(step, total - 1)];
  const progress = ((step + (done ? 1 : 0)) / total) * 100;

  const next = () => {
    if (step < total - 1) setStep(step + 1);
    else setDone(true);
  };
  const back = () => (done ? setDone(false) : step > 0 && setStep(step - 1));
  const restart = () => { setAnswers(INITIAL); setStep(0); setDone(false); };

  // If goal changes and step is beyond new flow, clamp
  useEffect(() => {
    if (step > total - 1) setStep(0);
  }, [total, step]);

  return (
    <div className="container-page py-16">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold">
          <Sparkles className="h-3.5 w-3.5" /> AI Matchmaker
        </div>
        <h1 className="mt-2 font-serif text-4xl md:text-5xl">Find your Cyprus fit.</h1>
        <p className="mt-4 text-muted-foreground">
          Start with your main goal — the quiz then adapts to either an investment path
          or a residency & lifestyle path.
        </p>
      </div>

      {!done ? (
        <div className="mt-10 rounded-2xl border border-border bg-card overflow-hidden">
          <div className="border-b border-border p-6">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
              <span className="inline-flex items-center gap-2">
                <Target className="h-3.5 w-3.5 text-gold" />
                Step {step + 1} of {total}
                {track && (
                  <span className="ml-2 rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-gold">
                    {track === "invest" ? "Investment track" : "Residency track"}
                  </span>
                )}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%`, background: "var(--gradient-gold)" }}
              />
            </div>
          </div>

          <div key={current.key} className="p-6 md:p-10 animate-fade-in min-h-[320px]">
            <StepShell title={current.title} hint={current.hint}>{current.render()}</StepShell>
          </div>

          <div className="border-t border-border p-6 flex items-center justify-between">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button
              type="button"
              onClick={next}
              disabled={!current.complete}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-[color:var(--gold-foreground)] disabled:opacity-40"
              style={{ background: "var(--gradient-gold)" }}
            >
              {step === total - 1 ? "Generate AI match" : "Continue"} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <ResultDashboard answers={answers} track={track!} onRestart={restart} />
      )}

      <div className="mt-10">
        <Disclaimer />
      </div>
    </div>
  );
}

/* ─────────────  Steps UI  ───────────── */

function StepShell({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-serif text-2xl md:text-3xl">{title}</h2>
      {hint && <p className="mt-2 text-sm text-muted-foreground">{hint}</p>}
      {children}
    </div>
  );
}

function ChoiceGrid({
  options, value, onChange, cols = 2,
}: { options: readonly string[]; value: string; onChange: (v: string) => void; cols?: 2 | 3 | 4 }) {
  const gridCls =
    cols === 4 ? "sm:grid-cols-4" : cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  return (
    <div className={`mt-6 grid grid-cols-1 ${gridCls} gap-3`}>
      {options.map((o) => {
        const on = value === o;
        return (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={`rounded-lg border px-4 py-3 text-left text-sm transition ${
              on ? "border-gold bg-gold/10" : "border-border hover:border-gold/60"
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{o}</span>
              {on && <Check className="h-4 w-4 text-gold" />}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function ImportanceSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const labels = ["Not important", "Nice to have", "Fairly important", "Very important", "Essential"];
  const bucket = Math.min(4, Math.floor(value / 2.5));
  return (
    <div className="mt-6">
      <div className="flex items-baseline justify-between">
        <div className="font-serif text-4xl text-gold">{value}<span className="text-xl text-muted-foreground">/10</span></div>
        <div className="text-sm text-muted-foreground">{labels[bucket]}</div>
      </div>
      <input
        type="range" min={0} max={10} step={1} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-6 w-full accent-[color:var(--gold)]"
      />
    </div>
  );
}

/* ─────────────  Result  ───────────── */

function ResultDashboard({
  answers, track, onRestart,
}: { answers: Answers; track: Track; onRestart: () => void }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 400); return () => clearTimeout(t); }, []);

  // Mock scoring — deterministic from inputs
  const rec = useMemo(() => {
    const coastal = ["Limassol", "Paphos", "Larnaca", "Ayia Napa"].includes(answers.location);
    const wantsRental = answers.rentalImportance >= 6 || answers.returnProfile === "Steady income";

    // Investment suitability
    let inv = 55;
    if (track === "invest") inv += 20;
    inv += Math.min(20, answers.rentalImportance * 2);
    if (answers.risk === "High") inv += 6; else if (answers.risk === "Medium") inv += 3;
    if (answers.strategy?.startsWith("Long")) inv += 4;
    if (coastal) inv += 4;
    inv = Math.max(40, Math.min(97, inv));

    // Residency suitability
    let res = 55;
    if (track === "residency") res += 20;
    if (answers.monthsUse >= 6) res += 12;
    else if (answers.monthsUse >= 3) res += 6;
    if (answers.family === "Young family" || answers.family === "Multi-generational") res += 4;
    if (answers.geo === "Beach" && coastal) res += 5;
    res = Math.max(40, Math.min(97, res));

    const overall = Math.round((inv + res) / 2);

    // Best property type + location
    let bestType = "Coastal apartment";
    if (track === "invest" && wantsRental) bestType = "Short-let seafront apartment";
    else if (track === "invest") bestType = "Modern city apartment";
    else if (answers.family === "Young family") bestType = "Family villa with garden";
    else if (answers.geo === "Mountain") bestType = "Stone village house";
    else if (answers.monthsUse >= 6) bestType = "Full-service townhouse";
    else bestType = "Holiday villa";

    let bestLocation = answers.location || (track === "invest" ? "Limassol" : "Paphos");
    if (!answers.location && answers.geo === "Mountain") bestLocation = "Troodos hills";
    if (!answers.location && answers.geo === "City") bestLocation = "Nicosia";

    // Ideal co-buyer profile
    let coBuyer = "Foreign holiday-home buyer + local professional";
    if (track === "invest" && answers.strategy?.startsWith("Long")) coBuyer = "Long-horizon investor + rental-focused co-owner";
    else if (track === "invest") coBuyer = "Yield-focused investors sharing seasonal rental income";
    else if (answers.family === "Retirees") coBuyer = "Fellow retirees splitting a quiet seasonal home";
    else if (answers.family === "Young family") coBuyer = "Second family sharing school-holiday windows";
    else if (track === "residency" && answers.monthsUse >= 8) coBuyer = "One or two silent investor co-owners";

    // Next step
    const nextStep = track === "invest"
      ? "Shortlist investment-grade shares matching your risk profile"
      : "Preview lifestyle-fit homes with your personal-use calendar";

    return {
      inv, res, overall,
      bestType, bestLocation,
      share: answers.share,
      approxCost: Math.round((answers.budget * answers.share) / 25),
      coBuyer, nextStep,
    };
  }, [answers, track]);

  return (
    <div className="mt-10 animate-fade-in">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card to-muted/40 p-8 md:p-12">
        <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

        <div className="relative grid gap-10 md:grid-cols-[auto_1fr] items-center">
          <BigScoreRing score={rec.overall} animate={loaded} />
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs text-gold">
              <Sparkles className="h-3.5 w-3.5" /> Personalised AI profile
            </div>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl">
              You look best suited to a{" "}
              <span className="text-gold">{track === "invest" ? "share investment" : "residency-first"}</span> path.
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl">
              Based on your goal, budget of {formatEUR(answers.budget)} and a preferred{" "}
              {answers.share}% share, our mock model rates your overall compatibility at{" "}
              <span className="text-foreground font-medium">{rec.overall}%</span>.
            </p>
          </div>
        </div>

        <div className="relative mt-10 grid gap-4 md:grid-cols-2">
          <TraitBar label="Investment suitability" value={rec.inv} delay={0} animate={loaded} />
          <TraitBar label="Residency / personal-use suitability" value={rec.res} delay={140} animate={loaded} />
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <ResultCard icon={Home} label="Best property type" value={rec.bestType} sub="Matched to your lifestyle & horizon" />
        <ResultCard icon={MapPin} label="Best Cyprus location" value={rec.bestLocation} sub="Aligned with your preferences" />
        <ResultCard icon={PieChart} label="Suggested share" value={`${rec.share}%`} sub={`≈ ${formatEUR(rec.approxCost)} co-invest`} />
        <ResultCard icon={Users} label="Compatible co-buyer profile" value={rec.coBuyer} sub="Illustrative — real matches shown after signup" />
      </div>

      <div className="mt-6 rounded-2xl border border-gold/40 bg-gold/5 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="text-xs uppercase tracking-widest text-gold inline-flex items-center gap-2">
            <Briefcase className="h-3.5 w-3.5" /> Recommended next step
          </div>
          <div className="mt-2 font-serif text-2xl">{rec.nextStep}</div>
          {track === "residency" && answers.needImmigration === "Yes, please" && (
            <p className="mt-2 text-sm text-muted-foreground max-w-lg inline-flex items-start gap-2">
              <ScrollText className="h-4 w-4 mt-0.5 text-gold shrink-0" />
              We'll also share a list of independent Cypriot immigration specialists you can contact.
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/browse"
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-[color:var(--gold-foreground)]"
            style={{ background: "var(--gradient-gold)" }}
          >
            View matched properties <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm hover:border-gold/60"
          >
            Retake quiz
          </button>
        </div>
      </div>
    </div>
  );
}

function ResultCard({
  icon: Icon, label, value, sub,
}: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 hover:border-gold/40 transition">
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
        <Icon className="h-4 w-4 text-gold" /> {label}
      </div>
      <div className="mt-3 font-serif text-lg leading-snug">{value}</div>
      <div className="mt-2 text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}

function TraitBar({ label, value, delay, animate }: { label: string; value: number; delay: number; animate: boolean }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!animate) return;
    const t = setTimeout(() => setW(value), delay);
    return () => clearTimeout(t);
  }, [animate, value, delay]);
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-serif text-gold"><CountUp value={w} format={(n) => `${n}%`} duration={900} /></span>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full"
          style={{
            width: `${w}%`,
            background: "var(--gradient-gold)",
            transition: "width 1100ms cubic-bezier(0.2,0.8,0.2,1)",
          }}
        />
      </div>
    </div>
  );
}

function BigScoreRing({ score, animate }: { score: number; animate: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!animate) return;
    const t = setTimeout(() => setV(score), 150);
    return () => clearTimeout(t);
  }, [animate, score]);
  const r = 78;
  const c = 2 * Math.PI * r;
  const off = c - (v / 100) * c;
  return (
    <div className="relative h-48 w-48 shrink-0">
      <svg viewBox="0 0 180 180" className="h-full w-full -rotate-90">
        <circle cx="90" cy="90" r={r} stroke="var(--border)" strokeWidth="8" fill="none" />
        <circle
          cx="90" cy="90" r={r}
          stroke="var(--gold)" strokeWidth="8" fill="none" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={off}
          style={{ transition: "stroke-dashoffset 1600ms cubic-bezier(0.2,0.8,0.2,1)" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="font-serif text-5xl text-foreground">
            <CountUp value={v} format={(n) => `${n}`} duration={1500} />
            <span className="text-2xl text-muted-foreground">%</span>
          </div>
          <div className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">Compatibility</div>
        </div>
      </div>
    </div>
  );
}
