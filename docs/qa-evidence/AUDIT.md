# Jammy QA — audit and evidence

Against *CVR Jammy Website – Dev QA* (revised, 3 Sept 2026).
Branch `feature/jammy-v2`. Every row below has a screenshot in `shots/`.

**19 of 19 line items complete.** Where the QA document and the Figma
disagree, **QA wins** — that is the client's ruling and it is applied
throughout. 123 automated assertions pass across
fourteen suites. Production build succeeds; `/jammy` prerenders static at
8.15 kB. Consent posture unchanged: zero third-party trackers and zero
non-consent cookies before consent, across four pages.

---

## Homepage gateway

| # | QA asked for | What was done | Shot |
|---|---|---|---|
| 01 | "Button text should be consistent with other buttons (Din Condensed?)" | Set in din-condensed 700 at 18.7px, matching the site's other buttons. | `item-01.jpg` |
| 02 | "extra bottom padding… ensure the 'everything in between' text isn't showing up in the shadow of the spoon" | Band rebuilt on the lighter-shadow photo NW supplied; copy cleared of the spoon and padding increased. | `item-02.jpg` |

## Global

| # | QA asked for | What was done | Shot |
|---|---|---|---|
| 03 | "Remove drop shadow from the hover state of buttons. Just the scale animation is sufficient." | Shadow removed; hover is `scale(1.04)` only. A 0.75s transform transition left on `.jammy-reveal` was also removed — it made hover feel broken. | `item-03.jpg` |

## Hero

| # | QA asked for | What was done | Shot |
|---|---|---|---|
| 04 | "apply a soft bounce-in animation to the whole of the artwork (no separate animation for each individual letter)" | Twelve letter PNGs replaced by the supplied single vector; one `jammyDripBounce` on the whole lockup. Transform matrix holds scale at exactly 1.0 throughout, so nothing warps. | `item-04.jpg` |
| 05 | Supporting text → "The only egg with a golden, jammy center that makes any meal a moment." | Copy updated verbatim. | `item-05.jpg` |
| 06 | "Hero image has been edited slightly. Please update with this asset." | Replaced with the asset from `new hero jammy/`. | `item-06.jpg` |

## Overview

| # | QA asked for | What was done | Shot |
|---|---|---|---|
| 07 | "'Available now at Trader Joe's.' should be in bold Proxima Nova" | proxima-nova 700. The uppercase transform was dropped so it matches the design's sentence case. | `item-07.jpg` |
| 08 | "protein callout should match the size and placement of the original design. Remove the tilt… consistent with the assets provided" | Hand-built SVG blob and live type replaced with the supplied `ProteinBubble.svg`. Sized from Figma geometry (36% of container), tilt removed, moved clear of the bag copy. | `item-08.jpg` |

## What is Jammy

| # | QA asked for | What was done | Shot |
|---|---|---|---|
| 09 | "'What is a Jammy Egg?' should be in Cubano and on a curve consistent with the original design. Should be set in white (#FFFFFF)" | The lockup exported from the Figma. An SVG `textPath` approximation was built first and rejected — it had the structure wrong, not just the curve depth: the design is one line on a deep arc, not two stacked lines. | `item-09.jpg` |
| 10 | "'every time.' in the body copy should be underlined" | Underlined including the period, with an explicit underline offset so the rule clears the descender in "every". | `item-10.jpg` |

## Differentiators

| # | QA asked for | What was done | Shot |
|---|---|---|---|
| 11 | "ensure background tones are not showing through where the different artwork colors meet" | All three illustrations are now single clean vectors. The last layered one (Easy and Ready) was a body PNG with the arm stacked over it; both layers carried semi-transparent edge pixels — 2.6% of the arm box, 1.1% of the body — which is what let the orange through. | `item-11.jpg` |
| 12 | "animated shine graphics to not sit on top of static shine graphics" | The four shines are baked into the ramen artwork and only one of four is separable, so they are overlaid and the keyframe never drops opacity below 1 — fading would reveal the static mark underneath. | `item-12.jpg` |
| 16 | "The headline 'An egg in a class of its own.' doesn't appear to have any kind of padding… running right up along the edges" *(mobile)* | Measured at 0px both sides. Padding goes on the heading and card row, not the section — the orange band and wave are full-bleed. Card copy was 10px from the edge at 360px; now 24px. | `item-16.jpg` |

## Format Versatility

