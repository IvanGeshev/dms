# DMS Design & Build Standards

Single source of truth for Claude Design · merges the Impeccable craft
rules with Vercel's Web Interface Guidelines

## How to use this — the prime directive

Treat everything below as one integrated standard. Every screen,
section, and component you generate must satisfy all of it from the
first draft, not as a later polish pass. Produce ready-to-ship,
production-grade work: beautiful, responsive, fast, precise, and
on-brand. Don't hold back and don't take shortcuts unless asked.

The bar is the AI-slop test: if someone could look at the result and say
“AI made that” without doubt, it has failed. Run the category-reflex
check at two levels — first-order: if someone could guess the theme and
palette from the industry alone, rework it; second-order: if they could
guess the aesthetic family from “industrial contractor, but not the
obvious version,” rework until neither is predictable.

**Project note:** You output standard web technologies (HTML/CSS/JS).
Where a rule names a framework API (React, Next.js, Tailwind, nuqs,
virtua), apply the equivalent.

## Color & theme

- Verify contrast: body text ≥ 4.5:1 against its background; large text
  (≥ 18px, or bold ≥ 14px) ≥ 3:1; placeholder text also 4.5:1. The most
  common failure is muted gray body text on a tinted near-white — push
  the body color toward the ink end of the ramp. Light-gray “for
  elegance” is the top reason AI designs feel unreadable.

- Don't put flat gray text on a colored background (it looks washed
  out). Use a darker shade of the background's own hue, or a translucent
  version of the text color.

- You have locked brand colors from the logo — compose the rest of the
  palette (bg, surface, ink, accent, muted) around them, working in
  OKLCH.

- Avoid the cream / sand / beige near-white body background — it's the
  saturated AI default. Don't translate “industrial” or “professional”
  into a warm-tinted off-white. Choose a true off-white near 0 chroma
  (or tinted slightly toward a brand hue), a darker brand-tinted
  neutral, or a committed brand-color surface. Carry any warmth through
  accent, type, and imagery — not the body background.

- Tinted neutrals: add only 0.005–0.015 chroma toward the brand hue.
  Don't default-tint warm or cool “because the brand feels that way.”

- Pick a color strategy before colors: Restrained (tinted neutrals + one
  accent ≤10%), Committed (one saturated color across 30–60% of the
  surface), Full palette (3–4 deliberate roles), or Drenched (the
  surface is the color). Committed or Restrained usually suits an
  industrial brand.

- Choose dark vs light from a one-sentence physical scene — who uses
  this, where, under what light, in what mood — never “dark because it
  looks cool” or “light to be safe.”

- For any dark section: set color-scheme on <html>, match <meta
  name="theme-color"> to the background, and give native <select> an
  explicit background-color and color.

## Typography

- Cap body line length at 65–75ch.

- Pair fonts on a contrast axis (serif + sans, geometric + humanist) or
  use one family across weights — never two similar-but-not-identical
  sans-serifs.

- Hero / display heading ceiling: clamp() max ≤ 6rem (~96px). Above that
  you're shouting, not designing.

- Display letter-spacing floor: ≥ -0.04em (−0.02 to −0.03em is plenty
  for tight display). Tighter and the letters touch.

- Use text-wrap: balance on h1–h3 for even line lengths; text-wrap:
  pretty on long prose to reduce orphans and widows.

- Use real typographic characters: … not ..., curly quotes “ ” not
  straight ".

- Use non-breaking spaces to keep units and brand names together
  (1.5 hr, 24 HR, DMS).

- End loading / progress text with … (“Sending…”).

- Use font-variant-numeric: tabular-nums for aligned number columns and
  comparisons.

## Layout & spacing

- Vary spacing for rhythm — don't apply one uniform gap everywhere.

- Cards are the lazy answer; use them only when they're truly the best
  affordance, and never nest cards.

- Flexbox for 1D, Grid for 2D — don't default to Grid where flex-wrap is
  simpler.

- Responsive grids without breakpoints: repeat(auto-fit, minmax(280px,
  1fr)).

