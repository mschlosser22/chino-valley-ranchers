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

          The stage is the photo band alone: from the bottom of the design's
          nav bar (y73) to where the paper begins (y1018, measured left and
          right of the carton where nothing occludes it). That is 945px, or
          45.6% of artboard width.

          Two corrections got here. Running the stage to the photo node's full
          1326 put the tear 10 points too low and left the carton and hens
          floating on grass rather than straddling the paper edge. Then the
          design's nav is part of its artboard while ours is a separate
          element, so each node Y also loses that 73px offset before being
          converted. Building this with padding instead
          left every element 6-9 points too high and the photo 13.5 points
          too short: padding sizes to content, and the design's vertical
          positions are absolute.

          A percentage `top` resolves against the container's HEIGHT, not
          its width, so every design Y (expressed as a share of the 2075
          artboard width) is multiplied by 2075/945 = 2.1958 to become a
          top percentage on this stage. Getting that wrong is what left the
          whole lockup sitting high.

          Design Y positions, as % of the 2075 artboard width:
            ribbon      13.8    WELCOME TO  15.5    wordmark  15.9
            sub band    26.2    sub text    26.8    carton    28.5 */}
      {/* The nav is fixed and translucent, so it sits OVER this band rather
          than above it -- that is how the rest of the site treats heroes.

          The design accounts for the same thing: its artboard includes a 73px
          nav bar and the ribbon starts 215px below it, so the gap the eye
          sees is 215px of the 945px band, 22.75%.

          So the outer box is the band plus the nav's height, and an inner
          box inset by that height is what every node positions against.
          Padding alone does not work: absolutely-positioned children resolve
          against their ancestor's PADDING box, so they ignored it entirely.

          Without this the nav ate 64px of the gap and the lockup read as
          crowded -- the measurement said 22.58% and still looked wrong,
          because it was measuring into the strip the nav covers. */}
      <div
        className="relative w-full"
        style={{ height: "calc(100vw * 945 / 2075 + 4rem)" }}
      >
        {/* The photograph fills the whole box, nav strip included -- the
            translucent bar is meant to sit over it. */}
        <img
          src="/images/regen/hero-cattle.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "60% 42%" }}
        />

        {/* Everything from here down positions against the band below the
            nav, which is the band the design drew. */}
        <div className="absolute inset-x-0 bottom-0" style={{ top: "4rem" }}>

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
            style={{ left: "33.2%", top: "22.58%", width: "28.9%" }}
          />

          {/* "WELCOME TO": node 5:35, Rockwell Bold 58.115px on a 2075
              artboard = 2.80% of width, tracking 10px = 0.172em, tilted
              -1.78deg. */}
          <div
            className="absolute flex items-center justify-center"
            style={{ left: "35.6%", top: "26.31%", width: "24.2%", height: "7.90%" }}
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
            style={{ left: "15.2%", top: "27.19%", width: "68.0%" }}
          />

          {/* sub-line band: node 5:34 -- opacity .4, multiply over the photo */}
          <div
            className="absolute"
            style={{
              left: "34.1%",
              top: "49.80%",
              width: "35.8%",
              height: "7.47%",
              background: "#000000",
              opacity: 0.4,
              mixBlendMode: "multiply",
            }}
          />
          {/* sub-line: node 5:38, Rockwell Regular 44.831px = 2.16% of the
              artboard, tracking 2.3642px, scaled 95% horizontally. */}
          <div
            className="absolute flex items-center justify-center"
            style={{ left: "34.8%", top: "51.12%", width: "34.4%", height: "4.83%" }}
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
        </div>
      </div>

      {/* The carton and hens overhang the tear, so they cannot live inside
          the stage: raising the stage to clear the paper would raise the
          photo with it and hide the tear entirely.

          They sit in their own zero-height overlay instead, pinned to the top
          of the band and given the stage's aspect ratio so their percentages
          still resolve against the same box. Only these two elements paint
          above the tear and the paper. */}
      <div
        className="relative w-full"
        style={{ height: 0, zIndex: 4, pointerEvents: "none" }}
      >
        {/* Same band as the stage: the aspect box sits above this overlay's
            baseline, so its percentages match the ones inside the stage. */}
        <div
          className="absolute w-full"
          style={{ aspectRatio: "2075 / 945", bottom: 0 }}
        >
          {/* Three teal hen silhouettes at x 15.4% / 66.3% / 78.1% of the
              artboard, each about 10% wide.

              Their tops are pushed 10.6 points below the design's own figures
              (91.4 / 94.6 / 96.4% of the band). In the design the hens stand
              on paper with the tear above them; here the tear ends at 100% of
              the band, so at the design values it cut straight through their
              bodies. Shifting all three by the same amount keeps the spacing
              between them and puts their feet on the paper, which is what the
              design actually shows.

              Shortening the band to raise the tear instead was tried and
              reverted -- it moved the hens past the section entirely.

              Only the standing hen exists as an asset in the file; the two
              pecking poses are not separate layers, so they are lifted from
              the render by their teal and given rebuilt alpha. They are flat
              single-colour shapes, so nothing is lost. */}
          {[
            { src: "hen-standing", left: "15.4%", top: "102.00%", w: "9.9%" },
            { src: "hen-peck-a", left: "66.3%", top: "105.23%", w: "9.8%" },
            { src: "hen-peck-b", left: "78.1%", top: "107.03%", w: "10.0%" },
          ].map((h) => (
            <img
              key={h.src}
              src={`/images/regen/${h.src}.png`}
              alt=""
              aria-hidden="true"
              className="absolute hidden sm:block"
              style={{ left: h.left, top: h.top, width: h.w }}
            />
          ))}

          {/* carton: derived from its navy label, which is the one feature
              that can be located unambiguously in both the design and the
              asset. The label spans 35.2% of the carton's width and sits
              361px wide in the design, so the package is 1025px = 49.4% of
              the artboard, with its top at 53.9% of the band.

              Reading the corner off a scaled crop instead put it at 76.25%,
              which ran the carton 135px past the section and into the
              heading below. Measuring a feature present in both images is
              reliable in a way that eyeballing a crop is not. */}
          <img
            src="/images/regen/carton.webp"
            alt="A carton of Chino Valley Ranchers organic regenerative eggs"
            className="absolute"
            style={{ left: "27.9%", top: "53.9%", width: "49.4%" }}
          />
        </div>
      </div>

      {/* The tear between the photo and the paper below, using the same
          treatment as the rest of the site -- see TornEdge.

          The stage above carries a higher z-index than this and the paper
          band: the carton and hens overhang the stage's bottom edge on
          purpose, and without that the paper painted over their lower half. */}
      <TornEdge
        tone="paper"
        fill={{
          background: "#E9E5DE",
        backgroundImage: "url(/images/regen/paper-texture.png)",
        backgroundSize: "12.34vw 12.34vw",
        backgroundRepeat: "repeat",
        }}
      />

      {/* Paper run-out. The carton and hens are positioned on the stage
          above and overhang its bottom edge, so this band only has to be
          deep enough to carry them: the carton ends at 55.0% of artboard
          width and the hens at 55.8%, against a tear at 49.8%. 6.3% of width
          clears both and takes the paper to where section 2's heading
          begins. */}
      <div
        style={{
          // Deep enough to hold everything that overhangs the band: the
          // carton to 112.3% and the hens, once lowered clear of the tear,
          // to about 130%. Sized from the measured overflow rather than
          // guessed -- at 8.2vw the hens ran 65px past the section.
          height: "12.8vw",
          background: "#E9E5DE",
        backgroundImage: "url(/images/regen/paper-texture.png)",
        backgroundSize: "12.34vw 12.34vw",
        backgroundRepeat: "repeat",
        }}
      />
    </section>
  );
}
