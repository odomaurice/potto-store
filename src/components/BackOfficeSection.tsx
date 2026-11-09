"use client";

import { motion } from "framer-motion";
import { ease, Reveal, RiseHeading } from "@/components/Motion";
import SectionCaption from "@/components/SectionCaption";

// PRD 4.4: every adjustment records these fields. The rows are samples.
const MOVEMENTS = [
  { product: "Exercise book", before: 240, change: 200, after: 440, reason: "New stock", by: "Store manager", at: "09:12" },
  { product: "Maths textbook", before: 62, change: -1, after: 61, reason: "Sale", by: "Attendant", at: "10:40" },
  { product: "Apple juice", before: 48, change: -6, after: 42, reason: "Expired", by: "Store manager", at: "11:05" },
  { product: "School polo", before: 15, change: -2, after: 13, reason: "Damaged", by: "Store manager", at: "13:27" },
];

// PRD 4.3: "a school uniform may have different sizes and colours, each with
// its own inventory quantity".
const SIZES = [
  { size: "Size 8", qty: 34 },
  { size: "Size 10", qty: 22 },
  { size: "Size 12", qty: 5, low: true },
  { size: "Size 14", qty: 0, out: true },
];
const MAX_QTY = 40;

// PRD 4.9.
const STATUSES = [
  "Pending payment",
  "Paid",
  "Processing",
  "Ready for collection",
  "Out for delivery",
  "Completed",
];
const EXITS = ["Cancelled", "Refunded"];

// PRD 5.
const REPORTS = [
  {
    name: "Sales",
    items: "By day, week and month. By product, category, payment method and attendant.",
  },
  {
    name: "Inventory",
    items: "Current, low and out of stock. Movement history, damage, adjustments and best sellers.",
  },
  {
    name: "Orders",
    items: "Completed, pending, cancelled, refunded and awaiting collection.",
  },
  {
    name: "Student purchases",
    items: "Spending history and totals, limit use, and attempts to buy restricted products.",
  },
];

const signed = (n: number) => (n > 0 ? `+${n}` : `${n}`);

