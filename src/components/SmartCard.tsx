import Image from "next/image";
import { QR_PATH, QR_SIZE } from "@/components/cardQr";



// The two cards lie on a table, seen from above at an angle.
const LIE_FLAT = "translate(-50%, -50%) rotateX(25deg) rotateZ(-72deg)";

// Thickness: the sheets underneath, offset so they run straight down the screen
// once the card is laid flat, then a soft shadow on the table.
const SHEETS = Array.from({ length: 18 }, (_, i) => {
  const n = i + 1;
  const colour = n === 18 ? "#5f8f8b" : n % 2 ? "#a9c6c2" : "#7da8a3";
  return `${(-1.05 * n).toFixed(1)}px ${(0.34 * n).toFixed(1)}px 0 ${colour}`;
}).join(", ");
const STACK_SHADOW = `${SHEETS}, -34px 16px 44px rgb(0 0 0 / 0.34)`;

function CardFace({
  left,
  top,
  children,
}: {
  left: string;
  top: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{ left, top, transform: LIE_FLAT, boxShadow: STACK_SHADOW }}
      className="absolute aspect-[1/1.586] w-[41%] rounded-[3%] bg-white text-ink @container"
    >
      <div
        style={{ fontSize: "4cqw" }}
        className="relative h-full w-full overflow-hidden rounded-[inherit]"
      >
        {children}
      </div>
    </div>
  );
}

function CardLogo({ muted = false }: { muted?: boolean }) {
  return (
    <div className="flex items-center gap-[0.5em]">
      <span
        className={`grid h-[3em] w-[3em] shrink-0 place-items-center rounded-full outline-[0.14em] outline-offset-[0.1em] outline-brand-gray ${
          muted ? "bg-brand-gray" : "bg-brand-teal-dark"
        }`}
      >
        <Image
          src="/potto-mark.webp"
          alt=""
          width={93}
          height={160}
          className="h-[1.9em] w-auto brightness-0 invert"
        />
      </span>
      <span className="ml-[0.2em] leading-tight">
        <span className="block text-[0.82em] font-bold tracking-tight">POTTO NIGERIA</span>
        <span className="block text-[0.68em]">www.potto.ng</span>
      </span>
    </div>
  );
}

export default function SmartCard({
  deactivated = false,
  className = "",
}: {
  deactivated?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative aspect-square w-full transform-3d ${className}`}>
      {/* The back: the QR code. */}
      <CardFace left="41%" top="68%">
        <div className="absolute inset-x-0 top-0 p-[1.5em]">
          <CardLogo muted />
        </div>
        <svg
          viewBox={`-1 -1 ${QR_SIZE + 2} ${QR_SIZE + 2}`}
          className="absolute top-[24%] left-[8%] w-[84%]"
          shapeRendering="crispEdges"
        >
          <path d={QR_PATH} fill="#000" />
        </svg>
        <p className="absolute right-[1.5em] bottom-[1.2em] text-[0.72em]">
          Powered with <span className="text-brand-teal-dark">&#9829;</span> by Potto.ng
        </p>
      </CardFace>

      {/* The front: the student. */}
      <CardFace left="59%" top="32%">
        <div className="absolute inset-x-0 top-0 p-[1.5em]">
          <CardLogo />
        </div>

        <div
          className={`absolute top-[23%] left-1/2 aspect-square w-[60%] -translate-x-1/2 rounded-full border-[0.2em] p-[0.32em] transition-colors duration-500 ${
            deactivated ? "border-brand-gray" : "border-brand-teal-dark"
          }`}
        >
          <Image
            src="/student-card-photo.webp"
            alt=""
            width={360}
            height={360}
            sizes="200px"
            className={`h-full w-full rounded-full object-cover transition duration-500 ${
              deactivated ? "grayscale" : ""
            }`}
          />
        </div>

        <div className="absolute inset-x-0 top-[65%] text-center leading-none">
          <p className="text-[2.3em] font-extrabold tracking-tight">AMARA</p>
          <p className="mt-[0.3em] text-[1.1em]">CHIOMA OBI</p>
          <p className="figures mt-[0.6em] text-[0.5em] tracking-[0.2em] text-ink/60">SAMPLE</p>
        </div>

        <div
          data-card-band
          className={`absolute inset-x-0 bottom-0 grid h-[11.5%] place-items-center transition-colors duration-500 ${
            deactivated ? "bg-[#4b5563]" : "bg-brand-teal-dark"
          }`}
        >
          <span className="text-[0.8em] font-bold tracking-tight text-white">
            {deactivated ? "CARD DEACTIVATED" : "STUDENT IDENTIFICATION CARD"}
          </span>
        </div>
      </CardFace>
    </div>
  );
}
