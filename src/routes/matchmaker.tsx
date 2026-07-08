import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { formatEUR } from "@/lib/properties";
import { Sparkles, Users, ArrowRight, ArrowLeft, Check, MapPin, Home, Calendar, Heart, PieChart, TrendingUp, User } from "lucide-react";
import { Disclaimer } from "@/components/disclaimer";
import { CountUp } from "@/components/count-up";

export const Route = createFileRoute("/matchmaker")({
  head: () => ({
    meta: [
      { title: "AI Co-Buyer Matchmaker — Share B&B" },
      { name: "description", content: "Take the Share B&B AI quiz — get matched with compatible co-buyers and Cyprus properties." },
      { property: "og:title", content: "AI Co-Buyer Matchmaker" },
      { property: "og:description", content: "Answer 8 questions and receive an AI compatibility profile." },
    ],
  }),
  component: Matchmaker,
});

const CYPRUS_AREAS = ["Limassol", "Paphos", "Larnaca", "Nicosia", "Ayia Napa", "Troodos"];
const PURPOSES = ["Living", "Holiday home", "Rental income", "Long-term investment", "Retirement", "Digital nomad base"];
const USAGE_FREQ = ["Every weekend", "Monthly", "A few times a year", "Seasonal (1–3 months)", "Rarely — mostly rental"];
const COBUYER_TYPES = ["Quiet", "Family-friendly", "Investor-focused", "Flexible", "Luxury-focused"];
const SHARE_SIZES = [10, 20, 25, 50];

type Answers = {
  budget: number;
  areas: string[];
  purpose: string;
  usage: string;
  cobuyer: string;
  share: number;
  rental: number;
  personal: number;
};

const INITIAL: Answers = {
  budget: 150_000,
  areas: [],
  purpose: "",
  usage: "",
  cobuyer: "",
  share: 25,
  rental: 5,
  personal: 5,
};

function Matchmaker() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(INITIAL);
  const [done, setDone] = useState(false);

  const steps = [
    { key: "budget", label: "Budget", icon: PieChart },
    { key: "areas", label: "Areas", icon: MapPin },
    { key: "purpose", label: "Purpose", icon: Home },
    { key: "usage", label: "Usage", icon: Calendar },
    { key: "cobuyer", label: "Co-owner", icon: Users },
    { key: "share", label: "Share size", icon: PieChart },
    { key: "rental", label: "Rental", icon: TrendingUp },
    { key: "personal", label: "Personal", icon: Heart },
  ];

  const total = steps.length;
  const progress = ((step + (done ? 1 : 0)) / total) * 100;

  const canAdvance = () => {
    switch (step) {
      case 0: return answers.budget > 0;
      case 1: return answers.areas.length > 0;
      case 2: return !!answers.purpose;
      case 3: return !!answers.usage;
      case 4: return !!answers.cobuyer;
      case 5: return !!answers.share;
      default: return true;
    }
  };

  const next = () => {
    if (step < total - 1) setStep(step + 1);
    else setDone(true);
  };
  const back = () => (done ? setDone(false) : step > 0 && setStep(step - 1));

  const restart = () => { setAnswers(INITIAL); setStep(0); setDone(false); };

  return (
    <div className="container-page py-16">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold">
          <Sparkles className="h-3.5 w-3.5" /> AI Matchmaker
        </div>
        <h1 className="mt-2 font-serif text-4xl md:text-5xl">Meet your ideal co-buyers.</h1>
        <p className="mt-4 text-muted-foreground">
          Answer 8 short questions. Our AI generates a compatibility profile and matches
          you with properties and co-buyers across Cyprus.
        </p>
      </div>

      {!done ? (
        <div className="mt-10 rounded-2xl border border-border bg-card overflow-hidden">
          {/* Progress */}
          <div className="border-b border-border p-6">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
              <span>Step {step + 1} of {total} · {steps[step].label}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-gold transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-4 hidden md:flex items-center gap-1">
              {steps.map((s, i) => {
                const Icon = s.icon;
                const active = i === step;
                const complete = i < step;
                return (
                  <div key={s.key} className="flex-1 flex items-center gap-1">
                    <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] transition ${
                      active ? "bg-gold/15 text-gold" : complete ? "text-foreground" : "text-muted-foreground/60"
                    }`}>
                      <Icon className="h-3 w-3" />
                      <span className="hidden lg:inline">{s.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step content */}
          <div key={step} className="p-6 md:p-10 animate-fade-in min-h-[320px]">
            {step === 0 && (
              <StepShell title="What is your total budget?" hint="Move the slider to your comfortable maximum.">
                <div className="mt-4">
                  <div className="font-serif text-5xl text-gold">{formatEUR(answers.budget)}</div>
                  <input
                    type="range" min={40_000} max={800_000} step={10_000}
                    value={answers.budget}
                    onChange={(e) => setAnswers({ ...answers, budget: Number(e.target.value) })}
                    className="mt-6 w-full accent-[color:var(--gold)]"
                  />
                  <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    <span>€40k</span><span>€800k</span>
                  </div>
                </div>
              </StepShell>
            )}

            {step === 1 && (
              <StepShell title="Which Cyprus areas interest you?" hint="Pick one or more.">
                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
                  {CYPRUS_AREAS.map((a) => {
                    const on = answers.areas.includes(a);
                    return (
                      <button
                        key={a}
                        type="button"
                        onClick={() => setAnswers({
                          ...answers,
                          areas: on ? answers.areas.filter(x => x !== a) : [...answers.areas, a],
                        })}
                        className={`rounded-lg border px-4 py-3 text-left text-sm transition ${
                          on ? "border-gold bg-gold/10 text-foreground" : "border-border hover:border-gold/60"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{a}</span>
                          {on && <Check className="h-4 w-4 text-gold" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </StepShell>
            )}

            {step === 2 && (
              <StepShell title="What is your purpose?" hint="Pick the closest fit.">
                <ChoiceGrid options={PURPOSES} value={answers.purpose} onChange={(v) => setAnswers({ ...answers, purpose: v })} />
              </StepShell>
            )}

            {step === 3 && (
              <StepShell title="How often do you want to use the property?">
                <ChoiceGrid options={USAGE_FREQ} value={answers.usage} onChange={(v) => setAnswers({ ...answers, usage: v })} />
              </StepShell>
            )}

            {step === 4 && (
              <StepShell title="What type of co-owner do you prefer?">
                <ChoiceGrid options={COBUYER_TYPES} value={answers.cobuyer} onChange={(v) => setAnswers({ ...answers, cobuyer: v })} />
              </StepShell>
            )}

            {step === 5 && (
              <StepShell title="What share size are you interested in?" hint="A share is a percentage of ownership.">
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {SHARE_SIZES.map((s) => {
                    const on = answers.share === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setAnswers({ ...answers, share: s })}
                        className={`rounded-xl border px-4 py-6 text-center transition ${
                          on ? "border-gold bg-gold/10" : "border-border hover:border-gold/60"
                        }`}
                      >
                        <div className="font-serif text-3xl text-gold">{s}%</div>
                        <div className="text-xs text-muted-foreground mt-1">≈ {formatEUR(answers.budget * (s / 25))}</div>
                      </button>
                    );
                  })}
                </div>
              </StepShell>
            )}

            {step === 6 && (
              <StepShell title="How important is rental potential?">
                <ImportanceSlider value={answers.rental} onChange={(v) => setAnswers({ ...answers, rental: v })} />
              </StepShell>
            )}

            {step === 7 && (
              <StepShell title="How important is personal use?">
                <ImportanceSlider value={answers.personal} onChange={(v) => setAnswers({ ...answers, personal: v })} />
              </StepShell>
            )}
          </div>

          {/* Nav */}
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
              disabled={!canAdvance()}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-40"
            >
              {step === total - 1 ? "Generate AI match" : "Continue"} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <ResultDashboard answers={answers} onRestart={restart} />
      )}

      <div className="mt-10">
        <Disclaimer />
      </div>
    </div>
  );
}

