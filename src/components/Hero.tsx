import { Fragment, useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { MapPin } from "lucide-react";
import { BREED, LOCATION, PARTNER_NAME } from "../data/content";
import { EASE_OUT, fadeIn, fadeUp, stagger } from "../lib/motion";
import { DotPattern } from "./ui/DotPattern";

/** Word groups that must stay together when the headline wraps on narrow screens. */
const HEADLINE = [[BREED], ["TOVUQ", "ZOTI"]];

const word: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 1, ease: EASE_OUT } },
};

const ornament: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: EASE_OUT } },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const driftSlow = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const driftFast = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <motion.section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      variants={stagger(0.12, 0.25)}
      initial="hidden"
      animate="show"
      className="relative overflow-hidden pt-24 pb-10 sm:pt-28 lg:pt-32 lg:pb-12"
    >
      <div className="wrap text-center">
        <motion.div variants={ornament} className="mb-7 flex justify-center xl:hidden">
          <DotPattern columns={9} rows={2} gap={14} />
        </motion.div>

        <motion.p
          variants={fadeIn}
          className="flex items-center justify-center gap-3 text-[0.6875rem] font-bold tracking-[0.3em] text-navy/70 uppercase"
        >
          <span aria-hidden className="h-px w-8 bg-navy/30" />
          Investitsiya loyihasi
          <span aria-hidden className="h-px w-8 bg-navy/30" />
        </motion.p>

        <h1 id="hero-title" className="mx-auto mt-6 max-w-[68rem] uppercase">
          <motion.span
            variants={fadeUp}
            className="block text-[clamp(0.8125rem,1.55vw,1.25rem)] leading-relaxed font-bold tracking-[0.08em] text-balance text-navy"
          >
            “{PARTNER_NAME}” kompaniyasi bilan hamkorlikda
          </motion.span>

          <span className="mt-3 block text-[clamp(2.5rem,6.2vw,5rem)] leading-[1.02] font-extrabold tracking-[-0.035em] text-accent lg:mt-4">
            {HEADLINE.map((group, g) => (
              <Fragment key={g}>
                <span className="whitespace-nowrap">
                  {group.map((text, i) => (
                    <Fragment key={text}>
                      <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                        <motion.span variants={word} className="inline-block">
                          {text}
                        </motion.span>
                      </span>
                      {i < group.length - 1 && " "}
                    </Fragment>
                  ))}
                </span>
                {g < HEADLINE.length - 1 && " "}
              </Fragment>
            ))}
          </span>

          <motion.span
            variants={fadeUp}
            className="mt-3 block text-[clamp(1rem,2.3vw,1.875rem)] leading-snug font-extrabold tracking-[0.01em] text-balance text-navy lg:mt-4"
          >
            To‘liq naslchilik zanjirini mahalliylashtirish loyihasi
          </motion.span>
        </h1>

        <motion.p
          variants={fadeUp}
          className="mt-7 inline-flex items-center gap-3 rounded-3xl border border-line bg-white px-5 py-2.5 text-left text-xs leading-relaxed font-bold tracking-[0.12em] text-navy uppercase shadow-[0_8px_24px_-12px_rgb(18_52_91/0.25)] sm:rounded-full sm:py-2 sm:text-[0.8125rem]"
        >
          <MapPin aria-hidden className="size-4 shrink-0 text-accent" strokeWidth={2.2} />
          <span>
            <span className="block sm:inline">{LOCATION.region}</span>
            <span aria-hidden className="mx-2 hidden text-navy/30 sm:inline">
              ·
            </span>
            <span className="block sm:inline">{LOCATION.district}</span>
          </span>
        </motion.p>
      </div>

      {/* Dotted ornaments from the slide header, left and right of the title.
          Placed last in source order so they join the intro stagger after the text. */}
      <motion.div
        aria-hidden
        style={{ y: driftSlow }}
        className="absolute top-36 left-[max(1.5rem,calc(50%-41rem))] hidden xl:block"
      >
        <motion.div variants={ornament}>
          <DotPattern className="animate-float" />
        </motion.div>
      </motion.div>
      <motion.div
        aria-hidden
        style={{ y: driftFast }}
        className="absolute top-36 right-[max(1.5rem,calc(50%-41rem))] hidden xl:block"
      >
        <motion.div variants={ornament}>
          <DotPattern className="animate-float [animation-delay:-5s]" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
