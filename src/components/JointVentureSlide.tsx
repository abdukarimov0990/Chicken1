import { sectionIndex } from "../data/content";
import { JointVenture } from "./JointVenture";
import { SectionHeading } from "./ui/SectionHeading";

/** In the slide deck the joint venture gets a slide of its own instead of a row in the overview panel. */
export function JointVentureSlide() {
  return (
    <section id="hamkor" aria-labelledby="hamkor-title" className="wrap">
      <SectionHeading id="hamkor-title" index={sectionIndex("hamkor")} title="Xitoy bilan qo‘shma korxona" />
      <JointVenture standalone />
    </section>
  );
}
