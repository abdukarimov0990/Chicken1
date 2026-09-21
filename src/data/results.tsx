import type { ComponentType } from "react";
import { Bird, DollarSign, Egg, Gauge, HardHat, Landmark, RefreshCw, type LucideIcon } from "lucide-react";
import { cn } from "../lib/cn";
import { BREED, CURRENT_PRODUCTION } from "./content";

type IconProps = { className?: string };

const lineIcon = (Icon: LucideIcon) =>
  function ResultIcon({ className }: IconProps) {
    return <Icon aria-hidden className={className} strokeWidth={1.6} />;
  };

/** Dollar sign inside circulating arrows — the export-turnover mark from the slide. */
function ExportIcon({ className }: IconProps) {
  return (
    <span aria-hidden className={cn("relative flex items-center justify-center", className)}>
      <RefreshCw className="size-full" strokeWidth={1.6} />
      <DollarSign className="absolute size-[46%]" strokeWidth={2.6} />
    </span>
  );
}

export type Result = {
  Icon: ComponentType<IconProps>;
  label: string;
  note?: string;
  value: number;
  decimals?: number;
  unit: string;
};

/** Today's output opens the row, set apart from the projected figures that follow. */
export const CURRENT_RESULT: Result = {
  Icon: lineIcon(Egg),
  label: CURRENT_PRODUCTION.label,
  note: `${BREED} zoti`,
  value: CURRENT_PRODUCTION.value,
  decimals: 1,
  unit: CURRENT_PRODUCTION.unit,
};

export const EXPECTED_RESULTS: Result[] = [
  { Icon: lineIcon(Landmark), label: "Yillik valyuta tejamkorligi", value: 36, unit: "mln doll. / yil" },
  {
    Icon: lineIcon(Bird),
    label: "Nasilli jo‘ja ishlab chiqarish",
    note: "3 mln dona sotuv",
    value: 21,
    unit: "mln doll. / yil",
  },
  { Icon: lineIcon(Gauge), label: "Jo‘ja ishlab chiqarish quvvati", value: 72, unit: "mln dona / yil" },
  { Icon: ExportIcon, label: "Bir kunlik jo‘ja eksporti", value: 43, unit: "mln doll. / yil" },
  { Icon: lineIcon(HardHat), label: "Yangi ish o‘rinlari", value: 300, unit: "nafar" },
];
