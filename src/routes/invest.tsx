import { createFileRoute, Link } from "@tanstack/react-router";
import {
  TrendingUp,
  Coins,
  BarChart3,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Building2,
  LineChart,
  Handshake,
} from "lucide-react";
import { Disclaimer } from "@/components/disclaimer";

export const Route = createFileRoute("/invest")({
  head: () => ({
    meta: [
      { title: "Invest in Cyprus property shares | SharedNest" },
      {
        name: "description",
        content:
          "Buy a fractional share of a Cyprus property and access rental-income potential and long-term exposure — with transparent costs and AI-powered matching.",
      },
      { property: "og:title", content: "Invest in Cyprus property shares | SharedNest" },
      {
        property: "og:description",
        content:
          "Lower entry, professional management, transparent costs. Explore investment-focused shares across Limassol, Paphos, Larnaca and more.",
      },
    ],
  }),
  component: InvestPage,
});

const highlights = [
  {
    icon: Coins,
    t: "Lower entry cost",
    d: "Enter Cyprus real estate from a share of a property, not the full price tag.",
  },
  {
    icon: LineChart,
    t: "Rental income potential",
    d: "Professionally managed short and mid-term rentals with transparent occupancy assumptions.",
  },
  {
    icon: BarChart3,
    t: "Long-term exposure",
    d: "Participate in Mediterranean property cycles with a defined resale horizon.",
  },
  {
    icon: ShieldCheck,
    t: "Verified & structured",
    d: "Independent Cypriot lawyers, title-deed checks and a written co-ownership agreement on every deal.",
  },
];

const steps = [
  { t: "Set your budget & goals", d: "Tell us your target share size, return profile and risk tolerance." },
  { t: "Get AI-matched properties", d: "Curated listings across Cyprus that fit your investment lens." },
  { t: "Review numbers transparently", d: "Rental estimates, expenses, management fees and net yield — all shown per share." },
  { t: "Complete via escrow", d: "Funds move through regulated escrow; your share is registered on title." },
];

function InvestPage() {
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
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/45 bg-gold/10 px-3 py-1 text-xs font-medium tracking-wide text-gold">
              <TrendingUp className="h-3.5 w-3.5 text-gold" />
              For investors
            </div>
            <h1 className="mt-5 text-display text-4xl md:text-6xl leading-[1.05]">
              Invest in Cyprus property, <span className="text-gold">one share at a time.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Access rental income potential, long-term property exposure and a lower entry cost
              than buying an entire home — with transparent costs and AI-powered matching.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/browse"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Browse investment shares <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/calculator"
                className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-medium hover:bg-background/40 transition-colors"
              >
                Run the investor calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="container-page py-16 md:py-20">
        <div className="max-w-2xl">
          <div className="eyebrow">Why co-invest</div>
          <h2 className="mt-2 text-display text-3xl md:text-4xl">
            Institutional-grade thinking, at a share-sized price.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <div
              key={h.t}
              className="group rounded-2xl border border-border/60 bg-background/40 backdrop-blur p-6 transition-all duration-300 hover:border-gold/50 hover:-translate-y-1"
            >
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-gold/10 text-gold border border-gold/30">
                <h.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-medium">{h.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{h.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How the investment path works */}
      <section className="container-page py-16 md:py-20 border-t border-border/60">
        <div className="grid gap-12 lg:grid-cols-2 items-start">
          <div>
            <div className="eyebrow">The investor path</div>
            <h2 className="mt-2 text-display text-3xl md:text-4xl">
              From budget to registered share, transparently.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Every number is spelled out per share — rental estimates, expenses, management fees
              and net yield. No packaged funds, no pooled capital, no securities.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/matchmaker"
                className="inline-flex items-center gap-2 rounded-md bg-gold text-gold-foreground px-5 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Sparkles className="h-4 w-4" /> Start AI Matchmaker
              </Link>
              <Link
                to="/how-it-works"
                className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-medium hover:bg-background/40 transition-colors"
              >
                How SharedNest works
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

      {/* CTA + disclaimer */}
      <section className="container-page pb-20">
        <div className="rounded-2xl border border-border/60 bg-background/40 backdrop-blur p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 justify-between">
          <div className="flex items-start gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-gold/10 text-gold border border-gold/30">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl text-display">Ready to see investor-graded listings?</h3>
              <p className="mt-1 text-sm text-muted-foreground max-w-xl">
                Filter properties tagged <span className="text-foreground">Best for Investment</span>{" "}
                or <span className="text-foreground">Hybrid Opportunity</span>.
              </p>
            </div>
          </div>
          <Link
            to="/browse"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors self-start md:self-auto"
          >
            <Handshake className="h-4 w-4" /> Browse now
          </Link>
        </div>

        <div className="mt-6">
          <Disclaimer />
        </div>
        <p className="mt-4 text-xs text-muted-foreground/80 leading-relaxed max-w-3xl">
          All figures shown are estimated rental potential and illustrative costs for
          informational purposes only. Investment outcomes depend on market conditions,
          occupancy, fees, and resale timing. Please speak with licensed financial, tax,
          and legal professionals before making decisions.
        </p>
      </section>
    </div>
  );
}
