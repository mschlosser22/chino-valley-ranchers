# Regenerative rebuild — section plan

Design: `CVR Regen Page.fig`, canvas 2115x8509. Visual reference is the
matching full-page render (`CVR-Regen-LP-R1-v2-clean.png`, 2075x8469 — same
design, 20px bleed trimmed).

Working top-down, one section at a time.

## Where the page stands

The live page is **1.51x too short relative to its width** against the design —
aspect 2.71 vs 4.08. That is not padding drift; sections are missing outright
and several are flattened to a plain band where the design has layered artwork.

| # | Design section | Component today | Gap |
|---|---|---|---|
| 1 | Hero — WELCOME TO Regenerative | `Hero` (13 lines) | Script wordmark, cattle photo, torn base, carton overlap |
| 2 | WHAT IS REGENERATIVE? + video | `WhatIs` (13 lines) | Video frame, hen cut-outs, script annotations, arrows |
| 3 | Regenerative AGRICULTURE | `Content` (36 lines) | Grass bg, torn card, carton + burst, red wood sign |
| 4 | THE NEXT Generation | `ImageFull` (12 lines) | Hen cut-out on sky, torn card |
| 5 | Photo Row | `ImageGrid` (8 lines) | Closest to design already |
| 6 | HIGHEST STANDARDS | `Certified` (20 lines) | Burlap bg, hen cut-out, script annotation |
| 7 | WHAT MAKES Regenerative DIFFERENT? | **missing** | Soil cross-section, four callouts, curved arrows |
| 8 | BETTER FOR THE LAND / HENS / YOU | **missing** | Three underlined green lines |
| 9 | Pre-footer — pasture raised | `EggsOpen` (21 lines) | Type scale and layout |
| 10 | Footer | site `Footer` | — |

`Logos` renders a certification strip that is **not in this design**. Flagged
rather than removed until we know whether it was added deliberately after the
comp.

## Recurring design devices

These repeat down the page and are worth building once:

- **Torn-paper edges** — top and bottom of most bands. The .fig carries them as
  alpha PNGs plus separate masks, so they can be real cut edges rather than CSS
  approximations.
- **Script annotations** — "Hear Chris talk about regenerative", "You want
  more?", "Get em here!", "We're certified!" — Nexa Rust Script B Shadow 2,
  each paired with a hand-drawn curved arrow.
- **Cut-out hens** — several poses, full alpha, overlapping band edges.
- **Textures** — burlap, wood, grass as section grounds.

## Type

Ultra (headings), DIN Condensed 700, Lato 500/700 (body), Rockwell,
Nexa Rust Script B Shadow 2 (annotations). All load today except
`lato` 700 and `nexa-rust-script-shad-2` — see
`docs/regenerative-design-source.md`.

## Fixed before starting

`EggsOpen` nested `<h3>` inside `<p>`, which broke hydration and forced the
whole route to client-render. Present on main; fixed on this branch.


## Section 1 — Hero (in progress)

**Done:** cattle photo, teal ribbon, script wordmark, DIN sub-line, torn edge,
carton overlap, paper ground.

Measured rather than eyeballed:

- Wordmark spans **68.0%** of the viewport — the design's exact figure.
- `nexa-rust-script-shad-2` is in the client's Adobe kit and carries its own
  offset shadow, so the wordmark is **live type**, not artwork. An earlier
  check said it was unavailable; that was wrong — the check ran on a page that
  never requested the face.
- Palette sampled from the render: teal `#006088`, orange `#F8A010`,
  red `#B01010`, paper `#EFEAE0`.

Two mistakes worth recording:

- The first "torn edge" asset picked was a **shadow layer**, not the paper —
  max alpha 215, dark olive, 0% opaque. Caught by inspecting the alpha channel
  rather than trusting the filename-free ID.
- The real paper asset ships **fully opaque**, with the tear drawn as light
  pixels rather than transparency. The alpha had to be rebuilt from luminance
  before the tear would cut.

**Both open items closed.** 17/17 checks pass at 1440px and 390px
(`scripts/qa/regen/sec1test.js`).

*Tear depth.* Measured across the design's unoccluded left and right thirds,
the edge varies ~13% of canvas width — but looking at the crop, that figure is
the sharp rise at the two outer corners, not the tear's texture. Across the
body it is ~3.3%. The paper asset carries only 1.79%, so the edge is now built
from the deeper mask layer (`cbefd9444fce`, 3.32%) tinted to the paper colour.
Chasing the 13% number would have produced a tear the design does not have.

*Hens.* Placed at the design's own positions — 15.4% / 66.3% / 78.0% from the
left, each ~9.8% of canvas width. Only the standing pose exists as an asset in
the .fig; the two pecking poses are not separate layers, so they are lifted
from the render by their teal (#00608B) with rebuilt alpha. They are flat
single-colour shapes, so nothing is lost. Hidden below `sm` where they crowd
the carton and the design offers no mobile frame.

"WHAT IS REGENERATIVE?" belongs to section 2.
