import { useLayoutEffect, useSyncExternalStore } from "react";

/**
 * Screens large enough to present on get the horizontal slide deck.
 * Below this the uniform scaling would make text too small, so phones,
 * tablets and small windows keep the normal scrolling page.
 */
const DECK_QUERY = "(min-width: 1200px) and (min-height: 700px)";

const subscribe = (onChange: () => void) => {
  const media = window.matchMedia(DECK_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};

const getSnapshot = () => window.matchMedia(DECK_QUERY).matches;

export function useDeckMode() {
  const isDeck = useSyncExternalStore(subscribe, getSnapshot);

  // The attribute switches on the root font scaling and every `deck:` style.
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (isDeck) root.dataset.mode = "deck";
    else delete root.dataset.mode;
    return () => {
      delete root.dataset.mode;
    };
  }, [isDeck]);

  return isDeck;
}
