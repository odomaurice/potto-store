# PottoStore: marketing site

The public site for **PottoStore**, the school commerce and inventory product
of the Potto suite: an online store and a cashless counter for admission forms,
textbooks, uniforms and snacks, with stock, payments, parental spending
controls and reconciliation in one record. It is one long homepage, no other
routes.

The content comes from the **PottoStore PRD**, kept in
[`docs/PRD.md`](docs/PRD.md). Anything it does not say is a gap for the team,
not a drafting choice (see Known gaps).

> **Read [`AGENTS.md`](AGENTS.md) before writing code.** This is Next.js **16**,
> whose APIs and conventions differ from older versions. The guides in
> `node_modules/next/dist/docs/` are the authority. That file also carries the
> short list of **project rules**; this README is the reasoning behind them.

## Stack

| Concern | Choice | Notes |
| --- | --- | --- |
| Framework | Next.js 16.3.1, App Router | Turbopack; the homepage prerenders static |
| UI | React 19.2 | the page is a Server Component; its sections are client components |
| Styling | Tailwind CSS v4 | CSS-first config in [`globals.css`](src/app/globals.css): there is **no** `tailwind.config.js` |
| Animation | framer-motion 13 | helpers in [`Motion.tsx`](src/components/Motion.tsx) |
| Icons | `@hugeicons/react` + `@hugeicons/core-free-icons` | the house icon set |
| Fonts | Poppins 300 to 800, Geist Mono | via `next/font/google`. Neither has a naira sign, so `naira()` in `Motion.tsx` draws one. Always use it for amounts |

`shadcn` and `tw-animate-css` are pulled in by `globals.css` for their **token
vocabulary and utilities only**. No shadcn component is rendered.

## Quick start

Requires **Node 20.9 or newer**.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build: run this before every commit
npm run lint     # eslint
```

## Page composition

The page is walked like a shop: each section is a numbered **aisle**. Sections
are composed in [`src/app/page.tsx`](src/app/page.tsx) in this order.

| Aisle | Section | Ground | What it does | PRD |
| --- | --- | --- | --- | --- |
| | `Hero` | teal | The Potto student ID, front and back, on a table with a receipt, and a category marquee | 1, 13 |
| 01 | `AboutSection` `#about` | light | Old ways struck through as they scroll in, the new way beside them | 1, 2 |
| 02 | `CatalogueSection` `#catalogue` | light | Swing tags on a rail: pinned and driven sideways by scroll, and they sway with its speed | 4.1 to 4.3 |
| 03 | `AdmissionSection` `#admissions` | light | The seven steps, and a paid slip | 4.10 |
| 04 | `CounterSection` `#counter` | deep teal | **Sale simulator**: pick a scenario, watch the checks run on a receipt | 4.7, 7.4, 10 |
| 05 | `ParentsSection` `#parents` | light | The nine-step journey, and working spending controls on a sample basket | 4.6, 4.8 |
| 06 | `BackOfficeSection` `#back-office` | light | Stock ledger, variants, order statuses, reports | 4.3, 4.4, 4.9, 5 |
| 07 | `ReconcileSection` `#reconciliation` | teal | Orders against payments, with one deliberate discrepancy | 4.12 |
| 08 | `RolesSection` `#roles` | light | The five roles. The super administrator (3.1) is Potto's own, so left off | 3, 6 |
| 09 | `RulesSection` `#rules` | deep teal | The fifteen business rules, safeguards, what is logged | 4.11, 8, 9 |
| 10 | `SuiteSection` `#suite` | light | Admin, Pocket, Pay and Secure, and the proposed list | 7, 11 |
| 11 | `FaqSection` `#faq` | light | Single-open accordion | all of the above |
| | `CtaSection` | yellow | Tears off into the footer like the end of a receipt | |
| | `SiteFooter` `#contact` | deep teal | Contact details | |

The header takes its colour from whichever section is under a fixed probe line,
through each section's `data-nav-tone` and `data-nav-bg`. **Any new section must
declare both.**

## Design language

Same palette and house face as every Potto site. Everything else is PottoStore's own,
so the sites do not read as copies of each other.

| | PottoFlip | PottoStore |
| --- | --- | --- |
| Metaphor | A course: numbered lessons | A shop: numbered aisles |
| Ground | White first, teal bands | **Teal first**: `#0F766E` and deep teal `#0A4F4A` carry the page, so paper and card read as objects |
| Type | Poppins, heavy, with Caveat notes | Poppins, semibold and tight, light body, **Geist Mono for every figure** |
| Signature | Flip cards, the folded corner | The torn receipt edge, swing tags, the student ID stack |
| Interaction | Flip the card | **Run the product's rules**: decline a sale, set a limit |
| Header | Floating pill | Quiet full-width bar that takes the ground beneath it |

