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
    <section
      className="relative"
      style={{
        backgroundImage: "url(/images/regen/prefooter-bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "left center",
      }}
    >
      <div
        className="mx-auto grid"
        style={{
          maxWidth: 1700,
          gridTemplateColumns: "46% 54%",
          alignItems: "center",
          minHeight: "clamp(280px, 30vw, 622px)",
        }}
      >
        {/* Left column is the carton, which lives in the background image. */}
        <div aria-hidden="true" />

        <div className="mx-auto" style={{ padding: "4% 3%", maxWidth: "86%" }}>
          <h2
            className="m-0 uppercase text-center"
            style={{
              fontFamily: "'Ultra', Rockwell, Georgia, serif",
              color: "#F0A014",
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
              borderBottom: "2px solid #F0A014",
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
  );
}
