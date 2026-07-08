import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  MapPin, Heart, Sparkles, TrendingUp, Wallet, Home,
  CalendarDays, Waves, Shield, Gauge, Briefcase, Info, ScrollText,
} from "lucide-react";
import { formatEUR } from "@/lib/properties";

export type LuxeCardData = {
  id: string;
  title: string;
  city: string;
  image: string;
  fullPrice: number;
  stakes: number[]; // e.g. [12.5, 25, 50]
  matchPct: number;
  monthly: number;
  mode: "invest" | "lifestyle";
  tagline: string;
  // Optional context
  yearlyRentalFullPct?: number; // rental yield of full property, e.g. 5.5 (%)
  occupancyPct?: number; // e.g. 78
  riskLevel?: "Low" | "Moderate" | "Balanced" | "Higher";
  mgmtFeePct?: number; // % of rental income, e.g. 12
  beachKm?: number; // distance in km
  centerKm?: number;
  lifestyleScore?: number; // 0-100
};

type View = "invest" | "lifestyle";

export function LuxeShareCard({ data }: { data: LuxeCardData }) {
  const [stake, setStake] = useState<number>(data.stakes[1] ?? data.stakes[0]);
  const [view, setView] = useState<View>(data.mode);

  const derived = useMemo(() => {
    const yearlyFullPct = data.yearlyRentalFullPct ?? 5.4;
    const occupancy = data.occupancyPct ?? 74;
    const risk = data.riskLevel ?? "Balanced";
    const mgmtPct = data.mgmtFeePct ?? 12;
    const beachKm = data.beachKm ?? 0.6;
    const centerKm = data.centerKm ?? 1.2;
    const lifestyle = data.lifestyleScore ?? 88;

    const sharePrice = Math.round((data.fullPrice * stake) / 100);
    const monthly = Math.round((data.monthly * stake) / 100);
    // 365 days shared by stake — 12.5% → ~46, 25% → ~91, 50% → ~182
    const personalDays = Math.round((365 * stake) / 100);
    const yearlyRentalFull = Math.round(
      (data.fullPrice * yearlyFullPct * (occupancy / 100)) / 100
    );
    const yearlyRentalShare = Math.round((yearlyRentalFull * stake) / 100);
    const netAfterFee = Math.round(yearlyRentalShare * (1 - mgmtPct / 100));
    // AI match reasoning
    const matchAdj = Math.max(
      60,
      Math.min(99, Math.round(data.matchPct - Math.abs(stake - 25) * 0.4))
    );

    const matchReason =
      view === "invest"
        ? `Aligned with a ${stake}% investment stake at ~${yearlyFullPct}% yield · ${risk.toLowerCase()} risk profile`
        : `Fits ${personalDays} personal-use days/year · ${beachKm} km to beach · lifestyle score ${lifestyle}`;

    return {
      sharePrice,
      monthly,
      personalDays,
      yearlyRentalFull,
      yearlyRentalShare,
      netAfterFee,
      matchAdj,
      matchReason,
      occupancy,
      risk,
      mgmtPct,
      beachKm,
      centerKm,
      lifestyle,
      yearlyFullPct,
    };
  }, [data, stake, view]);

  const ModeIcon = view === "invest" ? TrendingUp : Home;

  return (
    <div
      className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[oklch(0.14_0.04_250)] transition-all duration-500 hover:border-[color:var(--gold)]/40 hover:-translate-y-1"
      style={{ boxShadow: "0 30px 80px -40px oklch(0 0 0 / 0.7)" }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={data.image}
          alt={data.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.14 0.04 250 / 0.55) 0%, transparent 40%, oklch(0.14 0.04 250 / 0.75) 100%)",
          }}
        />

        <div className="absolute inset-x-4 top-4 flex items-start justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-md bg-white/10 border border-white/15">
            <MapPin className="h-3 w-3 text-[color:var(--gold)]" /> {data.city}
          </span>
          <button
            type="button"
            aria-label="Save"
            className="grid h-9 w-9 place-items-center rounded-full backdrop-blur-md bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-colors"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>

        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-md bg-black/40 border border-white/10">
            <Sparkles className="h-3 w-3 text-[color:var(--gold)]" />{" "}
            <span className="tabular-nums">{derived.matchAdj}%</span> AI Match
          </span>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium text-[color:var(--gold-foreground)]"
            style={{ background: "var(--gradient-gold)" }}
          >
            <ModeIcon className="h-3 w-3" /> {data.tagline}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 text-white">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-serif text-2xl leading-tight truncate">{data.title}</h3>
            <div className="mt-1 text-xs text-white/50">
              Full property {formatEUR(data.fullPrice)}
            </div>
          </div>
        </div>

        {/* View toggle */}
        <div
          role="tablist"
          aria-label="Property view"
          className="mt-4 grid grid-cols-2 gap-1 rounded-full border border-white/10 bg-white/5 p-1"
        >
          <ToggleBtn
            active={view === "invest"}
            onClick={() => setView("invest")}
            icon={<TrendingUp className="h-3.5 w-3.5" />}
            label="Investment"
          />
          <ToggleBtn
            active={view === "lifestyle"}
            onClick={() => setView("lifestyle")}
            icon={<Home className="h-3.5 w-3.5" />}
            label="Residency"
          />
        </div>

        {/* Core price row */}
        <div className="mt-5 border-t border-white/10 pt-5 grid grid-cols-2 gap-4">
          <Stat
            label="Share from"
            value={formatEUR(derived.sharePrice)}
            valueClass="text-[color:var(--gold)]"
          />
          <Stat
            label="Est. monthly"
            value={
              <span className="flex items-center gap-1.5">
                <Wallet className="h-4 w-4 text-[color:var(--gold)]" />
                {formatEUR(derived.monthly)}
              </span>
            }
          />
        </div>

        {/* View-specific stats */}
        <div key={view} className="mt-5 grid grid-cols-2 gap-3 animate-fade-in">
          {view === "invest" ? (
            <>
              <MicroStat
                icon={<TrendingUp className="h-3.5 w-3.5" />}
                label="Rental potential"
                value={`${formatEUR(derived.netAfterFee)}/yr`}
                sub={`${derived.yearlyFullPct}% gross · net of fees`}
              />
              <MicroStat
                icon={<Gauge className="h-3.5 w-3.5" />}
                label="Occupancy"
                value={`${derived.occupancy}%`}
                sub="Trailing 12-month est."
                bar={derived.occupancy}
              />
              <MicroStat
                icon={<Shield className="h-3.5 w-3.5" />}
                label="Risk level"
                value={derived.risk}
                sub="Diversified co-owners"
              />
              <MicroStat
                icon={<Briefcase className="h-3.5 w-3.5" />}
                label="Management fee"
                value={`${derived.mgmtPct}%`}
                sub="Of gross rental income"
              />
            </>
          ) : (
            <>
              <MicroStat
                icon={<CalendarDays className="h-3.5 w-3.5" />}
                label="Personal-use days"
                value={`${derived.personalDays} / yr`}
                sub="Rotating booking calendar"
              />
              <MicroStat
                icon={<Waves className="h-3.5 w-3.5" />}
                label="Distance"
                value={`${derived.beachKm} km beach`}
                sub={`${derived.centerKm} km to centre`}
              />
              <MicroStat
                icon={<Sparkles className="h-3.5 w-3.5" />}
                label="Lifestyle score"
                value={`${derived.lifestyle}/100`}
                sub="Walkability · dining · sea"
                bar={derived.lifestyle}
              />
              <MicroStat
                icon={<ScrollText className="h-3.5 w-3.5" />}
                label="Legal review"
                value="Required"
                sub="Immigration & title deed"
                badge
              />
            </>
          )}
        </div>

        {/* Stake selector */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/50 font-mono mb-2">
            <span>Ownership stake</span>
            <span className="text-white/70">{stake}%</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {data.stakes.map((s) => {
              const active = s === stake;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStake(s)}
                  className={
                    "rounded-lg py-2 text-xs font-medium border transition-all " +
                    (active
                      ? "text-[color:var(--gold-foreground)] border-transparent shadow-[0_10px_30px_-15px_oklch(0.75_0.12_82/0.6)]"
                      : "border-white/10 text-white/70 hover:border-white/25 hover:text-white")
                  }
                  style={active ? { background: "var(--gradient-gold)" } : undefined}
                >
                  {s}%
                </button>
              );
            })}
          </div>
        </div>

        {/* AI match reasoning */}
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-3 text-[11px] text-white/70 leading-relaxed">
          <Info className="h-3.5 w-3.5 mt-0.5 text-[color:var(--gold)] shrink-0" />
          <span>{derived.matchReason}</span>
        </div>

        {/* CTA */}
        <Link
          to="/property/$id"
          params={{ id: data.id }}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 py-2.5 text-xs font-medium text-white hover:bg-white/10 transition-colors"
        >
          View full listing
        </Link>
      </div>
    </div>
  );
}