function StepShell({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-serif text-2xl md:text-3xl">{title}</h2>
      {hint && <p className="mt-2 text-sm text-muted-foreground">{hint}</p>}
      {children}
    </div>
  );
}

function ChoiceGrid({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
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
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>0</span><span>10</span>
      </div>
    </div>
  );
}

/* ---------- RESULT ---------- */

function ResultDashboard({ answers, onRestart }: { answers: Answers; onRestart: () => void }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 400);
    return () => clearTimeout(t);
  }, []);

  const score = 87;
  const traits = [
    { label: "Budget alignment", value: 92 },
    { label: "Area demand", value: 84 },
    { label: "Usage compatibility", value: 89 },
    { label: "Co-buyer overlap", value: 83 },
  ];

  return (
    <div className="mt-10 animate-fade-in">
      {/* Hero card */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card to-muted/40 p-8 md:p-12">
        <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

        <div className="relative grid gap-10 md:grid-cols-[auto_1fr] items-center">
          <BigScoreRing score={score} animate={loaded} />
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs text-gold">
              <Sparkles className="h-3.5 w-3.5" /> AI compatibility profile
            </div>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl">You're a strong match.</h2>
            <p className="mt-3 text-muted-foreground max-w-xl">
              Based on your budget of {formatEUR(answers.budget)}, {answers.areas.length} preferred area
              {answers.areas.length === 1 ? "" : "s"}, and a "{answers.cobuyer.toLowerCase() || "flexible"}" co-owner style, our model rates your co-buying compatibility at <span className="text-foreground font-medium">{score}%</span>.
            </p>
          </div>
        </div>

        {/* Trait bars */}
        <div className="relative mt-10 grid gap-4 md:grid-cols-2">
          {traits.map((t, i) => (
            <TraitBar key={t.label} label={t.label} value={t.value} delay={i * 120} animate={loaded} />
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <ResultCard icon={Home} label="Best property type" value="Paphos holiday villa" sub="Coastal, high seasonal demand" />
        <ResultCard icon={PieChart} label="Suggested share" value="25%" sub={`≈ ${formatEUR(400_000 * 0.25)} co-invest`} />
        <ResultCard icon={User} label="Ideal co-buyer profile" value="Foreign holiday-home buyer + local professional" sub="Mixed personal use & rental" />
      </div>

      {/* Next step */}
      <div className="mt-6 rounded-2xl border border-gold/40 bg-gold/5 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="text-xs uppercase tracking-widest text-gold">Recommended next step</div>
          <div className="mt-2 font-serif text-2xl">View your matched properties</div>
          <p className="mt-1 text-sm text-muted-foreground max-w-lg">
            We'll shortlist verified Paphos villas in your budget with co-buyer slots open.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/browse"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            View matched properties <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm hover:border-gold/60"
          >
            Retake quiz
          </button>
        </div>
      </div>
    </div>
  );
}

function ResultCard({ icon: Icon, label, value, sub }: { icon: any; label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 hover:border-gold/40 transition">
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
        <Icon className="h-4 w-4 text-gold" /> {label}
      </div>
      <div className="mt-3 font-serif text-xl leading-snug">{value}</div>
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
          className="h-full bg-gradient-to-r from-gold via-gold to-primary"
          style={{ width: `${w}%`, transition: "width 1100ms cubic-bezier(0.2,0.8,0.2,1)" }}
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
