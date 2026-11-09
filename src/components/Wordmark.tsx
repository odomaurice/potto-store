import Image from "next/image";

/**
 * The Potto hand plus "PottoStore", one word, set in type. There is no wordmark
 * artwork, so the name is live text and recolours with the ground for free.
 */
export default function Wordmark({
  tone = "light",
  priority = false,
  className = "",
}: {
  tone?: "light" | "dark";
  priority?: boolean;
  className?: string;
}) {
  const onDark = tone === "dark";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/potto-mark.webp"
        alt=""
        width={93}
        height={160}
        priority={priority}
        className={`h-7 w-auto transition duration-300 ${onDark ? "brightness-0 invert" : ""}`}
      />
      <span
        className={`font-display text-xl tracking-[-0.02em] transition-colors duration-300 ${
          onDark ? "text-white" : "text-ink"
        }`}
      >
        <span className="font-bold">Potto</span>
        <span className="font-light">Store</span>
      </span>
    </span>
  );
}
