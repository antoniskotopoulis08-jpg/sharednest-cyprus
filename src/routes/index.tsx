import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ShieldCheck, Sparkles, ArrowRight, Waves, Scale,
  Landmark, FileCheck, Handshake, Search, Users, KeyRound, ArrowUpRight,
  Calculator, TrendingUp, Home as HomeIcon,
} from "lucide-react";
import heroImg from "@/assets/hero-villa.jpg";
import limassolImg from "@/assets/prop-limassol.jpg";
import paphosImg from "@/assets/prop-paphos.jpg";
import larnacaImg from "@/assets/prop-larnaca.jpg";
import { formatEUR } from "@/lib/properties";
import { LuxeShareCard, type LuxeCardData } from "@/components/luxe-share-card";
import { Disclaimer } from "@/components/disclaimer";
import { CountUp } from "@/components/count-up";

export const Route = createFileRoute("/")({
  component: Home,
});

// Featured trio per brief
const FEATURED_IDS = ["lim-01", "paf-01", "lar-01"] as const;

function Home() {
  const featured = FEATURED_IDS
    .map((id) => properties.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div>
      <Hero />
      <FeaturedProperties featured={featured} />
      <HowItWorks />
      <MatchmakerPreview />
      <AffordabilityComparison />
      <TrustLegal />
      <OwnerCTA />
      <FinalCTA />
    </div>
  );
}

