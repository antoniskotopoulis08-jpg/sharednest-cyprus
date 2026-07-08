import { useEffect, useState } from "react";
import { ArrowRight, Calculator, Info } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { CountUp } from "./count-up";

function formatEUR(n: number) {
  return new Intl.NumberFormat("en-CY", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function AffordabilityCalculator() {
  const [price, setPrice] = useState(400_000);
  const [sharePct, setSharePct] = useState(25);
  const [legalPct, setLegalPct] = useState(3);
  const [monthlyMaint, setMonthlyMaint] = useState(280);
  const [yearlyRent, setYearlyRent] = useState(24_000);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(t);
  }, []);

  const numCoOwners = Math.max(1, Math.round(100 / Math.max(sharePct, 5)) - 1);
  const shareCost = Math.round((price * sharePct) / 100);
  const legalFees = Math.round((price * legalPct) / 100);
  const upfrontCost = shareCost + legalFees;
  const monthlyCostPerOwner = Math.round(monthlyMaint / numCoOwners);
  const yearlyRentalPerShare = Math.round((yearlyRent * sharePct) / 100);
  const fullUpfront = price + Math.round((price * legalPct) / 100);
  const savings = fullUpfront - upfrontCost;

  const inputBase =
    "w-full rounded-lg border border-border bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gold/30 transition-all";
  const sliderBase = "w-full accent-[color:var(--gold)] cursor-pointer";

  return (
    <div className="grid lg:grid-cols-12 gap-10 items-start">
      {/* Inputs */}
      <div className="lg:col-span-5 space-y-6">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-primary text-primary-foreground">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-gold">Calculator</div>
            <div className="font-serif text-xl">Adjust your scenario</div>
          </div>
        </div>

        <div className="space-y-5">
          <Field
            label="Full property price"
            value={price}
            onChange={setPrice}
            min={100_000}
            max={3_000_000}
            step={10_000}
            format={formatEUR}
          />

          <SliderField
            label="Desired ownership share"
            value={sharePct}
            onChange={setSharePct}
            min={5}
            max={100}
            step={5}
            suffix="%"
          />

          <SliderField
            label="Estimated legal fees"
            value={legalPct}
            onChange={setLegalPct}
            min={1}
            max={10}
            step={0.5}
            suffix="%"
          />

          <Field
            label="Monthly maintenance"
            value={monthlyMaint}
            onChange={setMonthlyMaint}
            min={50}
            max={3_000}
            step={10}
            format={formatEUR}
          />

          <Field
            label="Yearly rental income (if rented)"
            value={yearlyRent}
            onChange={setYearlyRent}
            min={0}
            max={100_000}
            step={500}
            format={formatEUR}
          />
        </div>
      </div>

      {/* Outputs */}
      <div className="lg:col-span-7 space-y-6">
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-elegant">
          <div className="text-xs font-mono uppercase tracking-widest text-gold">Results</div>
          <h3 className="mt-2 font-serif text-3xl">Your co-ownership estimate</h3>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <OutputCard
              label="Cost of selected share"
              value={shareCost}
              format={formatEUR}
              animated={animated}
            />
            <OutputCard
              label="Estimated upfront cost"
              value={upfrontCost}
              format={formatEUR}
              animated={animated}
              highlight
            />
            <OutputCard
              label="Monthly cost per co-owner"
              value={monthlyCostPerOwner}
              format={formatEUR}
              animated={animated}
            />
            <OutputCard
              label="Yearly rental income per share"
              value={yearlyRentalPerShare}
              format={formatEUR}
              animated={animated}
              accent
            />
          </div>

          {/* Save banner */}
          <div
            className="mt-6 rounded-xl p-5 text-gold-foreground relative overflow-hidden"
            style={{ background: "var(--gradient-gold)" }}
          >
            <div className="relative z-10 flex items-start gap-3">
              <Info className="h-5 w-5 shrink-0 mt-0.5 opacity-80" />
              <div>
                <div className="font-serif text-lg">
                  You save{" "}
                  <CountUp
                    value={animated ? savings : 0}
                    format={formatEUR}
                    duration={1000}
                    className="font-medium"
                  />{" "}
                  in access cost by buying a share instead of the full home.
                </div>
                <p className="mt-1 text-sm opacity-80">
                  That is {sharePct}% ownership for{" "}
                  <CountUp
                    value={animated ? upfrontCost : 0}
                    format={formatEUR}
                    duration={1000}
                  />{" "}
                  instead of {formatEUR(fullUpfront)} upfront.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-secondary/40 p-5">
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Full ownership
            </div>
            <div className="mt-3 font-serif text-3xl">
              <CountUp value={animated ? fullUpfront : 0} format={formatEUR} duration={1000} />
            </div>
            <div className="mt-2 text-sm text-muted-foreground">100% · all costs, all responsibility</div>
            <div className="mt-4 space-y-2 text-sm">
              <Row label="Upfront" value={formatEUR(fullUpfront)} />
              <Row label="Monthly costs" value={formatEUR(monthlyMaint)} />
              <Row label="Co-owners" value="—" />
              <Row label="Your share of rental" value="100%" />
            </div>
          </div>

          <div
            className="rounded-xl p-5 text-gold-foreground relative overflow-hidden"
            style={{ background: "var(--gradient-gold)" }}
          >
            <div className="relative z-10">
              <div className="text-xs font-mono uppercase tracking-widest opacity-70">
                Share B&B ownership
              </div>
              <div className="mt-3 font-serif text-3xl">
                <CountUp value={animated ? upfrontCost : 0} format={formatEUR} duration={1000} />
              </div>
              <div className="mt-2 text-sm opacity-80">
                {sharePct}% share · {numCoOwners} co-owner{numCoOwners !== 1 ? "s" : ""} · deeded
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <RowDark label="Upfront" value={formatEUR(upfrontCost)} />
                <RowDark label="Monthly costs" value={formatEUR(monthlyCostPerOwner)} />
                <RowDark label="Co-owners" value={`${numCoOwners}`} />
                <RowDark
                  label="Your share of rental"
                  value={`${sharePct}% · ${formatEUR(yearlyRentalPerShare)}/yr`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="rounded-lg border border-border bg-secondary/30 p-4 text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Disclaimer.</strong> Share B&amp;B is a marketplace
          and matching platform. We do not provide legal, financial, tax, investment, immigration,
          or real estate brokerage advice. All estimates are for informational purposes only.
          Users should consult licensed professionals before making decisions.
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/browse"
            className="group inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Browse properties
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/matchmaker"
            className="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-3 text-sm hover:bg-secondary/50 transition-colors"
          >
            Take AI Match Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (n: number) => string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono text-foreground">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[color:var(--gold)] cursor-pointer"
      />
    </div>
  );
}

function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  suffix: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono text-foreground">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[color:var(--gold)] cursor-pointer"
      />
    </div>
  );
}

function OutputCard({
  label,
  value,
  format,
  animated,
  highlight = false,
  accent = false,
}: {
  label: string;
  value: number;
  format: (n: number) => string;
  animated: boolean;
  highlight?: boolean;
  accent?: boolean;
}) {
  return (
    <div
      className={
        "rounded-xl border p-5 " +
        (highlight
          ? "border-gold/40 bg-gold/5"
          : accent
            ? "border-olive/30 bg-olive/5"
            : "border-border bg-secondary/30")
      }
    >
      <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 font-serif text-2xl md:text-3xl">
        <CountUp value={animated ? value : 0} format={format} duration={1000} />
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-t border-border pt-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function RowDark({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-t border-black/10 pt-2 text-sm">
      <span className="opacity-70">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
