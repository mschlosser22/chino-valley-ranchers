# Jammy artwork re-export spec

**For:** whoever owns the Jammy illustration source in Figma
**Covers:** QA items 3.1 (differentiator seams) and 3.3 (Playlists character)

Both items were investigated at pixel level — alpha-channel scan plus seam
clustering on the shipped PNGs. Neither is fixable in code without visible
trade-offs. Coordinates below are pixels in each source PNG at its shipped size.

---

## 3.1 Differentiator illustrations — orange seams

**Verdict: needs re-exported artwork.**

**What it is:** anti-aliasing at butt joints. Wherever two filled vector shapes
share an edge without overlapping, the exporter renders a 1–2px row of
semi-transparent pixels between them. On the orange section background those
semi-alpha rows composite with the orange behind, reading as a thin orange seam
*inside* the artwork.

This is a missing-overlap problem, not an export-settings problem — re-exporting
at higher resolution only makes the seam thinner, never removes it.

Measured seam runs (largest first; bbox = x,y to x,y; colours are the fills
either side):

**`illo-texture-base.png`** (780×636)
- (144,32)–(385,141) — dark green `#2F4421` / orange `#F89A1C`
- (277,185)–(471,307) and (392,270)–(459,323) — white / `#2F4421`

**`illo-upgrades-base.png`** (843×636) — worst of the three
- (181,369)–(461,413) — `#2F4421` against the silhouette edge
- (554,415)–(682,501) — joint between two `#2F4421` shapes (same colour, still seams)
- (358,184)–(426,206) — white / `#F89A1C`
- (266,501)–(317,544) — white / `#2F4421`
- (392,446)–(438,447) — `#2F4421` / `#637359`

**`illo-easy-body.png`** (861×636)
- (284,271)–(343,430) — vertical white / `#2F4421`
- (393,182)–(430,297) and (397,113)–(421,138) — vertical white / `#F89A1C`
- (473,470)–(511,483), (519,357)–(559,368) — smaller joints

### Fix, per illustration

1. Where two different-coloured fills meet, extend the *rear* shape 2px under
   its neighbour (or add a 2px inside-aligned stroke matching the rear fill).
   Same-colour adjacent shapes: boolean-union them into one path.
2. Flatten each illustration to a single layer before export, so Figma
   anti-aliases only the outer silhouette.
3. Re-export PNG @2x, transparent background, **same crop bounds** as the
   current files (dimensions above) so no layout changes are needed.

**Code workaround, not recommended:** duplicating the image underneath with a
1px blur/spread fills the seams but visibly fattens the outer silhouette and
doubles decode cost. Stopgap only.

---

## 3.3 Playlists character — cut lines at animated joints

**Verdict: needs re-exported artwork for both joints.** The rest of the layers
are fine, and the floating musical notes are fine as-is (CVR confirmed).

Layer placement in the 480×440 torso frame: legs at y=262, left leg x=50–179,
right leg x=195–343; sax at x=280–433, y=196–335.

### Legs — missing overlap

`pl-leg-left.png`, `pl-leg-right.png` against `playlists-art-torso.png`.

The torso's bottom edge fades out (anti-aliased) at y≈250–256; the leg layers
start at y=262, and torso pixels cover only ~14% of each leg's top 20px strip.
The legs butt against the torso edge with effectively zero overlap, so the
moment the step animation rotates a leg around its top origin, the joint opens
and the background shows through.

**Fix:** re-export each leg with ~24px of extra art at the top — the thigh shape
continuing upward, tucked *behind* the body — and re-export the torso with its
bottom edge fully opaque where the legs plug in (no fade). The legs then move
behind the torso in z-order, which is a one-line change on our side. The pivot
can then swing ±10° with no gap.

### Sax — knocked out of the torso rather than layered over it

The torso is **not** complete behind the sax. Under the sax's bell/hand area
(from torso pixel 360,255 onward) the torso is transparent, and the boundary of
that knockout is anti-aliased — semi-alpha blend pixels such as `#A6AFA1` at
alpha 224 around (320,225). The sax PNG's root edge matches that hole exactly at
rest, so any rotation slides the sax off its hole and exposes the cutout outline.

**Fix:** re-export the torso as a **complete body** — arms and chest painted
through where the sax and hands sit, healing the knockout — and re-export the
sax (with hands attached, as now) as a true overlay layer with ~8px of painted
overlap past the contact line. Same crop bounds and sizes as the current files.

**Fixable in code?** Legs: only by not animating them, or by masking the joint
with a fake shadow ellipse — both visibly wrong. Sax: no. The hole in the torso
is baked into the pixels.

---

## Export checklist

- Same canvas crop and aspect as the current PNGs (dimensions listed above), so
  the CSS percentage positioning keeps working and no layout work is needed
- Transparent background, PNG-24, @2x
- No new anti-aliased butt joints: overlap ≥2px everywhere two fills meet
