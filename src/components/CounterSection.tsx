"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  Refresh01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import {
  ease,
  naira,
  Reveal,
  RiseHeading,
  useReducedMotionPref,
} from "@/components/Motion";
import SectionCaption from "@/components/SectionCaption";
import SmartCard from "@/components/SmartCard";

// The checks of PRD 4.7, 7.4 and 10, run in order. Card identification comes
// first and is kept apart from the money, as 7.4 requires.
const CHECKS = [
  "Card is valid and active",
  "Student account is active",
  "Items are in stock",
  "Items are permitted",
  "Within the spending limit",
  "Enough in the wallet",
  "Processed once, with one reference",
];

const BASKET = [
  { item: "Exercise book", qty: 2, price: 800 },
  { item: "Pen, pack of 4", qty: 1, price: 350 },
  { item: "Apple juice", qty: 1, price: 500 },
];
const TOTAL = BASKET.reduce((sum, line) => sum + line.price, 0);
const BALANCE = 5000;

type Scenario = {
  id: string;
  label: string;
  failAt: number | null;
  reason: string;
  /** Which basket line the refusal is about, to strike it on the receipt. */
  strike?: string;
};

// Each refusal is one the PRD lists in 4.7.
const SCENARIOS: Scenario[] = [
  {
    id: "clean",
    label: "A clean sale",
    failAt: null,
    reason: "",
  },
  {
    id: "card",
    label: "Deactivated card",
    failAt: 0,
    reason: "This card has been deactivated. It cannot authorise a purchase.",
  },
  {
    id: "account",
    label: "Inactive account",
    failAt: 1,
    reason: "The card is real, but the student account behind it is inactive.",
  },
  {
    id: "stock",
    label: "Out of stock",
    failAt: 2,
    reason: "The basket asks for more pens than the store has left.",
    strike: "Pen, pack of 4",
  },
  {
    id: "restricted",
    label: "Restricted item",
    failAt: 3,
    reason: "A parent has restricted this item, so it is refused at the sale, not just hidden.",
    strike: "Apple juice",
  },
  {
    id: "limit",
    label: "Over the limit",
    failAt: 4,
    reason: "This sale would take the student past a spending limit.",
  },
  {
    id: "funds",
    label: "Not enough funds",
    failAt: 5,
    reason: "The wallet does not hold enough to cover this sale.",
  },
];

