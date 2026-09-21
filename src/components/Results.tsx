import { sectionIndex } from "../data/content";
import { CURRENT_RESULT, EXPECTED_RESULTS } from "../data/results";
import { KpiCard } from "./ui/KpiCard";
import { RevealGroup } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

/** Today's output first (dark card), then the five projected results. */
export function Results() {
  return (
    <section id="natijalar" aria-labelledby="natijalar-title" className="wrap scroll-mt-20 pt-16 lg:pt-24">
      <SectionHeading
        id="natijalar-title"
        index={sectionIndex("natijalar")}
        title="Erishiladigan natijalar"
      />

      <RevealGroup interval={0.1} className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        <KpiCard {...CURRENT_RESULT} tone="dark" />
        {EXPECTED_RESULTS.map((result) => (
          <KpiCard key={result.label} {...result} />
        ))}
      </RevealGroup>
    </section>
  );
}
