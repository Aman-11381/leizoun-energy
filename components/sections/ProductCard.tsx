import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ProductShot } from "@/components/ui/ProductShot";
import type { ProductCategory } from "@/lib/data/products";

export function ProductCard({ category }: { category: ProductCategory }) {
  return (
    <Card className="flex h-full flex-col">
      <Link href={`/products/${category.slug}`} className="flex h-full flex-col">
        <ProductShot
          image={category.image}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="aspect-[16/10] w-full rounded-t-[8px]"
        />
        <div className="flex flex-1 flex-col p-6 md:p-8">
          <div className="mb-3 text-steel-400">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em]">
              {category.chemistry} · {category.tagline}
            </span>
          </div>
          <h3 className="font-display text-xl leading-snug text-silver-100">{category.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-silver-300">{category.summary}</p>

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-graphite-500 pt-5">
            {category.keyStats.map((s) => (
              <div key={s.label}>
                <dt className="text-[0.65rem] uppercase tracking-[0.14em] text-steel-400">{s.label}</dt>
                <dd className="mt-1 whitespace-nowrap font-display text-sm text-metal">{s.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-auto pt-6 text-sm uppercase tracking-[0.14em] text-silver-200 transition-colors group-hover:text-volt-400">
            Explore {category.models.length} models
          </div>
        </div>
      </Link>
    </Card>
  );
}
