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
  { text: "Better for the land.", colour: "#7BAE4B" },
  { text: "Better for our hens.", colour: "#00608B" },
  { text: "Better eggs for you.", colour: "#7BAE4B" },
];

export function Differences() {
  return (
    <section className="relative bg-white">
      <div className="mx-auto" style={{ maxWidth: 1600, padding: "4% 3% 5%" }}>
        <h2 className="m-0 text-center">
          <span
            className="block uppercase"
            style={{
              fontFamily: "'Ultra', Rockwell, Georgia, serif",
              color: "#7BAE4B",
              fontSize: "clamp(26px, 3.71vw, 64px)",
              lineHeight: 1.05,
            }}
          >
            What makes
          </span>
          <span
            className="block"
            style={{
              fontFamily: "nexa-rust-script-shad-2, cursive",
              color: "#00608B",
              fontSize: "clamp(48px, 8.65vw, 150px)",
              lineHeight: 1,
              marginTop: "-0.1em",
            }}
          >
            Regenerative
          </span>
          <span
            className="block uppercase"
            style={{
              fontFamily: "'Ultra', Rockwell, Georgia, serif",
              color: "#7BAE4B",
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
            <div
              key={c.key}
              className="absolute hidden lg:block text-center"
              style={{
                [c.side]: "2%",
                top: c.top,
                width: "19%",
              }}
            >
              <h3
                className="m-0"
                style={{
                  fontFamily: "din-condensed, 'Arial Narrow', sans-serif",
                  fontWeight: 700,
                  color: "#00608B",
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
                className="absolute"
                style={{
                  left: c.arrow.left,
                  top: c.arrow.top,
                  width: c.arrow.width,
                }}
              />
            </div>
          ))}
        </div>

        {/* Stacked callouts for narrow viewports, where the arrows cannot
            point at anything useful. */}
        <div className="lg:hidden" style={{ marginTop: "6%" }}>
          {CALLOUTS.map((c) => (
            <div key={c.key} style={{ marginTop: "6%" }}>
              <h3
                className="m-0"
                style={{
                  fontFamily: "din-condensed, 'Arial Narrow', sans-serif",
                  fontWeight: 700,
                  color: "#00608B",
                  fontSize: 20,
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
                  fontSize: 15,
                  lineHeight: 1.55,
                  marginTop: "0.4em",
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
  );
}