export default function CounterSection() {
  const [scenario, setScenario] = useState(SCENARIOS[0]);
  const [run, setRun] = useState(0);
  const receiptRef = useRef<HTMLDivElement>(null);

  const choose = (next: Scenario) => {
    setScenario(next);
    setRun((r) => r + 1);
    // Stacked on a phone, the receipt is off-screen below these buttons, and
    // the tap would seem to do nothing.
    if (window.matchMedia("(max-width: 1023px)").matches) {
      receiptRef.current?.scrollIntoView({ block: "center" });
    }
  };

  return (
    <section
      id="counter"
      data-nav-tone="dark"
      data-nav-bg="var(--color-teal-deep)"
      className="relative overflow-hidden bg-teal-deep py-28 text-white md:py-40"
    >
      <div className="mx-auto grid w-full max-w-360 gap-16 px-5 md:px-8 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-12">
        <div>
          <SectionCaption aisle={4} label="The counter" tone="dark" />
          <RiseHeading
            text="A valid card is not a yes."
            mark={["not", "a", "yes."]}
            markClassName="text-brand-yellow-light"
            className="mt-6 font-display text-[3rem] leading-[1.02] font-semibold tracking-[-0.035em] sm:text-7xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-xl text-lg leading-8 font-light text-white/90">
              Students buy without carrying cash, using their Potto smart card.
              Knowing who holds the card is only the start: the account, the
              stock, the parent&apos;s rules and the wallet are all checked
              before anything is deducted.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="figures mt-12 text-xs tracking-[0.14em] text-white/80 uppercase">
              Choose what happens at the counter
            </p>
            <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Sale scenarios">
              {SCENARIOS.map((s) => {
                const on = s.id === scenario.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => choose(s)}
                    className={`cursor-pointer rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                      on
                        ? "bg-brand-yellow text-ink"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 hidden max-w-md lg:block">
            <SmartCard deactivated={scenario.id === "card"} />
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mx-auto w-full max-w-lg lg:mx-0 lg:justify-self-end">
          <div ref={receiptRef} className="drop-shadow-[0_40px_60px_rgb(0_0_0/0.6)]">
            <SaleReceipt key={run} scenario={scenario} onReplay={() => setRun((r) => r + 1)} />
          </div>
          <p className="figures mt-5 text-center text-[0.7rem] leading-5 text-white/80">
            An illustration of the rules, with sample figures. Not a screen from the product.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function SaleReceipt({
  scenario,
  onReplay,
}: {
  scenario: Scenario;
  onReplay: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduced = useReducedMotionPref();
  const [ticked, setTicked] = useState(0);

  const { failAt } = scenario;
  const end = failAt === null ? CHECKS.length : failAt + 1;

  useEffect(() => {
    if (!inView || reduced) return;
    const timer = window.setInterval(() => {
      setTicked((t) => {
        if (t >= end) window.clearInterval(timer);
        return Math.min(t + 1, end);
      });
    }, 380);
    return () => window.clearInterval(timer);
  }, [inView, reduced, end]);

  const shown = reduced ? end : ticked;
  const done = shown >= end;
  const approved = done && failAt === null;
  const declined = done && failAt !== null;

  return (
    <div ref={ref} className="receipt-edge bg-white px-6 pt-8 pb-12 text-ink sm:px-9">
      <div className="flex items-baseline justify-between">
        <p className="font-semibold tracking-tight">School Store counter</p>
        <p className="figures text-[0.68rem] tracking-widest text-ink/60 uppercase">Sample</p>
      </div>

      <ul className="figures mt-6 space-y-2.5 text-sm">
        {BASKET.map((line) => {
          const struck = declined && scenario.strike === line.item;
          return (
            <li key={line.item} className="flex items-baseline gap-2">
              <span className={`whitespace-nowrap ${struck ? "text-decline line-through" : ""}`}>
                {line.qty} x {line.item}
              </span>
              <span className="leader" />
              <span className={struck ? "text-decline line-through" : ""}>{naira(line.price)}</span>
            </li>
          );
        })}
      </ul>
      <div className="figures mt-4 flex items-baseline justify-between border-t border-dashed border-ink/30 pt-4 text-xl font-semibold">
        <span>Total</span>
        <span>{naira(TOTAL)}</span>
      </div>

      <ol className="mt-6 space-y-2.5 border-t border-dashed border-ink/30 pt-6" aria-label="Checks">
        {CHECKS.map((check, i) => {
          const passed = i < shown && failAt !== i;
          const failed = i < shown && failAt === i;
          const skipped = failAt !== null && i > failAt;
          return (
            <li
              key={check}
              className={`flex items-center gap-3 text-sm transition-colors duration-300 ${
                failed
                  ? "font-semibold text-decline"
                  : passed
                    ? "text-ink"
                    : skipped && done
                      ? "text-ink/40 line-through"
                      : "text-ink/50"
              }`}
            >
              <span
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                  failed
                    ? "bg-decline text-white"
                    : passed
                      ? "bg-brand text-white"
                      : "bg-ink/8"
                }`}
              >
                {failed ? (
                  <HugeiconsIcon icon={Cancel01Icon} size={12} strokeWidth={3} />
                ) : passed ? (
                  <HugeiconsIcon icon={Tick02Icon} size={12} strokeWidth={3} />
                ) : null}
              </span>
              {check}
            </li>
          );
        })}
      </ol>

      {/* Reserved height, so the receipt does not jump when the verdict lands. */}
      <div aria-live="polite" className="relative mt-7 min-h-38 border-t border-dashed border-ink/30 pt-6">
        <AnimatePresence>
          {approved ? (
            <motion.div
              key="approved"
              initial={{ opacity: 0, scale: 1.25, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              transition={{ duration: 0.4, ease }}
            >
              <p className="figures w-fit rounded-md bg-brand px-3 py-1 text-lg font-semibold tracking-widest text-white uppercase">
                Approved
              </p>
              <dl className="figures mt-4 space-y-1.5 text-xs text-ink/80">
                <div className="flex justify-between">
                  <dt>Wallet</dt>
                  <dd>
                    {naira(BALANCE)} to {naira(BALANCE - TOTAL)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt>Stock</dt>
                  <dd>Reduced by 4 items</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Record</dt>
                  <dd>SAMPLE-0001 in reports</dd>
                </div>
              </dl>
            </motion.div>
          ) : null}
          {declined ? (
            <motion.div
              key="declined"
              initial={{ opacity: 0, scale: 1.25, rotate: 8 }}
              animate={{ opacity: 1, scale: 1, rotate: 2 }}
              transition={{ duration: 0.4, ease }}
            >
              <p className="figures w-fit rounded-md bg-decline px-3 py-1 text-lg font-semibold tracking-widest text-white uppercase">
                Declined
              </p>
              <p className="mt-3 text-sm leading-6">{scenario.reason}</p>
              <p className="figures mt-2 text-xs text-ink/70">
                Nothing deducted. Stock unchanged.
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {done && !reduced ? (
          <button
            type="button"
            onClick={onReplay}
            aria-label="Run this sale again"
            className="absolute top-5 right-0 grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-ink/5 text-ink transition hover:bg-ink/10"
          >
            <HugeiconsIcon icon={Refresh01Icon} size={16} strokeWidth={2} />
          </button>
        ) : null}
      </div>
    </div>
  );
}
