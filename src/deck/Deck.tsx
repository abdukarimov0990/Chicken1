import { useEffect, useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Maximize, Minimize } from "lucide-react";
import { Navigation } from "../components/Navigation";
import { SECTIONS, type SectionId } from "../data/content";
import { SlideActiveContext } from "../lib/reveal";
import { cn } from "../lib/cn";
import { DeckControls } from "./DeckControls";
import { useDeckNavigation } from "./useDeckNavigation";
import { useFullscreen } from "./useFullscreen";

export type SlideDefinition = {
  id: SectionId;
  tone: "light" | "mist" | "dark";
  content: ReactNode;
};

const TONE_BACKGROUND = { light: "bg-white", mist: "bg-mist", dark: "bg-navy" } as const;

const SLIDE_IDS = SECTIONS.map((section) => section.id);
const SLIDE_LABELS = SECTIONS.map((section) => section.label);

/**
 * Presentation mode: the sections sit side by side as full-screen slides
 * and the stage glides horizontally from one to the next.
 */
export function Deck({ slides }: { slides: SlideDefinition[] }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const scrollersRef = useRef<Array<HTMLElement | null>>([]);
  const { index, staged, count, goTo, next, prev } = useDeckNavigation({
    ids: SLIDE_IDS,
    stage: stageRef,
    scrollers: scrollersRef,
  });
  const fullscreen = useFullscreen();

  const position = useMotionValue(index / (count - 1));
  const progress = useSpring(position, { stiffness: 120, damping: 28, mass: 0.6 });
  useEffect(() => position.set(index / (count - 1)), [count, index, position]);

  const current = slides[index];

  return (
    <div ref={stageRef} className="relative h-full touch-pan-y overflow-hidden">
      <Navigation
        activeId={current.id}
        progress={progress}
        solid
        onSelect={(id) => goTo(SLIDE_IDS.indexOf(id))}
        trailing={
          fullscreen.supported && (
            <button
              type="button"
              onClick={fullscreen.toggle}
              aria-label={fullscreen.active ? "To‘liq ekrandan chiqish" : "To‘liq ekran rejimi"}
              title={fullscreen.active ? "To‘liq ekrandan chiqish (F)" : "To‘liq ekran (F)"}
              className="flex size-9 items-center justify-center rounded-full text-navy/60 transition-colors duration-300 hover:bg-navy/[0.07] hover:text-navy"
            >
              {fullscreen.active ? (
                <Minimize aria-hidden className="size-[1.125rem]" strokeWidth={2} />
              ) : (
                <Maximize aria-hidden className="size-[1.125rem]" strokeWidth={2} />
              )}
            </button>
          )
        }
      />

      <main className="h-full">
        <motion.div
          initial={false}
          animate={{ x: `${-index * 100}vw` }}
          transition={{ duration: 0.95, ease: [0.7, 0, 0.2, 1] }}
          className="flex h-full will-change-transform"
        >
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slayd"
              aria-label={`${i + 1} / ${count}: ${SLIDE_LABELS[i]}`}
              inert={i !== index}
              className={cn("h-full w-screen shrink-0", TONE_BACKGROUND[slide.tone])}
            >
              <div
                ref={(element) => {
                  scrollersRef.current[i] = element;
                }}
                className="h-full overflow-x-hidden overflow-y-auto overscroll-contain pt-14 pb-24"
              >
                <div className="flex min-h-full flex-col justify-center py-5">
                  <SlideActiveContext.Provider value={i === staged}>{slide.content}</SlideActiveContext.Provider>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </main>

      <DeckControls
        index={index}
        labels={SLIDE_LABELS}
        tone={current.tone === "dark" ? "dark" : "light"}
        onPrev={prev}
        onNext={next}
        onSelect={goTo}
      />

      <p aria-live="polite" className="sr-only">
        {index + 1}-slayd: {SLIDE_LABELS[index]}
      </p>
    </div>
  );
}
