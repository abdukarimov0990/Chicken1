import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { useSlideActive } from "../../lib/reveal";
import { cn } from "../../lib/cn";

type AnimatedCounterProps = {
  value: number;
  decimals?: number;
  decimalSeparator?: string;
  duration?: number;
  className?: string;
};

/**
 * Counts from 0 to `value` — the first time it scrolls into view, or, in the slide deck,
 * every time its slide takes the stage.
 * The final value reserves the width up front, so neighbours never shift,
 * and the text node is written directly to avoid re-rendering on every frame.
 */
export function AnimatedCounter({
  value,
  decimals = 0,
  decimalSeparator = ".",
  duration = 2,
  className,
}: AnimatedCounterProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const liveRef = useRef<HTMLSpanElement>(null);
  const seen = useInView(rootRef, { once: true, margin: "0px 0px -10% 0px" });
  const slideActive = useSlideActive();
  const running = slideActive ?? seen;
  const reduceMotion = useReducedMotion();

  const format = (n: number) => n.toFixed(decimals).replace(".", decimalSeparator);
  const finalText = format(value);
  const zeroText = format(0);

  useEffect(() => {
    const node = liveRef.current;
    if (!node) return;

    if (!running) {
      node.textContent = zeroText;
      return;
    }
    if (reduceMotion) {
      node.textContent = finalText;
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = latest.toFixed(decimals).replace(".", decimalSeparator);
      },
    });
    return () => controls.stop();
  }, [running, reduceMotion, value, decimals, decimalSeparator, duration, finalText, zeroText]);

  return (
    <span ref={rootRef} className={cn("inline-grid tabular-nums", className)}>
      <span className="sr-only">{finalText}</span>
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {finalText}
      </span>
      <span aria-hidden ref={liveRef} className="col-start-1 row-start-1">
        {zeroText}
      </span>
    </span>
  );
}
