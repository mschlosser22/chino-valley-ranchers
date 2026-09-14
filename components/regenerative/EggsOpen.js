/* Section 9 of the CVR Regen Page design: the pre-footer.

   Geometry measured off the design render (2075px wide):
     band aspect       3.34
     orange heading    three lines at 41.2% / 40.0% / 23.9% of canvas
     white claims      32.0% and 36.7%, separated by a rule

   The background is the design's own carton photograph with the type removed:
   the right half is rebuilt as a per-row colour ramp taken from the clean
   far-right column, cross-faded into the photo before the lettering starts.
   That keeps the headline as live text rather than baking it into a JPEG,
   which is what the previous version of this component effectively did. */

export function EggsOpen() {
  return (
    <>
      {/* The tear is cut into the PHOTOGRAPH's own alpha, not painted as a
          strip over it -- the same treatment as sections 4-6, which is what
          made those seams read.

          A TornEdge strip could not work here. It masks a box of its own and
          squashes the rip to fit: at the 63px height it rendered, the mask's
          42-of-95-row wander came out ~28px, and against this dark photograph
          on white paper that read as a straight cut. The photo was also a
          JPEG, so it had no alpha to tear with. prefooter-bg.webp is the same
          photograph with the mask's rip profile cut into its top edge at a
          56px depth, soft-edged by 1.5px so it does not alias. */}
      <section
      className="regen-prefooter-section relative"
      style={{
        backgroundImage: "url(/images/regen/prefooter-bg.webp)",
        backgroundSize: "cover",
        // On phones the carton half of the photograph would sit directly
        // under the type; shifting the focal point right puts the type on
        // the darker pasture instead, where it reads.
        //
        // Anchored to the TOP, never centred. Above 2075px the section's
        // min-height clamps at 622 while the width keeps growing, so `cover`
        // scales by width and crops the surplus height -- and `center` takes
        // half of that off the top, which is exactly where the torn edge
        // lives. At 2200 that sheared 19px off the tear and at 2560 some 73px,
        // more than the whole rip, leaving a dead-straight line across the
        // carton. The bottom of this photograph is plain carton and loses
        // nothing to the same crop.
        backgroundPosition: "right top",
      }}
    >
      <div
        className="regen-prefooter-grid mx-auto grid"
        style={{
          maxWidth: 1700,
          alignItems: "center",
          minHeight: "clamp(280px, 30vw, 622px)",
        }}
      >
        {/* Left column is a spacer for the carton, which lives in the
            background image. Hidden once the grid stacks -- an empty cell
            above the type would just push it down. */}
        <div aria-hidden="true" className="hidden md:block" />

        <div className="mx-auto" style={{ padding: "4% 3%", maxWidth: "86%" }}>
          <h2
            className="m-0 uppercase text-center"
            style={{
              fontFamily: "'Ultra', Rockwell, Georgia, serif",
              color: "#F8A014",
              fontSize: "clamp(18px, 2.62vw, 45px)",
              lineHeight: 1.24,
              letterSpacing: "0.01em",
            }}
          >
            Our regenerative eggs are pasture raised on family farms
          </h2>

          <p
            className="m-0 text-center"
            style={{
              fontFamily: "'Lato', system-ui, sans-serif",
              fontWeight: 700,
              color: "#FFFFFF",
              fontSize: "clamp(14px, 1.95vw, 34px)",
              lineHeight: 1.35,
              marginTop: "1.1em",
              paddingBottom: "0.9em",
              borderBottom: "2px solid #F8A014",
            }}
          >
            Sustainable and regenerative farming practices.
          </p>

          <p
            className="m-0 text-center"
            style={{
              fontFamily: "'Lato', system-ui, sans-serif",
              fontWeight: 700,
              color: "#FFFFFF",
              fontSize: "clamp(14px, 1.95vw, 34px)",
              lineHeight: 1.35,
              marginTop: "0.9em",
            }}
          >
            Ethically produced for future generations
          </p>
        </div>
      </div>
    </section>
    </>
  );
}
