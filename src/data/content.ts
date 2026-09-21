import af from "../assets/flags/af.svg";
import by from "../assets/flags/by.svg";
import kg from "../assets/flags/kg.svg";
import kz from "../assets/flags/kz.svg";
import ru from "../assets/flags/ru.svg";
import tj from "../assets/flags/tj.svg";

/**
 * Every figure and label shown on the page lives here,
 * so the presentation can be updated without touching the components.
 */

export const PARTNER_NAME = "BEIJING HUA DU YOUKOU POULTRY CO., LTD";
export const COMPANY_NAME = "BARAKA NASILLI PARRANDA";
export const BREED = "WOD-188-2";

export const LOCATION = {
  region: "Qoraqalpog‘iston Respublikasi",
  district: "Kegeyli tumani",
} as const;

export const SECTIONS = [
  { id: "loyiha", label: "Loyiha" },
  { id: "hamkor", label: "Hamkor" },
  { id: "afzallik", label: "Afzallik" },
  { id: "eksport", label: "Eksport" },
  { id: "natijalar", label: "Natijalar" },
  { id: "ishlab-chiqarish", label: "Ishlab chiqarish" },
  { id: "rivojlanish", label: "Rivojlanish" },
  { id: "xulosa", label: "Xulosa" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

/** Two-digit index shown next to section headings and in the navigation. */
export const sectionIndex = (id: SectionId) =>
  String(SECTIONS.findIndex((section) => section.id === id) + 1).padStart(2, "0");

export const PROJECT_VALUE = { value: 30, unit: "mln doll." } as const;
export const POULTRY_HOUSES = { value: 54, suffix: "ta", unit: "zamonaviy parrandaxona" } as const;

export const JOINT_VENTURE = {
  uzbekistan: { share: 60, label: "O‘zbekiston tomoni" },
  china: { share: 40, label: "Xitoy tomoni" },
} as const;

export const PARENT_STOCK = { value: 693, unit: "ming bosh / yil" } as const;

export const BENEFIT = {
  chain: [
    { value: "60 ming bosh", caption: "praroditel parrandalar" },
    { value: "3 mln boshgacha", caption: "ota-ona avlodi yetishtiriladi" },
    { value: "500 ming bosh", caption: "korxonada saqlanadi" },
  ],
  output: { value: 85, unit: "mln dona" },
} as const;

export const EXPORT_COUNTRIES = [
  { name: "Afg‘oniston", flag: af },
  { name: "Qozog‘iston", flag: kz },
  { name: "Qirg‘iziston", flag: kg },
  { name: "Tojikiston", flag: tj },
  { name: "Rossiya", flag: ru },
  { name: "Belarus", flag: by },
] as const;

export const CURRENT_PRODUCTION = {
  value: 27.5,
  unit: "dona / yil",
  text: "Hozirgi vaqtda yiliga 27,5 mln dona tuxum ishlab chiqarilmoqda.",
} as const;

export const BREED_TEXT = "Yuqori mahsuldorlikka ega zamonaviy tuxum yo‘nalishidagi tovuq zoti.";

export const ENTERPRISES = {
  value: 18,
  text: "Hozirgi vaqtda 18 ta korxona faoliyat yuritmoqda.",
} as const;

export const EXPANSION = [
  { value: 45, label: "Jo‘jalar uchun korxona" },
  { value: 9, label: "Ota-ona tovuqlari uchun korxona" },
] as const;

export const SUMMARY = [
  { value: "30", unit: "mln doll.", label: "Loyiha qiymati" },
  { value: "54", unit: "ta", label: "Zamonaviy parrandaxona" },
  { value: "60 / 40", unit: "foiz", label: "O‘zbekiston va Xitoy ulushi" },
  { value: "85", unit: "mln dona", label: "Yillik inkubatsion tuxum" },
  { value: "72", unit: "mln dona / yil", label: "Jo‘ja ishlab chiqarish quvvati" },
  { value: "43", unit: "mln doll. / yil", label: "Bir kunlik jo‘ja eksporti" },
  { value: "36", unit: "mln doll. / yil", label: "Yillik valyuta tejamkorligi" },
  { value: "300", unit: "nafar", label: "Yangi ish o‘rinlari" },
] as const;
