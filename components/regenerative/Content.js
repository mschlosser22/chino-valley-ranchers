/* Section 3 of the CVR Regen Page design: "Regenerative AGRICULTURE" on a
   torn white card over a grass field, with the red wood PURCHASE sign and the
   "Get 'em here!" annotation pointing at it.

   Geometry measured off the design render (2075px wide):
     white card   62.7% wide, left edge at 12.7%
     red sign     24.2% wide, left edge at 64.9%, aspect 1.39

   The heading is two faces on two lines, as drawn: Nexa Rust script for
   "Regenerative", DIN Condensed for "AGRICULTURE". */
export function Content() {
  return (
    <section
      className="relative overflow-hidden regen-agri-section"
      /* min-height is the design's own band: 1262 of the 2075 artboard.
         Without it the section collapsed to its content -- 469px against a
         design 876px at 1440 -- which is the vertical compression the geometry
         decode flagged for this section (60% of design). */
      style={{ minHeight: "60.82vw", containerType: "inline-size" }}
    >
      <img
        src="/images/regen/grass.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* The seam with the paper band above is a torn edge, not a straight cut.
          The design has no separate tear layer here: the rip lives in the alpha
          of its full-width plane (Layer 52), whose first opaque row wanders
          between 46 and 83 of 1363. The grass photo itself is not in the .fig
          -- it comes from the client's photography -- so that alpha is
          extracted as a mask and the paper is painted through it, which puts
          the tear over the grass exactly where the design has it. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0"
        style={{
          height: "4.19vw",
          background: "#E9E5DE",
          backgroundImage: "url(/images/regen/paper-texture.png)",
          backgroundSize: "12.34vw 12.34vw",
          WebkitMaskImage: "url(/images/regen/tear-grass.png)",
          maskImage: "url(/images/regen/tear-grass.png)",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Everything below is placed from the design's own coordinates against
          the band (y1787..3049, height 1262 on the 2075 artboard). It had been
          a padded flow layout, which pinned the card to the top of the section
          and sized it to its text -- the design puts it 34% down the band at a
          fixed 64.77% x 54.12%. */}
      <div className="regen-agri-stage" style={{ zIndex: 2 }}>

        {/* The card is the design's own artwork (1344x683, torn alpha edges).
            The previous card-torn.png was 4150x1322 -- a 3.14 aspect stretched
            to fit a 1.97 box, which is why its tears read wrong. */}
        <img
          src="/images/regen/card-agri.png"
          alt=""
          aria-hidden="true"
          className="absolute"
          style={{ left: "12.24%", top: "34.07%", width: "64.77%", zIndex: 0 }}
        />

        {/* Burst behind the carton, then the carton straddling the card edge. */}
        <img
          src="/images/regen/burst.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden sm:block"
          style={{ left: "51.37%", top: "34.23%", width: "8.14%", zIndex: 1 }}
        />
        <img
          src="/images/regen/carton.webp"
          alt=""
          aria-hidden="true"
          className="absolute hidden sm:block"
          style={{ left: "55.81%", top: "35.50%", width: "23.71%", zIndex: 2 }}
        />

        <h2
          className="absolute m-0 regen-agri-copy"
          /* 33.30% is the design's own "Regenerative" box (691 of 2075). At
             40% the h2 ran under the carton -- the text did not, but the box
             did, and a heading covered by artwork is a real hit for anyone
             using a screen reader's element list or a hit test. */
          style={{ left: "16.82%", top: "40.49%", width: "33.30%", zIndex: 3 }}
        >
          <span
            className="block"
            style={{
              fontFamily: "nexa-rust-script-shad-2, cursive",
              color: "#7CA854",
              fontSize: "3.33cqw",
              lineHeight: 1,
            }}
          >
            Regenerative
          </span>
          <span
            className="block uppercase"
            style={{
              fontFamily: "din-condensed, 'Arial Narrow', sans-serif",
              fontWeight: 700,
              color: "#006088",
              fontSize: "3.20cqw",
              letterSpacing: "0.02em",
              lineHeight: 1,
              marginTop: "-0.06em",
            }}
          >
            Agriculture
          </span>
        </h2>

        <p
          className="absolute m-0"
          style={{
            left: "18.70%", top: "56.34%", width: "40.67%", zIndex: 3,
            fontFamily: "'Lato', system-ui, sans-serif",
            color: "#2B2B2B",
            fontSize: "1.16cqw",
            lineHeight: 1.62,
          }}
        >
          is a collection of practices that focus on regenerative soil health
          and the full farm ecosystem. This can include crop rotation,
          compositing, and zero use of persistent chemical pesticides and
          fertilizers. Soil is the bedrock of our food system, and we are
          committed to protecting it for future generations.
        </p>

        {/* Red wood sign. A real link, not a picture of a button -- the artwork
            carries the lettering, so the name comes from the anchor. */}
        <a
          href="/products"
          className="absolute block"
          /* The red board itself is 504x365 (Rounded Rectangle 1 copy 4),
             aspect 1.381, which matches sign-purchase.jpg's 1.387. Layer 21's
             691 width is the GROUP -- board plus annotation -- and using it
             stretched the sign to a 1.89 box. */
          style={{ left: "64.92%", top: "49.92%", width: "24.29%", zIndex: 3 }}
        >
          <img
            src="/images/regen/sign-purchase.jpg"
            alt="Purchase our organic regenerative eggs"
            className="block w-full"
            style={{ boxShadow: "0 10px 26px rgba(0,0,0,0.28)" }}
          />
        </a>

        {/* "Get 'em here!" -- ONE annotation. The design has a single arrow
            here (Shape 4 copy 3); this asset already carries it, so drawing
            the vector separately as well produced the double arrow. */}
        <img
          src="/images/regen/ann-getem.png"
          alt="Get &lsquo;em here!"
          className="absolute hidden sm:block"
          style={{ left: "80.63%", top: "73.69%", width: "9.54%", zIndex: 4 }}
        />
      </div>

    </section>
  );
}
