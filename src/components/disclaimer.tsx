import { Info } from "lucide-react";

export function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <div
      className={
        "flex gap-3 rounded-lg border border-gold/40 bg-gold/10 p-4 text-sm text-foreground " +
        className
      }
    >
      <Info className="h-5 w-5 shrink-0 text-gold-foreground/70 mt-0.5" />
      <p className="leading-relaxed">
        SharedNest is a marketplace and matching platform. We do not provide legal,
        financial, tax, investment, immigration, or real estate brokerage advice. All
        estimates are for informational purposes only. Users should consult licensed
        professionals before making decisions.
      </p>
    </div>
  );
}
