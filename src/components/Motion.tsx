"use client";

import { MotionConfig, motion, useInView } from "framer-motion";
import { useRef, useSyncExternalStore, type ReactNode } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Honour prefers-reduced-motion everywhere: movement goes, fades stay. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Fade and lift once, the first time it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * A headline whose words rise out of their own line, one after another. The
 * words stay plain text in order, so a screen reader hears a normal sentence.
 * Set `mark` to words that should take the accent colour.
 */
export function RiseHeading({
  text,
  as: Tag = "h2",
  mark = [],
  markClassName = "text-brand",
  className = "",
  immediate = false,
  delay = 0,
}: {
  text: string;
  as?: "h1" | "h2";
  mark?: string[];
  markClassName?: string;
  className?: string;
  immediate?: boolean;
  delay?: number;
}) {
  const words = text.split(" ");

  // The heading is what gets watched, not the words. A word sits below its
  // clipped line until it rises, so it can never report being in view itself.
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const risen = immediate || inView;

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          {/* The padding keeps descenders inside the clipped line. */}
          <span className="mb-[-0.16em] inline-block overflow-hidden pb-[0.16em] align-bottom">
            <motion.span
              initial={{ y: "115%" }}
              animate={{ y: risen ? "0%" : "115%" }}
              transition={{ duration: 0.95, delay: delay + i * 0.045, ease }}
              className={`inline-block will-change-transform ${
                mark.includes(word) ? markClassName : ""
              }`}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}

const subscribeToMotionPref = (notify: () => void) => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", notify);
  return () => mq.removeEventListener("change", notify);
};

/** True when the visitor asked for less motion. True on the server too, so nothing animates before hydration. */
export function useReducedMotionPref() {
  return useSyncExternalStore(
    subscribeToMotionPref,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );
}

const subscribeToDesktop = (notify: () => void) => {
  const mq = window.matchMedia("(min-width: 1024px)");
  mq.addEventListener("change", notify);
  return () => mq.removeEventListener("change", notify);
};

/** Tailwind's `lg` breakpoint, for behaviour CSS cannot switch. */
export function useIsDesktop() {
  return useSyncExternalStore(
    subscribeToDesktop,
    () => window.matchMedia("(min-width: 1024px)").matches,
    () => false,
  );
}

/**
 * An amount in naira. The sign is drawn (see `naira-sign`), so it is hidden from
 * screen readers, which get the real character instead.
 */
export function naira(n: number) {
  const amount = n.toLocaleString("en-NG");
  return (
    <span className="whitespace-nowrap">
      <span className="sr-only">{`₦${amount}`}</span>
      <span aria-hidden>
        <span className="naira-sign">N</span>
        {amount}
      </span>
    </span>
  );
}
