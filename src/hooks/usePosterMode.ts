import { useLayoutEffect, useSyncExternalStore } from "react";

/**
 * Screens large enough to present on show everything as one full-screen poster.
 * Below this the uniform scaling would make text too small, so phones,
 * tablets and small windows keep the normal scrolling page.
 */
const POSTER_QUERY = "(min-width: 1200px) and (min-height: 700px)";

const subscribe = (onChange: () => void) => {
  const media = window.matchMedia(POSTER_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};

const getSnapshot = () => window.matchMedia(POSTER_QUERY).matches;

export function usePosterMode() {
  const isPoster = useSyncExternalStore(subscribe, getSnapshot);

  // The attribute switches on the root font scaling (see index.css).
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (isPoster) root.dataset.mode = "poster";
    else delete root.dataset.mode;
    return () => {
      delete root.dataset.mode;
    };
  }, [isPoster]);

  return isPoster;
}