- Use a semantic z-index scale (dropdown → sticky → modal-backdrop →
  modal → toast → tooltip); never arbitrary values like 999 or 9999.

- Full-bleed sections respect env(safe-area-inset-\*) for notched
  devices.

- Prevent stray horizontal scrollbars — fix overflow at the container
  (overflow-x: hidden).

- Prefer CSS grid/flex over JavaScript measurement for layout.

**Project note:** The full-bleed hero video is exactly where safe-area
insets matter; Services / Industries / DMS Difference are grids — vary
their treatment so they don't read as identical card rows (see Absolute
bans).

## Motion

- Motion is intentional and part of the build, never an afterthought.

- Never animate CSS layout properties (width, height, top/left, margin)
  unless truly unavoidable, and never use transition: all — always list
  the exact properties.

- Ease out with exponential curves (ease-out-quart / quint / expo). No
  bounce, no elastic.

- Set an intentional transform-origin. For SVG, transform a <g>
  wrapper with transform-box: fill-box and transform-origin: center.

- Keep animations interruptible — respond to user input mid-animation.

- Reduced motion is mandatory: every animation needs a
  prefers-reduced-motion: reduce alternative, usually a crossfade or
  instant transition.

- Don't apply one identical entrance to every section — the uniform-fade
  reflex is a tell. Each reveal should fit what it reveals; staggering
  items within a single list is fine.

- Reveal safety: animations must enhance an already-visible default.
  Never gate content visibility on a class-triggered transition, or the
  section can ship blank on hidden tabs and headless renderers.

- Never animate <img> elements on hover — no transform/scale/rotate on
  image hover, including parent-hover-animates-child-image patterns. For
  card hover feedback, animate the card's background, border, or shadow,
  never the image.

- Use a motion library (Motion, GSAP, anime.js, Lenis) for anything
  beyond simple transitions.

**Reconciled:** The two source skills disagreed on animatable
properties. Resolution: default to transform and opacity
(compositor-friendly, always safe); you MAY also animate blur,
backdrop-filter, clip-path, mask, and shadow/glow when they materially
improve the effect AND stay smooth — test them, they're heavier. Layout
properties stay banned either way.

## Interaction, focus & state

- Every interactive element has a visible focus style; never remove the
  outline without a replacement. Use :focus-visible (ring on keyboard
  focus, not on click) and :focus-within for compound controls.

- Give every button and link a clear hover state, and make hover /
  active / focus higher-contrast than the resting state.

- Everything is fully keyboard operable.

- Dropdowns/menus with position: absolute inside an overflow-hidden or
  overflow-auto container get clipped — use the native <dialog> /
  popover API, position: fixed, or a portal to escape the stacking
  context.

- Set touch-action: manipulation (kills the double-tap zoom delay); set
  -webkit-tap-highlight-color intentionally; use overscroll-behavior:
  contain in modals, drawers, and sheets.

- Use autofocus sparingly — desktop only, one primary input, avoid on
  mobile.

- Reflect stateful UI in the URL (filters, tabs, open panels) so it's
  shareable and back-button friendly. Use real links so Cmd/Ctrl+click
  and middle-click work. Destructive actions get a confirmation or undo
  window — never fire immediately.

## Accessibility

- Reach for semantic HTML first (button, a, label, nav, header, main,
  footer, table); use ARIA only when semantics can't express it.

- Icon-only buttons need an aria-label describing the action.

- Every form control needs a real <label> (aria-label only when no
  visible label exists).

- Use <button> for actions and <a> for navigation — never a
  clickable <div> or <span>.

- Images need meaningful alt text (alt="" for decorative); decorative
  icons get aria-hidden="true".

- Keep a correct heading hierarchy (one h1, then h2/h3 in order) and add
  a “skip to main content” link.

- Announce async updates (toasts, validation) with aria-live="polite".

- Add scroll-margin-top to anchor targets so in-page links aren't hidden
  beneath the sticky header.

## Forms (Request a Quote, Contact)

