# Jammy QA — audit and evidence

Against *CVR Jammy Website – Dev QA* (revised, 3 Sept 2026).
Branch `feature/jammy-v2`. Every row below has a screenshot in `shots/`.

**18 of 19 line items complete; one raised with NW rather than actioned.** 123 automated assertions pass across
fourteen suites. Production build succeeds; `/jammy` prerenders static at
8.15 kB. Consent posture unchanged: zero third-party trackers and zero
non-consent cookies before consent, across four pages.

---

## Homepage gateway

| # | QA asked for | What was done | Shot |
|---|---|---|---|
| 01 | "Button text should be consistent with other buttons (Din Condensed?)" | Set in din-condensed 700 at 18.7px, matching the site's other buttons. | `item-01.png` |
| 02 | "extra bottom padding… ensure the 'everything in between' text isn't showing up in the shadow of the spoon" | Band rebuilt on the lighter-shadow photo NW supplied; copy cleared of the spoon and padding increased. | `item-02.png` |

## Global

| # | QA asked for | What was done | Shot |
|---|---|---|---|
| 03 | "Remove drop shadow from the hover state of buttons. Just the scale animation is sufficient." | Shadow removed; hover is `scale(1.04)` only. A 0.75s transform transition left on `.jammy-reveal` was also removed — it made hover feel broken. | `item-03.png` |

## Hero

| # | QA asked for | What was done | Shot |
|---|---|---|---|
| 04 | "apply a soft bounce-in animation to the whole of the artwork (no separate animation for each individual letter)" | Twelve letter PNGs replaced by the supplied single vector; one `jammyDripBounce` on the whole lockup. Transform matrix holds scale at exactly 1.0 throughout, so nothing warps. | `item-04.png` |
| 05 | Supporting text → "The only egg with a golden, jammy center that makes any meal a moment." | Copy updated verbatim. | `item-05.png` |
| 06 | "Hero image has been edited slightly. Please update with this asset." | Replaced with the asset from `new hero jammy/`. | `item-06.png` |

## Overview

| # | QA asked for | What was done | Shot |
|---|---|---|---|
| 07 | "'Available now at Trader Joe's.' should be in bold Proxima Nova" | proxima-nova 700. The uppercase transform was dropped so it matches the design's sentence case. | `item-07.png` |
| 08 | "protein callout should match the size and placement of the original design. Remove the tilt… consistent with the assets provided" | Hand-built SVG blob and live type replaced with the supplied `ProteinBubble.svg`. Sized from Figma geometry (36% of container), tilt removed, moved clear of the bag copy. | `item-08.png` |

## What is Jammy

| # | QA asked for | What was done | Shot |
|---|---|---|---|
| 09 | "'What is a Jammy Egg?' should be in Cubano and on a curve consistent with the original design. Should be set in white (#FFFFFF)" | The lockup exported from the Figma. An SVG `textPath` approximation was built first and rejected — it had the structure wrong, not just the curve depth: the design is one line on a deep arc, not two stacked lines. | `item-09.png` |
| 10 | "'every time.' in the body copy should be underlined" | Underlined including the period, with an explicit underline offset so the rule clears the descender in "every". | `item-10.png` |

## Differentiators

| # | QA asked for | What was done | Shot |
|---|---|---|---|
| 11 | "ensure background tones are not showing through where the different artwork colors meet" | All three illustrations are now single clean vectors. The last layered one (Easy and Ready) was a body PNG with the arm stacked over it; both layers carried semi-transparent edge pixels — 2.6% of the arm box, 1.1% of the body — which is what let the orange through. | `item-11.png` |
| 12 | "animated shine graphics to not sit on top of static shine graphics" | The four shines are baked into the ramen artwork and only one of four is separable, so they are overlaid and the keyframe never drops opacity below 1 — fading would reveal the static mark underneath. | `item-12.png` |
| 16 | "The headline 'An egg in a class of its own.' doesn't appear to have any kind of padding… running right up along the edges" *(mobile)* | Measured at 0px both sides. Padding goes on the heading and card row, not the section — the orange band and wave are full-bleed. Card copy was 10px from the edge at 360px; now 24px. | `item-16.png` |

## Format Versatility

