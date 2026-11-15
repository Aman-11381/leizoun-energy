import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/lib/data/products";

/**
 * Official transparent product render on a studio-lit stage. The parent sets
 * the size (e.g. an aspect-ratio class); the render is contained within it.
 */
export function ProductShot({
  image,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  eager = false,
  padding = "p-[8%]",
  float = false,
}: {
  image: ProductImage;
  className?: string;
  sizes?: string;
  eager?: boolean;
  padding?: string;
  /** Slow idle float, for hero renders. */
  float?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        "bg-[radial-gradient(120%_90%_at_50%_0%,var(--color-graphite-600)_0%,var(--color-ink-900)_70%)]",
        className
      )}
    >
      <div className="pointer-events-none absolute -top-10 left-1/2 h-40 w-2/3 -translate-x-1/2 rounded-full bg-white/[0.06] blur-3xl light:bg-white/70" />
      <div className="pointer-events-none absolute inset-x-[15%] bottom-[12%] h-10 rounded-[50%] bg-volt-500/15 blur-2xl" />
      <div className={cn("absolute inset-0", padding, float && "anim-float")}>
        {/* Zooms slightly when an ancestor `group` (e.g. a card) is hovered. */}
        <div className="relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            loading={eager ? "eager" : "lazy"}
            className="object-contain [filter:var(--product-shadow)]"
          />
        </div>
      </div>
      <div className="seam absolute inset-x-[20%] bottom-0 opacity-60" />
    </div>
  );
}
