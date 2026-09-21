import { createContext, useContext } from "react";
import { VIEWPORT } from "./motion";

/**
 * `null` while the page scrolls normally; inside the slide deck it tells
 * a slide's content whether that slide is currently on stage.
 */
export const SlideActiveContext = createContext<boolean | null>(null);

export const useSlideActive = () => useContext(SlideActiveContext);

/**
 * What triggers a `hidden` → `show` reveal:
 * scrolling into view on the scrolling page, or the slide taking the stage in the deck.
 * Leaving the stage resets the block, so every visit to a slide replays its entrance.
 */
export function useRevealProps() {
  const active = useSlideActive();
  return active === null
    ? ({ initial: "hidden", whileInView: "show", viewport: VIEWPORT } as const)
    : ({ initial: "hidden", animate: active ? "show" : "hidden" } as const);
}
