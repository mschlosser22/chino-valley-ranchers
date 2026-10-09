> **Independent spot-check (main session, after the workflow).** 74 findings
> raised, 0 refuted -- unusual enough to check by hand rather than trust. The
> verifiers did engage (15 severities adjusted, problems found in 70 of 74
> proposed fixes). Four headline claims re-measured independently:
>
> - Section 6 hen cut by the burlap tear at 390 -- **confirmed**: hen bottom at
>   98.0% of the section (review said 97.9%); visibly cut through the body.
> - Pre-footer crops the carton out on phones -- **confirmed** visually at 390.
> - "You want more?" annotation clipped at 640-767 -- **confirmed** at 700:
>   `arrow-more.png` spans x 684-736 on a 700px viewport.
> - Photo-row tiles overrun the grid on phones -- **confirmed, 33px**. (This
>   note first said "overstated, 13px": that measurement was taken against the
>   frame IMAGE, which fills the whole section, instead of the photo grid between
>   the frame's rules. Re-measured against the grid it is 33.1px, exactly as
>   reported. 4 of 4 confirmed.)

# Regenerative landing page: mobile-first design review

Repo: `/Users/mikeschlosser/Sites/chino-valley-ranchers`. Live page: `http://localhost:7500/regenerative`. The QA suites are in `scripts/qa/regen/`. Tailwind is 2.2.19, so every fix below uses stock utilities, inline styles or plain CSS in `styles/globals.css`. Arbitrary-value classes (`top-[4rem]`, `text-[26px]`, `min-w-[44px]`, `pt-[40vw]`, `scale-[1.3]`) compile to nothing in this version. Do not use them.

---

## 1. Verdict

**Desktop (1024–1440) is close to the design.**
- Hero geometry, the section 2 heading and frame, the section 3/4 cards, the photo row, the section 6 heading and ROC mark, and the section 7 diagram all land within a few percent of the Figma.
- Most of this is already enforced by the suites at 1440.
- The one real desktop defect is the section 2 play ring. It was placed using artboard and band percentages instead of frame percentages, so it sits 24% of the frame too low and 45% too small. As a result the "Hear Chris" arrow points at the treeline.

**Phones carry each section's content, but not the design's intent or a shared type system.**
- The hero lockup is a vw-scaled miniature: the sub-line is 7.8–9.3px.
- The section 6 hen is cut in half by the burlap tear.
- The photo-row tiles overrun their frame by 33px.
- The pre-footer crops the carton out completely.
- Two heading lockups (sections 3 and 4) lose or reverse their size ranking.
- Across the page, body copy runs 13–16px and gutters run 20/27/71px. Headings are out of order: HIGHEST STANDARDS (20px) is smaller than the BETTER lines (22px), and the section 7 script heading is wider than the hero wordmark.

**Tablet (640–1023) is the weakest range.**
- Several sections stretch the phone layout with uncapped vw, then jump at 768 or 1024. Section 3 body goes 29.9px → 12.1px. Section 7 is 2108px tall at 1023 and 903px at 1024.
- "You want more?" is clipped off-screen at 640–767.
- The section 6 arrow points at the paragraph instead of the ROC mark.

Overall: about 90% of design intent on desktop, about 60% on phones, about 50% on tablet.

---

## 2. Do-not-regress

**Hero**
- Node-accurate lockup at 1440 and 1024 (vertical.js): wordmark at 68.0% width, carton straddling the tear.
- Photo / ribbon / wordmark / band / carton overlap and the real tear mask.
- White sub-line contrast of about 7.2:1 over the multiply band.
- The 768 composition, with all three hens on paper.

**Section 2**
- Four-stroke painted frame, proportionate down to 360.
- Inset still behind the strokes.
- Full-column video below 768 (the sec2test "fills the phone column" rule).
- Live-type annotations at 768 and up, with the 3.6% ink gap to the stroke.
- Annotations hidden below 640 (sec2test).

**Section 3**
- One-block ground: gap 0, flush sides, no stage lift on phones.
- 1440 geometry and type sizes.
- PURCHASE sign as a real `<a href="/products">` with alt text, 179px tall at 390.
- Single arrow.
- Grass carrying through into section 4.

**Section 4 / photo row**
- Comb painting over section 3's grass.
- Torn grass/photo seam.
- One-ground phone block (sec4test passes at 360/390/430).
- Frame/burlap stacking.
- 1.31x heading ratio at 1101 and up.

**Section 6**
- Heading ink 913px against a 914px grid at 1440.
- ROC mark at 27.4% width.
- Arrow tip at +30/+16 at 1440.
- 10% burlap tint.
- Single-element torn burlap mask with no seam lines.
- Hen drawn whole at 768 and up.

**Section 7**
- Desktop arrows and callout placement.
- Arrows hidden below 1024 (sec7test).
- 16px callouts and intro on phones.
- Gutter of at least 16px (currently 20px).
- Centred callouts on narrow screens.
- No overlapping heading lines (sec7layout).
- Heading ink about 40–55px below the burlap tear (sec7gap, window 15–70).

**Pre-footer**
- Alpha tear cut into the photograph.
- z-index 3 stacking and the lift calc (sec8seam passes at every width).
- Straight pre-footer/footer seam.
- Live-text headline and claims.
- Top-anchored background above 2075px.
- Phone contrast: heading at least 7.2:1, claims at least 12.8:1.

**Page-wide**
- No horizontal scroll at any width.
- Brand faces only (Ultra, Nexa Rust, Rockwell; DIN only in nav, footer and sign).
- Every seam reads as a real tear at 360–768.
- No console errors.

---

## 3. Fix plan

Items are ordered mobile first, highest impact first. In each item:
- "Assert" is a check that fails on the current build and passes after the fix.
- Write the assertion first and confirm it fails.
- Every measurement runs after consent dismissal, a full scroll and a settle of at least 1s.

