import { useRef } from "react";

const IMG = "/images/regenerative";

/* Palette from the CVR-Regen-LP-R1-v2 PSD. Most of these already exist as
   Tailwind tokens (chinored, chinoyellow, chinoblue, ctablue); green is the
   one the project did not have. Kept here as literals so the section styles
   read against the design brief without a lookup. */
const C = {
  red: "#B01116",
  orange: "#F9A115",
  green: "#7DA856",
  blue: "#00608B",
  deepBlue: "#004F76",
};

/* The four cards that ring the soil cross-section. On desktop they sit two to
   a side; on mobile they stack under the illustration. */
const PILLARS = [
  {
    title: "Healthy Soil",
    body: "We build soil health through cover crops, compost, and rotational grazing—improving water retention, sequestering carbon, and creating a strong foundation for life.",
  },
  {
    title: "Animals & Nature Together",
    body: "Our hens play an essential role in a balanced ecosystem—fertilizing the land naturally, controlling pests, and helping plants thrive.",
  },
  {
    title: "Living Roots",
    body: "Keeping living roots in the ground year-round feeds microorganisms, increases biodiversity, and supports long-term soil vitality.",
  },
  {
    title: "Farming for Tomorrow",
    body: "Regenerative farming isn’t just about today—it's about leaving the land better for future generations and the food they will depend on.",
  },
];

