# Jammy Landing Page — QA Remediation Roadmap

Source: *CVR Jammy Website – Dev QA* (NW, Aug 16 2026), plus a global note from
Chino Valley Ranchers that all colours must match the final Figma hex values.

Branch: `feature/jammy-landing-page`

Status key: **TODO** · **IN PROGRESS** · **DONE** · **BLOCKED** · **NEEDS DESIGN INPUT**

---

## Blocked — waiting on someone else

| # | Item | Blocked on |
|---|---|---|
| B1 | Fonts should be Proxima Nova and Cubano throughout (currently Anton + Figtree), including button text | **Licensed web font files.** Neither font is in the project and both are commercial. Either purchase web licences or confirm CVR's Adobe Fonts plan covers Proxima Nova — the site already loads a Typekit kit (`use.typekit.net/yyq5ssh.css`), so adding it there is the cheapest route. |
| ~~B2~~ | ~~All colours must match the final Figma hex codes~~ | **RESOLVED** — audited against `CVR_JammyWebsite_r1` node `1:497`. See below. |
| B3 | "Available now at Trader Joe's" in bold Proxima Nova | Depends on B1 |
| B4 | "What is a Jammy Egg?" in Cubano, on a curve, white `#FFFFFF` | Depends on B1. Also needs a decision — see D1 |
| B5 | Format Versatility tile labels use Cubano, anchored top-left | Depends on B1 |
| B6 | About CVR headline font correction | Depends on B1 |

---

## Needs design input before building

| # | Item | Question |
|---|---|---|
| D1 | "What is a Jammy Egg?" on a curve | CSS cannot set type on a curve well. Either an SVG `textPath`, or NW supplies it as artwork like the "Mind the drip" lockup. Artwork is more faithful — which do they want? |
| D2 | Hero animation: "adjusting the way it appears at page load… maybe a soft bounce in? Open to exploration" | An invitation rather than a spec. Plan is to build one option and show it rather than iterate blind. |
| D3 | Illustration seams (see items 8, 9, 18) | The illustrations are assembled from separate layers, so animating them reveals cut lines and lets background colour through at the joins. Can be reduced in code, but the durable fix is re-exported artwork with pieces merged. Worth asking NW before approximating. |

---

## Phase 1 — independent fixes

Small, self-contained, no dependency on fonts or colours.

| # | Section | Item | Status |
|---|---|---|---|
| 1.1 | Playlists | "Get Jammin'" CTA should link to the Spotify playlist URL | **DONE** |
| 1.2 | FAQ | Opening one section should not auto-close another | **DONE** |
| 1.3 | Overview | Protein badge: remove the tilt | **DONE** |
| 1.4 | About CVR | Remove the drop shadow from the headline | **DONE** |
| 1.5 | Hero — mobile | Remove hard returns creating line breaks | **DONE** |
| 1.6 | Playlists — mobile | Hide the QR code when the page scales down | **DONE** |
| 1.7 | Format Versatility | Swap the Ramen and Toast tiles | **DONE** |
| 1.8 | Format Versatility | Third quadrant (Snack) photo watermarked — replace | **DONE** |

**Phase 1 complete.** 11/11 automated checks pass; consent posture unchanged
(zero tracking hosts, zero cookies pre-consent).

### Discovered during Phase 1

The tile image filenames do not describe their contents, which is worth knowing
before anyone edits that section again:

| Filename | Actual photograph |
|---|---|
| `grid-hand.jpg` | ramen bowl |
| `grid-ramen.jpg` | avocado toast |
| `grid-toast.jpg` | packed lunchbox |
| `grid-snack.jpg` | halved eggs (new, licensed) |

Also: `svg/hard-part-sticker.svg` is not the "hard part, done easy" sticker — it
reads **"Toast"** and is a tile label. It was previously pinned to the ramen
photo. Now paired with the toast image and anchored top-left per QA. The other
three tile labels do not exist in the assets and need Cubano — see B5.

## Colour audit (B2) — resolved

Pulled the design tokens from Figma `CVR_JammyWebsite_r1`, node `1:497`. The
file names every colour, so these are authoritative rather than sampled:

| Token | Hex | Used for |
|---|---|---|
| Log Cabin | `#20261A` | body text |
| Mallard | `#2E4322` | headings, buttons |
| White | `#FFFFFF` | type on orange, ground under the wave |
| Blizzard Blue | `#A3D2EE` | Overview, About CVR |
| Christi | `#67A818` | Where to Buy bar |
| Pomegranate | `#F2580E` | What is Jammy |
| Gorse | `#FFEF5C` | About CVR headline |
| Kelp | `#3A3F31` | card body copy |
| Alto | `#D9D9D9` | FAQ rules |
| color/yellow/7 | `#151510` | hero ground |
| *(unbound fill)* | `#EA3213` | Playlists — sampled from the rendered section |

**Nine of eleven already matched.** The one real error was a cream `#FCF6E9`
that does not exist anywhere in the design — I had introduced it. Figma uses
pure `#FFFFFF` both for the type on orange and for the ground beneath the wave,
so replacing it also closed QA item 2.9.

Verified by reading computed styles from the running page: 7/7 section
backgrounds now match their Figma token exactly.

## Phase 2 — layout

