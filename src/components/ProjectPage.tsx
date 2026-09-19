import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  Gauge,
  Images,
  Layers,
  Monitor,
  Palette,
  Smartphone,
  Type,
  X,
} from "lucide-react";
import { ARCHIVE, PROJECT_DETAILS } from "../data/site";
import { useReveal } from "../lib/hooks";

type IconCmp = React.ComponentType<{ className?: string }>;
type Kind = "website" | "graphic" | "uiux";
type Mode = "desktop" | "mobile";

/* ------------------------------------------------------------------ */
/*  shared section heading                                             */
/* ------------------------------------------------------------------ */

function SectionHead({
  icon: Icon,
  label,
  title,
  note,
}: {
  icon: IconCmp;
  label: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
      <div className="flex items-center gap-4">
        <span
          data-reveal
          className="grid h-10 w-10 place-items-center rounded-[12px] border border-line text-accent"
        >
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <div>
          <p data-reveal className="label mb-1.5">
            {label}
          </p>
          <h2
            data-reveal
            style={{ ["--rv-delay" as string]: "60ms" }}
            className="text-[clamp(1.4rem,3vw,2rem)] font-medium text-ink"
          >
            {title}
          </h2>
        </div>
      </div>
      {note && (
        <p
          data-reveal
          style={{ ["--rv-delay" as string]: "120ms" }}
          className="max-w-sm text-[13.5px] leading-[1.7] text-mute"
        >
          {note}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  count-up engine shared by rings + stats                            */
/* ------------------------------------------------------------------ */

function useCountUp(target: number, delay: number, decimals = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const DUR = 1500;
    let raf = 0;
    const t0 = performance.now() + delay;
    const tick = (now: number) => {
      const t = Math.min(Math.max((now - t0) / DUR, 0), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Number((eased * target).toFixed(decimals)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, delay, decimals]);

  return { ref, inView, display };
}

/* ------------------------------------------------------------------ */
/*  website — animated lighthouse score ring                           */
/* ------------------------------------------------------------------ */

function ScoreRing({
  label,
  value,
  delay,
}: {
  label: string;
  value: number;
  delay: number;
}) {
  const { ref, inView, display } = useCountUp(value, delay);

  const R = 52;
  const C = 2 * Math.PI * R;
  /* Lighthouse palette — green for good scores, orange mid, red low */
  const tone =
    value >= 90 ? "#22c55e" : value >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <div
      ref={ref}
      data-reveal
      style={{ ["--rv-delay" as string]: `${delay}ms` }}
      className="flex flex-col items-center gap-4"
    >
      <div className="relative h-[118px] w-[118px] md:h-[136px] md:w-[136px]">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle
            cx="60"
            cy="60"
            r={R}
            fill="none"
            stroke="var(--color-line)"
            strokeWidth="6"
          />
          <circle
            cx="60"
            cy="60"
            r={R}
            fill="none"
            stroke={tone}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={inView ? C * (1 - value / 100) : C}
            style={{
              transition: `stroke-dashoffset 1500ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
            }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <span className="text-[26px] font-medium tracking-[-0.02em] text-ink md:text-[30px]">
            {display}
          </span>
        </div>
      </div>
      <p className="label !text-[10px]">{label}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ui/ux — measured outcome number                                    */
/* ------------------------------------------------------------------ */

function StatNumber({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  label,
  note,
  delay,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  note: string;
  delay: number;
}) {
  const { ref, display } = useCountUp(value, delay, decimals);

  return (
    <div
      ref={ref}
      data-reveal
      style={{ ["--rv-delay" as string]: `${delay}ms` }}
      className="panel rounded-[20px] border border-line bg-paper-2 p-7 md:p-9"
    >
      <p className="text-[clamp(2.2rem,4.6vw,3.4rem)] leading-none font-medium tracking-[-0.03em] text-ink">
        {prefix && <span className="text-accent">{prefix}</span>}
        {decimals > 0 ? display.toFixed(decimals) : display}
        {suffix && <span className="text-accent">{suffix}</span>}
      </p>
      <p className="mt-4 text-[15px] font-medium text-ink">{label}</p>
      <p className="mt-1.5 text-[13px] leading-[1.6] text-mute">{note}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  device frames                                                      */
/* ------------------------------------------------------------------ */

function BrowserChrome({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-line bg-paper-2 px-4 py-3">
      <span className="flex gap-1.5">
        <i className="h-2.5 w-2.5 rounded-full bg-line" />
        <i className="h-2.5 w-2.5 rounded-full bg-line" />
        <i className="h-2.5 w-2.5 rounded-full bg-accent/70" />
      </span>
      <span className="mx-auto flex w-full max-w-xs items-center justify-center gap-1.5 truncate rounded-full border border-line bg-paper px-3 py-1 text-[11px] text-mute">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80" />
        {url}
      </span>
      <span className="w-10" />
    </div>
  );
}

function DesktopShot({
  src,
  url,
  alt,
  eager = false,
}: {
  src: string;
  url: string;
  alt: string;
  eager?: boolean;
}) {
  return (
    <div className="img-frame rounded-[18px] overflow-hidden border border-line bg-paper-2">
      <BrowserChrome url={url} />
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        {...(eager ? { fetchPriority: "high" as const } : {})}
        className="aspect-[16/10] w-full object-cover object-top"
      />
    </div>
  );
}

function MobileShot({
  src,
  alt,
  eager = false,
}: {
  src: string;
  alt: string;
  eager?: boolean;
}) {
  return (
    <div className="mx-auto w-full">
      <div className="img-frame rounded-[2.2rem] border border-line bg-paper-2 p-[9px]">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-line">
          {/* notch */}
          <span className="absolute left-1/2 top-2 z-10 h-[18px] w-[86px] -translate-x-1/2 rounded-full bg-[#0a0a0c]" />
          <img
            src={src}
            alt={alt}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className="aspect-[9/19] w-full object-cover object-top"
          />
        </div>
        {/* home indicator */}
        <span className="mx-auto my-2 block h-1 w-16 rounded-full bg-line" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  case study page                                                    */
/* ------------------------------------------------------------------ */

export default function ProjectPage({
  id,
  onContact,
}: {
  id: string;
  onContact: () => void;
}) {
  useReveal(true, id);

  const item = ARCHIVE.find((p) => p.id === id);
  const detail = PROJECT_DETAILS[id];
  const [mode, setMode] = useState<Mode>("desktop");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const idx = ARCHIVE.findIndex((p) => p.id === id);
  const next = ARCHIVE[(idx + 1 + ARCHIVE.length) % ARCHIVE.length];

  /* ---- lightbox controls ---- */
  const gallery = detail?.gallery ?? [];
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const stepLightbox = useCallback(
    (dir: 1 | -1) =>
      setLightbox((cur) =>
        cur === null ? cur : (cur + dir + gallery.length) % gallery.length,
      ),
    [gallery.length],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") stepLightbox(1);
      if (e.key === "ArrowLeft") stepLightbox(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox, stepLightbox]);

  /* ---- unknown project guard ---- */
  if (!item || !detail) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-start justify-center px-6 py-32 md:px-10">
        <p className="label mb-6">404 — Case study</p>
        <h1 className="mb-8 text-[clamp(1.8rem,4vw,3rem)] font-medium text-ink">
          That project isn't in the archive.
        </h1>
        <a
          href="#/work"
          className="group inline-flex items-center gap-3 rounded-full border border-line px-5 py-3 text-[14px] text-ink transition-colors hover:border-ink"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to all work
        </a>
      </main>
    );
  }

  const kind: Kind =
    item.category === "Graphic Design"
      ? "graphic"
      : item.category === "UI/UX"
        ? "uiux"
        : "website";

  const scores = detail.scores
    ? [
        { label: "Performance", value: detail.scores.performance },
        { label: "Accessibility", value: detail.scores.accessibility },
        { label: "Best practices", value: detail.scores.bestPractices },
        { label: "SEO", value: detail.scores.seo },
      ]
    : [];

  return (
    <main className="mx-auto max-w-7xl px-6 pb-20 md:px-10 md:pb-28">
      {/* ---------------- header ---------------- */}
      <header className="pt-20 md:pt-28">
        <a
          data-reveal
          href="#/work"
          className="group mb-10 inline-flex items-center gap-2.5 text-[13px] text-mute transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          All work
        </a>

        <p data-reveal className="label mb-6">
          Case study — ({item.n})
        </p>

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
          <h1
            className="t-mask max-w-3xl text-[clamp(2.2rem,6vw,4.2rem)] leading-[1.05] font-medium text-ink"
            style={{ ["--rv-delay" as string]: "60ms" }}
          >
            <span>{item.title}</span>
          </h1>
          <p
            data-reveal
            style={{ ["--rv-delay" as string]: "120ms" }}
            className="max-w-sm text-[14.5px] leading-[1.7] text-mute"
          >
            {item.blurb}
          </p>
        </div>

        {/* meta strip */}
        <dl
          data-reveal
          style={{ ["--rv-delay" as string]: "180ms" }}
          className="mt-10 grid grid-cols-2 gap-y-6 border-y border-line py-6 sm:grid-cols-4 md:mt-14"
        >
          {[
            ["Client", item.client],
            ["Year", item.year],
            ["Category", item.category],
            ["Timeline", detail.timeline],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="label mb-2 !text-[10px]">{k}</dt>
              <dd className="text-[14.5px] text-ink">{v}</dd>
            </div>
          ))}
        </dl>

        {item.liveUrl && (
          <div
            data-reveal
            style={{ ["--rv-delay" as string]: "220ms" }}
            className="mt-6"
          >
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="group btn-lift inline-flex w-fit items-center gap-3 bg-ink rounded-full px-6 py-3.5 text-[14px] text-paper transition-opacity duration-200 hover:opacity-85"
            >
              Visit live site
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        )}
      </header>

      {/* ---------------- hero — per discipline ---------------- */}
      <div className="mt-14 md:mt-20">
        {kind === "website" && (
          <div data-reveal className="rv-media">
            <DesktopShot
              eager
              src={detail.screens.desktop}
              url={detail.screens.url}
              alt={`${item.title} — landing page on desktop`}
            />
          </div>
        )}

        {kind === "uiux" && (
          /* desktop behind, phone overlapping — the classic product shot */
          <div data-reveal className="rv-media relative md:pb-[9%]">
            <div className="md:w-[80%]">
              <DesktopShot
                eager
                src={detail.screens.desktop}
                url={detail.screens.url}
                alt={`${item.title} — product on desktop`}
              />
            </div>
            <div className="max-md:mx-auto max-md:mt-8 max-md:max-w-[250px] md:absolute md:bottom-0 md:right-[2%] md:w-[24%] md:min-w-[210px] md:max-w-[280px]">
              <MobileShot
                eager
                src={detail.screens.mobile}
                alt={`${item.title} — product on mobile`}
              />
            </div>
          </div>
        )}

        {kind === "graphic" && (
          <figure data-reveal className="rv-media">
            <div className="img-frame rounded-[18px] overflow-hidden border border-line bg-paper-2">
              <img
                src={detail.screens.desktop}
                alt={`${item.title} — campaign frame`}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
            <figcaption className="mt-4 flex items-center justify-between text-[12.5px] text-mute">
              <span>{item.client} — hero campaign frame</span>
              <span className="label !text-[10px]">Full bleed</span>
            </figcaption>
          </figure>
        )}
      </div>

      {/* ---------------- overview + facts ---------------- */}
      <section className="grid gap-y-12 border-b border-line py-16 md:grid-cols-12 md:gap-x-12 md:py-24">
        <div className="md:col-span-7">
          <p data-reveal className="label mb-8">
            Overview
          </p>
          {detail.overview.map((para, i) => (
            <p
              key={i}
              data-reveal
              style={{ ["--rv-delay" as string]: `${i * 80 + 60}ms` }}
              className="mb-6 max-w-2xl text-[16px] leading-[1.85] text-ink-2 md:text-[17px]"
            >
              {para}
            </p>
          ))}
        </div>

        <aside className="md:col-span-5">
          <div
            data-reveal
            className="panel rounded-[20px] border border-line bg-paper-2 p-7 md:p-9"
          >
            <p className="label mb-6">The brief</p>
            <div className="mb-7">
              <p className="label mb-2 !text-[10px]">Role</p>
              <p className="text-[14.5px] leading-[1.6] text-ink">
                {detail.role}
              </p>
            </div>
            <div>
              <p className="label mb-3 !text-[10px]">Deliverables</p>
              <ul className="space-y-2.5">
                {detail.deliverables.map((d) => (
                  <li
                    key={d}
                    className="flex items-center gap-3 text-[14px] text-ink-2"
                  >
                    <span className="h-px w-4 shrink-0 bg-accent" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </section>

      {/* ---------------- identity palette (graphic design) ---------------- */}
      {kind === "graphic" && detail.palette && (
        <section className="border-b border-line py-16 md:py-24">
          <SectionHead
            icon={Palette}
            label="Identity system"
            title="A palette with rules, not wishes"
            note="Every colour in the system has a named job — if it isn't here, it isn't used."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
            {detail.palette.map((c, i) => (
              <div
                key={c.hex}
                data-reveal
                style={{ ["--rv-delay" as string]: `${i * 80}ms` }}
                className="card-lift overflow-hidden rounded-[16px] border border-line bg-paper-2"
              >
                <div
                  className="h-28 md:h-32"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-[15px] font-medium text-ink">{c.name}</p>
                    <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-mute">
                      {c.hex}
                    </p>
                  </div>
                  <p className="mt-2 text-[12.5px] leading-[1.6] text-mute">
                    {c.usage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ---------------- typography specimens (graphic design) ---------------- */}
      {kind === "graphic" && detail.typefaces && (
        <section className="border-b border-line py-16 md:py-24">
          <SectionHead
            icon={Type}
            label="Typography"
            title="Two voices, never a third"
            note="The specimens below are set in system stand-ins — the licence files ship with the guidelines."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {detail.typefaces.map((t, i) => {
              const face =
                t.variant === "serif"
                  ? "font-serif text-[clamp(1.9rem,4.2vw,3.2rem)]"
                  : t.variant === "mono"
                    ? "font-mono text-[clamp(1rem,2.2vw,1.4rem)] tracking-tight"
                    : "font-sans text-[clamp(1.9rem,4.2vw,3.2rem)]";
              return (
                <div
                  key={t.family}
                  data-reveal
                  style={{ ["--rv-delay" as string]: `${i * 90}ms` }}
                  className="panel rounded-[20px] border border-line bg-paper-2 p-8 md:p-12"
                >
                  <div className="mb-8 flex items-baseline justify-between gap-4">
                    <p className="label !text-[10px]">{(i === 0 ? "Primary" : "Secondary")}</p>
                    <p className="font-mono text-[11px] text-mute">{t.family}</p>
                  </div>
                  <p className={`${face} leading-[1.15] text-ink`}>{t.sample}</p>
                  <p className="mt-8 text-[12.5px] leading-[1.6] text-mute">
                    {t.role}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ---------------- measured outcomes (ui/ux) ---------------- */}
      {kind === "uiux" && detail.stats && (
        <section className="border-b border-line py-16 md:py-24">
          <SectionHead
            icon={FlaskConical}
            label="Measured outcomes"
            title="Design decisions, receipt and all"
            note="Numbers gathered from analytics and the app stores after the redesign went live."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
            {detail.stats.map((s, i) => (
              <StatNumber
                key={s.label}
                value={s.value}
                decimals={s.decimals}
                prefix={s.prefix}
                suffix={s.suffix}
                label={s.label}
                note={s.note}
                delay={i * 110}
              />
            ))}
          </div>
        </section>
      )}

      {/* ---------------- toolset ---------------- */}
      <section className="border-b border-line py-16 md:py-24">
        <SectionHead
          icon={Layers}
          label={kind === "graphic" ? "The toolkit" : "The build"}
          title={
            kind === "graphic"
              ? "Drawn, printed & shipped with"
              : kind === "uiux"
                ? "Frameworks, languages & research rigs"
                : "Frameworks, languages & tooling"
          }
        />
        <div className="grid gap-y-10 md:grid-cols-2 md:gap-x-16 lg:grid-cols-3">
          {detail.stack.map((group, gi) => (
            <div
              key={group.group}
              data-reveal
              style={{ ["--rv-delay" as string]: `${gi * 70}ms` }}
            >
              <p className="label mb-4 flex items-center gap-2.5 !text-[10px]">
                <span className="h-px w-5 bg-accent" />
                {group.group}
              </p>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((tech) => (
                  <li
                    key={tech}
                    className="btn-lift cursor-default border border-line rounded-full px-3 py-1.5 text-[13px] text-ink-2 transition-colors duration-300 hover:border-accent hover:text-ink"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- lighthouse scores (websites) ---------------- */}
      {kind === "website" && detail.scores && (
        <section className="border-b border-line py-16 md:py-24">
          <SectionHead
            icon={Gauge}
            label="Measured, not promised"
            title="Audited at launch"
            note="Lighthouse audit on the production build — the numbers clients never ask about until something feels slow."
          />
          <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
            {scores.map((s, i) => (
              <ScoreRing
                key={s.label}
                label={s.label}
                value={s.value}
                delay={i * 120}
              />
            ))}
          </div>
        </section>
      )}

      {/* ---------------- device preview (websites + ui/ux) ---------------- */}
      {kind !== "graphic" && (
        <section className="border-b border-line py-16 md:py-24">
          <div className="mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div>
              <p data-reveal className="label mb-6">
                Responsive by design
              </p>
              <h2
                data-reveal
                style={{ ["--rv-delay" as string]: "60ms" }}
                className="max-w-xl text-[clamp(1.4rem,3vw,2rem)] leading-[1.2] font-medium text-ink"
              >
                One layout, every screen it will ever meet.
              </h2>
            </div>

            {/* desktop / mobile toggle */}
            <div
              data-reveal
              style={{ ["--rv-delay" as string]: "120ms" }}
              role="tablist"
              aria-label="Preview device"
              className="relative flex w-fit rounded-full border border-line"
            >
              <span
                className="absolute inset-y-0.5 mx-0.5 w-[calc(50%-4px)] rounded-full bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  transform:
                    mode === "mobile" ? "translateX(100%)" : "translateX(0)",
                }}
                aria-hidden
              />
              {(
                [
                  { key: "desktop", label: "Desktop", Icon: Monitor },
                  { key: "mobile", label: "Mobile", Icon: Smartphone },
                ] as const
              ).map(({ key, label, Icon }) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={mode === key}
                  onClick={() => setMode(key)}
                  className={`relative z-10 flex cursor-pointer items-center gap-2.5 px-6 py-3 text-[13.5px] transition-colors duration-300 ${
                    mode === key ? "text-paper" : "text-mute hover:text-ink"
                  } ${key === "desktop" && mode === "desktop" ? "rounded-l-full" : key === "mobile" && mode === "mobile" ? "rounded-r-full" : ""}`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div key={mode} className="fade-up">
            {mode === "desktop" ? (
              <DesktopShot
                src={detail.screens.desktop}
                url={detail.screens.url}
                alt={`${item.title} — desktop view`}
              />
            ) : (
              <div className="mx-auto w-full max-w-[300px]">
                <MobileShot
                  src={detail.screens.mobile}
                  alt={`${item.title} — mobile view`}
                />
              </div>
            )}
          </div>

          <p data-reveal className="mt-6 text-center text-[12.5px] text-mute">
            Viewing {mode === "desktop" ? "1440px desktop" : "390px mobile"} —
            key screens from the {item.client} project
          </p>
        </section>
      )}

      {/* ---------------- gallery ---------------- */}
      <section className="py-16 md:py-24">
        <SectionHead
          icon={Images}
          label="Gallery"
          title={
            kind === "graphic"
              ? "Art direction & print details"
              : kind === "uiux"
                ? "Screens & states"
                : "Art direction & details"
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 md:gap-6">
          {gallery.map((g, i) => (
            <button
              key={g.src}
              data-reveal
              style={{ ["--rv-delay" as string]: `${i * 70}ms` }}
              onClick={() => setLightbox(i)}
              className="group card-lift rounded-[18px] relative cursor-zoom-in overflow-hidden border border-line bg-paper-2 text-left"
              aria-label={`Open image: ${g.caption}`}
            >
              <img
                src={g.src}
                alt={g.caption}
                loading="lazy"
                decoding="async"
                className="img-soft h-[260px] w-full object-cover sm:h-[320px] lg:h-[380px]"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-gradient-to-t from-black/70 to-transparent px-5 pb-4 pt-10 text-[12.5px] text-white/90 opacity-0 transition-opacity duration-400 group-hover:opacity-100 max-md:opacity-100">
                {g.caption}
                <span className="label !text-[10px] !text-white/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ---------------- next project ---------------- */}
      <a
        data-reveal
        href={`#/work/${next.id}`}
        className="group panel mt-4 flex items-center justify-between gap-6 border border-line bg-paper-2 px-6 py-8 transition-colors duration-300 hover:border-accent md:px-10 md:py-12"
      >
        <div>
          <p className="label mb-3">Next case study</p>
          <p className="text-[clamp(1.5rem,3.4vw,2.6rem)] font-medium tracking-[-0.02em] text-ink">
            {next.title}
          </p>
          <p className="mt-2 text-[13.5px] text-mute">
            {next.client} · {next.year}
          </p>
        </div>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line text-ink transition-all duration-300 group-hover:border-accent group-hover:text-accent md:h-14 md:w-14">
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </a>

      {/* ---------------- contact cta ---------------- */}
      <div
        data-reveal
        className="mt-14 flex flex-col gap-6 border-t border-line pt-14 md:mt-20 md:flex-row md:items-end md:justify-between md:pt-20"
      >
        <div>
          <p className="label mb-4">Yours next?</p>
          <h2 className="max-w-md text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.2] font-medium text-ink">
            Need something built with this level of care?
          </h2>
        </div>
        <button
          onClick={onContact}
          className="btn-lift w-fit cursor-pointer bg-ink rounded-full px-5 py-3 text-[14px] text-paper transition-opacity duration-200 hover:opacity-85"
        >
          Start a conversation
        </button>
      </div>

      {/* ---------------- lightbox ---------------- */}
      {lightbox !== null && gallery[lightbox] && (
        <div
          className="lb-backdrop fixed inset-0 z-[95] flex flex-col bg-paper/95 backdrop-blur-md"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery"
        >
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
            <span className="label">
              {String(lightbox + 1).padStart(2, "0")} /{" "}
              {String(gallery.length).padStart(2, "0")}
            </span>
            <button
              onClick={closeLightbox}
              aria-label="Close gallery"
              className="btn-icon grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-6 pb-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                stepLightbox(-1);
              }}
              aria-label="Previous image"
              className="btn-icon absolute left-4 z-10 grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line bg-paper/70 text-ink transition-colors hover:border-accent hover:text-accent md:left-8"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <figure
              key={lightbox}
              className="lb-image flex max-h-full flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={gallery[lightbox].src}
                alt={gallery[lightbox].caption}
                decoding="async"
                className="max-h-[72vh] w-auto max-w-full rounded-[14px] border border-line object-contain"
              />
              <figcaption className="mt-4 text-[13px] text-mute">
                {gallery[lightbox].caption}
              </figcaption>
            </figure>

            <button
              onClick={(e) => {
                e.stopPropagation();
                stepLightbox(1);
              }}
              aria-label="Next image"
              className="btn-icon absolute right-4 z-10 grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line bg-paper/70 text-ink transition-colors hover:border-accent hover:text-accent md:right-8"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
