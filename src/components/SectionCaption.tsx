import { Reveal } from "@/components/Motion";

/**
 * The eyebrow every section opens with, printed like the header of a receipt:
 * the aisle number, a dotted leader and the section's name. The aisle number
 * must match the section's index in HomeScrollNav.
 */
export default function SectionCaption({
  aisle,
  label,
  tone = "light",
  className = "",
}: {
  aisle?: number;
  label: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const onDark = tone === "dark";

  return (
    <Reveal y={12} className={className}>
      <p
        className={`figures flex items-center gap-3 text-xs font-medium tracking-[0.14em] uppercase ${
          onDark ? "text-white/80" : "text-ink/60"
        }`}
      >
        {aisle ? (
          // A yellow fill on the dark grounds: yellow type this small fails on teal.
          <span
            className={
              onDark
                ? "rounded-full bg-brand-yellow px-2.5 py-1 text-ink"
                : "rounded-full bg-brand px-2.5 py-1 text-white"
            }
          >
            Aisle {String(aisle).padStart(2, "0")}
          </span>
        ) : null}
        {aisle ? <span aria-hidden className="leader max-w-16" /> : null}
        <span>{label}</span>
      </p>
    </Reveal>
  );
}
