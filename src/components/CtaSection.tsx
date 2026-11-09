"use client";

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { Reveal, RiseHeading } from "@/components/Motion";

// The band tears off into the footer below it, like the end of a receipt: the
// deep teal behind it shows through the teeth.
export default function CtaSection() {
  return (
    <section
      data-nav-tone="light"
      data-nav-bg="var(--color-brand-yellow)"
      className="bg-teal-deep"
    >
      <div className="receipt-edge bg-brand-yellow py-24 text-ink [--tooth:14px] md:py-36">
        <div className="mx-auto w-full max-w-360 px-5 md:px-8 lg:px-12">
          <RiseHeading
            text="Open your school's store."
            className="max-w-5xl font-display text-[3rem] leading-[1.02] font-semibold tracking-[-0.035em] sm:text-7xl lg:text-8xl"
          />
          <Reveal delay={0.15}>
            <p className="mt-7 max-w-xl text-lg leading-8 text-ink/90">
              Tell us what your school sells today and how it keeps track. We
              will show you what PottoStore would change.
            </p>
            <Link
              href="/#contact"
              className="group mt-9 inline-flex items-center gap-3 rounded-full bg-teal-deep py-4 pr-5 pl-7 text-base font-semibold text-white transition hover:bg-brand"
            >
              Talk to us
              <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-yellow text-ink transition-transform duration-300 group-hover:translate-x-1">
                <HugeiconsIcon icon={ArrowRight01Icon} size={15} strokeWidth={2.2} />
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
