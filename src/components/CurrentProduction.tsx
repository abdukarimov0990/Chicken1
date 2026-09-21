import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CURRENT_PRODUCTION, sectionIndex } from "../data/content";
import { fadeUp } from "../lib/motion";
import { BreedSection } from "./BreedSection";
import { AnimatedCounter } from "./ui/AnimatedCounter";
import { DotPattern } from "./ui/DotPattern";
import { RevealGroup } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

/** Today's output — the one dark panel on the page, so the figure carries real weight. */
export function CurrentProduction() {
  const panelRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: panelRef, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="ishlab-chiqarish"
      aria-labelledby="ishlab-chiqarish-title"
      className="wrap scroll-mt-20 pt-16 lg:pt-24 deck:pt-0"
    >
      <SectionHeading
        id="ishlab-chiqarish-title"
        index={sectionIndex("ishlab-chiqarish")}
        title="Hozirgi ishlab chiqarish"
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)] lg:gap-5">
        <RevealGroup
          ref={panelRef}
          interval={0.12}
          className="relative isolate overflow-hidden rounded-[1.75rem] bg-navy p-7 text-white sm:p-12 lg:p-14"
        >
          {/* Egg outline and dots drift slowly against the scroll for a touch of depth. */}
          <motion.div aria-hidden style={{ y: drift }} className="absolute inset-y-0 right-0 -z-10 w-1/2">
            <svg
              viewBox="0 0 200 260"
              fill="none"
              className="absolute top-1/2 -right-10 h-[125%] -translate-y-1/2 text-white/[0.07] sm:right-4"
            >
              <path
                d="M100 6C52 6 8 84 8 154a92 92 0 0 0 184 0C192 84 148 6 100 6Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M100 46c-34 0-64 56-64 106a64 64 0 0 0 128 0c0-50-30-106-64-106Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            <DotPattern
              columns={7}
              rows={5}
              color="rgb(255 255 255 / 0.22)"
              className="absolute top-8 right-8 animate-float"
            />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-white/75 uppercase"
          >
            <span aria-hidden className="relative flex size-2.5">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent" />
              <span className="relative size-2.5 rounded-full bg-accent" />
            </span>
            Hozirgi vaqtda
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-baseline gap-x-5 leading-[0.9] font-extrabold sm:mt-8"
          >
            <AnimatedCounter
              value={CURRENT_PRODUCTION.value}
              decimals={1}
              duration={2.4}
              className="text-[clamp(5.5rem,15vw,11.5rem)] tracking-[-0.055em]"
            />
            <span className="text-[clamp(2rem,5vw,4rem)] tracking-[-0.02em]">MLN</span>
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-6 inline-flex rounded-full bg-accent px-4 py-1.5 text-xs font-extrabold tracking-[0.2em] text-white uppercase sm:text-sm"
          >
            {CURRENT_PRODUCTION.unit}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-md text-base leading-relaxed font-medium text-pretty text-white/85 sm:text-lg"
          >
            {CURRENT_PRODUCTION.text}
          </motion.p>
        </RevealGroup>

        <BreedSection />
      </div>
    </section>
  );
}
