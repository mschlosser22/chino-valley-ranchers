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
            {/* The still is inset behind the strokes, as in the design
                (Rectangle 8: x484 y1325 1108x672 inside the 1135x698 frame).
                Filling the frame edge-to-edge leaves slivers of photo showing
                past the brush strokes, since the strokes are ragged and sit
                inside the box rather than straddling it. */}
            <img
              src="/images/regen/video-still.jpg"
              alt="Chris talking about regenerative farming"
              className="absolute object-cover block"
              style={{ left: "1.23%", top: "1.58%", width: "97.62%", height: "96.28%" }}
            />

            {/* The frame is four brush strokes lifted from the design file, not
                a CSS border. The design's edge is a rough painted stroke with
                broken texture and a ragged profile -- a flat rectangle read as
                a UI chrome box against hand-drawn artwork either side. Each
                strip is stretched along its own axis only, so the grain of the
                stroke never squashes. */}
            {/* Each stroke's own box, from the design (Layers 43/44/44 copy/45
                against the 1135x698 frame). They sit ENTIRELY INSIDE the frame:
                the right stroke ends at x1605, which is the frame's own right
                edge. They had been anchored to the edges with translate(±45%),
                which pushed each one half its width outside -- 7.4px past the
                frame at 1440 -- and the "You want more?" text, correctly placed
                3px past the frame edge, landed on top of the overhang. */}
            {[
              { src: "frame-top",    left: "0.44%",  top: "0.00%",  width: "98.68%", height: "3.87%" },
              { src: "frame-bottom", left: "0.18%",  top: "94.70%", width: "98.15%", height: "5.30%" },
              { src: "frame-left",   left: "0.00%",  top: "1.86%",  width: "2.56%",  height: "97.28%" },
              { src: "frame-right",  left: "97.44%", top: "1.86%",  width: "2.56%",  height: "97.28%" },
            ].map((e) => (
              <img
                key={e.src}
                src={`/images/regen/${e.src}.png`}
                alt=""
                aria-hidden="true"
                className="absolute"
                style={{ left: e.left, top: e.top, width: e.width, height: e.height,
                         maxWidth: "none", zIndex: 2, pointerEvents: "none" }}
              />
            ))}

            {/* Play button: a real control, not a picture of one.

                Placed from the design (Layer 77: x994 y1600 167x167 on the
                1135x698 frame). It had been `inset-0 m-auto`, which centres it
                and ignores the design entirely -- that put it at 43.5%/39.31%
                and 13% wide against the design's 47.90%/58.55% at 8.05%, so it
                sat high and oversized and the "Hear Chris" text landed on top
                of it. In the design the two do not touch: the text ends at
                y1565 and the ring starts at y1600. */}
            <button
              type="button"
              aria-label="Play the video about regenerative farming"
              className="absolute flex items-center justify-center"
              style={{
                left: "47.90%",
                top: "58.55%",
                width: "8.05%",
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
              style={{ left: "48.98%", top: "23.35%", width: "45.55%", zIndex: 3 }}
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
            style={{ left: "100.23%", top: "72.21%", width: "14.63%", zIndex: 4 }}
          />
        </div>
      </div>
    </section>
  );
}
