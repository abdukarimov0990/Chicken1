import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../../lib/motion";
import { cn } from "../../lib/cn";
import { AnimatedCounter } from "./AnimatedCounter";

type KpiCardProps = {
  icon: ReactNode;
  label: string;
  note?: string;
  value: number;
  unit: string;
  className?: string;
};

/**
 * Result indicator: navy label, oversized red figure, small unit.
 * Lays out as a compact row on phones and as a column from `sm` up.
 */
export function KpiCard({ icon, label, note, value, unit, className }: KpiCardProps) {
  return (
    <motion.article
      variants={fadeUp}
      className={cn(
        "group relative flex items-center justify-between gap-4 overflow-hidden rounded-3xl border border-line bg-white p-5",
        "transition-[translate,box-shadow,border-color] duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-navy/20 hover:shadow-card",
        "sm:flex-col sm:items-start sm:justify-start sm:gap-0 sm:p-7",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-accent transition-[scale] duration-700 ease-out-expo group-hover:scale-x-100"
      />

      <div className="flex min-w-0 items-center gap-4 sm:block">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-mist text-navy sm:size-14">
          {icon}
        </div>
        <div className="min-w-0 sm:mt-6">
          <h3 className="text-xs leading-snug font-bold tracking-[0.08em] text-navy uppercase sm:min-h-[2.75em] sm:text-[0.8125rem]">
            {label}
          </h3>
          {note && <p className="mt-1.5 text-xs font-semibold text-muted">{note}</p>}
        </div>
      </div>

      <div className="shrink-0 text-right sm:mt-auto sm:pt-8 sm:text-left">
        <p className="leading-none font-extrabold tracking-[-0.04em] text-accent">
          <AnimatedCounter value={value} className="text-5xl sm:text-[clamp(3.75rem,5.4vw,5rem)]" />
        </p>
        <p className="mt-2 text-[0.6875rem] font-bold tracking-[0.16em] text-navy uppercase sm:mt-3 sm:text-xs">
          {unit}
        </p>
      </div>
    </motion.article>
  );
}
