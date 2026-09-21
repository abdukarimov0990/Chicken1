import { motion } from "framer-motion";
import { fadeUp } from "../../lib/motion";

type CountryCardProps = {
  name: string;
  flag: string;
};

export function CountryCard({ name, flag }: CountryCardProps) {
  return (
    <motion.li
      variants={fadeUp}
      className="group border-draw relative flex flex-col items-center rounded-2xl border border-line bg-white px-4 py-6 text-center transition-[translate,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-card sm:py-7 deck:py-14"
    >
      <div className="w-[4.5rem] overflow-hidden rounded-md shadow-[0_6px_16px_-6px_rgb(18_52_91/0.35)] ring-1 ring-navy/10 transition-[scale] duration-500 ease-out-expo group-hover:scale-110 sm:w-20 deck:w-28">
        <img
          src={flag}
          alt={`${name} bayrog‘i`}
          width={80}
          height={60}
          loading="lazy"
          decoding="async"
          className="block aspect-[4/3] w-full object-cover"
        />
      </div>
      <p className="mt-5 text-[0.8125rem] deck:mt-8 deck:text-[0.9375rem] font-bold tracking-[0.12em] text-navy/75 uppercase transition-colors duration-500 group-hover:text-navy">
        {name}
      </p>
    </motion.li>
  );
}