### WI-1 — Section 6 on phones: whole hen, page gutter, peer heading, 16px body
- **Severity:** major
- **Viewports:** 360, 390, 430, 600, 700 (every width at or below 767)
- **Findings:**
  - standards-hen-legs-cut-by-tear-on-phones
  - cross-page-s6-hen-cut-by-seam
  - standards-phone-column-too-narrow
  - cross-page-gutters-inconsistent (s6 part)
  - standards-heading-off-centre-on-small-phones
  - cross-page-display-heading-hierarchy-inverted
  - standards-body-13px-phones-tablet (phone part)
  - cross-page-body-copy-inconsistent (s6 part)
  - standards-phone-vertical-rhythm (adjusted to polish)
  - cross-page-vertical-rhythm-outliers (s6 part)
- **Files:** `components/regenerative/Certified.js`, `styles/globals.css`; `.regen-diff-lift` in globals.css (section 7 phone lift)

**The problem.** The burlap mask's bottom tear always starts at row 998 of 1262 (79% of the section height). Below 768 the hen is the last item in the stack, so it always lands in the torn-away bottom 21%. Today 24–33% of the hen is lost, including the legs and feet.

**The change.**
- In `Certified.js`:
  - Append `regen-standards-inner` to the inner div. Keep `relative mx-auto`.
  - Give the `<p>` `className="m-0 regen-standards-copy"`.
- In `globals.css`, add `@media (max-width:767px)`. The `!important` flags are required: the padding, gap and margins are inline styles, and inline `gap` beats any non-`!important` `row-gap`.
  ```css
  .regen-standards-inner { padding: 9% 7% calc(28vw + 32px) !important; }
  .regen-burlap h2 { font-size: max(26px, 4.70vw) !important; white-space: normal !important; text-align: center; }
  .regen-standards-copy { font-size: 16px !important; line-height: 1.55 !important; }
  .regen-standards-grid { margin-top: 16px !important; grid-template-columns: 56% 1fr !important;
    column-gap: 4% !important; row-gap: 20px !important; align-items: end !important; }
  .regen-standards-grid > div:first-child { display: contents; }
  .regen-standards-grid > div:first-child > p { grid-column: 1 / -1; }
  .regen-burlap img[src*="roc-logo"] { width: 100% !important; margin-top: 0 !important; }
  .regen-burlap img[src*="hen-standing"] { width: 100% !important; margin-left: 0 !important; }
  ```
- **What this does.**
  - The ROC mark and the hen now sit side by side, as in the Figma, instead of stacked.
  - The heading joins WHAT IS REGENERATIVE? in one 26px slab tier and wraps to two lines, centred.
  - Gutters become 7%, which matches sections 2, 3, 4 and 8.
- **Re-solve the bottom padding.** The prototype started from `28vw+20px`. Treat `calc(28vw + 32px)` as a starting point and re-solve it after the heading and body changes, which make the stack taller. Do not use the stacked-layout `46vw`: at that value the hen's feet land exactly on the tear.
- **Re-tune the section 7 lift.** Adjust the phone `.regen-diff-lift` value (currently `calc(-11.08vw - 61px)`) until sec7gap sits at about 40–55px. This is required, not optional.

**Assert** (new section 6 phone block in sec6test, at 360/390/430/600/700):
- Hen bottom ≤ section top + 0.78 × section height. Today it is at 97.9%.
- Heading ink centre is within ±3px of the viewport centre. Today it is +21px at 360.
- The h2 font size is at least the BETTER line size (22px). Today it is 20px.
- The `.regen-standards-copy` font size is at least 16px. Today it is 13px.
- The h2 is at least 12px from the paragraph (ink to box).

**Suites:**
- Re-run sec7gap at 360/390/430. It must stay within 15–70.
- Re-run containment.js and tornaudit.js.
- Update the sec7gap and containment comments that accept "the tear crops the hen".

### WI-2 — Photo row: tiles fill the frame on phones
- **Severity:** major
- **Viewports:** 360, 390, 430 (regression-guard 768, 1440, 2400)
- **Findings:**
  - nextgen-photorow-row-tiles-overrun-grid
  - nextgen-photorow-closeup-white-notch
- **Files:** `components/regenerative/ImageGrid.js`, `scripts/qa/regen/sec5test.js`

**The change.**
- Set `const BAND = "100%"`.
- Add `gridTemplateRows: "minmax(0, 1fr)"` to the outer `.grid`. This is mandatory. With `100%` alone, the implicit auto row grows to the images' intrinsic height, and the tiles then overrun by 44px at 768 and 83px at 1440.
- In the SHOT helper, give each window `backgroundColor: '#6b5a3a'` so any shortfall reads as shadow, not white.

**Assert** (sec5test, at 360/390/768/1440):
- Every tile's top ≥ grid top − 1 and bottom ≤ grid bottom + 1. Today the overrun at 390 is 33px.
- At 360, the close-up's rendered background height (box width × 4.4726 × 734/1306) is at least the box height. Today it is 128.7 against 150.

**Suites:** extend sec5test as above. The existing "photos sit inside the bottom rule" check measures the grid, which is why this slipped through.

### WI-3 — Play control: design position, thumb size, legible glyph
- **Severity:** major
- **Viewports:** all
- **Findings:**
  - what-is-play-ring-wrong-coordinates
  - what-is-play-button-tiny-on-phones
  - cross-page-play-button-tap-target
- **Files:** `components/regenerative/WhatIs.js`, `scripts/qa/regen/sec2test.js`

