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

        {/* ── Tabbed views ── */}
        <PropertyTabs
          fullPrice={p.fullPrice}
          pct={pct}
          city={p.city}
          type={p.type}
          monthlyBase={p.monthlyCosts}
        />

        <div className="my-10">
          <Disclaimer />
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */

function PropertyTabs({
  fullPrice, pct, city, type, monthlyBase,
}: {
  fullPrice: number;
  pct: number;
  city: string;
  type: string;
  monthlyBase: number;
}) {
  const [tab, setTab] = useState<"invest" | "residency">("invest");

  return (
    <div className="mt-10 rounded-2xl border border-border bg-card overflow-hidden shadow-elegant">
      {/* Warning banner */}
      <div className="flex items-start gap-3 border-b border-border bg-[color:var(--gold)]/8 px-6 py-4">
        <AlertTriangle className="h-5 w-5 text-[color:var(--gold)] mt-0.5 shrink-0" />
        <p className="text-xs md:text-sm leading-relaxed text-foreground/80">
          <span className="font-medium text-foreground">Important.</span>{" "}
          Share B&amp;B is a marketplace and matching platform. It does not provide legal,
          financial, tax, or immigration advice. Residency eligibility and investment
          outcomes depend on official requirements and professional review.
        </p>
      </div>

      {/* Tab bar */}
      <div className="px-4 md:px-6 pt-5">
        <div
          role="tablist"
          aria-label="Property views"
          className="inline-flex rounded-full border border-border bg-secondary/60 p-1"
        >
          <TabBtn
            active={tab === "invest"}
            onClick={() => setTab("invest")}
            icon={<TrendingUp className="h-4 w-4" />}
            label="Investment View"
          />
          <TabBtn
            active={tab === "residency"}
            onClick={() => setTab("residency")}
            icon={<HomeIcon className="h-4 w-4" />}
            label="Residency & Personal Use"
          />
        </div>
      </div>

      <div key={tab} className="p-5 md:p-8 animate-fade-in">
        {tab === "invest" ? (
          <InvestmentView fullPrice={fullPrice} pct={pct} monthlyBase={monthlyBase} city={city} />
        ) : (
          <ResidencyView fullPrice={fullPrice} pct={pct} monthlyBase={monthlyBase} type={type} />
        )}
      </div>
    </div>
  );
}

function TabBtn({
  active, onClick, icon, label,
}: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all " +
        (active
          ? "text-[color:var(--gold-foreground)] shadow-sm"
          : "text-muted-foreground hover:text-foreground")
      }
      style={active ? { background: "var(--gradient-gold)" } : undefined}
    >
      {icon}
      {label}
    </button>
  );
}

