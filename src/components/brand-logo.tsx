import logoAsset from "@/assets/sharednest-logo.png.asset.json";

type Size = "sm" | "md" | "lg";

const sizes: Record<Size, string> = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
  lg: "h-14 w-14",
};

/**
 * SharedNest brand mark. The uploaded logo has a light background,
 * so we render it inside a soft ivory rounded container so it stays
 * readable on the dark green surface.
 */
export function BrandLogo({ size = "sm" }: { size?: Size }) {
  return (
    <span
      className={
        "grid place-items-center rounded-lg bg-[#F7F3EC] shadow-sm ring-1 ring-black/5 overflow-hidden " +
        sizes[size]
      }
    >
      <img
        src={logoAsset.url}
        alt="SharedNest logo"
        className="h-full w-full object-contain p-1"
        loading="eager"
        decoding="async"
      />
    </span>
  );
}

export function BrandWordmark({
  size = "sm",
  showTagline = false,
}: {
  size?: Size;
  showTagline?: boolean;
}) {
  const textSize = size === "lg" ? "text-3xl" : size === "md" ? "text-2xl" : "text-xl";
  return (
    <span className="flex items-center gap-2.5 shrink-0">
      <BrandLogo size={size} />
      <span className="flex flex-col leading-none">
        <span className={"font-serif tracking-tight " + textSize}>
          Shared<span className="text-gold">Nest</span>
        </span>
        {showTagline && (
          <span className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Shared ownership, simplified
          </span>
        )}
      </span>
    </span>
  );
}
