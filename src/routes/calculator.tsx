import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  TrendingUp,
  Home,
  Info,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { CountUp } from "@/components/count-up";
import { Disclaimer } from "@/components/disclaimer";

export const Route = createFileRoute("/calculator")({
  component: CalculatorPage,
  head: () => ({
    meta: [
      { title: "Investment & Residency Calculator | SharedNest" },
      {
        name: "description",
        content:
          "Model your Cyprus co-ownership costs. Switch between an investment calculator and a residency / personal-use calculator with animated, transparent estimates.",
      },
      { property: "og:title", content: "Investment & Residency Calculator | SharedNest" },
      {
        property: "og:description",
        content:
          "Two calculators, one page. Explore share purchase cost, net income, personal-use value and monthly cost for Cyprus co-ownership.",
      },
    ],
  }),
});

type Mode = "invest" | "residency";

function CalculatorPage() {
  const [mode, setMode] = useState<Mode>("invest");

  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="relative container-page py-16 md:py-24">
        <div className="max-w-2xl mb-10">
          <div className="eyebrow">Calculators</div>
          <h1 className="mt-3 text-display text-4xl md:text-5xl">
            Model your Cyprus co-ownership, both ways.
          </h1>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Flip between an investor lens and a residency / personal-use lens. Every number is an
            estimate for planning — professional review is required before you commit.
          </p>
        </div>

        <ModeToggle mode={mode} setMode={setMode} />

        <div className="mt-10 transition-all duration-500">
          {mode === "invest" ? <InvestmentCalculator /> : <ResidencyCalculator />}
        </div>

        <div className="mt-10">
          <Disclaimer />
        </div>
      </div>
    </div>
  );
}

/* ---------- Mode toggle ---------- */