/* ── Investment View ── */
function InvestmentView({
  fullPrice, pct, monthlyBase, city,
}: { fullPrice: number; pct: number; monthlyBase: number; city: string }) {
  const [customPct, setCustomPct] = useState(pct);
  const [occupancy, setOccupancy] = useState(city === "Limassol" ? 78 : city === "Paphos" ? 72 : 64);

  const calc = useMemo(() => {
    const share = Math.round((fullPrice * customPct) / 100);
    const grossYieldPct = ["Limassol", "Paphos", "Larnaca", "Ayia Napa"].includes(city) ? 5.8 : 4.6;
    const yearlyRentalFull = Math.round((fullPrice * grossYieldPct * (occupancy / 100)) / 100);
    const yearlyRentalShare = Math.round((yearlyRentalFull * customPct) / 100);
    const yearlyExpensesShare = Math.round((monthlyBase * 12 * customPct) / 100);
    const mgmtFee = Math.round(yearlyRentalShare * 0.12);
    const netAnnual = yearlyRentalShare - mgmtFee - Math.round(yearlyExpensesShare * 0.35);
    return { share, grossYieldPct, yearlyRentalShare, yearlyExpensesShare, mgmtFee, netAnnual };
  }, [fullPrice, customPct, monthlyBase, occupancy, city]);

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Calculator */}
      <div className="lg:col-span-3 rounded-xl border border-border bg-secondary/30 p-5 md:p-6">
        <SectionHead icon={<Calculator className="h-4 w-4" />} title="Share price calculator" />
        <div className="mt-4 space-y-5">
          <SliderRow
            label="Ownership share"
            value={customPct}
            unit="%"
            min={5}
            max={100}
            step={2.5}
            onChange={setCustomPct}
          />
          <SliderRow
            label="Occupancy assumption"
            value={occupancy}
            unit="%"
            min={30}
            max={95}
            step={1}
            onChange={setOccupancy}
          />
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <BigKV k="Share price" v={formatEUR(calc.share)} highlight />
          <BigKV k="Est. annual income" v={formatEUR(calc.yearlyRentalShare)} />
          <BigKV k="Est. yearly expenses" v={formatEUR(calc.yearlyExpensesShare)} />
          <BigKV k="Est. net (after fees)" v={formatEUR(calc.netAnnual)} />
        </div>
        <div className="mt-3 text-[11px] text-muted-foreground italic">
          Illustrative only. Based on {calc.grossYieldPct}% gross yield · 12% management fee ·
          co-owner share of costs. Not a forecast.
        </div>
      </div>

      {/* Right column: assumptions & rules */}
      <div className="lg:col-span-2 space-y-4">
        <InfoBlock icon={<Gauge className="h-4 w-4" />} title="Occupancy assumptions">
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
            <li>· Trailing 12-month market signals in {city}</li>
            <li>· Short + medium-term stays blended</li>
            <li>· Seasonality smoothed across the year</li>
          </ul>
        </InfoBlock>
        <InfoBlock icon={<Repeat className="h-4 w-4" />} title="Potential resale options">
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
            <li>· Sell share to existing co-owners (first refusal)</li>
            <li>· Relist on Share B&amp;B secondary marketplace</li>
            <li>· Group exit if all owners agree to sell the property</li>
          </ul>
        </InfoBlock>
        <InfoBlock icon={<Users className="h-4 w-4" />} title="Co-owner management rules">
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
            <li>· Majority-of-shares vote for major decisions</li>
            <li>· Annual budget reviewed and approved together</li>
            <li>· Independent property manager appointed by the group</li>
          </ul>
        </InfoBlock>
      </div>

      {/* Risk disclaimer */}
      <div className="lg:col-span-5 flex items-start gap-3 rounded-xl border border-border bg-background p-4">
        <AlertTriangle className="h-4 w-4 mt-0.5 text-[color:var(--gold)] shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-medium text-foreground">Risk disclaimer.</span>{" "}
          Property values and rental income can fall as well as rise. Occupancy, fees, taxes,
          and maintenance costs vary. Past performance does not predict future returns.
          Consult a licensed financial and tax advisor before committing capital.
        </p>
      </div>
    </div>
  );
}

