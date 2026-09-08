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
      {/* Everything in this band is positioned from the Figma node tree
          (file muIeDVJN5mgz3Ep0hualTF, artboard 5:5 = 2075 x 8469), as a
          percentage of the artboard WIDTH so the whole composition scales
          together.

          The stage carries the photo's own aspect ratio -- node 5:9 is
          2376 x 1336 cropped to the 2075 artboard, so the visible band is
          2075 x 1326, or 63.9% of width. Building this with padding instead
          left every element 6-9 points too high and the photo 13.5 points
          too short: padding sizes to content, and the design's vertical
          positions are absolute.

          A percentage `top` resolves against the container's HEIGHT, not
          its width, so every design Y (expressed as a share of the 2075
          artboard width) is multiplied by 2075/1326 = 1.5649 to become a
          top percentage on this stage. Getting that wrong is what left the
          whole lockup sitting high.

          Design Y positions, as % of the 2075 artboard width:
            ribbon      13.8    WELCOME TO  15.5    wordmark  15.9
            sub band    26.2    sub text    26.8    carton    28.5 */}
      <div className="relative w-full" style={{ aspectRatio: "2075 / 1326" }}>
        <img
          src="/images/regen/hero-cattle.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "60% 42%" }}
        />

        <h1 className="m-0">
          {/* The wordmark is artwork, so the accessible name lives here.
              Without it the page has no h1 text at all. */}
          <span className="sr-only">
            Welcome to Regenerative &mdash; organic regenerative eggs
          </span>

          {/* ribbon: node 5:33 -- x 33.2%, y 13.8%, w 28.9% of the artboard */}
          <img
            src="/images/regen/hero-ribbon.svg"
            alt=""
            aria-hidden="true"
            className="absolute"
            style={{ left: "33.2%", top: "21.60%", width: "28.9%" }}
          />

          {/* "WELCOME TO": node 5:35, Rockwell Bold 58.115px on a 2075
              artboard = 2.80% of width, tracking 10px = 0.172em, tilted
              -1.78deg. */}
          <div
            className="absolute flex items-center justify-center"
            style={{ left: "35.6%", top: "24.26%", width: "24.2%", height: "5.63%" }}
          >
            <span
              className="whitespace-nowrap uppercase text-white"
              style={{
                fontFamily: "rockwell, Rockwell, Georgia, serif",
                fontWeight: 700,
                fontSize: "2.80vw",
                letterSpacing: "0.172em",
                lineHeight: 1,
                transform: "rotate(-1.78deg)",
              }}
            >
              Welcome to
            </span>
          </div>

          {/* the wordmark: node 6:2 -- x 15.2%, y 15.9%, w 68.0% */}
          <img
            src="/images/regen/hero-wordmark.webp"
            alt=""
            aria-hidden="true"
            className="absolute"
            style={{ left: "15.2%", top: "24.88%", width: "68.0%" }}
          />

          {/* sub-line band: node 5:34 -- opacity .4, multiply over the photo */}
          <div
            className="absolute"
            style={{
              left: "34.1%",
              top: "41.00%",
              width: "35.8%",
              height: "5.32%",
              background: "#000000",
              opacity: 0.4,
              mixBlendMode: "multiply",
            }}
          />
          {/* sub-line: node 5:38, Rockwell Regular 44.831px = 2.16% of the
              artboard, tracking 2.3642px, scaled 95% horizontally. */}
          <div
            className="absolute flex items-center justify-center"
            style={{ left: "34.8%", top: "41.94%", width: "34.4%", height: "3.44%" }}
          >
            <span
              className="whitespace-nowrap uppercase text-white"
              style={{
                fontFamily: "rockwell, Rockwell, Georgia, serif",
                fontSize: "2.16vw",
                letterSpacing: "0.053em",
                lineHeight: 1,
                transform: "scaleX(0.95)",
              }}
            >
              Organic Regenerative Eggs
            </span>
          </div>
        </h1>

        {/* Three teal hen silhouettes: nodes 5:89, 5:91 and 5:90, at
            x 15.4% / 66.3% / 78.0% and y 45.0% / 46.3% / 45.7%, each about
            10% of the artboard wide. They sit on the paper below the tear,
            so they belong to the stage rather than the band.

            Only the standing hen exists as an asset in the file; the two
            pecking poses are not separate layers, so they are lifted from the
            render by their teal and given rebuilt alpha. They are flat
            single-colour shapes, so nothing is lost. */}
        {[
          { src: "hen-standing", left: "15.4%", top: "70.42%", w: "9.9%" },
          { src: "hen-peck-a", left: "66.3%", top: "72.45%", w: "9.8%" },
          { src: "hen-peck-b", left: "78.0%", top: "71.51%", w: "10.0%" },
        ].map((h) => (
          <img
            key={h.src}
            src={`/images/regen/${h.src}.png`}
            alt=""
            aria-hidden="true"
            className="absolute hidden sm:block"
            style={{ left: h.left, top: h.top, width: h.w, zIndex: 2 }}
          />
        ))}

        {/* carton: node 5:105 -- x 27.0%, y 28.5%, w 49.3% of the artboard.
            It straddles the tear, so it sits on the stage rather than in the
            paper band below, and carries the highest z-index in the band. */}
        <img
          src="/images/regen/carton.webp"
          alt="A carton of Chino Valley Ranchers organic regenerative eggs"
          className="absolute"
          style={{ left: "27.0%", top: "44.60%", width: "49.3%", zIndex: 3 }}
        />
      </div>

      {/* The tear between the photo and the paper below, using the same
          treatment as the rest of the site -- see TornEdge. */}
      <TornEdge tone="paper" fill={{ background: "#EFEAE0" }} />

      {/* Paper ground. The carton and the hens live on the stage above,
          positioned from their node coordinates, so this is just the band
          they sit on. */}
      <div style={{ background: "#EFEAE0", height: "8vw" }} />
    </section>
  );
}
