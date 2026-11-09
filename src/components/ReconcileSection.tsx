"use client";

import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Alert02Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { ease, naira, Reveal, RiseHeading } from "@/components/Motion";
import SectionCaption from "@/components/SectionCaption";

// PRD 4.12: order, payment and transaction records compared by reference. The
// rows are samples, including the deliberate mismatch.
const ROWS = [
  { ref: "SAMPLE-1041", channel: "Student wallet", order: 1650, payment: 1650 },
  { ref: "SAMPLE-1042", channel: "Electronic payment", order: 18500, payment: 18500 },
  { ref: "SAMPLE-1043", channel: "Electronic payment", order: 7200, payment: null },
  { ref: "SAMPLE-1044", channel: "Student wallet", order: 900, payment: 900 },
];

const SUMMARY = [
  "Total sales",
  "Successful transactions",
  "Failed transactions",
  "Pending transactions",
  "Refunds",
  "Wallet purchases",
  "Electronic payments",
  "Outstanding payments",
];

export default function ReconcileSection() {
  return (
    <section
      id="reconciliation"
      data-nav-tone="dark"
      data-nav-bg="var(--color-brand-teal-dark)"
      className="relative overflow-hidden bg-brand-teal-dark py-28 text-white md:py-40"
    >
      <div className="mx-auto grid w-full max-w-360 gap-14 px-5 md:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-12">
        <div>
          <SectionCaption aisle={7} label="Reconciliation" tone="dark" />
          <RiseHeading
            text="What was sold, against what actually came in."
            mark={["actually", "came", "in."]}
            markClassName="text-brand-yellow-light"
            className="mt-6 font-display text-[2.5rem] leading-[1.08] font-semibold tracking-[-0.03em] sm:text-6xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-lg text-lg leading-8 font-light text-white/90">
              Orders, payments and financial transactions are compared, and
              where they disagree the discrepancy is identified. Every
              transaction can be traced by its unique reference.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-white/90">
              {SUMMARY.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-yellow-light" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="min-w-0 self-center">
          <div className="drop-shadow-[0_40px_50px_rgb(0_0_0/0.35)]">
            <div className="receipt-edge bg-white px-5 pt-8 pb-12 text-ink sm:px-9">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-lg font-semibold tracking-tight">Reconciliation summary</p>
                <p className="figures text-[0.68rem] tracking-widest text-ink/60 uppercase">Sample</p>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="figures w-full min-w-lg text-left text-[0.8rem]">
                  <caption className="sr-only">Sample orders compared against payments</caption>
                  <thead className="text-[0.66rem] tracking-widest text-ink/60 uppercase">
                    <tr>
                      <th scope="col" className="pb-3 font-medium">Reference</th>
                      <th scope="col" className="pb-3 font-medium">Channel</th>
                      <th scope="col" className="pb-3 text-right font-medium">Order</th>
                      <th scope="col" className="pb-3 text-right font-medium">Payment</th>
                      <th scope="col" className="w-10 pb-3"><span className="sr-only">Result</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {ROWS.map((row, i) => {
                      const flagged = row.payment === null;
                      return (
                        <motion.tr
                          key={row.ref}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.25 + i * 0.22, ease }}
                          className={`border-t border-dashed border-ink/20 ${flagged ? "bg-brand-yellow/30" : ""}`}
                        >
                          <td className="py-4 pl-2">{row.ref}</td>
                          <td className="py-4">{row.channel}</td>
                          <td className="py-4 text-right">{naira(row.order)}</td>
                          <td className={`py-4 text-right ${flagged ? "font-semibold text-decline" : ""}`}>
                            {flagged ? "None found" : naira(row.payment as number)}
                          </td>
                          <td className="py-4 pr-2 text-right">
                            <span
                              className={`ml-auto grid h-5 w-5 place-items-center rounded-full text-white ${
                                flagged ? "bg-decline" : "bg-brand"
                              }`}
                            >
                              <HugeiconsIcon
                                icon={flagged ? Alert02Icon : Tick02Icon}
                                size={12}
                                strokeWidth={2.6}
                              />
                              <span className="sr-only">{flagged ? "Discrepancy" : "Matched"}</span>
                            </span>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <p className="mt-6 border-t border-dashed border-ink/30 pt-5 text-sm leading-6">
                <span className="font-semibold">One discrepancy to look at:</span>{" "}
                <span className="figures">SAMPLE-1043</span> has an order with no
                confirmed payment behind it.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
