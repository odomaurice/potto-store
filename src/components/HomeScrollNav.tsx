"use client";

import { useCallback, useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, ArrowUp01Icon } from "@hugeicons/core-free-icons";

type Section = { id: string | null; label: string };

// The page is walked like a shop: each section is a numbered aisle. Keep this
// list in page.tsx order: the index is the aisle printed by each SectionCaption.
const SECTIONS: Section[] = [
  { id: null, label: "Welcome" },
  { id: "about", label: "Why PottoStore" },
  { id: "catalogue", label: "The shelves" },
  { id: "admissions", label: "Admission forms" },
  { id: "counter", label: "The counter" },
  { id: "parents", label: "Parents" },
  { id: "back-office", label: "The back office" },
  { id: "reconciliation", label: "Reconciliation" },
  { id: "roles", label: "Who runs the store" },
  { id: "rules", label: "House rules" },
  { id: "suite", label: "The Potto suite" },
  { id: "faq", label: "Questions" },
];

const LAST = SECTIONS.length - 1;

export default function HomeScrollNav() {
  const [active, setActive] = useState(0);

  const topOf = (s: Section) => {
    if (!s.id) return 0;
    const el = document.getElementById(s.id);
    return el
      ? el.getBoundingClientRect().top + window.scrollY
      : Number.POSITIVE_INFINITY;
  };

  useEffect(() => {
    let ticking = false;

    const compute = () => {
      ticking = false;
      const probe = window.scrollY + window.innerHeight * 0.3;
      let idx = 0;
      for (let i = 0; i < SECTIONS.length; i += 1) {
        if (probe >= topOf(SECTIONS[i])) idx = i;
      }
      setActive(idx);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(compute);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const goTo = useCallback((i: number) => {
    const target = SECTIONS[Math.max(0, Math.min(LAST, i))];
    if (!target.id) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(target.id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <nav
      aria-label="Aisles"
      aria-hidden={active === 0 ? true : undefined}
      inert={active === 0}
      className={`fixed bottom-5 left-5 z-40 hidden items-center gap-1 rounded-2xl bg-teal-deep-2 py-1.5 pr-1.5 pl-4 text-white shadow-[0_18px_40px_-16px_rgb(0_0_0/0.6)] transition duration-500 md:flex ${
        active === 0 ? "pointer-events-none translate-y-6 opacity-0" : ""
      }`}
    >
      <span aria-live="polite" className="min-w-44 pr-3 leading-tight">
        <span className="figures block text-[0.62rem] tracking-[0.14em] text-white/90 uppercase">
          Aisle {String(active).padStart(2, "0")} of {String(LAST).padStart(2, "0")}
        </span>
        <span className="mt-0.5 block text-sm font-medium">
          {SECTIONS[active].label}
        </span>
      </span>

      <button
        type="button"
        onClick={() => goTo(active - 1)}
        disabled={active === 0}
        aria-label="Previous aisle"
        className="grid h-9 w-9 cursor-pointer place-items-center rounded-xl bg-white/10 transition hover:bg-white/20 disabled:cursor-default disabled:opacity-40"
      >
        <HugeiconsIcon icon={ArrowUp01Icon} size={16} strokeWidth={2.2} />
      </button>
      <button
        type="button"
        onClick={() => goTo(active + 1)}
        disabled={active === LAST}
        aria-label="Next aisle"
        className="grid h-9 w-9 cursor-pointer place-items-center rounded-xl bg-brand-yellow text-ink transition hover:bg-brand-yellow-light disabled:cursor-default disabled:opacity-40"
      >
        <HugeiconsIcon icon={ArrowDown01Icon} size={16} strokeWidth={2.2} />
      </button>
    </nav>
  );
}
