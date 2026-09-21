import { Building2 } from "lucide-react";
import { ENTERPRISES } from "../data/content";
import { AnimatedCounter } from "./ui/AnimatedCounter";
import { UnitGrid } from "./ui/UnitGrid";

/** Where the enterprise network stands today — the starting point of the roadmap. */
export function EnterpriseSection() {
  return (
    <article className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-card ring-1 ring-navy/[0.06] sm:p-8">
      <div className="flex items-center gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-navy text-white">
          <Building2 aria-hidden className="size-6" strokeWidth={1.6} />
        </span>
        <h3 className="text-sm font-extrabold tracking-[0.12em] text-navy uppercase">Amaldagi korxonalar</h3>
      </div>

      <p className="mt-7 flex items-baseline gap-2.5 leading-none font-extrabold text-accent">
        <AnimatedCounter value={ENTERPRISES.value} className="text-[clamp(4.5rem,7vw,6.5rem)] tracking-[-0.05em]" />
        <span className="text-3xl uppercase">ta</span>
        <span className="ml-1 text-sm tracking-[0.16em] text-navy uppercase">korxona</span>
      </p>

      <p className="mt-5 max-w-sm text-base leading-relaxed font-medium text-pretty text-muted">{ENTERPRISES.text}</p>

      <UnitGrid count={ENTERPRISES.value} tone="solid" className="mt-auto pt-8" />
    </article>
  );
}
