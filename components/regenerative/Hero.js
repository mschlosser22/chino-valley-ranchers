import { TornEdge } from './TornEdge';

/* Section 1 of the CVR Regen Page design.

   Geometry is measured off the design render (2075x8469), not eyeballed:
   the script wordmark spans 68% of the canvas width and is centred, and the
   hero photo runs from under the nav to a torn paper edge whose tear varies
   between y701 and y887 -- so the tear is a real alpha PNG from the .fig
   rather than a CSS approximation, which cannot reproduce an irregular edge.

   The wordmark is live type. nexa-rust-script-shad-2 is in the client's
   Adobe kit gqk7pcv and carries its own offset shadow, so the design's
   lettering needs no artwork. */
export function RegenerativeHero() {
  return (
    <section className="relative overflow-hidden bg-[#006088]">
      {/* Cattle on pasture. object-position keeps the herd in frame as the
          viewport narrows; the design crops them right of centre. */}
      <img
        src="/images/regen/hero-cattle.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "60% 40%" }}
      />

      <div className="relative" style={{ paddingTop: "8%", paddingBottom: "20%" }}>
        <div className="text-center px-6">
          {/* One h1 spanning the whole lockup rather than an h1 around
              "Regenerative" alone with the ribbon as a loose span beside it.
              The page's only h1 read just "Regenerative", which says little
              about the page on its own or in a screen-reader outline. The two
              display styles are spans inside it, so nothing moves. */}
          <h1 className="m-0">
            {/* Teal ribbon. Sized from the design: a little over a third of
                the wordmark's width, sitting behind its ascenders. */}
            <span
              className="inline-block text-white font-ultra uppercase leading-none"
              style={{
                background: "#006088",
                padding: "0.42em 1.15em 0.34em",
                fontSize: "clamp(18px, 2.55vw, 46px)",
                letterSpacing: "0.06em",
                transform: "translateY(0.35em)",
              }}
            >
              Welcome to
            </span>{" "}

            <span
              className="block leading-none"
              style={{
                fontFamily: "nexa-rust-script-shad-2, cursive",
                color: "#F8A014",
                // 68% of canvas width in the design; clamped so it does not
                // outgrow the photo on very wide screens.
                fontSize: "clamp(58px, 13.43vw, 232px)",
              }}
            >
              Regenerative
            </span>
          </h1>

          <p
            className="m-0 text-white uppercase"
            style={{
              fontFamily: "din-condensed, 'Arial Narrow', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(14px, 1.9vw, 34px)",
              letterSpacing: "0.09em",
              marginTop: "-0.35em",
            }}
          >
            Organic Regenerative Eggs
          </p>
        </div>
      </div>

      {/* The tear between the photo and the paper below, using the same
          treatment as the rest of the site -- see TornEdge. */}
      <TornEdge tone="paper" fill={{ background: "#EFEAE0" }} />

      {/* Paper ground. The carton is pulled up out of it so that roughly half
          of it sits above the tear, as drawn -- 54% of its height in the
          design. The lift lives on the carton alone, not on this container:
          moving the container up instead dragged the paper over the tear and
          hid it, which is what made the boundary read as a straight line. */}
      {/* display:flow-root contains the carton's negative margin without
          clipping it. Without containment the margin collapses through this
          container and drags the paper up over the tear, hiding it;
          overflow:hidden contains it too but cuts the carton's top off. */}
      <div
        className="relative"
        style={{ background: "#EFEAE0", zIndex: 2, display: "flow-root" }}
      >
        <div style={{ marginTop: "-15.4%" }}>
          <img
            src="/images/regen/carton.webp"
            alt="A carton of Chino Valley Ranchers organic regenerative eggs"
            className="relative block mx-auto"
            style={{ width: "min(52%, 660px)" }}
          />
        </div>

        {/* Three teal hen silhouettes on the paper. Positions and widths are
            the design's own, measured off the render: 15.4% / 66.3% / 78.0%
            from the left, each about 9.8% of the canvas wide.

            Only the standing hen exists as an asset in the .fig; the two
            pecking poses are not separate layers, so they are lifted from the
            render by their teal (#006088) and given rebuilt alpha. They are
            flat single-colour shapes, so nothing is lost doing it that way.

            Hidden below sm: at phone width they crowd the carton, and the
            design has no mobile frame to follow. */}
        <div className="relative hidden sm:block" style={{ height: 0 }}>
          {[
            { src: "hen-standing", left: "15.4%", w: "9.8%", top: "-7.2em" },
            { src: "hen-peck-a", left: "66.3%", w: "9.7%", top: "-5.6em" },
            { src: "hen-peck-b", left: "78.0%", w: "9.9%", top: "-6.4em" },
          ].map((h) => (
            <img
              key={h.src}
              src={`/images/regen/${h.src}.png`}
              alt=""
              aria-hidden="true"
              className="absolute"
              style={{ left: h.left, width: h.w, top: h.top }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
