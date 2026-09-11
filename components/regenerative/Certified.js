/* Section 6 of the CVR Regen Page design: "HIGHEST STANDARDS" on burlap, with
   the Regenerative Organic Certified mark, the "We're certified!" annotation
   and a hen cut-out.

   Geometry measured off the design render (2075px wide):
     heading      63.0% of canvas
     ROC logo     25.9% of canvas
     annotation   11.6% of canvas

   This component previously passed `backgroundImage` as a prop on a <div>,
   which React rejects as an unknown DOM attribute -- it was the last console
   warning on the page. The burlap is a real background here. */
import { TornEdge } from './TornEdge';

export function Certified() {
  return (
    <>
      {/* The design does NOT tile a texture and lay a TornEdge over it. Its
          burlap is "Bg shape" -- a single 2340x1262 image whose alpha carries
          both tears, top and bottom -- with the weave masked through it. One
          shape, one pair of edges.

          Building it as texture + TornEdge is what produced the extra lines at
          this seam: the strip and the section tiled the weave from their own
          origins, and the strip's own bottom met the section's top, so every
          arrangement left a join somewhere. Masking the section itself removes
          the join entirely, because there is only one element. */}
      <section
      className="relative regen-burlap"
      /* Pulled up by the shape's top tear so the rip falls over the photo row
         rather than below it. */
      style={{
        /* The mask is stretched to the section's own height, so its tear falls
           6.8% (86 of 1262) down from the section's top -- 52px at 1440. That
           alone left the rip sitting just under the photographs with a white
           gap between. -6.93vw (100px at 1440) closes it, with the burlap
           tearing up over the photo row's bottom rule as the design has it. */
        /* The design's band is 1443 of the 2075 artboard, but its lower fifth
           holds the NEXT section's heading ("WHAT MAKES" at 85.79% of the band),
           which this build renders in its own section. Reserving the full
           69.54vw here left 331px of empty burlap -- 33% of the section against
           the design's ~16%. 58vw keeps the burlap tall enough to carry the
           content and its tail without the dead space. */
        minHeight: "58vw",
        marginTop: "-6.93vw",
        /* Above the photo row's frame, whose bottom rule is at z-index 2 and
           was showing through the burlap as a hard horizontal line. The burlap
           tears over that rule in the design, so it has to paint after it. */
        zIndex: 3,
        /* The design does not lay the burlap on at full strength. Its
           "highest standards color bg" is at 10.2% opacity with MULTIPLY blend
           over "Bg shape", a pale cream ground (rgb 239,214,188) -- so the
           weave is a faint tint, not a texture the copy has to fight.
           Simulating that composite gives luminance 214; a full-strength tile
           renders 176, which is why the body copy was unreadable here and fine
           in the Figma.

           Built the same way: the cream is the base layer and the burlap sits
           over it at 10.2%. */
        backgroundColor: "#EFD6BC",
        backgroundImage:
          "linear-gradient(rgba(239,214,188,0.898), rgba(239,214,188,0.898)), " +
          "url(/images/regen/burlap.jpg)",
        // Tiled, not covered. At `cover` the weave scales up with the
        // viewport and reads as coarse sacking that the body copy has to
        // fight. 104.1vw sizes the tile so its thread matches the design's:
        // autocorrelating a row of each render gives 9px for the design at a
        // 1440 viewport against 6px at 69.4vw, so the tile scales by 9/6. I had
        // rejected this figure once on the strength of a screenshot -- a tile
        // wider than the viewport shows only part of one repeat, which reads as
        // blotchy until the type sits on it. The measurement was right.
        backgroundSize: "100% 100%, 104.1vw auto",
        backgroundRepeat: "no-repeat, repeat",
        WebkitMaskImage: "url(/images/regen/burlap-shape.png)",
        maskImage: "url(/images/regen/burlap-shape.png)",
        /* The shape is 2340 wide at x-1 on the 2075 artboard, so it overhangs
           the page by 12.7% on the right. Rendered at 100% its straight right
           edge fell inside the viewport and cut the burlap off. Scaled to
           112.77% and offset left, that edge stays off-screen where the design
           has it. */
        WebkitMaskSize: "112.77% 100%",
        maskSize: "112.77% 100%",
        WebkitMaskPosition: "-0.05% 0",
        maskPosition: "-0.05% 0",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    >
      <div
        className="relative mx-auto"
        /* Extra top padding to clear the photo row's tear, which now overlaps
           this section by 3.76vw so the burlap shows through it. Without it the
           heading sat 72px from the section's top and read as crowding the
           seam. */
        /* 18.27% a side is the design's own margin -- its heading spans
           x379..1694 of the 2075 artboard -- so the heading and the two columns
           below line up on the same edges. */
        style={{ maxWidth: 1500, padding: "9% 18.27% 6%" }}
      >
        <h2
          className="m-0 text-center uppercase"
          style={{
            fontFamily: "'Ultra', Rockwell, Georgia, serif",
            color: "#B01014",
            /* Sized so its INK spans the two columns' full width on one line.
               The design's heading is 1315 of the 2075 artboard -- the same
               63.37% the columns occupy -- and never wraps. 4.67vw wrapped
               because nowrap was not set; with it, 4.70vw lands the ink at
               914px against the grid's 914px. */
            fontSize: "clamp(20px, 4.70vw, 81px)",
            lineHeight: 1.05,
            letterSpacing: "0.01em",
            whiteSpace: "nowrap",
          }}
        >
          Highest Standards
        </h2>

        <div
          className="regen-standards-grid relative grid"
          style={{
            gap: "3%",
            marginTop: "3.5%",
            alignItems: "start",
          }}
        >
          <div>
            <p
              className="m-0"
              style={{
                fontFamily: "'Lato', system-ui, sans-serif",
                color: "#2B2B2B",
                fontSize: "clamp(13px, 1.28vw, 22px)",
                lineHeight: 1.62,
              }}
            >
              As the original trailblazers of organic egg farming, Chino Valley
              Ranchers is proud to be Regenerative Organic Certified, which is a
              revolutionary new certification for food that represents the
              highest standard for organic agriculture in the world.
            </p>

            <img
              src="/images/regen/roc-logo.png"
              alt="Regenerative Organic Certified"
              className="block"
              /* 89.1% of the column. The column narrowed when the two halves
                 were equalised, and a width relative to it has to grow to keep
                 the mark at the design's 569 of the 2075 artboard. */
              style={{ width: "89.1%", marginTop: "9%" }}
            />
          </div>

          {/* The hen and the annotation share the right column. The hen is a
              cut-out from the .fig; the annotation is artwork, since its arrow
              has to keep its exact relationship to the words. */}
          <div className="relative">
            <img
              src="/images/regen/hen-standing-photo.webp"
              alt=""
              aria-hidden="true"
              className="block"
              style={{ width: "72%", marginLeft: "16%" }}
            />
            <img
              src="/images/regen/ann-certified.png"
              alt="We&rsquo;re certified!"
              className="absolute hidden sm:block"
              /* Placed so the arrow's tip points AT the ROC mark. In the
                 design the arrow sits 29px right of the logo and vertically
                 within it (x958..1035 against the logo's x360..929), with the
                 wording below -- the lockup spans x915..1167, y5039..5285, so
                 it overhangs this column's left edge by 18.47% of its width.
                 At left:-6% the tip curved up into empty burlap instead. */
              style={{ left: "-18.47%", top: "52.95%", width: "38.32%" }}
            />
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
