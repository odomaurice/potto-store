"use client";

import { motion } from "framer-motion";
import { ease, Reveal, RiseHeading } from "@/components/Motion";
import SectionCaption from "@/components/SectionCaption";

// PRD 4.10, step for step.
const STEPS = [
  "The school creates an admission form as a product.",
  "The form is published in the school's store.",
  "Prospective parents or applicants open the store.",
  "The applicant selects the form.",
  "The applicant completes payment.",
  "A payment confirmation is generated.",
  "The applicant gets access to the admission application process.",
];

export default function AdmissionSection() {
  return (
    <section
      id="admissions"
      data-nav-tone="light"
      data-nav-bg="var(--canvas)"
      className="relative py-24 md:py-36"
    >
      <div className="mx-auto grid w-full max-w-360 gap-16 px-5 md:px-8 lg:grid-cols-2 lg:gap-24 lg:px-12">
        <div>
          <SectionCaption aisle={3} label="Admission forms" />
          <RiseHeading
            text="The first thing a family buys from your school."
            mark={["first"]}
            className="mt-6 font-display text-[2.5rem] leading-[1.08] font-semibold tracking-[-0.03em] sm:text-5xl xl:text-6xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-lg text-lg leading-8 font-light text-soft">
              No queue at the bursar&apos;s window. Publish the form, take
              payment online, and hand the applicant on. Where another Potto
              module handles the application itself, PottoStore connects to it
              rather than doing the job twice.
            </p>
          </Reveal>

          {/* An admission slip, printed in the receipt face. */}
          <motion.div
            initial={{ opacity: 0, rotate: -5, y: 30 }}
            whileInView={{ opacity: 1, rotate: -2, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.1, ease }}
            aria-hidden
            className="mt-12 max-w-md drop-shadow-[0_30px_40px_rgb(0_0_0/0.18)]"
          >
            <div className="receipt-edge bg-brand-teal-dark px-7 pt-7 pb-10 text-white">
              <div className="flex items-start justify-between gap-4">
                <p className="text-2xl leading-tight font-semibold tracking-[-0.02em]">
                  Admission
                  <br />
                  form
                </p>
                <p className="figures rounded-full bg-brand-yellow px-3 py-1 text-[0.68rem] tracking-widest text-ink uppercase">
                  Paid
                </p>
              </div>
              <dl className="figures mt-7 space-y-2 border-t border-dashed border-white/50 pt-5 text-xs">
                <div className="flex justify-between gap-4">
                  <dt>School</dt>
                  <dd>Sample School</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Reference</dt>
                  <dd>SAMPLE-0002</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Next</dt>
                  <dd>Start application</dd>
                </div>
              </dl>
            </div>
          </motion.div>
        </div>

        <ol className="self-center">
          {STEPS.map((step, i) => (
            <motion.li
              key={step}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: i * 0.05, ease }}
              className="grid grid-cols-[3rem_1fr] items-baseline border-b border-ink/10 py-6 last:border-b-0"
            >
              <span className="figures text-sm text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-xl font-medium tracking-[-0.01em] sm:text-2xl">
                {step}
              </span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
