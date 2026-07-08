import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Home,
  Sun,
  Waves,
  MapPin,
  CalendarDays,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Users,
  Palmtree,
} from "lucide-react";
import { Disclaimer } from "@/components/disclaimer";

export const Route = createFileRoute("/residency")({
  head: () => ({
    meta: [
      { title: "Residency & Lifestyle in Cyprus | Share B&B" },
      {
        name: "description",
        content:
          "Find a Cyprus home that fits your lifestyle, family and long-term plans — as a holiday base, retirement home or digital-nomad base — through co-ownership.",
      },
      { property: "og:title", content: "Residency & Lifestyle in Cyprus | Share B&B" },
      {
        property: "og:description",
        content:
          "Co-own a Mediterranean home for holidays, retirement or remote work. Share B&B matches you with lifestyle-fit properties across Cyprus.",
      },
    ],
  }),
  component: ResidencyPage,
});

const audiences = [
  {
    icon: Sun,
    t: "Holiday home",
    d: "Weeks or months a year on the coast, with the rest of the calendar shared between co-owners.",
  },
  {
    icon: Palmtree,
    t: "Retirement base",
    d: "A calmer, sun-drenched second chapter — with a home you actually own a share of.",
  },
  {
    icon: Waves,
    t: "Digital nomad base",
    d: "Stable Wi-Fi, walkable neighborhoods and a Mediterranean climate to work from.",
  },
  {
    icon: Users,
    t: "Family & long-term use",
    d: "Bring family for extended stays, school breaks and slow-living months in Cyprus.",
  },
];

const steps = [
  { t: "Tell us how you want to live", d: "Location, months per year, family needs, lifestyle priorities." },
  { t: "See lifestyle-first listings", d: "Distance to beach, schools and city centers, plus a lifestyle score per home." },
  { t: "Coordinate your usage calendar", d: "Personal-use days are agreed and scheduled with your co-owners." },
  { t: "Legal & immigration review", d: "Independent Cypriot lawyers and immigration specialists confirm your path." },
];

const checklist = [
  "Title deed & co-ownership agreement reviewed by a licensed Cyprus lawyer",
  "Residency permit route confirmed with an immigration specialist",
  "Tax residency and double-taxation implications reviewed",
  "Usage calendar and house rules agreed between all co-owners",
];

function ResidencyPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="relative container-page py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs text-gold-foreground">
              <Home className="h-3.5 w-3.5" />
              For residency & personal use
            </div>
            <h1 className="mt-5 text-display text-4xl md:text-6xl leading-[1.05]">
              Live in Cyprus, <span className="text-gold">on your own terms.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Whether you want a holiday home, a retirement base or a digital-nomad landing pad —
              co-own a Mediterranean home that fits your family, location preferences and
              long-term plans.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/browse"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Browse lifestyle homes <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/calculator"
                className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-medium hover:bg-background/40 transition-colors"
              >
                Residency & personal-use calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section className="container-page py-16 md:py-20">
        <div className="max-w-2xl">
          <div className="eyebrow">Who this is for</div>
          <h2 className="mt-2 text-display text-3xl md:text-4xl">
            A home for the life you actually want in Cyprus.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => (
            <div
              key={a.t}
              className="group rounded-2xl border border-border/60 bg-background/40 backdrop-blur p-6 transition-all duration-300 hover:border-gold/50 hover:-translate-y-1"
            >
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-gold/10 text-gold border border-gold/30">
                <a.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-medium">{a.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{a.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Lifestyle stats teaser */}
      <section className="container-page py-4">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Waves, t: "Coastal cities", d: "Limassol · Paphos · Larnaca · Ayia Napa" },
            { icon: MapPin, t: "Walkable neighborhoods", d: "Homes matched to schools, cafés and marinas" },
            { icon: CalendarDays, t: "Shared usage calendar", d: "Agree your months with co-owners upfront" },
          ].map((s) => (
            <div key={s.t} className="rounded-xl border border-border/60 bg-background/40 backdrop-blur p-5 flex items-start gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gold/10 text-gold border border-gold/30">
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-medium">{s.t}</div>
                <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Path */}
      <section className="container-page py-16 md:py-20 border-t border-border/60 mt-10">
        <div className="grid gap-12 lg:grid-cols-2 items-start">
          <div>
            <div className="eyebrow">The residency path</div>
            <h2 className="mt-2 text-display text-3xl md:text-4xl">
              Lifestyle-first, legally serious.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Share B&amp;B matches you with homes that fit your life, then routes you to
              independent Cypriot lawyers and immigration specialists — because residency and
              personal-use outcomes depend on official requirements and professional review.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/matchmaker"
                className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-gold to-gold-foreground text-background px-5 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Sparkles className="h-4 w-4" /> Start AI Matchmaker
              </Link>
              <Link
                to="/how-it-works"
                className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-medium hover:bg-background/40 transition-colors"
              >
                How Share B&B works
              </Link>
            </div>
          </div>

          <ol className="space-y-4">
            {steps.map((s, i) => (
              <li
                key={s.t}
                className="rounded-xl border border-border/60 bg-background/40 backdrop-blur p-5 flex gap-4"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-gold/40 bg-gold/10 text-gold font-medium">
                  {i + 1}
                </div>
                <div>
                  <div className="font-medium">{s.t}</div>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Checklist */}
      <section className="container-page pb-20">
        <div className="rounded-2xl border border-border/60 bg-background/40 backdrop-blur p-8 md:p-10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-gold" />
            <h3 className="text-xl text-display">Legal & immigration review — always required</h3>
          </div>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {checklist.map((c) => (
              <li key={c} className="flex gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5 text-gold/70" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <Disclaimer />
        </div>
        <p className="mt-4 text-xs text-muted-foreground/80 leading-relaxed max-w-3xl">
          Residency eligibility, tax outcomes, and immigration status are determined by
          Cyprus authorities and depend on each person's situation. Share B&amp;B does not
          provide immigration, legal, or tax advice. Please speak with licensed legal and
          immigration professionals before making decisions.
        </p>
      </section>
    </div>
  );
}
