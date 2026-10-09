# Regenerative landing page — design review brief

Branch: `review/regenerative-design-pass`, cut from `feature/regenerative-v2` @ `782c129`.
Baseline tag: `regenerative-v2-baseline-20261008` (immutable, pushed).

The page is close to the Figma on desktop. The gap is mobile. This brief
records what was measured, so a review starts from evidence rather than
re-deriving it.

## How to reproduce

    npm run dev                      # port 7500
    open http://localhost:7500/regenerative

Evidence captured at `/tmp/regen-review/` (not committed — 4.3MB of JPEGs):
full-page shots at 390/768/1440, per-section crops, and seven true-phone
viewport frames at 390x844.

## What is already correct

- No horizontal scroll at any of 390, 430, 768, 1024, 1440, 1920.
- No clipped headings anywhere. An early read of the per-section crops
  suggested the headline was cut off at the top; that was the screenshot
  cropping at the section boundary, not a page defect. Verified by walking
  each heading's ink box against every clipping ancestor — zero hits at all
  three widths. Do not "fix" this.
- The desktop treatment of section 6 is the strongest thing on the page and
  should not regress: four callouts positioned around the soil-block cutaway
  with curved arrows pointing into it.

## The main mobile finding — section 6

On desktop, section 6 is a spatial diagram: `soil-block.webp` in the centre,
four callouts around it, four curved arrows (`arr-soil`, `arr-animals`,
`arr-roots`, `arr-farming`) pointing from each callout into the relevant part
of the artwork.

On mobile every arrow is `display: none`, and the four callouts collapse into
a plain vertical list of heading + paragraph under the image. The copy
survives; the diagram does not. Nothing points at anything, so the
relationship between each claim and the soil cutaway is lost.

This is the single biggest desktop/mobile divergence on the page, and it is
the thing to look at first.

Section 6 is also disproportionately tall on phones: 1284px at 390 against
150–849px for its neighbours — roughly a quarter of the page's 5184px.

## Other images hidden on mobile

All `display: none` at 390 — deliberate, not the Tailwind-2 zero-size trap:

| asset | section | note |
|---|---|---|
| `card-agri.png` | 2 | the framed card behind the copy |
| `card-next.png` | 3 | same treatment |
| `burst.png` | 2 | `hidden sm:block` |
| `ann-certified.png` | 5 | `hidden sm:block` |
| `arr-*.png` (x4) | 6 | the callout arrows |

Worth a judgement call against the Figma: the two `card-*` images carry the
cream panel the copy sits on at desktop. Hiding them is a defensible mobile
simplification, but if the Figma's mobile frames keep them, they should come
back.

## Section heights by viewport

    width   section heights (px)                                  page
    390     291, 320, 849, 444, 150, 518, 1284, 280               5184
    430     314, 347, 936, 489, 150, 556, 1350, 280               5464
    768     511, 396, 467, 504, 211, 492, 1749, 280               5667
    1024    660, 528, 623, 673, 281, 594,  903, 307               5020
    1440    903, 743, 876, 946, 396, 835, 1266, 432               6683
    1920   1183, 837,1168,1261, 527,1114, 1464, 576               8306

Section 4 holds at exactly 150px across both 390 and 430 — a fixed height
that does not respond to width. Worth checking it is intentional.

Section 6 at 768 (1749px) is taller than at either 390 or 1024, which
suggests the tablet breakpoint is landing between two layouts rather than in
one of them.

## Known-unfinished, carried over from the build

- Sections 7 and 8 heights were never reconciled against the `.fig` geometry
  decode. Flagged during the original build, never resolved.
- There are **no QA suites** for this page. `scripts/qa/regen/` holds only the
  raw Figma decode artifacts (`doc.bin`, `schema.json`) — no assertions. All
  85 commits of the rebuild are unguarded. The Jammy page has 25 suites for
  comparison.

## Ground rules for any change here

Carried from the Jammy work on this repo, because they cost real time to
learn:

1. **Tailwind is 2.2.19 — no arbitrary values.** `h-[400px]`, `min-h-[400px]`
   and friends compile to nothing and silently resolve to `0px`. This shipped
   a real bug on the Jammy hero. Verify in-browser, never by reading config.
2. **Measure rendered pixels, not computed styles.** Contrast against a
   photograph, ink position of centred text, and anything behind an overlay
   all have to be read off a screenshot.
3. **Every fix ships with an assertion that was verified to FAIL on the
   defect first.** A check that passes both states is worse than no check —
   this has happened repeatedly on this repo and is the main source of
   wasted review cycles.
4. **Run mobile and desktop.** Two separate Jammy defects were correct at
   1440 and wrong at 768. A single-width check would have called both done.
