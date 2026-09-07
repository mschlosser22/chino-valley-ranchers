/* Section 4 of the CVR Regen Page design: "THE NEXT Generation" on a torn
   card, with the hen cut-out overlapping it from the left.

   Geometry measured off the design render (2075px wide):
     torn card    52.5% wide, left edge at 36.9%
     THE NEXT     20.9% of canvas
     Generation   28.0% of canvas
     hen divider   4.1% of canvas

   Colours sampled from the render: teal #005A82, orange #F0A014.

   The hen is a real cut-out: the .fig ships the photograph and its mask as
   separate layers, so the two are composited rather than the shape being
   approximated. */
export function ImageFull() {
  return (
    <section className="relative overflow-hidden">
      <img
        src="/images/regen/pasture.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div
        className="relative mx-auto"
        style={{ maxWidth: 1600, padding: "5% 4% 5%" }}
      >
        <div className="relative flex justify-end">
          {/* Torn card, right-aligned as in the design. */}
          <div
            className="relative"
            style={{
              width: "57%",
              backgroundImage: "url(/images/regen/card-torn.png)",
              backgroundSize: "100% 100%",
              padding: "4.5% 5% 5%",
            }}
          >
            <h2 className="m-0 text-center">
              <span
                className="block uppercase"
                style={{
                  fontFamily: "din-condensed, 'Arial Narrow', sans-serif",
                  fontWeight: 700,
                  color: "#005A82",
                  fontSize: "clamp(30px, 6.25vw, 108px)",
                  letterSpacing: "0.02em",
                  lineHeight: 1,
                }}
              >
                The Next
              </span>
              <span
                className="block"
                style={{
                  fontFamily: "nexa-rust-script-shad-2, cursive",
                  color: "#F0A014",
                  fontSize: "clamp(34px, 6.39vw, 111px)",
                  lineHeight: 1,
                  marginTop: "-0.14em",
                }}
              >
                Generation
              </span>
            </h2>

            {/* Rule + hen + rule, as drawn. The rules are borders on the
                flex children so they always meet the hen exactly. */}
            <div
              className="flex items-center justify-center"
              style={{ gap: "3%", margin: "3% 0 4%" }}
            >
              <span
                className="block"
                style={{ flex: 1, height: 2, background: "#2B2B2B", maxWidth: "28%" }}
              />
              <img
                src="/images/regen/hen-divider.png"
                alt=""
                aria-hidden="true"
                style={{ width: "7.5%" }}
              />
              <span
                className="block"
                style={{ flex: 1, height: 2, background: "#2B2B2B", maxWidth: "28%" }}
              />
            </div>

            <p
              className="m-0 text-center"
              style={{
                fontFamily: "'Lato', system-ui, sans-serif",
                color: "#2B2B2B",
                fontSize: "clamp(14px, 1.42vw, 25px)",
                lineHeight: 1.6,
              }}
            >
              We believe regenerative agriculture is one of many promising
              approaches shaping the future of farming. By working in harmony
              with the land and incorporating thoughtful farming practices, it
              offers another opportunity to support the well-being of our birds
              while contributing to a healthier agricultural system.
            </p>
          </div>

          {/* Hen cut-out, overlapping the card's left edge. Absolute so it can
              overhang without pushing the card around. */}
          <img
            src="/images/regen/hen-large.png"
            alt=""
            aria-hidden="true"
            className="absolute"
            style={{ left: "2%", bottom: "-5%", width: "46%", zIndex: 1 }}
          />
        </div>
      </div>
    </section>
  );
}
