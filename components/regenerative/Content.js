/* Section 3 of the CVR Regen Page design: "Regenerative AGRICULTURE" on a
   torn white card over a grass field, with the red wood PURCHASE sign and the
   "Get 'em here!" annotation pointing at it.

   Geometry measured off the design render (2075px wide):
     white card   62.7% wide, left edge at 12.7%
     red sign     24.2% wide, left edge at 64.9%, aspect 1.39

   The heading is two faces on two lines, as drawn: Nexa Rust script for
   "Regenerative", DIN Condensed for "AGRICULTURE". */
export function Content() {
  return (
    <section className="relative overflow-hidden">
      <img
        src="/images/regen/grass.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div
        className="relative mx-auto"
        style={{ maxWidth: 1600, padding: "6% 4% 7%" }}
      >
        <div className="relative">
          {/* Torn card. The paper is the asset's own alpha, so the edges are
              real tears rather than a border-radius. */}
          <div
            className="relative"
            style={{
              width: "68.1%",
              backgroundImage: "url(/images/regen/card-torn.png)",
              backgroundSize: "100% 100%",
              padding: "5% 6% 6%",
            }}
          >
            <h2 className="m-0">
              <span
                className="block"
                style={{
                  fontFamily: "nexa-rust-script-shad-2, cursive",
                  color: "#7CA854",
                  fontSize: "clamp(28px, 3.6vw, 62px)",
                  lineHeight: 1,
                }}
              >
                Regenerative
              </span>{" "}
              <span
                className="block uppercase"
                style={{
                  fontFamily: "din-condensed, 'Arial Narrow', sans-serif",
                  fontWeight: 700,
                  color: "#006088",
                  fontSize: "clamp(24px, 3.2vw, 56px)",
                  letterSpacing: "0.02em",
                  lineHeight: 1,
                  marginTop: "-0.06em",
                }}
              >
                Agriculture
              </span>
            </h2>

            <p
              className="m-0"
              style={{
                fontFamily: "'Lato', system-ui, sans-serif",
                color: "#2B2B2B",
                fontSize: "clamp(13px, 1.16vw, 20px)",
                lineHeight: 1.62,
                marginTop: "1.1em",
              }}
            >
              is a collection of practices that focus on regenerative soil
              health and the full farm ecosystem. This can include crop
              rotation, compositing, and zero use of persistent chemical
              pesticides and fertilizers. Soil is the bedrock of our food
              system, and we are committed to protecting it for future
              generations.
            </p>
          </div>

          {/* The carton with its burst of rays, straddling the card's top
              edge -- the rays sit behind it, so they come first. Measured
              from the design: the carton spans roughly 12%-35% of the card's
              width and overhangs the top by about a third of its height. */}
          <img
            src="/images/regen/burst.png"
            alt=""
            aria-hidden="true"
            className="absolute hidden sm:block"
            style={{ left: "48%", top: "-9%", width: "9%" }}
          />
          <img
            src="/images/regen/carton.webp"
            alt=""
            aria-hidden="true"
            className="absolute hidden sm:block"
            style={{ left: "50%", top: "-11%", width: "30%" }}
          />

          {/* Red wood sign. A real link, not a picture of a button -- the
              artwork carries the lettering, so the accessible name comes from
              the anchor and the image is decorative. */}
          <a
            href="/products"
            className="absolute block"
            style={{ left: "70.5%", top: "14%", width: "26.3%" }}
          >
            <img
              src="/images/regen/sign-purchase.jpg"
              alt="Purchase our organic regenerative eggs"
              className="block w-full"
              style={{ boxShadow: "0 10px 26px rgba(0,0,0,0.28)" }}
            />
          </a>

          {/* "Get 'em here!" with its arrow curving up to the sign. */}
          <img
            src="/images/regen/ann-getem.png"
            alt="Get &lsquo;em here!"
            className="absolute hidden sm:block"
            style={{ left: "86%", top: "62%", width: "10.3%" }}
          />
        </div>
      </div>
    </section>
  );
}