**The change** (`<button>` style):
- Set `left:'46.17%'`, `top:'40.97%'`, `width:'14.71%'`. This is the Layer 77 box in frame terms, and it also becomes the hit box.
- Make the button border transparent.
- Draw the visible ring as a child span: `position:absolute`, `inset:'4.8%'`, `borderRadius:'9999px'`, `border:'max(2px, 0.6cqw) solid #fff'`, `background:'rgba(255,255,255,0.16)'`. This is the Ellipse 5 size.
- Replace the CSS-border triangle span with:
  ```jsx
  <svg viewBox="0 0 10 12" style={{width:'34%',marginLeft:'8%'}} aria-hidden="true">
    <path d="M0 0L10 6L0 12z" fill="#F8A014"/>
  </svg>
  ```
- Fix the code comment that says the old values are frame percentages.
- Resulting hit box: 45.5, 49.3, 54.4 and 60.6px at 360, 390, 430 and 768. The cross-page `::before` 48px hit-area patch is therefore unnecessary.

**Assert:**
- The button is at least 44 × 44 at 360. Today it is 24.9px.
- At 1440, the arrow-hear tip (rect left/bottom) is within 10% of the frame width of the ring box. Today it is 33px above and 45px right.
- The ring centre is 53 ± 2% down the frame. Today it is 65.2%.
- The ring border is at least 2px at 390. Today it is 1px.

**Suites:**
- In the same change, update sec2test "play ring at design position" (47.90/58.55 → 46.17/40.97) and "design size" (8.05 → 14.71). Today the suite enforces the column mix-up.
- "Annotation clear of the play ring" still passes.

**Note:** the button is still inert. See WI-3b and Q2.

### WI-3b — Wire the video, click-to-load (blocked on the client)
- **Severity:** major
- **Viewports:** all
- **Finding:** what-is-play-button-inert
- **File:** `components/regenerative/WhatIs.js`

**The change, once a URL arrives:**
- Add `const [playing,setPlaying]=useState(false)` and an `onClick` on the button.
- When `playing`, render an `<iframe>` (youtube-nocookie `?autoplay=1`, or Vimeo with `dnt=1`) absolutely positioned at the still's inset: 1.23% left, 1.58% top, 97.62% wide, 96.28% tall, at zIndex 1 under the strokes.
- Make no third-party request before the click. This is consistent with the consent remediation work.
- Interim: see Q2. Do not remove the `<button>`, because sec2test "play control is a real button" would fail.

**Assert:** at 390, clicking the button produces exactly one iframe inside `[data-regen-video-wrap]`, and no request to youtube or vimeo is made before the click.

### WI-4 — Hero lockup legible on phones
- **Severity:** major
- **Viewports:** 360, 390, 430, 480–639
- **Findings:**
  - hero-phone-lockup-type-illegible
  - cross-page-hero-lockup-illegible (superseded variant)
- **Files:** `components/regenerative/Hero.js`, `styles/globals.css`, `scripts/qa/regen/sec1test.js`

**The change.**
- Give the `<h1>` `className="m-0 regen-hero-lockup"` and the carton `<img>` `regen-hero-carton`.
- In `globals.css`:
  ```css
  @media (max-width:479px){ .regen-hero-lockup{position:absolute;inset:0;transform:scale(1.3);transform-origin:49.2% 28%} .regen-hero-carton{top:60%!important} }
  @media (min-width:480px) and (max-width:639px){ .regen-hero-lockup{position:absolute;inset:0;transform:scale(1.15);transform-origin:49.2% 28%} .regen-hero-carton{top:57%!important} }
  ```
- Keep the scale in CSS. Do not use `scale-[1.3]`.
- **Result:**
  - The sub-line is 10.1/11.0/12.1px at 360/390/430.
  - WELCOME TO is 13.1–15.7px.
  - The wordmark spans x18–336 at 360.
  - The carton stays inside the section.
- Check the 480 and 640 steps by eye: the wordmark goes 88% → 78% → 68%.

**Assert** (sec1test): the sub-line's rendered size (font-size × scale) is at least 10px at 360 (today 7.8px), and the carton bottom is at or above the section bottom.

**Suites:** add the assertion above to sec1test. vertical.js is 1440-only and unaffected.

### WI-5 — Pre-footer on phones: show the carton, type below it
- **Severity:** major
- **Viewports:** 360, 390, 430
- **Finding:** prefooter-carton-absent-on-phones
- **Files:** `components/regenerative/EggsOpen.js`, `styles/globals.css`, `scripts/qa/regen/sec8seam.js`

**The change.**
- Move EggsOpen's inline `backgroundImage/Size/Position` into globals.css. That avoids an `!important` war.
- Below 768:
  ```css
  .regen-prefooter-section { background:
      linear-gradient(to bottom, rgba(28,29,21,0) 0, rgba(28,29,21,0) 52vw, #1C1D15 66vw, #1C1D15 100%),
      url(/images/regen/prefooter-bg.webp) left top / 223vw auto no-repeat;
    margin-top: -6.02vw; }
  .regen-prefooter-grid > div:last-child { padding-top: 69vw !important; }
  ```
- **Why these values:**
  - At 223vw, asset x0–930 (the carton) fills the width exactly.
  - Use 69vw, not 60vw, so the type starts on solid `#1C1D15` and not in the ramp.
  - Use the gradient layer, not `background-color`, so the transparent tear rows stay transparent.
- Keep `right top` / `left top` behaviour at 768 and up unchanged.

**Assert** (390):
- Computed background-position-x is 0% and the rendered image width is at least 2.2 × viewport.
- The h2 ink top is at least section top + 66vw. Today the type sits at the top.
- Sampled pixels in the top 40vw contain the carton: at least 20% of samples with R−B > 40. Today it is 0%, an olive/black ramp.

**Suites:** update sec8seam's expected wander for this regime to `56/2075 × rendered image width`. The current `56/622 × height` formula is wrong here, although it may marginally still pass. See Q10, because this reverses the documented `right top` decision.

