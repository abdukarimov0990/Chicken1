import { motion } from "framer-motion";
import { AnimatedCounter } from "../components/ui/AnimatedCounter";
import { RevealGroup } from "../components/ui/Reveal";
import { BENEFIT, BREED, EXPORT_COUNTRIES } from "../data/content";
import { fadeUp } from "../lib/motion";

const START = 1.75;

function Figure({ children }: { children: string }) {
  return <strong className="font-extrabold whitespace-nowrap text-navy">{children}</strong>;
}

function BlockTitle({ children }: { children: string }) {
  return (
    <h2 className="flex items-center gap-2.5 text-xs font-extrabold tracking-[0.14em] text-navy uppercase">
      <span aria-hidden className="h-[0.1875rem] w-6 rounded-full bg-accent" />
      {children}
    </h2>
  );
}

/** The slide's wide white card: project advantage on the left, export geography on the right. */
export function PosterBenefits() {
  return (
    <RevealGroup
      eager
      interval={0.14}
      timing={{ notBefore: START }}
      className="grid grid-cols-[minmax(0,1.32fr)_minmax(0,1fr)] rounded-[1.5rem] bg-white shadow-card ring-1 ring-navy/[0.07]"
    >
      <motion.section variants={fadeUp} aria-label="Loyiha afzalligi" className="flex items-center gap-7 py-4 pr-7 pl-8">
        <div className="min-w-0 flex-1">
          <BlockTitle>Loyiha afzalligi</BlockTitle>
          <p className="mt-2 text-[0.9375rem] leading-[1.55] font-medium text-pretty text-ink">
            <Figure>60 ming bosh</Figure> {BREED} zotli praroditel parrandalardan <Figure>3 mln boshgacha</Figure>{" "}
            ota-ona avlodi yetishtiriladi. Ularning <Figure>500 ming boshi</Figure> korxonada saqlanib, yiliga{" "}
            <strong className="font-extrabold whitespace-nowrap text-accent">85 mln donagacha</strong> inkubatsion
            tuxum ishlab chiqariladi.
          </p>
        </div>

        <div className="shrink-0 border-l border-navy/12 pl-7">
          <p className="flex items-baseline gap-2 leading-none font-extrabold">
            <AnimatedCounter
              value={BENEFIT.output.value}
              startAfter={START + 0.2}
              className="text-[3.5rem] tracking-[-0.05em] text-accent"
            />
            <span className="text-[0.9375rem] leading-tight tracking-tight text-navy uppercase">
              mln
              <br />
              dona
            </span>
          </p>
          <p className="mt-1.5 text-[0.6875rem] font-semibold text-muted">Inkubatsion tuxum · yiliga</p>
        </div>
      </motion.section>

      <motion.section
        variants={fadeUp}
        aria-label="Eksport geografiyasi"
        className="flex flex-col justify-center border-l border-navy/12 py-4 pr-8 pl-7"
      >
        <BlockTitle>Eksport geografiyasi</BlockTitle>
        <ul className="mt-3 grid grid-cols-6 gap-2">
          {EXPORT_COUNTRIES.map((country) => (
            <li key={country.name} className="group flex flex-col items-center text-center">
              <span className="block w-[3.75rem] overflow-hidden rounded-md shadow-[0_0.375rem_1rem_-0.375rem_rgb(18_52_91/0.4)] ring-1 ring-navy/10 transition-[scale] duration-500 ease-out-expo group-hover:scale-110">
                <img
                  src={country.flag}
                  alt={`${country.name} bayrog‘i`}
                  width={60}
                  height={45}
                  decoding="async"
                  className="block aspect-[4/3] w-full object-cover"
                />
              </span>
              <span className="mt-2 text-xs leading-tight font-bold text-navy/80 transition-colors duration-500 group-hover:text-navy">
                {country.name}
              </span>
            </li>
          ))}
        </ul>
      </motion.section>
    </RevealGroup>
  );
}
