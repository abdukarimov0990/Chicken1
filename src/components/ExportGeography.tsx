import { motion } from "framer-motion";
import { EXPORT_COUNTRIES, sectionIndex } from "../data/content";
import { stagger, VIEWPORT } from "../lib/motion";
import { CountryCard } from "./ui/CountryCard";
import { SectionHeading } from "./ui/SectionHeading";

const list = stagger(0.08);

export function ExportGeography() {
  return (
    <section id="eksport" aria-labelledby="eksport-title" className="wrap scroll-mt-20 pt-16 lg:pt-24">
      <SectionHeading
        id="eksport-title"
        index={sectionIndex("eksport")}
        title="Eksport geografiyasi"
        aside={`${EXPORT_COUNTRIES.length} ta davlat`}
      />

      <motion.ul
        variants={list}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6"
      >
        {EXPORT_COUNTRIES.map((country) => (
          <CountryCard key={country.name} {...country} />
        ))}
      </motion.ul>
    </section>
  );
}
