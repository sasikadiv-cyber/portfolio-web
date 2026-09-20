import { useState } from "react";
import { ARCHIVE } from "../data/site";
import PageBanner from "./PageBanner";
import { useReveal } from "../lib/hooks";

const FILTERS = ["All", "Website", "UI/UX", "Graphic Design"] as const;

function ArrowIcon() {
  return (
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
  );
}

export default function WorkPage({ onContact }: { onContact: () => void }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  useReveal(true, filter);

  const items = ARCHIVE.filter(
    (p) => filter === "All" || p.category === filter,
  );

  return (
    <main className="pb-20 md:pb-28">
      {/* cinematic header */}
      <PageBanner
        page="work"
        label="Archive — 2020 / 2026"
        title="The work, end to end."
        note={`${String(ARCHIVE.length).padStart(2, "0")} projects — websites, interfaces and graphic identities, each taken from first sketch to something shipped.`}
      />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* filters */}
        <div
          data-reveal
          style={{ ["--rv-delay" as string]: "180ms" }}
          className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-b border-line md:mt-14"
        >
          {FILTERS.map((f) => {
            const count =
              f === "All"
                ? ARCHIVE.length
                : ARCHIVE.filter((p) => p.category === f).length;
            const on = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`-mb-px cursor-pointer border-b pb-4 text-[14px] transition-colors duration-300 ${
                  on
                    ? "border-accent text-ink"
                    : "border-transparent text-mute hover:text-ink"
                }`}
                aria-pressed={on}
              >
                {f}{" "}
                <span className="text-[12px] text-mute">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* list */}
      <div key={filter} className="mx-auto max-w-7xl px-6 md:px-10">
        {items.map((p, i) => {
          const odd = i % 2 === 1;
          return (
            <article
              key={`${filter}-${p.id}`}
              className="group grid gap-y-7 py-10 md:grid-cols-12 md:gap-x-10 md:py-14"
            >
              {/* meta */}
              <div
                data-reveal
                className="order-1 flex items-baseline justify-between md:col-span-2 md:flex-col md:justify-start md:gap-2 md:pt-1"
              >
                <span className="text-[14px] text-accent">({p.n})</span>
                <span className="text-[13.5px] text-mute">{p.year}</span>
              </div>

              {/* image — clip reveal + inner zoom, links to case study */}
              <div
                className={`order-2 md:col-span-6 ${odd ? "md:order-3" : ""}`}
              >
                <div className="relative">
                  <a
                    data-reveal
                    style={{
                      ["--rv-delay" as string]: `${(i % 2) * 70 + 60}ms`,
                    }}
                    href={`#/work/${p.id}`}
                    aria-label={`Open the ${p.title} case study`}
                    className="img-frame rounded-[18px] rv-media rounded-[18px] block overflow-hidden border border-line bg-paper-2"
                  >
                    <img
                      src={p.image}
                      alt={`${p.title} — ${p.client}`}
                      loading={i < 2 ? "eager" : "lazy"}
                      decoding="async"
                      className="project-thumb img-soft aspect-[4/3] w-full object-cover"
                    />

                    {/* open the case study */}
                    <span className="project-overlay absolute inset-0 z-[2] flex items-center justify-center bg-paper/45 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100 max-md:opacity-100 max-md:items-end max-md:justify-end max-md:bg-transparent max-md:p-3 max-md:backdrop-blur-0">
                      <span className="case-chip flex items-center gap-2.5 rounded-full border border-accent/60 bg-paper/90 px-4 py-2.5 text-[13px] text-ink transition-transform duration-500 group-hover:scale-100 max-md:px-3 max-md:py-2 md:scale-95">
                        <ArrowIcon />
                        <span className="max-md:hidden">View case study</span>
                      </span>
                    </span>
                  </a>

                  {/* live site chip — sits above the case-link overlay */}
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Visit the live ${p.title} site`}
                      className="btn-lift absolute bottom-3.5 left-3.5 z-[3] flex items-center gap-2 rounded-full border border-line bg-paper/90 px-3.5 py-2 text-[12px] text-ink backdrop-blur-sm transition-colors duration-300 hover:border-accent"
                    >
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                      Live
                    </a>
                  )}
                </div>
              </div>

              {/* text */}
              <div
                className={`order-3 flex flex-col justify-between gap-8 md:col-span-4 ${
                  odd ? "md:order-2" : ""
                }`}
              >
                <div>
                  <p data-reveal className="label mb-3">
                    {p.client}
                  </p>
                  <h2
                    data-reveal
                    style={{ ["--rv-delay" as string]: "70ms" }}
                    className="text-[clamp(1.4rem,2.6vw,1.9rem)] font-medium text-ink"
                  >
                    <a href={`#/work/${p.id}`} className="u-link">
                      {p.title}
                    </a>
                  </h2>
                  <p
                    data-reveal
                    style={{ ["--rv-delay" as string]: "140ms" }}
                    className="mt-4 max-w-sm text-[14.5px] leading-[1.75] text-ink-2"
                  >
                    {p.blurb}
                  </p>
                </div>

                <div
                  data-reveal
                  style={{ ["--rv-delay" as string]: "210ms" }}
                >
                  <p className="mb-4 flex items-center gap-2.5 text-[13px] text-mute">
                    <span className="h-px w-6 bg-accent" />
                    {p.category}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li
                        key={t}
                        className="border border-line rounded-full px-2.5 py-1 text-[12px] text-mute"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* next step */}
      <div
        data-reveal
        className="mx-auto mt-14 flex max-w-7xl flex-col gap-6 border-t border-line px-6 pt-14 md:mt-20 md:flex-row md:items-end md:justify-between md:px-10 md:pt-20"
      >
        <div>
          <p className="label mb-4">Next</p>
          <h2 className="max-w-md text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.2] font-medium text-ink">
            Have something that belongs here?
          </h2>
        </div>
        <button
          onClick={onContact}
          className="btn-lift w-fit cursor-pointer bg-ink rounded-full px-5 py-3 text-[14px] text-paper transition-opacity duration-200 hover:opacity-85"
        >
          Start a conversation
        </button>
      </div>
    </main>
  );
}
