import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { properties, formatEUR } from "@/lib/properties";
import {
  BedDouble, Bath, Ruler, MapPin, ShieldCheck, ArrowRight,
  TrendingUp, Home as HomeIcon, AlertTriangle, Calculator, Gauge,
  Repeat, Users, Waves, School, ShoppingBag, Utensils, CalendarDays,
  Wallet, Stamp, CheckCircle2, ScrollText,
} from "lucide-react";
import { Disclaimer } from "@/components/disclaimer";

export const Route = createFileRoute("/property/$id")({
  loader: ({ params }) => {
    const p = properties.find((x) => x.id === params.id);
    if (!p) throw notFound();
    return { property: p };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Property not found — Share B&B" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.property;
    return {
      meta: [
        { title: `${p.title}, ${p.city} — Share B&B` },
        { name: "description", content: `Co-own ${p.title} in ${p.city}, Cyprus. From ${formatEUR(Math.round(p.fullPrice * p.minSharePct / 100))} for a ${p.minSharePct}% share.` },
        { property: "og:title", content: `${p.title}, ${p.city}` },
        { property: "og:description", content: p.description },
        { property: "og:image", content: p.image },
        { name: "twitter:image", content: p.image },
      ],
    };
  },
  component: PropertyDetail,
  notFoundComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="font-serif text-3xl">Property not found</h1>
      <p className="mt-3 text-muted-foreground">This listing is no longer available.</p>
      <Link to="/browse" className="mt-6 inline-block text-primary hover:underline">Browse other properties</Link>
    </div>
  ),
});

function PropertyDetail() {
  const { property: p } = Route.useLoaderData();
  const [pct, setPct] = useState<number>(p.minSharePct);
  const sharePrice = Math.round((p.fullPrice * pct) / 100);
  const monthly = Math.round((p.monthlyCosts * pct) / 100);

  return (
    <div>
      <div className="relative h-[52vh] min-h-[380px] overflow-hidden">
        <img src={p.image} alt={p.title} className="h-full w-full object-cover" width={1920} height={1200} />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>
      <div className="container-page -mt-24 relative">
        <div className="rounded-2xl bg-card border border-border p-6 md:p-10 shadow-elegant">
          <div className="flex flex-wrap gap-6 items-start justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-gold" /> {p.city}, Cyprus · {p.type}
              </div>
              <h1 className="mt-2 font-serif text-4xl">{p.title}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><BedDouble className="h-4 w-4" /> {p.bedrooms} bedrooms</span>
                <span className="flex items-center gap-1.5"><Bath className="h-4 w-4" /> {p.bathrooms} bathrooms</span>
                <span className="flex items-center gap-1.5"><Ruler className="h-4 w-4" /> {p.sizeSqm} m²</span>
              </div>
              <p className="mt-6 max-w-2xl text-foreground/80 leading-relaxed">{p.description}</p>
            </div>
            <div className="w-full md:w-[340px] shrink-0 rounded-xl border border-border bg-secondary/40 p-5">
              <div className="text-xs text-muted-foreground">Full property value</div>
              <div className="font-serif text-2xl">{formatEUR(p.fullPrice)}</div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Your share</span>
                  <span className="font-medium">{pct}%</span>
                </div>
                <input
                  type="range" min={p.minSharePct} max={p.availableSharePct} step={5}
                  value={pct} onChange={(e) => setPct(Number(e.target.value))}
                  className="w-full mt-2 accent-[color:var(--gold)]"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>min {p.minSharePct}%</span><span>up to {p.availableSharePct}%</span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-xs text-muted-foreground">Share price</div>
                  <div className="font-medium text-primary">{formatEUR(sharePrice)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Monthly costs</div>
                  <div className="font-medium">{formatEUR(monthly)}</div>
                </div>
              </div>
              <button className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Request to co-buy <ArrowRight className="h-4 w-4" />
              </button>
              <Link to="/matchmaker" className="mt-2 block text-center text-xs text-muted-foreground hover:text-foreground">
                or find compatible co-buyers
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { t: "Title deed", d: "Verified clean title, no encumbrances." },
              { t: "Legal partner", d: "Handled by an independent Cypriot law firm." },
              { t: "Co-ownership", d: `${100 - p.availableSharePct}% held by existing owner(s).` },
            ].map((x) => (
              <div key={x.t} className="rounded-lg border border-border p-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <ShieldCheck className="h-4 w-4 text-gold" /> {x.t}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{x.d}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="my-10">
          <Disclaimer />
        </div>
      </div>
    </div>
  );
}
