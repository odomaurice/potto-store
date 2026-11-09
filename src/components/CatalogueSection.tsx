"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  Backpack01Icon,
  Book02Icon,
  BookOpen01Icon,
  Certificate01Icon,
  CookieIcon,
  FootballIcon,
  PencilRulerIcon,
  TShirtIcon,
} from "@hugeicons/core-free-icons";
import { RiseHeading, useIsDesktop, useReducedMotionPref } from "@/components/Motion";
import SectionCaption from "@/components/SectionCaption";

// PRD 4.2 for the categories, 4.3 for the kinds of variant each one can carry.
const TAGS = [
  {
    icon: Certificate01Icon,
    name: "Admission forms",
    line: "Published and paid for online, by families who have never set foot in the school.",
    variants: ["Purchasable item"],
    fill: "bg-brand-teal-dark text-white",
    soft: "text-white/90",
    chip: "bg-white/15",
  },
  {
    icon: Book02Icon,
    name: "Textbooks",
    line: "Listed by subject and class, with the right edition and the stock to match.",
    variants: ["Edition"],
    fill: "bg-brand-yellow text-ink",
    soft: "text-ink/80",
    chip: "bg-ink/10",
  },
  {
    icon: PencilRulerIcon,
    name: "Stationery",
    line: "The small daily things, sold quickly at the counter or added to a parent's order.",
    variants: ["Type", "Packaging"],
    fill: "bg-teal-deep text-white",
    soft: "text-white/90",
    chip: "bg-white/15",
  },
  {
    icon: TShirtIcon,
    name: "School uniforms",
    line: "Each size and colour keeps its own quantity, so you know what is really left.",
    variants: ["Size", "Colour"],
    fill: "bg-[#dcebe9] text-ink",
    soft: "text-ink/80",
    chip: "bg-ink/10",
  },
  {
    icon: FootballIcon,
    name: "Sportswear",
    line: "House colours and kit, ready to collect or arranged for delivery where supported.",
    variants: ["Size", "Colour"],
    fill: "bg-brand-teal-dark text-white",
    soft: "text-white/90",
    chip: "bg-white/15",
  },
  {
    icon: CookieIcon,
    name: "Snacks and refreshments",
    line: "Bought by card at break, and restricted item by item where a parent says so.",
    variants: ["Type", "Packaging"],
    fill: "bg-teal-deep text-white",
    soft: "text-white/90",
    chip: "bg-white/15",
  },
  {
    icon: BookOpen01Icon,
    name: "Learning materials",
    line: "Workbooks, kits and readers, assigned to a category and easy to find.",
    variants: ["Edition", "Type"],
    fill: "bg-brand-teal-dark text-white",
    soft: "text-white/90",
    chip: "bg-white/15",
  },
  {
    icon: Backpack01Icon,
    name: "School merchandise",
    line: "Bags, caps and anything else that carries the school's name.",
    variants: ["Colour", "Type"],
    fill: "bg-[#dcebe9] text-ink",
    soft: "text-ink/80",
    chip: "bg-ink/10",
  },
  {
    icon: Add01Icon,
    name: "Your own categories",
    line: "Create, rename, reorder or switch off categories for whatever else the school approves.",
    variants: ["School-approved"],
    fill: "bg-brand-teal-dark text-white",
    soft: "text-white/90",
    chip: "bg-white/15",
  },
];

const FIELDS = "Name, description, images, SKU, price, quantity, status, variants";

export default function CatalogueSection() {
  const ref = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLUListElement>(null);
  const [distance, setDistance] = useState(0);

  const isDesktop = useIsDesktop();
  const reduced = useReducedMotionPref();
  const pinned = isDesktop && !reduced;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  // The tags hang from the rail, so they swing when it moves.
  const velocity = useVelocity(scrollYProgress);
  const sway = useSpring(
    useTransform(velocity, [-0.5, 0.5], [-8, 8], { clamp: true }),
    { stiffness: 130, damping: 7, mass: 0.7 },
  );

  // How far the rail must travel. ResizeObserver fires on observe, so this is
  // measured without calling setState in the effect's body.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const observer = new ResizeObserver(() => {
      setDistance(Math.max(0, rail.scrollWidth - window.innerWidth));
    });
    observer.observe(rail);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="catalogue"
      data-nav-tone="light"
      data-nav-bg="var(--canvas)"
      className="relative py-24 lg:py-0 lg:motion-safe:h-[320vh]"
    >
      <div className="flex flex-col justify-center lg:py-20 lg:motion-safe:sticky lg:motion-safe:top-0 lg:motion-safe:h-svh lg:motion-safe:overflow-hidden lg:motion-safe:pt-20 lg:motion-safe:pb-4">
        <div className="mx-auto grid w-full max-w-360 gap-6 px-5 md:px-8 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:px-12">
          <div>
            <SectionCaption aisle={2} label="The shelves" />
            <RiseHeading
              text="Everything your school sells, in one store of its own."
              mark={["store", "of", "its", "own."]}
              className="mt-5 max-w-3xl font-display text-[2.5rem] leading-[1.08] font-semibold tracking-[-0.03em] sm:text-5xl xl:text-6xl"
            />
          </div>
          <p className="max-w-md text-base leading-7 font-light text-soft lg:justify-self-end">
            Each school runs an independent store, with its own name, hours and
            payment options, and no sight of any other school&apos;s. Every
            product carries the same record:{" "}
            <span className="figures text-sm text-ink">{FIELDS}.</span>
          </p>
        </div>

        <div className="relative mt-10 lg:mt-8">
          {/* The rail the tags hang from. */}
          <span aria-hidden className="absolute inset-x-0 top-0 h-0.75 bg-brand" />

          <motion.ul
            ref={railRef}
            style={pinned ? { x } : undefined}
            className={`flex w-max gap-5 px-5 md:px-8 lg:gap-6 lg:px-12 ${
              pinned ? "" : "max-lg:w-full max-lg:snap-x max-lg:snap-mandatory max-lg:overflow-x-auto motion-reduce:w-full motion-reduce:overflow-x-auto"
            }`}
          >
            {TAGS.map((tag) => (
              <li key={tag.name} className="shrink-0 snap-center">
                <motion.div
                  style={{ rotate: pinned ? sway : 0, transformOrigin: "50% 0%" }}
                  className="w-70 pb-3 transition-transform duration-500 hover:rotate-2 xl:w-76"
                >
                  {/* The string, from the rail to the punched hole. */}
                  <svg aria-hidden viewBox="0 0 20 46" className="mx-auto -mb-5 h-11.5 w-5 text-brand">
                    <path d="M10 0 V30" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>

                  <article
                    className={`swing-tag flex h-100 flex-col justify-between px-7 pt-14 pb-7 lg:h-[min(25rem,calc(100svh-27rem))] lg:min-h-70 ${tag.fill}`}
                  >
                    <HugeiconsIcon icon={tag.icon} size={34} strokeWidth={1.4} />
                    <div>
                      <h3 className="text-[1.65rem] leading-[1.12] font-semibold tracking-[-0.02em]">
                        {tag.name}
                      </h3>
                      <p className={`mt-3 text-sm leading-6 font-light ${tag.soft}`}>
                        {tag.line}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {tag.variants.map((variant) => (
                          <li
                            key={variant}
                            className={`figures rounded-full px-2.5 py-1 text-[0.68rem] ${tag.chip}`}
                          >
                            {variant}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </motion.div>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
