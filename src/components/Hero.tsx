import { PROFILE } from "../data/site";
import { useClock } from "../lib/hooks";

export default function Hero() {
  const time = useClock(PROFILE.timezone);

  return (
    <section id="top" className="relative overflow-hidden">
      {/* cinematic background */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <img
          src="/images/hero-cinematic.jpg"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="hero-bg h-full w-full object-cover"
        />
        {/* readability gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/80 to-paper/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/15 to-paper/45" />
      </div>

      {/* content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-70px)] max-w-7xl flex-col justify-center px-6 py-24 md:px-10 md:py-32">
        <div data-reveal className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_0_3px_rgba(212,175,55,0.15)]" />
          <span className="label">Available for work — Q2 2026</span>
        </div>

        <h1
          className="t-mask mt-10 max-w-3xl text-[clamp(2rem,5.2vw,3.6rem)] leading-[1.12] font-medium text-ink"
          style={{ ["--rv-delay" as string]: "60ms" }}
        >
          <span>
            Web developer and designer building clear, considered digital work.
          </span>
        </h1>

        <p
          data-reveal
          style={{ ["--rv-delay" as string]: "120ms" }}
          className="mt-10 max-w-xl text-[15.5px] leading-[1.75] text-ink-2"
        >
          {PROFILE.intro}
        </p>

        <div
          data-reveal
          style={{ ["--rv-delay" as string]: "180ms" }}
          className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4"
        >
          <a
            href="#/work"
            className="group btn-lift inline-flex items-center gap-2.5 rounded-full bg-ink px-5 py-3 text-[14px] text-paper transition-opacity duration-200 hover:opacity-85"
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
