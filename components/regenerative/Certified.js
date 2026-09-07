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
export function Certified() {
  return (
    <section
      className="relative"
      style={{
        backgroundImage: "url(/images/regen/burlap.jpg)",
        // Tiled, not covered. At `cover` the weave scales up with the
        // viewport and reads as coarse sacking that the body copy has to
        // fight; the design keeps it fine and quiet. A fixed tile width holds
        // the thread at roughly the drawn scale.
        backgroundSize: "620px auto",
        backgroundRepeat: "repeat",
      }}
    >
      <div
        className="relative mx-auto"
        style={{ maxWidth: 1500, padding: "5% 5% 6%" }}
      >
        <h2
          className="m-0 text-center uppercase"
          style={{
            fontFamily: "'Ultra', Rockwell, Georgia, serif",
            color: "#B01010",
            fontSize: "clamp(28px, 4.67vw, 81px)",
            lineHeight: 1.05,
            letterSpacing: "0.01em",
          }}
        >
          Highest Standards
        </h2>

        <div
          className="relative grid"
          style={{
            gridTemplateColumns: "1.05fr 1fr",
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
              alt=""
              aria-hidden="true"
              className="absolute hidden sm:block"
              style={{ left: "-6%", bottom: "6%", width: "27.2%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
