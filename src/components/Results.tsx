import { DollarSign, Egg, Gauge, HardHat, Landmark, RefreshCw } from "lucide-react";
import { sectionIndex } from "../data/content";
import { KpiCard } from "./ui/KpiCard";
import { RevealGroup } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const ICON = { className: "size-6 sm:size-7", strokeWidth: 1.6, "aria-hidden": true } as const;

/** Dollar sign inside circulating arrows — the export-turnover mark from the slide. */
function ExportIcon() {
  return (
    <span aria-hidden className="relative flex items-center justify-center">
      <RefreshCw {...ICON} />
      <DollarSign className="absolute size-3 sm:size-3.5" strokeWidth={2.6} />
    </span>
  );
}

const RESULTS = [
  {
    icon: <Landmark {...ICON} />,
    label: "Yillik valyuta tejamkorligi",
    value: 36,
    unit: "mln doll. / yil",
  },
  {
    icon: <Egg {...ICON} />,
    label: "Nasilli jo‘ja ishlab chiqarish",
    note: "3 mln dona sotuv",
    value: 21,
    unit: "mln doll. / yil",
  },
  {
    icon: <Gauge {...ICON} />,
    label: "Jo‘ja ishlab chiqarish quvvati",
    value: 72,
    unit: "mln dona / yil",
  },
  {
    icon: <ExportIcon />,
    label: "Bir kunlik jo‘ja eksporti",
    value: 43,
    unit: "mln doll. / yil",
  },
  {
    icon: <HardHat {...ICON} />,
    label: "Yangi ish o‘rinlari",
    value: 300,
    unit: "nafar",
  },
];

/** Placement on the 2-col (`sm`), 6-track (`lg`) and 5-col (`xl`) grids: rows of 3 + 2, then 5 across. */
const SPAN = [
  "lg:col-span-2 xl:col-span-1 deck:col-span-1",
  "lg:col-span-2 xl:col-span-1 deck:col-span-1",
  "lg:col-span-2 xl:col-span-1 deck:col-span-1",
  "lg:col-span-3 xl:col-span-1 deck:col-span-1",
  "sm:col-span-2 lg:col-span-3 xl:col-span-1 deck:col-span-1",
];

export function Results() {
  return (
    <section id="natijalar" aria-labelledby="natijalar-title" className="wrap scroll-mt-20 pt-16 lg:pt-24 deck:pt-0">
      <SectionHeading
        id="natijalar-title"
        index={sectionIndex("natijalar")}
        title="Erishiladigan natijalar"
      />

      <RevealGroup
        interval={0.1}
        className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-6 xl:grid-cols-5 deck:grid-cols-5"
      >
        {RESULTS.map((result, i) => (
          <KpiCard key={result.label} {...result} className={SPAN[i]} />
        ))}
      </RevealGroup>
    </section>
  );
}
