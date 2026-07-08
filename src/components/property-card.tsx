import { Link } from "@tanstack/react-router";
import { MapPin, BedDouble, Bath, Ruler } from "lucide-react";
import { formatEUR, type Property } from "@/lib/properties";

export function PropertyCard({ p }: { p: Property }) {
  const sharePrice = Math.round((p.fullPrice * p.minSharePct) / 100);
  return (
    <Link
      to="/property/$id"
      params={{ id: p.id }}
      className="group block overflow-hidden rounded-xl bg-card border border-border hover:shadow-elegant transition-all"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          width={1280}
          height={900}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium">
          {p.type}
        </div>
        <div className="absolute top-3 right-3 rounded-full bg-gold px-3 py-1 text-xs font-medium text-gold-foreground">
          {p.availableSharePct}% available
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" /> {p.city}, Cyprus
        </div>
        <h3 className="mt-1 font-serif text-xl leading-tight">{p.title}</h3>
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><BedDouble className="h-3.5 w-3.5" /> {p.bedrooms}</span>
          <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5" /> {p.bathrooms}</span>
          <span className="flex items-center gap-1"><Ruler className="h-3.5 w-3.5" /> {p.sizeSqm} m²</span>
        </div>
        <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-3 text-sm">
          <div>
            <div className="text-xs text-muted-foreground">Full price</div>
            <div className="font-medium">{formatEUR(p.fullPrice)}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">From (min {p.minSharePct}%)</div>
            <div className="font-medium text-primary">{formatEUR(sharePrice)}</div>
          </div>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          Est. monthly costs {formatEUR(p.monthlyCosts)}
        </div>
      </div>
    </Link>
  );
}