| # | QA asked for | What was done | Shot |
|---|---|---|---|
| 13 | "Ramen and Toast sections need to be swapped. Also, text within each container should use the Cubano text anchored in the top left corner." | Swapped. Labels are live Cubano anchored top-left. The one existing label asset was not Cubano — it is a rounded brush script — so all four are now type. | `item-13.jpg` |
| 14 | "order from left to right should be salad, toast, snack, ramen… image used in the salad block has been updated" | Reordered; the updated salad photo installed from the deliverables. | `item-14.jpg` |
| 17 | "icons should be in two rows with the background reverting to a solid color background block" *(mobile)* | Was five rows of two on white. Now two rows of five on Blizzard Blue `#A3D2EE` (a real Figma token). The row scrolls sideways rather than shrinking type — five columns at 390px leaves ~60px each, and "ingredient" alone needs ~61px at 11px. | `item-17.jpg` |

## Playlists

| # | QA asked for | What was done | Shot |
|---|---|---|---|
| 15 | "adjust/simplify animation to avoid any cuts to the artwork (musical notes are fine)" | Four cut-out PNGs replaced with one clean vector. The torso had a rectangular hole where the sax was lifted away — its right edge runs dead straight at x=343 from y=196 to y=220 — and the sax animation swung clear of it every cycle. Whole-body walk and the notes are kept. | `item-15.jpg` |
| 18 | "Remove Jammy wordmark in the background" *(mobile)* | Hidden below 860px. Kept on desktop, where QA 2.10 specifically asked for a taller panel so it would not crop. | `item-18.jpg` |

## About CVR

| # | QA asked for | What was done | Shot |
|---|---|---|---|
| 19 | "Our Story button text should be Proxima Nova" | proxima-nova 700, keeping the pill's size, uppercase and forest ground. Overrides the Figma, which binds Cubano-Regular to this node. | `item-19.jpg` |

---

## Three-way reconciliation: page vs Figma vs QA

The design file was decoded so the comparison could be made against the
source rather than against screenshots. A `.fig` is a "fig-kiwi" container:
magic, version, then length-prefixed blocks — the schema block is zlib, the
document block is **ZSTD**. `strings` on the raw file returns nothing, which
is not evidence that it is unreadable. `scripts/qa/jammy/decode-fig.sh`
does it in two steps; `docs/qa-evidence/figma-fonts.json` is the extracted
inventory of 79 design strings and their bound fonts.

52 rendered text nodes were compared against it. **Seven disagreements**, and
under QA-trumps-Figma all seven resolve in favour of what the page renders:

| Element | Page | Figma | Ruling |
|---|---|---|---|
| Smooth, Jammy Texture | Proxima Nova | `Figtree-Bold` | QA global row replaces Figtree. Page correct. |
| Easy and Ready to Enjoy | Proxima Nova | `Figtree-Bold` | Same. Page correct. |
| Upgrades Any Dish | Proxima Nova | `Figtree-Bold` | Same. Page correct. |
| Upgrade any dish | Proxima Nova | `Figtree-Bold` | Same. Page correct. |
| Salad *(tile label)* | Cubano | — | No such node in the design; matcher false-positived on the body line "bowls, salads, snacks…". QA names Cubano. Page correct. |
| Snack *(tile label)* | Cubano | — | Same false positive. Page correct. |
| Our Story | Proxima Nova | `Cubano-Regular` | **QA overrides the design.** Page correct. |

The QA global row is the reason four of these exist: *"Fonts should be Proxima
Nova and Cubano throughout (currently design uses Fig Tree and Impact)."* The
design file still carries Figtree on the card headings; QA supersedes it.

Copy shows the same pattern. The Figma hero line reads *"…that **can make** any
meal a moment"*; QA specifies *"…that **makes** any meal a moment."* The page
follows QA, and the superseded wording is asserted absent.

**Resolved: all three pill buttons take Proxima Nova.** Applying QA's Our Story
instruction alone made the two Jammy pills differ, since the design has both as
`Cubano-Regular`. The client's call was to bring Get Jammin' across too, which
is also the consistent reading of the global row's unstruck tail — *"includes
button text"*. Set on the shared `pill()` helper rather than per-button, so
they cannot drift apart again.

| Button | Was | Now | Design |
|---|---|---|---|
| Our Story | Cubano | Proxima Nova 700 | `Cubano-Regular` (overridden) |
| Get Jammin' | Cubano | Proxima Nova 700 | `Cubano-Regular` (overridden) |
| Store Locator | Proxima Nova 800 | Proxima Nova 700 | `ProximaNova-Bold` (now matched) |

