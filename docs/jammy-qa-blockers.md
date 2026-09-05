# Jammy QA — blocked items

Tracked against *CVR Jammy Website – Dev QA* (revised). Everything here is
waiting on someone outside the build. Items are removed from this file as they
unblock.

---

## ~~BLOCKER 1 — Homepage gateway: replacement spoon image~~ RESOLVED

The asset arrived as `ref/FIN Deliverables/assets/new hero/`. The band has been
rebuilt around it.

Worth recording why the earlier measurement was misleading. I compared a fixed
pixel band (y400-500) across two images with different aspect ratios -- the
deployed composite is 1.97:1, the raw photo 1.35:1 -- so the two samples were
not looking at the same part of the picture, and the new photo appeared darker.
Sampling the same *relative* region shows it is lighter, exactly as QA said:
`[170 214 237]` against the deployed `[164 210 235]`.

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
