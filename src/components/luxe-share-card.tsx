import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, Heart, Sparkles, TrendingUp, Wallet, Home } from "lucide-react";
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
  tagline: string; // "High estimated rental potential" | "Holiday home + investment"
};

export function LuxeShareCard({ data }: { data: LuxeCardData }) {
  const [stake, setStake] = useState(data.stakes[1] ?? data.stakes[0]);
  const sharePrice = Math.round((data.fullPrice * stake) / 100);

  const modeIcon = data.mode === "invest" ? TrendingUp : Home;
  const ModeIcon = modeIcon;

  return (
    <Link
      to="/property/$id"
      params={{ id: data.id }}
      className="group relative block rounded-2xl overflow-hidden border border-white/10 bg-[oklch(0.14_0.04_250)] transition-all duration-500 hover:border-[color:var(--gold)]/40 hover:-translate-y-1"
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

        {/* top row: location + save */}
        <div className="absolute inset-x-4 top-4 flex items-start justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-md bg-white/10 border border-white/15">
            <MapPin className="h-3 w-3 text-[color:var(--gold)]" /> {data.city}
          </span>
          <button
            type="button"
            onClick={(e) => e.preventDefault()}
            aria-label="Save"
            className="grid h-9 w-9 place-items-center rounded-full backdrop-blur-md bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-colors"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>

        {/* bottom row: match + tagline */}
        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-md bg-black/40 border border-white/10">
            <Sparkles className="h-3 w-3 text-[color:var(--gold)]" /> {data.matchPct}% AI Match
          </span>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium text-[color:var(--gold-foreground)]"
            style={{ background: "var(--gradient-gold)" }}
          >
            <ModeIcon className="h-3 w-3" /> {data.tagline}
          </span>
        </div>
      </div>

      {/* Body — dark */}
      <div className="p-5 text-white">
        <h3 className="font-serif text-2xl leading-tight">{data.title}</h3>
        <div className="mt-1 text-xs text-white/50">
          Full property {formatEUR(data.fullPrice)}
        </div>

        <div className="mt-4 border-t border-white/10 pt-4 grid grid-cols-2 gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-mono">
              Share from
            </div>
            <div className="mt-1 font-serif text-2xl text-[color:var(--gold)] tabular-nums">
              {formatEUR(sharePrice)}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-mono">
              Est. monthly
            </div>
            <div className="mt-1 font-serif text-2xl text-white/90 tabular-nums flex items-center gap-1.5">
              <Wallet className="h-4 w-4 text-[color:var(--gold)]" />
              {formatEUR(data.monthly)}
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-mono mb-2">
            Ownership stake
          </div>
          <div className="grid grid-cols-3 gap-2">
            {data.stakes.map((s) => {
              const active = s === stake;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setStake(s);
                  }}
                  className={
                    "rounded-lg py-2 text-xs font-medium border transition-all " +
                    (active
                      ? "text-[color:var(--gold-foreground)] border-transparent"
                      : "border-white/10 text-white/70 hover:border-white/25 hover:text-white")
                  }
                  style={active ? { background: "var(--gradient-gold)" } : undefined}
                >
                  {s}%
                </button>
              );
            })}
          </div>
          <div className="mt-3 text-[11px] text-white/60">
            {stake}% stake · <span className="text-white/90">{formatEUR(sharePrice)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
