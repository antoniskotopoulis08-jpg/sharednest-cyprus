import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Sparkles, ScrollText, ArrowRight, MapPin, Waves } from "lucide-react";
import heroImg from "@/assets/hero-villa.jpg";
import limassolImg from "@/assets/prop-limassol.jpg";
import { properties, formatEUR } from "@/lib/properties";
import { PropertyCard } from "@/components/property-card";
import { Disclaimer } from "@/components/disclaimer";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const featured = properties.slice(0, 3);
  return (
    <div>
      {/* HERO — editorial split with layered glass panel */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Cyprus villa at sunset"
            width={1920}
            height={1200}
            className="h-full w-full object-cover"
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
                A vetted marketplace where property owners and verified buyers meet — with
                Cypriot lawyers, title deed checks and escrow built into every deal.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  to="/browse"
                  className="group inline-flex items-center gap-2 rounded-sm bg-gold px-6 py-3.5 text-sm font-medium text-gold-foreground hover:opacity-90 transition-all"
                  style={{ background: "var(--gradient-gold)" }}
                >
                  Browse properties
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/matchmaker"
                  className="inline-flex items-center gap-2 rounded-sm border border-primary-foreground/25 px-6 py-3.5 text-sm font-medium hover:bg-primary-foreground/5 transition-colors"
                >
                  AI Matchmaker
                </Link>
              </div>
            </div>

            {/* Floating glass stat card */}
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
                    <div className="font-serif text-2xl text-gold">
                      {formatEUR(240_000)}
                    </div>
                  </div>
                </div>
                <div className="mt-5 pt-5 border-t border-white/10 grid grid-cols-3 gap-3 text-center">
                  {[
                    ["120+", "Listings"],
                    ["5", "Regions"],
                    ["10%", "Min share"],
                  ].map(([n, l]) => (
                    <div key={l}>
                      <div className="font-serif text-xl text-gold">{n}</div>
                      <div className="text-[10px] uppercase tracking-widest opacity-60 mt-1">
                        {l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ticker */}
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

      {/* EDITORIAL INTRO */}
      <section className="container-page py-24">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="eyebrow">01 — Marketplace</div>
            <h2 className="mt-4 text-display text-4xl md:text-5xl">
              A boutique way to hold Cyprus real estate.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 space-y-6 text-foreground/75 text-lg leading-relaxed">
            <p>
              Share B&amp;B connects owners who want to release part of their property's value
              with buyers who want a real, deeded share — not a token, not a fund.
            </p>
            <p className="text-base text-muted-foreground">
              Every listing goes through independent Cypriot lawyers, land registry searches
              and escrow. Our AI helps you find a home and co-owners you can trust for the
              long term.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED — magazine style */}
      <section className="container-page pb-24">
        <div className="flex items-end justify-between gap-4 flex-wrap mb-10">
          <div>
            <div className="eyebrow">02 — This week</div>
            <h2 className="mt-3 text-display text-4xl md:text-5xl">Handpicked shares.</h2>
          </div>
          <Link
            to="/browse"
            className="text-sm inline-flex items-center gap-2 border-b border-foreground/30 pb-1 hover:border-gold transition-colors"
          >
            View all listings <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <div
              key={p.id}
              className="animate-reveal"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <PropertyCard p={p} />
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS — timeline with numbers */}
      <section className="relative border-y border-border bg-secondary/40 overflow-hidden">
        <div className="absolute inset-0 map-grain opacity-60" />
        <div className="relative container-page py-24">
          <div className="max-w-2xl">
            <div className="eyebrow">03 — Process</div>
            <h2 className="mt-3 text-display text-4xl md:text-5xl">
              Co-ownership, made trustworthy.
            </h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-4">
            {[
              { n: "01", t: "Get matched", d: "Answer a short questionnaire; AI proposes homes and compatible co-buyers." },
              { n: "02", t: "Meet co-buyers", d: "Review compatibility scores, use cases and budgets before you commit." },
              { n: "03", t: "Legal & DD", d: "Cypriot lawyers handle title deed and encumbrance checks on every deal." },
              { n: "04", t: "Own your share", d: "Sign digitally, funds move through escrow, and your share is registered." },
            ].map((s) => (
              <div key={s.n} className="group">
                <div className="flex items-baseline gap-4">
                  <div className="font-mono text-sm text-gold">{s.n}</div>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="mt-5 font-serif text-2xl">{s.t}</div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGIONS */}
      <section className="container-page py-24">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-10">
          <div className="lg:col-span-6">
            <div className="eyebrow">04 — Regions</div>
            <h2 className="mt-3 text-display text-4xl md:text-5xl">
              Cyprus, coast to old town.
            </h2>
          </div>
          <p className="lg:col-span-5 lg:col-start-8 text-muted-foreground">
            From the marina in Limassol to the sandstone courtyards of old Nicosia — pick a
            region and we'll surface the shares available today.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-5 sm:grid-cols-2">
          {[
            ["Limassol", "Seafront & marina"],
            ["Paphos", "Stone villas"],
            ["Larnaca", "Marina & airport"],
            ["Nicosia", "Old town"],
            ["Ayia Napa", "Turquoise bays"],
          ].map(([c, sub]) => (
            <Link
              key={c}
              to="/browse"
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 hover-lift"
            >
              <div className="flex items-center gap-2 text-xs text-gold">
                <MapPin className="h-3.5 w-3.5" />
                <span className="font-mono tracking-widest uppercase">CY</span>
              </div>
              <div className="mt-6 font-serif text-2xl">{c}</div>
              <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
              <ArrowRight className="absolute bottom-5 right-5 h-4 w-4 text-muted-foreground group-hover:text-gold group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </section>

      {/* TRUST */}
      <section className="container-page pb-24">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-primary text-primary-foreground p-8 md:p-14 grid gap-10 lg:grid-cols-12">
          <div
            className="absolute inset-0 opacity-30"
            style={{ background: "var(--gradient-hero)" }}
          />
          <div className="relative lg:col-span-7">
            <div className="eyebrow" style={{ color: "oklch(0.85 0.13 82)" }}>
              05 — Trust & safety
            </div>
            <h2 className="mt-3 text-display text-4xl md:text-5xl">
              Every property, professionally vetted.
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Independent Cypriot lawyers on every deal",
                "Land Registry & encumbrance searches",
                "Verified identity & source-of-funds",
                "Escrow-secured payments & digital signing",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-sm">
                  <ShieldCheck className="h-5 w-5 text-gold shrink-0" />
                  <span className="opacity-90">{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/how-it-works"
                className="inline-flex items-center gap-2 rounded-sm border border-primary-foreground/25 px-5 py-3 text-sm hover:bg-primary-foreground/5"
              >
                <ScrollText className="h-4 w-4" /> How it works
              </Link>
              <Link
                to="/matchmaker"
                className="inline-flex items-center gap-2 rounded-sm px-5 py-3 text-sm text-gold-foreground"
                style={{ background: "var(--gradient-gold)" }}
              >
                <Sparkles className="h-4 w-4" /> Start matching
              </Link>
            </div>
          </div>
          <div className="relative lg:col-span-5">
            <Disclaimer className="!bg-white/5 !border-white/10 !text-primary-foreground/80" />
          </div>
        </div>
      </section>
    </div>
  );
}