- Use the correct input type (email, tel, url, number) and a matching
  inputmode.

- Add autocomplete and a meaningful name to each input.

- Make labels clickable (wrap the control or use htmlFor).

- Keep the submit button enabled until submission starts, then show a
  spinner.

- Show validation errors inline next to the field, and move focus to the
  first error on submit.

- Never block paste. Turn off spellcheck on emails, codes, and
  usernames.

- Give checkboxes and radios a single hit target covering label +
  control — no dead zones.

- Placeholders show an example pattern and end with … ; never use them
  in place of labels.

- Warn before navigating away from a form with unsaved changes.

## Content, images & performance

- Text containers handle long content (truncate, line-clamp,
  break-words); give flex children min-width: 0 so truncation works.

- Design real empty states — never render broken UI for empty strings or
  arrays. Test copy at short, average, and very long lengths
  (testimonials, service blurbs).

- Every image has explicit width and height (prevents layout shift).
  Lazy-load below-the-fold images; prioritize the above-the-fold hero.

- Virtualize long lists (more than ~50 items). Preconnect to CDN/asset
  domains; preload critical fonts with font-display: swap. Don't read
  layout in render (getBoundingClientRect, offsetHeight); batch DOM
  reads and writes.

- Guard date/time rendering against hydration mismatch; keep inputs with
  a value paired to onChange (or use defaultValue for uncontrolled).

## Copy & voice

- Active voice, second person (“Request a quote,” not “A quote can be
  requested”).

- Title Case for headings and buttons.

- Numerals for counts (“4 industries,” “1.5-hour response”).

- Specific button labels (“Request a Quote”), never vague (“Continue,”
  “Submit”).

- Error messages include the fix or next step, not just the problem.

- No meta-criticism copy — don't name a concept then add an ironic
  modifier, or stage a strawman to correct it. Make the specific claim.

## Localization

- Format dates and numbers with Intl.DateTimeFormat / Intl.NumberFormat,
  never hardcoded.

- Mark brand names and identifiers with translate="no" (DMS, ISNetworld,
  Avetta) so auto-translation doesn't garble them.

## Absolute bans (match-and-refuse — rewrite with different structure)

- Side-stripe borders: border-left/right greater than 1px as a colored
  accent on cards, list items, callouts, or alerts. Use full borders,
  background tints, leading icons/numbers, or nothing.

- Gradient text (background-clip: text on a gradient). Use one solid
  color; emphasize with weight or size.

- Glassmorphism as a default (decorative blur / glass cards). Rare and
  purposeful, or none.

- The hero-metric template: big number + small label + supporting
  stats + gradient accent.

- Identical card grids: same-sized icon + heading + text cards repeated
  endlessly.

- A tiny uppercase tracked eyebrow above every section, and numbered
  section markers (01 / 02 / 03) as default scaffolding. Numbers earn
  their place only when the section truly is an ordered sequence.

- Text that overflows its container — test heading copy at every
  breakpoint; reduce the clamp max or rewrite if it overflows. The
  viewport is part of the design.

- Ghost-card styling: a 1px border AND a soft wide drop shadow (blur ≥
  16px) on the same element. Pick one — a single solid border, or a
  defined shadow no more than 8px blur.

- Over-rounding: border-radius above 16px on cards, sections, or inputs.
  Cards top out at 12–16px; full-pill only for tags/buttons.

- Hand-drawn / sketchy SVG illustrations (doodle / wavy classes,
  paper-grain filters, crude multi-path scenes). If you can't render it
  with real assets, ship no illustration.

- repeating-linear-gradient stripe backgrounds, and decorative two-axis
  CSS grid overlays — unless the surface is a real canvas, map,
  blueprint, or measurement tool.

- Zoom disabling (user-scalable=no or maximum-scale=1).

- outline-none without a focus-visible replacement; clickable
  <div>/<span> instead of <button>; images without dimensions;
  inputs without labels; icon buttons without aria-label; hardcoded
  date/number formats; blocking paste; gratuitous autofocus.
