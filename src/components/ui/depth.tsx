"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Pointer-driven 3D. Both components only write CSS custom properties — the
 * look itself lives in globals.css (.tilt-3d, .scene-3d) — so nothing here
 * re-renders on pointer move. Touch screens and prefers-reduced-motion get the
 * static pose.
 */
function canAnimate() {
  return matchMedia("(hover: hover) and (pointer: fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches;
}

interface TiltProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum tilt in degrees on each axis. */
  max?: number;
  glare?: boolean;
}

/** A surface that tilts toward the pointer, with an optional moving highlight. */
export function Tilt({ max = 7, glare = true, className, children, ...props }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canAnimate()) return;
    let rect = el.getBoundingClientRect();
    let raf = 0;

    // Measure on enter, before the transform applies — measuring a tilted box
    // would feed the tilt back into itself and jitter.
    const enter = () => {
      rect = el.getBoundingClientRect();
      el.setAttribute("data-tilt-active", "");
    };
    const move = (e: PointerEvent) => {
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--rx", `${((0.5 - y) * max * 2).toFixed(2)}deg`);
        el.style.setProperty("--ry", `${((x - 0.5) * max * 2).toFixed(2)}deg`);
        el.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
        el.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
      });
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      el.removeAttribute("data-tilt-active");
    };

    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [max]);

  return (
    <div ref={ref} className={cn("tilt-3d", className)} {...props}>
      {children}
      {glare && <span className="tilt-glare" aria-hidden />}
    </div>
  );
}

/**
 * Perspective stage whose `.scene-rig` children turn with the pointer anywhere
 * over the enclosing <section>, eased so the scene drifts rather than snaps.
 */
export function ParallaxScene({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canAnimate()) return;
    const host = el.closest("section") ?? el;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let raf = 0;

    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.setProperty("--px", x.toFixed(4));
      el.style.setProperty("--py", y.toFixed(4));
      raf = Math.abs(tx - x) > 0.001 || Math.abs(ty - y) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      tx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
      ty = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
      start();
    };
    const leave = () => {
      tx = 0;
      ty = 0;
      start();
    };

    host.addEventListener("pointermove", move as EventListener);
    host.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", move as EventListener);
      host.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={ref} className={cn("scene-3d", className)} {...props}>
      {children}
    </div>
  );
}
