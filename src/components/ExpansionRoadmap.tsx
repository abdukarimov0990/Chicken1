import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { Bird, ChevronRight, Egg, type LucideIcon } from "lucide-react";
import { EXPANSION, sectionIndex } from "../data/content";
import { EASE_OUT, fadeUp } from "../lib/motion";
import { cn } from "../lib/cn";
import { EnterpriseSection } from "./EnterpriseSection";
import { AnimatedCounter } from "./ui/AnimatedCounter";
import { DotPattern } from "./ui/DotPattern";
import { RevealGroup } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { UnitGrid } from "./ui/UnitGrid";

const EXPANSION_ICONS: LucideIcon[] = [Egg, Bird];

/** The rail draws itself first; the stops then land on it one by one. */
const rail: Variants = {
  hidden: { scaleX: 0, scaleY: 0 },
  show: { scaleX: 1, scaleY: 1, transition: { duration: 1.6, ease: EASE_OUT } },
};

const railEnd: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT, delay: 1.3 } },
};

type StopProps = {
  tag: string;
  tone: "current" | "planned";
  children: ReactNode;
};

function Stop({ tag, tone, children }: StopProps) {
  return (
    <motion.li variants={fadeUp} className="relative flex flex-col pl-10 lg:pl-0">
      <div className="mb-4 flex items-center lg:mb-6">
        <span
          aria-hidden
          className={cn(
            "absolute top-0 left-0 flex size-6 items-center justify-center rounded-full bg-mist lg:static",
            tone === "current" ? "text-navy" : "text-accent",
          )}
        >
          <span
            className={cn(
              "size-3.5 rounded-full border-[2.5px] border-current",
              tone === "current" && "bg-current",
            )}
          />
        </span>
        <span
          className={cn(
            "bg-mist px-3 text-xs leading-6 font-extrabold tracking-[0.2em] uppercase",
            tone === "current" ? "text-navy" : "text-accent",
          )}
        >
          {tag}
        </span>
      </div>
      <div className="flex-1">{children}</div>
    </motion.li>
  );
}

type PlanCardProps = {
  icon: LucideIcon;
  value: number;
  label: string;
};

function PlanCard({ icon: Icon, value, label }: PlanCardProps) {
  return (
    <article className="flex h-full flex-col rounded-3xl border-[1.5px] border-dashed border-navy/30 bg-white/70 p-6 transition-[background-color,border-color,box-shadow] duration-500 hover:border-navy/50 hover:bg-white hover:shadow-card sm:p-8">
      <span className="flex size-12 items-center justify-center rounded-2xl bg-mist text-navy">
        <Icon aria-hidden className="size-6" strokeWidth={1.6} />
      </span>

      <p className="mt-7 flex items-baseline gap-2 leading-none font-extrabold text-accent">
        <AnimatedCounter value={value} className="text-[clamp(4rem,6vw,5.5rem)] tracking-[-0.05em]" />
        <span className="text-2xl uppercase">ta</span>
      </p>
      <h3 className="mt-4 text-sm leading-snug font-extrabold tracking-[0.1em] text-balance text-navy uppercase">
        {label}
      </h3>

      <UnitGrid count={value} tone="outline" className="mt-auto pt-8" />
    </article>
  );
}

/**
 * Roadmap: today's enterprises, then the two planned build-outs.
 * A horizontal rail on desktop; the same rail turns vertical on smaller screens.
 */
export function ExpansionRoadmap() {
  return (
    <section
      id="rivojlanish"
      aria-labelledby="rivojlanish-title"
      className="relative mt-16 scroll-mt-14 overflow-hidden bg-mist py-16 lg:mt-24 lg:py-24 deck:mt-0 deck:overflow-visible deck:py-0"
    >
      <DotPattern columns={12} rows={6} className="absolute top-10 right-10 hidden opacity-10 xl:block deck:hidden" />

      <div className="wrap relative">
        <SectionHeading
          id="rivojlanish-title"
          index={sectionIndex("rivojlanish")}
          title="Kelgusidagi rivojlanish rejasi"
        />

        <RevealGroup interval={0.28} className="relative">
          <motion.span
            aria-hidden
            variants={rail}
            className="absolute top-3 bottom-0 left-[11.5px] w-px origin-top bg-navy/25 lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto lg:origin-left"
          />
          <motion.span
            aria-hidden
            variants={railEnd}
            className="absolute top-3 -right-1.5 hidden -translate-y-1/2 text-navy/40 lg:block"
          >
            <ChevronRight className="size-4" strokeWidth={2.5} />
          </motion.span>

          <ol className="relative grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-6">
            <Stop tag="Bugun" tone="current">
              <EnterpriseSection />
            </Stop>
            {EXPANSION.map((plan, i) => (
              <Stop key={plan.label} tag="Reja" tone="planned">
                <PlanCard icon={EXPANSION_ICONS[i]} value={plan.value} label={plan.label} />
              </Stop>
            ))}
          </ol>
        </RevealGroup>
      </div>
    </section>
  );
}
