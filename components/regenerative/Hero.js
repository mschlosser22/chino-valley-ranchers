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
        {/* The headline, built from the Figma node tree rather than
            inferred from a flattened render (file muIeDVJN5mgz3Ep0hualTF,
            frame 5:32 "HEadline", 1428.19 x 388.63 inside a 2075 artboard).

            Three things the render could not tell me and the node data did:

            "Regenerative" is not live type. Node 6:2 is a placed image, which
            is where the texture speckle, the white outline and the shadow
            come from -- none of them reproducible with text-stroke.

            "WELCOME TO" and the sub-line are Rockwell, not Ultra and DIN
            Condensed. Rockwell is in the client's kit.

            The ribbon is a vector with a genuinely irregular outline, not a
            clipped rectangle, and the sub-line's band is opacity 0.4 with
            mix-blend-multiply -- so it darkens the photograph rather than
            laying a flat panel over it.

            Percentages below are each node's width against the 2075 artboard. */}
        <h1
          className="relative mx-auto m-0"
          style={{ width: "68.8%", containerType: "inline-size" }}
        >
          {/* The wordmark is artwork, so the accessible name lives here.
              Without it the page has no h1 text at all. */}
          <span className="sr-only">Welcome to Regenerative — organic regenerative eggs</span>
          {/* ribbon: node 5:33, 42.0% of the frame, offset 26.5% from its left */}
          <img
            src="/images/regen/hero-ribbon.svg"
            alt=""
            aria-hidden="true"
            className="absolute"
            style={{ left: "26.5%", top: "0.5%", width: "42.0%" }}
          />

          {/* "WELCOME TO": node 5:35, Rockwell Bold, rotated -1.78deg */}
          <div
            className="absolute flex items-center justify-center"
            style={{ left: "30.2%", top: "9.5%", width: "35.1%", height: "19.2%" }}
          >
            <span
              className="whitespace-nowrap uppercase text-white"
              style={{
                fontFamily: "rockwell, Rockwell, Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(11px, 2.8cqw, 58px)",
                letterSpacing: "0.17em",
                lineHeight: 1,
                transform: "rotate(-1.78deg)",
              }}
            >
              Welcome to
            </span>
          </div>

          {/* the wordmark itself: node 6:2, 98.8% of the frame */}
          <img
            src="/images/regen/hero-wordmark.webp"
            alt=""
            aria-hidden="true"
            className="relative block"
            style={{ width: "98.8%", marginLeft: "0.6%" }}
          />

          {/* sub-line band: node 5:34, opacity .4 multiply over the photo */}
          <div
            className="absolute"
            style={{
              left: "28.1%",
              top: "66.7%",
              width: "52.0%",
              height: "18.0%",
              background: "#000000",
              opacity: 0.4,
              mixBlendMode: "multiply",
            }}
          />
          {/* sub-line: node 5:38, Rockwell Regular, scaled 95% horizontally */}
          <div
            className="absolute flex items-center justify-center"
            style={{ left: "29.1%", top: "70.2%", width: "50.0%" }}
          >
            <span
              className="whitespace-nowrap uppercase text-white"
              style={{
                fontFamily: "rockwell, Rockwell, Georgia, serif",
                fontSize: "clamp(9px, 2.16cqw, 45px)",
                letterSpacing: "0.053em",
                lineHeight: 1,
                transform: "scaleX(0.95)",
              }}
            >
              Organic Regenerative Eggs
            </span>
          </div>
        </h1>
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
