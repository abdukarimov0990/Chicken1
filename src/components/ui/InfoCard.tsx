import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { fadeUp } from "../../lib/motion";
import { AnimatedCounter } from "./AnimatedCounter";

type InfoCardProps = {
  icon: LucideIcon;
  /** Small secondary mark pinned to the icon tile. */
  badge?: LucideIcon;
  /** Quiet line above the label, e.g. the wider region. */
  overline?: string;
  label: string;
  value: number;
  suffix?: string;
  unit: string;
};

/** Grey rounded card from the left column of the slide: icon, label, red figure, unit. */
export function InfoCard({ icon: Icon, badge: Badge, overline, label, value, suffix, unit }: InfoCardProps) {
  return (
    <motion.article
      variants={fadeUp}
      className="group flex flex-1 items-center gap-4 rounded-3xl bg-mist p-5 sm:p-6"
    >
      <div className="relative flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white text-navy shadow-card transition-[translate] duration-500 ease-out-expo group-hover:-translate-y-1">
        <Icon aria-hidden className="size-8" strokeWidth={1.6} />
        {Badge && (
          <span className="absolute -right-2 -bottom-2 flex size-7 items-center justify-center rounded-full bg-navy text-white ring-[3px] ring-mist">
            <Badge aria-hidden className="size-3.5" strokeWidth={2.2} />
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1 text-center">
        <h3 className="text-xs leading-snug font-bold tracking-[0.1em] text-navy uppercase">
          {overline && (
            <span className="mb-0.5 block text-xs font-semibold tracking-normal text-muted normal-case">
              {overline}
            </span>
          )}
          {label}
        </h3>
        <p className="mt-2 flex items-baseline justify-center gap-1.5 leading-none font-extrabold text-accent">
          <AnimatedCounter value={value} className="text-[3.5rem] tracking-[-0.04em] xl:text-[3.75rem]" />
          {suffix && <span className="text-2xl">{suffix}</span>}
        </p>
        <p className="mt-2.5 text-xs leading-snug font-bold tracking-[0.1em] text-balance text-navy uppercase">
          {unit}
        </p>
      </div>
    </motion.article>
  );
}
