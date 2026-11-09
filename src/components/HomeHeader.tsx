"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import Wordmark from "@/components/Wordmark";

const navItems = [
  { label: "The shelves", href: "/#catalogue" },
  { label: "The counter", href: "/#counter" },
  { label: "Parents", href: "/#parents" },
  { label: "Back office", href: "/#back-office" },
  { label: "Reconciliation", href: "/#reconciliation" },
  { label: "FAQ", href: "/#faq" },
];

const PROBE_Y = 40;
const DEFAULT_NAV = { tone: "dark" as const, bg: "var(--color-brand-teal-dark)" };

export default function HomeHeader() {
  const [open, setOpen] = useState(false);
  const [nav, setNav] = useState<{ tone: "light" | "dark"; bg: string }>(
    DEFAULT_NAV,
  );
  const [scrolled, setScrolled] = useState(false);
  const onDark = nav.tone === "dark";

  useEffect(() => {
    let ticking = false;

    const compute = () => {
      ticking = false;
      setScrolled(window.scrollY > 24);

      let next = DEFAULT_NAV as { tone: "light" | "dark"; bg: string };
      document
        .querySelectorAll<HTMLElement>("[data-nav-tone]")
        .forEach((section) => {
          const r = section.getBoundingClientRect();
          if (r.top <= PROBE_Y && r.bottom > PROBE_Y) {
            next = {
              tone: section.dataset.navTone === "dark" ? "dark" : "light",
              bg: section.dataset.navBg ?? "transparent",
            };
          }
        });

      setNav((prev) =>
        prev.tone === next.tone && prev.bg === next.bg ? prev : next,
      );
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

  return (
    <>
      {/* A full-width bar with no outline: it takes the ground beneath it, and
          only earns a fill once the page has moved. */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          style={{
            backgroundColor: scrolled
              ? `color-mix(in oklab, ${nav.bg} 88%, transparent)`
              : "transparent",
          }}
          className="backdrop-blur-xl transition-colors duration-500"
        >
          <div className="mx-auto flex h-18 w-full max-w-360 items-center justify-between px-5 md:px-8 lg:px-12">
            <Link href="/" aria-label="PottoStore home" className="flex items-center">
              <Wordmark tone={onDark ? "dark" : "light"} priority />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`rounded-full px-3.5 py-2 text-sm transition-colors duration-300 ${
                    onDark
                      ? "text-white/90 hover:bg-white/10 hover:text-white"
                      : "text-ink/70 hover:bg-ink/5 hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/#contact"
                className={`hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 sm:inline-flex ${
                  onDark
                    ? "bg-brand-yellow text-ink hover:bg-brand-yellow-light"
                    : "bg-brand text-white hover:bg-teal-deep"
                }`}
              >
                Talk to us
              </Link>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label="Toggle menu"
                aria-expanded={open}
                className={`grid h-11 w-11 cursor-pointer place-items-center rounded-full transition-colors duration-300 lg:hidden ${
                  onDark
                    ? "bg-white/10 text-white hover:bg-white/20"
                    : "bg-ink/5 text-ink hover:bg-ink/10"
                }`}
              >
                <HugeiconsIcon
                  icon={open ? Cancel01Icon : Menu01Icon}
                  size={20}
                  strokeWidth={1.8}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-3 top-20 z-40 rounded-3xl bg-teal-deep p-3 lg:hidden"
          >
            <nav className="flex flex-col">
              {navItems.map((item, i) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 rounded-2xl px-4 py-3 text-lg font-medium text-white transition-colors hover:bg-white/10"
                >
                  <span className="figures w-6 text-xs text-brand-yellow-light">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </Link>
              ))}
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-2xl bg-brand-yellow px-4 py-3 text-center text-sm font-semibold text-ink transition hover:bg-brand-yellow-light"
              >
                Talk to us
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
