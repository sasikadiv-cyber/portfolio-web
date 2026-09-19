import { ArrowRight } from "lucide-react";
import { SERVICES } from "../data/site";
import { useReveal } from "../lib/hooks";

const STEPS = [
  {
    n: "01",
    t: "Discovery",
    d: "A short paid engagement to understand the business, the users and the constraints.",
  },
  {
    n: "02",
    t: "Direction",
    d: "Two or three directions explored quickly, reviewed together, one chosen.",
  },
  {
    n: "03",
    t: "Delivery",
    d: "The chosen direction designed and built into a complete, documented package.",
  },
  {
    n: "04",
    t: "Support",
    d: "Handover, and ongoing help as the work goes live and grows.",
  },
];

const STEP_ICONS = [
  /* discovery — search */
  <svg key="discovery" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="11" cy="11" r="6.4" />
    <path d="m15.8 15.8 4.2 4.2" />
  </svg>,
  /* direction — compass */
  <svg key="direction" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="8.6" />
    <path d="m15.4 8.6-1.9 4.9-4.9 1.9 1.9-4.9 4.9-1.9Z" />
  </svg>,
  /* delivery — box */
  <svg key="delivery" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 3 20.5 7.75v8.5L12 21l-8.5-4.75v-8.5L12 3Z" />
    <path d="M3.5 7.75 12 12.5l8.5-4.75" />
    <path d="M12 12.5V21" />
  </svg>,
  /* support — shield */
  <svg key="support" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 3 19.5 5.8v5.4c0 4.9-3.2 7.9-7.5 9.8-4.3-1.9-7.5-4.9-7.5-9.8V5.8L12 3Z" />
    <path d="m9.2 11.8 2 2 3.6-3.6" />
  </svg>,
];

export default function ServicesPage({
  onContact,
}: {
  onContact: () => void;
}) {
  useReveal(true);

  return (
    <main className="mx-auto max-w-7xl px-6 pb-20 md:px-10 md:pb-28">
      {/* ---------------- header ---------------- */}
      <header className="pt-20 md:pt-28">
        <p data-reveal className="label mb-6">
          Services
        </p>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-16">
          <h1
            className="t-mask max-w-2xl text-[clamp(2rem,5vw,3.4rem)] leading-[1.1] font-medium text-ink"
            style={{ ["--rv-delay" as string]: "60ms" }}
          >
            <span>Four things I do, and how a project runs.</span>
          </h1>
          <p
            data-reveal
            style={{ ["--rv-delay" as string]: "120ms" }}
            className="max-w-sm text-[14.5px] leading-[1.7] text-mute"
          >
            Projects typically run two to twelve weeks. Retainers are
            available for ongoing development work.
          </p>
        </div>
      </header>

      {/* ---------------- service cards ---------------- */}
      <section className="mt-14 grid gap-6 sm:grid-cols-2 md:mt-20 md:gap-8">
        {SERVICES.map((s, i) => (
          <article
            key={s.title}
            data-reveal
            style={{ ["--rv-delay" as string]: `${i * 80}ms` }}
            className="card-lift rounded-[20px] border border-line bg-paper-2 p-8 md:p-10"
          >
            <p className="label mb-4 !text-[10px]">
              ({String(i + 1).padStart(2, "0")})
            </p>
            <h2 className="text-[clamp(1.15rem,2.4vw,1.5rem)] font-medium text-ink">
              {s.title}
            </h2>
            <p className="mt-4 text-[14.5px] leading-[1.75] text-ink-2">
              {s.text}
            </p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {s.items.map((it) => (
                <li
                  key={it}
                  className="rounded-full border border-line px-3 py-1.5 text-[12.5px] text-mute transition-colors duration-300 hover:border-accent hover:text-ink"
                >
                  {it}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      {/* ---------------- process ---------------- */}
      <section className="mt-20 rounded-[24px] border border-line bg-paper-2 px-6 py-12 md:mt-28 md:px-14 md:py-16">
        <p data-reveal className="label mb-4 text-center">
          How a project runs
        </p>
        <h2
          data-reveal
          style={{ ["--rv-delay" as string]: "70ms" }}
          className="mx-auto mb-14 max-w-md text-center text-[clamp(1.3rem,3vw,1.9rem)] leading-[1.25] font-medium text-ink"
        >
          From first call to handover, in four steps.
        </h2>
        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li
              key={s.n}
              data-reveal
              style={{ ["--rv-delay" as string]: `${i * 80 + 140}ms` }}
              className="text-center"
            >
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-line bg-paper text-accent">
                {STEP_ICONS[i]}
              </span>
              <h3 className="mt-5 flex items-baseline justify-center gap-2.5 text-[15.5px] font-medium text-ink">
                <span className="text-[13px] font-normal text-accent">
                  {s.n}
                </span>
                {s.t}
              </h3>
              <p className="mx-auto mt-2.5 max-w-[240px] text-[14px] leading-[1.65] text-mute">
                {s.d}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------------- cta ---------------- */}
      <div
        data-reveal
        className="mt-20 flex flex-col gap-6 rounded-[20px] border border-line bg-paper-2 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10 md:py-10"
      >
        <div>
          <p className="label mb-3">Ready?</p>
          <p className="max-w-md text-[clamp(1.2rem,2.6vw,1.7rem)] leading-[1.3] font-medium text-ink">
            Two to twelve weeks from first call to launch day.
          </p>
        </div>
        <button
          onClick={onContact}
          className="group btn-lift inline-flex w-fit shrink-0 cursor-pointer items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-[14px] text-paper transition-opacity duration-200 hover:opacity-85"
        >
          Book a discovery call
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </main>
  );
}
