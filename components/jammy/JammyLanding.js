import { useRef } from "react";

import { useJammyInteractions } from "../../hooks/useJammyInteractions";
import { JammyFaq } from "./JammyFaq";

const IMG = "/images/jammy";

/* Brand palette, verified against the CVR_JammyWebsite_r1 Figma file
   (node 1:497). The design tokens name each colour:
     Log Cabin #20261A · Mallard #2E4322 · Blizzard Blue #A3D2EE
     Christi #67A818 · Pomegranate #F2580E · Gorse #FFEF5C
     Kelp #3A3F31 · Alto #D9D9D9 · color/yellow/7 #151510
   #EA3213 is sampled from the Playlists section, which uses an unbound fill.

   There is no cream in the design -- that was mine. Figma uses pure #FFFFFF
   both for the type on orange and for the ground beneath the wave. */
const C = {
  ink: "#20261A",
  forest: "#2E4322",
  white: "#FFFFFF",
  sky: "#A3D2EE",
  green: "#67A818",
  orange: "#F2580E",
  red: "#EA3213",
  yellow: "#FFEF5C",
  body: "#3A3F31",
  rule: "#D9D9D9",
  night: "#151510",
};

const DISPLAY = "cubano, Anton, Impact, sans-serif";
const BODY = "proxima-nova, Figtree, sans-serif";

/* The wordmark is 12 separate letter images so each can drip in
   independently. Percentages are positions within the lockup box. */

const FEATURES = [
  { icon: "icon-c2.png", w: 46, h: 46, label: "Creamy, golden yolk texture" },
  {
    icon: "icon-single-ingredient.png",
    w: 46,
    h: 46,
    label: "Healthy, single ingredient",
  },
  { icon: "icon-anytime.png", w: 46, h: 46, label: "Enjoy any time of day" },
  { icon: "icon-protein.png", w: 46, h: 46, label: "Good source of protein" },
  {
    icon: "svg/icon-consistent.svg",
    w: 63,
    h: 58,
    label: "Consistent every time",
  },
  { icon: "icon-c3.png", w: 46, h: 46, label: "Upgrade any dish" },
  { icon: "icon-flavor.png", w: 46, h: 46, label: "Craveable flavor" },
  { icon: "icon-nutrients.png", w: 46, h: 46, label: "Packed with nutrients" },
  {
    icon: "svg/icon-easy-ready.svg",
    w: 34,
    h: 46,
    label: "Easy and ready to eat",
  },
  {
    icon: "svg/icon-shelf-life.svg",
    w: 43,
    h: 47,
    label: "Extended shelf life",
  },
];

const FAQS = [
  {
    question: "What is The Jammy Egg?",
    answer:
      "The Jammy Egg is a soft-boiled egg. It has a rich, golden yolk. It comes fully cooked, peeled, and ready to eat. Jammy is made from real, natural family-farmed eggs from Chino Valley Ranchers.",
  },
  {
    question: "How is Jammy different from a hard-boiled egg?",
    answer:
      "A hard-boiled egg is cooked all the way through, so the yolk is firm and chalky. Jammy is cooked to six minutes — delicately firm on the outside, rich and creamy in the center.",
  },
  {
    question: "Why is the yolk so golden?",
    answer:
      "It comes from the hens, not from us. Our family farms have raised hens to a higher standard for more than 75 years, and that care shows up in the color and the flavor of the yolk.",
  },
  {
    question: "How is The Jammy Egg packaged and stored?",
    answer:
      "Each egg is individually wrapped inside a resealable bag, so you can grab one at a time. Keep the bag refrigerated and enjoy by the date on the pack.",
  },
  {
    question: "How do I use The Jammy Egg?",
    answer:
      "However you want. Smash it on toast, drop it into ramen, halve it over a salad or a grain bowl, or eat it straight from the wrapper with a pinch of salt.",
  },
  {
    question: "Do I eat it hot or cold?",
    answer:
      "Either. It's ready to eat straight from the fridge, and it warms beautifully in a hot bowl of soup or ramen.",
  },
];

const pill = (bg = C.forest) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: 48,
  padding: "0 34px",
  borderRadius: 999,
  background: bg,
  color: "#fff",
  fontFamily: DISPLAY,
  fontSize: 15,
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  transition:
    "transform .25s cubic-bezier(.2,.7,.3,1), box-shadow .25s ease, background .25s ease",
});

const h2 = (extra = {}) => ({
  margin: 0,
  fontFamily: DISPLAY,
  fontWeight: 400,
  lineHeight: 1,
  letterSpacing: "1px",
  textTransform: "uppercase",
  color: C.forest,
  ...extra,
});

