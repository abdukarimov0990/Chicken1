import { motion } from "framer-motion";
import { Feather } from "lucide-react";
import { AnimatedCounter } from "../components/ui/AnimatedCounter";
import { RevealGroup } from "../components/ui/Reveal";
import { BREED } from "../data/content";
import { CURRENT_RESULT, EXPECTED_RESULTS, type Result } from "../data/results";
import { drawX, fadeUp } from "../lib/motion";

const START = 2.1;

/** Projected result: icon and label on top, red figure with its unit underneath. */
function ResultCard({ Icon, label, note, value, unit }: Result) {
  return (
    <motion.article
      variants={fadeUp}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[1.25rem] border border-line bg-white px-4 py-3.5 transition-[translate,box-shadow,border-color] duration-500 ease-out-expo hover:-translate-y-1 hover:border-navy/20 hover:shadow-card"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[0.1875rem] origin-left scale-x-0 bg-accent transition-[scale] duration-700 ease-out-expo group-hover:scale-x-100"
      />
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-mist text-navy">
          <Icon className="size-5" />
        </span>
        <h3 className="min-w-0 pt-0.5 text-[0.6875rem] leading-snug font-bold tracking-[0.06em] text-navy uppercase">
          {label}
          {note && (
            <span className="mt-0.5 block text-[0.6875rem] font-semibold tracking-normal text-muted normal-case">
              {note}
            </span>
          )}
        </h3>
      </div>

      <p className="mt-2 flex items-baseline gap-2 leading-none font-extrabold">
        <AnimatedCounter value={value} startAfter={START + 0.3} className="text-[2.875rem] tracking-[-0.04em] text-accent" />
        <span className="text-[0.625rem] leading-tight tracking-[0.12em] text-navy uppercase">{unit}</span>
      </p>
    </motion.article>
  );
}

/** Today's output — the single dark card, so it reads as the starting point of the row. */
function CurrentCard({ Icon, label, value, decimals, unit }: Result) {
  return (
    <motion.article
      variants={fadeUp}
      className="relative isolate flex flex-col justify-between overflow-hidden rounded-[1.25rem] bg-navy px-5 py-3.5 text-white"
    >
      <Icon className="absolute -right-5 -bottom-7 -z-10 size-32 text-white/[0.07]" />

      <div className="flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2.5 text-[0.6875rem] font-bold tracking-[0.1em] uppercase">
          <span aria-hidden className="relative flex size-2">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent" />
            <span className="relative size-2 rounded-full bg-accent" />
          </span>
          {label}
        </h3>
        <p className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[0.625rem] font-bold tracking-[0.06em] whitespace-nowrap">
          <Feather aria-hidden className="size-3" strokeWidth={2} />
          {BREED} zoti
        </p>
      </div>

      <p className="mt-2 flex items-baseline gap-2.5 leading-none font-extrabold">
        <AnimatedCounter
          value={value}
          decimals={decimals}
          startAfter={START + 0.3}
          className="text-[3.375rem] tracking-[-0.045em]"
        />
        <span className="text-[0.6875rem] leading-tight tracking-[0.12em] text-white/85 uppercase">{unit}</span>
      </p>
    </motion.article>
  );
}

/** "Erishiladigan natijalar": the ruled heading from the slide, then today's figure and five projections. */
export function PosterResults() {
  return (
    <RevealGroup eager interval={0.09} timing={{ notBefore: START }} aria-labelledby="poster-results">
      <div className="flex items-center gap-4">
        <motion.h2
          variants={fadeUp}
          id="poster-results"
          className="shrink-0 text-[0.9375rem] font-extrabold tracking-[0.08em] text-navy uppercase"
        >
          Erishiladigan natijalar
        </motion.h2>
        <div aria-hidden className="relative h-px flex-1">
          <motion.span variants={drawX} className="absolute inset-0 origin-left bg-navy/15" />
          <motion.span
            variants={drawX}
            className="absolute -top-px left-0 h-[0.1875rem] w-12 origin-left rounded-full bg-accent"
          />
        </div>
      </div>

      <div className="mt-2.5 grid h-[8.5rem] grid-cols-[minmax(0,1.5fr)_repeat(5,minmax(0,1fr))] gap-3">
        <CurrentCard {...CURRENT_RESULT} />
        {EXPECTED_RESULTS.map((result) => (
          <ResultCard key={result.label} {...result} />
        ))}
      </div>
    </RevealGroup>
  );
}
