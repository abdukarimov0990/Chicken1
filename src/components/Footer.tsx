import { motion } from "framer-motion";
import { ArrowUp, Egg, MapPin } from "lucide-react";
import { BREED, COMPANY_NAME, LOCATION, PARTNER_NAME, SUMMARY } from "../data/content";
import { drawX, fadeUp } from "../lib/motion";
import { DotPattern } from "./ui/DotPattern";
import { RevealGroup } from "./ui/Reveal";

/**
 * Closing slide: the whole project restated as one grid of figures.
 * In the deck the slide supplies the navy background and the controls replace the bottom bar.
 */
export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-navy text-white deck:overflow-visible deck:bg-transparent">
      <DotPattern
        columns={11}
        rows={3}
        color="rgb(255 255 255 / 0.16)"
        className="absolute top-12 right-[max(1.5rem,calc(50%-41rem))] -z-10 hidden animate-float lg:block deck:top-0"
      />

      <section id="xulosa" aria-labelledby="xulosa-title" className="wrap scroll-mt-14 py-16 lg:py-24 deck:py-0">
        <RevealGroup interval={0.1}>
          <motion.p
            variants={fadeUp}
            className="text-xs font-bold tracking-[0.3em] text-white/60 uppercase"
          >
            Xulosa
          </motion.p>
          <motion.h2
            variants={fadeUp}
            id="xulosa-title"
            className="mt-4 text-3xl font-extrabold tracking-tight uppercase sm:text-4xl lg:text-5xl"
          >
            Loyiha bir qarashda
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-2xl text-base leading-relaxed font-medium text-pretty text-white/75 sm:text-lg"
          >
            “{PARTNER_NAME}” kompaniyasi bilan hamkorlikda {BREED} tovuq zotining to‘liq naslchilik
            zanjirini mahalliylashtirish — {LOCATION.region}, {LOCATION.district}.
          </motion.p>
        </RevealGroup>

        <RevealGroup
          interval={0.07}
          className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:mt-16 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-14 deck:mt-12 deck:gap-y-12"
        >
          {SUMMARY.map((item) => (
            <motion.div key={item.label} variants={fadeUp} className="relative pt-5">
              <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-white/15" />
              <motion.span
                aria-hidden
                variants={drawX}
                className="absolute top-0 left-0 h-0.5 w-8 origin-left bg-accent"
              />
              <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1 leading-none font-extrabold">
                <span className="text-4xl tracking-[-0.04em] tabular-nums sm:text-5xl lg:text-[3.5rem]">
                  {item.value}
                </span>
                <span className="text-[0.6875rem] tracking-[0.14em] text-white/70 uppercase sm:text-xs">
                  {item.unit}
                </span>
              </p>
              <p className="mt-3 text-sm leading-snug font-medium text-white/70">{item.label}</p>
            </motion.div>
          ))}
        </RevealGroup>
      </section>

      <div className="border-t border-white/10 deck:hidden">
        <div className="wrap flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-lg bg-white text-navy">
              <Egg aria-hidden className="size-[1.125rem]" strokeWidth={2} />
            </span>
            <span className="text-xs font-extrabold tracking-[0.18em] uppercase">{COMPANY_NAME}</span>
          </p>

          <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-white/70">
            <MapPin aria-hidden className="size-4 shrink-0 text-white/50" strokeWidth={2} />
            {LOCATION.region}, {LOCATION.district}
          </p>

          <a
            href="#top"
            className="group inline-flex items-center gap-2.5 self-start text-xs font-bold tracking-[0.16em] text-white/80 uppercase transition-colors duration-300 hover:text-white sm:self-auto"
          >
            Yuqoriga
            <span className="flex size-8 items-center justify-center rounded-full border border-white/25 transition-[translate,border-color] duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:border-white/60">
              <ArrowUp aria-hidden className="size-4" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
