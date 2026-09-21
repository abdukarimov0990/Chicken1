import { MotionConfig } from "framer-motion";
import { ExportGeography } from "./components/ExportGeography";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { ProjectBenefits } from "./components/ProjectBenefits";
import { ProjectOverview } from "./components/ProjectOverview";
import { Results } from "./components/Results";
import { ScrollPage } from "./components/ScrollPage";
import { usePosterMode } from "./hooks/usePosterMode";
import { Poster } from "./poster/Poster";

export default function App() {
  // Presentation screens get everything on one screen; phones and tablets scroll.
  const isPoster = usePosterMode();

  return (
    // Honour the visitor's reduced-motion setting across every animation on the page.
    <MotionConfig reducedMotion="user">
      {isPoster ? (
        <Poster />
      ) : (
        <ScrollPage footer={<Footer />}>
          <Hero />
          <ProjectOverview />
          <ProjectBenefits />
          <ExportGeography />
          <Results />
        </ScrollPage>
      )}
    </MotionConfig>
  );
}