export function RegenerativeLanding() {
  const rootRef = useRef(null);

  return (
    <div className="regen" ref={rootRef}>
      {/* ═══ HERO ═══
          The "welcome to / Regenerative / Organic Regenerative Eggs" lockup
          ships as artwork rather than type: it is Nexa Rust Script with a
          layered shadow, and the script face is not in the font kit yet. The
          alt text carries the wording so it is still readable to search and
          to screen readers. */}
      <section className="regen-hero">
        <img
          className="regen-hero__art"
          src={`${IMG}/hero-lockup.jpg`}
          alt="Welcome to Regenerative — Organic Regenerative Eggs"
        />
      </section>

      {/* ═══ WHAT IS REGENERATIVE ═══ */}
      <section className="regen-whatis">
        <div className="regen-container">
          <h2 className="regen-h2" style={{ color: C.red }}>
            What is regenerative?
          </h2>

          <div className="regen-video">
            {/* The still already carries the play button, the "Hear Chris
                talk about regenerative" script and the torn blue frame, all
                baked in by the designer -- so no play overlay is drawn here.
                Swapping this for a real YouTube embed replaces the whole
                block, matching how the rest of the site embeds video. */}
            <img
              src={`${IMG}/video-still.jpg`}
              alt="Chris talks about regenerative farming"
              className="regen-video__still"
            />
          </div>

          <p className="regen-attrs" style={{ color: C.red }}>
            Organic <span aria-hidden="true">·</span> Free Range{" "}
            <span aria-hidden="true">·</span> Large <span aria-hidden="true">|</span>{" "}
            Brown
          </p>
        </div>
      </section>

      {/* ═══ REGENERATIVE AGRICULTURE ═══ */}
      <section className="regen-agri">
        <div className="regen-container regen-agri__inner">
          <div className="regen-agri__copy">
            <h2 className="regen-h2 regen-h2--stack">
              <span style={{ color: C.green }}>Regenerative</span>
              <span style={{ color: C.blue }}>agriculture</span>
            </h2>
            <p className="regen-body">
              is a collection of practices that focus on regenerative soil health
              and the full farm ecosystem. This can include crop rotation,
              compositing, and zero use of persistent chemical pesticides and
              fertilizers. Soil is the bedrock of our food system, and we are
              committed to protecting it for future generations.
            </p>
          </div>

          {/* CTA destination is not yet decided -- rendered as a button
              without an href so it is visible in review but not clickable. */}
          <div className="regen-cta">
            <span className="regen-cta__box">
              Purchase our organic regenerative eggs
            </span>
            <img
              className="regen-cta__script"
              src={`${IMG}/script-get-em-here.png`}
              alt=""
              aria-hidden="true"
            />
          </div>
        </div>
      </section>

      {/* ═══ THE NEXT GENERATION ═══ */}
      <section className="regen-nextgen">
        <img
          className="regen-nextgen__bg"
          src={`${IMG}/hens-pasture.webp`}
          alt=""
          aria-hidden="true"
        />
        <div className="regen-container regen-nextgen__inner">
          <div className="regen-nextgen__card">
            <h2 className="regen-h2 regen-h2--stack">
              <span style={{ color: C.blue }}>The Next</span>
              <span style={{ color: C.orange }}>Generation</span>
            </h2>
            <p className="regen-body">
              We believe regenerative agriculture is one of many promising
              approaches shaping the future of farming. By working in harmony
              with the land and incorporating thoughtful farming practices, it
              offers another opportunity to support the well-being of our birds
              while contributing to a healthier agricultural system.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ PHOTO ROW ═══ */}
      <section className="regen-photorow" aria-label="Life on the farm">
        <img src={`${IMG}/photo-barn.jpg`} alt="The barn at first light" />
        <img src={`${IMG}/photo-hen-closeup.jpg`} alt="One of our hens up close" />
        <img
          src={`${IMG}/photo-hens-roaming.jpg`}
          alt="Hens roaming open pasture at golden hour"
        />
      </section>

      {/* ═══ HIGHEST STANDARDS ═══ */}
      <section className="regen-standards">
        <div className="regen-container regen-standards__inner">
          <div className="regen-standards__copy">
            <h2 className="regen-h2" style={{ color: C.red }}>
              Highest standards
            </h2>
            <p className="regen-body">
              As the original trailblazers of organic egg farming, Chino Valley
              Ranchers is proud to be Regenerative Organic Certified, which is a
              revolutionary new certification for food that represents the
              highest standard for organic agriculture in the world.
            </p>

            <div className="regen-standards__badge">
              <img
                src={`${IMG}/roc-badge.png`}
                alt="Regenerative Organic Certified"
              />
              <img
                className="regen-standards__script"
                src={`${IMG}/script-were-certified.png`}
                alt=""
                aria-hidden="true"
              />
            </div>
          </div>

          <img
            className="regen-standards__hen"
            src={`${IMG}/hen-cutout.webp`}
            alt=""
            aria-hidden="true"
          />
        </div>
      </section>

      {/* ═══ WHAT MAKES REGENERATIVE DIFFERENT ═══
          The headline is a three-colour lockup mixing Ultra and the script
          face, so it ships as artwork like the hero. The four pillars below
          are real text -- in the design they ring the illustration with
          curved arrows; here they sit in a grid that stacks on mobile. */}
      <section className="regen-different">
        <div className="regen-container">
          <img
            className="regen-different__head"
            src={`${IMG}/different-headline.png`}
            alt="What makes Regenerative different?"
          />

          <p className="regen-body regen-different__lede">
            We go beyond organic. Our Regenerative practices work with nature to
            build healthier soil, support our hens, and create a better future
            for generations to come.
          </p>

          <img
            className="regen-different__art"
            src={`${IMG}/soil-cross-section.jpg`}
            alt="A cross-section of healthy pasture soil, with hens grazing above deep living roots and earthworms below"
          />

          <ul className="regen-pillars">
            {PILLARS.map((p) => (
              <li key={p.title} className="regen-pillar">
                <h3 className="regen-pillar__title" style={{ color: C.deepBlue }}>
                  {p.title}
                </h3>
                <p className="regen-pillar__body">{p.body}</p>
              </li>
            ))}
          </ul>

          <p className="regen-claims" style={{ color: C.green }}>
            <span>Better for the land.</span>
            <span>Better for our hens.</span>
            <span>Better eggs for you.</span>
          </p>
        </div>
      </section>

      {/* ═══ PRE-FOOTER ═══ */}
      <section className="regen-prefooter">
        <div className="regen-container">
          <h2 className="regen-prefooter__head" style={{ color: C.orange }}>
            Our regenerative eggs are pasture raised on family farms
          </h2>
          <p className="regen-prefooter__sub">
            Sustainable and regenerative farming practices.
            <br />
            Ethically produced for future generations.
          </p>
        </div>
      </section>
    </div>
  );
}

export default RegenerativeLanding;
