import { motion } from "framer-motion";
import type { Result } from "../../data/results";
import { fadeUp } from "../../lib/motion";
import { cn } from "../../lib/cn";
import { AnimatedCounter } from "./AnimatedCounter";

type KpiCardProps = Result & {
  /** `dark` sets today's figure apart from the projected ones. */
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Result indicator: label, oversized figure, small unit.
 * Lays out as a compact row on phones and as a column from `sm` up.
 */
export function KpiCard({ Icon, label, note, value, decimals, unit, tone = "light", className }: KpiCardProps) {
  const dark = tone === "dark";

  return (
    <motion.article
      variants={fadeUp}
      className={cn(
        "group relative flex items-center justify-between gap-4 overflow-hidden rounded-3xl border p-5",
        "transition-[translate,box-shadow,border-color] duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-card",
        "sm:flex-col sm:items-start sm:justify-start sm:gap-0 sm:p-7",
        dark ? "border-navy bg-navy text-white" : "border-line bg-white hover:border-navy/20",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-accent transition-[scale] duration-700 ease-out-expo group-hover:scale-x-100"
      />

      <div className="flex min-w-0 items-center gap-4 sm:block">
        <div
          className={cn(
            "flex size-12 shrink-0 items-center justify-center rounded-2xl sm:size-14",
            dark ? "bg-white/10 text-white" : "bg-mist text-navy",
          )}
        >
          <Icon className="size-6 sm:size-7" />
        </div>
        <div className="min-w-0 sm:mt-6">
          <h3
            className={cn(
              "text-xs leading-snug font-bold tracking-[0.08em] uppercase sm:min-h-[2.75em] sm:text-[0.8125rem]",
              dark ? "text-white" : "text-navy",
            )}
          >
            {label}
          </h3>
          {note && (
            <p className={cn("mt-1.5 text-xs font-semibold", dark ? "text-white/70" : "text-muted")}>{note}</p>
          )}
        </div>
      </div>

      <div className="shrink-0 text-right sm:mt-auto sm:pt-8 sm:text-left">
        <p className={cn("leading-none font-extrabold tracking-[-0.04em]", dark ? "text-white" : "text-accent")}>
          <AnimatedCounter
            value={value}
            decimals={decimals}
            className="text-5xl sm:text-[clamp(3.75rem,5.4vw,5rem)]"
          />
        </p>
        <p
          className={cn(
            "mt-2 text-[0.6875rem] font-bold tracking-[0.16em] uppercase sm:mt-3 sm:text-xs",
            dark ? "text-white/80" : "text-navy",
          )}
        >
          {unit}
        </p>
      </div>
    </motion.article>
  );
}
