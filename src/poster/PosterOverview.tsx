import { motion, type Variants } from "framer-motion";
import { Bird, ChartNoAxesCombined, DollarSign, MapPinned, Warehouse, type LucideIcon } from "lucide-react";
import cnFlag from "../assets/flags/cn.svg";
import uzFlag from "../assets/flags/uz.svg";
import { AnimatedCounter } from "../components/ui/AnimatedCounter";
import { ChinaFlag } from "../components/ui/ChinaFlag";
import { ImageCard } from "../components/ui/ImageCard";
import { Reveal, RevealGroup } from "../components/ui/Reveal";
import {
  COMPANY_SHORT,
  JOINT_VENTURE,
  LOCATION,
  PARENT_STOCK,
  PARTNER_NAME,
  POULTRY_HOUSES,
  PROJECT_VALUE,
} from "../data/content";
import { GALLERY } from "../data/gallery";
import { EASE_OUT, fadeUp } from "../lib/motion";
import { cn } from "../lib/cn";

/** Seconds after load at which each column starts, so the panel fills left to right after the title. */
const START = { panel: 0.7, stats: 0.95, partner: 1.15, gallery: 1.35 } as const;

type StatProps = {
  icon: LucideIcon;
  badge?: LucideIcon;
  overline?: string;
  label: string;
  value: number;
  suffix?: string;
  unit: string;
};

