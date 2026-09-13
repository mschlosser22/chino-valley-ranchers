import { TornEdge } from './TornEdge';

/* Sections 7 and 8 of the CVR Regen Page design, built together because the
   three "BETTER FOR..." lines sit inside the same white band as the soil
   diagram and share its centre line.

   Neither section existed on the page before.

   Geometry measured off the design render (2075px wide):
     WHAT MAKES          31.1%      Regenerative 45.3%     DIFFERENT? 28.1%
     soil block          51.6%
     callouts at         7.4% / 76.8% / 7.3% / 80.1% from the left
     BETTER lines        28.1%

   The callouts are laid out around the diagram rather than in a grid: the
   design pins each to a corner and points a hand-drawn arrow at the part of
   the soil it describes, so the arrows would lose their meaning in a row of
   equal columns. */
const CALLOUTS = [
  {
    key: "soil",
    title: "Healthy Soil",
    body:
      "We build soil health through cover crops, compost, and rotational grazing—improving water retention, sequestering carbon, and creating a strong foundation for life.",
    side: "left",
    offset: "5.98%",
    width: "20.96%",
    top: "13.02%",
    arrow: { src: "arr-soil", left: "3.57%", top: "44.61%", width: "7.80%" },
  },
  {
    key: "animals",
    title: "Animals & Nature Together",
    body:
      "Our hens play an essential role in a balanced ecosystem—fertilizing the land naturally, controlling pests, and helping plants thrive.",
    side: "right",
    offset: "5.59%",
    width: "18.31%",
    top: "10.98%",
    /* Placed against this callout's own copy rather than the design's raw
       node, at the client's direction: left of the paragraph and centred on
       it. The design's y (28.09%) ran the arrow through "pests, and helping"
       -- its arrow crosses the text NODE but not the ink, since that box is
       247px tall for four short lines, while our copy sets wider and fills
       it. 20.58% centres the arrow on the paragraph's ink (mid 22.92%) and
       71.42% ends it 1.6% clear of the glyphs' left edge. */
    arrow: { src: "arr-animals", left: "71.42%", top: "20.58%", width: "10.91%" },
  },
  {
    key: "roots",
    title: "Living Roots",
    body:
      "Keeping living roots in the ground year-round feeds microorganisms, increases biodiversity, and supports long-term soil vitality.",
    side: "left",
    offset: "5.98%",
    width: "20.49%",
    top: "82.99%",
    arrow: { src: "arr-roots", left: "3.57%", top: "65.89%", width: "7.80%" },
  },
  {
    key: "farming",
    title: "Farming for Tomorrow",
    body:
      "Regenerative farming isn’t just about today—it’s about leaving the land better for future generations and the food they will depend on.",
    side: "right",
    /* 2.96%, not the design's 6.27%: moved ~50px right at the client's
       request so this block clears the soil face and lines up with the
       "Animals" block above it. */
    offset: "2.96%",
    width: "14.74%",
    top: "72.79%",
    arrow: { src: "arr-farming", left: "100.26%", top: "55.98%", width: "6.41%" },
  },
];

const BETTER = [
  { text: "Better for the land.", colour: "#7CA854" },
  { text: "Better for our hens.", colour: "#006088" },
  { text: "Better eggs for you.", colour: "#7CA854" },
];

