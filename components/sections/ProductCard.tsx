import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { ArrowRight, iconForSlug } from "@/components/icons";
import type { ProductCategory } from "@/lib/data/products";

export function ProductCard({ category }: { category: ProductCategory }) {
  const Icon = iconForSlug[category.slug];
  return (
    <Card className="flex h-full flex-col">
      <Link href={`/products/${category.slug}`} className="flex h-full flex-col">
        <ProductVisual slug={category.slug} className="h-52 w-full rounded-t-[8px]" />
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-center gap-2 text-steel-400">
            {Icon && <Icon className="h-4 w-4" />}
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em]">
              {category.tagline}
            </span>
          </div>
          <h3 className="font-display text-lg leading-snug text-silver-100">
            {category.name}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-silver-300">{category.summary}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {category.applications.slice(0, 3).map((a) => (
              <span
                key={a}
                className="rounded-full border border-graphite-500 px-3 py-1 text-[0.7rem] text-steel-400"
              >
                {a}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm uppercase tracking-[0.14em] text-silver-200 transition-colors group-hover:text-volt-400">
            Explore
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </Card>
  );
}