### WI-6 — Pre-footer headline leads the BETTER lines; claims at body size; balanced wraps
- **Severity:** major
- **Viewports:** 360, 390, 430, 768
- **Findings:**
  - prefooter-heading-smaller-than-better-lines
  - prefooter-360-claim-orphan
  - cross-page-body-copy-inconsistent (claims part)
- **Files:** `components/regenerative/EggsOpen.js`, `styles/globals.css`

**The change.**
- Give the h2 `className="m-0 uppercase text-center regen-prefooter-title"` and `textWrap:'balance'`. Add `textWrap:'balance'` to both claim `<p>`s.
- In `globals.css`:
  ```css
  @media (max-width:1023px){ .regen-prefooter-title{font-size:26px!important;letter-spacing:.03em!important} }
  @media (max-width:767px){ .regen-prefooter-title{font-size:clamp(24px,6.8vw,29px)!important}
    .regen-prefooter-grid > div:last-child{max-width:100%!important;padding-left:20px!important;padding-right:20px!important}
    .regen-prefooter-section p{font-size:clamp(16px,4.4vw,18px)!important} }
  ```

**Assert:**
- The h2 font size divided by the last `.regen-diff-better p` font size is at least 1.15 at 360/390/430/768. Today it is 0.82 at 390.
- At 360/430, each claim's last line and the h2's last line are at least 40% of the widest line. Today "practices." is 60/233 and "FARMS" is 77.8/337.

**Suites:** sec9test's three-line check is 1440-only and unaffected.

### WI-7 — Section 4 on phones: show the hen, restore the heading ranking
- **Severity:** major
- **Viewports:** 360, 390, 430
- **Findings:**
  - nextgen-photorow-nextgen-photo-buried-on-phones
  - nextgen-photorow-nextgen-heading-hierarchy-inverted-phones
  - nextgen-photorow-nextgen-body-14px-at-360 (polish)
  - cross-page-s3-s4-type-breakpoint-jump (s4 part)
  - nextgen-photorow-nextgen-orphan-last-word (polish)
- **Files:** `styles/globals.css`, `scripts/qa/regen/sec4test.js`

**The change** (`@media (max-width:767px)`):
```css
.regen-next-stage { padding: 40vw 7% 10%; }
.regen-next-stage h2 span:first-child { font-size: clamp(22px, 6.2vw, 30px) !important; }
.regen-next-stage h2 span:last-child  { font-size: clamp(43px, 12vw, 58px) !important; }
.regen-next-stage p { font-size: clamp(15px, 3.9vw, 17px) !important; line-height: 1.55; }
```
- Also add `.regen-next-stage p { text-wrap: pretty; }` with no media query.
- Leave hens-next `object-position` alone.
- The caps keep the 1.94 size ratio and stop growth at 640–767, where the body is 29.9px today.

**Assert:**
- The Generation/THE NEXT ink ratio is 1.31 ± 0.08 at 360/390/430. Today it is 0.79.
- Photo visible above the card is at least 35vw. Today it is 31px.
- Body is 15–17px at 360 and 767. Today it is 14.04 and 29.9.
- The paragraph's last line is more than 80px. Today it is "system." at about 50px.

**Suites:**
- Extend the sec4test headRatio check to widths below 768.
- Re-run "photo leaves no gap at the bottom" at 360–767 now that the section is taller.

### WI-8 — Section 3 on phones: lockup, carton on the CTA, arrow into the sign
- **Severity:** major
- **Viewports:** 360, 390, 430 (640–767 for the caps)
- **Findings:**
  - agriculture-mobile-lockup-hierarchy-lost
  - agriculture-mobile-carton-detached-from-cta
  - agriculture-mobile-getem-arrow-misses-sign (polish)
  - cross-page-carton-repeat-phones (polish)
  - cross-page-s3-s4-type-breakpoint-jump (s3 part)
  - cross-page-vertical-rhythm-outliers (s3 script line-height)
- **File:** `styles/globals.css` (existing `max-width:767px` section 3 block; edit rules in place rather than adding same-specificity duplicates)

**The change.**
- Type:
  - Script: `.regen-agri-stage h2 span:first-child { font-size: clamp(47px, 13.3vw, 61px) !important; line-height: 1 !important; }`
  - Ultra: `span:last-child { font-size: clamp(26px, 7.4vw, 34px) !important; }`
  - Body: `.regen-agri-stage p { font-size: clamp(15px, 3.9vw, 17px) !important; line-height: 1.55; }`
- Order:
  - `.regen-agri-stage { display:flex; flex-direction:column; padding-top:10% }`
  - Set `order` to 1/2/3/4/5 for h2, p, `img[src*=carton]`, `a[href="/products"]`, `img[src*=ann-getem]`.
  - Leave the Content.js DOM order alone.
- Carton rule (edit in place): `width:44%; margin:8% auto -9%; position:relative; z-index:4; pointer-events:none`.
- Getem rule (edit in place): `margin:-9% 4% 0 auto; align-self:flex-end; z-index:4; pointer-events:none`.
- `pointer-events:none` stops the images stealing taps from the PURCHASE link. Re-measure the carton/sign overlap at 44%. It was verified at 62%, about 10px.

**Assert** (360/390/430):
- Script/Ultra ink-width ratio is 0.96 ± 0.08. Today it is 0.59.
- Carton bottom > sign top, so they overlap. Today they are 332px apart.
- Getem annotation top < sign bottom. Today there is a 10px gap.
- `elementFromPoint` at the sign's top-centre and lower-right inset 8px returns the `/products` link or a descendant.
- Body font size is at most 17px at 767. Today it is 29.9.

**Suites:** containment.js heading-clash check; sec3test oneBlock/flush and stageAbove.

