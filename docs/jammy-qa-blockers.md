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

## ~~BLOCKER 2 — Playlists illustration animation~~ RESOLVED

Not a blocker after all, and it should not have been called one.

The Playlists mascot was four layered PNGs -- torso, two legs, sax -- cut out
of flat artwork. The torso carried a rectangular hole where the sax had been
lifted away: its right edge runs dead straight at x=343 from y=196 to y=220,
which is a scalpel cut, not something drawn. `jammySax` rotated the sax clear
of that hole on every cycle, so the panel red showed through the body.

I had concluded this needed re-drawn artwork because `JammyEgg-jazz.svg` is a
flat single-layer export -- 55 paths, one unnamed group -- so the sax and legs
cannot be animated independently. That much was true. What I missed is that
independent animation was never required: QA asked to "adjust/simplify
animation to avoid any cuts", and the differentiators cards had already solved
exactly this by dropping to one clean vector and keeping only whole-body
motion.

The fix was to do the same here, using `illo-texture.svg` -- the same
illustration, already in the tree, already rendering seamlessly on the
"Smooth, Jammy Texture" card. The walk bob stays (it moves the whole body and
cannot expose a seam) and the notes stay (QA said they are fine). The leg
stride and sax tilt are gone, which is the trade QA asked for.

**Lesson:** I answered "can the parts move independently?" when the question
was "can this animate without showing cuts?". The blocker was real for the
question I asked and imaginary for the one that mattered.

---

## ~~BLOCKER 3 — "What is a Jammy Egg?" on a curve~~ RESOLVED

The lockup was exported from the Figma and is now in
`ref/FIN Deliverables/assets/what is jammy/`. Shipped as artwork.

Worth recording what the SVG textPath attempt got wrong. It was not only the
arc depth: the design sets the whole question on **one deep arc**, and the
approximation had it as two stacked lines each on a shallow curve. The
structure was wrong, not just the curvature -- which is why comparing against
the real export mattered rather than iterating on the approximation.

The wording lives in the img alt, so the heading is still announced by screen
readers and visible to search.

---

## ~~BLOCKER 4 — Format Versatility: the salad photograph~~ NOT A BLOCKER

Resolved the moment it was raised. The salad photo was already in the
deliverables as `Stocksy_txpbd4d3443D1J400_Large_3911040-edit.png`; the client
pointed it out.

Worth recording why it was missed. Reviewing the photography contact sheet I
read that frame as "packed lunchbox" and went looking for a bowl of leaves.
The subject is a lunchbox, and the in-repo copy was even named
`grid-toast.jpg` -- but the box holds mixed leaves, radish, cucumber, carrot
and a jammy egg. It is the salad. I let a container shape and a wrong filename
override what was actually in the picture, and then wrote up an asset request
for a file that was already on disk.

The deliverable is a retouched pass over the same frame -- mean pixel
difference 7.9, identical crop -- which is exactly what QA meant by "the image
used in the salad block has been updated."
