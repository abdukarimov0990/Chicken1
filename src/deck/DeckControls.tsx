import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { cn } from "../lib/cn";

type DeckControlsProps = {
  index: number;
  labels: readonly string[];
  /** `dark` when the current slide has a navy background. */
  tone: "light" | "dark";
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
};

/**
 * Presenter controls along the bottom edge. Targets are deliberately large:
 * the deck is driven on wall screens and touch panels, often from a distance.
 */
export function DeckControls({ index, labels, tone, onPrev, onNext, onSelect }: DeckControlsProps) {
  const count = labels.length;
  const isFirst = index === 0;
  const isLast = index === count - 1;
  const dark = tone === "dark";

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
      <div className="wrap flex items-center justify-between gap-8 pb-6">
        <div className="pointer-events-auto flex items-center gap-5">
          <button
            type="button"
            onClick={onPrev}
            disabled={isFirst}
            aria-label="Oldingi bo‘lim"
            className={cn(
              "flex size-14 items-center justify-center rounded-full border-[1.5px] transition-[background-color,border-color,color,opacity] duration-300",
              "disabled:cursor-not-allowed disabled:opacity-30",
              dark
                ? "border-white/35 text-white enabled:hover:border-white enabled:hover:bg-white enabled:hover:text-navy"
                : "border-navy/25 bg-white/70 text-navy enabled:hover:border-navy enabled:hover:bg-navy enabled:hover:text-white",
            )}
          >
            <ArrowLeft aria-hidden className="size-6" strokeWidth={2} />
          </button>

          <p
            className={cn(
              "text-sm font-extrabold tracking-[0.16em] tabular-nums uppercase",
              dark ? "text-white" : "text-navy",
            )}
          >
            <span className={dark ? "text-white" : "text-accent"}>{String(index + 1).padStart(2, "0")}</span>
            <span className={cn("mx-2", dark ? "text-white/40" : "text-navy/30")}>/</span>
            <span className={dark ? "text-white/70" : "text-navy/60"}>{String(count).padStart(2, "0")}</span>
          </p>
        </div>

        <ol aria-label="Bo‘limlar" className="pointer-events-auto flex items-center">
          {labels.map((label, i) => (
            <li key={label}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-label={`${i + 1}. ${label}`}
                aria-current={i === index ? "step" : undefined}
                className="group flex h-10 items-center px-1.5"
              >
                <span
                  className={cn(
                    "block h-1.5 rounded-full transition-[width,background-color] duration-500 ease-out-expo",
                    i === index
                      ? cn("w-12", dark ? "bg-white" : "bg-accent")
                      : cn(
                          "w-6",
                          dark
                            ? "bg-white/25 group-hover:bg-white/60"
                            : "bg-navy/15 group-hover:bg-navy/45",
                        ),
                  )}
                />
              </button>
            </li>
          ))}
        </ol>

        <button
          type="button"
          onClick={isLast ? () => onSelect(0) : onNext}
          className={cn(
            "group pointer-events-auto flex h-14 items-center gap-4 rounded-full pr-2.5 pl-8 text-sm font-extrabold tracking-[0.18em] uppercase shadow-float transition-[background-color,color] duration-300",
            dark ? "bg-white text-navy hover:bg-mist" : "bg-navy text-white hover:bg-navy-deep",
          )}
        >
          {isLast ? "Boshiga" : "Keyingi"}
          <span
            className={cn(
              "flex size-9 items-center justify-center rounded-full transition-[translate] duration-500 ease-out-expo group-hover:translate-x-0.5",
              dark ? "bg-navy text-white" : "bg-accent text-white",
            )}
          >
            {isLast ? (
              <RotateCcw aria-hidden className="size-[1.125rem]" strokeWidth={2.4} />
            ) : (
              <ArrowRight aria-hidden className="size-5" strokeWidth={2.4} />
            )}
          </span>
        </button>
      </div>
    </div>
  );
}