### WI-9 — Section 3 at 768–1100: no 12px body
- **Severity:** major
- **Viewports:** 768–899 (floor through 1100)
- **Findings:**
  - agriculture-tablet-body-12px
  - cross-page-s3-s4-type-breakpoint-jump (tablet part)
- **Files:** `styles/globals.css`, `scripts/qa/regen/sec3test.js`

**The change.**
```css
@media (min-width:768px) and (max-width:1100px){ .regen-agri-stage p{font-size:max(1.574cqw,14px)!important} }
@media (min-width:768px) and (max-width:899px){ .regen-agri-stage p{line-height:1.42!important;width:46%!important;top:55.6%!important} }
```
- Use a 14px floor, not 15px. 15px pushes the copy past the card's torn bottom at 768.
- Scope the width, line-height and top overrides to 899px so 1024–1100 keeps the artboard proportions.

**Assert:**
- At 768, body font size is at least 14px. Today it is 12.1.
- Text bottom is at least 8px above the card bottom.
- Ink right edge is less than the sign's left edge.

**Suites:** add 768 to sec3test's widths, so its 13px check covers this width.

### WI-10 — Section 7 heading: capped, continuous at 1024, below the hero wordmark
- **Severity:** major
- **Viewports:** 390, 430, 768–1023
- **Findings:**
  - cross-page-s7-heading-scale-jump
  - differences-tablet-heading-oversized (superseded variant)
- **File:** `styles/globals.css` (`@media (max-width:1023px)`)

**The change.**
- Lines 1 and 3: `.regen-diff-wrap h2 span:nth-child(1), span:nth-child(3) { font-size: clamp(26px, 6.6vw, 38px) !important; }`
- Script line: `span:nth-child(2) { font-size: clamp(46px, 11.5vw, 92px) !important; }`
- Keep the margins and line-heights.

**Assert:**
- At 1023 the script is at most 92px. Today it is 153.5.
- The script size changes by at most 2px between 1023 and 1024.
- At 390 the section 7 script ink width is less than the hero wordmark width. Today they are 296 and 265.

**Suites:** re-run sec7gap and sec7layout at 390 and 768. The heading top does not move, but everything below it does.

### WI-11 — Section 7 below 1024: compact tablet grid, short measure, spacing
- **Severity:** major
- **Viewports:** 360–1023
- **Findings:**
  - differences-tablet-layout-cliff
  - differences-tablet-measure-too-long
  - cross-page-s7-line-length-tablet
  - differences-better-lines-glued
  - prefooter-768-seam-gap-oversized
  - differences-sky-gap-above-art
  - cross-page-vertical-rhythm-outliers (BETTER part)
- **Files:** `styles/globals.css`, `scripts/qa/regen/sec7layout.js`

**The change.**
- Tablet grid:
  ```css
  @media (min-width:600px) and (max-width:1023px){
    .regen-soil{display:grid;grid-template-columns:1fr 1fr;column-gap:40px}
    .regen-soil__stage{grid-column:1/-1;width:88%!important}
    .regen-callout{margin-top:32px}
  }
  ```
- In `max-width:1023px`:
  - `.regen-diff-wrap > p { max-width:36em!important; margin-left:auto!important; margin-right:auto!important; text-wrap:balance }`
  - `.regen-callout { margin-top: clamp(28px,6vw,44px) }` below 600.
  - `.regen-diff-better { margin-top:44px!important }`
  - `.regen-diff-wrap` padding-bottom `12%` → `clamp(44px,6%,60px)`.
  - `.regen-soil{margin-top:calc(24px - 7%)!important}` below 600 only. Re-derive the value for 600–1023, where the stage is 88% wide.
- Check 600px by eye: the columns are about 260px, about 30 characters per line.

**Assert:**
- Section height at 1023 is at most 1.7 × section height at 1024. Today it is 2.33×.
- Intro and callout characters per line are between 35 and 75 at 768 and 1023. Today they are 82 and 135.
- At 390, the gap from the last callout to BETTER is greater than the gap between callouts. Today it is 16 against 35.
- At 768, the gap from the BETTER underline to the pre-footer tear is at most 45px. Today it is 68.

**Suites:**
- Rewrite sec7layout "running text has a usable measure" (`introW > 0.7×innerW`) as a 35–75 characters-per-line range. Do not tune 34em to clear the old threshold.
- "Stacks in flow", "fills the column" (stage 83%) and the gutter check still pass.
- Re-run sec8seam at 390 and 768.

### WI-12 — Section 4 tablet (768–1036): heading ratio and balanced card
- **Severity:** major
- **Viewports:** 768–1100
- **Findings:**
  - nextgen-photorow-nextgen-tablet-ratio-fails-suite
  - nextgen-photorow-nextgen-tablet-card-top-heavy
- **Files:** `styles/globals.css`, `scripts/qa/regen/sec4test.js`

**The change.**
- Narrow the existing block to `@media (min-width:768px) and (max-width:1036px)`.
- THE NEXT: `max(3.047cqw,24px)` → `max(2.65cqw,20px)`.
- Add:
  ```css
  .regen-next-stage h2 span, .regen-next-stage img[src*="hen-divider"],
  .regen-next-stage span[aria-hidden], .regen-next-stage p { margin-top: calc((100cqw - 768px) * 0.17); }
  ```
- `.regen-next-stage p { top: 61% }`.

**Assert:**
- The ink ratio is 1.31 ± 0.08 at 768 and 1024. Today it is 1.12 and 1.14.
- At 1024, the bottom inset is at most 1.5 × the top inset. Today it is 119.4 against 17.7.
- The divider bottom is at least 3px above the paragraph ink at 768–1036. Today it is −0.1 to 0.2.

**Suites:** add 768 and 1024 to sec4test's widths. "Content clears the card edges" still passes at 768 (12.5 against 7).

