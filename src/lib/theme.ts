export type Theme = "dark" | "light";

/** Reads the current theme from the document root. */
export function getTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("light")
    ? "light"
    : "dark";
}

/** Applies a theme, remembers it, and cross-fades the colours. */
export function setTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.add("theme-anim");
  root.classList.toggle("light", theme === "light");
  root.style.colorScheme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "light" ? "#FAF9F5" : "#08080A");
  try {
    window.localStorage.setItem("theme", theme);
  } catch {
    /* private mode — the choice just won't persist */
  }
  window.setTimeout(() => root.classList.remove("theme-anim"), 550);
}
