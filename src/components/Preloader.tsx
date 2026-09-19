import { useEffect, useRef, useState } from "react";

const SENTENCES = [
  "Reading the brief.",
  "Arranging the type.",
  "Polishing the pixels.",
  "Opening the portfolio.",
];

const LOAD_MS = 6000;
const NAME_MS = 5000;
const SWAP_MS = 750;
const EXIT_MS = 900;

/** the initial, drawn as a single stroke starting at the top */
const S_PATH =
  "M 72 27 C 72 17, 61 12, 50 12 C 37 12, 27 19, 27 31 C 27 43, 37 48, 50 50 C 63 52, 73 58, 73 69 C 73 81, 63 88, 50 88 C 40 88, 29 84, 27 77";

type Phase = "loading" | "name" | "exit";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [sentence, setSentence] = useState(0);
  const [phase, setPhase] = useState<Phase>("loading");
  const [loadGone, setLoadGone] = useState(false);
  const timers = useRef<number[]>([]);

  /* the initial: outline draws over the first 80% of the load, the color fill wipes in over the last 20% */
  const drawP = Math.min(1, progress / 0.8);
  const fillP = Math.max(0, Math.min(1, (progress - 0.8) / 0.2));

  const later = (fn: () => void, ms: number) =>
    timers.current.push(window.setTimeout(fn, ms));

  useEffect(() => () => {
    timers.current.forEach((t) => window.clearTimeout(t));
  }, []);

  /* ---- loading phase: 8s eased progress ---- */
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const duration = reduced ? 500 : LOAD_MS;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setProgress(1 - Math.pow(1 - p, 3));
      setSentence(
        Math.min(SENTENCES.length - 1, Math.floor(p * SENTENCES.length)),
      );
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        later(() => setPhase("name"), 400);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---- phase sequencing ---- */
  useEffect(() => {
    if (phase === "name") {
      later(() => setLoadGone(true), SWAP_MS);
      later(() => setPhase("exit"), NAME_MS);
    } else if (phase === "exit") {
      later(onDone, EXIT_MS + 80);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-paper"
      style={{
        transform: phase === "exit" ? "translateY(-101%)" : "none",
        transition: `transform ${EXIT_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`,
      }}
      role="status"
      aria-label="Loading portfolio"
    >
      {/* ---- loading: centered bar + sliding sentences ---- */}
      {!loadGone && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-out"
          style={{
            opacity: phase === "loading" ? 1 : 0,
            filter: phase === "loading" ? "none" : "blur(5px)",
            transform:
              phase === "loading"
                ? "none"
                : "translateY(14px) scale(0.985)",
          }}
        >
          {/* the initial — drawn from the top, filled as the bar completes */}
          <svg
            viewBox="0 0 100 100"
            className="h-11 w-11 md:h-12 md:w-12"
            style={{ filter: "drop-shadow(0 0 20px rgba(212, 175, 55, 0.3))" }}
            aria-hidden
          >
            <defs>
              <clipPath id="s-fill-clip" clipPathUnits="userSpaceOnUse">
                <rect
                  x="12"
                  y="-10"
                  width={Math.max(0, 76 * fillP)}
                  height="120"
                />
              </clipPath>
            </defs>

            {/* fill layer — a heavy stroke wipes in over the final fifth */}
            <path
              d={S_PATH}
              fill="none"
              strokeWidth="13"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              clipPath="url(#s-fill-clip)"
              style={{ stroke: "var(--color-accent)" }}
            />

            {/* outline layer — draws from the top with the bar */}
            <path
              d={S_PATH}
              fill="none"
              strokeWidth="3.5"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              pathLength={100}
              style={{
                stroke: "var(--color-accent)",
                strokeDasharray: 100,
                strokeDashoffset: 100 * (1 - drawP),
              }}
            />
          </svg>

          <div className="relative mt-8 h-px w-[240px] bg-line md:mt-9 md:w-[340px]">
            <div
              className="absolute inset-y-0 left-0 bg-accent"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          {/* sentences slide in from top */}
          <div className="relative mt-8 h-5 w-[240px] overflow-hidden md:w-[340px]">
            {SENTENCES.map((s, i) => (
              <p
                key={s}
                className="absolute inset-0 text-center text-[13px] tracking-[0.01em] text-mute"
                style={{
                  opacity: sentence === i ? 1 : 0,
                  transform:
                    sentence === i
                      ? "none"
                      : i < sentence
                        ? "translateY(115%)"
                        : "translateY(-115%)",
                  transition:
                    "opacity 0.55s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                {s}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* ---- name drawn like the iPhone "Hello" ---- */}
      {(phase === "name" || phase === "exit") && (
        <div className="name-enter absolute inset-0 flex flex-col items-center justify-center px-6">
          <svg
            viewBox="0 0 900 150"
            className="w-[86%] max-w-[620px] sm:w-full"
            style={{
              filter: "drop-shadow(0 0 22px rgba(212, 175, 55, 0.18))",
            }}
            aria-hidden
          >
            {/* outline layer — strokes draw on */}
            <text
              x="450"
              y="104"
              textAnchor="middle"
              fill="none"
              className="draw-text"
            >
              Sasika Randunuge
            </text>
            {/* fill layer — wipes in left to right */}
            <text
              x="450"
              y="104"
              textAnchor="middle"
              className="fill-text"
            >
              Sasika Randunuge
            </text>
          </svg>

          {/* kept on a single line, always narrower than the name above it */}
          <p className="role-enter label mt-5 whitespace-nowrap !text-[clamp(7.5px,2.2vw,11px)] !text-ink/60 md:mt-7">
            Web Developer · UI/UX &amp; Graphic Designer
          </p>
        </div>
      )}
    </div>
  );
}
