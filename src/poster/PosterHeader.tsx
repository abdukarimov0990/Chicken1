import { Fragment } from "react";
import { motion, type Variants } from "framer-motion";
import { DotPattern } from "../components/ui/DotPattern";
import { BREED, PARTNER_NAME } from "../data/content";
import { EASE_OUT, fadeUp, stagger } from "../lib/motion";

const HEADLINE = [BREED, "TOVUQ", "ZOTI"];

const word: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 1, ease: EASE_OUT } },
};

const ornament: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: EASE_OUT } },
};

const intro = stagger(0.11, 0.15);

/** Slide title flanked by the dotted ornaments, as on the original. */
export function PosterHeader() {
  return (
    <motion.header variants={intro} initial="hidden" animate="show" className="relative text-center">
      <h1 className="mx-auto max-w-[70rem] uppercase">
        <motion.span
          variants={fadeUp}
          className="block text-[1.0625rem] leading-normal font-bold tracking-[0.08em] text-navy"
        >
          “{PARTNER_NAME}” kompaniyasi bilan hamkorlikda
        </motion.span>

        <span className="mt-0.5 block text-[3.375rem] leading-[1.04] font-extrabold tracking-[-0.035em] text-accent">
          {HEADLINE.map((text, i) => (
            <Fragment key={text}>
              <span className="inline-block overflow-hidden pb-[0.06em] align-bottom">
                <motion.span variants={word} className="inline-block">
                  {text}
                </motion.span>
              </span>
              {i < HEADLINE.length - 1 && " "}
            </Fragment>
          ))}
        </span>

        <motion.span
          variants={fadeUp}
          className="mt-0.5 block text-[1.375rem] leading-snug font-extrabold tracking-[0.01em] text-navy"
        >
          To‘liq naslchilik zanjirini mahalliylashtirish loyihasi
        </motion.span>
      </h1>

      <motion.div variants={ornament} aria-hidden className="absolute top-1/2 left-0 -translate-y-1/2">
        <DotPattern className="animate-float" />
      </motion.div>
      <motion.div variants={ornament} aria-hidden className="absolute top-1/2 right-0 -translate-y-1/2">
        <DotPattern className="animate-float [animation-delay:-5s]" />
      </motion.div>
    </motion.header>
  );
}
