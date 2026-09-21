import { motion, type Variants } from "framer-motion";
import { Bird } from "lucide-react";
import cnFlag from "../assets/flags/cn.svg";
import uzFlag from "../assets/flags/uz.svg";
import { COMPANY_NAME, JOINT_VENTURE, PARENT_STOCK, PARTNER_NAME, sectionIndex } from "../data/content";
import { EASE_OUT, fadeUp } from "../lib/motion";
import { cn } from "../lib/cn";
import { AnimatedCounter } from "./ui/AnimatedCounter";
import { RevealGroup } from "./ui/Reveal";

/** The two shares fill one after the other, left to right. */
const grow: Variants = {
  hidden: { scaleX: 0 },
  show: (delay: number) => ({
    scaleX: 1,
    transition: { duration: 1.1, ease: EASE_OUT, delay },
  }),
};

type ShareLegendProps = {
  share: number;
  label: string;
  flag: string;
  flagAlt: string;
  align: "left" | "right";
  tone: "navy" | "accent";
  large?: boolean;
};

function ShareLegend({ share, label, flag, flagAlt, align, tone, large }: ShareLegendProps) {
  return (
    <div className={cn("flex items-center gap-3", align === "right" && "flex-row-reverse text-right", large && "gap-4")}>
      <img
        src={flag}
        alt={flagAlt}
        width={40}
        height={30}
        loading="lazy"
        decoding="async"
        className={cn(
          "shrink-0 rounded-[5px] object-cover shadow-sm ring-1 ring-navy/10",
          large ? "h-[2.625rem] w-14" : "h-[1.875rem] w-10",
        )}
      />
      <p className={cn("leading-tight font-bold tracking-[0.1em] text-navy uppercase", large ? "text-sm" : "text-xs")}>
        <span
          className={cn(
            "block tracking-tight",
            large ? "text-2xl" : "text-lg",
            tone === "accent" ? "text-accent" : "text-navy",
          )}
        >
          {share}%
        </span>
        {label}
      </p>
    </div>
  );
}

/**
 * 60 / 40 ownership split plus the official profile of the joint enterprise.
 * `standalone` is the roomier layout used when the block fills a slide of its own.
 */
export function JointVenture({ standalone = false }: { standalone?: boolean }) {
  const { uzbekistan, china } = JOINT_VENTURE;

  return (
    <RevealGroup
      interval={0.12}
      className={cn(
        "grid gap-6",
        standalone
          ? "grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] gap-6"
          : "lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] lg:gap-7",
      )}
    >
      <motion.div
        variants={fadeUp}
        className={cn(
          "flex flex-col justify-center",
          standalone ? "rounded-[1.75rem] border-[1.5px] border-dashed border-navy/35 p-12" : "lg:pr-2",
        )}
      >
        {!standalone && (
          <div className="flex items-baseline gap-3">
            <span aria-hidden className="text-xs font-extrabold tracking-[0.2em] text-accent">
              {sectionIndex("hamkor")}
            </span>
            <h3 className="text-base font-extrabold tracking-[0.12em] text-navy uppercase sm:text-lg">
              Xitoy bilan qo‘shma korxona
            </h3>
          </div>
        )}

        <div
          className={cn(
            "grid items-center",
            standalone ? "gap-9" : "mt-5 gap-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-10",
          )}
        >
          <p
            aria-label={`${uzbekistan.share} foiz O‘zbekiston tomoni, ${china.share} foiz Xitoy tomoni`}
            className={cn(
              "flex items-baseline leading-none font-extrabold tracking-[-0.045em]",
              standalone ? "text-[9.5rem]" : "justify-center text-[clamp(4rem,7.5vw,6rem)]",
            )}
          >
            <AnimatedCounter value={uzbekistan.share} className="text-navy" />
            <span aria-hidden className="mx-[0.12em] font-light text-navy/25">
              /
            </span>
            <AnimatedCounter value={china.share} className="text-accent" />
          </p>

          <div>
            <div aria-hidden className={cn("flex gap-1", standalone ? "h-5" : "h-4")}>
              <motion.span
                variants={grow}
                custom={0.25}
                style={{ flexGrow: uzbekistan.share }}
                className="origin-left basis-0 rounded-l-full rounded-r-[3px] bg-navy"
              />
              <motion.span
                variants={grow}
                custom={0.7}
                style={{ flexGrow: china.share }}
                className="origin-left basis-0 rounded-l-[3px] rounded-r-full bg-accent"
              />
            </div>
            <div className={cn("flex items-start justify-between gap-4", standalone ? "mt-6" : "mt-4")}>
              <ShareLegend
                share={uzbekistan.share}
                label={uzbekistan.label}
                flag={uzFlag}
                flagAlt="O‘zbekiston bayrog‘i"
                align="left"
                tone="navy"
                large={standalone}
              />
              <ShareLegend
                share={china.share}
                label={china.label}
                flag={cnFlag}
                flagAlt="Xitoy bayrog‘i"
                align="right"
                tone="accent"
                large={standalone}
              />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.article
        variants={fadeUp}
        className={cn("flex flex-col rounded-3xl bg-mist", standalone ? "p-10" : "p-6 sm:p-7")}
      >
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex shrink-0 items-center justify-center rounded-2xl bg-navy text-white",
              standalone ? "size-16" : "size-14",
            )}
          >
            <Bird aria-hidden className={standalone ? "size-8" : "size-7"} strokeWidth={1.6} />
          </div>
          <div className="min-w-0">
            <h3
              className={cn(
                "leading-tight font-extrabold tracking-[0.06em] text-navy uppercase",
                standalone ? "text-xl" : "text-base",
              )}
            >
              {COMPANY_NAME}
            </h3>
            <p className="mt-1.5 text-[0.6875rem] font-bold tracking-[0.2em] text-muted uppercase">
              Xususiy korxona
            </p>
          </div>
        </div>

        {standalone && (
          <dl className="mt-8 mb-10 border-t border-navy/10 pt-6">
            <dt className="text-xs font-bold tracking-[0.14em] text-navy uppercase">Loyiha hamkori</dt>
            <dd className="mt-2 text-base leading-relaxed font-semibold text-ink">“{PARTNER_NAME}”</dd>
          </dl>
        )}

        <dl
          className={cn(
            "flex items-end justify-between gap-4 border-t border-navy/10",
            standalone ? "mt-auto pt-7" : "mt-6 pt-5",
          )}
        >
          <dt className="pb-1 text-xs font-bold tracking-[0.14em] text-navy uppercase">Ota-ona podasi</dt>
          <dd className="text-right">
            <AnimatedCounter
              value={PARENT_STOCK.value}
              className={cn(
                "leading-none font-extrabold tracking-[-0.04em] text-accent",
                standalone ? "text-7xl" : "text-5xl",
              )}
            />
            <span
              className={cn(
                "mt-1.5 block font-bold tracking-[0.16em] text-navy uppercase",
                standalone ? "text-xs" : "text-[0.6875rem]",
              )}
            >
              {PARENT_STOCK.unit}
            </span>
          </dd>
        </dl>
      </motion.article>
    </RevealGroup>
  );
}
