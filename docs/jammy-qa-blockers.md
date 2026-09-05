# Jammy QA — blocked items

Tracked against *CVR Jammy Website – Dev QA* (revised). Everything here is
waiting on someone outside the build. Items are removed from this file as they
unblock.

---

## BLOCKER 1 — Homepage gateway: replacement spoon image

**QA row:** "We lightened the shadow of the spoon on the image that is
interfering with text. Replace with **new asset here**." (the words "new asset
here" are a link in the QA PDF)

**What we need:** that linked file.

**Why we cannot proceed on what we have.** The `ref/FIN Deliverables` folder
contains two candidates, and neither matches the description:

| Asset | Shadow band mean RGB |
|---|---|
| Currently deployed (`cta-messy.webp`) | `[166 211 235]` |
| `AdobeStock_1683560974_alt.png` | `[164 207 230]` |
| `AdobeStock_1683560974_revised-recolor2-ex.png` | `[160 203 227]` |

Both candidates are **darker** than what is already live, not lighter, and they
differ from each other by a mean of 1.38 — they are effectively the same image.

There is also a format mismatch. The deployed band is a **composite** at
2000x1017 (spoon photo, torn top and bottom edges, and the area the copy sits
on). The deliverables are **raw photography** at 7306x5421. Swapping one for
the other is not a drop-in; it would mean rebuilding the band composite, which
risks diverging from what NW approved.

**Ask:** the finished band asset from the QA document's link, ideally as the
composite at the same dimensions as `cta-messy.webp`. If only the retouched
photograph exists, say so and we will rebuild the composite around it.

**Not blocked by this:** the padding half of that QA row is already done — the
headline clears the spoon by 4.5%, with a 2.5% gap above the body copy and 2.2%
above the button.

---

## BLOCKER 2 — Playlists illustration animation (QA "Playlists", 3.3)

**QA row:** "Similar to other illustration animations, we want to avoid seeing
all the areas where the illustration was 'cut' to be able to achieve these
illustrations. Please adjust/simplify animation to avoid any cuts to the
artwork (musical notes are fine)."

**Status:** needs re-drawn artwork. Confirmed twice.

The layered PNGs we animate were cut out of flat artwork downstream, which is
where the seams come from: the pieces butt with no overlap, and lifting the sax
out left a hole in the torso behind it.

`ref/FIN Deliverables/assets/graphics/JammyEgg-jazz.svg` is the clean vector
source, but it is a **flat single-layer export** — 55 paths, one group, no named
layers. The legs and sax still cannot be moved independently without cutting
through artwork that was drawn as one shape.

**Ask:** the illustration re-drawn with the movable parts as their own closed
shapes — sax with hands on its own layer, each leg on its own layer, and the
body drawn complete underneath so the pieces overlap rather than butt. Full
spec in `docs/jammy-artwork-respec.md`.

**Cost of doing nothing:** the sax and legs cannot animate. The floating
musical notes, which CVR is happy with, are unaffected.

---

## BLOCKER 3 — "What is a Jammy Egg?" on a curve (QA "What is Jammy", B4)

**QA row:** "'What is a Jammy Egg?' should be in Cubano and **on a curve
consistent with the original design**. Should be set in white (#FFFFFF)."

**Status:** needs a decision, not an asset.

The font half is unblocked — Cubano is in the Adobe kit. What is undecided is
how the curve is produced:

- **SVG `textPath`** — stays live text, selectable and indexable, but matching
  the design's exact curve takes iteration and it will never be pixel-identical
- **Supplied as artwork** — faithful to the design, but becomes an image of
  words, so the wording only reaches search and screen readers through alt text

`ref/FIN Deliverables/assets/graphics/` does not contain this lockup. The
closest is `HL-MindTheDrip.svg`, which is the hero wordmark.

**Ask:** which approach CVR wants. If artwork, we need the lockup exported as
SVG with transparency.