function ToggleBtn({
  active, onClick, icon, label,
}: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={
        "inline-flex items-center justify-center gap-1.5 rounded-full py-1.5 text-[11px] font-medium transition-all " +
        (active
          ? "text-[color:var(--gold-foreground)]"
          : "text-white/60 hover:text-white")
      }
      style={active ? { background: "var(--gradient-gold)" } : undefined}
    >
      {icon}
      {label}
    </button>
  );
}

function Stat({
  label, value, valueClass = "",
}: { label: string; value: React.ReactNode; valueClass?: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-mono">{label}</div>
      <div className={"mt-1 font-serif text-2xl tabular-nums " + valueClass}>{value}</div>
    </div>
  );
}

function MicroStat({
  icon, label, value, sub, bar, badge,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  sub?: string;
  bar?: number;
  badge?: boolean;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-white/50 font-mono">
        <span className="text-[color:var(--gold)]">{icon}</span>
        {label}
      </div>
      <div className="mt-1.5 flex items-center gap-2">
        <div className="text-sm font-medium text-white tabular-nums">{value}</div>
        {badge && (
          <span className="rounded-full border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10 px-1.5 py-0.5 text-[9px] uppercase tracking-widest text-[color:var(--gold)]">
            Advised
          </span>
        )}
      </div>
      {typeof bar === "number" && (
        <div className="mt-2 h-1 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full transition-[width] duration-700 ease-out"
            style={{ width: `${bar}%`, background: "var(--gradient-gold)" }}
          />
        </div>
      )}
      {sub && <div className="mt-1 text-[10px] text-white/45">{sub}</div>}
    </div>
  );
}
