import { motion } from "framer-motion";
import { EXPORT_COUNTRIES, sectionIndex } from "../data/content";
import { stagger } from "../lib/motion";
import { useRevealProps } from "../lib/reveal";
import { CountryCard } from "./ui/CountryCard";
import { SectionHeading } from "./ui/SectionHeading";

const list = stagger(0.08);

export function ExportGeography() {
  const reveal = useRevealProps();

  return (
    <section id="eksport" aria-labelledby="eksport-title" className="wrap scroll-mt-20 pt-16 lg:pt-24 deck:pt-0">
      <SectionHeading
        id="eksport-title"
        index={sectionIndex("eksport")}
        title="Eksport geografiyasi"
        aside={`${EXPORT_COUNTRIES.length} ta davlat`}
      />

      <motion.ul
        variants={list}
        {...reveal}
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6 deck:gap-5"
      >
        {EXPORT_COUNTRIES.map((country) => (
          <CountryCard key={country.name} {...country} />
        ))}
      </motion.ul>
    </section>
  );
}
