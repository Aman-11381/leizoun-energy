import type { CSSProperties } from "react";
import { GridCursorGlow } from "@/components/sections/GridCursorGlow";

const G = 64; // must match the 64px grid in .grid-backdrop / .grid-lines-mask

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

// [column, row, duration, delay]
const cells: [number, number, string, string][] = [
  [3, 2, "9s", "0s"],
  [16, 3, "11s", "2.5s"],
  [12, 8, "8s", "5s"],
  [5, 10, "10s", "7s"],
  [19, 9, "12s", "3.5s"],
  [8, 5, "9.5s", "9s"],
];

// [row, duration, delay]
const pulsesX: [number, string, string][] = [
  [4, "11s", "1s"],
  [9, "14s", "6s"],
  [13, "12s", "9s"],
];

// [column, duration, delay]
const pulsesY: [number, string, string][] = [
  [7, "13s", "3s"],
  [17, "15s", "8s"],
];

/** Animated "live grid" behind the home hero. Decorative and CSS-only. */
export function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 grid-backdrop opacity-60" />

      {/* Drifting light, visible only through the grid lines */}
      <div className="grid-lines-mask absolute inset-0 opacity-40 light:opacity-30">
        <div className="anim-drift-a absolute -right-[15vw] -top-[20vh] h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(circle,var(--color-volt-500)_0%,transparent_65%)]" />
        <div className="anim-drift-b absolute -bottom-[25vh] -left-[10vw] h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,var(--color-volt-400)_0%,transparent_65%)]" />
      </div>

      <GridCursorGlow />

      {cells.map(([c, r, dur, d]) => (
        <span
          key={`${c}-${r}`}
          className="grid-cell absolute bg-volt-500/[0.05]"
          style={{ left: c * G + 1, top: r * G + 1, width: G - 1, height: G - 1, ...v({ "--dur": dur, "--d": d }) }}
        />
      ))}

      {pulsesX.map(([r, dur, d]) => (
        <span
          key={`x${r}`}
          className="grid-pulse-x absolute left-0 h-px w-[160px] bg-gradient-to-r from-transparent via-volt-500/45 to-transparent"
          style={{ top: r * G, ...v({ "--dur": dur, "--d": d }) }}
        />
      ))}

      {pulsesY.map(([c, dur, d]) => (
        <span
          key={`y${c}`}
          className="grid-pulse-y absolute top-0 h-[160px] w-px bg-gradient-to-b from-transparent via-volt-500/45 to-transparent"
          style={{ left: c * G, ...v({ "--dur": dur, "--d": d }) }}
        />
      ))}
    </div>
  );
}
