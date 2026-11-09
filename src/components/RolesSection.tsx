"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { ease, RiseHeading } from "@/components/Motion";
import SectionCaption from "@/components/SectionCaption";

// PRD 3.2 to 3.6, with the notifications of 6. The platform super administrator
// (3.1) is Potto's own role and is left off.
const ROLES = [
  {
    name: "School administrator",
    summary: "Sets up the store and watches over it.",
    does: [
      "Configures the store, its policies and payment methods",
      "Manages store users and their permissions",
      "Creates and arranges product categories",
      "Reviews sales and reconciliation reports",
    ],
    hears: "Activity summaries, reconciliation discrepancies, significant adjustments and unusual activity.",
  },
  {
    name: "Store manager",
    summary: "Runs the store from day to day.",
    does: [
      "Adds products and updates prices and quantities",
      "Processes, prepares and fulfils orders",
      "Records stock adjustments and watches low stock",
      "Generates sales reports",
    ],
    hears: "New orders, successful payments, low or finished stock, and orders awaiting fulfilment.",
  },
  {
    name: "Store attendant",
    summary: "Serves at the counter, and sees only what the job needs.",
    does: [
      "Identifies students by smart card or an approved method",
      "Processes purchases and checks availability",
      "Confirms amounts and issues confirmations",
      "Helps with order fulfilment",
    ],
    hears: null,
  },
  {
    name: "Parent or guardian",
    summary: "Buys remotely and keeps an eye on spending.",
    does: [
      "Browses the store and buys for linked children",
      "Chooses delivery or collection where supported",
      "Views order history and monitors purchases",
      "Manages spending restrictions and blocks products",
    ],
    hears: "Purchases, order updates, low wallet balance and refund confirmations.",
  },
  {
    name: "Student",
    summary: "Buys in school without carrying cash.",
    does: [
      "Browses the products available",
      "Pays with an authorised smart card",
      "Sees purchase confirmations",
      "Buys within allocated spending limits",
    ],
    hears: null,
  },
];

export default function RolesSection() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="roles"
      data-nav-tone="light"
      data-nav-bg="var(--canvas)"
      className="relative py-28 md:py-40"
    >
      <div className="mx-auto w-full max-w-360 px-5 md:px-8 lg:px-12">
        <SectionCaption aisle={8} label="Who runs the store" />
        <RiseHeading
          text="Five people. Each sees only their part."
          mark={["only", "their", "part."]}
          className="mt-6 max-w-4xl font-display text-[2.5rem] leading-[1.08] font-semibold tracking-[-0.03em] sm:text-6xl lg:text-7xl"
        />

        <ul className="mt-16 border-b border-ink/15">
          {ROLES.map((role, i) => {
            const isOpen = open === i;
            return (
              <li key={role.name} className="border-t border-ink/15">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="group grid w-full cursor-pointer grid-cols-[1fr_auto] items-center gap-4 py-6 text-left md:grid-cols-[4rem_1.1fr_1fr_auto] md:py-8"
                  >
                    <span className="figures hidden text-xs text-ink/60 md:block">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-[1.7rem] leading-tight font-semibold tracking-tight transition-colors sm:text-4xl lg:text-5xl ${
                        isOpen ? "text-brand" : "group-hover:text-brand"
                      }`}
                    >
                      {role.name}
                    </span>
                    <span className="hidden text-base font-light text-soft md:block">
                      {role.summary}
                    </span>
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-full transition-all duration-300 ${
                        isOpen ? "rotate-45 bg-brand text-white" : "bg-ink/5 text-ink"
                      }`}
                    >
                      <HugeiconsIcon icon={Add01Icon} size={18} strokeWidth={2} />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-10 md:grid-cols-[4rem_1.1fr_1fr_auto] md:gap-4">
                        <span className="hidden md:block" />
                        <ul className="space-y-2.5 text-base">
                          {role.does.map((item) => (
                            <li key={item} className="flex gap-3">
                              <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        {role.hears ? (
                          <p className="text-sm leading-6 text-ink/70">
                            <span className="figures mb-2 block text-[0.68rem] tracking-[0.12em] text-ink/60 uppercase">
                              Hears about
                            </span>
                            {role.hears}
                          </p>
                        ) : null}
                      </div>
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