Store Locator was asking for weight 800, which the Adobe kit does not carry —
the browser was synthesising it. The design binds `ProximaNova-Bold`, which is
700, so it now renders the real weight.

"Explore Jammy" on the homepage stays DIN Condensed: QA item 1 asks that button
to match *the site's* other buttons, which is a different instruction.

### Colour

Every opaque section background resolves to a named Figma token:

| Section | Hex | Token |
|---|---|---|
| Hero | `#151510` | color/yellow/7 |
| Where to Buy | `#67A818` | Christi |
| Overview | `#A3D2EE` | Blizzard Blue |
| What is Jammy | `#F2580E` | Pomegranate |
| Differentiators / Features / Versatility / FAQ | `#FFFFFF` | White |
| About CVR | `#A3D2EE` | Blizzard Blue |
| Playlists | `#EA3213` | (unbound fill, sampled) |

Product Features takes Blizzard Blue on mobile only, per QA's "solid color
background block".

## Corrections made during this work## Corrections made during this work

Three things were got wrong and then fixed. They are recorded because each
came from the same habit — answering a question adjacent to the one asked.

**The "Our Story" row was missed, then fixed wrongly, then fixed again.** The About CVR cell contains a
struck-through line ("remove drop shadow") followed by an unstruck one ("Our
Story button text should be Proxima Nova"). The strikethrough was read as
covering the whole cell. The client caught it. Two other cells have the same
struck/unstruck shape — Format Versatility padding and the protein callout
scale — and both were re-checked and are correct.

The client then spotted that the change made the two pill buttons disagree,
and the Figma was consulted — showing both as Cubano. The button was reverted
on that basis, which was the wrong call: the client's ruling is that QA
trumps the Figma, so the instruction stands and the mismatch is a consequence
to raise, not a reason to override. It is now Proxima Nova.

The Figma should have been read far earlier. An attempt was abandoned when
`strings` on the compressed canvas returned nothing — which proved only that
the data was compressed. It is ZSTD inside the kiwi container and decodes in
two steps.

**The salad photograph was called a blocker and was not.** It had been in
`ref/FIN Deliverables/assets/photography` throughout. The subject is a lunchbox
and the in-repo copy was named `grid-toast.jpg`; both were allowed to override
what was visibly in the picture — leaves, radish, cucumber, carrot, jammy egg.

**The Playlists animation was called a blocker and was not.** The reasoning was
sound but answered the wrong question: the vector really is a flat single layer,
so the parts genuinely cannot move independently. But QA asked to *simplify the
animation to avoid cuts*, not to keep the per-part motion. The differentiators
cards had already solved it.

## What is not asserted, and why

There is no pixel test for "the seam is gone". Three were written and all three
discarded: scanning for enclosed background flagged the legs apart and the sax
bell; looking for dead-vertical edges flagged the panel's own background
wordmark; scoping to the white body mass scored the **old, broken** build at
22px against the fixed one at 113px — ranking the fix as worse than the defect.

The defect was a straight cut edge in artwork that should read continuous,
which is a judgement about draughtsmanship rather than a pixel threshold. What
is asserted instead is the cause — no cut-out part layers, one vector, no
per-part animation — which cannot regress silently. The visual result was
reviewed frame by frame across a full walk cycle.

## Verification

    npm run dev
    PW=/path/to/playwright/node_modules ./scripts/qa/jammy/run-all.sh

    # three-way audit tooling
    ./scripts/qa/jammy/decode-fig.sh "ref/FIN Deliverables/CVR_JammyWebsite_r1.fig" out
    node scripts/qa/jammy/liveaudit.js    # every rendered text node + its font
    node scripts/qa/jammy/colours.js      # section backgrounds vs Figma tokens
    node scripts/qa/jammy/copyaudit.js    # QA-quoted copy, verbatim

| Check | Result |
|---|---|
| Automated assertions | 123/123 across 14 suites |
| Production build | passes; `/jammy` static, 8.15 kB |
| Pre-consent trackers | 0 across `/`, `/jammy`, `/recipes`, `/store-locator` |
| Pre-consent cookies | 0 |

One pre-existing build warning is unrelated to this branch and present on
`main`: `'products' is not exported from '../../content/products/index'`.
