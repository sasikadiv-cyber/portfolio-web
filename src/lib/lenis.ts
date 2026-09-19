import Lenis from "lenis";

let lenis: Lenis | null = null;
let rafId = 0;

/** Start the smooth-scroll loop (skipped for reduced motion). */
export function initLenis() {
  if (lenis) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  const raf = (time: number) => {
    lenis?.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);
}

/** Stop the loop and release the instance. */
export function destroyLenis() {
  cancelAnimationFrame(rafId);
  rafId = 0;
  lenis?.destroy();
  lenis = null;
}

/** Smooth scroll to a selector, element or y position. */
export function smoothTo(
  target: string | HTMLElement | number,
  offset = -80,
) {
  if (lenis) {
    lenis.scrollTo(target, { offset });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else if (typeof target === "string") {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}
