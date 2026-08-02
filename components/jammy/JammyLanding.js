import { useRef } from "react";

import { useJammyInteractions } from "../../hooks/useJammyInteractions";
import { JammyFaq } from "./JammyFaq";

const IMG = "/images/jammy";

/* Brand palette lifted from the design file. */
const C = {
  ink: "#20261A",
  forest: "#2E4322",
  cream: "#FCF6E9",
  sky: "#A3D2EE",
  green: "#67A818",
  orange: "#F2580E",
  red: "#EA3213",
  yellow: "#FFEF5C",
  body: "#3A3F31",
  night: "#151510",
};

const DISPLAY = "Anton, Impact, sans-serif";
const BODY = "Figtree, sans-serif";

/* The wordmark is 12 separate letter images so each can drip in
   independently. Percentages are positions within the lockup box. */
const LOCKUP = [
  { src: "01-M.png", left: 18.0685, top: 7.9787, width: 19.9377 },
  { src: "02-i.png", left: 39.0447, top: 0, width: 4.9844 },
  { src: "03-n.png", left: 45.7944, top: 7.4468, width: 14.6417 },
  { src: "04-d.png", left: 61.3707, top: 8.2447, width: 18.0685 },
  { src: "05-t.png", left: 0, top: 47.8723, width: 11.7342 },
  { src: "06-h.png", left: 12.7726, top: 48.6702, width: 14.7456 },
  { src: "07-e.png", left: 28.0374, top: 52.9255, width: 12.8764 },
  { src: "08-d.png", left: 45.6906, top: 41.7553, width: 12.6687 },
  { src: "09-r.png", left: 59.8131, top: 55.0532, width: 12.9803 },
  { src: "10-i.png", left: 74.0395, top: 56.6489, width: 4.9844 },
  { src: "11-p.png", left: 80.4777, top: 52.9255, width: 13.2918 },
  { src: "12-dot.png", left: 94.9117, top: 70.7447, width: 5.0883 },
];

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
              aspectRatio: "963 / 376",
              filter: "drop-shadow(0px 4px 23.9px rgba(0,0,0,0.26))",
            }}
          >
            {LOCKUP.map((l, i) => (
              <img
                key={l.src}
                data-letter={i}
                src={`${IMG}/lockup/${l.src}`}
                alt=""
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: `${l.left}%`,
                  top: `${l.top}%`,
                  width: `${l.width}%`,
                  opacity: 0,
                  willChange: "transform, opacity",
                }}
              />
            ))}
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
              color: "#fff",
              textShadow: "0 2px 12.9px rgba(0,0,0,0.5)",
            }}
          >
            The only egg with a golden, jammy center
            <br />
            that can make any meal a moment.
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
            <p
              className="jammy-reveal"
              style={{
                margin: 0,
                fontFamily: DISPLAY,
                fontSize: "clamp(22px, 2.6vw, 28px)",
                lineHeight: 1.1,
                letterSpacing: ".5px",
                textTransform: "uppercase",
                color: C.forest,
              }}
            >
              Available now at Trader Joe&rsquo;s.
            </p>
          </div>
          <div
            style={{
              flex: "1 1 420px",
              minWidth: 300,
              maxWidth: 560,
              position: "relative",
            }}
          >
            <img
              className="jammy-reveal"
              data-parallax="-0.06"
              src={`${IMG}/jammy-bag.png`}
              alt="The Jammy Egg bag"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
            <div
              data-badge="1"
              style={{
                position: "absolute",
                right: "2%",
                bottom: "6%",
                width: "clamp(140px, 20vw, 211px)",
                aspectRatio: "211 / 196",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0,
              }}
            >
              <svg
                viewBox="0 0 210.994 196.003"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                }}
                aria-hidden="true"
              >
                <path
                  d="M 206.456 62.625 C 196.864 35.897 170.472 21.442 145.349 10.535 C 124.13 1.334 100.508 -3.582 78.082 3.072 C 48.286 12.141 22.148 33.323 7.817 60.847 C -6.487 88.206 0.602 121.183 14.912 146.996 C 29.51 171.415 58.091 184.809 85.15 192.053 C 125.639 204.068 168.951 188.04 191.705 152.615 C 208.378 126.828 216.728 92.478 206.582 63.01 L 206.442 62.632 L 206.456 62.625 Z"
                  fill="#304423"
                />
              </svg>
              <span
                style={{
                  position: "relative",
                  fontFamily: DISPLAY,
                  fontSize: "clamp(15px, 2.1vw, 22px)",
                  lineHeight: 1.05,
                  letterSpacing: ".5px",
                  textTransform: "uppercase",
                  color: C.cream,
                  textAlign: "center",
                }}
              >
                24g
                <br />
                protein
                <br />
                per bag
              </span>
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
          <h2
            className="jammy-reveal"
            style={h2({
              fontSize: "clamp(44px, 8vw, 96px)",
              lineHeight: 0.92,
              color: C.cream,
            })}
          >
            What is
            <br />a jammy egg?
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
              src={`${IMG}/jammy-egg-illo.png`}
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
            No guesswork. Just that rich, jammy center, every time.
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
          background: C.cream,
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
          <article
            className="jammy-reveal"
            data-lift="1"
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
                height: 212,
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
                <img
                  src={`${IMG}/illo-texture-base.png`}
                  alt="Jammy egg mascot playing a saxophone"
                  style={{ width: "100%", height: "100%", display: "block" }}
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
          <article
            className="jammy-reveal"
            data-lift="1"
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
                height: 212,
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
                <img
                  src={`${IMG}/illo-easy-body.png`}
                  alt="Jammy egg mascot running with a fork"
                  style={{ width: "100%", height: "100%", display: "block" }}
                />
                <img
                  src={`${IMG}/illo-easy-arm.png`}
                  alt=""
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "73.171%",
                    top: 0,
                    width: "26.829%",
                    transformOrigin: "7.79% 58.65%",
                    animation: "jammyArmWave 1.9s ease-in-out infinite",
                  }}
                />
                {[
                  { left: 87, top: 4, w: 6.5, d: "0s" },
                  { left: 78.5, top: 15, w: 4.5, d: ".45s" },
                  { left: 89.5, top: 25, w: 5, d: ".95s" },
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
                      opacity: 0,
                      animation: `jammyTwinkle 2.6s ease-in-out ${s.d} infinite`,
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
          <article
            className="jammy-reveal"
            data-lift="1"
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
                height: 212,
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
                <img
                  src={`${IMG}/illo-upgrades-base.png`}
                  alt="Jammy egg relaxing in a bowl of ramen"
                  style={{ width: "100%", height: "100%", display: "block" }}
                />
                <img
                  src={`${IMG}/ramen-foot-a.png`}
                  alt=""
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "62.159%",
                    top: "42.453%",
                    width: "11.388%",
                    animation: "jammyFootBob 1.35s ease-in-out infinite",
                  }}
                />
                <img
                  src={`${IMG}/ramen-foot-b.png`}
                  alt=""
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "52.432%",
                    top: "47.484%",
                    width: "9.253%",
                    animation: "jammyFootBob 1.35s ease-in-out .68s infinite",
                  }}
                />
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
          background: C.cream,
          overflow: "hidden",
        }}
      >
        <div data-parallax="0.1" style={{ position: "absolute", inset: "-10% 0" }}>
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
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "22px 21px",
              justifyContent: "center",
            }}
          >
            {FEATURES.map((f) => (
              <div
                key={f.label}
                className="jammy-reveal"
                style={{
                  width: 188,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 18,
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
                    fontSize: 24,
                    lineHeight: 1.08,
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
          padding: "54px 24px 56px",
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
          {[
            {
              src: "grid-toast.jpg",
              alt: "Soft-boiled egg on avocado toast",
              sticker: false,
            },
            {
              src: "grid-hand.jpg",
              alt: "Hand holding egg and avocado toast",
              sticker: true,
            },
            {
              src: "grid-picnic.jpg",
              alt: "Friends sharing sandwiches at a picnic",
              sticker: false,
            },
            {
              src: "grid-ramen.jpg",
              alt: "Jammy egg in a bowl of ramen",
              sticker: false,
            },
          ].map((t) => (
            <div
              key={t.src}
              data-tile="1"
              style={{ position: "relative", overflow: "hidden" }}
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
              {t.sticker && (
                <img
                  data-sticker="1"
                  src={`${IMG}/svg/hard-part-sticker.svg`}
                  alt="The hard part, done easy"
                  style={{
                    position: "absolute",
                    left: "16%",
                    bottom: "12%",
                    width: "44%",
                    filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.28))",
                    opacity: 0,
                    transform: "rotate(-24deg) scale(.6)",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section style={{ background: "#fff", padding: "100px 24px" }}>
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
            padding: "96px clamp(24px, 5vw, 72px)",
            textAlign: "center",
          }}
        >
          <h2
            className="jammy-reveal"
            style={h2({
              fontSize: "clamp(30px, 4vw, 44px)",
              color: C.yellow,
              textShadow: "0 1px 0 rgba(46,67,34,0.12)",
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
          padding: "88px 24px 44px",
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
            top: "-20%",
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
          <div
            className="jammy-reveal"
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
                color: C.cream,
              }}
            >
              Whether you&rsquo;re cooking, cruising, hosting, or just hanging
              out, we&rsquo;ve got a soundtrack for it. Check out our Spotify
              playlists&mdash;made for everyone in the Jam Fam.
            </p>
            <a
              href="#"
              data-lift="1"
              style={{ ...pill(), alignSelf: "flex-start", marginTop: 8 }}
            >
              Get Jammin&rsquo;
            </a>
          </div>
          {/* Walking sax mascot: torso bobs, legs alternate, notes drift up */}
          <div className="jammy-reveal" style={{ flex: "0 0 190px" }}>
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
