# Jammy QA checks

One file per item in *CVR Jammy Website – Dev QA* (revised). Each asserts the
behaviour QA asked for, at the breakpoints the item concerns.

| File | Item |
|---|---|
| `jv2.js` | Phase 1+2 regression net (fonts, tile order, SVG illustrations, hero) |
| `item3.js` | Hover states -- no drop shadow, scale only |
| `item5.js` | Hero supporting copy and og:description |
| `item7.js` | "Available now at Trader Joe's." in bold Proxima Nova |
| `item8.js` | Protein callout artwork, size and placement |
| `item9b.js` | "What is a jammy egg?" curved lockup |
| `item10.js` | Differentiators -- no background bleed through the artwork |
| `item11.js` | "every time." underlined |
| `item12.js` | Format Versatility -- tile order and Cubano labels |
| `item13.js` | Product Features on mobile -- two rows, solid block |
| `item14.js` | Differentiators side margins on mobile |
| `item15.js` | Playlists wordmark hidden on mobile |

## Running them

    npm run dev                                    # in another terminal
    PW=/path/to/playwright/node_modules ./run-all.sh

Playwright is not a project dependency: installing it at the root trips a
pre-existing React 18/19 peer conflict via `@react-three/fiber`. It is
installed outside the repo and reached through `NODE_PATH`, which is what `PW`
sets.

## Two things worth knowing before editing these

**Wait for animations.** Several checks read computed styles after a hover or
a scroll reveal. A hover handler plus a 0.25s transition needs roughly 700ms to
settle -- sampling earlier produced a false failure once already.

**Measure ink, not boxes.** For centred text and for SVGs with padded
viewBoxes, `getBoundingClientRect()` on the element reports the full-width box
and tells you nothing about where the artwork actually sits. Use a Range over
the text contents, or the alpha bounding box of a render.
