"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ease, naira, Reveal, RiseHeading } from "@/components/Motion";
import SectionCaption from "@/components/SectionCaption";

// PRD 4.6, shortened but in order.
const JOURNEY = [
  "Sign in",
  "Open your child's school store",
  "Browse what is available",
  "Choose which child",
  "Fill the cart",
  "Review the order",
  "Pay",
  "Get a confirmation",
  "Follow it until it is ready",
];

// PRD 4.8. The sample basket for the panel below.
const PERIODS = ["Daily", "Weekly", "Monthly", "Per sale"];
const BASKET = [
  { item: "Exercise books", category: "Stationery", price: 1150 },
  { item: "Apple juice", category: "Snacks", price: 500 },
];
const BLOCKABLE = ["Snacks", "Stationery"];
const TOTAL = BASKET.reduce((sum, line) => sum + line.price, 0);

export default function ParentsSection() {
  const [period, setPeriod] = useState("Daily");
  const [limit, setLimit] = useState(2000);
  const [blocked, setBlocked] = useState<string[]>([]);
  const [cardOn, setCardOn] = useState(true);

  const blockedLine = BASKET.find((line) => blocked.includes(line.category));
  const overLimit = TOTAL > limit;
  const refusal = !cardOn
    ? "The card is switched off, so it cannot authorise a purchase."
    : blockedLine
      ? `${blockedLine.item} is in a restricted category, so the sale is refused.`
      : overLimit
        ? <>{naira(TOTAL)} is over the {period.toLowerCase()} limit of {naira(limit)}.</>
        : null;

  const toggle = (category: string) =>
    setBlocked((list) =>
      list.includes(category)
        ? list.filter((c) => c !== category)
        : [...list, category],
    );

  return (
    <section
      id="parents"
      data-nav-tone="light"
      data-nav-bg="var(--canvas)"
      className="relative py-28 md:py-40"
    >
      <div className="mx-auto w-full max-w-360 px-5 md:px-8 lg:px-12">
        <div className="grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <div>
            <SectionCaption aisle={5} label="Parents and guardians" />
            <RiseHeading
              text="Shop for them from anywhere. Set the rules from anywhere."
              mark={["Set", "the", "rules"]}
              className="mt-6 font-display text-[2.5rem] leading-[1.08] font-semibold tracking-[-0.03em] sm:text-6xl lg:text-7xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-xl text-lg leading-8 font-light text-soft">
                Buy textbooks or uniforms without a trip to the school, for the
                right child if you have more than one, with delivery or
                collection where the school supports it. And see what your child
                buys at the counter for themselves.
              </p>
            </Reveal>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.1, ease }}
            className="mx-auto w-full max-w-md lg:max-w-lg"
          >
            <Image
              src="/parents.webp"
              alt="Two parents smiling at a phone together"
              width={900}
              height={692}
              sizes="(min-width: 1024px) 512px, (min-width: 448px) 448px, 100vw"
              className="h-auto w-full"
            />
          </motion.div>
        </div>

        <ol className="mt-16 grid grid-cols-2 border-t-[3px] border-brand sm:grid-cols-3 lg:grid-cols-9">
          {JOURNEY.map((step, i) => (
            <motion.li
              key={step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.7, delay: i * 0.05, ease }}
              className="py-5 pr-4"
            >
              <span className="figures block text-xs text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mt-2 block text-sm leading-5 font-medium">{step}</span>
            </motion.li>
          ))}
        </ol>

        {/* The controls, working, on a sample basket. */}
        <Reveal className="mt-20 md:mt-28">
          <div className="grid overflow-hidden rounded-[2rem] lg:grid-cols-[1.2fr_0.8fr]">
            <div className="bg-[#e7f1ef] p-7 sm:p-10 lg:p-14">
              <h3 className="max-w-lg text-3xl leading-[1.15] font-semibold tracking-[-0.02em] sm:text-4xl">
                Try the rules on a child&apos;s basket.
              </h3>

              <div className="mt-10">
                <div className="flex flex-wrap gap-1.5" role="group" aria-label="Limit period">
                  {PERIODS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      aria-pressed={p === period}
                      onClick={() => setPeriod(p)}
                      className={`cursor-pointer rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                        p === period ? "bg-brand text-white" : "bg-ink/5 text-ink hover:bg-ink/10"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <label className="mt-7 block">
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="text-sm font-medium">Spending limit</span>
                    <span className="figures text-2xl font-semibold">{naira(limit)}</span>
                  </span>
                  <input
                    type="range"
                    min={500}
                    max={4000}
                    step={250}
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    className="mt-3 h-11 w-full cursor-pointer accent-brand-teal-dark"
                  />
                </label>
              </div>

              <div className="mt-6 grid gap-2 sm:grid-cols-3">
                {BLOCKABLE.map((category) => (
                  <Toggle
                    key={category}
                    label={`Restrict ${category.toLowerCase()}`}
                    on={blocked.includes(category)}
                    onChange={() => toggle(category)}
                  />
                ))}
                <Toggle
                  label="Smart card on"
                  on={cardOn}
                  onChange={() => setCardOn((v) => !v)}
                />
              </div>

              <p className="mt-7 max-w-lg text-sm leading-6 text-ink/70">
                Which controls are available depends on what your school has
                enabled through Potto Pocket. Restrictions are enforced at the
                sale itself, not just hidden from the catalogue.
              </p>
            </div>

            <div
              aria-live="polite"
              className={`flex flex-col justify-between gap-10 p-7 transition-colors duration-500 sm:p-10 lg:p-12 ${
                refusal ? "bg-decline text-white" : "bg-brand-teal-dark text-white"
              }`}
            >
              <div>
                <p className="figures text-xs tracking-[0.14em] uppercase">Sample basket</p>
                <ul className="figures mt-5 space-y-2.5 text-sm">
                  {BASKET.map((line) => (
                    <li key={line.item} className="flex items-baseline gap-2">
                      <span>{line.item}</span>
                      <span className="leader" />
                      <span>{naira(line.price)}</span>
                    </li>
                  ))}
                </ul>
                <p className="figures mt-4 flex justify-between border-t border-dashed border-white/40 pt-4 text-lg font-semibold">
                  <span>Total</span>
                  <span>{naira(TOTAL)}</span>
                </p>
              </div>

              <div>
                <p className="text-5xl font-semibold tracking-[-0.03em] sm:text-6xl">
                  {refusal ? "Refused." : "Allowed."}
                </p>
                <p className="mt-3 min-h-12 text-base leading-6">
                  {refusal ?? "It fits every rule you have set, so the sale can go ahead."}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Toggle({
  label,
  on,
  onChange,
}: {
  label: string;
  on: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onChange}
      className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl bg-white/70 px-4 py-3.5 text-left text-sm font-medium transition hover:bg-white"
    >
      {label}
      <span
        aria-hidden
        className={`relative h-6 w-10 shrink-0 rounded-full transition-colors duration-200 ${
          on ? "bg-brand-teal-dark" : "bg-ink/20"
        }`}
      >
        <span
          className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform duration-200 ${
            on ? "translate-x-4" : ""
          }`}
        />
      </span>
    </button>
  );
}
