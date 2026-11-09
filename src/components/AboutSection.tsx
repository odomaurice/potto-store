"use client";

import { motion } from "framer-motion";
import { ease, Reveal, RiseHeading } from "@/components/Motion";
import SectionCaption from "@/components/SectionCaption";

// PRD 1 and 2, as the old way of doing it struck out and the new way written in.
const LEDGER = [
  {
    before: "A trip to the school to buy one textbook",
    after: "Parents buy from anywhere, for the right child",
  },
  {
    before: "Cash in a school bag",
    after: "A smart card at the store counter",
  },
  {
    before: "Nobody sure what is left on the shelf",
    after: "Stock visible in real time",
  },
  {
    before: "Sales written up by hand",
    after: "Every sale recorded as it happens",
  },
  {
    before: "Spending parents only hear about later",
    after: "Limits and restrictions parents set themselves",
  },
  {
    before: "A cash count that will not match the book",
    after: "Sales compared against payments, with gaps flagged",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      data-nav-tone="light"
      data-nav-bg="var(--canvas)"
      className="relative py-28 md:py-40"
    >
      <div className="mx-auto w-full max-w-360 px-5 md:px-8 lg:px-12">
        <SectionCaption aisle={1} label="Why PottoStore" />

        <RiseHeading
          text="A school store shouldn't run on a cash box and a good memory."
          mark={["cash", "box", "good", "memory."]}
          className="mt-8 max-w-5xl font-display text-[2.5rem] leading-[1.08] font-semibold tracking-[-0.03em] sm:text-6xl lg:text-7xl"
        />

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-lg leading-8 font-light text-soft">
            PottoStore replaces manual, fragmented store operations with one
            transparent record that the school, the parent and the student can
            each rely on.
          </p>
        </Reveal>

        <ol className="mt-16 md:mt-24">
          {LEDGER.map((row, i) => (
            <li
              key={row.before}
              className="grid gap-2 border-t border-ink/10 py-6 md:grid-cols-[4rem_1fr_1fr] md:items-baseline md:gap-8 md:py-8"
            >
              <span className="figures hidden text-xs text-ink/60 md:block">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="relative w-fit text-base font-light text-ink/60 md:text-xl">
                {row.before}
                {/* The line that crosses it out, drawn as it scrolls in. */}
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: 0.15, ease }}
                  className="absolute inset-x-0 top-[55%] h-[1.5px] origin-left bg-ink/50"
                />
              </span>

              <Reveal y={10} delay={0.35}>
                <span className="text-xl font-medium tracking-[-0.01em] text-ink md:text-2xl">
                  {row.after}
                </span>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
