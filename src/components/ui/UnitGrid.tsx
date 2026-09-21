import { useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import { EASE_OUT, stagger } from "../../lib/motion";
import { cn } from "../../lib/cn";

const unit: Variants = {
  hidden: { opacity: 0, scale: 0.3 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: EASE_OUT } },
};

type UnitGridProps = {
  count: number;
  /** `solid` for what exists today, `outline` for what is planned. */
  tone: "solid" | "outline";
  className?: string;
};

/**
 * One square per enterprise, so the scale of each figure can be read at a glance.
 * Squares keep a fixed size so the cards stay visually comparable.
 */
export function UnitGrid({ count, tone, className }: UnitGridProps) {
  const variants = useMemo(() => stagger(Math.min(0.03, 0.9 / count), 0.35), [count]);

  return (
    <motion.div
      aria-hidden
      variants={variants}
      className={cn("flex flex-wrap gap-1.5", className)}
    >
      {Array.from({ length: count }, (_, i) => (
        <motion.span
          key={i}
          variants={unit}
          className={cn(
            "size-3.5 rounded-[4px]",
            tone === "solid" ? "bg-navy" : "border-[1.5px] border-accent/70 bg-accent/10",
          )}
        />
      ))}
    </motion.div>
  );
}
