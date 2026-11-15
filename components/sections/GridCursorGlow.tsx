"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

const SIZE = 440;

/**
 * Soft light that follows the mouse across the hero. Rendered inside a
 * .grid-lines-mask so only the grid lines near the cursor light up.
 * Mouse only (no touch), and disabled under reduced motion.
 */
export function GridCursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 150, damping: 22, mass: 0.5 });
  const opacity = useSpring(0, { stiffness: 90, damping: 22 });

  useEffect(() => {
    const host = ref.current?.closest("section");
    if (!host || reduce) return;

    let first = true;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = host.getBoundingClientRect();
      const px = e.clientX - r.left - SIZE / 2;
      const py = e.clientY - r.top - SIZE / 2;
      if (first) {
        // Start at the cursor instead of sliding in from the corner.
        sx.jump(px);
        sy.jump(py);
        first = false;
      }
      x.set(px);
      y.set(py);
      opacity.set(1);
    };
    const onLeave = () => {
      opacity.set(0);
      first = true;
    };

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, x, y, sx, sy, opacity]);

  return (
    <div ref={ref} className="grid-lines-mask absolute inset-0 opacity-60 light:opacity-45">
      <motion.div
        className="absolute left-0 top-0 rounded-full bg-[radial-gradient(circle,var(--color-volt-400)_0%,transparent_65%)]"
        style={{ width: SIZE, height: SIZE, x: sx, y: sy, opacity }}
      />
    </div>
  );
}
