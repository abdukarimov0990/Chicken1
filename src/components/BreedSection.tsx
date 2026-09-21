import { motion } from "framer-motion";
import { Feather } from "lucide-react";
import { BREED, BREED_TEXT } from "../data/content";
import { fadeUp } from "../lib/motion";
import { DotPattern } from "./ui/DotPattern";
import { RevealGroup } from "./ui/Reveal";

/** Deliberately spare: the breed name is the whole message. */
export function BreedSection() {
  return (
    <RevealGroup
      interval={0.12}
      timing={0.15}
      className="relative flex flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white p-7 sm:p-10"
    >
      <DotPattern columns={5} rows={5} className="absolute top-8 right-8 opacity-15" />

      <motion.div variants={fadeUp} className="flex items-center gap-4">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-mist text-navy">
          <Feather aria-hidden className="size-7" strokeWidth={1.6} />
        </span>
        <h3 className="text-xs font-bold tracking-[0.2em] text-navy uppercase">Parranda zoti</h3>
      </motion.div>

      <motion.p
        variants={fadeUp}
        className="mt-10 text-[clamp(2.75rem,4.6vw,3.75rem)] leading-none font-extrabold tracking-[-0.04em] whitespace-nowrap text-navy lg:mt-auto lg:pt-10"
      >
        {BREED}
      </motion.p>
      <motion.span variants={fadeUp} aria-hidden className="mt-5 block h-[3px] w-12 rounded-full bg-accent" />

      <motion.p variants={fadeUp} className="mt-5 max-w-xs text-base leading-relaxed font-medium text-pretty text-muted">
        {BREED_TEXT}
      </motion.p>
    </RevealGroup>
  );
}
