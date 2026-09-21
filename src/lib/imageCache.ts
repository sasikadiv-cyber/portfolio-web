/** Register the browser-side runtime image cache in production only. */
export function registerImageCache() {
  if (!("serviceWorker" in navigator)) return;
  /* Never leave a persistent worker behind while using Vite locally. */
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  )
    return;

  window.addEventListener(
    "load",
    () => {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/", updateViaCache: "none" })
        .catch(() => {
          /* Caching is an enhancement; the site remains fully functional. */
        });
    },
    { once: true },
  );
}