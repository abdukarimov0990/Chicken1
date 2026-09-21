import chicks800 from "../assets/gallery/chicks-800.webp";
import chicks1400 from "../assets/gallery/chicks-1400.webp";
import chicksJpg from "../assets/gallery/chicks-1400.jpg";
import facility800 from "../assets/gallery/facility-800.webp";
import facility1400 from "../assets/gallery/facility-1400.webp";
import facilityJpg from "../assets/gallery/facility-1400.jpg";
import farm800 from "../assets/gallery/farm-800.webp";
import farm1400 from "../assets/gallery/farm-1400.webp";
import farmJpg from "../assets/gallery/farm-1400.jpg";
import hatchery800 from "../assets/gallery/hatchery-800.webp";
import hatchery1400 from "../assets/gallery/hatchery-1400.webp";
import hatcheryJpg from "../assets/gallery/hatchery-1400.jpg";
import { ImageCard, type GalleryImage } from "./ui/ImageCard";
import { RevealGroup } from "./ui/Reveal";

const IMAGES: GalleryImage[] = [
  {
    src: farmJpg,
    webpSrcSet: `${farm800} 800w, ${farm1400} 1400w`,
    alt: "Zamonaviy parrandachilik majmuasi binolarining umumiy ko‘rinishi",
    label: "Parrandachilik majmuasi",
  },
  {
    src: facilityJpg,
    webpSrcSet: `${facility800} 800w, ${facility1400} 1400w`,
    alt: "Zamonaviy parrandaxona ichida boqilayotgan tovuqlar",
    label: "Zamonaviy parrandaxona",
  },
  {
    src: hatcheryJpg,
    webpSrcSet: `${hatchery800} 800w, ${hatchery1400} 1400w`,
    alt: "Inkubatsiya sexidagi tuxumlar",
    label: "Inkubatsiya sexi",
  },
  {
    src: chicksJpg,
    webpSrcSet: `${chicks800} 800w, ${chicks1400} 1400w`,
    alt: "Inkubatordan chiqqan bir kunlik jo‘jalar",
    label: "Bir kunlik jo‘jalar",
  },
];

/** 2 × 2 from `sm` up (matching the slide); a single column on phones. */
const SIZES = "(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 92vw";

export function ImageGallery() {
  return (
    <RevealGroup
      interval={0.12}
      timing={{ notBefore: 1.4 }}
      className="grid h-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-rows-2"
    >
      {IMAGES.map((image, index) => (
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