| # | QA asked for | What was done | Shot |
|---|---|---|---|
| 13 | "Ramen and Toast sections need to be swapped. Also, text within each container should use the Cubano text anchored in the top left corner." | Swapped. Labels are live Cubano anchored top-left. The one existing label asset was not Cubano — it is a rounded brush script — so all four are now type. | `item-13.png` |
| 14 | "order from left to right should be salad, toast, snack, ramen… image used in the salad block has been updated" | Reordered; the updated salad photo installed from the deliverables. | `item-14.png` |
| 17 | "icons should be in two rows with the background reverting to a solid color background block" *(mobile)* | Was five rows of two on white. Now two rows of five on Blizzard Blue `#A3D2EE` (a real Figma token). The row scrolls sideways rather than shrinking type — five columns at 390px leaves ~60px each, and "ingredient" alone needs ~61px at 11px. | `item-17.png` |

## Playlists

| # | QA asked for | What was done | Shot |
|---|---|---|---|
| 15 | "adjust/simplify animation to avoid any cuts to the artwork (musical notes are fine)" | Four cut-out PNGs replaced with one clean vector. The torso had a rectangular hole where the sax was lifted away — its right edge runs dead straight at x=343 from y=196 to y=220 — and the sax animation swung clear of it every cycle. Whole-body walk and the notes are kept. | `item-15.png` |
| 18 | "Remove Jammy wordmark in the background" *(mobile)* | Hidden below 860px. Kept on desktop, where QA 2.10 specifically asked for a taller panel so it would not crop. | `item-18.png` |

## About CVR

| # | QA asked for | What was done | Shot |
|---|---|---|---|
| 19 | "Our Story button text should be Proxima Nova" | **Left in Cubano — the QA note contradicts the Figma.** See below. | `item-19.png` |

---

## Open question for NW — the Our Story button

QA says *"Our Story button text should be Proxima Nova."* The Figma says
otherwise, and the design file is the more specific record, so the button has
been left as designed.

Reading the font bound to each text node in `CVR_JammyWebsite_r1.fig`
(`canvas.fig` → zstd → the kiwi data block):

| Design node | Bound font |
|---|---|
| Our Story | `Cubano-Regular` |
| Get Jammin' | `Cubano-Regular` |
| Store Locator | `ProximaNova-Bold` |

Both pill buttons are Cubano in the design and match each other. The QA change
was applied first and then reverted: it made the two pills on the page
disagree, which the client noticed immediately. Store Locator is genuinely
Proxima Nova and already renders that way.

The wider type audit against the same source came back clean — headings in
Cubano, body and card headings in Proxima Nova. `Figtree-Bold` appears on the
card headings in the design, but the doc's global row explicitly replaces
Figtree with Proxima Nova, so that is stale in the file rather than a target.

**Needs a decision:** should Our Story be Proxima Nova (following the note, and
breaking the match with Get Jammin'), or stay Cubano (following the design)? If
the note is right, Get Jammin' probably wants the same treatment so the two
still agree.

## Corrections made during this work

Three things were got wrong and then fixed. They are recorded because each
came from the same habit — answering a question adjacent to the one asked.

**The "Our Story" row was missed entirely.** The About CVR cell contains a
struck-through line ("remove drop shadow") followed by an unstruck one ("Our
Story button text should be Proxima Nova"). The strikethrough was read as
covering the whole cell. The client caught it. Two other cells have the same
struck/unstruck shape — Format Versatility padding and the protein callout
scale — and both were re-checked and are correct.

Then the fix itself was wrong, and the client caught that too: applying it
made the two pill buttons disagree. The Figma had the answer and was not
consulted until asked. An earlier attempt to read it had been abandoned after
`strings` on the compressed canvas returned nothing — which proved only that
the data was compressed, not that it was unreadable. It is zstd inside the
kiwi container and decodes in two steps.

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

| Check | Result |
|---|---|
| Automated assertions | 123/123 across 14 suites |
| Production build | passes; `/jammy` static, 8.15 kB |
| Pre-consent trackers | 0 across `/`, `/jammy`, `/recipes`, `/store-locator` |
| Pre-consent cookies | 0 |

One pre-existing build warning is unrelated to this branch and present on
`main`: `'products' is not exported from '../../content/products/index'`.
