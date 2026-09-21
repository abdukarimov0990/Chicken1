import { useEffect, useState } from "react";

/** Share of the viewport height (from the top) a section must reach to become current. */
const READING_LINE = 0.45;

/**
 * Tracks which section the reader is in: the last section (in page order)
 * whose top edge has crossed the reading line.
 *
 * An IntersectionObserver wakes it up instead of a scroll listener; every wake-up
 * re-measures all sections, so instant jumps (Home/End, anchor links) cannot leave
 * stale state behind. `scrollend` covers jumps that cross no observed boundary.
 */
export function useActiveSection<T extends string>(ids: readonly T[]): T {
  const [active, setActive] = useState<T>(ids[0]);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    const update = () => {
      const line = window.innerHeight * READING_LINE;
      let current = ids[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id as T;
      }
      setActive(current);
    };

    const observer = new IntersectionObserver(update, {
      rootMargin: `0px 0px -${(1 - READING_LINE) * 100}% 0px`,
      threshold: [0, 1],
    });
    sections.forEach((section) => observer.observe(section));
    window.addEventListener("scrollend", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("scrollend", update);
    };
  }, [ids]);

  return active;
}
