"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUpRight01Icon,
  CreditCardIcon,
  DatabaseIcon,
  SecurityCheckIcon,
  Wallet02Icon,
} from "@hugeicons/core-free-icons";
import { Reveal, RiseHeading } from "@/components/Motion";
import SectionCaption from "@/components/SectionCaption";

// PRD 7. The links are the ones the main Potto site uses; null means there is
// no product site to send anyone to yet.
const PRODUCTS = [
  {
    icon: DatabaseIcon,
    name: "Potto Admin",
    gives: "School, student, parent and staff records, reused rather than kept twice.",
    href: null,
  },
  {
    icon: Wallet02Icon,
    name: "Potto Pocket",
    gives: "The student wallet: balances, authorised deductions and spending restrictions.",
    href: "https://about-pocket.potto.ng/",
  },
  {
    icon: CreditCardIcon,
    name: "Potto Pay",
    gives: "Electronic payments and the financial reporting that goes with them.",
    href: "https://pottopay.potto.ng/",
  },
  {
    icon: SecurityCheckIcon,
    name: "Potto Secure",
    gives: "Identity and smart card validation, kept apart from the decision to spend.",
    href: null,
  },
];

// PRD 11: "proposed enhancements, not confirmed existing capabilities".
const PROPOSED = [
  "Barcode scanning",
  "Point-of-sale terminal interface",
  "Several store locations in one school",
  "Supplier and purchase orders",
  "Stock replenishment alerts",
  "Bundles and school packages",
  "Discounts and promotions",
  "Advanced sales analytics",
  "Bulk product imports",
  "Returns and exchanges",
  "Parent purchase approvals",
  "Scheduled spending allowances",
  "Offline point of sale",
];

export default function SuiteSection() {
  return (
    <section
      id="suite"
      data-nav-tone="light"
      data-nav-bg="var(--canvas)"
      className="relative py-28 md:py-40"
    >
      <div className="mx-auto w-full max-w-360 px-5 md:px-8 lg:px-12">
        <SectionCaption aisle={10} label="The Potto suite" />
        <RiseHeading
          text="Not another system to keep in step."
          mark={["keep", "in", "step."]}
          className="mt-6 max-w-4xl font-display text-[2.5rem] leading-[1.08] font-semibold tracking-[-0.03em] sm:text-6xl lg:text-7xl"
        />
        <Reveal delay={0.1}>
          <p className="mt-7 max-w-2xl text-lg leading-8 font-light text-soft">
            PottoStore is designed to work as part of the wider Potto suite,
            taking what it needs from the products a school already runs.
          </p>
        </Reveal>

        <ul className="mt-16 grid border-t-[3px] border-brand sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product, i) => (
            <li key={product.name}>
              <Reveal delay={i * 0.07} className="h-full py-8 pr-8">
                <HugeiconsIcon icon={product.icon} size={30} strokeWidth={1.4} className="text-brand" />
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em]">{product.name}</h3>
                <p className="mt-3 text-base leading-7 font-light text-soft">{product.gives}</p>
                {product.href ? (
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
                  >
                    Visit {product.name}
                    <HugeiconsIcon icon={ArrowUpRight01Icon} size={15} strokeWidth={2} />
                  </a>
                ) : null}
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-16 rounded-[2rem] bg-[#dcebe9] p-7 sm:p-10">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="text-2xl font-semibold tracking-[-0.02em]">On the list</h3>
            <p className="figures text-xs tracking-widest text-ink/70 uppercase">
              Proposed, not available today
            </p>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {PROPOSED.map((item) => (
              <li key={item} className="rounded-full bg-white px-4 py-2 text-sm text-ink/80">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
