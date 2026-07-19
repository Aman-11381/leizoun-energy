import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Premium surface card — graphite surface, top-down light, one clipped
 * corner (echoing the logo shear), and a blue seam that ignites on hover.
 * Depth comes from light, not heavy shadow.
 */
export function Card({
  children,
  className,
  interactive = true,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative clip-shear surface-lit border border-graphite-500 rounded-[8px]",
        "transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        interactive &&
          "hover:-translate-y-1.5 hover:border-silver-300/50",
        className
      )}
    >
      {children}
      {interactive && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-volt-500 to-transparent opacity-0 shadow-[0_0_18px_rgba(30,144,255,0.6)] transition-opacity duration-500 group-hover:opacity-100"
        />
      )}
    </div>
  );
}