/** Compact take on the slide's grey info card: icon left, centred label / figure / unit. */
function Stat({ icon: Icon, badge: Badge, overline, label, value, suffix, unit }: StatProps) {
  return (
    <motion.article variants={fadeUp} className="flex min-h-0 items-center gap-4 rounded-[1.25rem] bg-mist px-5">
      <div className="relative flex size-[3.25rem] shrink-0 items-center justify-center rounded-2xl bg-white text-navy shadow-card">
        <Icon aria-hidden className="size-7" strokeWidth={1.6} />
        {Badge && (
          <span className="absolute -right-1.5 -bottom-1.5 flex size-6 items-center justify-center rounded-full bg-navy text-white ring-[3px] ring-mist">
            <Badge aria-hidden className="size-3" strokeWidth={2.4} />
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1 text-center">
        <h2 className="text-[0.6875rem] leading-tight font-bold tracking-[0.1em] text-navy uppercase">
          {overline && (
            <span className="mb-0.5 block text-[0.71875rem] font-semibold tracking-normal text-muted normal-case">
              {overline}
            </span>
          )}
          {label}
        </h2>
        <p className="mt-1.5 flex items-baseline justify-center gap-1 leading-none font-extrabold text-accent">
          <AnimatedCounter value={value} startAfter={START.stats + 0.2} className="text-[2.5rem] tracking-[-0.04em]" />
          {suffix && <span className="text-lg">{suffix}</span>}
        </p>
        <p className="mt-1.5 text-[0.6875rem] leading-tight font-bold tracking-[0.08em] text-navy uppercase">{unit}</p>
      </div>
    </motion.article>
  );
}

/** The two shares fill one after the other, left to right. */
const grow: Variants = {
  hidden: { scaleX: 0 },
  show: (delay: number) => ({ scaleX: 1, transition: { duration: 1.1, ease: EASE_OUT, delay } }),
};

type ShareProps = { share: number; label: string; flag: string; flagAlt: string; align: "left" | "right" };

function Share({ share, label, flag, flagAlt, align }: ShareProps) {
  const right = align === "right";
  return (
    <div className={cn("flex items-center gap-2.5", right && "flex-row-reverse text-right")}>
      <img
        src={flag}
        alt={flagAlt}
        width={32}
        height={24}
        decoding="async"
        className="h-6 w-8 shrink-0 rounded-[4px] object-cover shadow-sm ring-1 ring-navy/10"
      />
      <p className="text-[0.625rem] leading-tight font-bold tracking-[0.08em] text-navy uppercase">
        <span className={cn("block text-[0.9375rem] tracking-tight", right ? "text-accent" : "text-navy")}>
          {share}%
        </span>
        {label}
      </p>
    </div>
  );
}

/** Centre column: partner card, then the Chinese flag beside the 60 / 40 joint-venture split. */
function Partner() {
  const { uzbekistan, china } = JOINT_VENTURE;

  return (
    <RevealGroup eager interval={0.14} timing={{ notBefore: START.partner }} className="flex h-full min-h-0 flex-col gap-3.5">
      <motion.article
        variants={fadeUp}
        className="rounded-[1.25rem] bg-white px-5 py-3.5 text-center shadow-card ring-1 ring-navy/[0.06]"
      >
        <h2 className="text-[0.9375rem] font-extrabold tracking-[0.14em] text-navy uppercase">Loyiha hamkori</h2>
        <span aria-hidden className="mx-auto mt-1.5 block h-[0.1875rem] w-9 rounded-full bg-accent" />
        <p className="mt-2 text-[0.8125rem] leading-snug font-semibold text-balance text-ink">
          “{PARTNER_NAME}” <span className="font-bold text-muted">kompaniyasi</span>
        </p>
      </motion.article>

      <motion.div variants={fadeUp} className="flex min-h-0 flex-1 items-center gap-4">
        <ChinaFlag
          label="Xitoy Xalq Respublikasi bayrog‘i"
          className="block h-auto max-h-full w-[53%] shrink-0 rounded-xl shadow-float ring-1 ring-black/5"
        />
        <div className="min-w-0 flex-1">
          <h2 className="text-[0.6875rem] leading-snug font-extrabold tracking-[0.1em] text-navy uppercase">
            Xitoy bilan qo‘shma korxona
          </h2>
          <p
            aria-label={`${uzbekistan.share} foiz O‘zbekiston tomoni, ${china.share} foiz Xitoy tomoni`}
            className="mt-2 flex items-baseline text-[3rem] leading-none font-extrabold tracking-[-0.05em]"
          >
            <AnimatedCounter value={uzbekistan.share} startAfter={START.partner + 0.3} className="text-navy" />
            <span aria-hidden className="mx-[0.1em] font-light text-navy/25">
              /
            </span>
            <AnimatedCounter value={china.share} startAfter={START.partner + 0.3} className="text-accent" />
          </p>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <div aria-hidden className="flex h-3 gap-1">
          <motion.span
            variants={grow}
            custom={START.partner + 0.35}
            style={{ flexGrow: uzbekistan.share }}
            className="origin-left basis-0 rounded-l-full rounded-r-[3px] bg-navy"
          />
          <motion.span
            variants={grow}
            custom={START.partner + 0.8}
            style={{ flexGrow: china.share }}
            className="origin-left basis-0 rounded-l-[3px] rounded-r-full bg-accent"
          />
        </div>
        <div className="mt-2.5 flex items-start justify-between gap-3">
          <Share
            share={uzbekistan.share}
            label={uzbekistan.label}
            flag={uzFlag}
            flagAlt="O‘zbekiston bayrog‘i"
            align="left"
          />
          <Share share={china.share} label={china.label} flag={cnFlag} flagAlt="Xitoy bayrog‘i" align="right" />
        </div>
      </motion.div>
    </RevealGroup>
  );
}

/** The dashed project panel: key figures · partner and joint venture · photographs. */
export function PosterOverview() {
  return (
    <Reveal
      eager
      timing={{ notBefore: START.panel }}
      className="min-h-0 rounded-[1.5rem] border-[1.5px] border-dashed border-navy/35 p-4"
    >
      <section
        aria-label="Loyiha haqida asosiy ma’lumotlar"
        className="grid h-full min-h-0 grid-cols-[minmax(0,1fr)_minmax(0,1.06fr)_minmax(0,1.56fr)]"
      >
        <RevealGroup
          eager
          interval={0.14}
          timing={{ notBefore: START.stats }}
          className="grid min-h-0 grid-rows-3 gap-3 pr-5"
        >
          <Stat
            icon={ChartNoAxesCombined}
            badge={DollarSign}
            label="Loyiha qiymati"
            value={PROJECT_VALUE.value}
            unit={PROJECT_VALUE.unit}
          />
          <Stat
            icon={MapPinned}
            badge={Warehouse}
            overline={LOCATION.region}
            label={`${LOCATION.district}da`}
            value={POULTRY_HOUSES.value}
            suffix={POULTRY_HOUSES.suffix}
            unit={POULTRY_HOUSES.unit}
          />
          <Stat
            icon={Bird}
            overline={COMPANY_SHORT}
            label="Ota-ona podasi"
            value={PARENT_STOCK.value}
            unit={PARENT_STOCK.unit}
          />
        </RevealGroup>

        <div className="min-h-0 border-x border-navy/15 px-5">
          <Partner />
        </div>

        <RevealGroup
          eager
          interval={0.12}
          timing={{ notBefore: START.gallery }}
          className="grid min-h-0 grid-cols-2 grid-rows-2 gap-3 pl-5"
        >
          {GALLERY.map((image, index) => (
            <ImageCard
              key={image.label}
              {...image}
              index={index}
              sizes="(min-width: 1200px) 22vw, 46vw"
              priority
              className="min-h-0 rounded-[1.125rem]"
            />
          ))}
        </RevealGroup>
      </section>
    </Reveal>
  );
}
