import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { AnimatePresence, motion, type MotionValue } from "framer-motion";
import { Egg, Menu, X } from "lucide-react";
import { COMPANY_NAME, SECTIONS, sectionIndex, type SectionId } from "../data/content";
import { EASE_OUT } from "../lib/motion";
import { cn } from "../lib/cn";

type NavigationProps = {
  activeId: SectionId;
  /** 0 → 1 reading (or slide) progress, drawn as the red line under the bar. */
  progress: MotionValue<number>;
  /** Opaque bar with a hairline; otherwise it floats transparently over the hero. */
  solid: boolean;
  /** When provided, section links call this instead of jumping to the anchor (slide deck). */
  onSelect?: (id: SectionId) => void;
  /** Extra controls at the right edge, e.g. the full-screen toggle. */
  trailing?: ReactNode;
};

/** Slim section indicator: brand, chapter links and a progress line. */
export function Navigation({ activeId, progress, solid, onSelect, trailing }: NavigationProps) {
  const activeSection = SECTIONS.find((section) => section.id === activeId) ?? SECTIONS[0];

  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const select = (id: SectionId) => (event: MouseEvent) => {
    setMenuOpen(false);
    if (!onSelect) return;
    event.preventDefault();
    onSelect(id);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.1 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500",
        solid || menuOpen ? "border-line bg-white/85 backdrop-blur-xl" : "border-transparent bg-white/0",
      )}
    >
      <nav
        aria-label="Bo‘limlar bo‘yicha navigatsiya"
        className="wrap flex h-14 items-center justify-between gap-6"
      >
        <a
          href={onSelect ? `#${SECTIONS[0].id}` : "#top"}
          onClick={select(SECTIONS[0].id)}
          className="flex shrink-0 items-center gap-2.5"
        >
          <span className="flex size-7 items-center justify-center rounded-lg bg-navy text-white">
            <Egg aria-hidden className="size-4" strokeWidth={2} />
          </span>
          <span className="text-[0.625rem] font-extrabold tracking-[0.14em] whitespace-nowrap text-navy uppercase sm:text-[0.6875rem] sm:tracking-[0.18em]">
            {COMPANY_NAME}
          </span>
        </a>

        <div className="hidden items-center gap-2 xl:flex">
          <ul className="flex items-center">
            {SECTIONS.map((section) => {
              const isActive = section.id === activeId;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={select(section.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative block rounded-full px-3.5 py-2 text-[0.6875rem] font-bold tracking-[0.14em] uppercase transition-colors duration-300",
                      isActive ? "text-navy" : "text-navy/55 hover:text-navy",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                        className="absolute inset-0 rounded-full bg-navy/[0.07]"
                      />
                    )}
                    <span className="relative">{section.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
          {trailing}
        </div>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-sections"
          onClick={() => setMenuOpen((open) => !open)}
          className="-mr-2 flex items-center gap-3 rounded-full py-1.5 pr-2 pl-3 text-navy xl:hidden"
        >
          <span className="text-[0.6875rem] font-bold tracking-[0.14em] whitespace-nowrap uppercase">
            <span className="text-accent tabular-nums">{sectionIndex(activeSection.id)}</span>
            <span className="mx-1.5 text-navy/30">/</span>
            <span className="text-navy/60 tabular-nums sm:hidden">
              {String(SECTIONS.length).padStart(2, "0")}
            </span>
            <span className="hidden sm:inline">{activeSection.label}</span>
          </span>
          {menuOpen ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          <span className="sr-only">
            {menuOpen ? "Bo‘limlar ro‘yxatini yopish" : "Bo‘limlar ro‘yxatini ochish"}
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-sections"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            className="overflow-hidden border-t border-line xl:hidden"
          >
            <ul className="wrap py-3">
              {SECTIONS.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={select(section.id)}
                    aria-current={section.id === activeId ? "true" : undefined}
                    className={cn(
                      "flex items-baseline gap-4 border-b border-line/70 py-3.5 text-sm font-bold tracking-[0.12em] uppercase",
                      section.id === activeId ? "text-navy" : "text-navy/60",
                    )}
                  >
                    <span className="text-xs text-accent tabular-nums">{sectionIndex(section.id)}</span>
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.span
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-accent"
      />
    </motion.header>
  );
}
