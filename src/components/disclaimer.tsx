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
        Share B&amp;B is a marketplace and does not provide legal, financial, or investment
        advice. Always consult independent professionals before purchasing a share.
      </p>
    </div>
  );
}
