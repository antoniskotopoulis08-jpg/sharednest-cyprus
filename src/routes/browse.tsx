import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { properties, cities, propertyTypes, uses, formatEUR } from "@/lib/properties";
import { LuxeShareCard, propertyToLuxe } from "@/components/luxe-share-card";
import { Search } from "lucide-react";

export const Route = createFileRoute("/browse")({
  head: () => ({
    meta: [
      { title: "Browse co-ownership properties in Cyprus — Share B&B" },
      { name: "description", content: "Search verified villas, apartments and townhouses for shared ownership across Limassol, Paphos, Larnaca, Nicosia and Ayia Napa." },
      { property: "og:title", content: "Browse co-ownership properties in Cyprus" },
      { property: "og:description", content: "Search verified shared-ownership properties across Cyprus." },
    ],
  }),
  component: Browse,
});

function Browse() {
  const [city, setCity] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [use, setUse] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number>(3_000_000);
  const [minShare, setMinShare] = useState<number>(5);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (city && p.city !== city) return false;
      if (type && p.type !== type) return false;
      if (use && p.expectedUse !== use) return false;
      if (p.fullPrice > maxPrice) return false;
      if (p.minSharePct > minShare + 20) return false;
      return true;
    });
  }, [city, type, use, maxPrice, minShare]);

  return (
    <div className="container-page py-12 md:py-16">
      <div className="max-w-2xl">
        <div className="text-xs uppercase tracking-widest text-gold">Browse</div>
        <h1 className="mt-2 font-serif text-4xl">Find your share of Cyprus.</h1>
        <p className="mt-3 text-muted-foreground">
          Filter verified listings by city, price, property type and how you plan to use the home.
        </p>
      </div>

      {/* Filters */}
      <div className="mt-8 rounded-xl border border-border bg-card p-5 grid gap-4 md:grid-cols-6">
        <Field label="City">
          <select value={city} onChange={(e) => setCity(e.target.value)} className={inputCls}>
            <option value="">All cities</option>
            {cities.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Type">
          <select value={type} onChange={(e) => setType(e.target.value)} className={inputCls}>
            <option value="">Any type</option>
            {propertyTypes.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Expected use">
          <select value={use} onChange={(e) => setUse(e.target.value)} className={inputCls}>
            <option value="">Any use</option>
            {uses.map((u) => <option key={u}>{u}</option>)}
          </select>
        </Field>
        <Field label={`Max price · ${formatEUR(maxPrice)}`}>
          <input type="range" min={300_000} max={3_000_000} step={50_000} value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-[color:var(--gold)]" />
        </Field>
        <Field label={`Min share · ${minShare}%`}>
          <input type="range" min={5} max={50} step={5} value={minShare}
            onChange={(e) => setMinShare(Number(e.target.value))} className="w-full accent-[color:var(--gold)]" />
        </Field>
        <div className="flex items-end">
          <div className="inline-flex items-center gap-2 rounded-md bg-primary/5 text-primary px-3 py-2 text-sm w-full justify-center">
            <Search className="h-4 w-4" /> {filtered.length} results
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => <LuxeShareCard key={p.id} data={propertyToLuxe(p)} />)}
      </div>
      {filtered.length === 0 && (
        <div className="mt-16 text-center text-muted-foreground">
          No properties match those filters. Try widening your search.
        </div>
      )}
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