Utilities in [`globals.css`](src/app/globals.css):

- `receipt-edge`, `receipt-edge-top`: the torn edge. Size it with `[--tooth:14px]`.
  A shadow goes on the **parent** as a `drop-shadow`, because the mask cuts a
  box-shadow off.
- `swing-tag`: clipped shoulders and a punched hole.
- `leader`: the dotted line between an item and its price.
- `figures`: the mono face with tabular numbers.

### Contrast, measured

| Foreground on teal `#0F766E` | Ratio | Verdict |
| --- | --- | --- |
| `brand-gold` `#CA8A04` | 1.86 | unusable |
| `brand-yellow-light` `#FACC15` | 3.57 | large accents only |
| `text-white/90` | 4.76 | body copy |

### Shared components

| Component | Role |
| --- | --- |
| [`Motion`](src/components/Motion.tsx) | `Reveal`, `RiseHeading`, `MotionProvider` (honours reduced motion), the `naira` formatter |
| [`SectionCaption`](src/components/SectionCaption.tsx) | The eyebrow every section opens with |
| [`SmartCard`](src/components/SmartCard.tsx) | The student ID, front and back, following the issued Potto card layout. The QR in `cardQr.ts` really does open www.potto.ng |
| [`Wordmark`](src/components/Wordmark.tsx) | The Potto hand plus the name in live type. There is no Store logo artwork |
| [`HomeScrollNav`](src/components/HomeScrollNav.tsx) | The aisle indicator, bottom-left from `md` up. Hand-maintained `SECTIONS` list |

### The sale simulator

[`CounterSection`](src/components/CounterSection.tsx) is the page's centrepiece.
Add a refusal by adding to `SCENARIOS`, with `failAt` set to the index in
`CHECKS` that fails. The receipt is keyed by a run counter, so choosing a
scenario remounts it and replays from the start. With reduced motion it shows
the result immediately. It never calls a server: it illustrates the rules, and
says so beneath it.

## Checking it in a browser

Most sections reveal on scroll, so a plain `chrome --headless --screenshot`
captures empty sections. Drive Chrome over the DevTools protocol: `npm run build`,
`npx next start`, launch Chrome with `--remote-debugging-port`, set the viewport
with `Emulation.setDeviceMetricsOverride`, scroll in steps so every reveal fires,
then `Page.captureScreenshot`. Check at 1440 px and 390 px, and compare
`scrollWidth` with `innerWidth` for horizontal overflow. Node 20 needs
`--experimental-websocket` for the CDP socket. The page scrolls smoothly, so
turn `scroll-behavior` off in the script or the jumps will not have landed.

Stop `next start` before rebuilding; it holds `.next` open.

## Assets

`public/` holds **3 files**: `potto-mark.webp` (also the favicon), `parents.webp`, and
`student-card-photo.webp`, the face from the main site's `problem-student.webp`.
The stock images used for Store and Pocket on the main site are deliberately not
used here, and neither is `hardware/cards.webp`, which shows a real staff
member's name and face. The card itself and the receipts are drawn in code.

## Known gaps

Each is a decision for the team.

| Gap | Detail |
| --- | --- |
| Product status | The PRD is written as "should", and the site describes those capabilities in the present tense. Confirm they are real before launch, or add an "in development" label and change the CTAs to "register interest" |
| Integrations | The Suite section says "designed to". Confirm before promising them. PRD 7.3 also leaves the ownership of payment processing and reconciliation open |
| Sample figures | Prices, stock counts and references are made up and labelled as samples. The naira is assumed from Potto's Nigerian market: the PRD names no currency |
| Card artwork | The card follows the staff ID layout with the wording changed to student. Confirm the real student card matches. The name on it (Amara Chioma Obi) is made up, and the card says sample. Confirm the photo may be used on an ID |
| No privacy policy or terms | Store handles children's records and money (PRD 8). The main site's notices name PottoStore, so link them or write specific ones before launch. There are no legal links yet |
| Pricing | The PRD has none, so the site and FAQ have none |
| Screenshots | There are none. Drawn samples stand in, and are labelled |
| Contacts | The footer keeps Potto's address, phones, emails and hours. The WhatsApp button opens `wa.me/2349064566528`: confirm it handles Store |
| Sign-up | There is no Store sign-up or app URL, so every CTA goes to the contact details |
| Main site link | The main site's `src/lib/suite.ts` has `href: null` for this product, and still writes the name as two words there and in its privacy and terms pages. Set the link and fix the name once this site has a URL |
