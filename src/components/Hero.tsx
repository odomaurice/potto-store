"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { ease, RiseHeading } from "@/components/Motion";
import SmartCard from "@/components/SmartCard";

const CATEGORIES = [
  "Admission forms",
  "Textbooks",
  "Stationery",
  "School uniforms",
  "Sportswear",
  "Snacks and refreshments",
  "Learning materials",
  "School merchandise",
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  // The card tips towards the pointer, on a spring, over any screen with one.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 90, damping: 18, mass: 0.6 };
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-6, 6]), spring);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [5, -5]), spring);

  // The cards rise a little as the hero scrolls away.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <section
      ref={ref}
      data-nav-tone="dark"
      data-nav-bg="var(--color-brand-teal-dark)"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
      }}
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-brand-teal-dark text-white"
    >
      <div className="mx-auto grid w-full max-w-360 flex-1 items-center gap-14 px-5 pt-32 pb-16 md:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6 lg:px-12 lg:pt-28 lg:pb-12">
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="figures text-xs font-medium tracking-[0.16em] text-white/90 uppercase"
          >
            School commerce and inventory
          </motion.p>

          <RiseHeading
            as="h1"
            immediate
            delay={0.15}
            text="Every sale in your school, accounted for."
            mark={["accounted", "for."]}
            markClassName="text-brand-yellow-light"
            className="mt-6 font-display text-[3.05rem] leading-[1.02] font-semibold tracking-[-0.035em] sm:text-7xl xl:text-[6.1rem]"
          />

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease }}
            className="mt-8 max-w-xl text-lg leading-8 font-light text-white/90"
          >
            PottoStore gives your school an online store and a cashless
            counter. Admission forms, textbooks, uniforms and snacks, with
            stock, payments and parents&apos; spending controls kept in one
            record.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8, ease }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href="/#counter"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-brand-yellow py-4 pr-5 pl-7 text-base font-semibold text-ink transition duration-300 hover:bg-brand-yellow-light"
            >
              Run a sale at the counter
              <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-brand-yellow-light transition-transform duration-300 group-hover:translate-x-1">
                <HugeiconsIcon icon={ArrowRight01Icon} size={15} strokeWidth={2.2} />
              </span>
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full px-6 py-4 text-base font-medium text-white transition hover:bg-white/10"
            >
              Talk to us
            </Link>
          </motion.div>
        </div>

        {/* The Potto student ID, front and back, lying on the table. */}
        <div
          aria-hidden
          className="relative mx-auto w-full max-w-md perspective-[1400px] lg:max-w-none"
        >
          <motion.div
            style={{ y: cardY, rotateX, rotateY }}
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.3, delay: 0.9, ease }}
            className="w-full transform-3d"
          >
            <SmartCard />
          </motion.div>
        </div>
      </div>

      {/* What a school can put on its shelves, running under the fold. */}
      <div className="relative overflow-hidden bg-brand-yellow py-3.5 text-ink">
        <p className="sr-only">
          Sold through PottoStore: {CATEGORIES.join(", ")}.
        </p>
        <div aria-hidden className="flex w-max animate-marquee">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0">
              {[...CATEGORIES, ...CATEGORIES].map((category, i) => (
                <li
                  key={`${category}-${i}`}
                  className="figures flex items-center gap-8 pr-8 text-sm font-medium whitespace-nowrap"
                >
                  {category}
                  <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