### WI-13 — Section 6 tablet: arrow tracks the ROC mark; body floor without clipping
- **Severity:** major
- **Viewports:** 768–1100
- **Findings:**
  - standards-annotation-points-at-copy-on-tablet
  - standards-body-13px-phones-tablet (tablet part)
  - cross-page-body-copy-inconsistent (s6 tablet floor)
- **Files:** `components/regenerative/Certified.js`, `styles/globals.css`, `scripts/qa/regen/sec6test.js`

**The change.**
- Wrap the ROC `<img>` in `<div className="relative" style={{width:'89.1%',marginTop:'9%'}}>`. Set the img to `width:100%` with no margin.
- Move ann-certified into that wrapper with `className="absolute hidden md:block"` and `style={{left:'100%',top:'31.6%',width:'43%'}}`. These values reproduce 1440 exactly.
- Body: `@media (min-width:768px) and (max-width:1023px){ .regen-standards-copy{font-size:15px!important} }`. Leave section 7 out of any shared floor rule: it would pull the s7 intro down from 16 to 15.
- Raise the `.regen-burlap` `min-height` floor (currently 64vw / 58vw) across all of 768–1023 until the mark and annotation clear the tear. Start at about 70vw. The 900 range clipped "Certified™" in the 16px trial.

**Assert:**
- Using sec6test's tip model, the tip offset is within ±14px of (+30, +16) at 768/820/900/1024/1440. Today 768 is (+16, −59).
- In a sweep from 768 to 1100 in steps of 16, the bottom of the ROC mark and the annotation are at most 0.785H.

**Suites:** add 768 and 900 to sec6test's tip check.

### WI-14 — Section 2 at 640–1023: no clipped annotation, no video cliff
- **Severity:** major (clipping) / minor (step)
- **Viewports:** 640–1023
- **Findings:**
  - what-is-want-more-clipped-640-767
  - what-is-tablet-video-step
- **Files:** `components/regenerative/WhatIs.js`, `styles/globals.css`, `scripts/qa/regen/sec2test.js`

**The change.**
- On the "You want more?" div and the arrow-more img, change `hidden sm:block` → `hidden md:block`.
- `@media (min-width:768px) and (max-width:1023px){ .regen-video{width:calc(502px + (100vw - 768px) * 0.1855)} }`. This is a linear ramp from about 502px at 768 to 549.5px at 1024, so there is no step at either end.
- Leave 1024 and up unchanged.

**Assert:**
- At 640 and 700, "You want more?" is either `display:none` or its right edge is inside the viewport. Today 73% is clipped.
- In a sweep from 760 to 1030, the frame width never drops by more than 2% between adjacent widths. Today it drops 38% at 768.
- At 768/900/1023, the "You want more?" right edge is less than innerWidth − 8.

### WI-15 — Hero photo starts below the opaque phone nav
- **Severity:** minor
- **Viewports:** 360–1023
- **Finding:** hero-phone-nav-hides-cattle
- **Files:** `components/regenerative/Hero.js`, `styles/globals.css`

**The change.**
- Add `regen-hero-photo` to the hero-cattle `<img>`.
- `@media (max-width:1023px){ .regen-hero-photo{top:4rem;height:calc(100% - 4rem)} }`, with a comment tying 1023 to Nav.js `lg:bg-opacity-80`.

**Assert:** at 390, the photo's top is at least 64px (the nav bottom). Today it is 0. Lockup positions are unchanged within 1px. Re-check WI-4 together with this item.

### WI-16 — Phone paper blocks: divider rules (and torn edges, pending Q5)
- **Severity:** minor
- **Viewports:** 360, 390, 430
- **Findings:**
  - nextgen-photorow-nextgen-divider-rules-dropped
  - agriculture-mobile-flat-ground-loses-torn-paper
  - nextgen-photorow-nextgen-flat-box-not-torn-card (adjusted to minor)
  - cross-page-stacked-cards-lose-torn-edge
- **File:** `styles/globals.css`

**The change.**
- Divider (do now). The hen-divider img gets:
  ```css
  background: linear-gradient(#2B2B2B,#2B2B2B) 20% 50%/25% 2px no-repeat,
              linear-gradient(#2B2B2B,#2B2B2B) 80% 50%/25% 2px no-repeat, #F4F2EE;
  ```
  Keep `#F4F2EE`, not `transparent`, unless the card treatment changes.
- Torn edges (after Q5). Apply to sections 3 and 4 together:
  - Add `h2::before` and `p::after` with `content:""; position:absolute; left:0; right:0; height:14px; background:#F4F2EE; mask:url(/images/regen/edge-white-top.png) 0 0/100% 100% no-repeat; pointer-events:none`.
  - Use `top:-13px` and `bottom:-13px` respectively, with `scaleY(-1)` on the bottom one. Verify the mask's orientation by eye: the reviewer's `tear-grass.png` variant was inverted.
  - Land this after WI-8, so the h2 tear does not paint over the carton.

**Assert:**
- At 390 there are two 2px rules at 15–40% and 60–85% of the divider width. Today there are 0.
- If edges ship: the row of pixels 6px above the h2 top contains at least 20% `#F4F2EE` samples with irregular extent.

**Suites:**
- sec4test sameGround is still meaningful as long as the colour stays `#F4F2EE`.
- tornaudit.js counts divs only.
- sec3test stageAbove must stay at or below 1.

### WI-17 — Hero 1px photo seam at 1440
- **Severity:** minor
- **Viewport:** 1440
- **Finding:** hero-1440-photo-seam-line
- **File:** `components/regenerative/Hero.js`