export default function BackOfficeSection() {
  return (
    <section
      id="back-office"
      data-nav-tone="light"
      data-nav-bg="var(--canvas)"
      className="relative scroll-mt-28 pb-28 md:pb-40"
    >
      <div className="mx-auto w-full max-w-360 px-5 md:px-8 lg:px-12">
        <SectionCaption aisle={6} label="The back office" />
        <RiseHeading
          text="If stock moved, someone can say why."
          mark={["someone", "can", "say", "why."]}
          className="mt-6 max-w-4xl font-display text-[2.5rem] leading-[1.08] font-semibold tracking-[-0.03em] sm:text-6xl lg:text-7xl"
        />
        <Reveal delay={0.1}>
          <p className="mt-7 max-w-2xl text-lg leading-8 font-light text-soft">
            Products, prices and quantities are managed in one place. Stock
            updates by itself after each completed sale, and a sale beyond what
            is on the shelf is stopped, unless a product is set up to allow
            backorders.
          </p>
        </Reveal>

        {/* grid-cols-1 is minmax(0, 1fr): without it the table's minimum width
            stretches the track, and with it the whole page on a phone. */}
        <div className="mt-16 grid grid-cols-1 gap-4 lg:grid-cols-6">
          {/* The ledger */}
          <Reveal className="lg:col-span-4">
            <div className="h-full rounded-[2rem] bg-teal-deep p-7 text-white sm:p-10">
              <h3 className="text-2xl font-semibold tracking-[-0.02em]">
                Stock movement history
              </h3>
              <div className="mt-6 overflow-x-auto">
                <table className="figures w-full min-w-152 text-left text-[0.8rem]">
                  <caption className="sr-only">Sample stock movements</caption>
                  <thead className="text-[0.68rem] tracking-widest text-white/80 uppercase">
                    <tr>
                      <th scope="col" className="pb-3 font-medium">Product</th>
                      <th scope="col" className="pb-3 text-right font-medium">Before</th>
                      <th scope="col" className="pb-3 text-right font-medium">Change</th>
                      <th scope="col" className="pb-3 text-right font-medium">After</th>
                      <th scope="col" className="pb-3 pl-6 font-medium">Reason</th>
                      <th scope="col" className="pb-3 font-medium">By</th>
                      <th scope="col" className="pb-3 text-right font-medium">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOVEMENTS.map((row, i) => (
                      <motion.tr
                        key={row.product}
                        initial={{ opacity: 0, x: -14 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease }}
                        className="border-t border-white/15"
                      >
                        <td className="py-3.5 font-sans text-sm font-medium">{row.product}</td>
                        <td className="py-3.5 text-right">{row.before}</td>
                        <td className={`py-3.5 text-right font-semibold ${row.change > 0 ? "text-brand-yellow-light" : "text-white"}`}>
                          {signed(row.change)}
                        </td>
                        <td className="py-3.5 text-right">{row.after}</td>
                        <td className="py-3.5 pl-6">{row.reason}</td>
                        <td className="py-3.5">{row.by}</td>
                        <td className="py-3.5 text-right">{row.at}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>

          {/* Variants */}
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="h-full rounded-[2rem] bg-[#e7f1ef] p-7 sm:p-10">
              <h3 className="text-2xl font-semibold tracking-[-0.02em]">
                One polo, four quantities
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink/70">
                Each variant keeps its own count, and low stock announces itself.
              </p>
              <ul className="mt-6 space-y-4">
                {SIZES.map((s) => (
                  <li key={s.size}>
                    <div className="figures flex justify-between text-xs">
                      <span>{s.size}</span>
                      <span className={s.out || s.low ? "font-semibold text-decline" : ""}>
                        {s.out ? "Out of stock" : s.low ? `${s.qty}, low` : s.qty}
                      </span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-ink/10">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: s.qty / MAX_QTY }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: 0.2, ease }}
                        className={`h-full origin-left rounded-full ${s.low ? "bg-decline" : "bg-brand-teal-dark"}`}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Orders */}
          <Reveal className="lg:col-span-2">
            <div className="h-full rounded-[2rem] bg-brand-yellow p-7 text-ink sm:p-10">
              <h3 className="text-2xl font-semibold tracking-[-0.02em]">
                Every order has one status
              </h3>
              <ol className="mt-6">
                {STATUSES.map((status, i) => (
                  <li key={status} className="relative flex items-center gap-3 py-1.5 text-sm font-medium">
                    <span className="relative z-10 h-3 w-3 shrink-0 rounded-full bg-ink" />
                    {i < STATUSES.length - 1 ? (
                      <span aria-hidden className="absolute top-1/2 left-1.25 h-full w-0.5 bg-ink" />
                    ) : null}
                    {status}
                  </li>
                ))}
              </ol>
              <p className="figures mt-4 border-t border-dashed border-ink/40 pt-4 text-xs">
                Or: {EXITS.join(", ")}
              </p>
              <p className="mt-3 text-sm leading-6 text-ink/90">
                Search by reference, student, parent, date, status or product.
              </p>
            </div>
          </Reveal>

          {/* Reports */}
          <Reveal delay={0.1} className="lg:col-span-4">
            <div className="h-full rounded-[2rem] bg-[#dcebe9] p-7 sm:p-10">
              <h3 className="text-2xl font-semibold tracking-[-0.02em]">
                Reports worth opening
              </h3>
              <dl className="mt-6 grid gap-x-10 sm:grid-cols-2">
                {REPORTS.map((report) => (
                  <div key={report.name} className="border-t border-ink/15 py-5">
                    <dt className="text-lg font-semibold">{report.name}</dt>
                    <dd className="mt-1 text-sm leading-6 text-ink/70">{report.items}</dd>
                  </div>
                ))}
              </dl>
              <p className="figures mt-2 text-xs text-ink/70">
                With date filters, and export to formats such as PDF and Excel where implemented.
              </p>
            </div>
          </Reveal>
        </div>

        <p className="figures mt-5 text-[0.7rem] text-ink/60">
          Sample records, to show what is kept. Not screens from the product.
        </p>
      </div>
    </section>
  );
}
