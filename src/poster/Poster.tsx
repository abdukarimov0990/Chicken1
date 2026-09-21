import { Maximize, Minimize } from "lucide-react";
import { useFullscreen } from "../hooks/useFullscreen";
import { PosterBenefits } from "./PosterBenefits";
import { PosterHeader } from "./PosterHeader";
import { PosterOverview } from "./PosterOverview";
import { PosterResults } from "./PosterResults";

/**
 * The whole presentation on one screen, composed like the original slide:
 * title, the dashed project panel, the advantage + export card, then the results row.
 *
 * Every measure is in rem and the root font follows the screen (see index.css), so the
 * poster keeps these exact proportions on any large display. The panel row is the only
 * flexible one: it absorbs whatever height the fixed rows leave, so nothing can overflow.
 */
export function Poster() {
  const fullscreen = useFullscreen();

  return (
    <main className="relative mx-auto grid h-full max-w-[118rem] grid-rows-[auto_minmax(0,1fr)_auto_auto] gap-3.5 px-10 pt-5 pb-6">
      <PosterHeader />
      <PosterOverview />
      <PosterBenefits />
      <PosterResults />

      {fullscreen.supported && (
        <button
          type="button"
          onClick={fullscreen.toggle}
          aria-label={fullscreen.active ? "To‘liq ekrandan chiqish" : "To‘liq ekran rejimi"}
          title={fullscreen.active ? "To‘liq ekrandan chiqish (F)" : "To‘liq ekran (F)"}
          className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full text-navy/35 transition-colors duration-300 hover:bg-navy/[0.07] hover:text-navy"
        >
          {fullscreen.active ? (
            <Minimize aria-hidden className="size-4" strokeWidth={2} />
          ) : (
            <Maximize aria-hidden className="size-4" strokeWidth={2} />
          )}
        </button>
      )}
    </main>
  );
}
