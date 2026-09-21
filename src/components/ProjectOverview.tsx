import { ChartNoAxesCombined, DollarSign, MapPinned, Warehouse } from "lucide-react";
import { LOCATION, POULTRY_HOUSES, PROJECT_VALUE } from "../data/content";
import { ImageGallery } from "./ImageGallery";
import { JointVenture } from "./JointVenture";
import { Partnership } from "./Partnership";
import { InfoCard } from "./ui/InfoCard";
import { Reveal, RevealGroup } from "./ui/Reveal";

/**
 * The dashed "project passport" panel from the slide.
 * Source order is the phone reading order (figures → partner → joint venture → photos);
 * from `lg` up the blocks are placed explicitly to rebuild the slide's three columns,
 * with the joint-venture row running underneath.
 */
export function ProjectOverview() {
  return (
    <section id="loyiha" aria-labelledby="loyiha-title" className="wrap scroll-mt-20">
      <h2 id="loyiha-title" className="sr-only">
        Loyiha haqida asosiy ma’lumotlar
      </h2>

      <Reveal timing={{ notBefore: 0.9 }} className="rounded-[1.75rem] border-[1.5px] border-dashed border-navy/35 p-4 sm:p-6 lg:p-7">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)_minmax(0,1.58fr)] lg:gap-0">
          <RevealGroup
            interval={0.14}
            timing={{ notBefore: 1.1 }}
            className="flex flex-col gap-4 sm:flex-row lg:col-start-1 lg:row-start-1 lg:flex-col lg:gap-5 lg:pr-7"
          >
            <InfoCard
              icon={ChartNoAxesCombined}
              badge={DollarSign}
              label="Loyiha qiymati"
              value={PROJECT_VALUE.value}
              unit={PROJECT_VALUE.unit}
            />
            <InfoCard
              icon={MapPinned}
              badge={Warehouse}
              overline={LOCATION.region}
              label={`${LOCATION.district}da`}
              value={POULTRY_HOUSES.value}
              suffix={POULTRY_HOUSES.suffix}
              unit={POULTRY_HOUSES.unit}
            />
          </RevealGroup>

          <div className="lg:col-start-2 lg:row-start-1 lg:border-x lg:border-navy/15 lg:px-7">
            <Partnership />
          </div>

          <div
            id="hamkor"
            className="scroll-mt-24 border-t border-navy/15 pt-6 lg:col-span-3 lg:row-start-2 lg:mt-7 lg:pt-7"
          >
            <JointVenture />
          </div>

          <div className="lg:col-start-3 lg:row-start-1 lg:pl-7">
            <ImageGallery />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
