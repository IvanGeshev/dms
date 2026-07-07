# DMS Inspiration Direction

Reference notes for Claude Design · what to draw from four sites, and
what to leave behind

## How to use this

These notes turn four reference sites into usable direction. Each entry
names the one quality worth drawing from that site and what to ignore.
Attach this alongside the homepage brief and the DMS Design & Build
Standards — it doesn't replace them, it feeds them. Give each reference
to the model labeled with its Take / Ignore lines so it doesn't blend
incompatible qualities, and keep to these four rather than piling on
more.

Golden rule: all four are creative-agency / studio sites built to show
off. Borrow the craft — motion quality, type treatment, scroll pacing,
the preloader mechanic — and translate it into the DMS system: a
restrained dark theme with yellow and orange accents. Do NOT reproduce
their agency-cool, maximalist aesthetic. A mission-critical industrial
contractor needs credibility over flash, and copying the studio look
would fail the anti-slop test in the standards doc. Draw on the
qualities; never clone a site.

## Griflan — griflan.com

*Creative agency, bold and editorial. The reference for the hero
headline-assembly effect.*

**Take:** A load-time headline-assembly transition — a preloader shows
words that travel into position and lock into the H1 alongside the
already-placed words to form the full headline.

**Ignore:** The rest of its agency styling.

## Motion (sensible defaults — refine against a screen recording):

- The complete H1 is present and readable as the default state — never
  gate the headline on the animation (standards doc: reveal safety).

- Animating words translate / scale from their preload positions into
  their resting spots over ~600–900ms, ease-out-quart or expo, no
  bounce, with a slight stagger.

- Under prefers-reduced-motion, skip the fly-in and show the assembled
  H1 immediately.

- Keep the preloader fast — a quick assembly, not a loading gate. Don't
  hold content hostage to a long intro.

**DMS tie-in:** Maps onto the hero line “The Standard Everyone Claims.
The Reality Only DMS Delivers.” — a few words settle into place while
the rest hold.

## Lama Lama — lamalama.com

*Amsterdam agency, “all in or not at all,” playful and high-energy.*

**Take:** Confidence and boldness of scale, plus any crisp hover /
cursor micro-interactions that caught your eye.

**Ignore:** The playful, colorful energy — wrong tone for a
mission-critical contractor.

**DMS tie-in:** Use this as the “don't be timid” reference, not a
literal pattern source.

## Rhumb Studio — rhumb.co

*Immersive but calm; “clarity and usability without noise”; uses
background video and smooth scroll. The closest tonal match of the
four.*

**Take:** The calm scroll pacing, the video-hero treatment, and the
story-first, trust-building flow (discovery → work → services).

**Ignore:** The 3D / experimental bits.

**DMS tie-in:** Of the four, its overall discipline fits the DMS B2B
goal best — lean on it for structure and restraint.

## Monolog — bymonolog.com

*Brand / web design studio with strong editorial typography; works with
architecture brands.*

**Take:** Type-led hierarchy — big, confident headlines carrying the
page, with tight editorial spacing.

**Ignore:** The arty layout flourishes.

**DMS tie-in:** The typography-craft reference.

## To tighten these

The motion values above are sensible defaults, not measured from the
sites. For any effect you want matched precisely — especially Griflan's
headline assembly — add a 5–15 second screen recording of that
interaction, and the exact easing and timing can be pinned. A still or a
link can't carry motion; a short clip can.
