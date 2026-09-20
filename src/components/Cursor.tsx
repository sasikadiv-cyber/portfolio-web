import { useEffect, useRef } from "react";
import { MEDIA } from "../data/site";

/* anything the visitor can act on grows the ring a touch */
const HOVER_SELECTOR =
  "a, button, [role='tab'], [role='button'], summary, [data-cursor]";
/* text controls keep the native caret — the cursor hides there */
const TEXT_SELECTOR = "input, textarea, select";

/**
 * Minimal gold cursor:
 *   - a small dot that follows the pointer with a soft ease
 *   - a plain ring trailing behind it, growing gently over links and
 *     buttons — it never wraps or snaps around the element itself
 *
 * Only runs on fine-pointer devices (mouse/trackpad), and never for
 * reduced-motion users. Set MEDIA.cursor.enabled to false to opt out.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MEDIA.cursor.enabled) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!fine || reduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("has-cursor");

    const mouse = { x: -100, y: -100 };
    const dotPos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let ringSize = MEDIA.cursor.ring;
    let hovering = false;
    let overText = false;
    let visible = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      visible = true;
      const t = e.target as HTMLElement | null;
      hovering = Boolean(t?.closest?.(HOVER_SELECTOR));
      overText = Boolean(t?.closest?.(TEXT_SELECTOR));
    };

    /* leaving the window hides both parts (mouseout without a destination) */
    const onOut = (e: MouseEvent) => {
      if (e.target === document.documentElement && !e.relatedTarget) {
        visible = false;
      }
    };

    const tick = () => {
      /* dot — soft eased follow */
      dotPos.x += (mouse.x - dotPos.x) * 0.32;
      dotPos.y += (mouse.y - dotPos.y) * 0.32;
      dot.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%) scale(${hovering ? 0.6 : 1})`;
      dot.style.opacity = visible && !overText ? "1" : "0";

      /* ring — trails behind, blooms slightly over interactive things */
      ringPos.x += (mouse.x - ringPos.x) * 0.14;
      ringPos.y += (mouse.y - ringPos.y) * 0.14;
      const target = hovering ? MEDIA.cursor.ringHover : MEDIA.cursor.ring;
      ringSize += (target - ringSize) * 0.16;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      ring.style.width = `${ringSize}px`;
      ring.style.height = `${ringSize}px`;
      ring.style.opacity = !visible || overText ? "0" : hovering ? "1" : "0.75";

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseout", onOut);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
    </>
  );
}