export function JammyLanding() {
  const rootRef = useRef(null);
  useJammyInteractions(rootRef);

  return (
    <div className="jammy" ref={rootRef}>
      {/* ═══ BRAND HERO ═══ */}
      <section
        style={{
          position: "relative",
          minHeight: 760,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 24px",
          background: C.night,
          overflow: "hidden",
        }}
      >
        <div
          data-parallax="0.18"
          style={{
            position: "absolute",
            inset: "-8% 0",
            animation: "jammyKenBurns 26s ease-in-out infinite alternate",
          }}
        >
          <img
            src={`${IMG}/brand-hero.jpg`}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 50%",
              display: "block",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(10,9,7,0.6) 0%, rgba(10,9,7,0.18) 52%, rgba(10,9,7,0.42) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 900,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 25,
            padding: "0 24px",
          }}
        >
          <h1
            data-lockup="1"
            aria-label="Mind the drip."
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 660,
              margin: 0,
              aspectRatio: "700 / 280.1",
              filter: "drop-shadow(0px 4px 23.9px rgba(0,0,0,0.26))",
            }}
          >
            {/* QA: "We do not want the letters to animate in separately.
                There is a warping quality that is not desirable. Please just
                apply a soft bounce-in animation to the whole of the artwork."

                So this is the supplied wordmark as one vector rather than the
                twelve letter PNGs it was built from. It also stays crisp at
                any size, which the PNGs did not. */}
            <img
              data-lockup-art="1"
              src={`${IMG}/svg/mind-the-drip.svg`}
              alt=""
              aria-hidden="true"
              style={{
                width: "100%",
                height: "100%",
                opacity: 0,
                willChange: "transform, opacity",
              }}
            />
          </h1>
          <p
            className="jammy-reveal"
            style={{
              margin: 0,
              maxWidth: 700,
              fontFamily: BODY,
              fontWeight: 600,
              fontSize: "clamp(17px, 2.1vw, 24px)",
              lineHeight: 1.4,
              textAlign: "center",
              textWrap: "balance",
              color: "#fff",
              textShadow: "0 2px 12.9px rgba(0,0,0,0.5)",
            }}
          >
            {/* No hard break: it forced an awkward wrap on phones. text-wrap
                balance keeps the two lines even on wide screens instead. */}
            The only egg with a golden, jammy center that makes any meal a
            moment.
          </p>
        </div>
      </section>

      {/* ═══ WHERE TO BUY ═══ */}
      <section style={{ background: C.green, padding: "30px 24px" }}>
        <div
          style={{
            maxWidth: 1140,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: 22,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: BODY,
              fontWeight: 800,
              fontSize: "clamp(19px, 2.2vw, 26px)",
              lineHeight: 1,
              color: C.forest,
            }}
          >
            Find Jammy in a store near you!
          </span>
          <a
            href="/store-locator"
            data-lift="1"
            style={{
              ...pill(),
              height: 46,
              padding: "0 30px",
              fontFamily: BODY,
              fontWeight: 800,
            }}
          >
            Store Locator
          </a>
        </div>
      </section>

      {/* ═══ OVERVIEW ═══ */}
      <section
        style={{ background: C.sky, padding: "clamp(56px, 7vw, 104px) 24px" }}
      >
        <div
          style={{
            maxWidth: 1140,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: 72,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              flex: "1 1 420px",
              minWidth: 300,
              maxWidth: 540,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <h2
              className="jammy-reveal"
              style={h2({ fontSize: "clamp(34px, 4.4vw, 48px)" })}
            >
              The hard part,
              <br />
              done easy.
            </h2>
            <p
              className="jammy-reveal"
              style={{
                margin: 0,
                fontFamily: BODY,
                fontSize: 18,
                lineHeight: "27px",
                color: C.ink,
              }}
            >
              The Jammy Egg cracks the code on the perfect 6-minute egg.
              Delicately firm on the outside. Rich and crazy creamy on the
              inside. It&rsquo;s the easiest way to add a hard-to-master
              soft-boiled egg into your favorite foods. Jammy is the low lift
              for your high standards.
            </p>
            {/* QA: "'Available now at Trader Joe's.' should be in bold
                Proxima Nova". It was set in Cubano and uppercased; the copy
                deck has it in sentence case, so the transform goes too. */}
            <p
              className="jammy-reveal"
              style={{
                margin: 0,
                fontFamily: BODY,
                fontWeight: 700,
                fontSize: "clamp(19px, 2.1vw, 24px)",
                lineHeight: 1.25,
                letterSpacing: "normal",
                color: C.forest,
              }}
            >
              Available now at Trader Joe&rsquo;s.
            </p>
          </div>
          {/* The source art has the bag sitting in a wide, mostly-transparent
              canvas, which rendered it small. Asset is cropped tight to the
              bag, so sizing is driven from here instead. */}
          <div
            style={{
              flex: "1 1 420px",
              minWidth: 300,
              maxWidth: 560,
              position: "relative",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div style={{ position: "relative", width: "min(100%, 500px)" }}>
              {/* No parallax: the bag and its badge need to stay locked
                  together, and drifting the bag against a pinned badge broke
                  the composition on scroll. */}
              <img
                className="jammy-reveal"
                src={`${IMG}/jammy-bag.png`}
                alt="The Jammy Egg bag"
                // No CSS drop-shadow: the artwork carries its own, and a
                // filter traces the image's alpha edge, which made the crop
                // boundary visible as a hard line.
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              <div
                data-badge="1"
                // Vertical placement differs by breakpoint (centred on the bag
                // for desktop, up near the top on mobile), so it lives in
                // globals.css under .jammy-badge rather than inline.
                className="jammy-badge"
                style={{
                  position: "absolute",
                  aspectRatio: "1 / 1",
                  opacity: 0,
                }}
              >
                {/* QA: "The graphic should also match the artwork provided
                    (right now the proportions of text to overall shape are not
                    maintained)." It was a hand-drawn blob with live type laid
                    over it, so the type never sat in the designed proportion to
                    the shape. This is ProteinBubble.svg from the deliverables,
                    where the type is outlined into the artwork itself. */}
                <img
                  src={`${IMG}/svg/protein-bubble.svg`}
                  alt="24g of protein per bag"
                  style={{ width: "100%", height: "100%", display: "block" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHAT IS JAMMY ═══ */}
      <section
        style={{
          background: C.orange,
          padding: "clamp(60px, 8vw, 96px) 24px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            textAlign: "center",
          }}
        >
          {/* QA: "'What is a Jammy Egg?' should be in Cubano and on a curve
              consistent with the original design."

              This is the lockup exported from the Figma. It was tried as an
              SVG textPath first, to keep the words as live text, but that got
              the structure wrong as well as the curve: the design sets the
              whole question on one deep arc, not two stacked lines.

              The <h2> keeps the heading in the document outline and the alt
              text carries the wording, so it is still read aloud and indexed. */}
          <h2 className="jammy-reveal jammy-curve" style={h2({ margin: 0 })}>
            <img
              src={`${IMG}/what-is-a-jammy-egg.png`}
              alt="What is a jammy egg?"
            />
          </h2>
          <div
            className="jammy-reveal"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 463,
              aspectRatio: "463 / 267",
              margin: "12px 0 8px",
            }}
          >
            <img
              src={`${IMG}/certified-jam.png`}
              alt="Certified Jam"
              style={{
                position: "absolute",
                left: 0,
                top: "20.2%",
                width: "45.3%",
                zIndex: 2,
                animation: "jammyFloat 7s ease-in-out infinite",
              }}
            />
            <img
              // QA 3.4: the supplied PNG was 345x270 against a ~298px display
              // size -- barely 1.2x, so it read soft on any retina screen. The
              // artwork is vector in Figma, so this is the SVG export instead
              // and stays crisp at any size.
              src={`${IMG}/svg/jammy-egg-illo.svg`}
              alt="Soft-boiled jammy egg"
              style={{
                position: "absolute",
                left: "30.5%",
                top: "1.7%",
                width: "64.3%",
                animation: "jammyFloat 6s ease-in-out infinite .8s",
              }}
            />
          </div>
          <p
            className="jammy-reveal"
            style={{
              margin: 0,
              maxWidth: 720,
              fontFamily: BODY,
              fontWeight: 500,
              fontSize: "clamp(20px, 3vw, 33px)",
              lineHeight: 1.4,
              color: "#fff",
            }}
          >
            A jammy egg is soft-boiled to golden perfection&mdash;fully cooked,
            peeled, and ready to add to your favorite meal or snack. No timing.
            No guesswork. Just that rich, jammy center,{" "}
            {/* QA: "'every time.' in the body copy should be underlined."
                The period is inside the quoted string, so it is underlined
                too. text-underline-offset keeps the rule off the descender
                in "every" at this size. */}
            <span
              style={{
                textDecoration: "underline",
                textDecorationThickness: "0.06em",
                textUnderlineOffset: "0.14em",
              }}
            >
              every time.
            </span>
          </p>
        </div>
      </section>

      {/* ═══ DIFFERENTIATORS ═══
          The orange carries down from "What is a jammy egg" and the wave is
          the transition into the cream. The wave sits at the TOP of this
          section so the cards below it always clear it -- anchoring it to the
          bottom lets it ride up through the copy on short viewports. */}
      <section
        style={{
          position: "relative",
          background: C.white,
          paddingBottom: "clamp(64px, 8vw, 112px)",
          overflow: "hidden",
        }}
      >
        {/* The orange carries down behind the heading and the top of the
            illustrations; the wave crests between the heading and the card
            copy, so the text below always lands on cream. */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: "clamp(150px, 17vw, 250px)",
            background: C.orange,
            zIndex: 0,
          }}
        />
        <img
          src={`${IMG}/differentiators-wave.png`}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "clamp(150px, 17vw, 250px)",
            width: "100%",
            height: "auto",
            display: "block",
            pointerEvents: "none",
            transform: "translateY(-1px)",
            zIndex: 0,
          }}
        />
        <h2
          className="jammy-reveal"
          style={h2({
            position: "relative",
            zIndex: 1,
            margin: "0 0 clamp(40px, 5vw, 64px)",
            paddingTop: "clamp(56px, 7vw, 96px)",
            fontSize: "clamp(28px, 3.6vw, 38px)",
            lineHeight: 1.15,
            textAlign: "center",
          })}
        >
          An egg in a class of its own.
        </h2>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1180,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: 26,
            justifyContent: "center",
          }}
        >
          {/* Smooth, Jammy Texture — sax-playing egg with music notes */}
          {/* No hover lift here: these cards sit over the wave, and the lift's
              drop shadow paints a hard rectangle across it. */}
          <article
            className="jammy-reveal"
            style={{
              flex: "1 1 300px",
              maxWidth: 340,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                height: 256,
                width: 300,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: "100%",
                  aspectRatio: "260 / 212",
                  animation: "jammyFloat 6.5s ease-in-out infinite",
                }}
              >
                {/* QA 3.1: the SVG straight from Figma rather than the PNG.
                    The orange seams were never in the artwork -- they came
                    from the PNG export, where shapes that butt together
                    leave a row of half-transparent pixels for the background
                    to show through. Vector paths composite as shapes, so
                    there is nothing to bleed. Gzips to 26KB against the
                    PNG's 66KB, and stays sharp at any size. */}
                {/* Inset to the PNG's ink extent (x 9.5-82%, y 0-89.5% of the
                    old frame) so the artwork lands exactly where it did before.
                    Keeping the outer box at 260/212 means the music notes below
                    keep their measured positions -- they float in the padding
                    the SVG's tight crop does not include. */}
                <img
                  src={`${IMG}/svg/illo-texture.svg`}
                  alt="Jammy egg mascot playing a saxophone"
                  style={{
                    position: "absolute",
                    left: "9.5%",
                    top: 0,
                    width: "72.5%",
                    height: "89.5%",
                    display: "block",
                  }}
                />
                {[
                  { src: "note-3.png", left: 73.5, top: 17.9, w: 5.4, d: "0s" },
                  { src: "note-1.png", left: 82.7, top: 17.9, w: 7.3, d: ".55s" },
                  { src: "note-2.png", left: 76.2, top: 31.1, w: 5.8, d: "1.15s" },
                ].map((n) => (
                  <img
                    key={n.src}
                    src={`${IMG}/${n.src}`}
                    alt=""
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: `${n.left}%`,
                      top: `${n.top}%`,
                      width: `${n.w}%`,
                      animation: `jammyNote 3.2s ease-in-out ${n.d} infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
            <h3
              style={{
                margin: 0,
                fontFamily: BODY,
                fontWeight: 700,
                fontSize: 24,
                lineHeight: 1,
                color: C.ink,
              }}
            >
              Smooth, Jammy Texture
            </h3>
            <p
              style={{
                margin: 0,
                fontFamily: BODY,
                fontSize: 18,
                lineHeight: "27px",
                color: C.body,
              }}
            >
              Jammy gets its name from its distinct center: a golden yolk
              that&rsquo;s smooth, rich, and creamy. It offers the soft-boiled
              texture people crave.
            </p>
          </article>

          {/* Easy and Ready — waving arm, sparkles */}
          {/* No hover lift here: these cards sit over the wave, and the lift's
              drop shadow paints a hard rectangle across it. */}
          <article
            className="jammy-reveal"
            style={{
              flex: "1 1 300px",
              maxWidth: 340,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                height: 256,
                width: 300,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: "100%",
                  aspectRatio: "287 / 212",
                  animation: "jammyFloat 6.5s ease-in-out infinite .5s",
                }}
              >
                {/* QA 3.1: Figma's vector in place of the two-PNG stack.
                    The arm used to be its own PNG laid over the body so it
                    could wave, and that seam is what QA saw: both layers
                    carry semi-transparent edge pixels (2.6% of the arm box,
                    1.1% of the body), so the orange behind them showed
                    through the outlines and between the fork tines.

                    The vector is one flat drawing -- 32 paths, no named arm
                    group -- so the wave goes away with it. That is the right
                    trade here: QA asked for no visible cuts, and this is the
                    same illustration the designer drew. The float on the
                    wrapper still gives the card motion.

                    The supplied file carried Illustrator's padding, so its
                    viewBox is cropped to the ink -- the same shape the other
                    two illustrations already have. It is then inset to the
                    PNG ink's old extent (x 9.8-90.2%, y 3.8-89.6%) so the
                    egg renders at exactly the size it did before. Letting it
                    fill the frame instead was tried and rejected: the fixed
                    256px row then maps to ink alone rather than ink plus
                    padding, which drew this egg 17% larger than its two
                    neighbours.

                    Gzips to 6.6KB against 69KB of PNG. */}
                <img
                  src={`${IMG}/svg/illo-easy.svg`}
                  alt="Jammy egg mascot running with a fork"
                  style={{
                    position: "absolute",
                    left: "9.76%",
                    top: "3.77%",
                    width: "80.48%",
                    height: "85.86%",
                    display: "block",
                  }}
                />
                {/* The three twinkles that used to sit beside the fork are
                    gone. They were ours, not the designer's -- there are no
                    sparkle shapes in this artwork, and the motion lines by
                    the feet are its own speed cue. They also sat in the
                    padding the cropped viewBox no longer includes, so
                    keeping them would have meant clipping them against the
                    frame edge. */}
              </div>
            </div>
            <h3
              style={{
                margin: 0,
                fontFamily: BODY,
                fontWeight: 700,
                fontSize: 24,
                lineHeight: 1,
                color: C.ink,
              }}
            >
              Easy and Ready to Enjoy
            </h3>
            <p
              style={{
                margin: 0,
                fontFamily: BODY,
                fontSize: 18,
                lineHeight: "27px",
                color: C.body,
              }}
            >
              No more confusion or tricky techniques. Each egg is individually
              wrapped and ready to go. With Jammy, the perfect soft-boiled egg
              is effortless, so you can spend less time getting it right and
              more time making it yours.
            </p>
          </article>

          {/* Upgrades Any Dish — egg in ramen, bobbing feet */}
          {/* No hover lift here: these cards sit over the wave, and the lift's
              drop shadow paints a hard rectangle across it. */}
          <article
            className="jammy-reveal"
            style={{
              flex: "1 1 300px",
              maxWidth: 340,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                height: 256,
                width: 300,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: "100%",
                  aspectRatio: "843 / 636",
                  animation: "jammyFloat 6.5s ease-in-out infinite 1s",
                }}
              >
                {/* QA 3.1: Figma's vector, inset to the PNG's ink extent
                    (x 10.7-89.2%, y 12.7-89.5%) so the bowl sits exactly where
                    it did and the shine overlays below keep their positions.
                    Gzips to 54KB against 105KB of PNG.

                    The feet are part of this artwork, so the two ramen-foot
                    overlays that used to sit on top are gone -- QA 3.2 asked
                    for them to stop moving, and now they simply are the
                    illustration. */}
                <img
                  src={`${IMG}/svg/illo-upgrades.svg`}
                  alt="Jammy egg relaxing in a bowl of ramen"
                  style={{
                    position: "absolute",
                    left: "10.7%",
                    top: "12.7%",
                    width: "78.5%",
                    height: "76.8%",
                    display: "block",
                  }}
                />
                {/* The four shine marks are part of the artwork too, so these
                    overlay them at the measured positions and pulse. */}
                {[
                  { left: 81.85, top: 20.75, w: 6.88, d: "0s" },
                  { left: 23.96, top: 13.21, w: 6.88, d: "0.7s" },
                  { left: 77.58, top: 69.5, w: 6.64, d: "1.3s" },
                  { left: 15.66, top: 21.7, w: 4.51, d: "1.9s" },
                ].map((s, i) => (
                  <img
                    key={i}
                    src={`${IMG}/sparkle.png`}
                    alt=""
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: `${s.left}%`,
                      top: `${s.top}%`,
                      width: `${s.w}%`,
                      animation: `jammyShine 3.4s ease-in-out ${s.d} infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
            <h3
              style={{
                margin: 0,
                fontFamily: BODY,
                fontWeight: 700,
                fontSize: 24,
                lineHeight: 1,
                color: C.ink,
              }}
            >
              Upgrades Any Dish
            </h3>
            <p
              style={{
                margin: 0,
                fontFamily: BODY,
                fontSize: 18,
                lineHeight: "27px",
                color: C.body,
              }}
            >
              It&rsquo;s the topper that turns simple food into something more
              satisfying. Add it to almost any dish for more flavor, more
              texture, quality protein, and the nutrient-rich goodness of a real
              egg.
            </p>
          </article>
        </div>
      </section>

      {/* ═══ PRODUCT FEATURES ═══ */}
      <section
        style={{
          position: "relative",
          padding: "clamp(64px, 8vw, 120px) 24px",
          background: C.white,
          overflow: "hidden",
        }}
      >
        {/* Photo backdrop on desktop; hidden on phones per QA 2.6, where the
            section reverts to a solid block so the labels stay legible. */}
        <div
          data-parallax="0.1"
          className="jammy-features-bg"
          style={{ position: "absolute", inset: "-10% 0" }}
        >
          <img
            src={`${IMG}/features-bg.jpg`}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 57%",
              display: "block",
            }}
          />
        </div>
        <div
          style={{
            position: "relative",
            maxWidth: 1120,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 64,
          }}
        >
          <h2
            className="jammy-reveal"
            style={h2({
              fontSize: "clamp(30px, 4vw, 44px)",
              textAlign: "center",
            })}
          >
            A shortcut with showmanship.
          </h2>
          {/* A fixed grid rather than flex-wrap: the design is two rows of
              five, and wrapping cannot guarantee that. Collapses to two columns
              on phones (QA 2.6). */}
          <div className="jammy-features">
            {FEATURES.map((f) => (
              <div
                key={f.label}
                className="jammy-reveal jammy-feature"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  src={`${IMG}/${f.icon}`}
                  alt=""
                  aria-hidden="true"
                  style={{ width: f.w, height: f.h, objectFit: "contain" }}
                />
                <h3
                  style={{
                    margin: 0,
                    fontFamily: BODY,
                    fontWeight: 700,
                    lineHeight: 1.2,
                    textAlign: "center",
                    color: C.forest,
                  }}
                >
                  {f.label}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EVERY HOUR IS GOLDEN HOUR ═══ */}
      <section
        style={{
          background: "#fff",
          // Figma has 54px above the text block and 56px below the tiles
          // (node 1:332). QA 2.7 asked for that padding to be restored.
          padding: "clamp(36px, 5vw, 54px) 24px clamp(36px, 5vw, 56px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 25,
        }}
      >
        <div
          style={{
            maxWidth: 780,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            textAlign: "center",
          }}
        >
          <h2
            className="jammy-reveal"
            style={h2({ fontSize: "clamp(32px, 4.6vw, 48px)" })}
          >
            Every hour is golden hour.
          </h2>
          <p
            className="jammy-reveal"
            style={{
              margin: 0,
              fontFamily: BODY,
              fontSize: 18,
              lineHeight: "27px",
              color: C.ink,
            }}
          >
            Jammy turns whatever you crave into something you can actually
            create. Smash it into something savory. Slice it up into something
            snacky. Drop it onto plates that need a punch-up. It&rsquo;s not
            just a breakfast thing. It&rsquo;s for toasts, bowls, burritos,
            salads, sandwiches, ramen, and everything in between. Jammy moves
            your food from ho-hum to hot damn.
          </p>
        </div>
        <div
          className="jammy-tiles"
          style={{
            width: "100%",
            maxWidth: 1600,
            display: "grid",
            gridTemplateColumns: "1fr 3.4fr 1fr 1fr",
            gap: 22,
            height: "clamp(320px, 42vw, 600px)",
            transition: "grid-template-columns .7s cubic-bezier(.2,.7,.25,1)",
          }}
        >
          {/* Two filenames still do not match their contents: grid-hand is
              the ramen bowl and grid-ramen is the toast. Left unrenamed so
              they still match what NW delivered; alt text and labels follow
              the actual photographs.

              QA: "The order from left to right should be salad, toast, snack,
              ramen," and "the image used in the salad block has been updated."

              grid-salad.jpg is that update. The subject is a lunchbox, which
              is what the old grid-toast.jpg was named for and why it read as
              the wrong photo at first -- but the box holds leaves, radish, cucumber,
              carrot and a jammy egg, so it is the salad. The deliverable is a
              retouched pass over the same frame (mean pixel difference 7.9
              against the old file, identical crop).

              QA: "text within each container should use the Cubano text
              anchored in the top left corner." Now live Cubano rather than
              svg/hard-part-sticker.svg, which was the only label that existed
              and was not Cubano anyway -- it is a rounded brush script. */}
          {[
            {
              src: "grid-salad.jpg",
              alt: "Lunchbox salad with leaves, radish, carrot and a halved jammy egg",
              label: "Salad",
            },
            {
              src: "grid-ramen.jpg",
              alt: "Hand holding avocado toast topped with a jammy egg",
              label: "Toast",
            },
            {
              src: "grid-snack.jpg",
              alt: "Halved soft-boiled eggs with cracked pepper in a bowl",
              label: "Snack",
            },
            {
              src: "grid-hand.jpg",
              alt: "Jammy egg in a bowl of ramen",
              label: "Ramen",
            },
          ].map((t) => (
            <div
              key={t.src}
              data-tile="1"
              style={{
                position: "relative",
                overflow: "hidden",
                containerType: "inline-size",
              }}
            >
              <img
                src={`${IMG}/${t.src}`}
                alt={t.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform .8s cubic-bezier(.2,.7,.3,1)",
                }}
              />
              {t.label && (
                <span
                  data-sticker="1"
                  style={{
                    position: "absolute",
                    // Anchored top-left per QA, rather than the previous
                    // bottom-left placement.
                    left: "8%",
                    top: "8%",
                    fontFamily: DISPLAY,
                    // The narrow tiles are a quarter the width of the wide
                    // one, so a single size would either swamp them or vanish
                    // in the wide one. cqw ties it to the tile, not the page.
                    fontSize: "clamp(19px, 11cqw, 44px)",
                    lineHeight: 1,
                    color: C.yellow,
                    // The brand yellow is light and three of these photos are
                    // bright -- Toast measured 1.4:1 against its plate, Snack
                    // 1.7:1 against egg white. A thin forest outline in the
                    // brand's own dark green carries the label over whatever
                    // is behind it; the soft shadow underneath keeps it
                    // sitting on the photo rather than floating flat.
                    WebkitTextStroke: `0.055em ${C.forest}`,
                    paintOrder: "stroke fill",
                    textShadow: "0 4px 14px rgba(0,0,0,0.4)",
                    pointerEvents: "none",
                    opacity: 0,
                    transform: "rotate(-24deg) scale(.6)",
                  }}
                >
                  {t.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section
        style={{ background: "#fff", padding: "clamp(48px, 8vw, 100px) 24px" }}
      >
        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 54,
          }}
        >
          <h2
            className="jammy-reveal"
            style={h2({
              fontSize: "clamp(30px, 4vw, 44px)",
              letterSpacing: ".5px",
              textAlign: "center",
            })}
          >
            Frequently asked questions
          </h2>
          <JammyFaq items={FAQS} />
        </div>
      </section>

      {/* ═══ ABOUT CVR ═══ */}
      <section
        style={{
          background: C.sky,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            flex: "1 1 480px",
            minWidth: 320,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            padding: "clamp(56px, 9vw, 96px) clamp(24px, 5vw, 72px)",
            textAlign: "center",
          }}
        >
          <h2
            className="jammy-reveal"
            style={h2({
              // Floor raised from 30px: at mobile widths the old minimum left
              // the headline small against a tall blue field. 8.5vw lets it
              // fill the column and wrap to two lines instead of three.
              fontSize: "clamp(38px, 8.5vw, 46px)",
              lineHeight: 0.98,
              color: C.yellow,
            })}
          >
            Our history
            <br />
            of thinking ahead.
          </h2>
          <p
            className="jammy-reveal"
            style={{
              margin: 0,
              maxWidth: 620,
              fontFamily: BODY,
              fontSize: 18,
              lineHeight: "28.8px",
              color: C.ink,
            }}
          >
            For more than 75 years and three generations, our philosophy has
            been simple: better eggs start with higher standards. That&rsquo;s
            why we led the way with humane hen care &mdash; because we believe
            in doing what is right, not just what is expected.
          </p>
          <p
            className="jammy-reveal"
            style={{
              margin: 0,
              maxWidth: 620,
              fontFamily: BODY,
              fontSize: 18,
              lineHeight: "28.8px",
              color: C.ink,
            }}
          >
            Today that same can&rsquo;t-leave-well-enough-alone spirit still
            drives us. It&rsquo;s what pushed us to spend 6 years perfecting the
            6-minute egg, so you don&rsquo;t have to. Jammy is our next chapter.
            A ready-when-you-are breakthrough born from the idea that good food
            should be easier, exciting, and a lot more fun.
          </p>
          <a
            href="/our-family"
            data-lift="1"
            className="jammy-reveal"
            style={{ ...pill(), padding: "0 38px" }}
          >
            Our Story
          </a>
        </div>
        <div
          style={{
            flex: "1 1 480px",
            minWidth: 320,
            height: "clamp(360px, 62vw, 903px)",
            overflow: "hidden",
          }}
        >
          <img
            src={`${IMG}/about-cvr.jpg`}
            alt="Chino Valley Ranchers hens in pasture"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 95%",
              display: "block",
            }}
          />
        </div>
      </section>

      {/* ═══ PLAYLISTS ═══ */}
      <section
        style={{
          position: "relative",
          background: C.red,
          // QA 2.10: taller panel so the Jammy wordmark behind the content is
          // not cropped. Figma's is 1920x432 (aspect 4.44).
          padding: "clamp(64px, 8vw, 104px) 24px clamp(56px, 7vw, 88px)",
          overflow: "hidden",
        }}
      >
        <img
          src={`${IMG}/svg/playlists-blob.svg`}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-3.6%",
            // Centred rather than pulled up: at -20% the wordmark's ascenders
            // were clipped by the panel's top edge (QA 2.10).
            top: "50%",
            transform: "translateY(-50%)",
            width: "103.3%",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            maxWidth: 1068,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: 52,
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          {/* Hidden on phones: a scannable code is no use on the device doing
              the scanning, and the "Get Jammin'" button covers that case. */}
          <div
            className="jammy-reveal jammy-spotify-code"
            data-lift="1"
            style={{ flex: "0 0 auto" }}
          >
            <img
              src={`${IMG}/svg/spotify-code.svg`}
              alt="Scannable code linking to the Jammy Spotify playlists"
              width={202}
              height={200}
              style={{ display: "block", width: 202, height: 200 }}
            />
          </div>
          <div
            className="jammy-reveal"
            style={{
              flex: "1 1 280px",
              minWidth: 280,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <h2
              style={h2({
                fontSize: "clamp(30px, 4vw, 44px)",
                letterSpacing: ".5px",
                color: "#fff",
              })}
            >
              Your next jam is on us
            </h2>
            <p
              style={{
                margin: 0,
                fontFamily: BODY,
                fontSize: 18,
                lineHeight: "27px",
                color: C.white,
              }}
            >
              Whether you&rsquo;re cooking, cruising, hosting, or just hanging
              out, we&rsquo;ve got a soundtrack for it. Check out our Spotify
              playlists&mdash;made for everyone in the Jam Fam.
            </p>
            <a
              href="https://open.spotify.com/user/31pasck3j4fhxzzrtogj353djbzy?si=Zv1LVkkYQcegY8hYt59WCQ&utm_source=copy-link"
              target="_blank"
              rel="noopener noreferrer"
              data-lift="1"
              style={{ ...pill(), alignSelf: "flex-start", marginTop: 8 }}
            >
              Get Jammin&rsquo;
            </a>
          </div>
          {/* Walking sax mascot: torso bobs, legs alternate, notes drift up */}
          <div
            className="jammy-reveal jammy-sax"
            style={{ flex: "0 0 190px" }}
          >
            <div
              style={{
                position: "relative",
                width: 190,
                aspectRatio: "480 / 440",
                transformOrigin: "50% 92%",
                animation: "jammyWalk 1.1s ease-in-out infinite",
              }}
            >
              <img
                src={`${IMG}/playlists-art-torso.png`}
                alt="Jammy egg mascot playing a saxophone"
                style={{ width: "100%", height: "100%", display: "block" }}
              />
              <img
                src={`${IMG}/pl-leg-left.png`}
                alt=""
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "10.417%",
                  top: "59.545%",
                  width: "26.875%",
                  transformOrigin: "90.7% 0%",
                  animation: "jammyStepA 1.1s ease-in-out infinite",
                }}
              />
              <img
                src={`${IMG}/pl-leg-right.png`}
                alt=""
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "40.625%",
                  top: "59.545%",
                  width: "30.833%",
                  transformOrigin: "12.16% 0%",
                  animation: "jammyStepB 1.1s ease-in-out infinite",
                }}
              />
              <img
                src={`${IMG}/pl-sax.png`}
                alt=""
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "58.333%",
                  top: "44.545%",
                  width: "31.875%",
                  transformOrigin: "7.84% 6.47%",
                  animation: "jammySax 2.2s ease-in-out infinite",
                }}
              />
              {[
                { src: "pl-note-3.png", left: 78.958, top: 19.545, w: 7.5, d: "0s" },
                { src: "pl-note-1.png", left: 90.208, top: 19.545, w: 10, d: ".55s" },
                { src: "pl-note-2.png", left: 82.083, top: 34.318, w: 7.917, d: "1.15s" },
              ].map((n) => (
                <img
                  key={n.src}
                  src={`${IMG}/${n.src}`}
                  alt=""
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: `${n.left}%`,
                    top: `${n.top}%`,
                    width: `${n.w}%`,
                    opacity: 0,
                    animation: `jammyNote 3.2s ease-in-out ${n.d} infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default JammyLanding;
