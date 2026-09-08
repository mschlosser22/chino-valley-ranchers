/* Section 2 of the CVR Regen Page design: the "What is Regenerative?" heading
   and the video, on the torn paper ground that carries down from the hero.

   Geometry measured off the design render (2075px wide):
     heading      73.7% of canvas width, cap-height 69px
     video frame  54.3% wide, aspect 1.644, x 22.9%-77.2%

   The two script annotations are artwork rather than live type. Each is a
   single lockup of Nexa Rust script plus a hand-drawn arrow, and the arrow
   has to keep its exact relationship to the words -- setting the text live
   and positioning an arrow separately would drift at every breakpoint. */
export function WhatIs() {
  // The design's paper is a linen texture, not a flat fill -- sampled at
  // #E9E5DE with real grain. A flat colour read as plastic against the
  // photographs either side.
  return (
    <section
      className="relative"
      style={{
        background: "#E9E5DE",
        backgroundImage: "url(/images/regen/paper-texture.png)",
        backgroundSize: "400px 400px",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1600, padding: "0 7% 6%", overflow: "hidden" }}>
        <h2
          className="text-center m-0 uppercase"
          style={{
            fontFamily: "'Ultra', Rockwell, Georgia, serif",
            color: "#B01014",
            fontSize: "clamp(26px, 4.69vw, 81px)",
            lineHeight: 1.05,
            letterSpacing: "0.01em",
            paddingTop: "3%",
          }}
        >
          What is Regenerative?
        </h2>

        {/* The frame, the still and both annotations share one positioning
            context so the annotations stay pinned to the video as it scales. */}
        <div
          className="relative mx-auto"
          style={{ width: "min(63.2%, 985px)", marginTop: "4%" }}
        >
          <div
            className="relative"
            style={{
              aspectRatio: "1.644",
              // The design's frame is a rough painted edge. A flat teal border
              // is the honest stand-in until that artwork is separated out --
              // it is drawn as part of the composite, not its own layer.
              border: "0.9vw solid #006088",
              maxWidth: "100%",
            }}
          >
            <img
              src="/images/regen/video-still.jpg"
              alt="Chris talking about regenerative farming"
              className="w-full h-full object-cover block"
            />

            {/* Play button: a real control, not a picture of one. */}
            <button
              type="button"
              aria-label="Play the video about regenerative farming"
              className="absolute inset-0 m-auto flex items-center justify-center"
              style={{
                width: "13%",
                aspectRatio: "1",
                borderRadius: "9999px",
                background: "rgba(255,255,255,0.16)",
                border: "0.35vw solid #FFFFFF",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: 0,
                  height: 0,
                  marginLeft: "18%",
                  borderTop: "0.9vw solid transparent",
                  borderBottom: "0.9vw solid transparent",
                  borderLeft: "1.5vw solid #F8A014",
                }}
              />
            </button>
          </div>

          {/* "Hear Chris talk about regenerative" — sits over the still's
              upper right, its arrow curving down to the play button. */}
          <img
            src="/images/regen/ann-hear.png"
            alt="Hear Chris talk about regenerative"
            className="absolute hidden sm:block"
            style={{ left: "48%", top: "6%", width: "46%" }}
          />

          {/* "You want more?" — outside the frame to the right, its arrow
              running down toward the next section. */}
          <img
            src="/images/regen/ann-more.png"
            alt="You want more?"
            className="absolute hidden sm:block"
            style={{ left: "88%", top: "56%", width: "12%" }}
          />
        </div>
      </div>
    </section>
  );
}
