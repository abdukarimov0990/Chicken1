import { useMemo } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeUp, stagger, type Timing } from "../../lib/motion";
import { useRevealProps } from "../../lib/reveal";

type RevealProps = HTMLMotionProps<"div"> & { timing?: Timing };

/** Fades a single block up into place when it scrolls into view (or its slide takes the stage). */
export function Reveal({ timing, ...props }: RevealProps) {
  const reveal = useRevealProps();
  return <motion.div variants={fadeUp} custom={timing} {...reveal} {...props} />;
}

type RevealGroupProps = HTMLMotionProps<"div"> & { interval?: number; timing?: Timing };

/**
 * Orchestrates its children: any descendant `motion` element with
 * `hidden` / `show` variants is revealed in sequence.
 */
export function RevealGroup({ interval = 0.09, timing, ...props }: RevealGroupProps) {
  const reveal = useRevealProps();
  const notBefore = typeof timing === "object" ? timing.notBefore : undefined;
  const delay = typeof timing === "number" ? timing : undefined;
  const variants = useMemo(
    () => stagger(interval, notBefore !== undefined ? { notBefore } : delay),
    [interval, notBefore, delay],
  );

  return <motion.div variants={variants} {...reveal} {...props} />;
}