**The change:** on the paper run-out `<div>` (the section's last child), add `position:"relative", zIndex:1`.

**Assert:** at 1440 DPR1 and DPR2, the row at `floor(stageBottom)` has fewer than 5% dark samples (luminance < 150). Today it is 93–96%.

### WI-18 — Section 7 callouts: Ultra titles, fit at 1024–1100
- **Severity:** minor
- **Viewports:** all (face); 1024–1100 (fit)
- **Findings:**
  - cross-page-callout-titles-wrong-face
  - differences-1024-soil-copy-on-hen
  - differences-1024-farming-narrow-column (polish)
- **Files:** `components/regenerative/Differences.js`, `styles/globals.css`

**The change.**
- h3 inline style: `fontFamily:"'Ultra', Rockwell, Georgia, serif"`, `fontWeight:400`, `fontSize:'clamp(15px,1.54vw,27px)'`. Only go below 1.54vw if Ultra's width forces it.
- Narrow rule: h3 `18px`, `letter-spacing:.02em`, `line-height:1.2`.
- In the 1024–1330 block, lower the h3 floor to `max(1.54vw,17px)`.
- Add a key class: `regen-callout--${c.key}`.
- In 1024–1330:
  - `.regen-callout--soil{left:2.6%!important;width:19.5%!important}`
  - `.regen-callout--farming{width:17%!important;right:2.5%!important}`
- Put U+2060 between "today" and "—", not after the dash. Drop `hyphens:manual`, which is already the browser default.

**Assert:**
- All four h3s compute to Ultra. Today they are din-condensed.
- At 1024/1100, the share of Healthy Soil body glyph samples on opaque non-sky art is 0%. Today it is 1.1%.
- No Farming line starts with "—".

**Suites:** re-run sec7layout "arrow clears its own text" and "does not sit on the soil" at 1024/1100/1440, because Ultra sets wider than DIN. Add a body-ink check next to the existing heading check.

### WI-19 — Content clears the fixed nav on focus and anchor scroll
- **Severity:** minor
- **Viewports:** all
- **Finding:** cross-page-nav-obscures-focus-and-anchors
- **File:** `styles/globals.css`

**The change:** `html { scroll-padding-top: 80px; }`.

**Assert:** after `h2.scrollIntoView()` on each of the six h2s at 390, every top is at least 64px. Today they are all 0.

### WI-20 — Pre-footer craft: tablet cross-fade, tear haze, desktop column
- **Severity:** minor / polish
- **Viewports:** 768–900; all; 1024 and up
- **Findings:**
  - prefooter-768-heading-over-crossfade (polish)
  - prefooter-tear-grey-haze-on-ramp
  - prefooter-desktop-copy-block-offset-and-claims-measure
- **Files:** `styles/globals.css`, `components/regenerative/EggsOpen.js`, `public/images/regen/prefooter-bg.webp`

**The change.**
- Cross-fade. Either restrict to `@media (min-width:768px) and (max-width:900px){ .regen-prefooter-section{background-position:-6vw top} }`, or nudge the type column right by a few percent. Do not apply −6vw across 768–1023: above about 933px it leaves an unpainted strip on the right.
- Haze. Regenerate the webp so that for x ≥ 930, rows 30–95 lerp from rgb(6,7,9) to the row-100 ramp colour. Keep the 2075×622 size and the alpha byte-for-byte.
- Desktop column, at **1024 and up only** (at 768 the column would land in the cross-fade):
  - `grid-template-columns:38% 62%`.
  - Column `maxWidth:'75%'`.
  - Claims: `clamp(14px,2.31vw,40px)`, `letter-spacing:.02em`, `maxWidth:'77%'`.
  - h2: `letter-spacing:.05em`.

**Assert:**
- At 768 the worst background pixel behind heading line 1 gives at least 6:1. Today it is 4.5:1.
- Asset rows 40–80 at x1500 have luminance below 30. Today row 40 is 92/96/104.
- At 1440, the h2 ink centre is 992 ± 15px. Today it is 1051.

**Suites:** sec9test three-line and 3.34-aspect checks at 1440; sec8seam.

### WI-21 — Polish and delivery batch
Each item is independent:
- **hero-dead-arbitrary-bg-class / cross-page-hero-bg-arbitrary-class.** In Hero.js, replace `bg-[#006088]` with `style={{backgroundColor:'#006088'}}`. Assert: the section's computed background is not transparent.
- **hero-photo-no-responsive-source.** Add a `hero-cattle-1200.jpg`, plus `srcSet`, `sizes="100vw"` and lowercase `fetchpriority="high"`. Assert: at 390 DPR3 the downloaded file is at most 1200w.
- **hero-carton-upscaled-on-retina.** Re-export carton.webp from the 1023×550 source only. The 1344×683 asset is a different crop, ratio 1.968. Re-check the 35.2% label derivation and vertical.js. Assert: natural width is 1023.
- **what-is-hidden-arrows-downloaded.** Add `loading="lazy"` to both arrow imgs. Assert: no arrow-*.png request at 390. Re-run sec2test "annotation artwork loads".
- **nextgen-photorow-row-stacked-windows-repeat** (minor, after WI-2). Put SHOT on the stacked column container at y about **61%** (not 56%), and remove the window backgrounds. At 1440, check that the 1.36fr gap row is covered by the frame's split. Update sec5test "one photograph" to read the window or its parent. Assert: the upper and lower windows share 0 image rows at 390.
- **cross-page-photo-row-top-seam-flat** (low confidence). Add a TornEdge in a `.regen-row-tear` wrapper (CSS display toggle, not `md:hidden`) below 768. Check it clears the section 4 card, and re-run seams.js and tornaudit.js.
- **prefooter-seams-table-misassigns-band-8.** Change sections.py band 8 to `(7039.0, 7686.0, '8  PRE FOOTER')` and regenerate the geometry doc. Record the real pre-footer delta as about **−4%** (430–432 against 449), not +4.9%. Audit the other bands for the same overlap.
- **standards-desktop-body-under-design-size** (gated). Only together with a section-height increase: `clamp(16px,1.54vw,26px)/1.53/.02em`, with sec6test, sec7gap and ROC tear clearance re-run at 1000–1440.
- **what-is-phone-loses-video-cue** (optional after WI-3). See Q13.
- **cross-page-footer-nav-tap-targets.**
  - Footer links: `inline-block py-3`, `<li>` `pb-1`.
  - Social links: `p-1.5`.
  - Hamburger: `p-2.5`.
  - These are shared components, so check every page. See Q11.

---

## 4. Open design questions

None of these have a phone frame in the Figma, so each needs a client or designer decision.

1. **Hero hens on phones** (hero-phone-hens-dropped, uncertain).
   - (a) Keep all three hidden, as today and as sec1test enforces.
   - (b) Bring back hen-standing and hen-peck-b, with hen-peck-a still hidden. Clearance is only about 3px to the carton and 6–9px above "WHAT IS". This needs a 13vw run-out and re-measuring with WI-4.
2. **Video before a URL exists.**
   - (a) Keep a visible play control in a disabled state with "Video coming soon" (suite-safe).
   - (b) Show a non-interactive still and update sec2test deliberately.
   - (c) Hold launch for the URL.
   - Also: which host (YouTube no-cookie or Vimeo `dnt`)?
3. **"We're certified!" on phones** (standards-bring-annotation-back-on-phones, uncertain).
   - (a) Keep it hidden below 768.
   - (b) Bring it back beside the hen, pointing at the mark. This has not been prototyped and needs a duplicate element once WI-13 moves it into the logo wrapper.
4. **Section 7 diagram link on phones** (differences-mobile-diagram-lost, adjusted to minor). This would add a new brand element.
   - (a) Keep the picture followed by four captions, as today.
   - (b) Numbered teal markers on the art plus matching numbers on the callouts, hidden at 1024 and up. Mocked at about 34px per block.
   - (c) Badges inline with the titles, which cost no extra height.
5. **Section 3/4 phone copy blocks.**
   - (a) Flat `#F4F2EE` rectangles, as today.
   - (b) Torn top and bottom edges via pseudo-elements on both sections (WI-16).
   - (c) The full card-next and card-agri artwork stretched behind the block. Prototyped for section 4, stretch 0.26/0.49.
   - Whichever is chosen must apply to both sections.
6. **BETTER underlines.**
   - (a) Three rules, as built and as sec7test enforces.
   - (b) Two equal rules under lines 1 and 2, as in the Figma, with sec7test updated.
7. **Photo-row height on phones.**
   - (a) Keep the 150px floor (documented in sec5test).
   - (b) Make it proportional (`38.5vw`, `min-height:0`, after WI-2), so every phone gets one aspect ratio.
8. **Pre-footer copy.**
   - (a) Sentence case, as built.
   - (b) Title Case, as in the Figma ("Sustainable And Regenerative Farming Practices.").
9. **Phone slab-heading tier.**
   - (a) One 26px tier for WHAT IS REGENERATIVE?, HIGHEST STANDARDS and WHAT MAKES. This is what WI-1 and WI-10 assume.
   - (b) A larger tier at about 7.6vw (30px at 390) for both section 2 and section 6 (what-is-phone-heading-undersized). Raising section 2 alone is not recommended.
10. **Pre-footer phone composition** (WI-5). This reverses the documented `right top` crop.
    - (a) Stack the carton above the type (recommended).
    - (b) Keep the type-only band.
11. **Shared footer and nav tap targets.**
    - (a) Fix them in this engagement, with a site-wide visual check.
    - (b) Defer to a site-wide pass.
12. **Section 7 gutter.**
    - (a) Keep 20px (protected today).
    - (b) Use `max(20px, 7%)` to match the page's 7% column (27px at 390, 54px at 768).
13. **Section 2 phone caption.**
    - (a) No caption once the ring is thumb-sized (WI-3).
    - (b) A teal "Hear Chris talk about regenerative" line under the still. This is not in the design; the rotate and teal treatment are invented.

---

## 5. Rejected findings

Verification refuted none of the findings, so none are rejected.

Several proposed fixes were superseded or corrected during synthesis:
- **cross-page-hero-lockup-illegible:** its `scale(1.22)` only reaches 9.5px. Superseded by WI-4's `scale(1.3)` on the h1.
- **differences-tablet-heading-oversized:** its `min(7.6vw,40px)/min(15vw,96px)` leaves the phone script wider than the hero wordmark. Superseded by WI-10.
- **standards-heading-off-centre-on-small-phones:** its `6.4vw nowrap` depends on a 20px gutter and overflows a 7% column. Superseded by the wrapping 26px tier in WI-1.
- **standards-hen-legs-cut-by-tear-on-phones:** its stacked `46vw` bottom padding puts the feet exactly on the tear. Superseded by the side-by-side layout in WI-1.
- **cross-page-play-button-tap-target:** its `::before` 48px hit area is unnecessary once WI-3 sizes the ring.
- **differences-tablet-measure-too-long:** its intro `34em` was tuned to clear sec7layout's threshold. Replaced by a 36em cap plus a characters-per-line check.
- **cross-page-s3-s4-type-breakpoint-jump:** its section 3 tablet floor of 15px overflows the card at 768. WI-9 uses a 14px floor with scoped overrides.
- **cross-page-body-copy-inconsistent:** its 768–1250 floor would pull the section 7 intro down to 15px. Section 7 is excluded.
- **prefooter-tear-grey-haze-on-ramp / prefooter-768-heading-over-crossfade:** the `-6vw` background shift across 768–1023 exposes an unpainted strip above about 933px. WI-20 restricts it to 900.