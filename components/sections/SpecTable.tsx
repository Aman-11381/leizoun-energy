import { Fragment } from "react";
import { cn } from "@/lib/utils";
import type { ProductModel, SpecSheet } from "@/lib/data/products";

const th = "px-4 py-3 text-left font-mono text-[0.65rem] font-normal uppercase tracking-[0.18em] text-steel-400";
const td = "px-4 py-3 text-sm text-silver-200";

/** Model specification table for a product line (grouped rows or parameter matrix). */
export function SpecTable({ sheet, models }: { sheet: SpecSheet; models: ProductModel[] }) {
  return (
    <div>
      <p className="mb-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-steel-400 md:hidden" aria-hidden="true">
        Swipe to see all columns →
      </p>
      <div className="overflow-x-auto rounded-[12px] border border-graphite-500">
        {sheet.layout === "grouped" ? <Grouped sheet={sheet} models={models} /> : <Matrix sheet={sheet} models={models} />}
      </div>
      {sheet.notes.length > 0 && (
        <div className="mt-4 space-y-1">
          {sheet.notes.map((n) => (
            <p key={n} className="text-xs text-steel-400">
              {n}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function Grouped({ sheet, models }: { sheet: SpecSheet; models: ProductModel[] }) {
  const groups = [...new Set(models.map((m) => m.group ?? ""))];
  return (
    <table className="w-full min-w-[560px] border-collapse">
      <thead className="bg-ink-900">
        <tr className="border-b border-graphite-500">
          <th scope="col" className={th}>{sheet.groupLabel}</th>
          <th scope="col" className={th}>Model</th>
          {sheet.fields.map((f) => (
            <th key={f.key} scope="col" className={th}>{f.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {groups.map((g) => {
          const rows = models.filter((m) => (m.group ?? "") === g);
          return (
            <Fragment key={g}>
              {rows.map((m, i) => (
                <tr
                  key={m.sku}
                  className={cn(
                    "transition-colors hover:bg-volt-500/[0.06]",
                    i === 0 ? "border-t border-graphite-500" : "border-t border-graphite-500/40"
                  )}
                >
                  {i === 0 && (
                    <th
                      scope="rowgroup"
                      rowSpan={rows.length}
                      className="whitespace-nowrap border-r border-graphite-500 bg-ink-900/60 px-5 py-3 text-left align-middle font-display text-lg font-normal text-silver-100"
                    >
                      {g}
                    </th>
                  )}
                  <td className={`${td} font-mono tracking-wide text-silver-100`}>{m.sku}</td>
                  {sheet.fields.map((f) => (
                    <td key={f.key} className={td}>{m.specs[f.key]}</td>
                  ))}
                </tr>
              ))}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
}

function Matrix({ sheet, models }: { sheet: SpecSheet; models: ProductModel[] }) {
  return (
    <table className="w-full min-w-[720px] border-collapse">
      <thead className="bg-ink-900">
        <tr className="border-b border-graphite-500">
          <th scope="col" className={`${th} sticky left-0 bg-ink-900`}>Technical specifications</th>
          {models.map((m) => (
            <th key={m.sku} scope="col" className="px-4 py-3 text-left font-display text-sm font-normal text-silver-100">
              {m.sku}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sheet.fields.map((f) => (
          <tr key={f.key} className="border-t border-graphite-500/40 transition-colors odd:bg-ink-700/40 hover:bg-volt-500/[0.06]">
            <th scope="row" className="sticky left-0 bg-ink-800 px-4 py-3 text-left text-sm font-normal text-silver-300">
              {f.label}
            </th>
            {models.map((m) => (
              <td key={m.sku} className={td}>{m.specs[f.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
