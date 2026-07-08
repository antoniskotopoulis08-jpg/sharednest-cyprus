import { Link } from "@tanstack/react-router";
import { MapPin, BedDouble, Bath, Ruler, ArrowUpRight } from "lucide-react";
import { formatEUR, type Property } from "@/lib/properties";

export function PropertyCard({ p }: { p: Property }) {
  const sharePrice = Math.round((p.fullPrice * p.minSharePct) / 100);
  return (
    <Link
      to="/property/$id"
      params={{ id: p.id }}
      className="group relative block overflow-hidden rounded-xl bg-card border border-border hover-lift"
    >
      <div className="relative aspect-[5/6] overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          width={1280}
          height={900}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        />
        {/* Bottom gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 40%, oklch(0.18 0.06 150 / 0.85) 100%)",
          }}
        />
        {/* Top pills */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] rounded-full bg-background/90 backdrop-blur px-3 py-1.5">
            {p.type}
          </span>
          <span
            className="font-mono text-[10px] uppercase tracking-[0.2em] rounded-full px-3 py-1.5 text-gold-foreground"
            style={{ background: "var(--gradient-gold)" }}
          >
            {p.availableSharePct}% available
          </span>
        </div>
        {/* Bottom overlay content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-primary-foreground">
          <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-widest uppercase opacity-80">
            <MapPin className="h-3 w-3 text-gold" /> {p.city}
          </div>
          <h3 className="mt-1.5 font-serif text-2xl leading-tight">{p.title}</h3>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex items-center gap-5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><BedDouble className="h-3.5 w-3.5" /> {p.bedrooms}</span>
          <span className="flex items-center gap-1.5"><Bath className="h-3.5 w-3.5" /> {p.bathrooms}</span>
          <span className="flex items-center gap-1.5"><Ruler className="h-3.5 w-3.5" /> {p.sizeSqm} m²</span>
          <span className="ml-auto inline-flex items-center gap-1 text-foreground/60 group-hover:text-gold transition-colors">
            View <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
        <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Full price</div>
            <div className="font-serif text-lg">{formatEUR(p.fullPrice)}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">From ({p.minSharePct}%)</div>
            <div className="font-serif text-lg text-primary">{formatEUR(sharePrice)}</div>
          </div>
        </div>
        <div className="mt-3 text-xs text-muted-foreground">
          Est. monthly costs {formatEUR(p.monthlyCosts)}
        </div>
      </div>
    </Link>
  );
}
