import { useEffect, useState } from "react";

/** Adds `.is-in` to any [data-reveal] element once it enters the viewport. */
export function useReveal(active = true, dep: unknown = 0) {
  useEffect(() => {
    if (!active) return;
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal], .t-mask"),
    );
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((el) => io.observe(el));

    // safety net — nothing may stay invisible if the observer misses it
    const failsafe = window.setTimeout(() => {
      document
        .querySelectorAll<HTMLElement>(
          "[data-reveal]:not(.is-in), .t-mask:not(.is-in)",
        )
        .forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight * 1.2) el.classList.add("is-in");
        });
    }, 1200);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, dep]);
}

/** Simple scrolled-past-threshold flag. */
export function useScrolled(offset = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);
  return scrolled;
}

/** Currently visible section id. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight * 0.35;
      let current = "";
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= mid) current = id;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids]);
  return active;
}

/** Local time string for a timezone. */
export function useClock(timeZone: string) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30000);
    return () => window.clearInterval(id);
  }, [timeZone]);
  return time;
}
