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
      /* Background is in globals.css (.regen-prefooter-section): it changes
         composition below 768, and an inline style would need !important to
         override at every breakpoint. The notes on why it is anchored to the
         TOP live there with it. */
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
            className="m-0 uppercase text-center regen-prefooter-title"
            style={{
              fontFamily: "'Ultra', Rockwell, Georgia, serif",
              color: "#F8A014",
              fontSize: "clamp(18px, 2.62vw, 45px)",
              lineHeight: 1.24,
              letterSpacing: "0.01em",
              textWrap: "balance",
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
              textWrap: "balance",
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
              textWrap: "balance",
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
