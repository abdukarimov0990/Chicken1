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
import type { GalleryImage } from "../components/ui/ImageCard";

/** The four photographs shared by the scrolling page and the poster. */
export const GALLERY: GalleryImage[] = [
  {
    src: farmJpg,
    webpSrcSet: `${farm800} 800w, ${farm1400} 1400w`,
    alt: "Zamonaviy parrandachilik majmuasi binolarining yuqoridan ko‘rinishi",
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
    alt: "Inkubatsiya sexidagi lotoklarga terilgan tuxumlar",
    label: "Inkubatsiya sexi",
  },
  {
    src: chicksJpg,
    webpSrcSet: `${chicks800} 800w, ${chicks1400} 1400w`,
    alt: "Inkubatordan chiqqan bir kunlik jo‘jalar",
    label: "Bir kunlik jo‘jalar",
  },
];
