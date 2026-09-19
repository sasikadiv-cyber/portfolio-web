import { useCallback, useEffect, useRef, useState } from "react";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Preloader from "./components/Preloader";
import ProjectPage from "./components/ProjectPage";
import ServicesPage from "./components/ServicesPage";
import Testimonials from "./components/Testimonials";
import Work from "./components/Work";
import WorkPage from "./components/WorkPage";
import { ARCHIVE } from "./data/site";
import { useReveal } from "./lib/hooks";
import { destroyLenis, initLenis, smoothTo } from "./lib/lenis";

type Route = "home" | "work" | "project" | "about" | "services" | "contact";
type Phase = "idle" | "cover" | "reveal";

const routeFromHash = (h: string): Route =>
  h.startsWith("#/work/")
    ? "project"
    : h.startsWith("#/work")
      ? "work"
      : h === "#/about"
        ? "about"
        : h === "#/services"
          ? "services"
          : h === "#/contact"
            ? "contact"
            : "home";

const idFromHash = (h: string): string | null =>
  h.startsWith("#/work/")
    ? decodeURIComponent(h.slice("#/work/".length).replace(/\/+$/, ""))
    : null;

const COVER_MS = 720;

/* the cinematic preloader plays once per browser session — a reload in the
   same session skips it, a fresh session (new tab / browser restart) sees it */
const PRELOADER_KEY = "preloader-seen";

const preloaderSeen = () => {
  try {
    return sessionStorage.getItem(PRELOADER_KEY) === "1";
  } catch {
    return false; /* storage blocked → let it play */
  }
};

export default function App() {
  /* skip the preloader entirely if this session has already seen it */
  const [ready, setReady] = useState(preloaderSeen);
  const [route, setRoute] = useState<Route>(() =>
    routeFromHash(window.location.hash),
  );
  const [projId, setProjId] = useState<string | null>(() =>
    idFromHash(window.location.hash),
  );
  const [page, setPage] = useState<Route>(route);
  const [pageId, setPageId] = useState<string | null>(projId);
  const [phase, setPhase] = useState<Phase>("idle");
  const pendingSection = useRef<string | null>(null);
  const timers = useRef<number[]>([]);

  useReveal(ready, page + (pageId ?? ""));

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);
  useEffect(() => clearTimers, [clearTimers]);

  /* mark the session the moment the preloader starts, so even a reload
     mid-animation never replays it */
  useEffect(() => {
    if (ready) return;
    try {
      sessionStorage.setItem(PRELOADER_KEY, "1");
    } catch {
      /* ignore — worst case it replays */
    }
  }, [ready]);

  /* lock scroll during load + transitions */
  useEffect(() => {
    document.body.style.overflow =
      !ready || phase !== "idle" ? "hidden" : "";
  }, [ready, phase]);

  /* track hash */
  useEffect(() => {
    const onHash = () => {
      setRoute(routeFromHash(window.location.hash));
      setProjId(idFromHash(window.location.hash));
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  /* smooth scrolling + same-page anchor links */
  useEffect(() => {
    initLenis();
    const onAnchorClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      if (href.length < 2 || href.startsWith("#/")) return;
      const el = document.getElementById(href.slice(1));
      if (!el) return;
      e.preventDefault();
      smoothTo(el);
    };
    document.addEventListener("click", onAnchorClick);
    return () => {
      document.removeEventListener("click", onAnchorClick);
      destroyLenis();
    };
  }, []);

  const finishSwap = useCallback((r: Route) => {
    setPhase("idle");
    const s = pendingSection.current;
    pendingSection.current = null;
    if (r === "home" && s) {
      window.setTimeout(() => smoothTo(`#${s}`), 40);
    }
  }, []);

  const sameSpot = route === page && projId === pageId;

  /* run the curtain transition when the route (or project id) changes */
  useEffect(() => {
    if (sameSpot) return;
    clearTimers();
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const swap = () => {
      setPage(route);
      setPageId(projId);
      window.scrollTo(0, 0);
      if (reduced) {
        finishSwap(route);
        return;
      }
      setPhase("reveal");
      const t2 = window.setTimeout(() => finishSwap(route), COVER_MS);
      timers.current.push(t2);
    };

    if (reduced) {
      timers.current.push(window.setTimeout(swap, 60));
    } else {
      setPhase("cover");
      timers.current.push(window.setTimeout(swap, COVER_MS));
    }
  }, [sameSpot, route, projId, clearTimers, finishSwap]);

  /* navigate home, optionally to a section */
  const goHome = useCallback((section?: string) => {
    pendingSection.current = section ?? null;
    if (routeFromHash(window.location.hash) === "home") {
      if (section) {
        smoothTo(`#${section}`);
      } else {
        smoothTo(0);
      }
    } else {
      window.location.hash = "#/";
    }
  }, []);

  const goContact = useCallback(() => {
    window.location.hash = "#/contact";
  }, []);

  /* label shown on the curtain mid-transition */
  const curtainLabel =
    route === "project"
      ? (ARCHIVE.find((p) => p.id === projId)?.title ?? "Case study")
      : route === "work"
        ? "Work"
        : route === "about"
          ? "About"
          : route === "services"
            ? "Services"
            : route === "contact"
              ? "Contact"
              : "Home";

  return (
    <div className="app-bg min-h-screen bg-paper">
      {!ready && <Preloader onDone={() => setReady(true)} />}

      {/* page transition curtain */}
      <div
        className="fixed inset-0 z-[90] bg-paper"
        style={{
          pointerEvents: phase === "idle" ? "none" : "auto",
          transform:
            phase === "cover"
              ? "translateX(0)"
              : phase === "reveal"
                ? "translateX(101%)"
                : "translateX(-101%)",
          transition:
            phase === "idle"
              ? "none"
              : `transform ${COVER_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`,
          boxShadow: "0 0 80px rgba(0, 0, 0, 0.45)",
        }}
        aria-hidden
      >
        <div className="absolute inset-y-0 right-0 w-px bg-accent/50" />
        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-3">
          <span className="h-1 w-1 rounded-full bg-accent" />
          <span className="label !text-ink/70">{curtainLabel}</span>
        </div>
      </div>

      <Nav route={route} goHome={goHome} />

      {page === "project" && pageId ? (
        <ProjectPage key={pageId} id={pageId} onContact={goContact} />
      ) : page === "work" ? (
        <WorkPage onContact={goContact} />
      ) : page === "about" ? (
        <AboutPage onContact={goContact} />
      ) : page === "services" ? (
        <ServicesPage onContact={goContact} />
      ) : page === "contact" ? (
        <ContactPage />
      ) : (
        /* home — minimal landing page */
        <main>
          <Hero />
          <Work />
          <Testimonials />
        </main>
      )}

      <Footer route={route} goHome={goHome} />
    </div>
  );
}
