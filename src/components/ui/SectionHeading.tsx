import { motion } from "framer-motion";
import { drawX, fadeUp } from "../../lib/motion";
import { RevealGroup } from "./Reveal";

type SectionHeadingProps = {
  id: string;
  index: string;
  title: string;
  aside?: string;
};

/** Numbered heading with the ruled underline used on the original slide. */
export function SectionHeading({ id, index, title, aside }: SectionHeadingProps) {
  return (
    <RevealGroup className="mb-8 lg:mb-10">
      <div className="flex items-end justify-between gap-6">
        <div className="flex items-baseline gap-3 sm:gap-4">
          <motion.span
            variants={fadeUp}
            aria-hidden
            className="text-xs font-extrabold tracking-[0.2em] text-accent tabular-nums"
          >
            {index}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            id={id}
            className="text-xl font-extrabold tracking-tight text-balance text-navy uppercase sm:text-2xl lg:text-[1.75rem]"
          >
            {title}
          </motion.h2>
        </div>
        {aside && (
          <motion.p
            variants={fadeUp}
            className="hidden shrink-0 text-xs font-bold tracking-[0.16em] text-muted uppercase sm:block"
          >
            {aside}
          </motion.p>
        )}
      </div>
      <div aria-hidden className="relative mt-4 h-px">
        <motion.span variants={drawX} className="absolute inset-0 origin-left bg-navy/15" />
        <motion.span
          variants={drawX}
          className="absolute -top-px left-0 h-[3px] w-14 origin-left rounded-full bg-accent"
        />
      </div>
    </RevealGroup>
  );
}
