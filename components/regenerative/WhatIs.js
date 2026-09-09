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
        backgroundSize: "12.34vw 12.34vw",
        backgroundRepeat: "repeat",
      }}
    >
      {/* overflow:hidden keeps the paper ground from scrolling the page
          sideways, but it also clips whatever overhangs -- the "You want more?"
          arrow hangs below the video frame by design. 8% bottom padding clears
          its tail; at 6% the tip was cut off by 8px. */}
      <div className="mx-auto" style={{ maxWidth: 1600, padding: "0 7% 8%", overflow: "hidden" }}>
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
          /* Width lives in .regen-video: the design's 53.69% of the artboard
             (62.4% of this padded column) above 768px, full width below, where
             the desktop ratio leaves the video marooned in empty paper. The
             desktop figure is the frame stroke's own 1114px on the 2075px
             artboard, read from the design file rather than a screenshot. */
          className="relative mx-auto regen-video"
        >
          <div className="relative" style={{ aspectRatio: "1.644", maxWidth: "100%" }}>
            <img
              src="/images/regen/video-still.jpg"
              alt="Chris talking about regenerative farming"
              className="w-full h-full object-cover block"
            />

            {/* The frame is four brush strokes lifted from the design file, not
                a CSS border. The design's edge is a rough painted stroke with
                broken texture and a ragged profile -- a flat rectangle read as
                a UI chrome box against hand-drawn artwork either side. Each
                strip is stretched along its own axis only, so the grain of the
                stroke never squashes. */}
            {[
              { src: "frame-top",    style: { left: 0, right: 0, top: 0,    height: "5.5%", transform: "translateY(-45%)" } },
              { src: "frame-bottom", style: { left: 0, right: 0, bottom: 0, height: "4.0%", transform: "translateY(45%)" } },
              { src: "frame-left",   style: { top: 0, bottom: 0, left: 0,   width: "2.4%",  transform: "translateX(-45%)" } },
              { src: "frame-right",  style: { top: 0, bottom: 0, right: 0,  width: "2.4%",  transform: "translateX(45%)" } },
            ].map((e) => (
              <img
                key={e.src}
                src={`/images/regen/${e.src}.png`}
                alt=""
                aria-hidden="true"
                className="absolute"
                style={{ ...e.style, width: e.style.width || "auto", height: e.style.height || "auto", maxWidth: "none", zIndex: 2, pointerEvents: "none" }}
              />
            ))}

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
                zIndex: 3,
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

            {/* "Hear Chris talk" sits over the still, inside the frame: text at
                x1025.9 y1477 plus its arrow (x1172..1315, y1543..1672), which
                is 48.98% / 23.35% / 45.55% of the frame box. */}
            <img
              src="/images/regen/ann-hear.png"
              alt="Hear Chris talk about regenerative"
              className="absolute hidden sm:block"
              style={{ left: "48.93%", top: "20.78%", width: "46.91%", zIndex: 3 }}
            />
          </div>

          {/* "You want more?" sits entirely on the paper, clear of the frame.
              Geometry read from the .fig node tree, not a screenshot: the
              Video Frame is at x470 w1135 on the 2075 artboard, and the text
              starts at x1607.6 -- 2.6px past the frame's right edge, i.e.
              100.23% of the frame's width. Combined with its arrow (Shape 4
              copy 2, x1629..1726 y1946..2107) the lockup is 14.63% wide and
              41.4% tall. A sibling of the frame rather than a child, because
              nested inside the frame's bounds clipped the arrow. */}
          <img
            src="/images/regen/ann-more.png"
            alt="You want more?"
            className="absolute hidden sm:block"
            style={{ left: "100.23%", top: "71.65%", width: "14.67%", zIndex: 4 }}
          />
        </div>
      </div>
    </section>
  );
}