function ModeToggle({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  const base =
    "flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all duration-300";
  return (
    <div className="inline-flex w-full md:w-auto rounded-full border border-border/60 bg-background/40 p-1 backdrop-blur">
      <button
        type="button"
        onClick={() => setMode("invest")}
        className={`${base} ${
          mode === "invest"
            ? "bg-gradient-to-r from-gold to-gold-foreground text-background shadow-lg"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <TrendingUp className="h-4 w-4" />
        Investment Calculator
      </button>
      <button
        type="button"
        onClick={() => setMode("residency")}
        className={`${base} ${
          mode === "residency"
            ? "bg-gradient-to-r from-gold to-gold-foreground text-background shadow-lg"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Home className="h-4 w-4" />
        Residency / Personal Use
      </button>
    </div>
  );
}

/* ---------- Shared UI ---------- */

function Panel({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-background/40 backdrop-blur p-6 md:p-7">
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h3 className="mt-1 text-xl md:text-2xl text-display">{title}</h3>
      <div className="mt-6 space-y-5">{children}</div>
    </div>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
  hint?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-sm text-muted-foreground">{label}</label>
        <span className="text-sm font-medium tabular-nums text-foreground">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[color:var(--gold)]"
      />
      {hint && <p className="mt-1 text-xs text-muted-foreground/70">{hint}</p>}
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  accent = false,
}: {
  label: string;
  value: React.ReactNode;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-5 transition-all duration-300 ${
        accent
          ? "border-gold/50 bg-gradient-to-br from-gold/10 to-transparent shadow-[0_0_30px_-15px_var(--gold)]"
          : "border-border/60 bg-background/30"
      }`}
    >
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-2 text-2xl md:text-3xl text-display tabular-nums">{value}</div>
      {sub && <div className="mt-1 text-xs text-muted-foreground/80">{sub}</div>}
    </div>
  );
}

function eur(n: number) {
  return "€" + Math.round(n).toLocaleString();
}

function AnimatedEuro({ value }: { value: number }) {
  return <CountUp value={Math.max(0, Math.round(value))} format={(n) => "€" + n.toLocaleString()} />;
}

/* ---------- Investment Calculator ---------- */

function InvestmentCalculator() {
  const [price, setPrice] = useState(650_000);
  const [share, setShare] = useState(15);
  const [annualRental, setAnnualRental] = useState(48_000);
  const [annualExpenses, setAnnualExpenses] = useState(9_500);
  const [mgmtFee, setMgmtFee] = useState(12);
  const [occupancy, setOccupancy] = useState(72);
  const [horizon, setHorizon] = useState(7);

  const {
    sharePrice,
    grossPerShare,
    expensesPerShare,
    mgmtPerShare,
    netPerShare,
    yieldPct,
    riskTone,
    riskLabel,
    riskNote,
  } = useMemo(() => {
    const s = share / 100;
    const sharePrice = price * s;
    const effectiveRental = annualRental * (occupancy / 100);
    const gross = effectiveRental * s;
    const exp = annualExpenses * s;
    const mgmt = effectiveRental * (mgmtFee / 100) * s;
    const net = gross - exp - mgmt;
    const yieldPct = sharePrice > 0 ? (net / sharePrice) * 100 : 0;

    let riskTone = "text-emerald-400";
    let riskLabel = "Balanced";
    let riskNote =
      "Assumptions look plausible for a well-managed Cyprus rental. Small changes in occupancy still matter.";
    if (occupancy < 55 || yieldPct < 3) {
      riskTone = "text-amber-400";
      riskLabel = "Elevated";
      riskNote =
        "Low occupancy or thin net yield — resale timing and vacancy months will drive the outcome.";
    }
    if (occupancy < 40 || yieldPct < 1 || yieldPct < 0) {
      riskTone = "text-red-400";
      riskLabel = "High";
      riskNote =
        "Numbers are stretched. Stress-test with a licensed advisor before committing capital.";
    }

    return {
      sharePrice,
      grossPerShare: gross,
      expensesPerShare: exp,
      mgmtPerShare: mgmt,
      netPerShare: net,
      yieldPct,
      riskTone,
      riskLabel,
      riskNote,
    };
  }, [price, share, annualRental, annualExpenses, mgmtFee, occupancy]);

  const totalOverHorizon = netPerShare * horizon;

  return (
    <div className="grid gap-6 lg:grid-cols-5 animate-fade-in">
      <div className="lg:col-span-2">
        <Panel eyebrow="Inputs" title="Investment assumptions">
          <SliderRow
            label="Property price"
            value={price}
            min={150_000}
            max={3_000_000}
            step={10_000}
            onChange={setPrice}
            format={eur}
          />
          <SliderRow
            label="Ownership share"
            value={share}
            min={5}
            max={50}
            step={1}
            onChange={setShare}
            format={(v) => v + "%"}
          />
          <SliderRow
            label="Estimated annual rental income (100% property)"
            value={annualRental}
            min={0}
            max={250_000}
            step={1_000}
            onChange={setAnnualRental}
            format={eur}
          />
          <SliderRow
            label="Estimated annual expenses (100% property)"
            value={annualExpenses}
            min={0}
            max={60_000}
            step={500}
            onChange={setAnnualExpenses}
            format={eur}
            hint="Insurance, taxes, utilities, upkeep."
          />
          <SliderRow
            label="Management fee (% of rental)"
            value={mgmtFee}
            min={0}
            max={30}
            step={1}
            onChange={setMgmtFee}
            format={(v) => v + "%"}
          />
          <SliderRow
            label="Occupancy rate"
            value={occupancy}
            min={20}
            max={95}
            step={1}
            onChange={setOccupancy}
            format={(v) => v + "%"}
          />
          <SliderRow
            label="Expected resale horizon"
            value={horizon}
            min={1}
            max={15}
            step={1}
            onChange={setHorizon}
            format={(v) => v + (v === 1 ? " year" : " years")}
          />
        </Panel>
      </div>

      <div className="lg:col-span-3 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <StatCard
            label="Share purchase cost"
            value={<AnimatedEuro value={sharePrice} />}
            sub={`${share}% of ${eur(price)}`}
            accent
          />
          <StatCard
            label="Estimated net income / year"
            value={<AnimatedEuro value={netPerShare} />}
            sub={`Net yield ≈ ${yieldPct.toFixed(1)}%`}
            accent
          />
          <StatCard
            label="Gross income / share"
            value={<AnimatedEuro value={grossPerShare} />}
            sub={`After ${occupancy}% occupancy`}
          />
          <StatCard
            label="Expenses / share"
            value={<AnimatedEuro value={expensesPerShare + mgmtPerShare} />}
            sub={`Incl. ${mgmtFee}% management fee`}
          />
        </div>

        <div className="rounded-2xl border border-border/60 bg-background/40 backdrop-blur p-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-gold" />
            <div className="eyebrow !mt-0">Horizon projection</div>
          </div>
          <div className="mt-3 flex flex-wrap items-baseline gap-3">
            <div className="text-3xl md:text-4xl text-display tabular-nums">
              <AnimatedEuro value={totalOverHorizon} />
            </div>
            <div className="text-sm text-muted-foreground">
              cumulative net income over {horizon} {horizon === 1 ? "year" : "years"} — before
              resale, taxes and any capital movement.
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-background/40 backdrop-blur p-6">
          <div className="flex items-center gap-2">
            <AlertTriangle className={`h-4 w-4 ${riskTone}`} />
            <div className="text-sm font-medium">
              Risk note — <span className={riskTone}>{riskLabel}</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{riskNote}</p>
        </div>

        <div className="flex gap-3 rounded-lg border border-border/60 bg-background/30 p-4 text-xs text-muted-foreground">
          <Info className="h-4 w-4 shrink-0 mt-0.5 text-gold" />
          <p className="leading-relaxed">
            Estimates only. Not financial, tax or investment advice. Actual returns depend on
            occupancy, market conditions, fees and resale outcomes.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Residency / Personal Use Calculator ---------- */

function ResidencyCalculator() {
  const [price, setPrice] = useState(720_000);
  const [share, setShare] = useState(25);
  const [months, setMonths] = useState(3);
  const [maintenance, setMaintenance] = useState(650);
  const [legalFees, setLegalFees] = useState(4_500);
  const [lifestyle, setLifestyle] = useState(1_800);

  const coOwners = Math.max(1, Math.round(100 / share));
  const sharePrice = price * (share / 100);
  const upfront = sharePrice + legalFees;
  const monthlyPerCoOwner = maintenance / coOwners;
  const daysOfUse = Math.round((months / 12) * 365);
  const nightlyBenchmark = 220; // €/night lifestyle benchmark
  const personalUseValue = daysOfUse * nightlyBenchmark;
  const lifestyleAnnual = lifestyle * months;

  return (
    <div className="grid gap-6 lg:grid-cols-5 animate-fade-in">
      <div className="lg:col-span-2">
        <Panel eyebrow="Inputs" title="Residency & lifestyle assumptions">
          <SliderRow
            label="Property price"
            value={price}
            min={150_000}
            max={3_000_000}
            step={10_000}
            onChange={setPrice}
            format={eur}
          />
          <SliderRow
            label="Ownership share"
            value={share}
            min={10}
            max={100}
            step={5}
            onChange={setShare}
            format={(v) => v + "%"}
            hint={`≈ ${coOwners} co-owner${coOwners === 1 ? "" : "s"} at this share size.`}
          />
          <SliderRow
            label="Desired personal-use months / year"
            value={months}
            min={1}
            max={12}
            step={1}
            onChange={setMonths}
            format={(v) => v + (v === 1 ? " month" : " months")}
          />
          <SliderRow
            label="Monthly maintenance (whole property)"
            value={maintenance}
            min={100}
            max={4_000}
            step={50}
            onChange={setMaintenance}
            format={eur}
          />
          <SliderRow
            label="Legal fees (one-off estimate)"
            value={legalFees}
            min={0}
            max={20_000}
            step={250}
            onChange={setLegalFees}
            format={eur}
          />
          <SliderRow
            label="Lifestyle budget / month while in Cyprus"
            value={lifestyle}
            min={500}
            max={8_000}
            step={100}
            onChange={setLifestyle}
            format={eur}
          />
        </Panel>
      </div>

      <div className="lg:col-span-3 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <StatCard
            label="Share purchase cost"
            value={<AnimatedEuro value={sharePrice} />}
            sub={`${share}% of ${eur(price)}`}
            accent
          />
          <StatCard
            label="Estimated upfront cost"
            value={<AnimatedEuro value={upfront} />}
            sub="Share + legal fees"
            accent
          />
          <StatCard
            label="Monthly cost per co-owner"
            value={<AnimatedEuro value={monthlyPerCoOwner} />}
            sub={`Maintenance split ≈ ${coOwners} ways`}
          />
          <StatCard
            label="Personal-use value / year"
            value={<AnimatedEuro value={personalUseValue} />}
            sub={`${daysOfUse} nights × €${nightlyBenchmark} benchmark`}
          />
        </div>

        <div className="rounded-2xl border border-border/60 bg-background/40 backdrop-blur p-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-gold" />
            <div className="eyebrow !mt-0">Annual lifestyle spend in Cyprus</div>
          </div>
          <div className="mt-3 flex flex-wrap items-baseline gap-3">
            <div className="text-3xl md:text-4xl text-display tabular-nums">
              <AnimatedEuro value={lifestyleAnnual} />
            </div>
            <div className="text-sm text-muted-foreground">
              across {months} {months === 1 ? "month" : "months"} of personal use — food, transport,
              leisure, excluding maintenance.
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-background/40 backdrop-blur p-6">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-gold" />
            <div className="text-sm font-medium">Legal & immigration review checklist</div>
          </div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {[
              "Title deed & co-ownership agreement reviewed by a licensed Cyprus lawyer",
              "Residency permit route confirmed with an immigration specialist",
              "Tax residency and double-taxation implications reviewed",
              "Property transfer fees, stamp duty and VAT confirmed",
              "House rules, usage calendar and exit clauses signed by all co-owners",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-gold/70" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-3 rounded-lg border border-border/60 bg-background/30 p-4 text-xs text-muted-foreground">
          <Info className="h-4 w-4 shrink-0 mt-0.5 text-gold" />
          <p className="leading-relaxed">
            This calculator does not guarantee residency eligibility. Immigration outcomes depend on
            official Cyprus requirements and professional review.
          </p>
        </div>
      </div>
    </div>
  );
}
