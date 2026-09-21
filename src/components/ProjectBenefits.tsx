import { Fragment } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Egg } from "lucide-react";
import { BENEFIT, BREED, sectionIndex } from "../data/content";
import { fadeUp } from "../lib/motion";
import { AnimatedCounter } from "./ui/AnimatedCounter";
import { DotPattern } from "./ui/DotPattern";
import { RevealGroup } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

function Figure({ children }: { children: string }) {
  return <strong className="font-extrabold whitespace-nowrap text-navy">{children}</strong>;
}

/** The wide "Loyiha afzalligi" card: the breeding chain in words, with its yearly output. */
export function ProjectBenefits() {
  return (
    <section id="afzallik" aria-labelledby="afzallik-title" className="wrap scroll-mt-20 pt-16 lg:pt-24 deck:pt-0">
      <SectionHeading id="afzallik-title" index={sectionIndex("afzallik")} title="Loyiha afzalligi" />

      <RevealGroup
        interval={0.12}
        className="grid overflow-hidden rounded-[1.75rem] bg-white shadow-card ring-1 ring-navy/[0.07] lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]"
      >
        <div className="p-6 sm:p-10 lg:p-12">
          <motion.p
            variants={fadeUp}
            className="text-lg leading-relaxed font-medium text-pretty text-ink sm:text-xl lg:text-[1.375rem] lg:leading-[1.65]"
          >
            <Figure>60 ming bosh</Figure> {BREED} zotli praroditel parrandalardan{" "}
            <Figure>3 mln boshgacha</Figure> ota-ona avlodi yetishtiriladi. Ularning{" "}
            <Figure>500 ming boshi</Figure> korxonada saqlanib, yiliga{" "}
            <strong className="font-extrabold whitespace-nowrap text-accent">85 mln donagacha</strong>{" "}
            inkubatsion tuxum ishlab chiqariladi.
          </motion.p>

          <motion.ol
            variants={fadeUp}
            aria-label="Naslchilik zanjiri bosqichlari"
            className="mt-8 flex flex-col gap-4 border-t border-navy/10 pt-7 sm:flex-row sm:items-start sm:gap-3 lg:mt-10"
          >
            {BENEFIT.chain.map((step, i) => (
              <Fragment key={step.value}>
                {i > 0 && (
                  <li aria-hidden className="hidden pt-1 text-navy/30 sm:block">
                    <ChevronRight className="size-5" strokeWidth={2} />
                  </li>
                )}
                <li className="flex-1 border-l-2 border-navy/15 pl-4 sm:border-l-0 sm:pl-0">
                  <p className="text-lg leading-tight font-extrabold tracking-tight text-navy uppercase xl:text-xl deck:text-xl">
                    {step.value}
                  </p>
                  <p className="mt-1 text-sm leading-snug font-medium text-muted">{step.caption}</p>
                </li>
              </Fragment>
            ))}
          </motion.ol>
        </div>

        <motion.div
          variants={fadeUp}
          className="relative flex flex-col justify-center overflow-hidden bg-mist p-6 sm:p-10 lg:p-12"
        >
          <DotPattern
            columns={6}
            rows={6}
            className="absolute top-6 right-6 opacity-25 animate-float"
          />
          <p className="flex items-center gap-2.5 text-xs font-bold tracking-[0.16em] text-navy uppercase">
            <Egg aria-hidden className="size-5 shrink-0 text-navy/70" strokeWidth={1.8} />
            Yillik ishlab chiqarish
          </p>
          <p className="mt-4 flex flex-wrap items-baseline gap-x-4 leading-none font-extrabold">
            <AnimatedCounter
              value={BENEFIT.output.value}
              className="text-[clamp(5.5rem,10vw,9rem)] tracking-[-0.05em] text-accent"
            />
            <span className="text-2xl tracking-tight text-navy uppercase sm:text-3xl">{BENEFIT.output.unit}</span>
          </p>
          <p className="mt-4 text-sm font-semibold tracking-wide text-muted">Inkubatsion tuxum · yiliga</p>
        </motion.div>
      </RevealGroup>
    </section>
  );
}
