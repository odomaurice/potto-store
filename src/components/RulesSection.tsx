"use client";

import { motion } from "framer-motion";
import { ease, Reveal, RiseHeading } from "@/components/Motion";
import SectionCaption from "@/components/SectionCaption";

// PRD 9, in plain words and in its own order.
const RULES = [
  "Every product belongs to one school.",
  "Every order belongs to one school.",
  "Prices are validated by the backend.",
  "A failed purchase never reduces stock.",
  "Every successful purchase has a transaction record.",
  "One payment reference is never processed twice.",
  "A student cannot go past a spending restriction.",
  "A deactivated card cannot authorise a purchase.",
  "A restricted product cannot be bought by a student.",
  "Every stock adjustment can be traced.",
  "A refund stays tied to its original transaction.",
  "No administrator sees another school's finances.",
  "A completed transaction is never silently changed or deleted.",
  "Corrections are made by traceable adjustment or reversal.",
  "Availability is checked at checkout and again at purchase.",
];

// PRD 8.
const SAFEGUARDS = [
  "Role-based access",
  "School-level data isolation",
  "Secure authentication",
  "Encrypted communication",
  "Transaction authorisation",
  "Payment verification",
  "Session management",
  "Audit logging",
];

const LOGGED = [
  "Price changes",
  "Inventory adjustments",
  "Refunds",
  "Manual corrections",
  "Permission changes",
  "Card activation and deactivation",
];

export default function RulesSection() {
  return (
    <section
      id="rules"
      data-nav-tone="dark"
      data-nav-bg="var(--color-teal-deep)"
      className="relative overflow-hidden bg-teal-deep py-28 text-white md:py-40"
    >
      <div className="mx-auto w-full max-w-360 px-5 md:px-8 lg:px-12">
        <SectionCaption aisle={9} label="House rules" tone="dark" />
        <RiseHeading
          text="A success message is not a payment."
          mark={["not", "a", "payment."]}
          markClassName="text-brand-yellow-light"
          className="mt-6 max-w-5xl font-display text-[2.75rem] leading-[1.04] font-semibold tracking-[-0.035em] sm:text-7xl"
        />
        <Reveal delay={0.1}>
          <p className="mt-7 max-w-2xl text-lg leading-8 font-light text-white/90">
            Payments are confirmed through a trusted payment source, never
            because a browser reported success. Wallet transactions are designed
            to complete fully or not at all, so nobody is charged twice. These
            are the rules the store does not bend.
          </p>
        </Reveal>

        <ol className="mt-16 grid gap-x-12 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {RULES.map((rule, i) => (
            <motion.li
              key={rule}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease }}
              className="grid grid-cols-[2.75rem_1fr] border-t border-white/15 py-5"
            >
              <span className="figures pt-0.5 text-xs text-brand-yellow-light">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-base leading-6 font-medium">{rule}</span>
            </motion.li>
          ))}
        </ol>

        <div className="mt-20 grid gap-12 border-t-[3px] border-white pt-10 lg:grid-cols-2">
          <Reveal>
            <h3 className="text-2xl font-semibold tracking-[-0.02em]">
              Because it holds children&apos;s records and money
            </h3>
            <ul className="mt-6 flex flex-wrap gap-2">
              {SAFEGUARDS.map((item) => (
                <li key={item} className="rounded-full bg-white/10 px-4 py-2 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="text-2xl font-semibold tracking-[-0.02em]">
              Always written to the log
            </h3>
            <ul className="mt-6 flex flex-wrap gap-2">
              {LOGGED.map((item) => (
                <li key={item} className="figures rounded-full bg-brand-teal-dark px-4 py-2 text-[0.8rem]">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
