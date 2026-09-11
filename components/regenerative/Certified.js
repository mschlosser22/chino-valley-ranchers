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
        marginTop: "-6.93vw",
        /* Above the photo row's frame, whose bottom rule is at z-index 2 and
           was showing through the burlap as a hard horizontal line. The burlap
           tears over that rule in the design, so it has to paint after it. */
        zIndex: 3,
        backgroundImage: "url(/images/regen/burlap.jpg)",
        // Tiled, not covered. At `cover` the weave scales up with the
        // viewport and reads as coarse sacking that the body copy has to
        // fight; the design keeps it fine and quiet. A fixed tile width holds
        // the thread at roughly the drawn scale.
        backgroundSize: "620px auto",
        backgroundRepeat: "repeat",
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
        style={{ maxWidth: 1500, padding: "9% 5% 6%" }}
      >
        <h2
          className="m-0 text-center uppercase"
          style={{
            fontFamily: "'Ultra', Rockwell, Georgia, serif",
            color: "#B01014",
            fontSize: "clamp(28px, 4.67vw, 81px)",
            lineHeight: 1.05,
            letterSpacing: "0.01em",
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
              style={{ width: "57.9%", marginTop: "9%" }}
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
              style={{ left: "-6%", bottom: "6%", width: "27.2%" }}
            />
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