| # | Section | Item | Status |
|---|---|---|---|
| 2.1 | Homepage gateway | Button text matches other site buttons (DIN Condensed) | **DONE** |
| 2.2 | Homepage gateway | Supporting copy leading loosened to 1.52 | **DONE** |
| 2.3 | Homepage gateway | Copy block lifted clear of the spoon's shadow | **DONE** |
| 2.4 | Overview | Protein badge sized and placed from Figma geometry | **DONE** |
| 2.5 | Product Features | Five-column grid, smaller labels, wider column gaps | **DONE** |
| 2.6 | Product Features — mobile | Two columns on a solid block | **DONE** |
| 2.7 | Format Versatility | Padding restored above and below the text block | **DONE** |
| 2.8 | Format Versatility — mobile | Tiles full width, stacked | **DONE** |
| 2.9 | Differentiators | Background under the orange wave is white | **DONE** (with B2) |
| 2.10 | Playlists | Taller panel; wordmark no longer cropped | **DONE** |
| 2.11 | Playlists — mobile | Mascot in the right-hand corner | **DONE** |

**Phase 2 complete.** 12/12 automated checks pass, plus Phase 1's 11/11, the
7/7 colour audit, and consent unchanged.

Figma geometry used rather than estimates:
- Protein badge — container 484x504, badge 211x196 at (273.5, 232), so 43.6%
  of the container width with its left edge at 56.5% and top at 46%.
- Format Versatility — 54px above the text block, 56px below the tiles.
- Playlists panel — 1920x432 in the design (aspect 4.44); ours is now 3.63,
  close enough that the wordmark reads with only 21px of symmetric bleed.

Two places where the design was deliberately not followed:
- Gateway body leading. Figma specifies 1.9512cqw against a 1.6725cqw size, a
  ratio of ~1.17. QA asked for looser, so it is 2.55cqw (~1.5), matching the
  rest of the site.
- Gateway copy anchors. Lifted 5% from the design's values because the looser
  leading pushed "everything in between" into the spoon's shadow.

## Phase 3 — artwork and animation

Grouped because they share one root cause (see D3).

| # | Section | Item | Status |
|---|---|---|---|
| 3.1 | Differentiators | Background orange showing through the vector shapes at colour joins | NEEDS DESIGN INPUT |
| 3.2 | Differentiators | Ramen illustration: feet static, shine graphics animate instead | **DONE** |
| 3.3 | Playlists | Simplify animation to avoid visible cuts in the artwork (musical notes are fine) | NEEDS DESIGN INPUT |
| 3.4 | What is Jammy | Egg illustration looks soft/fuzzy — re-export at higher resolution | **DONE** |
| 3.5 | Hero | Replace the letter-drip with a softer entrance, no per-letter warping | NEEDS DESIGN INPUT (D2) |

**Both unblocked Phase 3 items are complete.** 5/5 new checks pass, alongside
Phase 1's 11/11, Phase 2's 12/12, the 7/7 colour audit, and consent unchanged.

### 3.2 — how the shine ended up as an overlay

The four shine marks are **baked into `illo-upgrades-base.png`**, not separate
layers. `ramen-foot-a/b.png` are the feet. Animating the shines therefore meant
either cutting them out of the base image or overlaying them.

Cutting them out was tested and rejected: sampling the alpha ring around each
mark, only **one of four** is isolated. The other three touch the bowl outline,
so a cut-out would take bowl artwork with it. This is D3 in miniature.

So the feet simply lost `jammyFootBob` (they stay in place, as QA asked), and
four `sparkle.png` overlays sit on the measured positions of the baked-in marks
— 81.85%/20.75%, 23.96%/13.21%, 77.58%/69.5%, 15.66%/21.7% — driven by a new
`jammyShine` keyframe. `sparkle.png` is the same `#2F4421` as the baked-in
marks, so they register as one shape.

The keyframe pulses scale and rotation but **never drops opacity below 1**.
That constraint is the whole trick: fading an overlay out would reveal the
baked-in mark underneath, which reads as the sparkle failing to disappear
rather than twinkling. The animation can only ever add to what is already
painted.

### 3.4 — the egg is now vector

`jammy-egg-illo.png` is 345x270 rendered at ~298px — 1.16x, so it softened on
any retina screen. The artwork is vector in Figma (node `1:1445`), so it is now
`svg/jammy-egg-illo.svg` (19.6KB, 23 paths) and is resolution-independent.

Audited the other illustrations for the same fault; none share it. The
`certified-jam` badge is 4.4x and the three differentiator illustrations are
~3x, all comfortably above retina.

## Phase 4 — fonts and colours

Unblocks once B1 and B2 are resolved. Mechanical but touches every heading and
body style, so it needs its own QA pass.

| # | Item | Status |
|---|---|---|
| 4.1 | Swap Anton → Cubano, Figtree → Proxima Nova throughout | BLOCKED (B1) |
| 4.2 | Audit every colour against the final Figma hex values | **DONE** |
| 4.3 | Items B3, B4, B5, B6 | BLOCKED |

---

## Notes

- Phase 1 and 2 are ~2 days combined. Phase 3 depends on what comes back from
  NW. Phase 4 is roughly half a day once unblocked.
- Every phase ends with the existing check suite: CTA hit-testing across
  breakpoints, the Jammy page render checks, and the pre-consent tracking
  verification, so the compliance work stays intact.