export function Differences() {
  return (
    <>
      {/* The white band tears up over the burlap above it.

          The whole block -- tear and section together -- is pulled up 11.1vw.
          The burlap section's BOX is 160px taller than its own painted edge at
          1440: its mask's bottom tear runs from row 997 of 1262, so the last
          fifth of the element is transparent by design. That empty tail stacks
          under this section and read as ~200px of dead white above the
          heading. Trimming the burlap's min-height instead ran its tear
          through the ROC mark and the hen, so the tail stays and this block
          sits on top of it.

          Desktop only. The lift is a share of the VIEWPORT while the tail it
          covers is a share of the burlap section's own height, and below
          1100px the two diverge: at 1440 the heading cleared section 6's
          content by 82px, at 768 by 11, and at 390 it overlapped the hen by
          3. The lift is in globals.css so it can be gated at 1100px. */}
      <div className="regen-diff-lift" style={{ position: "relative", zIndex: 2 }}>
      <TornEdge />
      <section className="relative bg-white">
      {/* Top padding is measured to the TEAR, not to the section's top edge:
          with the block lifted, the section box now starts inside the burlap's
          transparent tail, so the visible white above the heading begins where
          the burlap stops painting. 3.3% lands the heading's ink ~40px below
          that tear, which is what the client asked for. */}
      <div className="mx-auto" style={{ maxWidth: 1600, padding: "3.3% 3% 5%" }}>
        <h2 className="m-0 text-center">
          <span
            className="block uppercase"
            style={{
              fontFamily: "'Ultra', Rockwell, Georgia, serif",
              color: "#7CA854",
              fontSize: "clamp(26px, 3.71vw, 64px)",
              lineHeight: 1.05,
            }}
          >
            What makes
          </span>{" "}
          <span
            className="block"
            style={{
              fontFamily: "nexa-rust-script-shad-2, cursive",
              color: "#006088",
              fontSize: "clamp(50px, 8.95vw, 155px)",
              lineHeight: 1,
              marginTop: "-0.1em",
            }}
          >
            Regenerative
          </span>{" "}
          <span
            className="block uppercase"
            style={{
              fontFamily: "'Ultra', Rockwell, Georgia, serif",
              color: "#7CA854",
              fontSize: "clamp(26px, 3.71vw, 64px)",
              lineHeight: 1.05,
              marginTop: "-0.05em",
            }}
          >
            Different?
          </span>
        </h2>

        {/* The intro sits ON the diagram's sky, not above it. In the design
            the artwork (Farm-minified 1) starts at y5671 while this text runs
            y5850..6214 -- the sky begins 179px higher and the paragraph
            overlaps its upper half. It had been in plain flow below a diagram
            that started lower down, so the sky never reached it and the copy
            sat on bare white.

            position/z-index rather than order: the artwork is pulled up
            underneath by a negative margin, so this needs its own stacking
            context to stay on top of it. */}
        <p
          className="mx-auto text-center relative"
          style={{
            fontFamily: "'Lato', system-ui, sans-serif",
            color: "#2B2B2B",
            fontSize: "clamp(13px, 1.28vw, 22px)",
            lineHeight: 1.62,
            maxWidth: "42%",
            margin: "2.5% auto 0",
            zIndex: 1,
          }}
        >
          We go beyond organic. Our Regenerative practices work with nature to
          build healthier soil, support our hens, and create a better future for
          generations to come.
        </p>

        {/* The diagram is pulled up so its sky runs behind the intro copy.

            Width is the design's own artwork node: Farm-minified 1 is 1513 of
            the 2075 artboard = 72.92%. The 54.9% it had been was measured off
            a screenshot and is why the sky read as a small picture below the
            text rather than the ground the section sits on. The asset's aspect
            (1500x1020 = 1.4706) matches that node's 1513x1029 = 1.4704, so it
            is the right artwork at the wrong size.

            The lift is in globals.css so it can be dropped below lg, where the
            callouts stack in flow under the diagram and an overlap would run
            the copy over the soil. */}
        <div className="regen-soil relative">
          <div className="regen-soil__stage">
            <img
              src="/images/regen/soil-block.webp"
              alt="A cross-section of pasture showing hens above ground and deep roots, worms and soil life below"
              className="regen-soil__art"
            />

            {/* The arrows are positioned against the DIAGRAM, not against their
                callout. The design draws them as four independent vectors over
                the artwork (Shape 4 copy 5-8) and their whole job is to point at
                a part of the soil, so their anchor has to be the thing they
                point at. Nested in the callouts they were percentages of a box
                whose width changed with the copy -- when the diagram went from
                54.9% to its design 72.92% every one of them came adrift. */}
            {CALLOUTS.map((c) => (
              <img
                key={c.key}
                src={`/images/regen/${c.arrow.src}.png`}
                alt=""
                aria-hidden="true"
                className="regen-callout__arrow"
                style={{
                  left: c.arrow.left,
                  top: c.arrow.top,
                  width: c.arrow.width,
                }}
              />
            ))}
          </div>

          {/* Callouts pinned to the four corners. Hidden below lg, where
              they stack under the diagram instead; their arrows live with the
              artwork above, since that is what they point at. */}
          {CALLOUTS.map((c) => (
            /* One set of callouts, not two. They used to be rendered twice --
               absolutely positioned for desktop, stacked for narrow viewports
               -- with each copy hidden at the other breakpoint. display:none
               hides them visually but the markup remains, so a screen reader
               announced all four topics twice over.

               Now each is rendered once. `regen-callout` is static in normal
               flow by default and only becomes absolutely positioned at lg,
               where the arrows can point at something. */
            <div
              key={c.key}
              className={`regen-callout regen-callout--${c.side}`}
              /* Placed from the design's own text nodes rather than a flat 2%
                 inset. The design anchors these to the SECTION, outside the
                 artwork's box -- "Our hens play" runs x1579..1959 while the
                 art ends at x1728 -- so they overlap only the sky's soft
                 transparent edge, never the soil. At 2% with the diagram
                 widened to its design 72.92% the right-hand pair sat on the
                 barn and the soil face. */
              style={{ "--x": c.offset, "--w": c.width, "--y": c.top }}
            >
              <h3
                className="m-0"
                style={{
                  fontFamily: "din-condensed, 'Arial Narrow', sans-serif",
                  fontWeight: 700,
                  color: "#006088",
                  fontSize: "clamp(15px, 1.62vw, 28px)",
                  lineHeight: 1.15,
                }}
              >
                {c.title}
              </h3>
              <p
                className="m-0"
                style={{
                  fontFamily: "'Lato', system-ui, sans-serif",
                  color: "#2B2B2B",
                  fontSize: "clamp(12px, 1.16vw, 20px)",
                  lineHeight: 1.5,
                  marginTop: "0.5em",
                }}
              >
                {c.body}
              </p>
            </div>
          ))}

        </div>

        {/* Section 8: three underlined lines, centred under the diagram. */}
        <div className="text-center" style={{ marginTop: "4%" }}>
          {BETTER.map((l) => (
            <p
              key={l.text}
              className="m-0 mx-auto uppercase"
              style={{
                fontFamily: "'Ultra', Rockwell, Georgia, serif",
                color: l.colour,
                fontSize: "clamp(15px, 1.72vw, 30px)",
                lineHeight: 1.1,
                width: "fit-content",
                paddingBottom: "0.28em",
                marginTop: "0.7em",
                borderBottom: `3px solid ${l.colour}`,
              }}
            >
              {l.text}
            </p>
          ))}
        </div>
      </div>
    </section>
    </div>
    </>
  );
}
