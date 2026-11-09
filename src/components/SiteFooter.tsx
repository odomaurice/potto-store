"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUp01Icon,
  Facebook01Icon,
  InstagramIcon,
  Linkedin01Icon,
} from "@hugeicons/core-free-icons";
import Wordmark from "@/components/Wordmark";

const EXPLORE = [
  { label: "Why PottoStore", href: "/#about" },
  { label: "The shelves", href: "/#catalogue" },
  { label: "Admission forms", href: "/#admissions" },
  { label: "The counter", href: "/#counter" },
  { label: "Parents", href: "/#parents" },
  { label: "The back office", href: "/#back-office" },
  { label: "Reconciliation", href: "/#reconciliation" },
  { label: "Who runs the store", href: "/#roles" },
  { label: "House rules", href: "/#rules" },
  { label: "The Potto suite", href: "/#suite" },
  { label: "Questions", href: "/#faq" },
];

const PHONES = ["+234 808 472 4276", "+234 812 557 8825"];
const EMAILS = ["Info@potto.ng", "support@potto.ng"];

const OFFICE_HOURS = [
  { days: "Monday to Friday", time: "8AM to 4PM" },
  { days: "Saturday", time: "8AM to 12 Noon" },
];

const ADDRESS =
  "House 83 Coal City Gardens, Behind Central Bank of Nigeria, Okpara Avenue, Enugu.";

const SOCIALS = [
  { label: "Potto on Facebook", icon: Facebook01Icon, href: "https://www.facebook.com/potto.ngr" },
  { label: "Potto on Instagram", icon: InstagramIcon, href: "https://www.instagram.com/potto.ng" },
  { label: "Potto on LinkedIn", icon: Linkedin01Icon, href: "https://www.linkedin.com/company/potto-ng" },
];

const BUILD_YEAR = new Date().getFullYear();
const subscribeToNothing = () => () => {};

const heading = "figures text-xs font-medium tracking-[0.14em] text-brand-yellow-light uppercase";
const link = "text-[0.95rem] font-light text-white/90 transition-colors hover:text-white";

export default function SiteFooter() {
  const year = useSyncExternalStore(
    subscribeToNothing,
    () => new Date().getFullYear(),
    () => BUILD_YEAR,
  );

  return (
    <footer
      id="contact"
      data-nav-tone="dark"
      data-nav-bg="var(--color-teal-deep)"
      className="relative isolate overflow-hidden bg-teal-deep pt-20 text-white md:pt-28"
    >
      <div className="mx-auto w-full max-w-360 px-5 md:px-8 lg:px-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1.2fr_1.3fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" aria-label="PottoStore home" className="inline-flex items-center">
              <Wordmark tone="dark" />
            </Link>
            <p className="mt-5 text-[0.95rem] leading-7 font-light text-white/90">
              The school store, online and cashless, with stock and money kept
              in one record. By Potto Technologies.
            </p>
            <ul className="mt-6 flex gap-2.5">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-brand-yellow hover:text-ink"
                  >
                    <HugeiconsIcon icon={social.icon} size={18} strokeWidth={2} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={heading}>The aisles</h2>
            <ol className="mt-5 grid grid-cols-1 gap-2.5">
              {EXPLORE.map((item, i) => (
                <li key={item.label}>
                  <Link href={item.href} className={`${link} flex gap-3`}>
                    <span className="figures w-5 pt-0.5 text-xs text-white/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className={heading}>Contact</h2>
            <ul className="mt-5 space-y-3">
              <li className="text-[0.95rem] leading-7 font-light text-white/90">{ADDRESS}</li>
              {EMAILS.map((email) => (
                <li key={email}>
                  <a href={`mailto:${email}?subject=PottoStore`} className={link}>
                    {email}
                  </a>
                </li>
              ))}
              {PHONES.map((phone) => (
                <li key={phone}>
                  <a href={`tel:${phone.replace(/\s/g, "")}`} className={`${link} figures`}>
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={heading}>Office hours</h2>
            <ul className="mt-5 space-y-4 text-[0.95rem] font-light text-white/90">
              {OFFICE_HOURS.map((slot) => (
                <li key={slot.days}>
                  <span className="block font-medium text-white">{slot.days}</span>
                  <span className="mt-0.5 block">{slot.time}</span>
                </li>
              ))}
            </ul>
            <a
              href="mailto:support@potto.ng?subject=PottoStore"
              className="mt-7 inline-flex items-center justify-center rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold text-ink transition hover:bg-brand-yellow-light"
            >
              Email support
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-5 border-t border-white/15 pt-8 sm:flex-row sm:justify-between">
          <p className="text-sm font-light text-white/90" suppressHydrationWarning>
            © {year} Potto Technologies Ltd. PottoStore is part of the Potto suite.
          </p>
          <a
            href="#"
            aria-label="Back to top"
            className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <HugeiconsIcon icon={ArrowUp01Icon} size={16} strokeWidth={2} />
          </a>
        </div>
      </div>

      {/* The name, set huge and cut off by the page edge. */}
      <p
        aria-hidden
        className="pointer-events-none mt-6 text-center font-display text-[17vw] leading-[0.78] font-semibold tracking-tighter whitespace-nowrap text-white/8 select-none"
      >
        PottoStore
      </p>
    </footer>
  );
}
