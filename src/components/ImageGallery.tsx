import { GALLERY } from "../data/gallery";
import { ImageCard } from "./ui/ImageCard";
import { RevealGroup } from "./ui/Reveal";

/** 2 × 2 from `sm` up (matching the slide); a single column on phones. */
const SIZES = "(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 92vw";

export function ImageGallery() {
  return (
    <RevealGroup
      interval={0.12}
      timing={{ notBefore: 1.4 }}
      className="grid h-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-rows-2"
    >
      {GALLERY.map((image, index) => (
        <ImageCard
          key={image.label}
          {...image}
          index={index}
          sizes={SIZES}
          className="aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto lg:min-h-44"
        />
      ))}
    </RevealGroup>
  );
}