/* ── Residency View ── */
function ResidencyView({
  fullPrice, pct, monthlyBase, type,
}: { fullPrice: number; pct: number; monthlyBase: number; type: string }) {
  const share = Math.round((fullPrice * pct) / 100);
  const monthlyShare = Math.round((monthlyBase * pct) / 100);
  const utilities = Math.round(180 * (pct / 100) + 90);
  const livingTotal = monthlyShare + utilities + 220; // groceries baseline

  const amenities = [
    { icon: Waves, label: "Sandy beach", d: "0.5 km" },
    { icon: School, label: "Int'l school", d: "1.6 km" },
    { icon: Utensils, label: "Restaurants", d: "3 min walk" },
    { icon: ShoppingBag, label: "Supermarket", d: "600 m" },
  ];

  const checklist = [
    "Independent Cypriot lawyer engaged before signing",
    "Title deed & Land Registry search completed",
    "Co-ownership agreement reviewed line by line",
    "Immigration status reviewed by a licensed specialist",
    "Tax residency implications reviewed in your home country",
    "Bank escrow account confirmed before any transfer",
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Lifestyle + amenities + calendar */}
      <div className="lg:col-span-3 space-y-5">
        <InfoBlock icon={<HomeIcon className="h-4 w-4" />} title="Lifestyle benefits">
          <ul className="mt-2 grid gap-1.5 text-sm text-muted-foreground sm:grid-cols-2">
            <li>· Coastal Mediterranean climate year-round</li>
            <li>· English widely spoken, EU legal framework</li>
            <li>· Walkable neighbourhood, sea breeze evenings</li>
            <li>· Ideal as holiday, retirement or nomad base</li>
          </ul>
        </InfoBlock>

        <InfoBlock icon={<MapPin className="h-4 w-4" />} title="Nearby amenities">
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {amenities.map((a) => (
              <div key={a.label} className="rounded-lg border border-border bg-background p-3">
                <a.icon className="h-4 w-4 text-[color:var(--gold)]" />
                <div className="mt-2 text-sm font-medium">{a.label}</div>
                <div className="text-xs text-muted-foreground">{a.d}</div>
              </div>
            ))}
          </div>
        </InfoBlock>

        <InfoBlock icon={<CalendarDays className="h-4 w-4" />} title="Personal-use calendar concept">
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Your {pct}% share entitles you to approximately{" "}
            <span className="font-medium text-foreground">
              {Math.round((365 * pct) / 100)} personal-use days per year
            </span>
            , booked through a rotating in-app calendar with fair peak/off-peak balancing.
          </p>
          <div className="mt-3 flex gap-1">
            {Array.from({ length: 12 }).map((_, i) => {
              const filled = i < Math.round((12 * pct) / 100);
              return (
                <div
                  key={i}
                  className="h-8 flex-1 rounded"
                  style={{
                    background: filled
                      ? "var(--gradient-gold)"
                      : "color-mix(in oklab, var(--border) 70%, transparent)",
                  }}
                  title={filled ? "Your months" : "Co-owner / rental"}
                />
              );
            })}
          </div>
        </InfoBlock>
      </div>

      {/* Living costs + eligibility + checklist */}
      <div className="lg:col-span-2 space-y-4">
        <InfoBlock icon={<Wallet className="h-4 w-4" />} title="Est. monthly living costs">
          <div className="mt-3 space-y-2 text-sm">
            <Row k={`${type} — your share of costs`} v={formatEUR(monthlyShare)} />
            <Row k="Utilities & internet" v={formatEUR(utilities)} />
            <Row k="Groceries (household)" v={formatEUR(220)} />
            <div className="flex justify-between border-t border-border pt-2 mt-2 text-base font-medium">
              <span>Est. total / month</span>
              <span className="text-[color:var(--gold)]">{formatEUR(livingTotal)}</span>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground italic">
            Illustrative baseline — actual costs vary by household and season.
          </p>
        </InfoBlock>

        <InfoBlock icon={<Stamp className="h-4 w-4" />} title="Residency eligibility reminder">
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Owning a property share of{" "}
            <span className="font-medium text-foreground">{formatEUR(share)}</span> does{" "}
            <span className="font-medium text-foreground">not</span> automatically qualify
            you for Cypriot residency. Programmes such as the Cyprus Permanent Residency
            scheme have their own thresholds, ownership and source-of-funds requirements.
          </p>
        </InfoBlock>

        <InfoBlock icon={<ScrollText className="h-4 w-4" />} title="Legal & immigration checklist">
          <ul className="mt-2 space-y-2 text-sm">
            {checklist.map((c) => (
              <li key={c} className="flex items-start gap-2 text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 mt-0.5 text-[color:var(--gold)] shrink-0" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </InfoBlock>
      </div>
    </div>
  );
}

/* ── Shared UI ── */
function SectionHead({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[color:var(--gold)]">
      {icon}
      {title}
    </div>
  );
}

function InfoBlock({
  icon, title, children,
}: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-secondary/30 p-5">
      <SectionHead icon={icon} title={title} />
      {children}
    </div>
  );
}

function BigKV({ k, v, highlight = false }: { k: string; v: string; highlight?: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-background p-3">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">{k}</div>
      <div
        className={
          "mt-1 font-serif text-xl tabular-nums " +
          (highlight ? "text-[color:var(--gold)]" : "")
        }
      >
        {v}
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{k}</span>
      <span className="tabular-nums">{v}</span>
    </div>
  );
}

function SliderRow({
  label, value, unit, min, max, step, onChange,
}: {
  label: string; value: number; unit: string;
  min: number; max: number; step: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="block">
      <div className="flex justify-between text-xs font-mono uppercase tracking-widest text-muted-foreground">
        <span>{label}</span>
        <span className="text-foreground">{value}{unit}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[color:var(--gold)]"
      />
    </label>
  );
}
