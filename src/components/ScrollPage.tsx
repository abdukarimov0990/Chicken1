import { useState, type ReactNode } from "react";
import { useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";
import { SECTIONS } from "../data/content";
import { useActiveSection } from "../hooks/useActiveSection";
import { Navigation } from "./Navigation";

const SECTION_IDS = SECTIONS.map((section) => section.id);

/**
 * Phones, tablets and small windows: the same sections as one scrolling page.
 * A floating button mirrors the deck's "next" control by scrolling to the following section.
 */
export function ScrollPage({ children, footer }: { children: ReactNode; footer: ReactNode }) {
  const activeId = useActiveSection(SECTION_IDS);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 32, mass: 0.4 });

  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 24));

  const activeIndex = SECTION_IDS.indexOf(activeId);
  const isLast = activeIndex === SECTION_IDS.length - 1;

  const goNext = () => {
    if (isLast) window.scrollTo({ top: 0 });
    // Before the first section is reached (hero on screen), "next" means the first section.
    else {
      const target = scrolled || activeIndex > 0 ? SECTION_IDS[activeIndex + 1] : SECTION_IDS[0];
      document.getElementById(target)?.scrollIntoView();
    }
  };

  return (
    <>
      <a
        href={`#${SECTION_IDS[0]}`}
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-5 focus:py-2.5 focus:text-sm focus:font-bold focus:text-white"
      >
        Asosiy mazmunga o‘tish
      </a>
      <Navigation activeId={activeId} progress={progress} solid={scrolled} />
      <main>{children}</main>
      {footer}

      <button
        type="button"
        onClick={goNext}
        aria-label={isLast ? "Boshiga qaytish" : "Keyingi bo‘lim"}
        className="fixed right-4 bottom-4 z-40 flex size-12 items-center justify-center rounded-full bg-navy text-white shadow-float ring-1 ring-white/20 transition-[background-color] duration-300 hover:bg-navy-deep sm:right-6 sm:bottom-6 sm:size-14"
      >
        {isLast ? <ArrowUp aria-hidden className="size-5" /> : <ArrowDown aria-hidden className="size-5" />}
      </button>
    </>
  );
}
