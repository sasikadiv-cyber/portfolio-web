import { BANNER } from "../data/site";

/**
 * A cinematic title band for the inner pages — each route supplies its own
 * atmosphere, letterboxed with scrims so the title reads like a film card
 * and fades into the page below it.
 *
 * Controlled from src/data/site.ts → BANNER. Set enabled: false and every
 * page falls back to its plain header spacing.
 */
export default function PageBanner({
  page,
  label,
  title,
  note,
}: {
  page: keyof typeof BANNER.images;
  label: string;
  title: string;
  note?: string;
}) {
  const media = BANNER.images[page];

  if (!BANNER.enabled) {
    /* plain fallback keeps the old rhythm when the banner is switched off */
    return (
      <header className="mx-auto max-w-7xl px-6 pt-20 md:px-10 md:pt-28">
        <p className="label mb-6">{label}</p>
        <h1 className="max-w-2xl text-[clamp(2rem,5vw,3.4rem)] leading-[1.1] font-medium text-ink">
          {title}
        </h1>
        {note && (
          <p className="mt-7 max-w-md text-[14.5px] leading-[1.7] text-mute">
            {note}
          </p>
        )}
      </header>
    );
  }

  return (
    <header className="relative isolate flex min-h-[46vh] flex-col justify-end overflow-hidden md:min-h-[54vh]">
      {/* frame */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <img
          src={media.src}
          alt=""
          loading="eager"
          decoding="async"
          style={{ objectPosition: media.position }}
          className="banner-media h-full w-full object-cover"
        />
        {/* dark base so light type reads in both themes */}
        <div className="absolute inset-0 bg-[#08080a]/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a]/85 via-[#08080a]/35 to-transparent" />
        {/* fades into the page colour at the very bottom */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-paper" />
        <div className="cine-grain absolute inset-0" />
      </div>

      {/* title card */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 pt-28 md:px-10 md:pb-16 md:pt-36">
        <p data-reveal className="label mb-6 !text-[#d4af37]">
          {label}
        </p>
        <h1
          className="t-mask max-w-3xl text-[clamp(2.2rem,6.4vw,4.2rem)] leading-[1.03] font-medium tracking-[-0.03em] text-[#efece4]"
          style={{ ["--rv-delay" as string]: "60ms" }}
        >
          <span>{title}</span>
        </h1>
        {note && (
          <p
            data-reveal
            style={{ ["--rv-delay" as string]: "130ms" }}
            className="mt-6 max-w-md text-[14.5px] leading-[1.7] text-[#efece4]/70"
          >
            {note}
          </p>
        )}
      </div>
    </header>
  );
}
