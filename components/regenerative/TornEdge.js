/* A torn paper edge between two sections.

   The design separates most of its bands with a ragged tear rather than a
   straight line -- measured off the render, the boundary wanders 86px across
   a 2344px width. No border-radius or clip-path reproduces that, so this is
   the real alpha cut from the .fig, recoloured to whichever band it belongs
   to.

   `tone` is the colour of the paper doing the tearing. `flip` turns the strip
   over for a band that tears upward into what sits above it.

   It is pulled up by its own height so the tear bites into the section above
   rather than sitting in a gap between the two. */
const TONES = {
  white: "edge-white-top.png",
  paper: "torn-edge.png",
};

export function TornEdge({ tone = "white", flip = false, overlap = "2.5%", fill }) {
  // Follows the pattern the rest of the site already uses for page tears --
  // see components/slider/EggSlider.js: a fixed-height block with the tear as
  // a cover background, rather than an <img> scaled to the viewport.
  //
  // The mask is the site's own bg-paper-edge-border artwork, recoloured per
  // band. Building strips from the .fig masks instead produced two problems:
  // they carry a step in their right-hand 11% that read as a notch, and
  // mirroring them to full width halved the tear's depth relative to the
  // viewport so it rendered nearly flat.
  const mask = `url(/images/regen/${TONES[tone] || TONES.white})`;
  return (
    <div
      aria-hidden="true"
      // `relative` matters: z-index only applies to a positioned element,
      // and without it the section above paints over the tear.
      className="relative w-full block"
      style={{
        height: "clamp(38px, 4.4vw, 95px)",
        // Pulled up by its own height so the tear cuts INTO the section above.
        // Sitting flush below it instead put paper over paper, and the tear
        // was invisible -- the boundary read as a straight line.
        marginTop: flip ? 0 : `calc(-1 * clamp(38px, 4.4vw, 95px))`,
        marginBottom: flip ? `-${overlap}` : "-1px",
        transform: flip ? "scaleY(-1)" : "none",
        zIndex: 1,
        pointerEvents: "none",
        ...(fill || { background: "#FFFFFF" }),
        WebkitMaskImage: mask,
        maskImage: mask,
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    />
  );
}
