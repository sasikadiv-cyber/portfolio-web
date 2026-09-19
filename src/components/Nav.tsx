import { useEffect, useState } from "react";
import { PROFILE } from "../data/site";
import { useScrolled } from "../lib/hooks";
import ThemeToggle from "./ThemeToggle";

type Route = "home" | "work" | "project" | "about" | "services" | "contact";

const PAGE_LINKS: { id: Route; href: string; label: string }[] = [
  { id: "work", href: "#/work", label: "Work" },
  { id: "about", href: "#/about", label: "About" },
  { id: "services", href: "#/services", label: "Services" },
  { id: "contact", href: "#/contact", label: "Contact" },
];

export default function Nav({
  route,
  goHome,
}: {
  route: Route;
  goHome: (section?: string) => void;
}) {
  const scrolled = useScrolled(20);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkCls = (on: boolean) =>
    `text-[14px] transition-colors duration-200 ${
      on ? "text-ink" : "text-mute hover:text-ink"
    }`;

  return (
    <header
      className="nav-bar sticky top-0 z-50 bg-paper/90 backdrop-blur-sm transition-[border-color] duration-300"
      style={{
        borderBottom: `1px solid ${scrolled ? "var(--color-line)" : "transparent"}`,
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-[70px] md:px-10">
        <a
          href={route === "home" ? "#top" : "#/"}
          onClick={(e) => {
            if (route !== "home") {
              e.preventDefault();
              goHome();
            }
          }}
          className="flex items-baseline gap-2.5"
        >
          <span className="text-[15px] font-medium tracking-[-0.02em] text-ink">
            {PROFILE.name}
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href={route === "home" ? "#top" : "#/"}
            onClick={(e) => {
              if (route !== "home") {
                e.preventDefault();
                goHome();
              }
            }}
            className={linkCls(route === "home")}
          >
            Home
          </a>
          {PAGE_LINKS.filter((l) => l.id !== "contact").map((l) => (
            <a
              key={l.id}
              href={l.href}
              className={linkCls(
                route === l.id || (l.id === "work" && route === "project"),
              )}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#/contact"
            className={`rounded-full border px-4 py-2 text-[13px] transition-colors duration-200 ${
              route === "contact"
                ? "border-accent text-ink"
                : "border-line text-ink hover:border-ink"
            }`}
          >
            Get in touch
          </a>
        </nav>

        <div className="flex items-center gap-3 md:ms-8">
          <ThemeToggle />

          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span
              className="block h-px w-5 bg-ink transition-transform duration-300"
              style={{
                transform: open ? "translateY(3px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block h-px w-5 bg-ink transition-transform duration-300"
              style={{
                transform: open ? "translateY(-3px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </div>

      {/* mobile panel */}
      <div
        className="grid overflow-hidden border-t border-line bg-paper transition-[grid-template-rows] duration-400 ease-out md:hidden"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          borderTopWidth: open ? 1 : 0,
        }}
      >
        <nav className="overflow-hidden">
          <ul className="px-6 py-2">
            <li
              className={`m-item border-b border-line last:border-0 ${open ? "is-open" : ""}`}
              style={{ ["--m-i" as string]: "0ms" }}
            >
              <a
                href={route === "home" ? "#top" : "#/"}
                onClick={(e) => {
                  setOpen(false);
                  if (route !== "home") {
                    e.preventDefault();
                    goHome();
                  }
                }}
                className={`block py-4 text-[15px] ${route === "home" ? "text-ink" : "text-mute"}`}
              >
                Home
              </a>
            </li>
            {PAGE_LINKS.map((l, i) => (
              <li
                key={l.id}
                className={`m-item border-b border-line last:border-0 ${open ? "is-open" : ""}`}
                style={{ ["--m-i" as string]: `${(i + 1) * 60}ms` }}
              >
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block py-4 text-[15px] ${
                    route === l.id ||
                    (l.id === "work" && route === "project")
                      ? "text-ink"
                      : "text-mute"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div
            className={`m-item px-6 pt-2 pb-6 ${open ? "is-open" : ""}`}
            style={{ ["--m-i" as string]: "300ms" }}
          >
            <a
              href={`mailto:${PROFILE.email}`}
              className="block rounded-full border border-line px-4 py-3 text-center text-[14px] text-ink"
            >
              {PROFILE.email}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
