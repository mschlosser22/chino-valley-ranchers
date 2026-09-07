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
  paper: "edge-paper-top.png",
  burlap: "edge-white-top.png",
};

export function TornEdge({ tone = "white", flip = false, overlap = "3.7%", fill }) {
  // A mask-based edge rather than a picture of one. The strip is filled with
  // whatever the band below is made of -- a flat colour or the same tiled
  // texture at the same scale -- and the tear is punched through it with the
  // artwork's own alpha. Painting the texture into the PNG instead produced a
  // visible seam where its tiling did not line up with the section's.
  const mask = `url(/images/regen/${TONES[tone] || TONES.white})`;
  return (
    <div
      aria-hidden="true"
      className="relative w-full"
      style={{
        height: "3.7vw",
        marginTop: flip ? 0 : `-${overlap}`,
        marginBottom: flip ? `-${overlap}` : 0,
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
