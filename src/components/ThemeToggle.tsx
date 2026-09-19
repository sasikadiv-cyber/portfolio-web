import { useState } from "react";
import { setTheme } from "../lib/theme";

function SunIcon() {
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
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
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
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

export default function ThemeToggle() {
  const [light, setLight] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("light"),
  );

  const toggle = () => {
    setLight((v) => !v);
    setTheme(light ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
      title={light ? "Dark theme" : "Light theme"}
      className="btn-icon grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full border border-line text-ink transition-colors duration-200 hover:border-ink"
    >
      {light ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
