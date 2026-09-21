import { motion } from "framer-motion";
import { PARTNER_NAME } from "../data/content";
import { fadeUp } from "../lib/motion";
import { RevealGroup } from "./ui/Reveal";
import { ChinaFlag } from "./ui/ChinaFlag";

/** Centre column of the slide: the partner card with the Chinese flag beneath it. */
export function Partnership() {
  return (
    <RevealGroup
      interval={0.14}
      timing={{ notBefore: 1.25 }}
      className="grid h-full gap-5 sm:grid-cols-2 sm:items-center lg:grid-cols-1 lg:grid-rows-[auto_1fr] lg:items-stretch"
    >
      <motion.article
        variants={fadeUp}
        className="rounded-3xl bg-white px-6 py-7 text-center shadow-card ring-1 ring-navy/[0.06]"
      >
        <h3 className="text-lg font-extrabold tracking-[0.14em] text-navy uppercase">Loyiha hamkori</h3>
        <span aria-hidden className="mx-auto mt-3 block h-[3px] w-10 rounded-full bg-accent" />
        <p className="mt-4 text-[0.9375rem] leading-relaxed font-semibold text-balance text-ink">
          “{PARTNER_NAME}”
          <span className="mt-1 block text-xs font-bold tracking-[0.16em] text-muted uppercase">kompaniyasi</span>
        </p>
      </motion.article>

      <motion.div variants={fadeUp} className="flex items-center">
        <ChinaFlag
          label="Xitoy Xalq Respublikasi bayrog‘i"
          className="block w-full rounded-2xl shadow-float ring-1 ring-black/5 transition-[scale] duration-700 ease-out-expo hover:scale-[1.02]"
        />
      </motion.div>
    </RevealGroup>
  );
}
