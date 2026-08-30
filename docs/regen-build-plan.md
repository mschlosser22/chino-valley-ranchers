# Regenerative landing page — build plan

Branch: `feature/regenerative-landing-page`
Design: Claude Design project `1903c1fd` ("Landing page mockup from Figma"),
derived from `CVR-Regen-LP-R1-v2-clean.psd` (2075x8469, 207 layers).

## Approach: rebuild with live text

The Claude Design export is **not** buildable as-is. Nearly every section is a
single flattened JPEG with its type baked in, absolutely positioned on a fixed
2075px canvas and scaled with a CSS transform.

Counted against the source PSD:

| | PSD | Design export |
|---|---|---|
| Distinct text elements | 39 | 4 |
| Body-copy elements (<40px) | ~23 | 0 |

Porting that faithfully would mean shipping a page that is effectively one tall
picture: nothing selectable, nothing indexable, no reflow. At the design's
2075px width scaled to a 390px phone, 32px body copy renders at about 6px.

So the export is the **visual reference**. Photos ship as images; every
headline and paragraph is rebuilt as real HTML text with a responsive layout —
the same approach used for the Jammy landing page.

## Reused from the site

`components/Nav` and `components/footer/Footer`, exactly as `/jammy` does. The
design's own header and footer bands are dropped.

## Replaces

The existing `/regenerative` page and its eight stub components under
`components/regenerative/` (131 lines total -- placeholders, not a build).

## Sections

| # | Section | Live text | Artwork |
|---|---|---|---|
| 1 | Hero | "welcome to", "Organic Regenerative Eggs" | farm photo, "Regenerative" script lockup |
| 2 | What is regenerative? | headline, product attributes | carton photo, video still, doodles |
| 3 | Regenerative agriculture | headline, body, CTA | grass/pasture photo, torn paper |
| 4 | The Next Generation | headline, body | hen photo, torn card |
| 5 | Photo row | — | 4 photos + torn overlay |
| 6 | Highest standards | headline, body | ROC badge, hen cutout |
| 7 | What makes it different | headline + 4 cards | illustrated soil cross-section |
| 8 | Pre-footer | 3 claim lines | carton photo |

## Fonts

Both design faces are on Adobe Fonts with web licensing -- verified, no
purchase needed. See `docs/regen-font-request.md`. They go into the existing
kit `gqk7pcv`.

- **Rockwell** (400, 700) -- hero lockup
- **Nexa Rust Script B Shadow 2 / R Shadow 2** -- large script accents
- Ultra, Lato, DIN Condensed -- already loaded

Until the kit is updated, the build falls back to Roboto Slab for Rockwell and
treats the big script words as artwork, so it is not blocked.

## Copy note for the client

The design reads **"compositing"** at y=2511; it should almost certainly be
**"composting"**. Built as-designed for now -- flag before launch.

## Open questions

1. **Video** -- section 2 shows a play button over a still ("Hear Chris talk
   about regenerative"). Which video? The site already embeds YouTube
   elsewhere, so this can reuse that pattern once we have the ID.
2. **CTA destination** -- "PURCHASE OUR ORGANIC REGENERATIVE EGGS" / "Get 'em
   here!". Store locator, or a specific product page?
3. **Nav placement** -- `/regenerative` is currently live but unlinked from the
   nav. Should the rebuilt page be added to the main navigation?
