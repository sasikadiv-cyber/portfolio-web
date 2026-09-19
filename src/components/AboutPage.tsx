import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { CLIENTS, EXPERIENCE, PORTRAIT, PROFILE, STATS } from "../data/site";
import { useReveal } from "../lib/hooks";

/** Counts up to a value like "12" or "80+" when scrolled into view. */
function StatValue({ value }: { value: string }) {
  const target = parseInt(value, 10);
  const suffix = Number.isNaN(target) ? "" : value.slice(String(target).length);
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || done.current) return;
          done.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / 1400);
            setN(Math.round((1 - Math.pow(1 - p, 3)) * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  if (Number.isNaN(target)) return <span>{value}</span>;
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export default function AboutPage({ onContact }: { onContact: () => void }) {
  useReveal(true);

  return (
    <main className="mx-auto max-w-7xl px-6 pb-20 md:px-10 md:pb-28">
      {/* ---------------- header ---------------- */}
      <header className="pt-20 md:pt-28">
        <p data-reveal className="label mb-6">
          About
        </p>
        <h1
          className="t-mask max-w-2xl text-[clamp(2rem,5vw,3.4rem)] leading-[1.1] font-medium text-ink"
          style={{ ["--rv-delay" as string]: "60ms" }}
        >
          <span>An independent practice, built on clarity.</span>
        </h1>
      </header>

      {/* ---------------- portrait + story ---------------- */}
      <section className="mt-14 grid gap-y-12 border-b border-line pb-16 md:mt-20 md:grid-cols-12 md:gap-x-12 md:pb-24">
        <div className="md:col-span-4">
          <div
            data-reveal
            className="img-frame rv-media group rounded-[18px] overflow-hidden border border-line"
          >
            <img
              src={PORTRAIT}
              alt={`Portrait of ${PROFILE.name}`}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="img-portrait aspect-[4/5] w-full object-cover"
            />
          </div>
          <p data-reveal className="mt-5 text-[13px] text-mute">
            {PROFILE.name}, {PROFILE.location}
          </p>

          {/* availability chip */}
          <div
            data-reveal
            style={{ ["--rv-delay" as string]: "120ms" }}
            className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-line px-4 py-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_0_3px_rgba(212,175,55,0.15)]" />
            <span className="text-[13px] text-ink-2">
              Booking from Q2 2026
            </span>
          </div>
        </div>

        <div className="md:col-span-8">
          <div className="max-w-2xl space-y-6">
            <p data-reveal className="text-[16px] leading-[1.85] text-ink-2 md:text-[17px]">
              I've spent twelve years between design and code — starting in
              graphic design shops, moving through UI/UX roles, and since 2019
              working independently as a developer and designer from Kandy.
              Most of my work sits where the two meet: a business needs to
              look credible and the website needs to work properly, and both
              should feel like the same idea.
            </p>
            <p
              data-reveal
              style={{ ["--rv-delay" as string]: "110ms" }}
              className="text-[16px] leading-[1.85] text-ink-2 md:text-[17px]"
            >
              I work directly with founders and small teams, without layers in
              between. Because I write the production front-end for the
              interfaces I design, there's no gap between what was designed
              and what ships.
            </p>
          </div>

          {/* stats */}
          <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                data-reveal
                style={{ ["--rv-delay" as string]: `${i * 80}ms` }}
              >
                <dt className="text-[26px] leading-none font-medium text-ink md:text-[30px]">
                  <StatValue value={s.value} />
                </dt>
                <dd className="mt-2 text-[13px] leading-[1.5] text-mute">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------------- experience ---------------- */}
      <section className="border-b border-line py-16 md:py-24">
        <p data-reveal className="label mb-10">
          Experience
        </p>
        <ol className="divide-y divide-line border-y border-line">
          {EXPERIENCE.map((x, i) => (
            <li
              key={x.period}
              data-reveal
              style={{ ["--rv-delay" as string]: `${i * 70}ms` }}
              className="group grid gap-y-2 py-7 transition-colors duration-300 md:grid-cols-12 md:items-baseline md:gap-x-8 md:py-8"
            >
              <span className="text-[13.5px] text-mute md:col-span-3">
                {x.period}
              </span>
              <span className="text-[16px] font-medium text-ink md:col-span-4">
                {x.role}
              </span>
              <span className="text-[14px] text-mute md:col-span-2">
                {x.org}
              </span>
              <span className="max-w-sm text-[13.5px] leading-[1.6] text-mute md:col-span-3 md:text-right">
                {x.note}
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------------- clients marquee ---------------- */}
      <section className="overflow-hidden py-16 md:py-20">
        <p data-reveal className="label mb-8 text-center">
          Selected clients
        </p>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-paper to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-paper to-transparent" />
          <div className="marquee flex w-max gap-14 md:gap-20">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <span
                key={`${c}-${i}`}
                className="whitespace-nowrap text-[clamp(1.2rem,2.6vw,1.8rem)] font-medium text-mute/70 transition-colors duration-300 hover:text-ink"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- cta ---------------- */}
      <div
        data-reveal
        className="mt-4 flex flex-col gap-6 rounded-[20px] border border-line bg-paper-2 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10 md:py-10"
      >
        <div>
          <p className="label mb-3">Work together</p>
          <p className="max-w-md text-[clamp(1.2rem,2.6vw,1.7rem)] leading-[1.3] font-medium text-ink">
            Tell me what you're building — I'll show you how it could look.
          </p>
        </div>
        <button
          onClick={onContact}
          className="group btn-lift inline-flex w-fit shrink-0 cursor-pointer items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-[14px] text-paper transition-opacity duration-200 hover:opacity-85"
        >
          Start a conversation
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </main>
  );
}
