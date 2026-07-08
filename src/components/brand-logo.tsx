type Size = "sm" | "md" | "lg";

const iconSize: Record<Size, string> = {
  sm: "h-7 w-7",
  md: "h-9 w-9",
  lg: "h-12 w-12",
};

const textSize: Record<Size, string> = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-3xl",
};

/**
 * Inline house/nest mark — gold outline, minimal, sits natively on the
 * dark green surface without any box.
 */
export function BrandLogo({ size = "sm" }: { size?: Size }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconSize[size] + " shrink-0"}
      aria-hidden="true"
    >
      {/* House outline */}
      <path
        d="M6 18 L20 5 L34 18 L34 34 L6 34 Z"
        stroke="var(--gold)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Ascending "shares" bars inside */}
      <rect x="14" y="24" width="3.2" height="6" rx="0.6" fill="var(--gold)" />
      <rect x="18.4" y="20" width="3.2" height="10" rx="0.6" fill="var(--gold)" />
      <rect x="22.8" y="16" width="3.2" height="14" rx="0.6" fill="var(--gold)" />
      {/* Roof window */}
      <rect
        x="18"
        y="10.5"
        width="4"
        height="4"
        rx="0.5"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function BrandWordmark({
  size = "sm",
  showTagline = false,
}: {
  size?: Size;
  showTagline?: boolean;
}) {
  return (
    <span className="flex items-center gap-2.5 shrink-0">
      <BrandLogo size={size} />
      <span className="flex flex-col leading-none">
        <span className={"font-serif tracking-tight " + textSize[size]}>
          <span className="text-foreground">Shared</span>
          <span className="text-gold">Nest</span>
        </span>
        {showTagline && (
          <span className="mt-1.5 text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
            Shared ownership, simplified
          </span>
        )}
      </span>
    </span>
  );
}