/* ─────────────────────────  1. HERO  ───────────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Cyprus villa at sunset"
          width={1920}
          height={1200}
          className="h-full w-full object-cover scale-105"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, oklch(0.18 0.06 250 / 0.92) 0%, oklch(0.22 0.07 250 / 0.75) 45%, oklch(0.18 0.06 250 / 0.15) 100%)",
          }}
        />
      </div>

      <div className="relative container-page pt-20 pb-24 md:pt-28 md:pb-36 text-primary-foreground">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8 animate-reveal">
            <div className="eyebrow" style={{ color: "oklch(0.85 0.13 82)" }}>
              <span className="inline-flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-gold" />
                Cyprus · Co-ownership marketplace
              </span>
            </div>
            <h1 className="mt-6 text-display text-5xl md:text-7xl lg:text-[5.75rem]">
              Own a share of your{" "}
              <em className="italic text-gold" style={{ fontFamily: "var(--font-serif)" }}>
                dream home
              </em>{" "}
              in Cyprus.
            </h1>
            <p className="mt-8 max-w-xl text-lg text-primary-foreground/75 leading-relaxed">
              Share B&amp;B helps verified buyers co-buy homes, villas, and apartments
              through an AI-powered real estate marketplace.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/browse"
                className="group inline-flex items-center gap-2 rounded-sm px-6 py-3.5 text-sm font-medium text-gold-foreground hover:opacity-90 transition-all"
                style={{ background: "var(--gradient-gold)" }}
              >
                Browse properties
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/matchmaker"
                className="inline-flex items-center gap-2 rounded-sm border border-primary-foreground/25 px-6 py-3.5 text-sm font-medium hover:bg-primary-foreground/5 transition-colors"
              >
                <Sparkles className="h-4 w-4" /> Take AI Match Quiz
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 animate-reveal-in" style={{ animationDelay: "200ms" }}>
            <div className="glass-dark rounded-2xl p-6 text-primary-foreground">
              <div className="eyebrow" style={{ color: "oklch(0.85 0.13 82)" }}>
                Featured share
              </div>
              <div className="mt-4 flex items-start gap-4">
                <img
                  src={limassolImg}
                  alt=""
                  width={120}
                  height={120}
                  className="h-20 w-20 rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <div className="text-xs opacity-70 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> Limassol
                  </div>
                  <div className="font-serif text-lg leading-tight truncate">
                    Seafront Infinity Villa
                  </div>
                  <div className="mt-2 text-xs opacity-70">10% share from</div>
                  <div className="font-serif text-2xl text-gold">{formatEUR(240_000)}</div>
                </div>
              </div>
              <div className="mt-5 pt-5 border-t border-white/10 grid grid-cols-3 gap-3 text-center">
                {[["120+", "Listings"], ["5", "Regions"], ["10%", "Min share"]].map(([n, l]) => (
                  <div key={l}>
                    <div className="font-serif text-xl text-gold">{n}</div>
                    <div className="text-[10px] uppercase tracking-widest opacity-60 mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-primary/40 backdrop-blur-sm text-primary-foreground/70 overflow-hidden">
        <div className="flex whitespace-nowrap animate-ticker py-3 text-xs uppercase tracking-[0.3em]">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0">
              {["Limassol", "Paphos", "Larnaca", "Nicosia", "Ayia Napa", "Kyrenia coast", "Troodos hills"].map(
                (c) => (
                  <span key={c + i} className="mx-8 flex items-center gap-3">
                    <Waves className="h-3 w-3 text-gold" /> {c}
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  2. FEATURED  ───────────────────────── */
function FeaturedProperties({ featured }: { featured: typeof properties }) {
  // Override titles to match brief exactly
  const overrides: Record<string, { title: string; image: string }> = {
    "lim-01": { title: "Limassol Seafront Apartment", image: limassolImg },
    "paf-01": { title: "Paphos Holiday Villa", image: paphosImg },
    "lar-01": { title: "Larnaca City Loft", image: larnacaImg },
  };
  const cards = featured.map((p) => ({ ...p, ...(overrides[p.id] ?? {}) }));

  return (
    <section className="container-page py-24">
      <div className="flex items-end justify-between gap-4 flex-wrap mb-10">
        <div>
          <div className="eyebrow">01 — Featured this week</div>
          <h2 className="mt-3 text-display text-4xl md:text-5xl">
            Handpicked shares.
          </h2>
        </div>
        <Link
          to="/browse"
          className="text-sm inline-flex items-center gap-2 border-b border-foreground/30 pb-1 hover:border-gold transition-colors"
        >
          View all listings <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((p, i) => (
          <div key={p.id} className="animate-reveal" style={{ animationDelay: `${i * 120}ms` }}>
            <PropertyCard p={p} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────  3. HOW IT WORKS  ───────────────────────── */
function HowItWorks() {
  const steps = [
    { n: "01", t: "Discover properties", d: "Search verified villas, apartments and homes across Cyprus with clear share pricing.", icon: Search },
    { n: "02", t: "Match with compatible buyers", d: "Our AI proposes co-buyers who share your budget, timeline and use of the home.", icon: Users },
    { n: "03", t: "Complete legal & financial checks", d: "Independent Cypriot lawyers handle title deed searches, KYC and escrow.", icon: FileCheck },
    { n: "04", t: "Co-own and manage your share", d: "Sign digitally, receive your ownership certificate, and manage usage in-app.", icon: KeyRound },
  ];
  return (
    <section className="relative border-y border-border bg-secondary/40 overflow-hidden">
      <div className="absolute inset-0 map-grain opacity-60" />
      <div className="relative container-page py-24">
        <div className="max-w-2xl">
          <div className="eyebrow">02 — Process</div>
          <h2 className="mt-3 text-display text-4xl md:text-5xl">
            How co-ownership works.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl">
            A four-step path from discovery to ownership — designed around Cypriot real
            estate practice, not shortcuts.
          </p>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="group animate-reveal"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-baseline gap-4">
                <div className="font-mono text-sm text-gold">{s.n}</div>
                <div className="h-px flex-1 bg-border" />
                <s.icon className="h-4 w-4 text-muted-foreground group-hover:text-gold transition-colors" />
              </div>
              <div className="mt-5 font-serif text-2xl">{s.t}</div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  4. AI MATCHMAKER PREVIEW  ───────────────────────── */
function MatchmakerPreview() {
  return (
    <section className="container-page py-24">
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <div className="eyebrow">03 — AI Matchmaker</div>
          <h2 className="mt-3 text-display text-4xl md:text-5xl">
            Meet a co-buyer who fits.
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Our matcher weighs budget, city, usage calendar and long-term intent — so you
            share a home with someone whose plans align with yours.
          </p>
          <Link
            to="/matchmaker"
            className="mt-8 inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Sparkles className="h-4 w-4" /> Take the AI Match Quiz
          </Link>
        </div>

        <div className="lg:col-span-7">
          <div className="relative rounded-2xl border border-border bg-card p-6 md:p-8 shadow-elegant">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono uppercase tracking-widest text-gold">Match preview</span>
              <span className="font-mono text-muted-foreground">SB-AI · v2.4</span>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-[auto_1fr] items-center">
              <BigScoreRing score={92} />
              <div>
                <div className="text-sm text-muted-foreground">Compatibility with</div>
                <div className="mt-1 font-serif text-3xl">Elena K.</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Marketing lead · Limassol · Wants a shared vacation home
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  {[
                    ["City", "Limassol"],
                    ["Budget", "€180k"],
                    ["Use", "Mixed"],
                    ["Horizon", "8y"],
                  ].map(([k, v]) => (
                    <span key={k} className="rounded-full border border-border bg-secondary/60 px-3 py-1">
                      <span className="text-muted-foreground">{k}</span> · {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["Budget alignment", 96],
                ["Usage calendar", 88],
                ["Ownership horizon", 91],
              ].map(([label, val]) => (
                <MatchBar key={label as string} label={label as string} value={val as number} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BigScoreRing({ score }: { score: number }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setValue(score), 200);
    return () => clearTimeout(t);
  }, [score]);
  const r = 58;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative h-40 w-40">
      <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
        <circle cx="70" cy="70" r={r} stroke="var(--border)" strokeWidth="6" fill="none" />
        <circle
          cx="70" cy="70" r={r}
          stroke="var(--gold)" strokeWidth="6" fill="none" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1400ms cubic-bezier(0.2,0.8,0.2,1)" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="font-serif text-5xl leading-none">
            <CountUp value={value} format={(n) => `${n}`} duration={1400} />
            <span className="text-2xl align-top text-gold">%</span>
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
            Match
          </div>
        </div>
      </div>
    </div>
  );
}

function MatchBar({ label, value }: { label: string; value: number }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(value), 300);
    return () => clearTimeout(t);
  }, [value]);
  return (
    <div className="rounded-lg border border-border bg-secondary/40 p-4">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono">{value}</span>
      </div>
      <div className="mt-3 h-1.5 rounded-full bg-border overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${w}%`,
            background: "var(--gradient-gold)",
            transition: "width 1200ms cubic-bezier(0.2,0.8,0.2,1)",
          }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────  5. AFFORDABILITY  ───────────────────────── */
function AffordabilityComparison() {
  const [pct, setPct] = useState(25);
  const total = 400_000;
  const share = Math.round((total * pct) / 100);
  return (
    <section className="border-y border-border bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-40" style={{ background: "var(--gradient-hero)" }} />
      <div className="relative container-page py-24">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="eyebrow" style={{ color: "oklch(0.85 0.13 82)" }}>
              04 — Affordability
            </div>
            <h2 className="mt-3 text-display text-4xl md:text-5xl">
              Enter Cyprus real estate at your own pace.
            </h2>
            <p className="mt-5 text-primary-foreground/70 leading-relaxed">
              Instead of buying a whole €400,000 villa, buy a {pct}% share for{" "}
              <span className="text-gold font-medium">{formatEUR(share)}</span> — and split
              costs with vetted co-owners.
            </p>
          <label className="mt-8 block">
              <div className="flex justify-between text-xs font-mono uppercase tracking-widest opacity-70">
                <span>Your share</span><span>{pct}%</span>
              </div>
              <input
                type="range" min={10} max={100} step={5} value={pct}
                onChange={(e) => setPct(Number(e.target.value))}
                className="mt-2 w-full accent-[color:var(--gold)]"
              />
            </label>
            <Link
              to="/calculator"
              className="mt-6 inline-flex items-center gap-2 text-sm text-gold hover:underline underline-offset-4"
            >
              <Calculator className="h-4 w-4" /> Open full affordability calculator
            </Link>
          </div>

          <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="text-xs font-mono uppercase tracking-widest opacity-60">Full purchase</div>
              <div className="mt-4 font-serif text-4xl md:text-5xl">{formatEUR(total)}</div>
              <div className="mt-2 text-sm opacity-70">100% ownership · full cost, full responsibility</div>
              <div className="mt-6 space-y-2 text-sm">
                <Row k="Upfront" v={formatEUR(total)} />
                <Row k="Monthly costs" v={formatEUR(1200)} />
                <Row k="Co-owners" v="—" />
              </div>
            </div>

            <div
              className="rounded-2xl p-6 text-gold-foreground relative"
              style={{ background: "var(--gradient-gold)" }}
            >
              <div className="text-xs font-mono uppercase tracking-widest opacity-70">
                {pct}% share via Share B&amp;B
              </div>
              <div className="mt-4 font-serif text-4xl md:text-5xl">
                <CountUp value={share} format={formatEUR} duration={500} />
              </div>
              <div className="mt-2 text-sm opacity-80">
                Verified co-owners · deeded share · full legal review
              </div>
              <div className="mt-6 space-y-2 text-sm">
                <Row k="Upfront" v={formatEUR(share)} dark />
                <Row k="Monthly costs" v={formatEUR(Math.round((1200 * pct) / 100))} dark />
                <Row k="Co-owners" v={`${Math.max(1, Math.round(100 / Math.max(pct, 5)) - 1)}`} dark />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ k, v, dark = false }: { k: string; v: string; dark?: boolean }) {
  return (
    <div
      className={
        "flex justify-between border-t pt-2 " +
        (dark ? "border-black/10" : "border-white/10")
      }
    >
      <span className={dark ? "opacity-70" : "opacity-60"}>{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}

/* ─────────────────────────  6. TRUST & LEGAL  ───────────────────────── */
function TrustLegal() {
  const items = [
    { icon: Scale, t: "Independent lawyers", d: "A Cypriot law firm represents you on every transaction — not us." },
    { icon: Landmark, t: "Banks & escrow", d: "Funds move through regulated bank escrow accounts, released only on completion." },
    { icon: FileCheck, t: "Title deed & due diligence", d: "Land Registry searches, encumbrance checks and planning status verified." },
    { icon: Handshake, t: "Written co-ownership agreement", d: "Usage, expenses and exit rules documented and digitally signed." },
  ];
  return (
    <section className="container-page py-24">
      <div className="grid lg:grid-cols-12 gap-10 items-end mb-12">
        <div className="lg:col-span-6">
          <div className="eyebrow">05 — Trust & legal</div>
          <h2 className="mt-3 text-display text-4xl md:text-5xl">
            Built on Cypriot legal practice.
          </h2>
        </div>
        <p className="lg:col-span-5 lg:col-start-8 text-muted-foreground">
          Every deal on Share B&amp;B is reviewed by qualified professionals. Lawyers, banks,
          due diligence, title deed checks and written agreements are part of the process —
          not optional add-ons.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {items.map((x) => (
          <div key={x.t} className="rounded-xl border border-border bg-card p-6 hover-lift">
            <div className="grid h-11 w-11 place-items-center rounded-md bg-primary text-primary-foreground">
              <x.icon className="h-5 w-5" />
            </div>
            <div className="mt-5 font-serif text-xl">{x.t}</div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{x.d}</p>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <Disclaimer />
      </div>
    </section>
  );
}

/* ─────────────────────────  7. OWNER CTA  ───────────────────────── */
function OwnerCTA() {
  return (
    <section className="container-page pb-24">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-12 grid gap-8 lg:grid-cols-12 items-center">
        <div
          className="absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--gradient-gold)" }}
        />
        <div className="relative lg:col-span-7">
          <div className="eyebrow">06 — For owners</div>
          <h2 className="mt-3 text-display text-4xl md:text-5xl">
            List your property for co-ownership buyers.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg">
            Release part of your home's value without selling it all. Our team handles
            photography, legal review and vetted buyer introductions.
          </p>
        </div>
        <div className="relative lg:col-span-5 flex lg:justify-end">
          <Link
            to="/list-property"
            className="group inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            List a Property
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  8. FINAL CTA  ───────────────────────── */
function FinalCTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={paphosImg}
          alt=""
          width={1920}
          height={1000}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.18 0.06 250 / 0.85) 0%, oklch(0.22 0.07 250 / 0.9) 100%)",
          }}
        />
      </div>
      <div className="relative container-page py-24 md:py-32 text-primary-foreground text-center">
        <div className="eyebrow mx-auto" style={{ color: "oklch(0.85 0.13 82)" }}>
          07 — Get started
        </div>
        <h2 className="mt-4 mx-auto max-w-3xl text-display text-4xl md:text-6xl">
          Property ownership in Cyprus,{" "}
          <em className="italic text-gold" style={{ fontFamily: "var(--font-serif)" }}>
            made more accessible.
          </em>
        </h2>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link
            to="/matchmaker"
            className="group inline-flex items-center gap-2 rounded-sm px-6 py-3.5 text-sm font-medium text-gold-foreground hover:opacity-90"
            style={{ background: "var(--gradient-gold)" }}
          >
            <Sparkles className="h-4 w-4" /> Start Matching
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/browse"
            className="inline-flex items-center gap-2 rounded-sm border border-primary-foreground/25 px-6 py-3.5 text-sm hover:bg-primary-foreground/5"
          >
            <ShieldCheck className="h-4 w-4" /> Browse verified listings
          </Link>
        </div>
      </div>
    </section>
  );
}
