import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

/** Content starts revealing this long after a slide change, once the new slide is well on its way in. */
const STAGE_DELAY = 380;
/** Trackpads keep emitting wheel events while they coast; ignore them until the move is over. */
const WHEEL_COOLDOWN = 1400;
const SWIPE_DISTANCE = 70;

type Options = {
  ids: readonly string[];
  /** Root element of the deck: wheel and swipe gestures are read from it. */
  stage: RefObject<HTMLElement | null>;
  /** Scroll container of each slide, used to let an overflowing slide scroll before the deck moves on. */
  scrollers: RefObject<Array<HTMLElement | null>>;
};

const indexFromHash = (ids: readonly string[]) =>
  Math.max(0, ids.indexOf(decodeURIComponent(window.location.hash.slice(1))));

/**
 * Slide position plus every way of changing it: buttons, keyboard and presenter
 * remotes, mouse wheel, touch swipes and the URL hash.
 */
export function useDeckNavigation({ ids, stage, scrollers }: Options) {
  const count = ids.length;
  const [index, setIndex] = useState(() => indexFromHash(ids));
  /** Slide whose content is revealed; trails `index` so entrances play as the slide arrives. */
  const [staged, setStaged] = useState(index);
  const indexRef = useRef(index);

  const goTo = useCallback(
    (target: number) => {
      const clamped = Math.min(count - 1, Math.max(0, target));
      indexRef.current = clamped;
      setIndex(clamped);
    },
    [count],
  );
  const next = useCallback(() => goTo(indexRef.current + 1), [goTo]);
  const prev = useCallback(() => goTo(indexRef.current - 1), [goTo]);

  useEffect(() => {
    const id = ids[index];
    const hash = window.location.hash.slice(1);
    if (hash !== id && (index > 0 || hash)) history.replaceState(null, "", `#${id}`);

    const timer = window.setTimeout(() => setStaged(index), STAGE_DELAY);
    return () => window.clearTimeout(timer);
  }, [index, ids]);

  useEffect(() => {
    const onHashChange = () => goTo(indexFromHash(ids));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [goTo, ids]);

  // Keyboard — also covers presenter remotes, which send PageUp/PageDown or arrow keys.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target instanceof Element ? event.target : null;
      const onControl = target?.closest("button, a, input, select, textarea, [contenteditable]");

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
          next();
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          prev();
          break;
        case " ":
        case "Enter":
          if (onControl) return; // let the focused button or link act
          if (event.shiftKey) prev();
          else next();
          break;
        case "Home":
          goTo(0);
          break;
        case "End":
          goTo(count - 1);
          break;
        default:
          if (!/^[1-9]$/.test(event.key)) return;
          goTo(Number(event.key) - 1);
      }
      event.preventDefault();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [count, goTo, next, prev]);

  // Mouse wheel and touch swipes.
  useEffect(() => {
    const element = stage.current;
    if (!element) return;

    let wheelLockedUntil = 0;
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return; // pinch-zoom
      const now = performance.now();
      if (now < wheelLockedUntil) return;

      const vertical = Math.abs(event.deltaY) >= Math.abs(event.deltaX);
      const delta = vertical ? event.deltaY : event.deltaX;
      if (Math.abs(delta) < 30) return;

      // A slide taller than the screen scrolls to its edge first.
      const scroller = scrollers.current[indexRef.current];
      if (vertical && scroller && scroller.scrollHeight > scroller.clientHeight + 1) {
        const atTop = scroller.scrollTop <= 0;
        const atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1;
        if ((delta > 0 && !atBottom) || (delta < 0 && !atTop)) return;
      }

      wheelLockedUntil = now + WHEEL_COOLDOWN;
      if (delta > 0) next();
      else prev();
    };

    let start: { x: number; y: number } | null = null;
    const onPointerDown = (event: PointerEvent) => {
      start = event.pointerType === "mouse" ? null : { x: event.clientX, y: event.clientY };
    };
    const onPointerUp = (event: PointerEvent) => {
      if (!start) return;
      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      start = null;
      if (Math.abs(dx) < SWIPE_DISTANCE || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      if (dx < 0) next();
      else prev();
    };

    element.addEventListener("wheel", onWheel, { passive: true });
    element.addEventListener("pointerdown", onPointerDown);
    element.addEventListener("pointerup", onPointerUp);
    return () => {
      element.removeEventListener("wheel", onWheel);
      element.removeEventListener("pointerdown", onPointerDown);
      element.removeEventListener("pointerup", onPointerUp);
    };
  }, [next, prev, scrollers, stage]);

  return { index, staged, count, goTo, next, prev };
}
