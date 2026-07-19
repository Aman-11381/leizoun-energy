import { cn } from "@/lib/utils";
import { iconForSlug } from "@/components/icons";

/**
 * PLACEHOLDER product visual — a studio-lit stage with a stylised battery
 * form, brushed-metal fill and the blue energy seam. Designed to be swapped
 * 1:1 for real product renders (see art-direction spec in plan.md §2.7).
 */
export function ProductVisual({
  slug,
  className,
  compact = false,
}: {
  slug: string;
  className?: string;
  compact?: boolean;
}) {
  const Icon = iconForSlug[slug];
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        "bg-[radial-gradient(120%_90%_at_50%_0%,#171b22_0%,#0a0c10_70%)]",
        className
      )}
      aria-hidden
    >
      {/* key light */}
      <div className="pointer-events-none absolute -top-10 left-1/2 h-40 w-2/3 -translate-x-1/2 rounded-full bg-silver-100/[0.06] blur-3xl" />

      {/* battery form */}
      <div className="relative">
        <div
          className={cn(
            "clip-shear grid place-items-center rounded-[10px] border border-graphite-500/80",
            "bg-[linear-gradient(160deg,#e8edf3_0%,#aeb7c3_30%,#69717d_60%,#2c323b_100%)]",
            "shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]",
            compact ? "h-28 w-40" : "h-44 w-64 md:h-52 md:w-72"
          )}
        >
          {Icon && <Icon className={cn("text-ink-900/70", compact ? "h-9 w-9" : "h-14 w-14")} />}
        </div>
        {/* terminals */}
        <div className="absolute -top-1.5 left-6 h-2.5 w-5 rounded-t-sm bg-silver-200/80" />
        <div className="absolute -top-1.5 right-8 h-2.5 w-5 rounded-t-sm bg-silver-200/80" />
        {/* energy seam reflection */}
        <div className="seam absolute inset-x-4 bottom-3" />
        {/* base reflection */}
        <div className="absolute -bottom-6 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-[50%] bg-black/60 blur-xl" />
      </div>

      <span className="pointer-events-none absolute bottom-3 right-4 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-steel-400/70">
        Render · placeholder
      </span>
    </div>
  );
}
