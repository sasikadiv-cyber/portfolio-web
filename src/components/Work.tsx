import { ARCHIVE, PROJECTS } from "../data/site";
import SectionHeader from "./SectionHeader";

export default function Work() {
  return (
    <section
      id="work"
      className="render-lazy mx-auto max-w-7xl scroll-mt-20 border-t border-line px-6 py-20 md:px-10 md:py-32"
    >
      <SectionHeader
        label="Work"
        title="A few recent projects, shown end to end."
        note="Each engagement covered strategy, design and — where useful — the front-end build."
      />

      <div className="grid gap-x-10 gap-y-16 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <article key={p.id} className="group card-lift">
            <a
              data-reveal
              href={`#/work/${p.id}`}
              aria-label={`Open the ${p.title} case study`}
              className="img-frame relative rounded-[18px] block overflow-hidden border border-line bg-paper-2"
            >
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                decoding="async"
                className="project-thumb img-soft aspect-[4/3] w-full object-cover"
              />
              {/* case study hover overlay */}
              <span className="project-overlay absolute inset-0 z-[2] flex items-center justify-center bg-paper/45 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100 max-md:opacity-100 max-md:items-end max-md:justify-end max-md:bg-transparent max-md:p-3 max-md:backdrop-blur-0">
                <span className="case-chip flex items-center gap-2.5 rounded-full border border-accent/60 bg-paper/90 px-4 py-2.5 text-[13px] text-ink transition-transform duration-500 md:scale-95 md:group-hover:scale-100 max-md:px-3 max-md:py-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M7 17 17 7" />
                    <path d="M9 7h8v8" />
                  </svg>
                  <span className="max-md:hidden">View case study</span>
                </span>
              </span>
            </a>

            <div
              data-reveal
              style={{ ["--rv-delay" as string]: "70ms" }}
              className="mt-6 flex items-baseline justify-between gap-4"
            >
              <h3 className="text-[18px] font-medium text-ink">
                <a
                  href={`#/work/${p.id}`}
                  className="u-link transition-colors hover:text-ink"
                >
                  {p.title}
                </a>
              </h3>
              <span className="text-[13px] text-mute">{p.year}</span>
            </div>

            <p
              data-reveal
              style={{ ["--rv-delay" as string]: "90ms" }}
              className="mt-1 text-[13.5px] text-mute"
            >
              {p.client} · {p.category}
            </p>

            <p
              data-reveal
              style={{ ["--rv-delay" as string]: "110ms" }}
              className="mt-5 max-w-md text-[14.5px] leading-[1.7] text-ink-2"
            >
              {p.description}
            </p>

            <p
              data-reveal
              style={{ ["--rv-delay" as string]: "130ms" }}
              className="mt-5 rounded-full border-l-2 border-accent pl-3 text-[13.5px] text-ink"
            >
              {p.outcome}
            </p>

            <ul
              data-reveal
              style={{ ["--rv-delay" as string]: "150ms" }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {p.tags.map((t) => (
                <li
                  key={t}
                  className="border border-line rounded-full px-2.5 py-1 text-[12px] text-mute"
                >
                  {t}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {/* archive banner */}
      <div
        data-reveal
        className="panel mt-20 flex flex-col gap-6 rounded-[20px] border border-line bg-paper-2 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10 md:py-10"
      >
        <div>
          <p className="label mb-3">Full archive</p>
          <p className="max-w-md text-[15px] leading-[1.7] text-ink-2">
            The archive holds all {ARCHIVE.length} projects with notes on each
            — every one designed, built and shipped end to end.
          </p>
        </div>
        <a
          href="#/work"
          className="group btn-lift inline-flex w-fit shrink-0 items-center gap-3 bg-ink rounded-full px-6 py-3.5 text-[14px] text-paper transition-opacity duration-200 hover:opacity-85"
        >
          View all work
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            &#8594;
          </span>
        </a>
      </div>
    </section>
  );
}
