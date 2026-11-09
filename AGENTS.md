<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# PottoStore project rules

The block above is managed by `next dev`; everything below it is ours and
survives regeneration. [`README.md`](README.md) explains the reasoning: this is
the short list of things that go wrong when they are not followed.

## Before saying it works

- `npm run build` and `npx eslint src/` must both be clean. The build runs
  TypeScript; lint is not part of it.
- Claims about layout, animation or interaction need a browser, not a
  typecheck. See "Checking it in a browser" in the README.

## Content

- **No em dashes** (the long dash) anywhere in copy, comments or docs. Use a comma,
  colon or full stop, and "to" for ranges ("8AM to 4PM"). The one exception
  is the `next dev` block at the top of this file, which Next.js rewrites.
- **PottoStore is one word**, always: it is a brand name. Never "Potto Store", and
  never "Store" on its own as the product name in page copy ("store" as an ordinary
  word is fine: "your school's store").
- Copy comes from the PRD in [`docs/PRD.md`](docs/PRD.md). Do not add
  capabilities, numbers or claims it does not support.
- PRD 11 is "proposed enhancements, not confirmed existing capabilities". Those
  items stay labelled as proposed.
- There are no Store screenshots yet. Drawn objects (the receipt, the card, the
  tables) must say **sample** on or beside them, must use made-up references,
  and must never be presented as screens from the product. The ID card uses a
  made-up name and the student image already public on the main site. Never put a
  real student's or staff member's name or card on the page.

## Sections

- Every `<section>` needs `data-nav-tone` and `data-nav-bg`, or the header
  loses its colour over it.
- Open with `SectionCaption`. Do not hand-roll another eyebrow.
- Keep `HomeScrollNav`'s `SECTIONS` list in the same order as `page.tsx`. The
  index is the aisle number passed to `SectionCaption`.
- Anchor links must be root-relative (`/#counter`, not `#counter`).
- A section with no top padding of its own needs `scroll-mt-28`.

## Design

- **Light areas use the contour pattern** (`PageBackdrop` + `ContourPattern`).
  Bands are flat colour, with no texture.
- **No decorative gradients or glows**: no blurred colour blobs, gradient
  washes or gradient-filled lines. Flat fills only. The `conic-gradient` and
  `radial-gradient` in the `receipt-edge` and `swing-tag` masks are geometry.
  Soft shadows belong only under the physical objects: card, receipt and slip.
- **No frames.** No outlined boxes. Use tinted fills and hairline rules.
- Gold (`#CA8A04`) is a fill, never text on teal: 1.86:1. Body copy on teal is
  `text-white/90` (4.76:1). `decline` red goes on white or as a fill.
- **Geist Mono is for figures**: prices, quantities, references and labels.
  Everything else is Poppins. Light theme only.
- `receipt-edge` needs any shadow on its **parent** as a `drop-shadow`.

## Motion

- Anything inside `overflow-hidden` cannot use `whileInView` on itself while it
  is clipped out of view: it never reports intersecting. Watch a parent that is
  visible, as `RiseHeading` does.
- Grid items containing a wide table need `grid-cols-1` or `min-w-0` on the
  grid, or the table's minimum width stretches the page on a phone.
- Every animation must survive `prefers-reduced-motion`: the catalogue rail
  unpins, the sale receipt shows its result at once, the marquee stops.

## Images

- Everything on the page is a cropped, resized WebP. Check the file signature,
  not the extension.
- `sizes` must match the real rendered width, not a guessed `vw`.
- Nothing unreferenced in `public/`, and no source masters beside derivatives.

## React

- No `setState` in an effect body; the lint rule is an error. Use
  `useSyncExternalStore` for a hydration-time value, or let `ResizeObserver`
  fire on `observe`.

## Windows, and this shell

- sharp holds its source file open: read into a Buffer before writing back to
  the same path, or the write fails with `UNKNOWN`/`EPERM`.
- Git Bash heredocs and `node -e` break on the apostrophes in this repo's
  prose. Write the script to a file and run the file.
- Stop `next start` before rebuilding; it holds `.next` open.

## Do not invent commitments

Prices, plan entitlements, billing periods, uptime targets, refunds, liability
caps and legal wording are decisions for the team, not drafting choices. Leave
a marked gap and ask. The open ones are listed under "Known gaps" in the README.
