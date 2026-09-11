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
    top: "17%",
    arrow: { src: "arr-soil", left: "83%", top: "88%", width: "26%" },
  },
  {
    key: "animals",
    title: "Animals & Nature Together",
    body:
      "Our hens play an essential role in a balanced ecosystem—fertilizing the land naturally, controlling pests, and helping plants thrive.",
    side: "right",
    top: "15%",
    arrow: { src: "arr-animals", left: "-30%", top: "96%", width: "30%" },
  },
  {
    key: "roots",
    title: "Living Roots",
    body:
      "Keeping living roots in the ground year-round feeds microorganisms, increases biodiversity, and supports long-term soil vitality.",
    side: "left",
    top: "64%",
    arrow: { src: "arr-roots", left: "83%", top: "-52%", width: "26%" },
  },
  {
    key: "farming",
    title: "Farming for Tomorrow",
    body:
      "Regenerative farming isn’t just about today—it’s about leaving the land better for future generations and the food they will depend on.",
    side: "right",
    top: "56%",
    arrow: { src: "arr-farming", left: "-26%", top: "-46%", width: "24%" },
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

        {/* Intro sits over the diagram's top edge in the design. */}
        <p
          className="mx-auto text-center"
          style={{
            fontFamily: "'Lato', system-ui, sans-serif",
            color: "#2B2B2B",
            fontSize: "clamp(13px, 1.28vw, 22px)",
            lineHeight: 1.62,
            maxWidth: "42%",
            margin: "2.5% auto 0",
          }}
        >
          We go beyond organic. Our Regenerative practices work with nature to
          build healthier soil, support our hens, and create a better future for
          generations to come.
        </p>

        <div className="relative" style={{ marginTop: "1%" }}>
          <img
            src="/images/regen/soil-block.webp"
            alt="A cross-section of pasture showing hens above ground and deep roots, worms and soil life below"
            className="block mx-auto"
            style={{ width: "54.9%" }}
          />

          {/* Callouts pinned to the four corners, each with its arrow. Hidden
              below lg, where they stack under the diagram instead. */}
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
              className="regen-callout"
              style={{ [c.side]: "2%", top: c.top }}
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
              <img
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
