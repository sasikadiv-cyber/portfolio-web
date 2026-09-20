import { useEffect, useRef } from "react";
import { HERO_IMAGE, PROFILE } from "../data/site";
import { useClock } from "../lib/hooks";

const TITLE =
  "Web developer and designer building clear, considered digital work.";

/* headline rises word by word from behind its own line boxes.
   Spaces sit as plain text between the masks, so the browser keeps its
   natural word spacing — accessible name still reads the full sentence. */
function WordCascade({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <span aria-label={text} role="heading" aria-level={1}>
      {words.map((w, i) => (
        <span key={i}>
          <span aria-hidden className="w-mask">
            <span style={{ animationDelay: `${280 + i * 55}ms` }}>{w}</span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const time = useClock(PROFILE.timezone);
  const mediaRef = useRef<HTMLDivElement>(null);

  /* gentle mouse parallax — the frame leans a few pixels toward the cursor */
  useEffect(() => {
    const el = mediaRef.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 18;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 12;
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.06;
      pos.y += (target.y - pos.y) * 0.06;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    const section = el.closest("section");
    section?.addEventListener("mousemove", onMove, { passive: true } as never);
    section?.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      section?.removeEventListener("mousemove", onMove);
      section?.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="top" className="relative overflow-hidden">
      {/* cinematic background — slight bleed so the parallax never shows edges */}
      <div
        ref={mediaRef}
        className="absolute -inset-[4%] z-0 will-change-transform"
        aria-hidden
      >
        <img
          src={HERO_IMAGE}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="hero-bg h-full w-full object-cover"
        />
        {/* readability gradients — themed, as before */}
        <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/80 to-paper/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/15 to-paper/45" />
      </div>

      {/* content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-70px)] max-w-7xl flex-col justify-center px-6 py-24 md:px-10 md:py-32">
        {/* status — sonar dot, label, drawn rule */}
        <div data-reveal className="flex items-center gap-2.5">
          <span className="sonar h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="label">Available for work — Q2 2026</span>
          <span className="rule-draw ml-3 hidden sm:block" />
        </div>

        {/* headline — word by word */}
        <h1 className="mt-10 max-w-3xl text-[clamp(2rem,5.2vw,3.6rem)] leading-[1.25] font-medium text-ink">
          <WordCascade text={TITLE} />
        </h1>

        <p
          data-reveal
          style={{ ["--rv-delay" as string]: "650ms" }}
          className="mt-8 max-w-xl text-[15.5px] leading-[1.75] text-ink-2"
        >
          {PROFILE.intro}
        </p>

        <div
          data-reveal
          style={{ ["--rv-delay" as string]: "850ms" }}
          className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4"
        >
          <a
            href="#/work"
            className="group shine btn-lift inline-flex items-center gap-2.5 rounded-full bg-ink px-5 py-3 text-[14px] text-paper transition-opacity duration-200 hover:opacity-85"
          >
            View my work
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              &#8594;
            </span>
          </a>
          <a
            href="#/contact"
            className="btn-lift rounded-full border border-line px-5 py-3 text-[14px] text-ink transition-colors duration-200 hover:border-ink"
          >
            Start a project
          </a>
          <span className="text-[13.5px] text-mute">
            {PROFILE.location} · {time} local
          </span>
        </div>
      </div>
    </section>
  );
}
