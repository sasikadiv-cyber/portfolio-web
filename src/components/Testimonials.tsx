import { useEffect, useState } from "react";
import { TESTIMONIALS } from "../data/site";

const STAR_PATH =
  "M12 3.5 14.1 9.1 20.1 9.4 15.4 13.1 17 18.9 12 15.6 7 18.9 8.6 13.1 3.9 9.4 9.9 9.1 12 3.5Z";

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-3.5 w-3.5 ${filled ? "text-accent" : "text-line"}`}
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth="1.2"
      aria-hidden
    >
      <path d={STAR_PATH} />
    </svg>
  );
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % TESTIMONIALS.length),
      5500,
    );
    return () => window.clearInterval(id);
  }, [paused]);

  const go = (d: number) =>
    setIndex((i) => (i + d + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section
      id="testimonials"
      className="render-lazy mx-auto max-w-7xl scroll-mt-20 border-t border-line px-6 py-20 md:px-10 md:py-32"
    >
      <div>
        <p data-reveal className="label mb-10">
          What clients say
        </p>

        <div
          data-reveal
          style={{ ["--rv-delay" as string]: "90ms" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="overflow-hidden">
            <div
              className="flex"
              style={{
                transform: `translateX(-${index * 100}%)`,
                transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {TESTIMONIALS.map((t) => (
                <figure key={t.name} className="w-full shrink-0">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} filled={s < t.rating} />
                    ))}
                  </div>
                  <blockquote className="mt-5 max-w-2xl text-[15.5px] leading-[1.8] text-ink-2">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 flex flex-wrap items-baseline gap-x-2.5">
                    <span className="text-[14px] font-medium text-ink">
                      {t.name}
                    </span>
                    <span className="text-[13px] text-mute">— {t.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* controls */}
          <div className="mt-10 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => setIndex(i)}
                  aria-label={`Show testimonial ${i + 1} of ${TESTIMONIALS.length}`}
                  className="group grid h-5 w-5 cursor-pointer place-items-center"
                >
                  <span
                    className={`h-1 w-1 rounded-full transition-colors duration-300 ${
                      i === index ? "bg-accent" : "bg-line group-hover:bg-mute"
                    }`}
                  />
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="btn-icon grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-line text-ink transition-colors duration-200 hover:border-ink"
              >
                &#8592;
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="btn-icon grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-line text-ink transition-colors duration-200 hover:border-ink"
              >
                &#8594;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
