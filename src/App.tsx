import { MotionConfig } from "framer-motion";
import { CurrentProduction } from "./components/CurrentProduction";
import { ExpansionRoadmap } from "./components/ExpansionRoadmap";
import { ExportGeography } from "./components/ExportGeography";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { JointVentureSlide } from "./components/JointVentureSlide";
import { ProjectBenefits } from "./components/ProjectBenefits";
import { ProjectOverview } from "./components/ProjectOverview";
import { Results } from "./components/Results";
import { ScrollPage } from "./components/ScrollPage";
import { Deck, type SlideDefinition } from "./deck/Deck";
import { useDeckMode } from "./deck/useDeckMode";

/** One slide per navigation section, in the same order as `SECTIONS`. */
const SLIDES: SlideDefinition[] = [
  {
    id: "loyiha",
    tone: "light",
    content: (
      <>
        <Hero />
        <ProjectOverview jointVenture={false} />
      </>
    ),
  },
  { id: "hamkor", tone: "light", content: <JointVentureSlide /> },
  { id: "afzallik", tone: "light", content: <ProjectBenefits /> },
  { id: "eksport", tone: "light", content: <ExportGeography /> },
  { id: "natijalar", tone: "light", content: <Results /> },
  { id: "ishlab-chiqarish", tone: "light", content: <CurrentProduction /> },
  { id: "rivojlanish", tone: "mist", content: <ExpansionRoadmap /> },
  { id: "xulosa", tone: "dark", content: <Footer /> },
];

export default function App() {
  // Large screens present the sections as a horizontal slide deck; smaller ones scroll.
  const isDeck = useDeckMode();

  return (
    // Honour the visitor's reduced-motion setting across every animation on the page.
    <MotionConfig reducedMotion="user">
      {isDeck ? (
        <Deck slides={SLIDES} />
      ) : (
        <ScrollPage footer={<Footer />}>
          <Hero />
          <ProjectOverview />
          <ProjectBenefits />
          <ExportGeography />
          <Results />
          <CurrentProduction />
          <ExpansionRoadmap />
        </ScrollPage>
      )}
    </MotionConfig>
  );
}
