import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Sparkles, Users, ScrollText, ArrowRight, MapPin } from "lucide-react";
import heroImg from "@/assets/hero-villa.jpg";
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
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Luxury Cyprus villa at sunset"
            width={1920}
            height={1200}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-primary/20" />
        </div>
        <div className="relative container-page py-24 md:py-36 text-primary-foreground">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs text-gold">
              <Sparkles className="h-3.5 w-3.5" /> AI-powered co-ownership
            </div>
            <h1 className="mt-5 font-serif text-4xl md:text-6xl leading-tight">
              Own a share of your dream home in Cyprus.
            </h1>
            <p className="mt-5 text-lg text-primary-foreground/80 max-w-xl">
              Share B&amp;B connects verified buyers who want to co-own villas, apartments and
              townhouses across Cyprus — with lawyers, due diligence and title deed checks
              built into every listing.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/browse"
                className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-3 text-sm font-medium text-gold-foreground hover:opacity-90"
              >
                Browse properties <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/matchmaker"
                className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/40 px-5 py-3 text-sm font-medium hover:bg-primary-foreground/10"
              >
                Try the AI Matchmaker
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                ["120+", "Verified listings"],
                ["5", "Cyprus regions"],
                ["10%", "Minimum share"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="font-serif text-3xl text-gold">{n}</div>
                  <div className="text-xs text-primary-foreground/70 mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container-page py-20">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <div className="text-xs uppercase tracking-widest text-gold">Featured</div>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">Handpicked shares this week</h2>
          </div>
          <Link
            to="/browse"
            className="text-sm text-primary hover:underline inline-flex items-center gap-1"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PropertyCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      {/* How it works quick */}
      <section className="bg-secondary/50 border-y border-border">
        <div className="container-page py-20">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-widest text-gold">How it works</div>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">
              Co-ownership, made trustworthy.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              { icon: Sparkles, t: "Get matched", d: "Answer a short questionnaire and let our AI suggest properties and compatible co-buyers." },
              { icon: Users, t: "Meet co-buyers", d: "Review compatibility scores, use cases and budgets before you commit." },
              { icon: ShieldCheck, t: "Legal & due diligence", d: "Vetted Cypriot lawyers handle title deed checks and contracts on every deal." },
              { icon: ScrollText, t: "Own your share", d: "Sign digitally, receive your ownership certificate, and enjoy your home." },
            ].map((s) => (
              <div key={s.t} className="rounded-xl bg-card border border-border p-6">
                <div className="grid h-11 w-11 place-items-center rounded-md bg-primary text-primary-foreground">
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="mt-4 font-serif text-lg">{s.t}</div>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regions */}
      <section className="container-page py-20">
        <div className="text-xs uppercase tracking-widest text-gold">Regions</div>
        <h2 className="mt-2 font-serif text-3xl md:text-4xl">Cyprus, from coast to old town.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-5 sm:grid-cols-2">
          {["Limassol", "Paphos", "Larnaca", "Nicosia", "Ayia Napa"].map((c) => (
            <Link
              key={c}
              to="/browse"
              className="group flex items-center justify-between rounded-xl border border-border bg-card p-5 hover:border-gold/60 transition-colors"
            >
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold" />
                <span className="font-medium">{c}</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </Link>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="container-page pb-20">
        <div className="rounded-2xl border border-border bg-card p-8 md:p-12 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-gold">Trust & safety</div>
            <h2 className="mt-2 font-serif text-3xl">Every property, professionally vetted.</h2>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3"><ShieldCheck className="h-5 w-5 text-gold shrink-0" /> Independent Cypriot lawyers on every deal.</li>
              <li className="flex gap-3"><ShieldCheck className="h-5 w-5 text-gold shrink-0" /> Full title deed and encumbrance checks.</li>
              <li className="flex gap-3"><ShieldCheck className="h-5 w-5 text-gold shrink-0" /> Verified buyer identity and source of funds.</li>
              <li className="flex gap-3"><ShieldCheck className="h-5 w-5 text-gold shrink-0" /> Escrow-secured payments and digital signing.</li>
            </ul>
            <div className="mt-6 text-sm">
              Sample share purchase from <span className="text-primary font-medium">{formatEUR(62_000)}</span>.
            </div>
          </div>
          <Disclaimer />
        </div>
      </section>
    </div>
  );
}
