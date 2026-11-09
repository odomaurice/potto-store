"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { ease, RiseHeading } from "@/components/Motion";
import SectionCaption from "@/components/SectionCaption";

// Every answer comes from the PRD. There is no pricing question because the
// PRD has no pricing: see Known gaps in the README.
const FAQS = [
  {
    q: "What can a school sell through PottoStore?",
    a: "Admission forms, textbooks, stationery, uniforms, sportswear, snacks and refreshments, learning materials, school merchandise and anything else the school approves. Schools organise these into their own categories.",
  },
  {
    q: "Can one school see another school's store?",
    a: "No. Every school has its own independent store environment, and one school cannot access another school's products, transactions, inventory or financial records.",
  },
  {
    q: "How does a student pay without cash?",
    a: "With a Potto smart card at the school store. The attendant identifies the student by the card, the account, stock, restrictions and wallet are checked, the student confirms, and a transaction confirmation is generated.",
  },
  {
    q: "What happens if a card is lost?",
    a: "Parents can deactivate a card where that control is enabled, and a deactivated card cannot authorise a purchase.",
  },
  {
    q: "Can I stop my child buying certain things?",
    a: "Yes, subject to what your school has enabled through Potto Pocket. Controls can include daily, weekly, monthly and per-sale limits, and restrictions on products or whole categories. They are enforced when the sale is made, not just hidden from the catalogue.",
  },
  {
    q: "How can parents pay for an online order?",
    a: "With the payment methods the school has enabled. These may include the Potto Pocket student wallet, integrated electronic payment providers and other approved channels.",
  },
  {
    q: "Can orders be delivered?",
    a: "Where the school supports it, parents can arrange delivery to the school or another approved collection location. Otherwise, orders move to ready for collection.",
  },
  {
    q: "Could a student be charged twice?",
    a: "The system is designed to prevent it. A single payment reference is not processed more than once, and wallet transactions are handled atomically to avoid double deductions and inconsistent balances.",
  },
  {
    q: "How are refunds and corrections handled?",
    a: "A refund stays associated with its original transaction, and completed transactions are not silently altered or deleted. Corrections go through traceable adjustments or reversals, and are logged.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      data-nav-tone="light"
      data-nav-bg="var(--canvas)"
      className="relative scroll-mt-28 pb-28 md:pb-40"
    >
      <div className="mx-auto grid w-full max-w-360 gap-12 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-12">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionCaption aisle={11} label="Questions" />
          <RiseHeading
            text="Ask at the counter."
            mark={["counter."]}
            className="mt-6 font-display text-[2.5rem] leading-[1.08] font-semibold tracking-[-0.03em] sm:text-6xl"
          />
        </div>

        <ul className="border-b border-ink/15">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <li key={faq.q} className="border-t border-ink/15">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="group flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className={`text-lg font-medium tracking-[-0.01em] transition-colors sm:text-xl ${isOpen ? "text-brand" : "group-hover:text-brand"}`}>
                      {faq.q}
                    </span>
                    <HugeiconsIcon
                      icon={Add01Icon}
                      size={20}
                      strokeWidth={1.8}
                      className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 text-base leading-7 font-light text-soft">
                        {faq.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
